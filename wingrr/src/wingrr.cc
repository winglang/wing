#include "wingrr.h"

#include <jni.h>

#include <uv.h>
#include <node_embedding_api.h>

#include <mono/jit/jit.h>
#include <mono/metadata/assembly.h>
#include <mono/metadata/environment.h>
#include <mono/metadata/mono-config.h>
#include <mono/metadata/debug-helpers.h>

#include <mutex>
#include <array>
#include <vector>
#include <string>
#include <memory>
#include <cstring>
#include <cassert>

#include <libwrr-go.h>

#include <pybind11/pybind11.h>
#include <pybind11/embed.h>

#include <sol/sol.hpp>

#include <ruby.h>

extern "C"
{
  struct wingrr_context_t_
  {
    std::mutex mutex;
    const char *program;
    const char *workdir;
    wingrr_engine_type_t type;
  };
  wingrr_context_t *wingrr_prep(wingrr_engine_type_t const type)
  {
    const auto instance = new wingrr_context_t_();
    instance->type = type;
    return instance;
  }
  void wingrr_set_program(wingrr_context_t *const instance, const char *const program)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    if (instance->program == program)
      return;
    instance->program = program;
  }
  void wingrr_set_workdir(wingrr_context_t *const instance, const char *const context)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    if (instance->workdir == context)
      return;
    instance->workdir = context;
  }
  int wingrr_exec(wingrr_context_t *const instance)
  {
    int ret = 0;
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    assert(instance->program);
    assert(instance->workdir);

    if (instance->type == WINGRR_ENGINE_JAVASCRIPT ||
        instance->type == WINGRR_ENGINE_TYPESCRIPT)
    {
      std::vector<const char *> argv({"wingrr",
                                      "--experimental-modules",
                                      "--experimental-wasi-unstable-preview1",
                                      "--no-global-search-paths",
                                      "--no-experimental-fetch",
                                      "--no-deprecation",
                                      "--no-warnings",
                                      "--no-addons"});

      if (instance->type == WINGRR_ENGINE_TYPESCRIPT)
      {
        argv.push_back("--require");
        argv.push_back("ts-node/register/transpile-only");
      }

      argv.push_back(instance->program);
      argv.push_back(nullptr);

      size_t buflen = 4096;
      char buf[buflen];
      uv_os_getenv("NODE_PATH", buf, &buflen);
      uv_os_setenv("NODE_PATH", instance->workdir);
      ret = node_main(argv.size() - 1, const_cast<char **>(argv.data()));
      uv_os_setenv("NODE_PATH", buf);
    }

    else if (instance->type == WINGRR_ENGINE_CSHARP)
    {
      mono_config_parse(NULL);
      std::shared_ptr<MonoDomain> domain(mono_jit_init("wingrr"), mono_jit_cleanup);
      MonoAssembly *assembly = mono_domain_assembly_open(domain.get(), "build/libwrr-cs.dll");
      MonoImage *image = mono_assembly_get_image(assembly);
      MonoMethodDesc *TypeMethodDesc = mono_method_desc_new("Monada.Wing:Execute(string,string)", false);
      MonoMethod *method = mono_method_desc_search_in_image(TypeMethodDesc, image);
      void *args[2];
      args[0] = mono_string_new(domain.get(), instance->program);
      args[1] = mono_string_new(domain.get(), instance->workdir);
      mono_runtime_invoke(method, nullptr, args, nullptr);
      ret = mono_environment_exitcode_get();
    }

    else if (instance->type == WINGRR_ENGINE_GO)
    {
      ::GoString program = {instance->program, static_cast<ptrdiff_t>(strlen(instance->program))};
      ::GoString workdir = {instance->workdir, static_cast<ptrdiff_t>(strlen(instance->workdir))};
      ::Execute(program, workdir);
    }

    else if (instance->type == WINGRR_ENGINE_JAVA)
    {
      JavaVM *jvm;
      JNIEnv *env;
      JavaVMInitArgs jvm_args;
      JavaVMOption *options = new JavaVMOption[3];
      options[0].optionString = const_cast<char *>("-Djava.compiler=NONE");
      options[1].optionString = const_cast<char *>("-Djava.class.path=build");
      options[2].optionString = const_cast<char *>("-verbose:none"); // class|module|gc|jni
      jvm_args.version = JNI_VERSION_1_6;
      jvm_args.nOptions = 3;
      jvm_args.options = options;
      jvm_args.ignoreUnrecognized = false;
      JNI_CreateJavaVM(&jvm, reinterpret_cast<void **>(&env), &jvm_args);
      auto MainClass = env->FindClass("libwrr");
      auto MainMethod = env->GetStaticMethodID(MainClass, "main", "([Ljava/lang/String;)V");
      auto arg0 = env->NewStringUTF(instance->program);
      auto arg1 = env->NewStringUTF(instance->workdir);
      auto argv = env->NewObjectArray(2, env->FindClass("java/lang/String"), nullptr);
      env->SetObjectArrayElement(argv, 0, arg0);
      env->SetObjectArrayElement(argv, 1, arg1);
      env->CallStaticVoidMethod(MainClass, MainMethod, argv);
      env->DeleteLocalRef(argv);
      env->DeleteLocalRef(arg1);
      env->DeleteLocalRef(arg0);
      jvm->DestroyJavaVM();
      delete[] options;
    }

    else if (instance->type == WINGRR_ENGINE_PYTHON)
    {
      namespace py = pybind11;
      using namespace py::literals;

      py::scoped_interpreter guard;
      py::globals()["__file__"] = instance->program;

      // Disable build of __pycache__ folders
      py::exec(R"(
          import sys
          sys.dont_write_bytecode = True
      )");

      py::eval_file(instance->program);
    }

    else if (instance->type == WINGRR_ENGINE_RUBY)
    {
      RUBY_INIT_STACK;
      ruby_init();
      char *ruby_argv[] = {
          const_cast<char *>("wingrr"),
          const_cast<char *>(instance->program),
          nullptr,
      };
      auto ruby_argc = sizeof(ruby_argv) / sizeof(ruby_argv[0]) - 1;
      ret = ruby_run_node(ruby_options(ruby_argc, ruby_argv));
    }

    else if (instance->type == WINGRR_ENGINE_LUA)
    {
      sol::state lua;
      lua.open_libraries(sol::lib::base);
      lua.script_file(instance->program);
    }

    return ret;
  }
  void wingrr_free(wingrr_context_t *const instance)
  {
    delete instance;
  }
}

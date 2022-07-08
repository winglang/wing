#include "wingpf.h"

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

extern "C"
{
  struct wingpf_context_t_
  {
    std::mutex mutex;
    const char *program;
    const char *workdir;
    wingpf_engine_type_t type;
  };
  wingpf_context_t *wingpf_prep(wingpf_engine_type_t const type)
  {
    const auto instance = new wingpf_context_t_();
    instance->type = type;
    return instance;
  }
  void wingpf_set_program(wingpf_context_t *const instance, const char *const program)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    if (instance->program == program)
      return;
    instance->program = program;
  }
  void wingpf_set_workdir(wingpf_context_t *const instance, const char *const context)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    if (instance->workdir == context)
      return;
    instance->workdir = context;
  }
  int wingpf_exec(wingpf_context_t *const instance)
  {
    int ret = 0;
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    assert(instance->program);
    assert(instance->workdir);

    if (instance->type == WINGPF_ENGINE_JAVASCRIPT_NODEJS ||
        instance->type == WINGPF_ENGINE_TYPESCRIPT_NODEJS ||
        instance->type == WINGPF_ENGINE_PYTHON_NODEJS ||
        instance->type == WINGPF_ENGINE_RUBY_NODEJS)
    {
      std::vector<const char *> argv({"wingrr",
                                      "--experimental-modules",
                                      "--experimental-wasi-unstable-preview1",
                                      "--no-global-search-paths",
                                      "--no-experimental-fetch",
                                      "--no-deprecation",
                                      "--no-warnings",
                                      "--no-addons"});

      if (instance->type == WINGPF_ENGINE_TYPESCRIPT_NODEJS)
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

    else if (instance->type == WINGPF_ENGINE_CSHARP_MONO)
    {
      mono_config_parse(NULL);
      std::shared_ptr<MonoDomain> domain(mono_jit_init("wingrr"), mono_jit_cleanup);
      MonoAssembly *assembly = mono_domain_assembly_open(domain.get(), "libwrr-cs.dll");
      MonoImage *image = mono_assembly_get_image(assembly);
      MonoMethodDesc *TypeMethodDesc = mono_method_desc_new("Monada.Wing:Execute(string,string)", false);
      MonoMethod *method = mono_method_desc_search_in_image(TypeMethodDesc, image);
      void *args[2];
      args[0] = mono_string_new(domain.get(), instance->program);
      args[1] = mono_string_new(domain.get(), instance->workdir);
      mono_runtime_invoke(method, nullptr, args, nullptr);
      ret = mono_environment_exitcode_get();
    }

    else if (instance->type == WINGPF_ENGINE_GO_YAEGI)
    {
      ::GoString program = {instance->program, static_cast<ptrdiff_t>(strlen(instance->program))};
      ::GoString workdir = {instance->workdir, static_cast<ptrdiff_t>(strlen(instance->workdir))};
      ::Execute(program, workdir);
    }

    return ret;
  }
  void wingpf_free(wingpf_context_t *const instance)
  {
    delete instance;
  }
}

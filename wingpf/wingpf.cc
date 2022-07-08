#include "wingpf.h"

#include <uv.h>
#include <node_embedding_api.h>

#include <mono/jit/jit.h>
#include <mono/metadata/assembly.h>
#include <mono/metadata/debug-helpers.h>

#include <mutex>
#include <array>
#include <vector>
#include <string>
#include <memory>
#include <cstring>
#include <cassert>
#include <fstream>
#include <sstream>

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

    if (instance->type == WINGPF_ENGINE_CSHARP_MONO)
    {
      std::shared_ptr<MonoDomain> domain(mono_jit_init("wingrr"), mono_jit_cleanup);
      MonoAssembly *assembly = mono_domain_assembly_open(
          domain.get(), "/usr/lib/mono/gac/Mono.CSharp/4.0.0.0__0738eb9f132ed756/Mono.CSharp.dll");
      MonoImage *image = mono_assembly_get_image(assembly);
      MonoMethodDesc *TypeMethodDesc = mono_method_desc_new("Evaluator:Run(string)", false);
      MonoMethod *method = mono_method_desc_search_in_image(TypeMethodDesc, image);
      std::ifstream program_file_content(instance->program);
      std::stringstream ss;
      ss << program_file_content.rdbuf();
      void *args[1];
      args[0] = mono_string_new(domain.get(), ss.str().c_str());
      mono_runtime_invoke(method, nullptr, nullptr, nullptr);
      // TODO: error handling + dynamic lookup of Mono.CSharp.dll + ret val
    }

    return ret;
  }
  void wingpf_free(wingpf_context_t *const instance)
  {
    delete instance;
  }
}

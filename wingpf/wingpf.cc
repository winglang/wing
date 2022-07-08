#include "wingpf.h"

#include <uv.h>
#include <node_embedding_api.h>

#include <mutex>
#include <array>
#include <vector>
#include <string>
#include <memory>
#include <cstring>
#include <cassert>

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

    if (instance->type == WINGPF_ENGINE_JAVASCRIPT_NODEJS_16 ||
        instance->type == WINGPF_ENGINE_TYPESCRIPT_NODEJS_16)
    {
      std::vector<const char *> argv({"wingrr",
                                      "--experimental-modules",
                                      "--experimental-wasi-unstable-preview1",
                                      "--no-global-search-paths",
                                      "--no-experimental-fetch",
                                      "--no-deprecation",
                                      "--no-warnings",
                                      "--no-addons"});

      if (instance->type == WINGPF_ENGINE_TYPESCRIPT_NODEJS_16)
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

    return ret;
  }
  void wingpf_free(wingpf_context_t *const instance)
  {
    delete instance;
  }
}

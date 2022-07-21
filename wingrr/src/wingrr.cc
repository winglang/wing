#include "wingrr.h"

#include <mutex>
#include <string>
#include <cassert>

#include "engines/js/libwrr-javascript.hh"
#include "engines/ts/libwrr-typescript.hh"

extern "C"
{
  struct wingrr_context_t_
  {
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
    if (instance->program == program)
      return;
    instance->program = program;
  }
  void wingrr_set_workdir(wingrr_context_t *const instance, const char *const context)
  {
    assert(instance);
    if (instance->workdir == context)
      return;
    instance->workdir = context;
  }
  int wingrr_exec(wingrr_context_t *const instance)
  {
    int ret = 0;
    assert(instance);
    assert(instance->program);
    assert(instance->workdir);

    if (instance->type == WINGRR_ENGINE_JAVASCRIPT)
    {
      wrr::JavaScriptEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    if (instance->type == WINGRR_ENGINE_TYPESCRIPT)
    {
      wrr::TypeScriptEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    return ret;
  }
  void wingrr_free(wingrr_context_t *const instance)
  {
    delete instance;
  }
}

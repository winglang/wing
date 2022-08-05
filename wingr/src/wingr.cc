#include "wingr.h"

#include <mutex>
#include <string>
#include <cassert>

#include "engines/js/libwr-javascript.hh"
#include "engines/ts/libwr-typescript.hh"
#include "engines/wing/libwr-wing.hh"

extern "C"
{
  struct wingr_context_t_
  {
    const char *program;
    const char *workdir;
    wingr_engine_type_t type;
  };
  wingr_context_t *wingr_prep(wingr_engine_type_t const type)
  {
    const auto instance = new wingr_context_t_();
    instance->type = type;
    return instance;
  }
  void wingr_set_program(wingr_context_t *const instance, const char *const program)
  {
    assert(instance);
    if (instance->program == program)
      return;
    instance->program = program;
  }
  void wingr_set_workdir(wingr_context_t *const instance, const char *const context)
  {
    assert(instance);
    if (instance->workdir == context)
      return;
    instance->workdir = context;
  }
  int wingr_exec(wingr_context_t *const instance)
  {
    int ret = 0;
    assert(instance);
    assert(instance->program);
    assert(instance->workdir);

    if (instance->type == WINGR_ENGINE_JAVASCRIPT)
    {
      wing::JavaScriptEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    if (instance->type == WINGR_ENGINE_TYPESCRIPT)
    {
      wing::TypeScriptEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    if (instance->type == WINGR_ENGINE_WINGLANG)
    {
      wing::WingEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    return ret;
  }
  void wingr_free(wingr_context_t *const instance)
  {
    delete instance;
  }
}

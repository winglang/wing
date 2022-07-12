#include "wingrr.h"

#include <mutex>
#include <string>
#include <memory>
#include <cassert>

#include "engines/lua/libwrr-lua.hh"
#include "engines/rb/libwrr-ruby.hh"
#include "engines/py/libwrr-python.hh"
#include "engines/java/libwrr-java.hh"
#include "engines/go/libwrr-go.hh"
#include "engines/cs/libwrr-csharp.hh"
#include "engines/js/libwrr-javascript.hh"
#include "engines/ts/libwrr-typescript.hh"

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

    else if (instance->type == WINGRR_ENGINE_CSHARP)
    {
      wrr::CSharpEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    else if (instance->type == WINGRR_ENGINE_GO)
    {
      wrr::GoEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    else if (instance->type == WINGRR_ENGINE_JAVA)
    {
      wrr::JavaEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    else if (instance->type == WINGRR_ENGINE_PYTHON)
    {
      wrr::PythonEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    else if (instance->type == WINGRR_ENGINE_RUBY)
    {
      wrr::RubyEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    else if (instance->type == WINGRR_ENGINE_LUA)
    {
      wrr::LuaEngine engine(instance->workdir);
      ret = engine.execute(instance->program);
    }

    return ret;
  }
  void wingrr_free(wingrr_context_t *const instance)
  {
    delete instance;
  }
}

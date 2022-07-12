#include "libwrr-lua.hh"
#include "../../utils/scoped-chdir.hh"

#include <sol/sol.hpp>

#include <sstream>

namespace wrr
{
  struct LuaState
  {
    sol::state lua;
  };

  LuaEngine::LuaEngine(const std::string &workdir)
      : Engine(workdir), m_state(std::make_shared<LuaState>())
  {
    m_state->lua.open_libraries(sol::lib::base);
  }

  int LuaEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    std::stringstream ss;
    ss << "__dirname__='" << chdir.cwd() << "'";
    m_state->lua.script(ss.str().c_str());
    auto ret = m_state->lua.script_file(program.c_str());
    return ret.valid();
  }
} // !namespace wrr

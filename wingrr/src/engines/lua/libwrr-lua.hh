#pragma once

#include "../engine.hh"

namespace wrr
{
  class LuaEngine : public Engine
  {
  public:
    explicit LuaEngine(const std::string &workdir);
    int execute(const std::string &program) const override;

  private:
    using LuaState = struct LuaState;
    const std::shared_ptr<LuaState> m_state;
  };
} // !namespace wrr

#pragma once

#include "../engine.hh"

namespace wing
{
  class TypeScriptEngine : public Engine
  {
  public:
    explicit TypeScriptEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wing

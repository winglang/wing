#pragma once

#include "../engine.hh"

namespace wing
{
  class JavaScriptEngine : public Engine
  {
  public:
    explicit JavaScriptEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wing

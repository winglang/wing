#pragma once

#include "../engine.hh"

namespace wrr
{
  class JavaScriptEngine : public Engine
  {
  public:
    explicit JavaScriptEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wrr

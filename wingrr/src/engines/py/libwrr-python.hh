#pragma once

#include "../engine.hh"

namespace wrr
{
  class PythonEngine : public Engine
  {
  public:
    explicit PythonEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wrr

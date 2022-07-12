#pragma once

#include "../engine.hh"

namespace wrr
{
  class JavaEngine : public Engine
  {
  public:
    explicit JavaEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wrr

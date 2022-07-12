#pragma once

#include "../engine.hh"

namespace wrr
{
  class GoEngine : public Engine
  {
  public:
    explicit GoEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wrr

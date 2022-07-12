#pragma once

#include "../engine.hh"

namespace wrr
{
  class RubyEngine : public Engine
  {
  public:
    explicit RubyEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wrr

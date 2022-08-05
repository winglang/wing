#pragma once

#include "../engine.hh"

namespace wing
{
  class WingEngine : public Engine
  {
  public:
    explicit WingEngine(const std::string &workdir);
    int execute(const std::string &program) const override;
  };
} // !namespace wing

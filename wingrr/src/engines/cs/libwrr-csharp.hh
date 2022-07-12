#pragma once

#include "../engine.hh"

namespace wrr
{
  class CSharpEngine : public Engine
  {
  public:
    explicit CSharpEngine(const std::string &workdir);
    int execute(const std::string &program) const override;

  private:
    using CSharpState = struct CSharpState;
    const std::shared_ptr<CSharpState> m_state;
  };
} // !namespace wrr

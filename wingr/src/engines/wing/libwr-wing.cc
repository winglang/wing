#include <memory>

#include "libwr-wing.hh"
#include "../../../../wingc/wingc.h"
#include "../../utils/scoped-chdir.hh"
#include "../../bridges/js/node_bridge.hh"

namespace wing
{
  WingEngine::WingEngine(const std::string &workdir) : Engine(workdir)
  {
  }

  int WingEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    const auto ret = wingc_compile(program.c_str(), chdir.cwd().c_str());
    return ret != nullptr;
  }
} // !namespace wing

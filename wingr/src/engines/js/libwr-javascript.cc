#include "libwr-javascript.hh"
#include "../../utils/scoped-chdir.hh"
#include "../../bridges/js/node_bridge.hh"

namespace wing
{
  JavaScriptEngine::JavaScriptEngine(const std::string &workdir) : Engine(workdir)
  {
  }

  int JavaScriptEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    return NodeBridge::execute(program);
  }
} // !namespace wing

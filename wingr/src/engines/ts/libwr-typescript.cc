#include "libwr-typescript.hh"
#include "../../utils/scoped-chdir.hh"
#include "../../bridges/js/node_bridge.hh"

namespace wing
{
  TypeScriptEngine::TypeScriptEngine(const std::string &workdir) : Engine(workdir)
  {
  }

  int TypeScriptEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    return NodeBridge::execute(program);
  }
} // !namespace wing

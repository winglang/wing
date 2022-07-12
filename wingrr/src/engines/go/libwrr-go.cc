#include "libwrr-go.hh"
#include "../../utils/scoped-chdir.hh"

#include <libwrr-go.h>

namespace wrr
{
  GoEngine::GoEngine(const std::string &workdir) : Engine(workdir)
  {
  }

  int GoEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    ::GoString _program = {program.c_str(), static_cast<ptrdiff_t>(program.size())};
    ::GoString _workdir = {chdir.cwd().c_str(), static_cast<ptrdiff_t>(chdir.cwd().size())};
    ::Execute(_program, _workdir);
    return 0; // fixme
  }
} // !namespace wrr

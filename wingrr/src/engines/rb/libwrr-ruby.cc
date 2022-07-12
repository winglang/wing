#include "libwrr-ruby.hh"
#include "../../utils/scoped-chdir.hh"

#include <ruby.h>

namespace wrr
{
  RubyEngine::RubyEngine(const std::string &workdir) : Engine(workdir)
  {
    // there can only be one Ruby VM per process.
    static struct RubyInitializer
    {
      RubyInitializer()
      {
        RUBY_INIT_STACK;
        ruby_init();
      }
    } ruby_initializer;
  }

  int RubyEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    char *ruby_argv[] = {
        const_cast<char *>("wingrr"),
        const_cast<char *>(program.c_str()),
        nullptr,
    };
    auto ruby_argc = sizeof(ruby_argv) / sizeof(ruby_argv[0]) - 1;
    void *node = ruby_options(ruby_argc, ruby_argv);
    int state;
    if (ruby_executable_node(node, &state))
      state = ruby_exec_node(node);
    return ruby_cleanup(state);
  }
} // !namespace wrr

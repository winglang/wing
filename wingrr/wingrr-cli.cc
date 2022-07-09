#include "wingrr.h"

#include <memory>
#include <string>
#include <iostream>

int main(int argc, char *argv[])
{
  if (argc < 2)
  {
    std::cerr << "No program provided." << std::endl;
    return 1;
  }
  std::string program(argv[1]);
  if (argc < 3)
  {
    std::cerr << "No working directory provided." << std::endl;
    return 1;
  }
  std::string workdir(argv[2]);
  std::string ext = program.substr(program.find_last_of(".") + 1);
  auto engine = WINGRR_ENGINE_JAVASCRIPT_NODEJS;
  if (ext == "ts")
    engine = WINGRR_ENGINE_TYPESCRIPT_NODEJS;
  else if (ext == "py")
    engine = WINGRR_ENGINE_PYTHON_NODEJS;
  else if (ext == "rb")
    engine = WINGRR_ENGINE_RUBY_NODEJS;
  else if (ext == "cs")
    engine = WINGRR_ENGINE_CSHARP_MONO;
  else if (ext == "go")
    engine = WINGRR_ENGINE_GO_YAEGI;
  else if (ext == "java")
    engine = WINGRR_ENGINE_JAVA_JNI;
  else if (ext != "js")
  {
    std::cerr << "Unknown program extension." << std::endl;
    return 1;
  }
  auto instance = std::shared_ptr<wingrr_context_t>(
      wingrr_prep(engine),
      wingrr_free);
  wingrr_set_program(instance.get(), argv[1]);
  wingrr_set_workdir(instance.get(), argv[2]);
  return wingrr_exec(instance.get());
}

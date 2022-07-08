#include "wingpf.h"

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
  auto engine = WINGPF_ENGINE_JAVASCRIPT_NODEJS;
  if (ext == "ts")
    engine = WINGPF_ENGINE_TYPESCRIPT_NODEJS;
  else if (ext == "py")
    engine = WINGPF_ENGINE_PYTHON_NODEJS;
  else if (ext == "rb")
    engine = WINGPF_ENGINE_RUBY_NODEJS;
  else if (ext == "cs")
    engine = WINGPF_ENGINE_CSHARP_MONO;
  else if (ext != "js")
  {
    std::cerr << "Unknown program extension." << std::endl;
    return 1;
  }
  auto instance = std::shared_ptr<wingpf_context_t>(
      wingpf_prep(engine),
      wingpf_free);
  wingpf_set_program(instance.get(), argv[1]);
  wingpf_set_workdir(instance.get(), argv[2]);
  return wingpf_exec(instance.get());
}

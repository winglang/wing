#include "wingr.h"

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
  auto engine = WINGR_ENGINE_JAVASCRIPT;
  if (ext == "ts")
    engine = WINGR_ENGINE_TYPESCRIPT;
  else if (ext == "w")
    engine = WINGR_ENGINE_WINGLANG;
  else if (ext != "js")
  {
    std::cerr << "Unknown program extension." << std::endl;
    return 1;
  }
  auto instance = std::shared_ptr<wingr_context_t>(
      wingr_prep(engine),
      wingr_free);
  wingr_set_program(instance.get(), argv[1]);
  wingr_set_workdir(instance.get(), argv[2]);
  return wingr_exec(instance.get());
}

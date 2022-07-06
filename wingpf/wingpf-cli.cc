#include "wingpf.h"

#include <memory>
#include <iostream>

int main(int argc, char *argv[])
{
  if (argc < 2)
  {
    std::cerr << "No script provided." << std::endl;
    return 1;
  }
  if (argc < 3)
  {
    std::cerr << "No context provided." << std::endl;
    return 1;
  }
  auto instance = std::shared_ptr<wingpf_context_t>(wingpf_prep(WINGPF_ENGINE_JAVASCRIPT_NODEJS_16), [=](auto ptr)
                                                    { wingpf_free(ptr); });
  wingpf_set_program(instance.get(), argv[1]);
  wingpf_set_workdir(instance.get(), argv[2]);
  return wingpf_exec(instance.get());
}

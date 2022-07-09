#include "node.h"

extern "C" {
int node_main(int argc, char** argv) {
  return node::Start(argc, argv);
}  // !node_main
}  // !extern "C"

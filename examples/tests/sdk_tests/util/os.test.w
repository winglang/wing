bring util;

// This is not a comprehensive list, just a few examples
// that our CI system supports.
let osList = ["darwin", "linux", "win32"];

assert(osList.contains(util.os()));

test "util.os() inflight" {
  assert(osList.contains(util.os()));
}

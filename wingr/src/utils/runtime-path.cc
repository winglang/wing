#include "runtime-path.hh"

#include <uv.h>

#include <array>
#include <string>

namespace
{
  std::string _get_runtime_path()
  {
    std::array<char, 4096> buf;
    auto buflen = buf.size();
    uv_os_getenv("WINGRR_ROOT", buf.data(), &buflen);
    if (!buf.data() || buflen == 0 || std::string(buf.data()) == "" && uv_cwd(buf.data(), &buflen) == UV_ENOBUFS)
      return ".";
    else
      return std::string(buf.data(), buflen);
  }
}

namespace wing
{
  std::string runtime_path(const std::string &suffix)
  {
    // this is the order on how we resolve this:
    // 1. WINGRR_ROOT env var
    // 2. the current working directory
    // 3. returning "." if all else fails
    const static auto RUNTIME_PATH{_get_runtime_path()};
    return suffix.empty() ? RUNTIME_PATH : RUNTIME_PATH + "/" + suffix;
  }
}

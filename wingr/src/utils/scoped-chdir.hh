#pragma once

#include <array>
#include <memory>

#include <uv.h>

namespace wing
{
  /** @brief RAII-safe scoped directory change utility */
  class ScopedChdir
  {
  public:
    ScopedChdir(const std::string &dir)
    {
      std::array<char, 4096> buf;
      size_t buflen = buf.size();
      if (UV_ENOBUFS != uv_cwd(buf.data(), &buflen))
        m_old = std::string(buf.data(), buflen);
      uv_chdir(dir.c_str());
      m_cwd = dir;
    }

    const std::string &cwd() const { return m_cwd; }

    ~ScopedChdir()
    {
      if (m_old.empty())
        return;
      uv_chdir(m_old.c_str());
    }

  private:
    std::string m_old;
    std::string m_cwd;
  };
} // !namespace wing

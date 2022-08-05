#pragma once

#include <string>
#include <memory>

namespace wing
{
  /**
   * @brief The Engine class
   *
   * This class is the base class for all engines that provide execution of each
   * programming language they are trying to bring support of.
   *
   * Clients of this class usually should forward declare everything they need
   * to use internally, so all the ugly, hacky C level integrations stay hidden
   * from consumers of the library.
   */
  class Engine
  {
  public:
    /**
     * @brief Engine
     *
     * @param workdir The working directory of the engine. This is where program
     * execution happens when "execute()" is called. This is only a hint and is
     * not a guarantee currently. Supported languages can break out of this path
     */
    explicit Engine(const std::string &workdir) : m_workdir_(workdir)
    {
      /* noop */
    }

    /**
     * @brief Executes the given program in the engine's working directory.
     *
     * @param program program file path on disk
     * @return int 0 on success, non-zero on failure.
     */
    virtual int execute(const std::string &program) const = 0;

    const std::string &workdir() const { return m_workdir_; }

  private:
    const std::string m_workdir_;
  };
} // !namespace wing

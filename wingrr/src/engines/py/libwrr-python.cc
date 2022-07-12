#include "libwrr-python.hh"
#include "../../utils/scoped-chdir.hh"

#include <pybind11/pybind11.h>
#include <pybind11/embed.h>

namespace py = pybind11;
using namespace py::literals;

namespace wrr
{
  PythonEngine::PythonEngine(const std::string &workdir) : Engine(workdir)
  {
    py::scoped_interpreter guard;
    py::module::import("sys").attr("path").cast<py::list>().append(workdir);
  }

  int PythonEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    py::scoped_interpreter guard;
    py::globals()["__file__"] = program;
    // Disable build of __pycache__ folders
    py::exec(R"(
          import sys
          sys.dont_write_bytecode = True
      )");
    try
    {
      py::eval_file(program);
      return 0;
    }
    // yikes.
    catch (...)
    {
      return 1;
    }
  }
} // !namespace wrr

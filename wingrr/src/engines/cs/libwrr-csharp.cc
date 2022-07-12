#include "libwrr-csharp.hh"
#include "../../utils/scoped-chdir.hh"
#include "../../utils/runtime-path.hh"

#include <mono/jit/jit.h>
#include <mono/metadata/assembly.h>
#include <mono/metadata/environment.h>
#include <mono/metadata/mono-config.h>
#include <mono/metadata/debug-helpers.h>

namespace wrr
{
  struct CSharpState
  {
    std::shared_ptr<MonoDomain> domain;
  };

  CSharpEngine::CSharpEngine(const std::string &workdir)
      : Engine(workdir), m_state(std::make_shared<CSharpState>())
  {
    mono_config_parse(nullptr);
    m_state->domain = std::shared_ptr<MonoDomain>(mono_jit_init("wingrr"), mono_jit_cleanup);
  }

  int CSharpEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    auto domain = m_state->domain;
    const auto assemblyPath = runtime_path("libwrr-cs.dll");
    MonoAssembly *assembly = mono_domain_assembly_open(domain.get(), assemblyPath.c_str());
    MonoImage *image = mono_assembly_get_image(assembly);
    MonoMethodDesc *TypeMethodDesc = mono_method_desc_new("Monada.Wing:Execute(string,string)", false);
    MonoMethod *method = mono_method_desc_search_in_image(TypeMethodDesc, image);
    void *args[2];
    args[0] = mono_string_new(domain.get(), program.c_str());
    args[1] = mono_string_new(domain.get(), chdir.cwd().c_str());
    mono_runtime_invoke(method, nullptr, args, nullptr);
    return mono_environment_exitcode_get();
  }
} // !namespace wrr

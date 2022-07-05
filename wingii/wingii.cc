#include "wingii.h"
#include "vendor/node/bin/include/node_embedding_api.h"

#include <vector>
#include <string>
#include <memory>
#include <cstring>
#include <iostream>

namespace
{
  static const char *script{nullptr};
  static napi_value napi_entry(napi_env env, napi_value exports)
  {
    if (!script)
    {
      std::cerr << "No script provided." << std::endl;
      return nullptr;
    }
    napi_value script_string;
    if (napi_ok != napi_create_string_utf8(env,
                                           script,
                                           std::strlen(script),
                                           &script_string))
    {
      std::cerr << "napi_create_string_utf8 failed." << std::endl;
      return nullptr;
    }

    napi_value result;
    if (napi_ok != napi_run_script(env, script_string, &result))
    {
      std::cerr << "napi_run_script failed." << std::endl;
      return nullptr;
    }
    return nullptr;
  }
} // !namespace

extern "C"
{
  wingii_call_prep_t *wingii_execute_prep(
      const char *const program,
      const char *const context,
      wingii_program_type_t type,
      wingii_env_t env)
  {
    return new wingii_call_prep_t{
        program,
        context,
        type,
        env};
  }
  void wingii_execute(const wingii_call_prep_t *const prep)
  {
    // TODO: actually use "prep"
    std::vector<std::string> arguments;
    std::vector<char *> argv;
    for (const auto &arg : arguments)
      argv.push_back((char *)arg.data());
    argv.push_back(nullptr);
    const auto argc = argv.size() - 1;
    node_options_t options{
        static_cast<int>(argc),
        argv.data(),
        napi_entry};
    const auto ret = node_run(options);
    // TODO: better error handling
    if (ret.exit_code != 0)
    {
      std::cerr << "program exited with non-zero code: " << ret.exit_code << std::endl;
      if (ret.error != nullptr)
      {
        std::shared_ptr<char> error_message{ret.error};
        std::cerr << "error message: " << error_message.get() << std::endl;
      }
    }
  }
  void wingii_execute_free(wingii_call_prep_t *const prep)
  {
    delete (wingii_call_prep_t *)prep;
  }
}
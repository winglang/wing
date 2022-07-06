#include "wingpf.h"
#include <node_embedding_api.h>

#include <mutex>
#include <vector>
#include <string>
#include <memory>
#include <cstring>
#include <cassert>
#include <fstream>
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
  struct wingpf_call_prep_t_
  {
    std::mutex mutex;
    const char *program;
    const char *context;
    wingpf_engine_type_t type;
  };
  wingpf_call_prep_t *wingpf_prep(wingpf_engine_type_t const type)
  {
    const auto instance = new wingpf_call_prep_t_();
    instance->type = type;
    return instance;
  }
  void wingpf_set_program(wingpf_call_prep_t *const instance, const char *const program)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    if (instance->program == program)
      return;
    instance->program = program;
  }
  void wingpf_set_context(wingpf_call_prep_t *const instance, const char *const context)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    if (instance->context == context)
      return;
    instance->context = context;
  }
  int wingpf_call(wingpf_call_prep_t *const instance)
  {
    assert(instance);
    std::lock_guard<std::mutex> lock(instance->mutex);

    assert(instance->program);
    assert(instance->context);

    std::vector<std::string> arguments{instance->program};
    std::vector<char> script_buffer;
    std::vector<char *> argv;

    for (const auto &arg : arguments)
      argv.push_back((char *)arg.data());
    argv.push_back(nullptr);
    const auto argc = argv.size() - 1;

    // if program is a path, read it first:
    if (std::strlen(instance->program) < 4096)
    {
      std::ifstream script_file(instance->program);
      if (script_file.good())
      {
        // this is HORRIBLY inefficient, but it's a test functionality
        script_file.seekg(0, std::ios::end);
        const auto script_size = script_file.tellg();
        script_file.seekg(0, std::ios::beg);
        script_buffer = std::vector<char>(script_size);
        script_file.read(script_buffer.data(), script_size);
        script_file.close();
        script = script_buffer.data();
      }
    }
    // if program is not a path, then it's in-memory
    if (!script)
    {
      script = instance->program;
    }
    node_options_t options{static_cast<int>(argc), argv.data(), napi_entry};
    const auto ret = node_run(options);
    if (ret.exit_code != 0)
    {
      std::cerr << "program exited with non-zero code: " << ret.exit_code << std::endl;
      if (ret.error != nullptr)
      {
        std::shared_ptr<char> error_message{ret.error};
        std::cerr << "error message: " << std::string(error_message.get()) << std::endl;
      }
    }
    return ret.exit_code;
  }
  void wingpf_free(wingpf_call_prep_t *const instance)
  {
    if (!instance)
      return;
    delete instance;
  }
}

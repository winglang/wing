// originally from: https://github.com/patr0nus/libnode

#include <vector>
#include <mutex>
#include <memory>
#include <optional>

#include "node.h"
#include "node_embedding_api.h"

#include "uv.h"
#include "v8.h"

namespace
{
  char *join_errors(const std::vector<std::string> &errors)
  {
    std::string joined_error;
    for (std::size_t i = 0; i < errors.size(); ++i)
    {
      if (i > 0)
      {
        joined_error += '\n';
      }
      joined_error += errors[i];
    }
    char *c_result = (char *)malloc(joined_error.size() + 1);
    joined_error.copy(c_result, joined_error.size());
    c_result[joined_error.size()] = '\0';
    return c_result;
  }

  std::vector<std::string> create_arg_vec(int argc, const char *const *argv)
  {
    std::vector<std::string> vec;
    if (argc > 0)
    {
      vec.reserve(argc);
      for (int i = 0; i < argc; ++i)
      {
        vec.emplace_back(argv[i]);
      }
    }
    return vec;
  }

  node_run_result_t RunNodeInstance(
      node::MultiIsolatePlatform *platform,
      const std::vector<std::string> &args,
      const std::vector<std::string> &exec_args,
      napi_addon_register_func napi_reg_func)
  {
    std::vector<std::string> errors;
    std::unique_ptr<node::CommonEnvironmentSetup> setup =
        node::CommonEnvironmentSetup::Create(
            platform, &errors, args, exec_args,
            static_cast<node::EnvironmentFlags::Flags>(
                node::EnvironmentFlags::kDefaultFlags |
                node::EnvironmentFlags::kNoGlobalSearchPaths));

    if (!setup)
    {
      return {1, join_errors(errors)};
    }

    v8::Isolate *isolate = setup->isolate();
    node::Environment *env = setup->env();

    node_run_result_t result{0, nullptr};
    node::SetProcessExitHandler(env, [&](node::Environment *env, int exit_code)
                                {
            result.exit_code = exit_code;
            node::Stop(env); });

    {
      v8::Locker locker(isolate);
      v8::Isolate::Scope isolate_scope(isolate);
      v8::HandleScope handle_scope(isolate);
      v8::Context::Scope context_scope(setup->context());

      node::AddLinkedBinding(env, napi_module{
                                      NAPI_MODULE_VERSION,
                                      node::ModuleFlags::kLinked,
                                      nullptr,
                                      napi_reg_func,
                                      "__embedder_mod",
                                      nullptr,
                                      {0},
                                  });

      v8::MaybeLocal<v8::Value> loadenv_ret = node::LoadEnvironment(
          env,
          "globalThis.require = require('module').createRequire(process.execPath);"
          "process._linkedBinding('__embedder_mod');");

      if (loadenv_ret.IsEmpty())
      { // There has been a JS exception.
        result.exit_code = 1;
      }
      else
      {
        int evtloop_ret = node::SpinEventLoop(env).FromMaybe(1);
        if (result.exit_code == 0)
        {
          result.exit_code = evtloop_ret;
        }
      }
      node::Stop(env);
    }

    return result;
  }
}

extern "C"
{
  node_run_result_t node_run(node_options_t options)
  {
    std::vector<std::string> process_args = create_arg_vec(options.process_argc, options.process_argv);
    if (process_args.empty())
    {
      return {1, join_errors({"process args is empty"})};
    }
    std::vector<std::string> args{process_args[0]};

    std::vector<std::string> exec_args;
    std::vector<std::string> errors;
    int exit_code = node::InitializeNodeWithArgs(
        &args, &exec_args, &errors,
        static_cast<node::ProcessFlags::Flags>(
            node::ProcessFlags::kDisableCLIOptions |
            node::ProcessFlags::kDisableNodeOptionsEnv));

    if (exit_code != 0)
    {
      return {exit_code, join_errors(errors)};
    }
    std::unique_ptr<node::MultiIsolatePlatform> platform = node::MultiIsolatePlatform::Create(4);
    v8::V8::InitializePlatform(platform.get());
    v8::V8::Initialize();

    node_run_result_t result = RunNodeInstance(platform.get(), process_args, exec_args, options.napi_reg_func);

    v8::V8::Dispose();
    v8::V8::ShutdownPlatform();

    return result;
  }
}

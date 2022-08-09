#include <array>
#include <memory>
#include <vector>
#include <cstring>
#include <cassert>
#include <sstream>
#include <iostream>

#include <v8.h>
#include <uv.h>
#include <node.h>
#include <node_api.h>

#include "incbin.h"
// this is the "setup script", it's executed once at startup
// use this to cache things are add things to the global scope
INCTXT(WingRuntimeSetupBundle, "setup.bundle.js");
// this is the "entry script", it's executed after startup
// use this to add business logic (e.g. CLI handling)
INCTXT(WingRuntimeEntryBundle, "entry.bundle.js");

#include "../../wingc/wingc.h"

/** @brief asserts the condition, terminates with "napi_fatal_error" */
#define NAPI_ASSERT(condition)                                                 \
  if (!(condition))                                                            \
  {                                                                            \
    napi_fatal_error("wingrt", NAPI_AUTO_LENGTH, #condition, NAPI_AUTO_LENGTH); \
    assert(false);                                                             \
  }
/** @brief asserts napi operation returned with "napi_ok" */
#define NAPI_ENSURE(expr) NAPI_ASSERT(napi_ok == (expr))

namespace
{
  /**
   * @brief converts a napi value to a std::string
   * @note terminates if napi value is not a string
   * @param env napi environment
   * @param value napi value
   * @return std::string (utf-8)
   */
  std::string napi_value_to_string(napi_env env, napi_value value)
  {
    std::string result;
    size_t length = 0;
    NAPI_ENSURE(napi_get_value_string_utf8(env, value, nullptr, 0, &length));
    result.resize(length);
    NAPI_ENSURE(napi_get_value_string_utf8(env, value, &result[0], length + 1, &length));
    return result;
  }

  /**
   * @brief napi wrapper for "wingc_compile"
   * @param env napi environment
   * @param info napi function call info
   * @return napi_value (JS string result of compilation)
   */
  napi_value napi_wingc_compile(napi_env env, napi_callback_info info)
  {
    napi_value ret;
    size_t argc = 2;
    napi_value args[2];

    NAPI_ENSURE(napi_get_cb_info(env, info, &argc, args, nullptr, nullptr));
    NAPI_ASSERT(argc == 2);
    napi_valuetype type;
    NAPI_ENSURE(napi_typeof(env, args[0], &type));
    NAPI_ASSERT(type == napi_string);
    NAPI_ENSURE(napi_typeof(env, args[1], &type));
    NAPI_ASSERT(type == napi_string);

    auto program = napi_value_to_string(env, args[0]);
    auto workdir = napi_value_to_string(env, args[1]);

    // "napi_create_string_utf8" copies, so we call Rust to free the original string upon return
    std::shared_ptr<const char> ptr(wingc_compile(program.c_str(), workdir.c_str()), wingc_release);
    NAPI_ENSURE(napi_create_string_utf8(env, ptr.get(), NAPI_AUTO_LENGTH, &ret));
    return ret;
  }

  int RunNodeInstance(node::MultiIsolatePlatform *platform,
                      const std::vector<std::string> &args,
                      const std::vector<std::string> &exec_args)
  {
    int exit_code = 0;
    std::vector<std::string> errors;
    auto setup = node::CommonEnvironmentSetup::Create(platform, &errors, args, exec_args);
    NAPI_ASSERT(setup);
    auto env = setup->env();
    auto isolate = setup->isolate();

    {
      v8::Locker locker(isolate);
      v8::Isolate::Scope isolate_scope(isolate);
      v8::HandleScope handle_scope(isolate);
      v8::Context::Scope context_scope(setup->context());

      node::AddLinkedBinding(
          env,
          napi_module{
              NAPI_MODULE_VERSION,
              node::ModuleFlags::kLinked,
              nullptr,
              [](napi_env env, napi_value exports) -> napi_value
              {
                napi_value fn;
                napi_status status;
                NAPI_ENSURE(napi_create_function(env, NULL, 0, napi_wingc_compile, NULL, &fn));
                NAPI_ENSURE(napi_set_named_property(env, exports, "compile", fn));
                return exports;
              },
              "__wing",
              nullptr,
              {0},
          });

      v8::MaybeLocal<v8::Value> eval = node::LoadEnvironment(
          env, gWingRuntimeSetupBundleData);

      if (eval.IsEmpty()) // There has been a JS exception.
        return 1;

      exit_code = node::SpinEventLoop(env).FromMaybe(1);
      NAPI_ASSERT(exit_code == 0);

      auto context = setup->context();
      auto source = v8::String::NewFromUtf8(
                        isolate, gWingRuntimeEntryBundleData, v8::NewStringType::kNormal)
                        .ToLocalChecked();
      auto script = v8::Script::Compile(context, source).ToLocalChecked();
      script->Run(context).ToLocalChecked();

      exit_code = node::SpinEventLoop(env).FromMaybe(1);
      NAPI_ASSERT(exit_code == 0);

      node::Stop(env);
    }

    return exit_code;
  }

  /**
   * @brief modifies the input argc and argv to make sure script name is always
   * fixed to "wingrt.js" and also passes some default Node args into runtime.
   * @param argc original argc
   * @param argv original argv
   * @return char** modified argv
   */
  char **wingrt_setup_args(int &argc, char **argv)
  {
    static const std::vector<std::string> args{
        "--experimental-modules",
        "--experimental-wasi-unstable-preview1",
        "--no-global-search-paths",
        "--no-experimental-fetch",
        "--no-deprecation",
        "--no-warnings",
        "wingrt.js", // leaving this here makes sure script name is always fixed
    };
    int new_argc = argc + args.size();
    char **new_argv = new char *[new_argc + 1];
    new_argv[0] = argv[0]; // execPath remains the same
    for (int i = 0; i < args.size(); ++i)
      new_argv[i + 1] = strdup(args[i].c_str());
    for (int i = 1; i < argc; ++i)
      new_argv[i + args.size()] = argv[i];
    new_argv[new_argc] = nullptr;
    argc = new_argc;
    return new_argv;
  }
}

int main(int argc, char *argv[])
{
  argv = wingrt_setup_args(argc, argv);
  argv = uv_setup_args(argc, argv);
  std::vector<std::string> args(argv, argv + argc);
  std::vector<std::string> exec_args;
  std::vector<std::string> errors;
  int exit_code = node::InitializeNodeWithArgs(&args, &exec_args, &errors);
  NAPI_ASSERT(exit_code == 0);
  static std::unique_ptr<node::MultiIsolatePlatform> platform =
      node::MultiIsolatePlatform::Create(4);
  v8::V8::InitializePlatform(platform.get());
  v8::V8::Initialize();
  int ret = RunNodeInstance(platform.get(), args, exec_args);
  v8::V8::Dispose();
  v8::V8::ShutdownPlatform();
  return ret;
}

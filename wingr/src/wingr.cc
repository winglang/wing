#include <array>
#include <memory>
#include <cstring>
#include <cassert>
#include <sstream>

#include <v8.h>
#include <uv.h>
#include <node.h>
#include <node_api.h>

#include "incbin.h"
INCTXT(WingRuntimeSetupBundle, "setup.bundle.js");
INCTXT(WingRuntimeEntryBundle, "entry.bundle.js");

#include "../../wingc/wingc.h"

#define NAPI_ASSERT(condition)                                                 \
  if (!(condition))                                                            \
  {                                                                            \
    napi_fatal_error("wingr", NAPI_AUTO_LENGTH, #condition, NAPI_AUTO_LENGTH); \
    assert(false);                                                             \
  }
#define NAPI_ENSURE(expr) NAPI_ASSERT(napi_ok == (expr))

namespace
{
  std::string napi_value_to_string(napi_env env, napi_value value)
  {
    std::string result;
    size_t length = 0;
    NAPI_ENSURE(napi_get_value_string_utf8(env, value, nullptr, 0, &length));
    result.resize(length);
    NAPI_ENSURE(napi_get_value_string_utf8(env, value, &result[0], length + 1, &length));
    return result;
  }

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

    std::shared_ptr<const char> ptr(wingc_compile(program.c_str(), workdir.c_str()), wingc_release);
    NAPI_ENSURE(napi_create_string_utf8(env, ptr.get(), NAPI_AUTO_LENGTH, &ret));
    return ret;
  }

  static napi_value napi_entry(napi_env env, napi_value exports)
  {
    napi_value fn;
    napi_status status;
    NAPI_ENSURE(napi_create_function(env, NULL, 0, napi_wingc_compile, NULL, &fn));
    NAPI_ENSURE(napi_set_named_property(env, exports, "compile", fn));
    return exports;
  }

  node::CommonEnvironmentSetup *
  RunNodeInstance(node::MultiIsolatePlatform *platform,
                  const std::vector<std::string> &args,
                  const std::vector<std::string> &exec_args)
  {
    int exit_code = 0;
    std::vector<std::string> errors;
    static auto setup = node::CommonEnvironmentSetup::Create(platform, &errors, args, exec_args);
    assert(setup);
    auto isolate = setup->isolate();
    auto env = setup->env();

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
              napi_entry,
              "__wing",
              nullptr,
              {0},
          });

      v8::MaybeLocal<v8::Value> eval = node::LoadEnvironment(
          env, gWingRuntimeSetupBundleData);

      if (!eval.IsEmpty())
        node::SpinEventLoop(env);
    }

    return setup.get();
  }
}

int main(int argc, char *argv[])
{
  // make sure script name is always fixed.
  int new_argc = argc + 1;
  char **new_argv = new char *[new_argc];
  new_argv[0] = argv[0];
  new_argv[1] = strdup("wing.js");
  for (int i = 1; i < argc; i++)
    new_argv[i + 1] = argv[i];
  new_argv[new_argc] = nullptr;
  argc = new_argc;
  argv = new_argv;

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
  auto setup = RunNodeInstance(platform.get(), args, exec_args);
  NAPI_ASSERT(setup);

  auto env = setup->env();
  auto isolate = setup->isolate();
  v8::Locker locker(isolate);
  v8::Isolate::Scope isolate_scope(isolate);
  v8::HandleScope handle_scope(isolate);
  auto context = setup->context();
  v8::Local<v8::String> source =
      v8::String::NewFromUtf8(
          isolate, gWingRuntimeEntryBundleData, v8::NewStringType::kNormal)
          .ToLocalChecked();
  v8::Local<v8::Script> script =
      v8::Script::Compile(context, source).ToLocalChecked();
  v8::Local<v8::Value> result = script->Run(context).ToLocalChecked();
  return node::SpinEventLoop(env).FromMaybe(1);
}

#include "node_bridge.hh"

#include <array>
#include <memory>
#include <cstring>
#include <cassert>
#include <sstream>

#include <v8.h>
#include <uv.h>
#include <node.h>

namespace
{
  node::CommonEnvironmentSetup *
  RunNodeInstance(node::MultiIsolatePlatform *platform,
                  const std::vector<std::string> &args,
                  const std::vector<std::string> &exec_args)
  {
    int exit_code = 0;

    // Setup up a libuv event loop, v8::Isolate, and Node.js Environment.
    std::vector<std::string> errors;
    static auto setup = node::CommonEnvironmentSetup::Create(platform, &errors, args, exec_args);
    assert(setup);
    auto isolate = setup->isolate();
    auto env = setup->env();

    {
      v8::Locker locker(isolate);
      v8::Isolate::Scope isolate_scope(isolate);
      v8::HandleScope handle_scope(isolate);
      // The v8::Context needs to be entered when node::CreateEnvironment() and
      // node::LoadEnvironment() are being called.
      v8::Context::Scope context_scope(setup->context());

      // Set up the Node.js instance for execution, and run code inside of it.
      // There is also a variant that takes a callback and provides it with
      // the `require` and `process` objects, so that it can manually compile
      // and run scripts as needed.
      // The `require` function inside this script does *not* access the file
      // system, and can only load built-in Node.js modules.
      // `module.createRequire()` is being used to create one that is able to
      // load files from the disk, and uses the standard CommonJS file loader
      // instead of the internal-only `require` function.
      v8::MaybeLocal<v8::Value> env_eval = node::LoadEnvironment(
          env,
          [&](const node::StartExecutionCallbackInfo &info) -> v8::MaybeLocal<v8::Value>
          {
            v8::Isolate *isolate = v8::Isolate::GetCurrent();
            v8::HandleScope scope(isolate);
            v8::Local<v8::Context> context = isolate->GetCurrentContext();
            v8::Local<v8::Object> global_object = context->Global();
            global_object->Set(context, v8::String::NewFromUtf8(isolate, "require").ToLocalChecked(), info.native_require).ToChecked();
            global_object->Set(context, v8::String::NewFromUtf8(isolate, "process").ToLocalChecked(), info.process_object).ToChecked();
            v8::Local<v8::String> source =
                v8::String::NewFromUtf8(
                    isolate,
                    "const publicRequire = "
                    "require('module').createRequire(process.cwd() + '/');"
                    "globalThis.require = publicRequire;",
                    v8::NewStringType::kNormal)
                    .ToLocalChecked();
            v8::Local<v8::Script> script =
                v8::Script::Compile(context, source).ToLocalChecked();
            v8::Local<v8::Value> result = script->Run(context).ToLocalChecked();
            v8::String::Utf8Value utf8(isolate, result);
            return v8::Null(isolate);
          });

      // Check for JS exception.
      if (!env_eval.IsEmpty())
        node::SpinEventLoop(env);

      // TODO: cleanup
      // node::Stop(env);
    }

    return setup.get();
  }

  auto _node_main(int argc, char *argv[])
  {
    std::vector<std::string> errors;
    std::vector<std::string> args{
        argv[0],
        "--require=ts-node/register/transpile-only",
        "--experimental-modules",
        "--experimental-wasi-unstable-preview1",
        "--no-global-search-paths",
        "--no-experimental-fetch",
        "--no-deprecation",
        "--no-warnings",
    };

    struct ScopedArgs
    {
      int _argc{0};
      char **_argv{nullptr};

      ScopedArgs(const std::vector<std::string> &args)
      {
        int _argc = args.size();
        char **_argv = new char *[_argc + 1];
        for (int i = 0; i < _argc; ++i)
          _argv[i] = new char[args[i].size() + 1];
        for (int i = 0; i < _argc; ++i)
          std::strcpy(_argv[i], args[i].c_str());
        _argv[_argc] = nullptr;
      }

      ~ScopedArgs()
      {
        for (int i = 0; i < _argc; ++i)
        {
          delete[] _argv[i];
          _argv[i] = nullptr;
        }
        delete[] _argv;
        _argv = nullptr;
      }

    } scoped_args(args);

    uv_setup_args(scoped_args._argc, scoped_args._argv);
    std::vector<std::string> exec_args;
    int exit_code = node::InitializeNodeWithArgs(&args, &exec_args, &errors);
    assert(exit_code == 0);
    static std::unique_ptr<node::MultiIsolatePlatform> platform =
        node::MultiIsolatePlatform::Create(4);
    v8::V8::InitializePlatform(platform.get());
    v8::V8::Initialize();

    auto ret = RunNodeInstance(platform.get(), args, exec_args);

    // TODO: cleanup
    // v8::V8::Dispose();
    // v8::V8::ShutdownPlatform();

    return ret;
  };
}

namespace wrr
{
  int NodeBridge::execute(const std::string &program)
  {
    static node::CommonEnvironmentSetup *setup{nullptr};
    if (!setup)
    {
      const char *argv[] = {"wingrr", nullptr};
      int argc = sizeof(argv) / sizeof(argv[0]) - 1;
      setup = _node_main(argc, const_cast<char **>(argv));
    }

    assert(setup);
    auto env = setup->env();
    auto isolate = setup->isolate();
    v8::Locker locker(isolate);
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);
    auto context = setup->context();
    std::stringstream ss;
    ss << ";;{";
    ss << "const fs = require('fs');";
    ss << "const path = require('path');";
    ss << "const prog = path.resolve('" << program << "');";
    ss << "console.log(prog);";
    ss << "if (prog.endsWith('.ts')) {";
    ss << "  require(prog);";
    ss << "} else {";
    ss << "  require('vm').runInThisContext(fs.readFileSync(prog, 'utf8'));";
    ss << "}";
    ss << "};;";
    v8::Local<v8::String> source =
        v8::String::NewFromUtf8(isolate, ss.str().c_str(), v8::NewStringType::kNormal)
            .ToLocalChecked();
    v8::Local<v8::Script> script =
        v8::Script::Compile(context, source).ToLocalChecked();
    v8::Local<v8::Value> result = script->Run(context).ToLocalChecked();
    return node::SpinEventLoop(env).FromMaybe(1);
  }
}

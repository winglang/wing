# [stateful.test.w](../../../../../../examples/tests/sdk_tests/service/stateful.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $foo, $http_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $foo.access());
      const response = (await $http_Util.get(String.raw({ raw: ["http://localhost:", ""] }, (await $foo.port()))));
      {console.log((response.body ?? ""))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.body ?? \"\" == \"bang bang!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((response.body ?? ""),"bang bang!")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $foo, $foo_s, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const before = (await $http_Util.get(String.raw({ raw: ["http://localhost:", ""] }, (await $foo.port()))));
      {((cond) => {if (!cond) throw new Error("assertion failed: before.ok")})(before.ok)};
      (await $foo_s.stop());
      let error = false;
      try {
        (await $http_Util.get(String.raw({ raw: ["http://localhost:", ""] }, (await $foo.port()))));
      }
      catch {
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    }
  }
  return $Closure2;
}

```

## inflight.MyService-1.js
```js
module.exports = function({ $std_Duration, $std_Number, $util_Util }) {
  class MyService {
    constructor({ $this_b, $this_body }) {
      this.$this_b = $this_b;
      this.$this_body = $this_body;
    }
    async onStart() {
      {console.log("starting service")};
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      (await this.$this_b.put("ready","true"));
      const port = (await MyService.startServer(this.$this_body));
      {console.log(String.raw({ raw: ["listening on port ", ""] }, port))};
      this.state = 456;
      (await this.$this_b.put("port",String.raw({ raw: ["", ""] }, port)));
    }
    async onStop() {
      {console.log("stopping service")};
      {console.log(String.raw({ raw: ["state is: ", ""] }, this.state))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.state == 456")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.state,456)))};
      (await MyService.stopServer());
    }
    async access() {
      (await this.$this_b.get("ready"));
      {((cond) => {if (!cond) throw new Error("assertion failed: this.state == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.state,123)))};
    }
    async port() {
      return ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })((await this.$this_b.get("port")));
    }
    static async startServer(body) {
      return (require("<ABSOLUTE_PATH>/http-server.js")["startServer"])(body)
    }
    static async stopServer() {
      return (require("<ABSOLUTE_PATH>/http-server.js")["stopServer"])()
    }
    async $inflight_init() {
      this.state = 123;
    }
  }
  return MyService;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      class MyService extends $stdlib.std.Resource {
        constructor(scope, id, body) {
          super(scope, id);
          this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
          this.body = body;
          this.s = this.node.root.newAbstract("@winglang/sdk.cloud.Service",this,"cloud.Service",this);
        }
        static _toInflightType(context) {
          return `
            require("./inflight.MyService-1.js")({
              $std_Duration: ${context._lift($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
              $std_Number: ${context._lift($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
              $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const MyServiceClient = ${MyService._toInflightType(this)};
              const client = new MyServiceClient({
                $this_b: ${this._lift(this.b)},
                $this_body: ${this._lift(this.body)},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _getInflightOps() {
          return ["state", "onStart", "onStop", "access", "port", "startServer", "stopServer", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("$inflight_init")) {
            MyService._registerBindObject(this.b, host, []);
            MyService._registerBindObject(this.body, host, []);
          }
          if (ops.includes("access")) {
            MyService._registerBindObject(this.b, host, ["get"]);
          }
          if (ops.includes("onStart")) {
            MyService._registerBindObject(MyService, host, ["startServer"]);
            MyService._registerBindObject(this.b, host, ["put"]);
            MyService._registerBindObject(this.body, host, []);
          }
          if (ops.includes("onStop")) {
            MyService._registerBindObject(MyService, host, ["stopServer"]);
          }
          if (ops.includes("port")) {
            MyService._registerBindObject(this.b, host, ["get"]);
          }
          super._registerBind(host, ops);
        }
      }
      const foo = new MyService(this,"MyService","bang bang!");
      class $Closure1 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure1-1.js")({
              $foo: ${context._lift(foo)},
              $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure1Client = ${$Closure1._toInflightType(this)};
              const client = new $Closure1Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure1._registerBindObject(foo, host, ["access", "port"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:service is ready only after onStart finishes",new $Closure1(this,"$Closure1"));
      class $Closure2 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure2-1.js")({
              $foo: ${context._lift(foo)},
              $foo_s: ${context._lift(foo.s)},
              $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure2Client = ${$Closure2._toInflightType(this)};
              const client = new $Closure2Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerBindObject(foo, host, ["port"]);
            $Closure2._registerBindObject(foo.s, host, ["stop"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:service.stop() can be used to stop the service before shutdown",new $Closure2(this,"$Closure2"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "stateful.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


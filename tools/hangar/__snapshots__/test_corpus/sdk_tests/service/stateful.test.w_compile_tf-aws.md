# [stateful.test.w](../../../../../../examples/tests/sdk_tests/service/stateful.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $__parent_this_1_b, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("starting service")};
      (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      (await $__parent_this_1_b.put("ready", "true"));
      const state = 456;
      return async () => {
        {console.log("stopping service")};
        {console.log(String.raw({ raw: ["state is: ", ""] }, state))};
        {((cond) => {if (!cond) throw new Error("assertion failed: state == 456")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(state,456)))};
      }
      ;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $foo.access());
    }
  }
  return $Closure2;
}

```

## inflight.MyService-1.js
```js
"use strict";
module.exports = function({ $std_Number }) {
  class MyService {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async access() {
      (await this.$this_b.get("ready"));
    }
    async port() {
      return ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })((await this.$this_b.get("port")));
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      class MyService extends $stdlib.std.Resource {
        constructor($scope, $id, body) {
          super($scope, $id);
          this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
          this.body = body;
          const __parent_this_1 = this;
          class $Closure1 extends $stdlib.std.Resource {
            constructor($scope, $id, ) {
              super($scope, $id);
              (std.Node.of(this)).hidden = true;
            }
            static _toInflightType(context) {
              return `
                require("./inflight.$Closure1-1.js")({
                  $__parent_this_1_b: ${context._lift(__parent_this_1.b)},
                  $std_Duration: ${context._lift($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
                  $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
            _supportedOps() {
              return ["handle", "$inflight_init"];
            }
            _registerOnLift(host, ops) {
              if (ops.includes("handle")) {
                $Closure1._registerOnLiftObject(__parent_this_1.b, host, ["put"]);
              }
              super._registerOnLift(host, ops);
            }
          }
          this.s = this.node.root.newAbstract("@winglang/sdk.cloud.Service",this, "cloud.Service", new $Closure1(this, "$Closure1"));
        }
        static _toInflightType(context) {
          return `
            require("./inflight.MyService-1.js")({
              $std_Number: ${context._lift($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const MyServiceClient = ${MyService._toInflightType(this)};
              const client = new MyServiceClient({
                $this_b: ${this._lift(this.b)},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _supportedOps() {
          return ["access", "port", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("$inflight_init")) {
            MyService._registerOnLiftObject(this.b, host, []);
          }
          if (ops.includes("access")) {
            MyService._registerOnLiftObject(this.b, host, ["get"]);
          }
          if (ops.includes("port")) {
            MyService._registerOnLiftObject(this.b, host, ["get"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      const foo = new MyService(this, "MyService", "bang bang!");
      class $Closure2 extends $stdlib.std.Resource {
        constructor($scope, $id, ) {
          super($scope, $id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure2-1.js")({
              $foo: ${context._lift(foo)},
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
        _supportedOps() {
          return ["handle", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerOnLiftObject(foo, host, ["access"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:service is ready only after onStart finishes", new $Closure2(this, "$Closure2"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "stateful.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


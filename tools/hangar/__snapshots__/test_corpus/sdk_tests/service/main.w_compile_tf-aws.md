# [main.w](../../../../../../examples/tests/sdk_tests/service/main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $__parent_this_1_b, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $util_Util.sleep((await $std_Duration.fromSeconds(5))));
      (await $__parent_this_1_b.put("ready","true"));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
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

## inflight.Resource-1.js
```js
module.exports = function({  }) {
  class Resource {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async access() {
      (await this.$this_b.get("ready"));
    }
  }
  return Resource;
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      class Resource extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
          const __parent_this_1 = this;
          class $Closure1 extends $stdlib.std.Resource {
            constructor(scope, id, ) {
              super(scope, id);
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
            _getInflightOps() {
              return ["handle", "$inflight_init"];
            }
            _registerBind(host, ops) {
              if (ops.includes("handle")) {
                $Closure1._registerBindObject(__parent_this_1.b, host, ["put"]);
              }
              super._registerBind(host, ops);
            }
          }
          this.node.root.newAbstract("@winglang/sdk.cloud.Service",this,"cloud.Service",{ onStart: new $Closure1(this,"$Closure1") });
        }
        static _toInflightType(context) {
          return `
            require("./inflight.Resource-1.js")({
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const ResourceClient = ${Resource._toInflightType(this)};
              const client = new ResourceClient({
                $this_b: ${this._lift(this.b)},
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _getInflightOps() {
          return ["access", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("$inflight_init")) {
            Resource._registerBindObject(this.b, host, []);
          }
          if (ops.includes("access")) {
            Resource._registerBindObject(this.b, host, ["get"]);
          }
          super._registerBind(host, ops);
        }
      }
      const foo = new Resource(this,"Resource");
      class $Closure2 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
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
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerBind(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerBindObject(foo, host, ["access"]);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:service is ready only after onStart finishes",new $Closure2(this,"$Closure2"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


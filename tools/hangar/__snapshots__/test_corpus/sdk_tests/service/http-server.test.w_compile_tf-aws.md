# [http-server.test.w](../../../../../../examples/tests/sdk_tests/service/http-server.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $MyService, $__parent_this_1_b, $__parent_this_1_body }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("starting service")};
      const server = (await $MyService.createServer($__parent_this_1_body));
      const port = (await server.address()).port;
      {console.log(String.raw({ raw: ["listening on port ", ""] }, port))};
      (await $__parent_this_1_b.put("port",String.raw({ raw: ["", ""] }, port)));
      return async () => {
        {console.log("closing server...")};
        (await server.close());
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
module.exports = function({ $foo, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(String.raw({ raw: ["http://localhost:", ""] }, (await $foo.port()))));
      {console.log((response.body ?? ""))};
      {((cond) => {if (!cond) throw new Error("assertion failed: response.body ?? \"\" == \"bang bang!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((response.body ?? ""),"bang bang!")))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $foo, $foo_s, $http_Util }) {
  class $Closure3 {
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
  return $Closure3;
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
    async port() {
      return ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })((await this.$this_b.get("port")));
    }
    static async createServer(body) {
      return (require("<ABSOLUTE_PATH>/http-server.js")["createServer"])(body)
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
  constructor(scope, id) {
    super(scope, id);
    if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((util.Util.env("WING_TARGET")),"sim"))) {
      class MyService extends $stdlib.std.Resource {
        constructor(scope, id, body) {
          super(scope, id);
          this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
          this.body = body;
          const __parent_this_1 = this;
          class $Closure1 extends $stdlib.std.Resource {
            constructor(scope, id, ) {
              super(scope, id);
              (std.Node.of(this)).hidden = true;
            }
            static _toInflightType(context) {
              return `
                require("./inflight.$Closure1-1.js")({
                  $MyService: ${context._lift(MyService)},
                  $__parent_this_1_b: ${context._lift(__parent_this_1.b)},
                  $__parent_this_1_body: ${context._lift(__parent_this_1.body)},
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
            _registerOnLift(host, ops) {
              if (ops.includes("handle")) {
                $Closure1._registerOnLiftObject(MyService, host, ["createServer"]);
                $Closure1._registerOnLiftObject(__parent_this_1.b, host, ["put"]);
                $Closure1._registerOnLiftObject(__parent_this_1.body, host, []);
              }
              super._registerOnLift(host, ops);
            }
          }
          this.s = this.node.root.newAbstract("@winglang/sdk.cloud.Service",this,"cloud.Service",new $Closure1(this,"$Closure1"));
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
        _getInflightOps() {
          return ["port", "createServer", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("$inflight_init")) {
            MyService._registerOnLiftObject(this.b, host, []);
          }
          if (ops.includes("port")) {
            MyService._registerOnLiftObject(this.b, host, ["get"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      const foo = new MyService(this,"MyService","bang bang!");
      class $Closure2 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure2-1.js")({
              $foo: ${context._lift(foo)},
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
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure2._registerOnLiftObject(foo, host, ["port"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http server is started with the service",new $Closure2(this,"$Closure2"));
      class $Closure3 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          (std.Node.of(this)).hidden = true;
        }
        static _toInflightType(context) {
          return `
            require("./inflight.$Closure3-1.js")({
              $foo: ${context._lift(foo)},
              $foo_s: ${context._lift(foo.s)},
              $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            })
          `;
        }
        _toInflight() {
          return `
            (await (async () => {
              const $Closure3Client = ${$Closure3._toInflightType(this)};
              const client = new $Closure3Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `;
        }
        _getInflightOps() {
          return ["handle", "$inflight_init"];
        }
        _registerOnLift(host, ops) {
          if (ops.includes("handle")) {
            $Closure3._registerOnLiftObject(foo, host, ["port"]);
            $Closure3._registerOnLiftObject(foo.s, host, ["stop"]);
          }
          super._registerOnLift(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:service.stop() closes the http server",new $Closure3(this,"$Closure3"));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "http-server.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


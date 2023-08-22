# [store.w](../../../../../examples/tests/valid/store.w) | compile | tf-aws

## Point.Struct.js
```js
module.exports = function(stdStruct) {
  class Point {
    static jsonSchema() {
      return {
        id: "/Point",
        type: "object",
        properties: {
          x: { type: "number" },
          y: { type: "number" },
        },
        required: [
          "x",
          "y",
        ],
        $defs: {
        }
      }
    }
    static fromJson(obj) {
      return stdStruct._validate(obj, this.jsonSchema())
    }
    static _toInflightType(context) {
      return `require("./Point.Struct.js")(${ $stdlib.core.Lifting.lift(context, stdStruct) })`;
    }
  }
  return Point;
};

```

## inflight.$Closure1-1.js
```js
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1_b.put("data.txt","<empty>"));
    }
  }
  return $Closure1;
}

```

## inflight.Store-1.js
```js
module.exports = function({  }) {
  class Store {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async store(data) {
      (await this.$this_b.put("data.txt",data));
    }
  }
  return Store;
}

```

## inflight.Util-1.js
```js
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
  }
  return Util;
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

## preflight.empty-1.js
```js
module.exports = function({ $stdlib }) {
  const std = $stdlib.std;
  return {  };
};

```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $constructs = require('constructs');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const file3 = require("./preflight.empty-1.js")({ $stdlib });
const math = $stdlib.math;
const cloud = $stdlib.cloud;
class $Root extends $constructs.Construct {
  constructor(scope, id) {
    super(scope, id);
    class Util extends $constructs.Construct {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Util-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const UtilClient = ${Util._toInflightType(this)};
            const client = new UtilClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["$inflight_init"];
      }
      _registerBind(host, ops) {
      }
      static _registerTypeBind(host, ops) {
      }
    }
    class Store extends $constructs.Construct {
      constructor(scope, id, ) {
        super(scope, id);
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        const __parent_this_1 = this;
        class $Closure1 extends $constructs.Construct {
          constructor(scope, id, ) {
            super(scope, id);
            (std.Display.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure1-1.js")({
                $__parent_this_1_b: ${$stdlib.core.Lifting.lift(context, __parent_this_1.b)},
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
              $stdlib.std.Resource._registerBindObject(__parent_this_1.b, host, ["put"]);
            }
          }
          static _registerTypeBind(host, ops) {
          }
        }
        const prefill = this.node.root.newAbstract("@winglang/sdk.cloud.OnDeploy",this,"cloud.OnDeploy",new $Closure1(this,"$Closure1"));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Store-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const StoreClient = ${Store._toInflightType(this)};
            const client = new StoreClient({
              $this_b: ${$stdlib.core.Lifting.lift(this, this.b)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["store", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $stdlib.std.Resource._registerBindObject(this.b, host, []);
        }
        if (ops.includes("store")) {
          $stdlib.std.Resource._registerBindObject(this.b, host, ["put"]);
        }
      }
      static _registerTypeBind(host, ops) {
      }
    }
    const Color =
      (function (tmp) {
        tmp[tmp["RED"] = 0] = "RED";
        tmp[tmp["GREEN"] = 1] = "GREEN";
        tmp[tmp["BLUE"] = 2] = "BLUE";
        return tmp;
      })({})
    ;
    const Point = require("./Point.Struct.js")($stdlib.std.Struct);
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "store", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


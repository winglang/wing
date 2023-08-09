# [store.w](../../../../../examples/tests/valid/store.w) | compile | tf-aws

## inflight.Store.js
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const file3 = require("./preflight.empty-1.js")({ $stdlib });
const math = $stdlib.math;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Store extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("store", "$inflight_init");
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Store.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const StoreClient = ${Store._toInflightType(this).text};
            const client = new StoreClient({
              $this_b: ${this._lift(this.b)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Store._registerBindObject(this.b, host, []);
        }
        if (ops.includes("store")) {
          Store._registerBindObject(this.b, host, ["put"]);
        }
        super._registerBind(host, ops);
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
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "store", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```


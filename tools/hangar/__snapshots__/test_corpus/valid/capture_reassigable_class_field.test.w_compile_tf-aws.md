# [capture_reassigable_class_field.test.w](../../../../../examples/tests/valid/capture_reassigable_class_field.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(k) {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $counter.inc(1, key));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $counter, $kv, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $kv.set("k", ({"value": "v"})));
      (await $kv.set("k2", ({"value": "v"})));
      (await $kv.get("k"));
      (await $kv.get("k"));
      (await $kv.get("k2"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k\") == 2;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek("k")),2));
      }
      )))};
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k2\") == 1;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek("k2")),1));
      }
      )))};
    }
  }
  return $Closure3;
}

```

## inflight.KeyValueStore-1.js
```js
"use strict";
module.exports = function({  }) {
  class KeyValueStore {
    constructor({ $this_bucket, $this_onUpdateCallback }) {
      this.$this_bucket = $this_bucket;
      this.$this_onUpdateCallback = $this_onUpdateCallback;
    }
    async get(key) {
      (await this.$this_onUpdateCallback(key));
      return (await this.$this_bucket.getJson(key));
    }
    async set(key, value) {
      (await this.$this_bucket.putJson(key, value));
    }
  }
  return KeyValueStore;
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
  },
  "resource": {
    "aws_dynamodb_table": {
      "sasa": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/sasa/Default",
            "uniqueId": "sasa"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-sasa-c8fc4cc8"
      }
    },
    "aws_s3_bucket": {
      "KeyValueStore_cloudBucket_D9D365FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/Default",
            "uniqueId": "KeyValueStore_cloudBucket_D9D365FD"
          }
        },
        "bucket_prefix": "cloud-bucket-c8a9ef69-",
        "force_destroy": false
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class KeyValueStore extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure1-1.js")({
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
        }
        this.onUpdateCallback = new $Closure1(this, "$Closure1");
      }
      onUpdate(fn) {
        this.onUpdateCallback = fn;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.KeyValueStore-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const KeyValueStoreClient = ${KeyValueStore._toInflightType(this)};
            const client = new KeyValueStoreClient({
              $this_bucket: ${this._lift(this.bucket)},
              $this_onUpdateCallback: ${this._lift(this.onUpdateCallback)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["get", "set", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          KeyValueStore._registerOnLiftObject(this.bucket, host, []);
          KeyValueStore._registerOnLiftObject(this.onUpdateCallback, host, []);
        }
        if (ops.includes("get")) {
          KeyValueStore._registerOnLiftObject(this.bucket, host, ["getJson"]);
          KeyValueStore._registerOnLiftObject(this.onUpdateCallback, host, ["handle"]);
        }
        if (ops.includes("set")) {
          KeyValueStore._registerOnLiftObject(this.bucket, host, ["putJson"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $counter: ${context._lift(counter)},
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
          $Closure2._registerOnLiftObject(counter, host, ["inc"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $counter: ${context._lift(counter)},
            $kv: ${context._lift(kv)},
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(counter, host, ["peek"]);
          $Closure3._registerOnLiftObject(kv, host, ["get", "set"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const kv = new KeyValueStore(this, "KeyValueStore");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this, "sasa");
    (kv.onUpdate(new $Closure2(this, "$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:main", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "capture_reassigable_class_field.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


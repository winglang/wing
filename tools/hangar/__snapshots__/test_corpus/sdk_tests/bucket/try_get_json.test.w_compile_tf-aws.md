# [try_get_json.test.w](../../../../../../examples/tests/sdk_tests/bucket/try_get_json.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $b, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonObj1 = ({"key1": "value1"});
      const jsonObj2 = ({"key2": "value2"});
      (await $b.putJson("file1.json", jsonObj1));
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.tryGetJson(\"file1.json\")) == Json.stringify(jsonObj1)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await $b.tryGetJson("file1.json"))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jsonObj1]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGetJson(\"file2.json\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGetJson("file2.json")),undefined)))};
      (await $b.putJson("file2.json", jsonObj2));
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.tryGetJson(\"file2.json\")) == Json.stringify(jsonObj2)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await $b.tryGetJson("file2.json"))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jsonObj2]))))};
      (await $b.delete("file1.json"));
      (await $b.delete("file2.json"));
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGetJson(\"file1.json\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGetJson("file1.json")),undefined)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.tryGetJson(\"file2.json\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.tryGetJson("file2.json")),undefined)))};
    }
  }
  return $Closure1;
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_s3_bucket": {
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
            $b: ${context._lift(b)},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
          $Closure1._registerOnLiftObject(b, host, ["delete", "putJson", "tryGetJson"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:tryGetJson", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "try_get_json.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


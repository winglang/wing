# [metadata.test.w](../../../../../../examples/tests/sdk_tests/bucket/metadata.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("file1.main.w", "Foo"));
      (await $b.put("file2.txt", "Bar"));
      (await $b.put("file3.txt", "Baz", ({"contentType": "application/json"})));
      (await $b.putJson("file4.txt", "Qux"));
      const file1Metadata = (await $b.metadata("file1.main.w"));
      {((cond) => {if (!cond) throw new Error("assertion failed: file1Metadata.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file1Metadata.size,3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file1Metadata.contentType == \"application/octet-stream\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file1Metadata.contentType,"application/octet-stream")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file1Metadata.lastModified.year >= 2023")})((file1Metadata.lastModified.year >= 2023))};
      const file2Metadata = (await $b.metadata("file2.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: file2Metadata.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file2Metadata.size,3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2Metadata.contentType == \"text/plain\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file2Metadata.contentType,"text/plain")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2Metadata.lastModified.year >= 2023")})((file2Metadata.lastModified.year >= 2023))};
      const file3Metadata = (await $b.metadata("file3.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: file3Metadata.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file3Metadata.size,3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file3Metadata.contentType == \"application/json\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file3Metadata.contentType,"application/json")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file3Metadata.lastModified.year >= 2023")})((file3Metadata.lastModified.year >= 2023))};
      const file4Metadata = (await $b.metadata("file4.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: file4Metadata.size == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file4Metadata.size,5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file4Metadata.contentType == \"application/json\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file4Metadata.contentType,"application/json")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file4Metadata.lastModified.year >= 2023")})((file4Metadata.lastModified.year >= 2023))};
      try {
        (await $b.metadata("no-such-file.txt"));
      }
      catch ($error_e) {
        const e = $error_e.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: e.contains(\"Object does not exist (key=no-such-file.txt).\")")})(e.includes("Object does not exist (key=no-such-file.txt)."))};
      }
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
          $Closure1._registerOnLiftObject(b, host, ["metadata", "put", "putJson"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:metadata()", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "metadata.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


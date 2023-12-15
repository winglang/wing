# [copy.test.w](../../../../../../examples/tests/sdk_tests/bucket/copy.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $b, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const assertThrows = async (expected, block) => {
        let error = false;
        try {
          (await block());
        }
        catch ($error_actual) {
          const actual = $error_actual.message;
          {((cond) => {if (!cond) throw new Error("assertion failed: actual.contains(expected)")})(actual.includes(expected))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      };
      const UNEXISTING_KEY = "no-such-file.txt";
      const OBJECT_DOES_NOT_EXIST_ERROR = String.raw({ raw: ["Source object does not exist (srcKey=", ")."] }, UNEXISTING_KEY);
      const KEY1 = "file1.main.w";
      const VALUE1 = "bring cloud;";
      const KEY2 = "file2.txt";
      const VALUE2 = ({"msg": "Hello world!"});
      (await $b.put(KEY1, VALUE1));
      (await $b.putJson(KEY2, VALUE2));
      const file1SrcMetadata = (await $b.metadata(KEY1));
      const file2SrcMetadata = (await $b.metadata(KEY2));
      (await $util_Util.sleep((await $std_Duration.fromSeconds(2))));
      (await $b.copy(KEY1, KEY1));
      (await $b.copy(KEY2, String.raw({ raw: ["dir/", ""] }, KEY2)));
      const file1DstMetadata = (await $b.metadata(KEY1));
      const file2DstMetadata = (await $b.metadata(String.raw({ raw: ["dir/", ""] }, KEY2)));
      {((cond) => {if (!cond) throw new Error("assertion failed: file1SrcMetadata.contentType == file1DstMetadata.contentType")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file1SrcMetadata.contentType,file1DstMetadata.contentType)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file1SrcMetadata.size == file1DstMetadata.size")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file1SrcMetadata.size,file1DstMetadata.size)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file1SrcMetadata.lastModified != file1DstMetadata.lastModified")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(file1SrcMetadata.lastModified,file1DstMetadata.lastModified)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2SrcMetadata.contentType == file2DstMetadata.contentType")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file2SrcMetadata.contentType,file2DstMetadata.contentType)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2SrcMetadata.size == file2DstMetadata.size")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file2SrcMetadata.size,file2DstMetadata.size)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2SrcMetadata.lastModified != file2DstMetadata.lastModified")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(file2SrcMetadata.lastModified,file2DstMetadata.lastModified)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(KEY2) == b.get(\"dir/{KEY2}\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.get(KEY2)),(await $b.get(String.raw({ raw: ["dir/", ""] }, KEY2))))))};
      (await assertThrows(OBJECT_DOES_NOT_EXIST_ERROR, async () => {
        (await $b.copy(UNEXISTING_KEY, KEY1));
      }));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $b: ${$stdlib.core.liftObject(b)},
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(b, host, ["copy", "get", "metadata", "put", "putJson"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:copy()", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "copy.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


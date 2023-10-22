# [copy.test.w](../../../../../../examples/tests/sdk_tests/bucket/copy.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $b, $std_Duration, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const KEY1 = "file1.main.w";
      const VALUE1 = "bring cloud;";
      const KEY2 = "file2.txt";
      const VALUE2 = ({"msg": "Hello world!"});
      (await $b.put(KEY1,VALUE1));
      (await $b.putJson(KEY2,VALUE2));
      const file1SrcMetadata = (await $b.metadata(KEY1));
      const file2SrcMetadata = (await $b.metadata(KEY2));
      (await $util_Util.sleep((await $std_Duration.fromSeconds(0.1))));
      (await $b.copy(KEY1,KEY1));
      (await $b.copy(KEY2,String.raw({ raw: ["dir/", ""] }, KEY2)));
      const file1DstMetadata = (await $b.metadata(KEY1));
      const file2DstMetadata = (await $b.metadata(String.raw({ raw: ["dir/", ""] }, KEY2)));
      {((cond) => {if (!cond) throw new Error("assertion failed: file1SrcMetadata.contentType == file1DstMetadata.contentType")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file1SrcMetadata.contentType,file1DstMetadata.contentType)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file1SrcMetadata.size == file1DstMetadata.size")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file1SrcMetadata.size,file1DstMetadata.size)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file1SrcMetadata.lastModified != file1DstMetadata.lastModified")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(file1SrcMetadata.lastModified,file1DstMetadata.lastModified)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2SrcMetadata.contentType == file2DstMetadata.contentType")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file2SrcMetadata.contentType,file2DstMetadata.contentType)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2SrcMetadata.size == file2DstMetadata.size")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(file2SrcMetadata.size,file2DstMetadata.size)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: file2SrcMetadata.lastModified != file2DstMetadata.lastModified")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(file2SrcMetadata.lastModified,file2DstMetadata.lastModified)))};
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $b: ${context._lift(b)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(b, host, ["copy", "metadata", "put", "putJson"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copy()",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "copy.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


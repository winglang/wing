# [bucket_list.test.w](../../../../../../examples/tests/sdk_tests/bucket/bucket_list.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const jsonObj1 = ({"key1": "value1"});
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.list()).length,1)))};
      (await $b.putJson("file1.json", jsonObj1));
      (await $b.put("file2.txt", "Bar"));
      (await $b.put("random", "Buz"));
      const objs = (await $b.list());
      const objs2 = (await $b.list("file"));
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file1.json\")")})(objs.includes("file1.json"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file2.txt\")")})(objs.includes("file2.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"file3.txt\")")})(objs.includes("file3.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.contains(\"random\")")})(objs.includes("random"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file1.json\")")})(objs2.includes("file1.json"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file2.txt\")")})(objs2.includes("file2.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.contains(\"file3.txt\")")})(objs2.includes("file3.txt"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !objs2.contains(\"random\")")})((!objs2.includes("random")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs.length,4)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: objs2.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(objs2.length,3)))};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.js.map
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
    },
    "aws_s3_object": {
      "cloudBucket_S3Object-file3txt_DFC4715B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file3.txt",
            "uniqueId": "cloudBucket_S3Object-file3txt_DFC4715B"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "Baz",
        "key": "file3.txt"
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
          require("./inflight.$Closure1-1.js")({
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
          $Closure1._registerOnLiftObject(b, host, ["list", "put", "putJson"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket", this, "cloud.Bucket");
    (b.addObject("file3.txt", "Baz"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:list", new $Closure1(this, "$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bucket_list.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```


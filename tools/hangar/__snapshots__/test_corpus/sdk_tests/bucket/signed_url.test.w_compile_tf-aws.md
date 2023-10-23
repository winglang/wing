# [signed_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/signed_url.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $http_Util, $testBucket, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let error = "";
      (await $testBucket.put("file1.txt", "Foo"));
      if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })((await $util_Util.env("WING_TARGET")),"sim"))) {
        const signedUrl = (await $testBucket.signedUrl("file1.txt"));
        {((cond) => {if (!cond) throw new Error("assertion failed: http.get(signedUrl).body ==  \"Foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(signedUrl)).body,"Foo")))};
      }
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $testBucket, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      let error = "";
      if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })((await $util_Util.env("WING_TARGET")),"sim"))) {
        try {
          const signedUrl = (await $testBucket.signedUrl("file.txt"));
        }
        catch ($error_e) {
          const e = $error_e.message;
          error = e;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error == \"Cannot provide signed url for a non-existent key (key=file.txt)\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(error,"Cannot provide signed url for a non-existent key (key=file.txt)")))};
      }
    }
  }
  return $Closure2;
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
      "testBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/testBucket/Default",
            "uniqueId": "testBucket"
          }
        },
        "bucket_prefix": "testbucket-c869e710-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "testBucket_PublicPolicy_109D3538": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/testBucket/PublicPolicy",
            "uniqueId": "testBucket_PublicPolicy_109D3538"
          }
        },
        "bucket": "${aws_s3_bucket.testBucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.testBucket_PublicAccessBlock_98049E5D"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.testBucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "testBucket_PublicAccessBlock_98049E5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/testBucket/PublicAccessBlock",
            "uniqueId": "testBucket_PublicAccessBlock_98049E5D"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.testBucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
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
const http = $stdlib.http;
const util = $stdlib.util;
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
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $testBucket: ${context._lift(testBucket)},
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
          $Closure1._registerOnLiftObject(testBucket, host, ["put", "signedUrl"]);
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
            $testBucket: ${context._lift(testBucket)},
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
          $Closure2._registerOnLiftObject(testBucket, host, ["signedUrl"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const testBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "testBucket", { public: true });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:signedUrl", new $Closure1(this, "$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:signedUrl for non existent key", new $Closure2(this, "$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "signed_url.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


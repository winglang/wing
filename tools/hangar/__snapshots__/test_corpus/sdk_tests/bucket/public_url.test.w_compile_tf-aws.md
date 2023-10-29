# [public_url.test.w](../../../../../../examples/tests/sdk_tests/bucket/public_url.test.w) | compile | tf-aws

<<<<<<< HEAD
## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $http_Util, $privateBucket, $publicBucket, $util_Util }) {
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
          {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(actual,expected)))};
          error = true;
        }
        {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
      };
      const BUCKET_NOT_PUBLIC_ERROR = "Cannot provide public url for a non-public bucket";
      (await $publicBucket.put("file1.txt", "Foo"));
      (await $privateBucket.put("file2.txt", "Bar"));
      const publicUrl = (await $publicBucket.publicUrl("file1.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: publicUrl != \"\"")})((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })(publicUrl,"")))};
      if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })((await $util_Util.env("WING_TARGET")),"sim"))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: http.get(publicUrl).body ==  \"Foo\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $http_Util.get(publicUrl)).body,"Foo")))};
      }
      (await assertThrows(BUCKET_NOT_PUBLIC_ERROR, async () => {
        (await $privateBucket.publicUrl("file2.txt"));
      }));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5
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
      "privateBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/privateBucket/Default",
            "uniqueId": "privateBucket"
          }
        },
        "bucket_prefix": "privatebucket-c835fdbc-",
        "force_destroy": false
      },
      "publicBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/Default",
            "uniqueId": "publicBucket"
          }
        },
        "bucket_prefix": "publicbucket-c8077f6c-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "publicBucket_PublicPolicy_F7753EC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicPolicy",
            "uniqueId": "publicBucket_PublicPolicy_F7753EC4"
          }
        },
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.publicBucket_PublicAccessBlock_54D9EFBA"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.publicBucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "publicBucket_PublicAccessBlock_54D9EFBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/publicBucket/PublicAccessBlock",
            "uniqueId": "publicBucket_PublicAccessBlock_54D9EFBA"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.publicBucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    }
  }
}
```

<<<<<<< HEAD
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
            $privateBucket: ${context._lift(privateBucket)},
            $publicBucket: ${context._lift(publicBucket)},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(privateBucket, host, ["publicUrl", "put"]);
          $Closure1._registerOnLiftObject(publicBucket, host, ["publicUrl", "put"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const publicBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket", this, "publicBucket", { public: true });
    const privateBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket", this, "privateBucket");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:publicUrl", new $Closure1(this, "$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "public_url.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();
//# sourceMappingURL=preflight.js.map
```

=======
>>>>>>> 5f6a31d348b198f70983d0eef65719ddc0604ef5

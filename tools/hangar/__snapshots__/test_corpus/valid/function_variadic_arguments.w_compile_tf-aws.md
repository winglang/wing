# [function_variadic_arguments.w](../../../../../examples/tests/valid/function_variadic_arguments.w) | compile | tf-aws

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
  },
  "resource": {
    "aws_s3_bucket": {
      "bucket1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Default",
            "uniqueId": "bucket1"
          }
        },
        "bucket_prefix": "bucket1-c81ed215-",
        "force_destroy": false
      },
      "bucket2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Default",
            "uniqueId": "bucket2"
          }
        },
        "bucket_prefix": "bucket2-c83a0be6-",
        "force_destroy": false
      },
      "bucket3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Default",
            "uniqueId": "bucket3"
          }
        },
        "bucket_prefix": "bucket3-c8b6c706-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "bucket1_PublicAccessBlock_01FA69AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/PublicAccessBlock",
            "uniqueId": "bucket1_PublicAccessBlock_01FA69AD"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.bucket1.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "bucket2_PublicAccessBlock_063D91B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/PublicAccessBlock",
            "uniqueId": "bucket2_PublicAccessBlock_063D91B9"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.bucket2.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "bucket3_PublicAccessBlock_D66B79BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/PublicAccessBlock",
            "uniqueId": "bucket3_PublicAccessBlock_D66B79BF"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.bucket3.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "bucket1_Encryption_4417F366": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Encryption",
            "uniqueId": "bucket1_Encryption_4417F366"
          }
        },
        "bucket": "${aws_s3_bucket.bucket1.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "bucket2_Encryption_6F02F3D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Encryption",
            "uniqueId": "bucket2_Encryption_6F02F3D7"
          }
        },
        "bucket": "${aws_s3_bucket.bucket2.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "bucket3_Encryption_43A64F29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Encryption",
            "uniqueId": "bucket3_Encryption_43A64F29"
          }
        },
        "bucket": "${aws_s3_bucket.bucket3.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket1");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket2");
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket3");
    (bucket3.node.addDependency(bucket1,bucket2));
    const funcBucket = ((...buckets) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: buckets.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(buckets.length,2)))};
    });
    (funcBucket(bucket1,bucket2));
    const func1 = ((x, y, ...args) => {
      {((cond) => {if (!cond) throw new Error("assertion failed: x == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: y == \"something\" || y == nil")})(((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,"something")) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,undefined))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: args.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(args.length,4)))};
      for (const i of args) {
        {((cond) => {if (!cond) throw new Error("assertion failed: i > 0 && i < 5")})(((i > 0) && (i < 5)))};
      }
      (args.push(10));
      {((cond) => {if (!cond) throw new Error("assertion failed: args.at(4) == 10")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((args.at(4)),10)))};
    });
    (func1(1,"something",1,2,3,4));
    (func1(1,undefined,1,2,3,4));
    const addNums = ((...nums) => {
      let total = 0;
      for (const n of nums) {
        total = (total + n);
      }
      return total;
    });
    {((cond) => {if (!cond) throw new Error("assertion failed: addNums(1, 2, 3) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((addNums(1,2,3)),6)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: addNums() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((addNums()),0)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "function_variadic_arguments", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


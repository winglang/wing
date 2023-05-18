# [container_types.w](../../../../examples/tests/valid/container_types.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
      "root_bucket1_3A77B9B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Default",
            "uniqueId": "root_bucket1_3A77B9B4"
          }
        },
        "bucket_prefix": "bucket1-c81ed215-",
        "force_destroy": false
      },
      "root_bucket2_E39F70EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Default",
            "uniqueId": "root_bucket2_E39F70EE"
          }
        },
        "bucket_prefix": "bucket2-c83a0be6-",
        "force_destroy": false
      },
      "root_bucket3_A0C568EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Default",
            "uniqueId": "root_bucket3_A0C568EA"
          }
        },
        "bucket_prefix": "bucket3-c8b6c706-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_bucket1_PublicAccessBlock_6C5071C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/PublicAccessBlock",
            "uniqueId": "root_bucket1_PublicAccessBlock_6C5071C0"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_bucket1_3A77B9B4.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_bucket2_PublicAccessBlock_BC328E84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/PublicAccessBlock",
            "uniqueId": "root_bucket2_PublicAccessBlock_BC328E84"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_bucket2_E39F70EE.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_bucket3_PublicAccessBlock_CF2593D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/PublicAccessBlock",
            "uniqueId": "root_bucket3_PublicAccessBlock_CF2593D4"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_bucket3_A0C568EA.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_bucket1_Encryption_33CABC1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Encryption",
            "uniqueId": "root_bucket1_Encryption_33CABC1A"
          }
        },
        "bucket": "${aws_s3_bucket.root_bucket1_3A77B9B4.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_bucket2_Encryption_A83E82F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Encryption",
            "uniqueId": "root_bucket2_Encryption_A83E82F9"
          }
        },
        "bucket": "${aws_s3_bucket.root_bucket2_E39F70EE.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_bucket3_Encryption_A2A51E22": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Encryption",
            "uniqueId": "root_bucket3_Encryption_A2A51E22"
          }
        },
        "bucket": "${aws_s3_bucket.root_bucket3_A0C568EA.bucket}",
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket1");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket2");
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket3");
    const emptyArray = Object.freeze([]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(emptyArray.length === 0)'`)})((emptyArray.length === 0))};
    const emptyArray2 = [];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(emptyArray2.length === 0)'`)})((emptyArray2.length === 0))};
    const arr1 = Object.freeze([1, 2, 3]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr1.length === 3)'`)})((arr1.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr1.at(1)) === 2)'`)})(((arr1.at(1)) === 2))};
    const arr2 = Object.freeze(["1", "2", "3"]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr2.length === 3)'`)})((arr2.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr2.at(1)) === "2")'`)})(((arr2.at(1)) === "2"))};
    const arr3 = Object.freeze([1, 2, 3]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr3.length === 3)'`)})((arr3.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr3.at(1)) === 2)'`)})(((arr3.at(1)) === 2))};
    const arr4 = Object.freeze([1, 2, 3]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr4.length === 3)'`)})((arr4.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr4.at(1)) === 2)'`)})(((arr4.at(1)) === 2))};
    const arr5 = Object.freeze([bucket1, bucket2, bucket3]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr5.length === 3)'`)})((arr5.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr5.at(1)) === bucket2)'`)})(((arr5.at(1)) === bucket2))};
    const arr6 = Object.freeze([bucket1, bucket2, bucket3]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr6.length === 3)'`)})((arr6.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr6.at(1)) === bucket2)'`)})(((arr6.at(1)) === bucket2))};
    const arr7 = arr4;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr7.length === 3)'`)})((arr7.length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr7.at(1)) === 2)'`)})(((arr7.at(1)) === 2))};
    const emptyMap = Object.freeze({});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(emptyMap).length === 0)'`)})((Object.keys(emptyMap).length === 0))};
    const emptyMap2 = {};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(emptyMap2).length === 0)'`)})((Object.keys(emptyMap2).length === 0))};
    const m1 = Object.freeze({"a":1,"b":2,"c":3});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m1).length === 3)'`)})((Object.keys(m1).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m1)["b"] === 2)'`)})(((m1)["b"] === 2))};
    const m2 = Object.freeze({"a":1,"b":2,"c":3});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m2).length === 3)'`)})((Object.keys(m2).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m2)["b"] === 2)'`)})(((m2)["b"] === 2))};
    const m3 = Object.freeze({"a":1,"b":2,"c":3});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m3).length === 3)'`)})((Object.keys(m3).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m3)["b"] === 2)'`)})(((m3)["b"] === 2))};
    const m4 = Object.freeze({"a":1,"b":2,"c":3});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m4).length === 3)'`)})((Object.keys(m4).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m4)["b"] === 2)'`)})(((m4)["b"] === 2))};
    const m5 = Object.freeze({"a":bucket1,"b":bucket2,"c":bucket3});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m5).length === 3)'`)})((Object.keys(m5).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m5)["b"] === bucket2)'`)})(((m5)["b"] === bucket2))};
    const m6 = Object.freeze({"a":bucket1,"b":bucket2,"c":bucket3});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m6).length === 3)'`)})((Object.keys(m6).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m6)["b"] === bucket2)'`)})(((m6)["b"] === bucket2))};
    const m7 = m1;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m7).length === 3)'`)})((Object.keys(m7).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m7)["b"] === 2)'`)})(((m7)["b"] === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("b" in (m7))'`)})(("b" in (m7)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(("boom" in (m4)) === false)'`)})((("boom" in (m4)) === false))};
    const m8 = Object.freeze({"a":"a1","b":"b1","c":"c1"});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.keys(m8).at(0)) === "a")'`)})(((Object.keys(m8).at(0)) === "a"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.keys(m8).at(1)) === "b")'`)})(((Object.keys(m8).at(1)) === "b"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.keys(m8).at(2)) === "c")'`)})(((Object.keys(m8).at(2)) === "c"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.values(m8).at(0)) === "a1")'`)})(((Object.values(m8).at(0)) === "a1"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.values(m8).at(1)) === "b1")'`)})(((Object.values(m8).at(1)) === "b1"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.values(m8).at(2)) === "c1")'`)})(((Object.values(m8).at(2)) === "c1"))};
    const m9 = {"a":"a1","b":"b1","c":"c1"};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.keys(m9).at(0)) === "a")'`)})(((Object.keys(m9).at(0)) === "a"))};
    const emptySet = Object.freeze(new Set([]));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(emptySet.size === 0)'`)})((emptySet.size === 0))};
    const emptySet2 = new Set([]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(emptySet2.size === 0)'`)})((emptySet2.size === 0))};
    const s2 = Object.freeze(new Set([1, 2, 3]));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s2.size === 3)'`)})((s2.size === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s2.has(1))'`)})((s2.has(1)))};
    const s3 = Object.freeze(new Set([1, 2, 3]));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s3.size === 3)'`)})((s3.size === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s3.has(1))'`)})((s3.has(1)))};
    const s4 = Object.freeze(new Set([1, 2, 3]));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s4.size === 3)'`)})((s4.size === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s4.has(1))'`)})((s4.has(1)))};
    const s6 = Object.freeze(new Set([bucket1, bucket2, bucket3]));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s6.size === 3)'`)})((s6.size === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s6.has(bucket2))'`)})((s6.has(bucket2)))};
    const s7 = s2;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s7.size === 3)'`)})((s7.size === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s7.has(1))'`)})((s7.has(1)))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "container_types", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```


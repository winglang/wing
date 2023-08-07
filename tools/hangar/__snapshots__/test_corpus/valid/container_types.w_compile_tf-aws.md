# [container_types.w](../../../../../examples/tests/valid/container_types.w) | compile | tf-aws

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
    const emptyArray = [];
    {((cond) => {if (!cond) throw new Error("assertion failed: emptyArray.length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(emptyArray.length,0)))};
    const emptyArray2 = [];
    {((cond) => {if (!cond) throw new Error("assertion failed: emptyArray2.length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(emptyArray2.length,0)))};
    const arr1 = [1, 2, 3];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr1.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr1.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr1.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr1.at(1)),2)))};
    const arr2 = ["1", "2", "3"];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr2.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr2.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr2.at(1) == \"2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr2.at(1)),"2")))};
    const arr3 = [1, 2, 3];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr3.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr3.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr3.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr3.at(1)),2)))};
    const arr4 = [1, 2, 3];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr4.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr4.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr4.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr4.at(1)),2)))};
    const arr5 = [bucket1, bucket2, bucket3];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr5.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr5.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr5.at(1) == bucket2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr5.at(1)),bucket2)))};
    const arr6 = [bucket1, bucket2, bucket3];
    {((cond) => {if (!cond) throw new Error("assertion failed: arr6.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr6.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr6.at(1) == bucket2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr6.at(1)),bucket2)))};
    const arr7 = arr4;
    {((cond) => {if (!cond) throw new Error("assertion failed: arr7.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr7.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr7.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr7.at(1)),2)))};
    const emptyMap = ({});
    {((cond) => {if (!cond) throw new Error("assertion failed: emptyMap.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(emptyMap).length,0)))};
    const emptyMap2 = ({});
    {((cond) => {if (!cond) throw new Error("assertion failed: emptyMap2.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(emptyMap2).length,0)))};
    const m1 = ({"a": 1,"b": 2,"c": 3});
    {((cond) => {if (!cond) throw new Error("assertion failed: m1.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m1).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m1.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m1)["b"],2)))};
    const m2 = ({"a": 1,"b": 2,"c": 3});
    {((cond) => {if (!cond) throw new Error("assertion failed: m2.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m2).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m2.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m2)["b"],2)))};
    const m3 = ({"a": 1,"b": 2,"c": 3});
    {((cond) => {if (!cond) throw new Error("assertion failed: m3.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m3).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m3.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m3)["b"],2)))};
    const m4 = ({"a": 1,"b": 2,"c": 3});
    {((cond) => {if (!cond) throw new Error("assertion failed: m4.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m4).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m4.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m4)["b"],2)))};
    const m5 = ({"a": bucket1,"b": bucket2,"c": bucket3});
    {((cond) => {if (!cond) throw new Error("assertion failed: m5.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m5).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m5.get(\"b\") == bucket2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m5)["b"],bucket2)))};
    const m6 = ({"a": bucket1,"b": bucket2,"c": bucket3});
    {((cond) => {if (!cond) throw new Error("assertion failed: m6.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m6).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m6.get(\"b\") == bucket2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m6)["b"],bucket2)))};
    const m7 = m1;
    {((cond) => {if (!cond) throw new Error("assertion failed: m7.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m7).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m7.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((m7)["b"],2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m7.has(\"b\")")})(("b" in (m7)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m4.has(\"boom\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("boom" in (m4)),false)))};
    const m8 = ({"a": "a1","b": "b1","c": "c1"});
    {((cond) => {if (!cond) throw new Error("assertion failed: m8.keys().at(0) == \"a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(m8).at(0)),"a")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m8.keys().at(1) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(m8).at(1)),"b")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m8.keys().at(2) == \"c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(m8).at(2)),"c")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m8.values().at(0) == \"a1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.values(m8).at(0)),"a1")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m8.values().at(1) == \"b1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.values(m8).at(1)),"b1")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m8.values().at(2) == \"c1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.values(m8).at(2)),"c1")))};
    for (const val of Object.keys(m8)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: !val.endsWith(\"1\")")})((!val.endsWith("1")))};
    }
    for (const val of Object.values(m8)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: val.endsWith(\"1\")")})(val.endsWith("1"))};
    }
    const m9 = ({"a": "a1","b": "b1","c": "c1"});
    {((cond) => {if (!cond) throw new Error("assertion failed: m9.keys().at(0) == \"a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(m9).at(0)),"a")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m9.keys().at(1) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(m9).at(1)),"b")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m9.keys().at(2) == \"c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.keys(m9).at(2)),"c")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m9.values().at(0) == \"a1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.values(m9).at(0)),"a1")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m9.values().at(1) == \"b1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.values(m9).at(1)),"b1")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m9.values().at(2) == \"c1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Object.values(m9).at(2)),"c1")))};
    for (const val of Object.keys(m9)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: !val.endsWith(\"1\")")})((!val.endsWith("1")))};
    }
    for (const val of Object.values(m9)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: val.endsWith(\"1\")")})(val.endsWith("1"))};
    }
    const emptySet = new Set([]);
    {((cond) => {if (!cond) throw new Error("assertion failed: emptySet.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(emptySet.size,0)))};
    const emptySet2 = new Set([]);
    {((cond) => {if (!cond) throw new Error("assertion failed: emptySet2.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(emptySet2.size,0)))};
    const s2 = new Set([1, 2, 3]);
    {((cond) => {if (!cond) throw new Error("assertion failed: s2.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s2.size,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s2.has(1)")})((s2.has(1)))};
    const s3 = new Set([1, 2, 3]);
    {((cond) => {if (!cond) throw new Error("assertion failed: s3.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s3.size,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s3.has(1)")})((s3.has(1)))};
    const s4 = new Set([1, 2, 3]);
    {((cond) => {if (!cond) throw new Error("assertion failed: s4.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s4.size,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s4.has(1)")})((s4.has(1)))};
    const s6 = new Set([bucket1, bucket2, bucket3]);
    {((cond) => {if (!cond) throw new Error("assertion failed: s6.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s6.size,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s6.has(bucket2)")})((s6.has(bucket2)))};
    const s7 = s2;
    {((cond) => {if (!cond) throw new Error("assertion failed: s7.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s7.size,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s7.has(1)")})((s7.has(1)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "container_types", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


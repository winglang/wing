# [mut_container_types.test.w](../../../../../tests/valid/mut_container_types.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
    "aws_s3_bucket_cors_configuration": {
      "bucket1_CorsConfiguration-a9c2ec90_08E843C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/CorsConfiguration-a9c2ec90",
            "uniqueId": "bucket1_CorsConfiguration-a9c2ec90_08E843C8"
          }
        },
        "bucket": "${aws_s3_bucket.bucket1.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      },
      "bucket2_CorsConfiguration-b3773efe_D25B3C71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/CorsConfiguration-b3773efe",
            "uniqueId": "bucket2_CorsConfiguration-b3773efe_D25B3C71"
          }
        },
        "bucket": "${aws_s3_bucket.bucket2.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      },
      "bucket3_CorsConfiguration-1bc1fdd4_03D9D2C6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/CorsConfiguration-1bc1fdd4",
            "uniqueId": "bucket3_CorsConfiguration-1bc1fdd4_03D9D2C6"
          }
        },
        "bucket": "${aws_s3_bucket.bucket3.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const bucket1 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket1");
    const bucket2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket2");
    const bucket3 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket3");
    const arr1 = ["a", "b", "c"];
    const arr2 = [1, 2, 3];
    const arr3 = [bucket1, bucket2];
    const arr4 = arr1;
    $macros.__MutArray_push(false, arr1, "a");
    $macros.__MutArray_push(false, arr2, 4);
    $macros.__MutArray_push(false, arr3, bucket3);
    $helpers.assert($helpers.eq((arr2.pop()), 4), "arr2.pop() == 4");
    $helpers.assert($helpers.eq(arr1.length, 4), "arr1.length == 4");
    $helpers.assert($helpers.eq($macros.__MutArray_at(false, arr4, 0), "a"), "arr4.at(0) == \"a\"");
    const s1 = new Set([1, 2, 3, 3]);
    const s2 = new Set(["hello", "world", "hello"]);
    const s3 = new Set([bucket1, bucket2, bucket2]);
    (s1.add(5));
    (s2.add("bye"));
    (s3.add(bucket3));
    $helpers.assert((s2.has("bye")), "s2.has(\"bye\")");
    $helpers.assert((s2.has("hello")), "s2.has(\"hello\")");
    $helpers.assert((s3.has(bucket2)), "s3.has(bucket2)");
    const m1 = ({["hello"]: "world"});
    const m2 = ({["hello"]: 123});
    const m3 = ({["b1"]: bucket1, ["b2"]: bucket2});
    const m4 = m1;
    const m5 = ({["goodbye"]: "world"});
    const m6 = ({["a"]: m1, ["b"]: m5});
    $helpers.assert($macros.__MutMap_has(false, m1, "hello"), "m1.has(\"hello\")");
    $helpers.assert($helpers.eq($macros.__MutMap_size(false, m2, ), 1), "m2.size() == 1");
    $helpers.assert($helpers.eq($macros.__MutMap_get(false, m3, "b1"), bucket1), "m3.get(\"b1\") == bucket1");
    $helpers.assert($helpers.eq($macros.__MutMap_size(false, m4, ), 1), "m4.size() == 1");
    $helpers.assert($helpers.eq($macros.__MutMap_get(false, $macros.__MutMap_get(false, m6, "a"), "hello"), "world"), "m6.get(\"a\").get(\"hello\") == \"world\"");
    $macros.__MutMap_set(false, m1, "hello", "goodbye");
    $macros.__MutMap_set(false, m6, "a", ({["foo"]: "bar"}));
    $macros.__MutMap_clear(false, m2, );
    $helpers.assert($helpers.eq($macros.__MutMap_size(false, m2, ), 0), "m2.size() == 0");
    $helpers.assert($helpers.eq($macros.__MutMap_get(false, m1, "hello"), "goodbye"), "m1.get(\"hello\") == \"goodbye\"");
    $helpers.assert($helpers.eq($macros.__MutMap_get(false, $macros.__MutMap_get(false, m6, "a"), "foo"), "bar"), "m6.get(\"a\").get(\"foo\") == \"bar\"");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "mut_container_types.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


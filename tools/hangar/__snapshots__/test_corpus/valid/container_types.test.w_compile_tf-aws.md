# [container_types.test.w](../../../../../tests/valid/container_types.test.w) | compile | tf-aws

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
    const emptyArray = [];
    $helpers.assert($helpers.eq(emptyArray.length, 0), "emptyArray.length == 0");
    const emptyArray2 = [];
    $helpers.assert($helpers.eq(emptyArray2.length, 0), "emptyArray2.length == 0");
    const arr1 = [1, 2, 3];
    $helpers.assert($helpers.eq(arr1.length, 3), "arr1.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr1, 1), 2), "arr1.at(1) == 2");
    const arr2 = ["1", "2", "3"];
    $helpers.assert($helpers.eq(arr2.length, 3), "arr2.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr2, 1), "2"), "arr2.at(1) == \"2\"");
    const arr3 = [1, 2, 3];
    $helpers.assert($helpers.eq(arr3.length, 3), "arr3.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr3, 1), 2), "arr3.at(1) == 2");
    const arr4 = [1, 2, 3];
    $helpers.assert($helpers.eq(arr4.length, 3), "arr4.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr4, 1), 2), "arr4.at(1) == 2");
    const arr5 = [bucket1, bucket2, bucket3];
    $helpers.assert($helpers.eq(arr5.length, 3), "arr5.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr5, 1), bucket2), "arr5.at(1) == bucket2");
    const arr6 = [bucket1, bucket2, bucket3];
    $helpers.assert($helpers.eq(arr6.length, 3), "arr6.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr6, 1), bucket2), "arr6.at(1) == bucket2");
    const arr7 = arr4;
    $helpers.assert($helpers.eq(arr7.length, 3), "arr7.length == 3");
    $helpers.assert($helpers.eq($macros.__Array_at(false, arr7, 1), 2), "arr7.at(1) == 2");
    {
      const $if_let_value = $macros.__Array_tryAt(false, emptyArray, 0);
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__Array_tryAt(false, arr1, 0);
      if ($if_let_value != undefined) {
        const val = $if_let_value;
        $helpers.assert($helpers.eq(val, 1), "val == 1");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    const emptyMap = ({});
    $helpers.assert($helpers.eq($macros.__Map_size(false, emptyMap, ), 0), "emptyMap.size() == 0");
    const emptyMap2 = ({});
    $helpers.assert($helpers.eq($macros.__MutMap_size(false, emptyMap2, ), 0), "emptyMap2.size() == 0");
    const m1 = ({["a"]: 1, ["b"]: 2, ["c"]: 3});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m1, ), 3), "m1.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m1, "b"), 2), "m1.get(\"b\") == 2");
    const m2 = ({["a"]: 1, ["b"]: 2, ["c"]: 3});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m2, ), 3), "m2.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m2, "b"), 2), "m2.get(\"b\") == 2");
    const m3 = ({["a"]: 1, ["b"]: 2, ["c"]: 3});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m3, ), 3), "m3.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m3, "b"), 2), "m3.get(\"b\") == 2");
    const m4 = ({["a"]: 1, ["b"]: 2, ["c"]: 3});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m4, ), 3), "m4.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m4, "b"), 2), "m4.get(\"b\") == 2");
    const m5 = ({["a"]: bucket1, ["b"]: bucket2, ["c"]: bucket3});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m5, ), 3), "m5.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m5, "b"), bucket2), "m5.get(\"b\") == bucket2");
    const m6 = ({["a"]: bucket1, ["b"]: bucket2, ["c"]: bucket3});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m6, ), 3), "m6.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m6, "b"), bucket2), "m6.get(\"b\") == bucket2");
    const m7 = m1;
    $helpers.assert($helpers.eq($macros.__Map_size(false, m7, ), 3), "m7.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m7, "b"), 2), "m7.get(\"b\") == 2");
    $helpers.assert($macros.__Map_has(false, m7, "b"), "m7.has(\"b\")");
    $helpers.assert($helpers.eq($macros.__Map_has(false, m4, "boom"), false), "m4.has(\"boom\") == false");
    const m8 = ({["a"]: "a1", ["b"]: "b1", ["c"]: "c1"});
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__Map_keys(false, m8, ), 0), "a"), "m8.keys().at(0) == \"a\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__Map_keys(false, m8, ), 1), "b"), "m8.keys().at(1) == \"b\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__Map_keys(false, m8, ), 2), "c"), "m8.keys().at(2) == \"c\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__Map_values(false, m8, ), 0), "a1"), "m8.values().at(0) == \"a1\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__Map_values(false, m8, ), 1), "b1"), "m8.values().at(1) == \"b1\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__Map_values(false, m8, ), 2), "c1"), "m8.values().at(2) == \"c1\"");
    for (const val of $macros.__Map_keys(false, m8, )) {
      $helpers.assert((!$macros.__String_endsWith(false, val, "1")), "!val.endsWith(\"1\")");
    }
    for (const val of $macros.__Map_values(false, m8, )) {
      $helpers.assert($macros.__String_endsWith(false, val, "1"), "val.endsWith(\"1\")");
    }
    const m9 = ({["a"]: "a1", ["b"]: "b1", ["c"]: "c1"});
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__MutMap_keys(false, m9, ), 0), "a"), "m9.keys().at(0) == \"a\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__MutMap_keys(false, m9, ), 1), "b"), "m9.keys().at(1) == \"b\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__MutMap_keys(false, m9, ), 2), "c"), "m9.keys().at(2) == \"c\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__MutMap_values(false, m9, ), 0), "a1"), "m9.values().at(0) == \"a1\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__MutMap_values(false, m9, ), 1), "b1"), "m9.values().at(1) == \"b1\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, $macros.__MutMap_values(false, m9, ), 2), "c1"), "m9.values().at(2) == \"c1\"");
    for (const val of $macros.__MutMap_keys(false, m9, )) {
      $helpers.assert((!$macros.__String_endsWith(false, val, "1")), "!val.endsWith(\"1\")");
    }
    for (const val of $macros.__MutMap_values(false, m9, )) {
      $helpers.assert($macros.__String_endsWith(false, val, "1"), "val.endsWith(\"1\")");
    }
    {
      const $if_let_value = $macros.__MutMap_tryGet(false, m9, "a");
      if ($if_let_value != undefined) {
        const k = $if_let_value;
        $helpers.assert($helpers.eq(k, "a1"), "k == \"a1\"");
      }
      else {
        $helpers.assert(false, "false");
      }
    }
    {
      const $if_let_value = $macros.__MutMap_tryGet(false, m9, "def-fake");
      if ($if_let_value != undefined) {
        const k = $if_let_value;
        $helpers.assert(false, "false");
      }
    }
    try {
      $macros.__MutMap_get(false, m9, "def-fake");
    }
    catch ($error_err) {
      const err = $error_err.message;
      $helpers.assert($macros.__String_contains(false, err, "does not contain key: \"def-fake\""), "err.contains(\"does not contain key: \\\"def-fake\\\"\")");
    }
    const num9 = 9;
    const m10 = ({["a"]: 1, ["a"]: 2, [String.raw({ raw: ["", ""] }, (num9 + 1))]: 9, [String.raw({ raw: ["", ""] }, (num9 + 1))]: 10, [((() => {
      return String.raw({ raw: ["", "9"] }, num9);
    })())]: 99});
    $helpers.assert($helpers.eq($macros.__Map_size(false, m10, ), 3), "m10.size() == 3");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m10, "a"), 2), "m10.get(\"a\") == 2");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m10, "10"), 10), "m10.get(\"10\") == 10");
    $helpers.assert($helpers.eq($macros.__Map_get(false, m10, "99"), 99), "m10.get(\"99\") == 99");
    const emptySet = new Set([]);
    $helpers.assert($helpers.eq(emptySet.size, 0), "emptySet.size == 0");
    const emptySet2 = new Set([]);
    $helpers.assert($helpers.eq(emptySet2.size, 0), "emptySet2.size == 0");
    const s2 = new Set([1, 2, 3]);
    $helpers.assert($helpers.eq(s2.size, 3), "s2.size == 3");
    $helpers.assert((s2.has(1)), "s2.has(1)");
    const s3 = new Set([1, 2, 3]);
    $helpers.assert($helpers.eq(s3.size, 3), "s3.size == 3");
    $helpers.assert((s3.has(1)), "s3.has(1)");
    const s4 = new Set([1, 2, 3]);
    $helpers.assert($helpers.eq(s4.size, 3), "s4.size == 3");
    $helpers.assert((s4.has(1)), "s4.has(1)");
    const s6 = new Set([bucket1, bucket2, bucket3]);
    $helpers.assert($helpers.eq(s6.size, 3), "s6.size == 3");
    $helpers.assert((s6.has(bucket2)), "s6.has(bucket2)");
    const s7 = s2;
    $helpers.assert($helpers.eq(s7.size, 3), "s7.size == 3");
    $helpers.assert((s7.has(1)), "s7.has(1)");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "container_types.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


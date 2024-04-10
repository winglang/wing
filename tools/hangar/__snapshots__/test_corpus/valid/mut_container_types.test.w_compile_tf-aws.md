# [mut_container_types.test.w](../../../../../examples/tests/valid/mut_container_types.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const bucket1 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket1");
    const bucket2 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket2");
    const bucket3 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "bucket3");
    const arr1 = ["a", "b", "c"];
    const arr2 = [1, 2, 3];
    const arr3 = [bucket1, bucket2];
    const arr4 = arr1;
    arr1.push("a");
    arr2.push(4);
    arr3.push(bucket3);
    $helpers.assert($helpers.eq((arr2.pop()), 4), "arr2.pop() == 4");
    $helpers.assert($helpers.eq(arr1.length, 4), "arr1.length == 4");
    $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(arr4, 0), "a"), "arr4.at(0) == \"a\"");
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
    $helpers.assert(("hello" in (m1)), "m1.has(\"hello\")");
    $helpers.assert($helpers.eq(Object.keys(m2).length, 1), "m2.size() == 1");
    $helpers.assert($helpers.eq(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m3, "b1"), bucket1), "m3.get(\"b1\") == bucket1");
    $helpers.assert($helpers.eq(Object.keys(m4).length, 1), "m4.size() == 1");
    $helpers.assert($helpers.eq(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m6, "a"), "hello"), "world"), "m6.get(\"a\").get(\"hello\") == \"world\"");
    ((obj, args) => { obj[args[0]] = args[1]; })(m1, ["hello", "goodbye"]);
    ((obj, args) => { obj[args[0]] = args[1]; })(m6, ["a", ({["foo"]: "bar"})]);
    ((map) => { for(const k in map){delete map[k]}; })(m2);
    $helpers.assert($helpers.eq(Object.keys(m2).length, 0), "m2.size() == 0");
    $helpers.assert($helpers.eq(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m1, "hello"), "goodbye"), "m1.get(\"hello\") == \"goodbye\"");
    $helpers.assert($helpers.eq(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m6, "a"), "foo"), "bar"), "m6.get(\"a\").get(\"foo\") == \"bar\"");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "mut_container_types.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


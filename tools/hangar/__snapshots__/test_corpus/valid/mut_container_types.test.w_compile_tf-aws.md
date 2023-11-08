# [mut_container_types.test.w](../../../../../examples/tests/valid/mut_container_types.test.w) | compile | tf-aws

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

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "bucket1");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "bucket2");
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "bucket3");
    const arr1 = ["a", "b", "c"];
    const arr2 = [1, 2, 3];
    const arr3 = [bucket1, bucket2];
    const arr4 = arr1;
    (arr1.push("a"));
    (arr2.push(4));
    (arr3.push(bucket3));
    {((cond) => {if (!cond) throw new Error("assertion failed: arr2.pop() == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr2.pop()),4)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr1.length == 4")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr1.length,4)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: arr4.at(0) == \"a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((arr4.at(0)),"a")))};
    const s1 = new Set([1, 2, 3, 3]);
    const s2 = new Set(["hello", "world", "hello"]);
    const s3 = new Set([bucket1, bucket2, bucket2]);
    (s1.add(5));
    (s2.add("bye"));
    (s3.add(bucket3));
    {((cond) => {if (!cond) throw new Error("assertion failed: s2.has(\"bye\")")})((s2.has("bye")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s2.has(\"hello\")")})((s2.has("hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s3.has(bucket2)")})((s3.has(bucket2)))};
    const m1 = ({"hello": "world"});
    const m2 = ({"hello": 123});
    const m3 = ({"b1": bucket1,"b2": bucket2});
    const m4 = m1;
    const m5 = ({"goodbye": "world"});
    const m6 = ({"a": m1,"b": m5});
    {((cond) => {if (!cond) throw new Error("assertion failed: m1.has(\"hello\")")})(("hello" in (m1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m2.size() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m2).length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m3.get(\"b1\") == bucket1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m3, "b1"),bucket1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m4.size() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m4).length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m6.get(\"a\").get(\"hello\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m6, "a"), "hello"),"world")))};
    ((obj, args) => { obj[args[0]] = args[1]; })(m1, ["hello", "goodbye"]);
    ((obj, args) => { obj[args[0]] = args[1]; })(m6, ["a", ({"foo": "bar"})]);
    ((map) => { for(const k in map){delete map[k]}; })(m2);
    {((cond) => {if (!cond) throw new Error("assertion failed: m2.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(m2).length,0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m1.get(\"hello\") == \"goodbye\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m1, "hello"),"goodbye")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: m6.get(\"a\").get(\"foo\") == \"bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(m6, "a"), "foo"),"bar")))};
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "mut_container_types.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


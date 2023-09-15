# [add_object.main.w](../../../../../../examples/tests/sdk_tests/bucket/add_object.main.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $b, $jsonObj1, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: b.list().length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.list()).length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.stringify(b.getJson(\"file1.json\")) == Json.stringify(jsonObj1)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([(await $b.getJson("file1.json"))]),((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([$jsonObj1]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: b.get(\"file2.txt\") == \"Bar\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $b.get("file2.txt")),"Bar")))};
    }
  }
  return $Closure1;
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
      "cloudBucket_S3Object-file1json_574A6AAF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file1.json",
            "uniqueId": "cloudBucket_S3Object-file1json_574A6AAF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "{\"key1\":\"value1\"}",
        "key": "file1.json"
      },
      "cloudBucket_S3Object-file2txt_C6672D6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3Object-file2.txt",
            "uniqueId": "cloudBucket_S3Object-file2txt_C6672D6C"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "content": "Bar",
        "key": "file2.txt"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $b: ${context._lift(b)},
            $jsonObj1: ${context._lift(jsonObj1)},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(b, host, ["get", "getJson", "list"]);
          $Closure1._registerBindObject(jsonObj1, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const jsonObj1 = ({"key1": "value1"});
    (b.addObject("file1.json",((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([jsonObj1])));
    (b.addObject("file2.txt","Bar"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:addObject",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "add_object.main", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


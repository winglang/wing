# [capture_containers.w](../../../../../examples/tests/valid/capture_containers.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $Object_keys_myMap__length, $__bang__in___arrOfMap_at_0____, $__world__in__myMap__, $_arr_at_0__, $_arr_at_1__, $_j___b__, $_mySet_has__my___, $arr_length, $mySet_size }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_arr_at_0__,"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_arr_at_1__,"world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($arr_length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySet.has(\"my\")")})($_mySet_has__my___)};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySet.size == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($mySet_size,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: myMap.has(\"world\")")})($__world__in__myMap__)};
      {((cond) => {if (!cond) throw new Error("assertion failed: myMap.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($Object_keys_myMap__length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arrOfMap.at(0).has(\"bang\")")})($__bang__in___arrOfMap_at_0____)};
      {((cond) => {if (!cond) throw new Error("assertion failed: j.get(\"b\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_j___b__,"world")))};
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
      "value": "[[\"root/Default/Default/test:capture_containers\",\"${aws_lambda_function.testcapture_containers_Handler_C1B42BA9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcapture_containers_Handler_IamRole_F3F5FC11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/IamRole",
            "uniqueId": "testcapture_containers_Handler_IamRole_F3F5FC11"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcapture_containers_Handler_IamRolePolicy_631AF9E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/IamRolePolicy",
            "uniqueId": "testcapture_containers_Handler_IamRolePolicy_631AF9E4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcapture_containers_Handler_IamRole_F3F5FC11.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcapture_containers_Handler_IamRolePolicyAttachment_8C9C0779": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcapture_containers_Handler_IamRolePolicyAttachment_8C9C0779"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcapture_containers_Handler_IamRole_F3F5FC11.name}"
      }
    },
    "aws_lambda_function": {
      "testcapture_containers_Handler_C1B42BA9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/Default",
            "uniqueId": "testcapture_containers_Handler_C1B42BA9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c876b763",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c876b763",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcapture_containers_Handler_IamRole_F3F5FC11.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcapture_containers_Handler_S3Object_4CA88332.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "testcapture_containers_Handler_S3Object_4CA88332": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/S3Object",
            "uniqueId": "testcapture_containers_Handler_S3Object_4CA88332"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
            $Object_keys_myMap__length: ${context._lift(Object.keys(myMap).length)},
            $__bang__in___arrOfMap_at_0____: ${context._lift(("bang" in ((arrOfMap.at(0)))))},
            $__world__in__myMap__: ${context._lift(("world" in (myMap)))},
            $_arr_at_0__: ${context._lift((arr.at(0)))},
            $_arr_at_1__: ${context._lift((arr.at(1)))},
            $_j___b__: ${context._lift((j)["b"])},
            $_mySet_has__my___: ${context._lift((mySet.has("my")))},
            $arr_length: ${context._lift(arr.length)},
            $mySet_size: ${context._lift(mySet.size)},
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
          $Closure1._registerBindObject(("bang" in ((arrOfMap.at(0)))), host, []);
          $Closure1._registerBindObject(("world" in (myMap)), host, []);
          $Closure1._registerBindObject((arr.at(0)), host, []);
          $Closure1._registerBindObject((arr.at(1)), host, []);
          $Closure1._registerBindObject((j)["b"], host, []);
          $Closure1._registerBindObject((mySet.has("my")), host, []);
          $Closure1._registerBindObject(Object.keys(myMap).length, host, []);
          $Closure1._registerBindObject(arr.length, host, []);
          $Closure1._registerBindObject(mySet.size, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const arr = ["hello", "world"];
    const mySet = new Set(["my", "my", "set"]);
    const myMap = ({"hello": 123,"world": 999});
    const arrOfMap = [({"bang": 123})];
    const j = ({"a": "hello","b": "world"});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:capture_containers",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_containers", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


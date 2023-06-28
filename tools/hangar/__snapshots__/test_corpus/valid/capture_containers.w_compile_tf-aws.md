# [capture_containers.w](../../../../../examples/tests/valid/capture_containers.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ arr, mySet, myMap, arrOfMap, j }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.at(0) == \"hello\"")})(((await arr.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.at(1) == \"world\"")})(((await arr.at(1)) === "world"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.length == 2")})((arr.length === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySet.has(\"my\")")})((await mySet.has("my")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mySet.size == 2")})((mySet.size === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: myMap.has(\"world\")")})(("world" in (myMap)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: myMap.size() == 2")})((Object.keys(myMap).length === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: arrOfMap.at(0).has(\"bang\")")})(("bang" in ((await arrOfMap.at(0)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: j.get(\"b\") == \"world\"")})(((j)["b"] === "world"))};
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
      "value": "[[\"root/Default/Default/test:capture_containers\",\"${aws_lambda_function.root_testcapturecontainers_Handler_04B26FC8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcapturecontainers_Handler_IamRole_CCAC76D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/IamRole",
            "uniqueId": "root_testcapturecontainers_Handler_IamRole_CCAC76D7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcapturecontainers_Handler_IamRolePolicy_732A7814": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/IamRolePolicy",
            "uniqueId": "root_testcapturecontainers_Handler_IamRolePolicy_732A7814"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcapturecontainers_Handler_IamRole_CCAC76D7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcapturecontainers_Handler_IamRolePolicyAttachment_D526D1A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcapturecontainers_Handler_IamRolePolicyAttachment_D526D1A7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcapturecontainers_Handler_IamRole_CCAC76D7.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcapturecontainers_Handler_04B26FC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/Default",
            "uniqueId": "root_testcapturecontainers_Handler_04B26FC8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c876b763",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c876b763",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcapturecontainers_Handler_IamRole_CCAC76D7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcapturecontainers_Handler_S3Object_83A35929.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testcapturecontainers_Handler_S3Object_83A35929": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture_containers/Handler/S3Object",
            "uniqueId": "root_testcapturecontainers_Handler_S3Object_83A35929"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const arr_client = context._lift(arr);
        const mySet_client = context._lift(mySet);
        const myMap_client = context._lift(myMap);
        const arrOfMap_client = context._lift(arrOfMap);
        const j_client = context._lift(j);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            arr: ${arr_client},
            mySet: ${mySet_client},
            myMap: ${myMap_client},
            arrOfMap: ${arrOfMap_client},
            j: ${j_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(arr, host, []);
          $Closure1._registerBindObject(arrOfMap, host, []);
          $Closure1._registerBindObject(j, host, []);
          $Closure1._registerBindObject(myMap, host, []);
          $Closure1._registerBindObject(mySet, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(arr, host, ["at", "length"]);
          $Closure1._registerBindObject(arrOfMap, host, ["at"]);
          $Closure1._registerBindObject(j, host, []);
          $Closure1._registerBindObject(myMap, host, ["has", "size"]);
          $Closure1._registerBindObject(mySet, host, ["has", "size"]);
        }
        super._registerBind(host, ops);
      }
    }
    const arr = Object.freeze(["hello", "world"]);
    const mySet = Object.freeze(new Set(["my", "my", "set"]));
    const myMap = Object.freeze({"hello":123,"world":999});
    const arrOfMap = Object.freeze([Object.freeze({"bang":123})]);
    const j = Object.freeze({"a":"hello","b":"world"});
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:capture_containers",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_containers", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


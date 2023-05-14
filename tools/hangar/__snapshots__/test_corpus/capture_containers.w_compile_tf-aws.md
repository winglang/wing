# [capture_containers.w](../../../../examples/tests/valid/capture_containers.w) | compile | tf-aws

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
            "WING_FUNCTION_NAME": "Handler-c876b763"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const arr = Object.freeze(["hello", "world"]);
    const mySet = Object.freeze(new Set(["my", "my", "set"]));
    const myMap = Object.freeze({"hello":123,"world":999});
    const arrOfMap = Object.freeze([Object.freeze({"bang":123})]);
    const j = Object.freeze({"a":"hello","b":"world"});
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:capture_containers",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        arr: {
          obj: arr,
          ops: []
        },
        arrOfMap: {
          obj: arrOfMap,
          ops: []
        },
        j: {
          obj: j,
          ops: []
        },
        myMap: {
          obj: myMap,
          ops: []
        },
        mySet: {
          obj: mySet,
          ops: []
        },
      }
    })
    );
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

## proc1/index.js
```js
async handle() {
  const { arr, arrOfMap, j, myMap, mySet } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await arr.at(0)) === "hello")'`)})(((await arr.at(0)) === "hello"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await arr.at(1)) === "world")'`)})(((await arr.at(1)) === "world"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr.length === 2)'`)})((arr.length === 2))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(await mySet.has("my"))'`)})((await mySet.has("my")))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(mySet.size === 2)'`)})((mySet.size === 2))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '("world" in (myMap))'`)})(("world" in (myMap)))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(myMap).length === 2)'`)})((Object.keys(myMap).length === 2))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '("bang" in ((await arrOfMap.at(0))))'`)})(("bang" in ((await arrOfMap.at(0)))))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((j)["b"] === "world")'`)})(((j)["b"] === "world"))};
}

```


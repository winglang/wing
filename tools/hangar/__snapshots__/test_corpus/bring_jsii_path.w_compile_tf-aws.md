# [bring_jsii_path.w](../../../../examples/tests/valid/bring_jsii_path.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:say_hello\",\"${aws_lambda_function.root_testsayhello_Handler_AECE9968.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testsayhello_Handler_IamRole_4F370857": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/Handler/IamRole",
            "uniqueId": "root_testsayhello_Handler_IamRole_4F370857"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testsayhello_Handler_IamRolePolicy_3E7EAE77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/Handler/IamRolePolicy",
            "uniqueId": "root_testsayhello_Handler_IamRolePolicy_3E7EAE77"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsayhello_Handler_IamRole_4F370857.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testsayhello_Handler_IamRolePolicyAttachment_6A79C79C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsayhello_Handler_IamRolePolicyAttachment_6A79C79C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsayhello_Handler_IamRole_4F370857.name}"
      }
    },
    "aws_lambda_function": {
      "root_testsayhello_Handler_AECE9968": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/Handler/Default",
            "uniqueId": "root_testsayhello_Handler_AECE9968"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8160e76"
          }
        },
        "function_name": "Handler-c8160e76",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsayhello_Handler_IamRole_4F370857.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsayhello_Handler_S3Object_1E619703.key}",
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
      "root_testsayhello_Handler_S3Object_1E619703": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/Handler/S3Object",
            "uniqueId": "root_testsayhello_Handler_S3Object_1E619703"
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
const jsii_code_samples = require("./node_modules/jsii-code-samples");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const hello = new jsii_code_samples.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:say_hello",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        greeting: {
          obj: greeting,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_jsii_path", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
  const { greeting } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(greeting === "Hello, wingnuts")'`)})((greeting === "Hello, wingnuts"))};
}

```


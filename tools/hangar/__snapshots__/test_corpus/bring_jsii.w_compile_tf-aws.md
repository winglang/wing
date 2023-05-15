# [bring_jsii.w](../../../../examples/tests/valid/bring_jsii.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ greeting }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(greeting === "Hello, wingnuts")'`)})((greeting === "Hello, wingnuts"))};
      }
    }
  }
  return $Inflight1;
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
      "value": "[[\"root/Default/Default/test:sayHello\",\"${aws_lambda_function.root_testsayHello_Handler_11C90E2C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testsayHello_Handler_IamRole_508BA144": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/IamRole",
            "uniqueId": "root_testsayHello_Handler_IamRole_508BA144"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testsayHello_Handler_IamRolePolicy_2C605E6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/IamRolePolicy",
            "uniqueId": "root_testsayHello_Handler_IamRolePolicy_2C605E6D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsayHello_Handler_IamRole_508BA144.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testsayHello_Handler_IamRolePolicyAttachment_A53D35FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsayHello_Handler_IamRolePolicyAttachment_A53D35FF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsayHello_Handler_IamRole_508BA144.name}"
      }
    },
    "aws_lambda_function": {
      "root_testsayHello_Handler_11C90E2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/Default",
            "uniqueId": "root_testsayHello_Handler_11C90E2C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c887876f"
          }
        },
        "function_name": "Handler-c887876f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsayHello_Handler_IamRole_508BA144.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsayHello_Handler_S3Object_92DB68EF.key}",
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
      "root_testsayHello_Handler_S3Object_92DB68EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/S3Object",
            "uniqueId": "root_testsayHello_Handler_S3Object_92DB68EF"
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
const stuff = require("jsii-code-samples");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        const greeting_client = context._lift(greeting);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            greeting: ${greeting_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
          this._registerBindObject(greeting, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const hello = new stuff.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:sayHello",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_jsii", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


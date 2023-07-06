# [bring_jsii_path.w](../../../../../examples/tests/valid/bring_jsii_path.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $greeting }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: greeting == \"Hello, wingnuts\"")})(($greeting === "Hello, wingnuts"))};
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
      "value": "[[\"root/Default/Default/test:sayHello\",\"${aws_lambda_function.testsayHello_Handler_98B5E136.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testsayHello_Handler_IamRole_59C2E116": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/IamRole",
            "uniqueId": "testsayHello_Handler_IamRole_59C2E116"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testsayHello_Handler_IamRolePolicy_A3967740": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/IamRolePolicy",
            "uniqueId": "testsayHello_Handler_IamRolePolicy_A3967740"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsayHello_Handler_IamRole_59C2E116.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testsayHello_Handler_IamRolePolicyAttachment_A8185104": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsayHello_Handler_IamRolePolicyAttachment_A8185104"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsayHello_Handler_IamRole_59C2E116.name}"
      }
    },
    "aws_lambda_function": {
      "testsayHello_Handler_98B5E136": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/Default",
            "uniqueId": "testsayHello_Handler_98B5E136"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c887876f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c887876f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsayHello_Handler_IamRole_59C2E116.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsayHello_Handler_S3Object_87C49294.key}",
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
      "testsayHello_Handler_S3Object_87C49294": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:sayHello/Handler/S3Object",
            "uniqueId": "testsayHello_Handler_S3Object_87C49294"
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
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const jsiiCodeSamples = require("./node_modules/jsii-code-samples");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $greeting: ${context._lift(greeting)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(greeting, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const hello = new jsiiCodeSamples.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:sayHello",new $Closure1(this,"$Closure1"));
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


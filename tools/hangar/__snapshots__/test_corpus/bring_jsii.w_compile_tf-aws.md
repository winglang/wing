# [bring_jsii.w](../../../../examples/tests/valid/bring_jsii.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ greeting }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle(m)  {
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
      "value": "[[\"root/Default/Default/test:say_hello\",\"${aws_lambda_function.root_testsayhello_8E3F8CF7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testsayhello_IamRole_CD3CFB9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/IamRole",
            "uniqueId": "root_testsayhello_IamRole_CD3CFB9C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testsayhello_IamRolePolicy_265A46FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/IamRolePolicy",
            "uniqueId": "root_testsayhello_IamRolePolicy_265A46FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsayhello_IamRole_CD3CFB9C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testsayhello_IamRolePolicyAttachment_1B179C34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/IamRolePolicyAttachment",
            "uniqueId": "root_testsayhello_IamRolePolicyAttachment_1B179C34"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsayhello_IamRole_CD3CFB9C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testsayhello_8E3F8CF7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/Default",
            "uniqueId": "root_testsayhello_8E3F8CF7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-say_hello-c867d9d9"
          }
        },
        "function_name": "test-say_hello-c867d9d9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsayhello_IamRole_CD3CFB9C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsayhello_S3Object_A9281CAB.key}",
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
      "root_testsayhello_S3Object_A9281CAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:say_hello/S3Object",
            "uniqueId": "root_testsayhello_S3Object_A9281CAB"
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
    const hello = new stuff.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:say_hello",(( () =>  {
      {
        class $Inflight1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const greeting_client = this._lift(greeting);
            const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight1 = require("${self_client_path}")({
                  greeting: ${greeting_client},
                });
                const client = new $Inflight1({
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
        return new $Inflight1(this,"$Inflight1");
      }
    }
    )()));
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

## proc1/index.js
```js
async handle(m) {
  const { greeting } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(greeting === "Hello, wingnuts")'`)})((greeting === "Hello, wingnuts"))};
}

```


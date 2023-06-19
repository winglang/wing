# [inflight_class_without_init.w](../../../../../examples/tests/valid/inflight_class_without_init.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ Foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      new Foo();
    }
    async $inflight_init()  {
    }
  }
  return $Closure1;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
     constructor()  {
      const __parent_this = this;
    }
  }
  return Foo;
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
      "value": "[[\"root/Default/Default/test:inflight class without init\",\"${aws_lambda_function.root_testinflightclasswithoutinit_Handler_43742F89.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightclasswithoutinit_Handler_IamRole_7B6382B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/IamRole",
            "uniqueId": "root_testinflightclasswithoutinit_Handler_IamRole_7B6382B4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightclasswithoutinit_Handler_IamRolePolicy_05214A17": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightclasswithoutinit_Handler_IamRolePolicy_05214A17"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightclasswithoutinit_Handler_IamRole_7B6382B4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightclasswithoutinit_Handler_IamRolePolicyAttachment_0A9C296C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightclasswithoutinit_Handler_IamRolePolicyAttachment_0A9C296C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightclasswithoutinit_Handler_IamRole_7B6382B4.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightclasswithoutinit_Handler_43742F89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/Default",
            "uniqueId": "root_testinflightclasswithoutinit_Handler_43742F89"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8459d32",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8459d32",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightclasswithoutinit_Handler_IamRole_7B6382B4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightclasswithoutinit_Handler_S3Object_93331957.key}",
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
      "root_testinflightclasswithoutinit_Handler_S3Object_93331957": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/S3Object",
            "uniqueId": "root_testinflightclasswithoutinit_Handler_S3Object_93331957"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("constructor");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const FooClient = Foo._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            Foo: ${FooClient.text},
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
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class without init",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_without_init", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


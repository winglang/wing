# [inflight_class_without_init.w](../../../../../examples/tests/valid/inflight_class_without_init.w) | compile | tf-aws

## inflight.$Closure1-16a0823e.js
```js
module.exports = function({ $Foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      new $Foo();
    }
  }
  return $Closure1;
}

```

## inflight.Foo-16a0823e.js
```js
module.exports = function({  }) {
  class Foo {
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
      "value": "[[\"root/Default/Default/test:inflight class without init\",\"${aws_lambda_function.testinflightclasswithoutinit_Handler_26AF0424.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightclasswithoutinit_Handler_IamRole_9FC8A111": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/IamRole",
            "uniqueId": "testinflightclasswithoutinit_Handler_IamRole_9FC8A111"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightclasswithoutinit_Handler_IamRolePolicy_19D5500F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/IamRolePolicy",
            "uniqueId": "testinflightclasswithoutinit_Handler_IamRolePolicy_19D5500F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightclasswithoutinit_Handler_IamRole_9FC8A111.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightclasswithoutinit_Handler_IamRolePolicyAttachment_786F6217": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightclasswithoutinit_Handler_IamRolePolicyAttachment_786F6217"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightclasswithoutinit_Handler_IamRole_9FC8A111.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightclasswithoutinit_Handler_26AF0424": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/Default",
            "uniqueId": "testinflightclasswithoutinit_Handler_26AF0424"
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
        "role": "${aws_iam_role.testinflightclasswithoutinit_Handler_IamRole_9FC8A111.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightclasswithoutinit_Handler_S3Object_A750DD17.key}",
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
      "testinflightclasswithoutinit_Handler_S3Object_A750DD17": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class without init/Handler/S3Object",
            "uniqueId": "testinflightclasswithoutinit_Handler_S3Object_A750DD17"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo-16a0823e.js")({
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1-16a0823e.js")({
            $Foo: ${context._lift(Foo)},
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
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_without_init", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


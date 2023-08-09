# [inflight_class_without_init.w](../../../../../examples/tests/valid/inflight_class_without_init.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.Foo.js
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:inflight class without init\",\"${aws_lambda_function.undefined_testinflightclasswithoutinit_Handler_37258CFA.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightclasswithoutinit_Handler_IamRole_F2C7AC27": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class without init/Handler/IamRole",
            "uniqueId": "undefined_testinflightclasswithoutinit_Handler_IamRole_F2C7AC27"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightclasswithoutinit_Handler_IamRolePolicy_3B72A7EF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class without init/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightclasswithoutinit_Handler_IamRolePolicy_3B72A7EF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightclasswithoutinit_Handler_IamRole_F2C7AC27.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightclasswithoutinit_Handler_IamRolePolicyAttachment_E4B9DC51": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class without init/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightclasswithoutinit_Handler_IamRolePolicyAttachment_E4B9DC51"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightclasswithoutinit_Handler_IamRole_F2C7AC27.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightclasswithoutinit_Handler_37258CFA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class without init/Handler/Default",
            "uniqueId": "undefined_testinflightclasswithoutinit_Handler_37258CFA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d8d1de",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d8d1de",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightclasswithoutinit_Handler_IamRole_F2C7AC27.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightclasswithoutinit_Handler_S3Object_58202B1E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_testinflightclasswithoutinit_Handler_S3Object_58202B1E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class without init/Handler/S3Object",
            "uniqueId": "undefined_testinflightclasswithoutinit_Handler_S3Object_58202B1E"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
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


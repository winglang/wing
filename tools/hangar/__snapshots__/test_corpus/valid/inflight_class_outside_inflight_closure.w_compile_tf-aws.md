# [inflight_class_outside_inflight_closure.w](../../../../../examples/tests/valid/inflight_class_outside_inflight_closure.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $BinaryOperation }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const op = new $BinaryOperation(10,20);
      {((cond) => {if (!cond) throw new Error("assertion failed: op.add() == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await op.add()),30)))};
    }
  }
  return $Closure1;
}

```

## inflight.BinaryOperation.js
```js
module.exports = function({  }) {
  class BinaryOperation {
    async add() {
      return (this.lhs + this.rhs);
    }
    constructor(lhs, rhs) {
      this.lhs = lhs;
      this.rhs = rhs;
    }
  }
  return BinaryOperation;
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
      "value": "[[\"root/undefined/Default/test:inflight class outside inflight closure\",\"${aws_lambda_function.undefined_testinflightclassoutsideinflightclosure_Handler_58F3B5BE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightclassoutsideinflightclosure_Handler_IamRole_A85861C9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class outside inflight closure/Handler/IamRole",
            "uniqueId": "undefined_testinflightclassoutsideinflightclosure_Handler_IamRole_A85861C9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightclassoutsideinflightclosure_Handler_IamRolePolicy_47A96A86": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class outside inflight closure/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightclassoutsideinflightclosure_Handler_IamRolePolicy_47A96A86"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightclassoutsideinflightclosure_Handler_IamRole_A85861C9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightclassoutsideinflightclosure_Handler_IamRolePolicyAttachment_9B955F3C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class outside inflight closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightclassoutsideinflightclosure_Handler_IamRolePolicyAttachment_9B955F3C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightclassoutsideinflightclosure_Handler_IamRole_A85861C9.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightclassoutsideinflightclosure_Handler_58F3B5BE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class outside inflight closure/Handler/Default",
            "uniqueId": "undefined_testinflightclassoutsideinflightclosure_Handler_58F3B5BE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8501b99",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8501b99",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightclassoutsideinflightclosure_Handler_IamRole_A85861C9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightclassoutsideinflightclosure_Handler_S3Object_530D8C82.key}",
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
      "undefined_testinflightclassoutsideinflightclosure_Handler_S3Object_530D8C82": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class outside inflight closure/Handler/S3Object",
            "uniqueId": "undefined_testinflightclassoutsideinflightclosure_Handler_S3Object_530D8C82"
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
    class BinaryOperation extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("add", "$inflight_init", "lhs", "rhs");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.BinaryOperation.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BinaryOperationClient = ${BinaryOperation._toInflightType(this).text};
            const client = new BinaryOperationClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          BinaryOperation._registerBindObject(this, host, ["lhs", "rhs"]);
        }
        if (ops.includes("add")) {
          BinaryOperation._registerBindObject(this, host, ["lhs", "rhs"]);
        }
        super._registerBind(host, ops);
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
            $BinaryOperation: ${context._lift(BinaryOperation)},
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class outside inflight closure",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_outside_inflight_closure", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


# [atan.w](../../../../../../examples/tests/sdk_tests/math/atan.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-1) == -0.7853981633974483")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan((-1))),(-0.7853981633974483))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan((-0))),(-0))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan(0)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(1) == 0.7853981633974483")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.atan(1)),0.7853981633974483)))};
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
      "value": "[[\"root/Default/Default/test:inflight arc tangent\",\"${aws_lambda_function.testinflightarctangent_Handler_85128CD1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightarctangent_Handler_IamRole_6933EC6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/IamRole",
            "uniqueId": "testinflightarctangent_Handler_IamRole_6933EC6D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightarctangent_Handler_IamRolePolicy_3001687F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/IamRolePolicy",
            "uniqueId": "testinflightarctangent_Handler_IamRolePolicy_3001687F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightarctangent_Handler_IamRole_6933EC6D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightarctangent_Handler_IamRolePolicyAttachment_EB5930CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightarctangent_Handler_IamRolePolicyAttachment_EB5930CF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightarctangent_Handler_IamRole_6933EC6D.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightarctangent_Handler_85128CD1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/Default",
            "uniqueId": "testinflightarctangent_Handler_85128CD1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8657687",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8657687",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightarctangent_Handler_IamRole_6933EC6D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightarctangent_Handler_S3Object_29D83C27.key}",
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
      "testinflightarctangent_Handler_S3Object_29D83C27": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/S3Object",
            "uniqueId": "testinflightarctangent_Handler_S3Object_29D83C27"
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
const math = $stdlib.math;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $math_Util: ${context._lift(math.Util)},
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
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-1) == -0.7853981633974483")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan((-1))),(-0.7853981633974483))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-0) == -0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan((-0))),(-0))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(0) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan(0)),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(1) == 0.7853981633974483")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.atan(1)),0.7853981633974483)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc tangent",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "atan", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


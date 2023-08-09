# [invoke.w](../../../../../../examples/tests/sdk_tests/function/invoke.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(input) {
      {console.log("log inside function\ncontains 2 lines")};
      const target = (await $util_Util.tryEnv("WING_TARGET"));
      {((cond) => {if (!cond) throw new Error("assertion failed: target?")})(((target) != null))};
      return String.raw({ raw: ["", "-response"] }, input);
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $f }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("log inside test")};
      const x = (await $f.invoke("hello"));
      {((cond) => {if (!cond) throw new Error("assertion failed: x == \"hello-response\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(x,"hello-response")))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/undefined/Default/test:invoke\",\"${aws_lambda_function.undefined_testinvoke_Handler_6996059A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_cloudFunction_IamRole_092E88B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRole",
            "uniqueId": "undefined_cloudFunction_IamRole_092E88B6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinvoke_Handler_IamRole_BD832554": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:invoke/Handler/IamRole",
            "uniqueId": "undefined_testinvoke_Handler_IamRole_BD832554"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudFunction_IamRolePolicy_F10C459A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "undefined_cloudFunction_IamRolePolicy_F10C459A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.name}"
      },
      "undefined_testinvoke_Handler_IamRolePolicy_06EB8312": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:invoke/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinvoke_Handler_IamRolePolicy_06EB8312"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_cloudFunction_D952FD36.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testinvoke_Handler_IamRole_BD832554.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudFunction_IamRolePolicyAttachment_00616B66": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudFunction_IamRolePolicyAttachment_00616B66"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.name}"
      },
      "undefined_testinvoke_Handler_IamRolePolicyAttachment_9F16670F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:invoke/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinvoke_Handler_IamRolePolicyAttachment_9F16670F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinvoke_Handler_IamRole_BD832554.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudFunction_D952FD36": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/Default",
            "uniqueId": "undefined_cloudFunction_D952FD36"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c82dc107",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c82dc107",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudFunction_S3Object_8BF8149A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinvoke_Handler_6996059A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:invoke/Handler/Default",
            "uniqueId": "undefined_testinvoke_Handler_6996059A"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_08e34822": "${aws_lambda_function.undefined_cloudFunction_D952FD36.arn}",
            "WING_FUNCTION_NAME": "Handler-c84f05f4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c84f05f4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinvoke_Handler_IamRole_BD832554.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinvoke_Handler_S3Object_53DFD816.key}",
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
      "undefined_cloudFunction_S3Object_8BF8149A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/S3Object",
            "uniqueId": "undefined_cloudFunction_S3Object_8BF8149A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinvoke_Handler_S3Object_53DFD816": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:invoke/Handler/S3Object",
            "uniqueId": "undefined_testinvoke_Handler_S3Object_53DFD816"
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
const util = $stdlib.util;
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
            $util_Util: ${context._lift(util.Util)},
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
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $f: ${context._lift(f)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(f, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const payload = "hello";
    {console.log("log preflight")};
    const f = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:invoke",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "invoke", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


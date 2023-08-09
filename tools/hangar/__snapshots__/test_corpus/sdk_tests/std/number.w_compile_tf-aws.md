# [number.w](../../../../../../examples/tests/sdk_tests/std/number.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $std_Number }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: num.fromJson(Json 123) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(123),123)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $std_Number }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: num.fromStr(\"888\") == 888")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("888"),888)))};
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
      "value": "[[\"root/undefined/Default/test:fromJson\",\"${aws_lambda_function.undefined_testfromJson_Handler_0599F64C.arn}\"],[\"root/undefined/Default/test:fromStr\",\"${aws_lambda_function.undefined_testfromStr_Handler_A6082DDE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testfromJson_Handler_IamRole_FEC9BF71": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/IamRole",
            "uniqueId": "undefined_testfromJson_Handler_IamRole_FEC9BF71"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testfromStr_Handler_IamRole_B4A67530": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromStr/Handler/IamRole",
            "uniqueId": "undefined_testfromStr_Handler_IamRole_B4A67530"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testfromJson_Handler_IamRolePolicy_A2BDE852": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/IamRolePolicy",
            "uniqueId": "undefined_testfromJson_Handler_IamRolePolicy_A2BDE852"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testfromJson_Handler_IamRole_FEC9BF71.name}"
      },
      "undefined_testfromStr_Handler_IamRolePolicy_84CFB2BB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromStr/Handler/IamRolePolicy",
            "uniqueId": "undefined_testfromStr_Handler_IamRolePolicy_84CFB2BB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testfromStr_Handler_IamRole_B4A67530.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testfromJson_Handler_IamRolePolicyAttachment_1876B173": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testfromJson_Handler_IamRolePolicyAttachment_1876B173"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testfromJson_Handler_IamRole_FEC9BF71.name}"
      },
      "undefined_testfromStr_Handler_IamRolePolicyAttachment_48C8ABB7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromStr/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testfromStr_Handler_IamRolePolicyAttachment_48C8ABB7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testfromStr_Handler_IamRole_B4A67530.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testfromJson_Handler_0599F64C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/Default",
            "uniqueId": "undefined_testfromJson_Handler_0599F64C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8dbc36b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8dbc36b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testfromJson_Handler_IamRole_FEC9BF71.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testfromJson_Handler_S3Object_D2AC2543.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testfromStr_Handler_A6082DDE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromStr/Handler/Default",
            "uniqueId": "undefined_testfromStr_Handler_A6082DDE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8040422",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8040422",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testfromStr_Handler_IamRole_B4A67530.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testfromStr_Handler_S3Object_7F1CA424.key}",
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
      "undefined_testfromJson_Handler_S3Object_D2AC2543": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromJson/Handler/S3Object",
            "uniqueId": "undefined_testfromJson_Handler_S3Object_D2AC2543"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testfromStr_Handler_S3Object_7F1CA424": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:fromStr/Handler/S3Object",
            "uniqueId": "undefined_testfromStr_Handler_S3Object_7F1CA424"
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
            $std_Number: ${context._lift(std.Number)},
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
            $std_Number: ${context._lift(std.Number)},
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
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: num.fromJson(Json 12) == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(12),12)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: num.fromStr(\"42\") == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("42"),42)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromStr",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "number", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


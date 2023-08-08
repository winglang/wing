# [base64.w](../../../../../../examples/tests/sdk_tests/util/base64.w) | compile | tf-aws

## inflight.$Closure1-ee90b037.js
```js
module.exports = function({ $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const string = "https://www.winglang.io/docs";
      const base64Encode = (await $util_Util.base64Encode(string));
      const base64urlEncode = (await $util_Util.base64Encode(string,true));
      const base64Decode = (await $util_Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw=="));
      const base64urlDecode = (await $util_Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw",true));
      {((cond) => {if (!cond) throw new Error("assertion failed: base64Encode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Encode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: base64urlEncode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlEncode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: base64Decode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Decode,string)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: base64urlDecode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlDecode,string)))};
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
      "value": "[[\"root/Default/Default/test:inflight base64\",\"${aws_lambda_function.testinflightbase64_Handler_31E9772F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightbase64_Handler_IamRole_49F68A60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/IamRole",
            "uniqueId": "testinflightbase64_Handler_IamRole_49F68A60"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightbase64_Handler_IamRolePolicy_031C1061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/IamRolePolicy",
            "uniqueId": "testinflightbase64_Handler_IamRolePolicy_031C1061"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightbase64_Handler_IamRole_49F68A60.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightbase64_Handler_IamRolePolicyAttachment_FA451656": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightbase64_Handler_IamRolePolicyAttachment_FA451656"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightbase64_Handler_IamRole_49F68A60.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightbase64_Handler_31E9772F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/Default",
            "uniqueId": "testinflightbase64_Handler_31E9772F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c853d8cf",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c853d8cf",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightbase64_Handler_IamRole_49F68A60.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightbase64_Handler_S3Object_C9A792F2.key}",
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
      "testinflightbase64_Handler_S3Object_C9A792F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight base64/Handler/S3Object",
            "uniqueId": "testinflightbase64_Handler_S3Object_C9A792F2"
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
          require("./inflight.$Closure1-ee90b037.js")({
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
    const string = "https://www.winglang.io/docs";
    const base64Encode = (util.Util.base64Encode(string));
    const base64urlEncode = (util.Util.base64Encode(string,true));
    const base64Decode = (util.Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw=="));
    const base64urlDecode = (util.Util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw",true));
    {((cond) => {if (!cond) throw new Error("assertion failed: base64Encode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Encode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: base64urlEncode == \"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlEncode,"aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: base64Decode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64Decode,string)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: base64urlDecode == string")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(base64urlDecode,string)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight base64",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "base64", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


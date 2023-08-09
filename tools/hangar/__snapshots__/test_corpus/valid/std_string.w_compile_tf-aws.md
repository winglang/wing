# [std_string.w](../../../../../examples/tests/valid/std_string.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $__s1_split_______at_1__, $_s1_concat_s2__, $s1_indexOf__s__ }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log(String.raw({ raw: ["index of \"s\" in s1 is ", ""] }, $s1_indexOf__s__))};
      {console.log($__s1_split_______at_1__)};
      {console.log($_s1_concat_s2__)};
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
      "value": "[[\"root/undefined/Default/test:string\",\"${aws_lambda_function.undefined_teststring_Handler_A891D0FE.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_teststring_Handler_IamRole_E04A1243": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:string/Handler/IamRole",
            "uniqueId": "undefined_teststring_Handler_IamRole_E04A1243"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_teststring_Handler_IamRolePolicy_360B14D4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:string/Handler/IamRolePolicy",
            "uniqueId": "undefined_teststring_Handler_IamRolePolicy_360B14D4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_teststring_Handler_IamRole_E04A1243.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_teststring_Handler_IamRolePolicyAttachment_60A08F0C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:string/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_teststring_Handler_IamRolePolicyAttachment_60A08F0C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_teststring_Handler_IamRole_E04A1243.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_teststring_Handler_A891D0FE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:string/Handler/Default",
            "uniqueId": "undefined_teststring_Handler_A891D0FE"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8ef92df",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ef92df",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_teststring_Handler_IamRole_E04A1243.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_teststring_Handler_S3Object_DD33ECE6.key}",
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
      "undefined_teststring_Handler_S3Object_DD33ECE6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:string/Handler/S3Object",
            "uniqueId": "undefined_teststring_Handler_S3Object_DD33ECE6"
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
            $__s1_split_______at_1__: ${context._lift(((s1.split(" ")).at(1)))},
            $_s1_concat_s2__: ${context._lift((s1.concat(s2)))},
            $s1_indexOf__s__: ${context._lift(s1.indexOf("s"))},
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
          $Closure1._registerBindObject(((s1.split(" ")).at(1)), host, []);
          $Closure1._registerBindObject((s1.concat(s2)), host, []);
          $Closure1._registerBindObject(s1.indexOf("s"), host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const s1 = "some string";
    const s2 = "s are immutable";
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.length == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s1.length,11)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.at(7) == \"r\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { if (7 >= s1.length || 7 + s1.length < 0) {throw new Error("index out of bounds")}; return s1.at(7) })(7),"r")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.concat(s2) == \"some strings are immutable\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((s1.concat(s2)),"some strings are immutable")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.contains(\"some\")")})(s1.includes("some"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"some\".contains(s1)")})((!"some".includes(s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.endsWith(\"string\")")})(s1.endsWith("string"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.indexOf(\"s\") == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s1.indexOf("s"),0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"Some String\".lowercase() == \"some string\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("Some String".toLocaleLowerCase(),"some string")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.split(\" \").at(0) == \"some\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((s1.split(" ")).at(0)),"some")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.startsWith(\"some\")")})(s1.startsWith("some"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.substring(5) == \"string\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((s1.substring(5)),"string")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.substring(5, 7) == \"st\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((s1.substring(5,7)),"st")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"   some string   \".trim() == \"some string\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("   some string   ".trim()),"some string")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"Some String\".uppercase() == \"SOME STRING\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("Some String".toLocaleUpperCase(),"SOME STRING")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\" + \" world\" == \"hello world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("hello" + " world"),"hello world")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \n\"hello ${\"funky\"}\n world\" == \"hello funky\\n world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(String.raw({ raw: ["hello ", "\n world"] }, "funky"),"hello funky\n world")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:string",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "std_string", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


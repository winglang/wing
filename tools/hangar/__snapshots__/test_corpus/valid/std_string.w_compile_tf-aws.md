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
      "value": "[[\"root/Default/Default/test:string\",\"${aws_lambda_function.teststring_Handler_2FEE704D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "teststring_Handler_IamRole_4BEC53AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/IamRole",
            "uniqueId": "teststring_Handler_IamRole_4BEC53AF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "teststring_Handler_IamRolePolicy_A9C266F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/IamRolePolicy",
            "uniqueId": "teststring_Handler_IamRolePolicy_A9C266F9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.teststring_Handler_IamRole_4BEC53AF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "teststring_Handler_IamRolePolicyAttachment_5EFE3004": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/IamRolePolicyAttachment",
            "uniqueId": "teststring_Handler_IamRolePolicyAttachment_5EFE3004"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.teststring_Handler_IamRole_4BEC53AF.name}"
      }
    },
    "aws_lambda_function": {
      "teststring_Handler_2FEE704D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/Default",
            "uniqueId": "teststring_Handler_2FEE704D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a1f7f0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a1f7f0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.teststring_Handler_IamRole_4BEC53AF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.teststring_Handler_S3Object_F47B31DA.key}",
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
      "teststring_Handler_S3Object_F47B31DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/S3Object",
            "uniqueId": "teststring_Handler_S3Object_F47B31DA"
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
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.length == 11")})((s1.length === 11))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.at(7) == \"r\"")})((((args) => { if (7 >= s1.length || 7 + s1.length < 0) {throw new Error("index out of bounds")}; return s1.at(7) })(7) === "r"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.concat(s2) == \"some strings are immutable\"")})(((s1.concat(s2)) === "some strings are immutable"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.contains(\"some\")")})(s1.includes("some"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !\"some\".contains(s1)")})((!"some".includes(s1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.endsWith(\"string\")")})(s1.endsWith("string"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.indexOf(\"s\") == 0")})((s1.indexOf("s") === 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"Some String\".lowercase() == \"some string\"")})(("Some String".toLocaleLowerCase() === "some string"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.split(\" \").at(0) == \"some\"")})((((s1.split(" ")).at(0)) === "some"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.startsWith(\"some\")")})(s1.startsWith("some"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.substring(5) == \"string\"")})(((s1.substring(5)) === "string"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: s1.substring(5, 7) == \"st\"")})(((s1.substring(5,7)) === "st"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"   some string   \".trim() == \"some string\"")})((("   some string   ".trim()) === "some string"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"Some String\".uppercase() == \"SOME STRING\"")})(("Some String".toLocaleUpperCase() === "SOME STRING"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\" + \" world\" == \"hello world\"")})((("hello" + " world") === "hello world"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \n\"hello ${\"funky\"}\n world\" == \"hello funky\\n world\"")})((String.raw({ raw: ["hello ", "\n world"] }, "funky") === "hello funky\n world"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:string",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "std_string", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


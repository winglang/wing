# [std_string.w](../../../../examples/tests/valid/std_string.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ s1, s2 }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        {console.log(`index of \"s\" in s1 is ${s1.indexOf("s")}`)};
        {console.log((typeof (typeof s1.split === "function" ? await s1.split(" ") : await s1.split.handle(" ")).at === "function" ? await (typeof s1.split === "function" ? await s1.split(" ") : await s1.split.handle(" ")).at(1) : await (typeof s1.split === "function" ? await s1.split(" ") : await s1.split.handle(" ")).at.handle(1)))};
        {console.log((typeof s1.concat === "function" ? await s1.concat(s2) : await s1.concat.handle(s2)))};
      }
    }
  }
  return $Inflight1;
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
      "value": "[[\"root/Default/Default/test:string\",\"${aws_lambda_function.root_teststring_Handler_0FEC3C02.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_teststring_Handler_IamRole_5A8EA2E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/IamRole",
            "uniqueId": "root_teststring_Handler_IamRole_5A8EA2E8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_teststring_Handler_IamRolePolicy_6CA5C6A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/IamRolePolicy",
            "uniqueId": "root_teststring_Handler_IamRolePolicy_6CA5C6A2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_teststring_Handler_IamRole_5A8EA2E8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_teststring_Handler_IamRolePolicyAttachment_FACB7AC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_teststring_Handler_IamRolePolicyAttachment_FACB7AC7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_teststring_Handler_IamRole_5A8EA2E8.name}"
      }
    },
    "aws_lambda_function": {
      "root_teststring_Handler_0FEC3C02": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/Default",
            "uniqueId": "root_teststring_Handler_0FEC3C02"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a1f7f0"
          }
        },
        "function_name": "Handler-c8a1f7f0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_teststring_Handler_IamRole_5A8EA2E8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_teststring_Handler_S3Object_01023DE4.key}",
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
      "root_teststring_Handler_S3Object_01023DE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Handler/S3Object",
            "uniqueId": "root_teststring_Handler_S3Object_01023DE4"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        const s1_client = context._lift(s1);
        const s2_client = context._lift(s2);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            s1: ${s1_client},
            s2: ${s2_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(s1, host, []);
          $Inflight1._registerBindObject(s2, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const s1 = "some string";
    const s2 = "s are immutable";
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s1.length === 11)'`)})((s1.length === 11))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.at(7)) === "r")'`)})(((s1.at(7)) === "r"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.concat(s2)) === "some strings are immutable")'`)})(((s1.concat(s2)) === "some strings are immutable"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.includes("some")'`)})(s1.includes("some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!"some".includes(s1))'`)})((!"some".includes(s1)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.endsWith("string")'`)})(s1.endsWith("string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s1.indexOf("s") === 0)'`)})((s1.indexOf("s") === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("Some String".toLocaleLowerCase() === "some string")'`)})(("Some String".toLocaleLowerCase() === "some string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((s1.split(" ")).at(0)) === "some")'`)})((((s1.split(" ")).at(0)) === "some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.startsWith("some")'`)})(s1.startsWith("some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.substring(5)) === "string")'`)})(((s1.substring(5)) === "string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.substring(5,7)) === "st")'`)})(((s1.substring(5,7)) === "st"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(("   some string   ".trim()) === "some string")'`)})((("   some string   ".trim()) === "some string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("Some String".toLocaleUpperCase() === "SOME STRING")'`)})(("Some String".toLocaleUpperCase() === "SOME STRING"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(("hello" + " world") === "hello world")'`)})((("hello" + " world") === "hello world"))};
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:string",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "std_string", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


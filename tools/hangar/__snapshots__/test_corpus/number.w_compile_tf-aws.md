# [number.w](../../../../examples/tests/valid/number.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ std_Number }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(123) === 123)'`)})((((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(123) === 123))};
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ std_Number }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("888") === 888)'`)})((((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("888") === 888))};
    }
  }
  return $Inflight2;
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
      "value": "[[\"root/Default/Default/test:fromJson\",\"${aws_lambda_function.root_testfromJson_Handler_78BC74EF.arn}\"],[\"root/Default/Default/test:fromStr\",\"${aws_lambda_function.root_testfromStr_Handler_3A28495D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testfromJson_Handler_IamRole_0CD391FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRole",
            "uniqueId": "root_testfromJson_Handler_IamRole_0CD391FA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testfromStr_Handler_IamRole_0C3D939C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromStr/Handler/IamRole",
            "uniqueId": "root_testfromStr_Handler_IamRole_0C3D939C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testfromJson_Handler_IamRolePolicy_45DAD346": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRolePolicy",
            "uniqueId": "root_testfromJson_Handler_IamRolePolicy_45DAD346"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_0CD391FA.name}"
      },
      "root_testfromStr_Handler_IamRolePolicy_FC44162D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromStr/Handler/IamRolePolicy",
            "uniqueId": "root_testfromStr_Handler_IamRolePolicy_FC44162D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testfromStr_Handler_IamRole_0C3D939C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testfromJson_Handler_IamRolePolicyAttachment_32BFB486": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testfromJson_Handler_IamRolePolicyAttachment_32BFB486"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_0CD391FA.name}"
      },
      "root_testfromStr_Handler_IamRolePolicyAttachment_5F277622": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromStr/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testfromStr_Handler_IamRolePolicyAttachment_5F277622"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfromStr_Handler_IamRole_0C3D939C.name}"
      }
    },
    "aws_lambda_function": {
      "root_testfromJson_Handler_78BC74EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/Default",
            "uniqueId": "root_testfromJson_Handler_78BC74EF"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c89f3277",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c89f3277",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testfromJson_Handler_IamRole_0CD391FA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfromJson_Handler_S3Object_15CCD570.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testfromStr_Handler_3A28495D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromStr/Handler/Default",
            "uniqueId": "root_testfromStr_Handler_3A28495D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8fdb1d1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fdb1d1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testfromStr_Handler_IamRole_0C3D939C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfromStr_Handler_S3Object_5FB76AB1.key}",
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
      "root_testfromJson_Handler_S3Object_15CCD570": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/S3Object",
            "uniqueId": "root_testfromJson_Handler_S3Object_15CCD570"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testfromStr_Handler_S3Object_5FB76AB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromStr/Handler/S3Object",
            "uniqueId": "root_testfromStr_Handler_S3Object_5FB76AB1"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
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
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const std_NumberClient = std.Number._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            std_Number: ${std_NumberClient.text},
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
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
        const std_NumberClient = std.Number._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            std_Number: ${std_NumberClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
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
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(12) === 12)'`)})((((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })(12) === 12))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson",new $Inflight1(this,"$Inflight1"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("42") === 42)'`)})((((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })("42") === 42))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromStr",new $Inflight2(this,"$Inflight2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "number", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


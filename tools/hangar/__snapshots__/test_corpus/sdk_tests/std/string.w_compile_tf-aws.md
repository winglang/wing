# [string.w](../../../../../../examples/tests/sdk_tests/std/string.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ PARSE_ERROR, std_String }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"World\") == \"World\"")})((((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })("World") === "World"))};
      try {
        ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(123);
      }
      catch ($error_s) {
        const s = $error_s.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: s == PARSE_ERROR")})((s === PARSE_ERROR))};
      }
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})(("hello".length === 5))};
      {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})(("".length === 0))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(0) == \"b\"")})(((await "boom".at(0)) === "b"))};
    }
  }
  return $Closure3;
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
      "value": "[[\"root/Default/Default/test:fromJson\",\"${aws_lambda_function.root_testfromJson_Handler_78BC74EF.arn}\"],[\"root/Default/Default/test:length\",\"${aws_lambda_function.root_testlength_Handler_7245E498.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.root_testat_Handler_39FB3FA1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testat_Handler_IamRole_EA5BD403": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRole",
            "uniqueId": "root_testat_Handler_IamRole_EA5BD403"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testfromJson_Handler_IamRole_0CD391FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:fromJson/Handler/IamRole",
            "uniqueId": "root_testfromJson_Handler_IamRole_0CD391FA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlength_Handler_IamRole_A8384051": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRole",
            "uniqueId": "root_testlength_Handler_IamRole_A8384051"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testat_Handler_IamRolePolicy_F5E3D10E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicy",
            "uniqueId": "root_testat_Handler_IamRolePolicy_F5E3D10E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.name}"
      },
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
      "root_testlength_Handler_IamRolePolicy_9DE70A2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicy",
            "uniqueId": "root_testlength_Handler_IamRolePolicy_9DE70A2C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testat_Handler_IamRolePolicyAttachment_13C52D1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testat_Handler_IamRolePolicyAttachment_13C52D1D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.name}"
      },
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
      "root_testlength_Handler_IamRolePolicyAttachment_75515754": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlength_Handler_IamRolePolicyAttachment_75515754"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      }
    },
    "aws_lambda_function": {
      "root_testat_Handler_39FB3FA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/Default",
            "uniqueId": "root_testat_Handler_39FB3FA1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c858faac",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c858faac",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testat_Handler_S3Object_C90B92D0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
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
      "root_testlength_Handler_7245E498": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/Default",
            "uniqueId": "root_testlength_Handler_7245E498"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e0ccbd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e0ccbd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlength_Handler_S3Object_22B052A5.key}",
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
      "root_testat_Handler_S3Object_C90B92D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/S3Object",
            "uniqueId": "root_testat_Handler_S3Object_C90B92D0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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
      "root_testlength_Handler_S3Object_22B052A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/S3Object",
            "uniqueId": "root_testlength_Handler_S3Object_22B052A5"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const PARSE_ERROR_client = context._lift(PARSE_ERROR);
        const std_StringClient = std.String._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            PARSE_ERROR: ${PARSE_ERROR_client},
            std_String: ${std_StringClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(PARSE_ERROR, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
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
    const assertThrows =  (expected, block) =>  {
      let error = false;
      try {
        (block());
      }
      catch ($error_actual) {
        const actual = $error_actual.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: actual == expected")})((actual === expected))};
        error = true;
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: error")})(error)};
    }
    ;
    const PARSE_ERROR = "unable to parse number 123 as a string";
    {((cond) => {if (!cond) throw new Error("assertion failed: str.fromJson(Json \"Hello\") == \"Hello\"")})((((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })("Hello") === "Hello"))};
    (assertThrows(PARSE_ERROR, () =>  {
      ((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })(123);
    }
    ));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:fromJson",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"hello\".length == 5")})(("hello".length === 5))};
    {((cond) => {if (!cond) throw new Error("assertion failed: \"\".length == 0")})(("".length === 0))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure2(this,"$Closure2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: \"boom\".at(2) == \"o\"")})((("boom".at(2)) === "o"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure3(this,"$Closure3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "string", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


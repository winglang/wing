# [array.w](../../../../../../examples/tests/sdk_tests/std/array.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.freeze(["hello"]).length === 1)'`)})((Object.freeze(["hello"]).length === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(["hello"].length === 1)'`)})((["hello"].length === 1))};
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({  }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Object.freeze(["hello"]).at(0)) === "hello")'`)})(((await Object.freeze(["hello"]).at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await ["hello", "world"].at(1)) === "world")'`)})(((await ["hello", "world"].at(1)) === "world"))};
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({  }) {
  class $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const a = ["hello"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
      (await a.push("world"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 2)'`)})((a.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(0)) === "hello")'`)})(((await a.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(1)) === "world")'`)})(((await a.at(1)) === "world"))};
    }
  }
  return $Inflight3;
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
      "value": "[[\"root/Default/Default/test:length\",\"${aws_lambda_function.root_testlength_Handler_7245E498.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.root_testat_Handler_39FB3FA1.arn}\"],[\"root/Default/Default/test:push()\",\"${aws_lambda_function.root_testpush_Handler_1F462746.arn}\"]]"
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
      "root_testlength_Handler_IamRole_A8384051": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRole",
            "uniqueId": "root_testlength_Handler_IamRole_A8384051"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testpush_Handler_IamRole_3B5EB3DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push()/Handler/IamRole",
            "uniqueId": "root_testpush_Handler_IamRole_3B5EB3DF"
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
      "root_testlength_Handler_IamRolePolicy_9DE70A2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicy",
            "uniqueId": "root_testlength_Handler_IamRolePolicy_9DE70A2C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      },
      "root_testpush_Handler_IamRolePolicy_7691DE83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push()/Handler/IamRolePolicy",
            "uniqueId": "root_testpush_Handler_IamRolePolicy_7691DE83"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testpush_Handler_IamRole_3B5EB3DF.name}"
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
      "root_testlength_Handler_IamRolePolicyAttachment_75515754": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlength_Handler_IamRolePolicyAttachment_75515754"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      },
      "root_testpush_Handler_IamRolePolicyAttachment_2F482395": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testpush_Handler_IamRolePolicyAttachment_2F482395"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpush_Handler_IamRole_3B5EB3DF.name}"
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
      },
      "root_testpush_Handler_1F462746": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push()/Handler/Default",
            "uniqueId": "root_testpush_Handler_1F462746"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8230172",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8230172",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testpush_Handler_IamRole_3B5EB3DF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpush_Handler_S3Object_E277335F.key}",
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
      },
      "root_testpush_Handler_S3Object_E277335F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:push()/Handler/S3Object",
            "uniqueId": "root_testpush_Handler_S3Object_E277335F"
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight3Client = ${$Inflight3._toInflightType(this).text};
            const client = new $Inflight3Client({
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
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.freeze([1, 2, 3]).length === 3)'`)})((Object.freeze([1, 2, 3]).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '([1, 2, 3].length === 3)'`)})(([1, 2, 3].length === 3))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Inflight1(this,"$Inflight1"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.freeze(["hello"]).at(0)) === "hello")'`)})(((Object.freeze(["hello"]).at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((["hello", "world"].at(1)) === "world")'`)})(((["hello", "world"].at(1)) === "world"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Inflight2(this,"$Inflight2"));
    const a = ["hello"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
    (a.push("world"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 2)'`)})((a.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(0)) === "hello")'`)})(((a.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(1)) === "world")'`)})(((a.at(1)) === "world"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:push()",new $Inflight3(this,"$Inflight3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "array", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


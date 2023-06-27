# [dec.w](../../../../../../examples/tests/sdk_tests/counter/dec.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 1")})(((await counter.peek()) === 1))};
      const dec1 = (await counter.dec());
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 0")})(((await counter.peek()) === 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec1 == 1")})((dec1 === 1))};
      const dec2 = (await counter.dec(2));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == -2")})(((await counter.peek()) === (-2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec2 == 0")})((dec2 === 0))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const key = "my-key";
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 0")})(((await counter.peek(key)) === 0))};
      const dec1 = (await counter.dec(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == -1")})(((await counter.peek(key)) === (-1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec1 == 0")})((dec1 === 0))};
      const dec2 = (await counter.dec(2,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == -3")})(((await counter.peek(key)) === (-3)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec2 == -1")})((dec2 === (-1)))};
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
      "value": "[[\"root/Default/Default/test:dec\",\"${aws_lambda_function.root_testdec_Handler_AE114D79.arn}\"],[\"root/Default/Default/test:key dec\",\"${aws_lambda_function.root_testkeydec_Handler_9A4B0F1C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "root_testdec_Handler_IamRole_3E911C09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRole",
            "uniqueId": "root_testdec_Handler_IamRole_3E911C09"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testkeydec_Handler_IamRole_3DB80873": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/IamRole",
            "uniqueId": "root_testkeydec_Handler_IamRole_3DB80873"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testdec_Handler_IamRolePolicy_26A5726A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRolePolicy",
            "uniqueId": "root_testdec_Handler_IamRolePolicy_26A5726A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testdec_Handler_IamRole_3E911C09.name}"
      },
      "root_testkeydec_Handler_IamRolePolicy_79928BD4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/IamRolePolicy",
            "uniqueId": "root_testkeydec_Handler_IamRolePolicy_79928BD4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testkeydec_Handler_IamRole_3DB80873.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testdec_Handler_IamRolePolicyAttachment_7CF9599B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testdec_Handler_IamRolePolicyAttachment_7CF9599B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdec_Handler_IamRole_3E911C09.name}"
      },
      "root_testkeydec_Handler_IamRolePolicyAttachment_34AF7C34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testkeydec_Handler_IamRolePolicyAttachment_34AF7C34"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testkeydec_Handler_IamRole_3DB80873.name}"
      }
    },
    "aws_lambda_function": {
      "root_testdec_Handler_AE114D79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/Default",
            "uniqueId": "root_testdec_Handler_AE114D79"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8daa879",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8daa879",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testdec_Handler_IamRole_3E911C09.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdec_Handler_S3Object_E6EDF071.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testkeydec_Handler_9A4B0F1C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/Default",
            "uniqueId": "root_testkeydec_Handler_9A4B0F1C"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8a42d0e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a42d0e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testkeydec_Handler_IamRole_3DB80873.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testkeydec_Handler_S3Object_18419CC9.key}",
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
      "root_testdec_Handler_S3Object_E6EDF071": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/S3Object",
            "uniqueId": "root_testdec_Handler_S3Object_E6EDF071"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testkeydec_Handler_S3Object_18419CC9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/S3Object",
            "uniqueId": "root_testkeydec_Handler_S3Object_18419CC9"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Closure1._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(counter, host, ["dec", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Closure2._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(counter, host, ["dec", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 1 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:dec",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key dec",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "dec", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


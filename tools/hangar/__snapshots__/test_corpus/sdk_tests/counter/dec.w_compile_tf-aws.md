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
      "value": "[[\"root/Default/Default/test:dec\",\"${aws_lambda_function.testdec_Handler_BE7C58D4.arn}\"],[\"root/Default/Default/test:key dec\",\"${aws_lambda_function.testkeydec_Handler_4A8C3A6B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
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
      "testdec_Handler_IamRole_C9D0FD1F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRole",
            "uniqueId": "testdec_Handler_IamRole_C9D0FD1F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testkeydec_Handler_IamRole_593F2293": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/IamRole",
            "uniqueId": "testkeydec_Handler_IamRole_593F2293"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testdec_Handler_IamRolePolicy_4212B76A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRolePolicy",
            "uniqueId": "testdec_Handler_IamRolePolicy_4212B76A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testdec_Handler_IamRole_C9D0FD1F.name}"
      },
      "testkeydec_Handler_IamRolePolicy_B81B16D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/IamRolePolicy",
            "uniqueId": "testkeydec_Handler_IamRolePolicy_B81B16D6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testkeydec_Handler_IamRole_593F2293.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testdec_Handler_IamRolePolicyAttachment_3904F3E7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "testdec_Handler_IamRolePolicyAttachment_3904F3E7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testdec_Handler_IamRole_C9D0FD1F.name}"
      },
      "testkeydec_Handler_IamRolePolicyAttachment_DEBB09D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "testkeydec_Handler_IamRolePolicyAttachment_DEBB09D6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testkeydec_Handler_IamRole_593F2293.name}"
      }
    },
    "aws_lambda_function": {
      "testdec_Handler_BE7C58D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/Default",
            "uniqueId": "testdec_Handler_BE7C58D4"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8daa879",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8daa879",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testdec_Handler_IamRole_C9D0FD1F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testdec_Handler_S3Object_3C960783.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testkeydec_Handler_4A8C3A6B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/Default",
            "uniqueId": "testkeydec_Handler_4A8C3A6B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8a42d0e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a42d0e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testkeydec_Handler_IamRole_593F2293.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testkeydec_Handler_S3Object_EF48CE0E.key}",
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
      "testdec_Handler_S3Object_3C960783": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dec/Handler/S3Object",
            "uniqueId": "testdec_Handler_S3Object_3C960783"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testkeydec_Handler_S3Object_EF48CE0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key dec/Handler/S3Object",
            "uniqueId": "testkeydec_Handler_S3Object_EF48CE0E"
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


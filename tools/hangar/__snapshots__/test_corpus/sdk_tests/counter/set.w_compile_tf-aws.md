# [set.w](../../../../../../examples/tests/sdk_tests/counter/set.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 0")})(((await $counter.peek()) === 0))};
      (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 1")})(((await $counter.peek()) === 1))};
      (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 2")})(((await $counter.peek()) === 2))};
      (await $counter.inc(10));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 12")})(((await $counter.peek()) === 12))};
      (await $counter.set(88));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 88")})(((await $counter.peek()) === 88))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const key = "my-key";
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 0")})(((await $counter.peek(key)) === 0))};
      (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 1")})(((await $counter.peek(key)) === 1))};
      (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 2")})(((await $counter.peek(key)) === 2))};
      (await $counter.inc(10,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 12")})(((await $counter.peek(key)) === 12))};
      (await $counter.set(88,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 88")})(((await $counter.peek(key)) === 88))};
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
      "value": "[[\"root/Default/Default/test:set\",\"${aws_lambda_function.testset_Handler_62442DF2.arn}\"],[\"root/Default/Default/test:key set\",\"${aws_lambda_function.testkeyset_Handler_33945E34.arn}\"]]"
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
      "testkeyset_Handler_IamRole_649B2F6E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key set/Handler/IamRole",
            "uniqueId": "testkeyset_Handler_IamRole_649B2F6E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testset_Handler_IamRole_D0AA7310": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set/Handler/IamRole",
            "uniqueId": "testset_Handler_IamRole_D0AA7310"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testkeyset_Handler_IamRolePolicy_66D89336": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key set/Handler/IamRolePolicy",
            "uniqueId": "testkeyset_Handler_IamRolePolicy_66D89336"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testkeyset_Handler_IamRole_649B2F6E.name}"
      },
      "testset_Handler_IamRolePolicy_1DDA6703": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set/Handler/IamRolePolicy",
            "uniqueId": "testset_Handler_IamRolePolicy_1DDA6703"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testset_Handler_IamRole_D0AA7310.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testkeyset_Handler_IamRolePolicyAttachment_118A0C8A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key set/Handler/IamRolePolicyAttachment",
            "uniqueId": "testkeyset_Handler_IamRolePolicyAttachment_118A0C8A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testkeyset_Handler_IamRole_649B2F6E.name}"
      },
      "testset_Handler_IamRolePolicyAttachment_B0CA7B44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set/Handler/IamRolePolicyAttachment",
            "uniqueId": "testset_Handler_IamRolePolicyAttachment_B0CA7B44"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testset_Handler_IamRole_D0AA7310.name}"
      }
    },
    "aws_lambda_function": {
      "testkeyset_Handler_33945E34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key set/Handler/Default",
            "uniqueId": "testkeyset_Handler_33945E34"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c87cc733",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87cc733",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testkeyset_Handler_IamRole_649B2F6E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testkeyset_Handler_S3Object_35E53A93.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testset_Handler_62442DF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set/Handler/Default",
            "uniqueId": "testset_Handler_62442DF2"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c80adb7b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80adb7b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testset_Handler_IamRole_D0AA7310.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testset_Handler_S3Object_92D7E655.key}",
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
      "testkeyset_Handler_S3Object_35E53A93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key set/Handler/S3Object",
            "uniqueId": "testkeyset_Handler_S3Object_35E53A93"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testset_Handler_S3Object_92D7E655": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set/Handler/S3Object",
            "uniqueId": "testset_Handler_S3Object_92D7E655"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $counter: ${context._lift(counter)},
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
          $Closure1._registerBindObject(counter, host, ["inc", "peek", "set"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $counter: ${context._lift(counter)},
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
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(counter, host, ["inc", "peek", "set"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 0 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key set",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "set", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


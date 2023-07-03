# [resource_call_static.w](../../../../../examples/tests/valid/resource_call_static.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $Another }) {
  class $Closure1 {
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Another.myStaticMethod() == 0")})(((await $Another.myStaticMethod()) === 0))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure1;
}

```

## inflight.Another.js
```js
module.exports = function({ $globalCounter }) {
  class Another {
    static async myStaticMethod() {
      return (await $globalCounter.peek());
    }
    constructor({  }) {
    }
  }
  return Another;
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
      "value": "[[\"root/Default/Default/test:access cloud resource through static methods only\",\"${aws_lambda_function.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_90784797.arn}\"]]"
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
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRole",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_2AD210AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRolePolicy",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_2AD210AF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B013CEF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B013CEF2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD.name}"
      }
    },
    "aws_lambda_function": {
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_90784797": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/Default",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_90784797"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8de1ef1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8de1ef1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_2C11A1C8.key}",
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
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_2C11A1C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/S3Object",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_2C11A1C8"
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
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("myStaticMethod", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Another.js")({
            $globalCounter: ${context._lift(globalCounter)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("myStaticMethod")) {
          Another._registerBindObject(globalCounter, host, ["peek"]);
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $Another: ${context._lift(Another)},
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
          $Closure1._registerBindObject(Another, host, ["myStaticMethod"]);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        super._registerTypeBind(host, ops);
      }
    }
    const globalCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access cloud resource through static methods only",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource_call_static", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


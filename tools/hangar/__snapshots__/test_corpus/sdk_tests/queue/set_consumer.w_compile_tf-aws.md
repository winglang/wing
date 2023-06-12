# [set_consumer.w](../../../../../../examples/tests/sdk_tests/queue/set_consumer.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(msg)  {
      (await c.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ q, predicate, js }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await q.push("hello"));
      (await q.push("world"));
      let i = 0;
      while ((i < 600)) {
        i = (i + 1);
        if ((await predicate.test())) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: '(await predicate.test())'`)})((await predicate.test()))};
          return;
        }
        (await js.sleep(100));
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await predicate.test())'`)})((await predicate.test()))};
    }
  }
  return $Closure2;
}

```

## inflight.Predicate.js
```js
module.exports = function({  }) {
  class Predicate {
    constructor({ c }) {
      this.c = c;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async test()  {
      const __parent_this = this;
      return ((await this.c.peek()) === 2);
    }
  }
  return Predicate;
}

```

## inflight.TestHelper.js
```js
module.exports = function({  }) {
  class TestHelper {
    constructor({  }) {
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async sleep(milli)  {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
  }
  return TestHelper;
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
      "value": "[[\"root/Default/Default/test:setConsumer\",\"${aws_lambda_function.root_testsetConsumer_Handler_9DEA5F1B.arn}\"]]"
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
      "root_cloudQueueAddConsumercdafee6e_IamRole_6D91903D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-cdafee6e/IamRole",
            "uniqueId": "root_cloudQueueAddConsumercdafee6e_IamRole_6D91903D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testsetConsumer_Handler_IamRole_3CE56838": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setConsumer/Handler/IamRole",
            "uniqueId": "root_testsetConsumer_Handler_IamRole_3CE56838"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudQueueAddConsumercdafee6e_IamRolePolicy_A7BC9724": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudQueueAddConsumercdafee6e_IamRolePolicy_A7BC9724"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueAddConsumercdafee6e_IamRole_6D91903D.name}"
      },
      "root_testsetConsumer_Handler_IamRolePolicy_5A703D9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setConsumer/Handler/IamRolePolicy",
            "uniqueId": "root_testsetConsumer_Handler_IamRolePolicy_5A703D9B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testsetConsumer_Handler_IamRole_3CE56838.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudQueueAddConsumercdafee6e_IamRolePolicyAttachment_38911BA9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueAddConsumercdafee6e_IamRolePolicyAttachment_38911BA9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueAddConsumercdafee6e_IamRole_6D91903D.name}"
      },
      "root_testsetConsumer_Handler_IamRolePolicyAttachment_39855622": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setConsumer/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsetConsumer_Handler_IamRolePolicyAttachment_39855622"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsetConsumer_Handler_IamRole_3CE56838.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "root_cloudQueue_EventSourceMapping_A2041279": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "root_cloudQueue_EventSourceMapping_A2041279"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}",
        "function_name": "${aws_lambda_function.root_cloudQueueAddConsumercdafee6e_B733E4E4.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudQueueAddConsumercdafee6e_B733E4E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-cdafee6e/Default",
            "uniqueId": "root_cloudQueueAddConsumercdafee6e_B733E4E4"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-cdafee6e-c89d2d3b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-cdafee6e-c89d2d3b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueAddConsumercdafee6e_IamRole_6D91903D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueAddConsumercdafee6e_S3Object_D1EC942E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testsetConsumer_Handler_9DEA5F1B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setConsumer/Handler/Default",
            "uniqueId": "root_testsetConsumer_Handler_9DEA5F1B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.root_cloudQueue_E3597F7A.url}",
            "WING_FUNCTION_NAME": "Handler-c88cb529",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88cb529",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsetConsumer_Handler_IamRole_3CE56838.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsetConsumer_Handler_S3Object_F9BE34D9.key}",
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
      "root_cloudQueueAddConsumercdafee6e_S3Object_D1EC942E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-cdafee6e/S3Object",
            "uniqueId": "root_cloudQueueAddConsumercdafee6e_S3Object_D1EC942E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testsetConsumer_Handler_S3Object_F9BE34D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setConsumer/Handler/S3Object",
            "uniqueId": "root_testsetConsumer_Handler_S3Object_F9BE34D9"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "root_cloudQueue_E3597F7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "root_cloudQueue_E3597F7A"
          }
        },
        "name": "cloud-Queue-c86e03d8"
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
    class Predicate extends $stdlib.std.Resource {
      constructor(scope, id, c) {
        super(scope, id);
        this._addInflightOps("test");
        const __parent_this = this;
        this.c = c;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Predicate.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const c_client = this._lift(this.c);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PredicateClient = ${Predicate._toInflightType(this).text};
            const client = new PredicateClient({
              c: ${c_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Predicate._registerBindObject(this.c, host, []);
        }
        if (ops.includes("test")) {
          Predicate._registerBindObject(this.c, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class TestHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.TestHelper.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TestHelperClient = ${TestHelper._toInflightType(this).text};
            const client = new TestHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("sleep")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const c_client = context._lift(c);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c: ${c_client},
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
          $Closure1._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c, host, ["inc"]);
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
        const q_client = context._lift(q);
        const predicate_client = context._lift(predicate);
        const js_client = context._lift(js);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            q: ${q_client},
            predicate: ${predicate_client},
            js: ${js_client},
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
          $Closure2._registerBindObject(js, host, []);
          $Closure2._registerBindObject(predicate, host, []);
          $Closure2._registerBindObject(q, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(js, host, ["sleep"]);
          $Closure2._registerBindObject(predicate, host, ["test"]);
          $Closure2._registerBindObject(q, host, ["push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (q.setConsumer(new $Closure1(this,"$Closure1")));
    const js = new TestHelper(this,"TestHelper");
    const predicate = new Predicate(this,"Predicate",c);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setConsumer",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "set_consumer", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


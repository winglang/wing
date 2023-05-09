# [add_consumer.w](../../../../examples/tests/valid/add_consumer.w) | compile | tf-aws

## clients/Predicate.inflight.js
```js
module.exports = function() {
  class  Predicate {
    constructor({ c }) {
      this.c = c;
    }
    async test()  {
      {
        return ((await this.c.peek()) === 2);
      }
    }
  }
  return Predicate;
}

```

## clients/TestHelper.inflight.js
```js
module.exports = function() {
  class  TestHelper {
    constructor({  }) {
    }
    static async sleep(milli)  {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
    async assert(predicate)  {
      {
        let i = 0;
        while ((i < 600)) {
          i = (i + 1);
          if ((await predicate.test())) {
            {((cond) => {if (!cond) throw new Error(`assertion failed: '(await predicate.test())'`)})((await predicate.test()))};
            return;
          }
          (await TestHelper.sleep(100));
        }
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(await predicate.test())'`)})((await predicate.test()))};
      }
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
      "value": "[[\"root/Default/Default/test:addConsumer\",\"${aws_lambda_function.root_testaddConsumer_A6B7202D.arn}\"]]"
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
      "root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRole",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testaddConsumer_IamRole_5E4F4B33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/IamRole",
            "uniqueId": "root_testaddConsumer_IamRole_5E4F4B33"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudQueueAddConsumere46e5cb7_IamRolePolicy_756548A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRolePolicy_756548A7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
      },
      "root_testaddConsumer_IamRolePolicy_0AE26B87": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/IamRolePolicy",
            "uniqueId": "root_testaddConsumer_IamRolePolicy_0AE26B87"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:PurgeQueue\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testaddConsumer_IamRole_5E4F4B33.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudQueueAddConsumere46e5cb7_IamRolePolicyAttachment_3625F5B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRolePolicyAttachment_3625F5B7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
      },
      "root_testaddConsumer_IamRolePolicyAttachment_5939E6D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/IamRolePolicyAttachment",
            "uniqueId": "root_testaddConsumer_IamRolePolicyAttachment_5939E6D8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaddConsumer_IamRole_5E4F4B33.name}"
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
        "function_name": "${aws_lambda_function.root_cloudQueueAddConsumere46e5cb7_83E71EC8.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudQueueAddConsumere46e5cb7_83E71EC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/Default",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_83E71EC8"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-e46e5cb7-c85740a2"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-e46e5cb7-c85740a2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testaddConsumer_A6B7202D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/Default",
            "uniqueId": "root_testaddConsumer_A6B7202D"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.root_cloudQueue_E3597F7A.url}",
            "WING_FUNCTION_NAME": "test-addConsumer-c803ab73"
          }
        },
        "function_name": "test-addConsumer-c803ab73",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaddConsumer_IamRole_5E4F4B33.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaddConsumer_S3Object_D5AEF67D.key}",
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
      "root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/S3Object",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testaddConsumer_S3Object_D5AEF67D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/S3Object",
            "uniqueId": "root_testaddConsumer_S3Object_D5AEF67D"
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
        this.c = c;
      }
      _toInflight() {
        const c_client = this._lift(this.c);
        const self_client_path = "./clients/Predicate.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Predicate = require("${self_client_path}")({});
            const client = new Predicate({
              c: ${c_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.c, host, []);
        }
        if (ops.includes("test")) {
          this._registerBindObject(this.c, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class TestHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep", "assert");
      }
      _toInflight() {
        const self_client_path = "./clients/TestHelper.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TestHelper = require("${self_client_path}")({});
            const client = new TestHelper({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("assert")) {
        }
        if (ops.includes("sleep")) {
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (q.addConsumer(new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        c: {
          obj: c,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    ));
    const js = new TestHelper(this,"TestHelper");
    const predicate = new Predicate(this,"Predicate",c);
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:addConsumer",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        js: {
          obj: js,
          ops: ["assert","sleep"]
        },
        predicate: {
          obj: predicate,
          ops: ["test"]
        },
        q: {
          obj: q,
          ops: ["approxSize","purge","push"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "add_consumer", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle(msg) {
  const { c } = this;
  (await c.inc());
}

```

## proc2/index.js
```js
async handle() {
  const { js, predicate, q } = this;
  (await q.push("hello"));
  (await q.push("world"));
  (await js.assert(predicate));
}

```


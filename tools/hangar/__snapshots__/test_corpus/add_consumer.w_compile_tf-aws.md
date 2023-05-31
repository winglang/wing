# [add_consumer.w](../../../../examples/tests/valid/add_consumer.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ c }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(msg)  {
      (await c.inc());
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ q, predicate, js }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
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
  return $Inflight2;
}

```

## clients/Predicate.inflight.js
```js
module.exports = function({  }) {
  class Predicate {
    constructor({ c }) {
      this.c = c;
    }
    async test()  {
      const __parent_this = this;
      return ((await this.c.peek()) === 2);
    }
  }
  return Predicate;
}

```

## clients/TestHelper.inflight.js
```js
module.exports = function({  }) {
  class TestHelper {
    constructor({  }) {
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
      "value": "[[\"root/Default/Default/test:addConsumer\",\"${aws_lambda_function.root_testaddConsumer_Handler_3B513ABC.arn}\"]]"
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
      "root_testaddConsumer_Handler_IamRole_8E4E4EFE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/Handler/IamRole",
            "uniqueId": "root_testaddConsumer_Handler_IamRole_8E4E4EFE"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
      },
      "root_testaddConsumer_Handler_IamRolePolicy_9DC09BA2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/Handler/IamRolePolicy",
            "uniqueId": "root_testaddConsumer_Handler_IamRolePolicy_9DC09BA2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testaddConsumer_Handler_IamRole_8E4E4EFE.name}"
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
      "root_testaddConsumer_Handler_IamRolePolicyAttachment_FAA6841D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaddConsumer_Handler_IamRolePolicyAttachment_FAA6841D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaddConsumer_Handler_IamRole_8E4E4EFE.name}"
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
      "root_testaddConsumer_Handler_3B513ABC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/Handler/Default",
            "uniqueId": "root_testaddConsumer_Handler_3B513ABC"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.root_cloudQueue_E3597F7A.url}",
            "WING_FUNCTION_NAME": "Handler-c83b6094"
          }
        },
        "function_name": "Handler-c83b6094",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaddConsumer_Handler_IamRole_8E4E4EFE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaddConsumer_Handler_S3Object_2F78F235.key}",
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
      "root_testaddConsumer_Handler_S3Object_2F78F235": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:addConsumer/Handler/S3Object",
            "uniqueId": "root_testaddConsumer_Handler_S3Object_2F78F235"
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
        const __parent_this = this;
        this.c = c;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Predicate.inflight.js".replace(/\\/g, "/");
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
        const self_client_path = "./clients/TestHelper.inflight.js".replace(/\\/g, "/");
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
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
          $Inflight1._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(c, host, ["inc"]);
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
        const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
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
          $Inflight2._registerBindObject(js, host, []);
          $Inflight2._registerBindObject(predicate, host, []);
          $Inflight2._registerBindObject(q, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(js, host, ["sleep"]);
          $Inflight2._registerBindObject(predicate, host, ["test"]);
          $Inflight2._registerBindObject(q, host, ["push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (q.addConsumer(new $Inflight1(this,"$Inflight1")));
    const js = new TestHelper(this,"TestHelper");
    const predicate = new Predicate(this,"Predicate",c);
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:addConsumer",new $Inflight2(this,"$Inflight2"));
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


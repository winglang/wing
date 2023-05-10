# [on_message.w](../../../../examples/tests/valid/on_message.w) | compile | tf-aws

## clients/Predicate.inflight.js
```js
module.exports = function({  }) {
  class  Predicate {
    constructor({ c }) {
      this.c = c;
    }
    async test()  {
      {
        return ((await this.c.peek()) === 10);
      }
    }
  }
  return Predicate;
}

```

## clients/TestHelper.inflight.js
```js
module.exports = function({  }) {
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
      "value": "[[\"root/Default/Default/test\",\"${aws_lambda_function.root_test_AAE85061.arn}\"]]"
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
      "root_cloudTopicOnMessageb3f3d188_IamRole_CA102757": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-b3f3d188/IamRole",
            "uniqueId": "root_cloudTopicOnMessageb3f3d188_IamRole_CA102757"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/IamRole",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_test_IamRole_6CDC2D16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRole",
            "uniqueId": "root_test_IamRole_6CDC2D16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudTopicOnMessageb3f3d188_IamRolePolicy_6E4D31FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-b3f3d188/IamRolePolicy",
            "uniqueId": "root_cloudTopicOnMessageb3f3d188_IamRolePolicy_6E4D31FA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudTopicOnMessageb3f3d188_IamRole_CA102757.name}"
      },
      "root_cloudTopicOnMessagee46e5cb7_IamRolePolicy_597056C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_IamRolePolicy_597056C9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1.name}"
      },
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_cloudTopic_6057BD0C.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudTopicOnMessageb3f3d188_IamRolePolicyAttachment_B8874A7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-b3f3d188/IamRolePolicyAttachment",
            "uniqueId": "root_cloudTopicOnMessageb3f3d188_IamRolePolicyAttachment_B8874A7A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudTopicOnMessageb3f3d188_IamRole_CA102757.name}"
      },
      "root_cloudTopicOnMessagee46e5cb7_IamRolePolicyAttachment_9B4616FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_IamRolePolicyAttachment_9B4616FE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1.name}"
      },
      "root_test_IamRolePolicyAttachment_1102A28A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicyAttachment",
            "uniqueId": "root_test_IamRolePolicyAttachment_1102A28A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudTopicOnMessageb3f3d188_F44FFAD4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-b3f3d188/Default",
            "uniqueId": "root_cloudTopicOnMessageb3f3d188_F44FFAD4"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-b3f3d188-c8719dfc"
          }
        },
        "function_name": "cloud-Topic-OnMessage-b3f3d188-c8719dfc",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudTopicOnMessageb3f3d188_IamRole_CA102757.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudTopicOnMessageb3f3d188_S3Object_5D1E3D33.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudTopicOnMessagee46e5cb7_05516E5B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/Default",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_05516E5B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-e46e5cb7-c8313663"
          }
        },
        "function_name": "cloud-Topic-OnMessage-e46e5cb7-c8313663",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudTopicOnMessagee46e5cb7_S3Object_330DFBE0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_test_AAE85061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/Default",
            "uniqueId": "root_test_AAE85061"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "TOPIC_ARN_f61df91b": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudTopicOnMessageb3f3d188_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_FBCCA465": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-b3f3d188/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "root_cloudTopicOnMessageb3f3d188_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_FBCCA465"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudTopicOnMessageb3f3d188_F44FFAD4.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
      },
      "root_cloudTopicOnMessagee46e5cb7_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_BDB6940A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_BDB6940A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudTopicOnMessagee46e5cb7_05516E5B.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
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
      "root_cloudTopicOnMessageb3f3d188_S3Object_5D1E3D33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-b3f3d188/S3Object",
            "uniqueId": "root_cloudTopicOnMessageb3f3d188_S3Object_5D1E3D33"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudTopicOnMessagee46e5cb7_S3Object_330DFBE0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/S3Object",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_S3Object_330DFBE0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_test_S3Object_A16CD789": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/S3Object",
            "uniqueId": "root_test_S3Object_A16CD789"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_cloudTopic_6057BD0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/Default",
            "uniqueId": "root_cloudTopic_6057BD0C"
          }
        },
        "name": "cloud-Topic-c82b57aa"
      }
    },
    "aws_sns_topic_subscription": {
      "root_cloudTopic_cloudTopicTopicSubscriptionb3f3d188_45BCCDC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-b3f3d188",
            "uniqueId": "root_cloudTopic_cloudTopicTopicSubscriptionb3f3d188_45BCCDC7"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudTopicOnMessageb3f3d188_F44FFAD4.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
      },
      "root_cloudTopic_cloudTopicTopicSubscriptione46e5cb7_A6169835": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-e46e5cb7",
            "uniqueId": "root_cloudTopic_cloudTopicTopicSubscriptione46e5cb7_A6169835"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudTopicOnMessagee46e5cb7_05516E5B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
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
        if (ops.includes("assert")) {
        }
        if (ops.includes("sleep")) {
        }
        super._registerBind(host, ops);
      }
    }
    const t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (t.onMessage(new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        c: {
          obj: c,
          ops: ["dec","inc","peek","reset"]
        },
      }
    })
    ));
    (t.onMessage(new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
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
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
      bindings: {
        js: {
          obj: js,
          ops: ["assert","sleep"]
        },
        predicate: {
          obj: predicate,
          ops: ["test"]
        },
        t: {
          obj: t,
          ops: ["publish"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "on_message", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle() {
  const { c } = this;
  (await c.inc());
}

```

## proc2/index.js
```js
async handle() {
  const { c } = this;
  (await c.inc());
}

```

## proc3/index.js
```js
async handle() {
  const { js, predicate, t } = this;
  for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,5,false)) {
    (await t.publish("msg"));
  }
  (await js.assert(predicate));
}

```


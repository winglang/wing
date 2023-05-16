# [publish.w](../../../../examples/tests/valid/publish.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:publish\",\"${aws_lambda_function.root_testpublish_C89E8C67.arn}\"]]"
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
      "root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-e46e5cb7/IamRole",
            "uniqueId": "root_cloudTopicOnMessagee46e5cb7_IamRole_8BCE5BC1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testpublish_IamRole_F7BEAA1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publish/IamRole",
            "uniqueId": "root_testpublish_IamRole_F7BEAA1E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
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
      "root_testpublish_IamRolePolicy_5CAF1BED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publish/IamRolePolicy",
            "uniqueId": "root_testpublish_IamRolePolicy_5CAF1BED"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_cloudTopic_6057BD0C.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testpublish_IamRole_F7BEAA1E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
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
      "root_testpublish_IamRolePolicyAttachment_50C49E1B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publish/IamRolePolicyAttachment",
            "uniqueId": "root_testpublish_IamRolePolicyAttachment_50C49E1B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpublish_IamRole_F7BEAA1E.name}"
      }
    },
    "aws_lambda_function": {
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
      "root_testpublish_C89E8C67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publish/Default",
            "uniqueId": "root_testpublish_C89E8C67"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "TOPIC_ARN_f61df91b": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}",
            "WING_FUNCTION_NAME": "test-publish-c8011bd3"
          }
        },
        "function_name": "test-publish-c8011bd3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testpublish_IamRole_F7BEAA1E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpublish_S3Object_7D59F377.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
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
      "root_testpublish_S3Object_7D59F377": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:publish/S3Object",
            "uniqueId": "root_testpublish_S3Object_7D59F377"
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
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:publish",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        c: {
          obj: c,
          ops: ["dec","inc","peek","reset"]
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
    super({ outdir: $outdir, name: "publish", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(e) {
  const { c } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(e === "1")'`)})((e === "1"))};
  (await c.inc());
}

```

## proc2/index.js
```js
async handle() {
  const { c, t } = this;
  (await t.publish("1"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await c.peek()) === 1)'`)})(((await c.peek()) === 1))};
}

```


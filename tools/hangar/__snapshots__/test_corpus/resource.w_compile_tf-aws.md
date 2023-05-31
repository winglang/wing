# [resource.w](../../../../examples/tests/valid/resource.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ res, bucket }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      const s = (await res.myMethod());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "counter is: 101")'`)})((s === "counter is: 101"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await bucket.list()).length === 1)'`)})(((await bucket.list()).length === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(res.foo.inflightField === 123)'`)})((res.foo.inflightField === 123))};
      (await res.testTypeAccess());
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ __parent_this }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      (await __parent_this.b.put("foo1.txt","bar"));
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({ __parent_this }) {
  class $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      (await __parent_this.b.put("foo2.txt","bar"));
    }
  }
  return $Inflight3;
}

```

## clients/$Inflight4.inflight.js
```js
module.exports = function({ __parent_this }) {
  class $Inflight4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      (await __parent_this.q.push("foo"));
    }
  }
  return $Inflight4;
}

```

## clients/$Inflight5.inflight.js
```js
module.exports = function({ bigOlPublisher }) {
  class $Inflight5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      (await bigOlPublisher.publish("foo"));
      const count = (await bigOlPublisher.getObjectCount());
    }
  }
  return $Inflight5;
}

```

## clients/Bar.inflight.js
```js
module.exports = function({ Foo, MyEnum }) {
  class Bar {
    constructor({ b, e, foo, name }) {
      this.b = b;
      this.e = e;
      this.foo = foo;
      this.name = name;
    }
    static async barStatic()  {
      return "bar static";
    }
    async myMethod()  {
      const __parent_this = this;
      (await this.foo.fooInc());
      const s = (await Foo.fooStatic());
      (await this.b.put("foo",`counter is: ${(await this.foo.fooGet())}`));
      return (await this.b.get("foo"));
    }
    async testTypeAccess()  {
      const __parent_this = this;
      if (true) {
        const __parent_this = this;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Bar.barStatic()) === "bar static")'`)})(((await Bar.barStatic()) === "bar static"))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Foo.fooStatic()) === "foo static")'`)})(((await Foo.fooStatic()) === "foo static"))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.e === MyEnum.B)'`)})((this.e === MyEnum.B))};
      }
    }
  }
  return Bar;
}

```

## clients/BigPublisher.inflight.js
```js
module.exports = function({  }) {
  class BigPublisher {
    constructor({ b, b2, q, t }) {
      this.b = b;
      this.b2 = b2;
      this.q = q;
      this.t = t;
    }
    async publish(s)  {
      const __parent_this = this;
      (await this.t.publish(s));
      (await this.q.push(s));
      (await this.b2.put("foo",s));
    }
    async getObjectCount()  {
      const __parent_this = this;
      return (await this.b.list()).length;
    }
  }
  return BigPublisher;
}

```

## clients/Foo.inflight.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ c }) {
      this.c = c;
    }
    async $inflight_init()  {
      const __parent_this = this;
      this.inflightField = 123;
      (await this.c.inc(110));
      (await this.c.dec(10));
    }
    async fooInc()  {
      const __parent_this = this;
      (await this.c.inc());
    }
    async fooGet()  {
      const __parent_this = this;
      return (await this.c.peek());
    }
    static async fooStatic()  {
      return "foo static";
    }
  }
  return Foo;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.root_testtest_Handler_046C3415.arn}\"],[\"root/Default/Default/test:dependency cycles\",\"${aws_lambda_function.root_testdependencycycles_Handler_C1F83FAB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_Bar_Foo_cloudCounter_616CF239": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bar/Foo/cloud.Counter/Default",
            "uniqueId": "root_Bar_Foo_cloudCounter_616CF239"
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
        "name": "wing-counter-cloud.Counter-c8ef80ad"
      }
    },
    "aws_iam_role": {
      "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRole_1DE51FA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-d05c64b5/IamRole",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRole_1DE51FA5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_BigPublisher_cloudQueueAddConsumerfe215853_IamRole_F9917903": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-fe215853/IamRole",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerfe215853_IamRole_F9917903"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_BigPublisher_cloudTopicOnMessagec351460f_IamRole_9428F8F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-c351460f/IamRole",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagec351460f_IamRole_9428F8F8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testdependencycycles_Handler_IamRole_74890367": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRole",
            "uniqueId": "root_testdependencycycles_Handler_IamRole_74890367"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testtest_Handler_IamRole_6C1728D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "root_testtest_Handler_IamRole_6C1728D1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRolePolicy_C1D44E2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-d05c64b5/IamRolePolicy",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRolePolicy_C1D44E2C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRole_1DE51FA5.name}"
      },
      "root_BigPublisher_cloudQueueAddConsumerfe215853_IamRolePolicy_99D0112F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-fe215853/IamRolePolicy",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerfe215853_IamRolePolicy_99D0112F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueAddConsumerfe215853_IamRole_F9917903.name}"
      },
      "root_BigPublisher_cloudTopicOnMessagec351460f_IamRolePolicy_50D645F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-c351460f/IamRolePolicy",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagec351460f_IamRolePolicy_50D645F4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessagec351460f_IamRole_9428F8F8.name}"
      },
      "root_testdependencycycles_Handler_IamRolePolicy_380CBE3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRolePolicy",
            "uniqueId": "root_testdependencycycles_Handler_IamRolePolicy_380CBE3B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testdependencycycles_Handler_IamRole_74890367.name}"
      },
      "root_testtest_Handler_IamRolePolicy_65A1D8BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "root_testtest_Handler_IamRolePolicy_65A1D8BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRolePolicyAttachment_31A7F581": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-d05c64b5/IamRolePolicyAttachment",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRolePolicyAttachment_31A7F581"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRole_1DE51FA5.name}"
      },
      "root_BigPublisher_cloudQueueAddConsumerfe215853_IamRolePolicyAttachment_98CD6FE7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-fe215853/IamRolePolicyAttachment",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerfe215853_IamRolePolicyAttachment_98CD6FE7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueAddConsumerfe215853_IamRole_F9917903.name}"
      },
      "root_BigPublisher_cloudTopicOnMessagec351460f_IamRolePolicyAttachment_2A63A7A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-c351460f/IamRolePolicyAttachment",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagec351460f_IamRolePolicyAttachment_2A63A7A9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessagec351460f_IamRole_9428F8F8.name}"
      },
      "root_testdependencycycles_Handler_IamRolePolicyAttachment_44606D07": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testdependencycycles_Handler_IamRolePolicyAttachment_44606D07"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdependencycycles_Handler_IamRole_74890367.name}"
      },
      "root_testtest_Handler_IamRolePolicyAttachment_3716AC26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtest_Handler_IamRolePolicyAttachment_3716AC26"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "root_BigPublisher_cloudQueue_EventSourceMapping_1D8A8B84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue/EventSourceMapping",
            "uniqueId": "root_BigPublisher_cloudQueue_EventSourceMapping_1D8A8B84"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}",
        "function_name": "${aws_lambda_function.root_BigPublisher_cloudQueueAddConsumerfe215853_FBF145F6.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_53A8D2D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-d05c64b5/Default",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_53A8D2D3"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
            "WING_FUNCTION_NAME": "b2-on_create-OnMessage-d05c64b5-c85f4411"
          }
        },
        "function_name": "b2-on_create-OnMessage-d05c64b5-c85f4411",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_IamRole_1DE51FA5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_S3Object_7CA981B7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_BigPublisher_cloudQueueAddConsumerfe215853_FBF145F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-fe215853/Default",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerfe215853_FBF145F6"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-fe215853-c89a66f3"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-fe215853-c89a66f3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueAddConsumerfe215853_IamRole_F9917903.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_BigPublisher_cloudQueueAddConsumerfe215853_S3Object_562CA4E9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_BigPublisher_cloudTopicOnMessagec351460f_A2F4E9D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-c351460f/Default",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagec351460f_A2F4E9D0"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-c351460f-c82610b4"
          }
        },
        "function_name": "cloud-Topic-OnMessage-c351460f-c82610b4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessagec351460f_IamRole_9428F8F8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_BigPublisher_cloudTopicOnMessagec351460f_S3Object_740D6172.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testdependencycycles_Handler_C1F83FAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/Default",
            "uniqueId": "root_testdependencycycles_Handler_C1F83FAB"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
            "WING_FUNCTION_NAME": "Handler-c893ad83"
          }
        },
        "function_name": "Handler-c893ad83",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testdependencycycles_Handler_IamRole_74890367.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdependencycycles_Handler_S3Object_DAB1138F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testtest_Handler_046C3415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "root_testtest_Handler_046C3415"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_c7446906": "${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.name}",
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtest_Handler_S3Object_71CD07AC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_InvokePermissionc8c6cd46b3f874f3b457086bc49850e7b4b9316bc8_653F30BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-d05c64b5/InvokePermission-c8c6cd46b3f874f3b457086bc49850e7b4b9316bc8",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_InvokePermissionc8c6cd46b3f874f3b457086bc49850e7b4b9316bc8_653F30BC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_53A8D2D3.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}"
      },
      "root_BigPublisher_cloudTopicOnMessagec351460f_InvokePermissionc86b6469dec0edbe23d2827b4ea7006182eb0072ec_AA02223D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-c351460f/InvokePermission-c86b6469dec0edbe23d2827b4ea7006182eb0072ec",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagec351460f_InvokePermissionc86b6469dec0edbe23d2827b4ea7006182eb0072ec_AA02223D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_BigPublisher_cloudTopicOnMessagec351460f_A2F4E9D0.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}"
      }
    },
    "aws_s3_bucket": {
      "root_BigPublisher_b2_48CEFEE6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/Default",
            "uniqueId": "root_BigPublisher_b2_48CEFEE6"
          }
        },
        "bucket_prefix": "b2-c851683a-",
        "force_destroy": false
      },
      "root_BigPublisher_cloudBucket_7AC8CA7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Bucket/Default",
            "uniqueId": "root_BigPublisher_cloudBucket_7AC8CA7E"
          }
        },
        "bucket_prefix": "cloud-bucket-c82f13dc-",
        "force_destroy": false
      },
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "root_BigPublisher_b2_S3BucketNotification_70B757E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/S3BucketNotification",
            "uniqueId": "root_BigPublisher_b2_S3BucketNotification_70B757E2"
          }
        },
        "bucket": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.id}",
        "depends_on": [
          "aws_sns_topic_policy.root_BigPublisher_b2_b2oncreate_PublishPermissionc851683a81379a8ef8351c83fe31924055584271ad_88D6EEA4"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_BigPublisher_b2_PublicAccessBlock_6BF4CFE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/PublicAccessBlock",
            "uniqueId": "root_BigPublisher_b2_PublicAccessBlock_6BF4CFE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_BigPublisher_cloudBucket_PublicAccessBlock_DFC958BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_BigPublisher_cloudBucket_PublicAccessBlock_DFC958BB"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_BigPublisher_b2_Encryption_C0DF1F96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/Encryption",
            "uniqueId": "root_BigPublisher_b2_Encryption_C0DF1F96"
          }
        },
        "bucket": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_BigPublisher_cloudBucket_Encryption_40A40349": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Bucket/Encryption",
            "uniqueId": "root_BigPublisher_cloudBucket_Encryption_40A40349"
          }
        },
        "bucket": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_S3Object_7CA981B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-d05c64b5/S3Object",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_S3Object_7CA981B7"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_BigPublisher_cloudQueueAddConsumerfe215853_S3Object_562CA4E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-fe215853/S3Object",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerfe215853_S3Object_562CA4E9"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_BigPublisher_cloudTopicOnMessagec351460f_S3Object_740D6172": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-c351460f/S3Object",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagec351460f_S3Object_740D6172"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testdependencycycles_Handler_S3Object_DAB1138F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/S3Object",
            "uniqueId": "root_testdependencycycles_Handler_S3Object_DAB1138F"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testtest_Handler_S3Object_71CD07AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "root_testtest_Handler_S3Object_71CD07AC"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_BigPublisher_b2_b2oncreate_DFA80519": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/Default",
            "uniqueId": "root_BigPublisher_b2_b2oncreate_DFA80519"
          }
        },
        "name": "b2-on_create-c8c6cd46"
      },
      "root_BigPublisher_cloudTopic_B7FD0C9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic/Default",
            "uniqueId": "root_BigPublisher_cloudTopic_B7FD0C9E"
          }
        },
        "name": "cloud-Topic-c86b6469"
      }
    },
    "aws_sns_topic_policy": {
      "root_BigPublisher_b2_b2oncreate_PublishPermissionc851683a81379a8ef8351c83fe31924055584271ad_88D6EEA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad",
            "uniqueId": "root_BigPublisher_b2_b2oncreate_PublishPermissionc851683a81379a8ef8351c83fe31924055584271ad_88D6EEA4"
          }
        },
        "arn": "${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "root_BigPublisher_b2_b2oncreate_b2oncreateTopicSubscriptiond05c64b5_00EEC958": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/b2-on_create-TopicSubscription-d05c64b5",
            "uniqueId": "root_BigPublisher_b2_b2oncreate_b2oncreateTopicSubscriptiond05c64b5_00EEC958"
          }
        },
        "endpoint": "${aws_lambda_function.root_BigPublisher_b2_b2oncreateOnMessaged05c64b5_53A8D2D3.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}"
      },
      "root_BigPublisher_cloudTopic_cloudTopicTopicSubscriptionc351460f_E1B9B50D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic/cloud.Topic-TopicSubscription-c351460f",
            "uniqueId": "root_BigPublisher_cloudTopic_cloudTopicTopicSubscriptionc351460f_E1B9B50D"
          }
        },
        "endpoint": "${aws_lambda_function.root_BigPublisher_cloudTopicOnMessagec351460f_A2F4E9D0.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}"
      }
    },
    "aws_sqs_queue": {
      "root_BigPublisher_cloudQueue_0E439190": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue/Default",
            "uniqueId": "root_BigPublisher_cloudQueue_0E439190"
          }
        },
        "name": "cloud-Queue-c890dd9f"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("fooInc", "fooGet", "fooStatic", "inflightField");
        const __parent_this = this;
        this.c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const c_client = this._lift(this.c);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              c: ${c_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(this.c, host, ["dec", "inc"]);
        }
        if (ops.includes("fooGet")) {
          Foo._registerBindObject(this.c, host, ["peek"]);
        }
        if (ops.includes("fooInc")) {
          Foo._registerBindObject(this.c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("fooStatic")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, name, b, e) {
        super(scope, id);
        this._addInflightOps("barStatic", "myMethod", "testTypeAccess");
        const __parent_this = this;
        this.name = name;
        this.b = b;
        this.foo = new Foo(this,"Foo");
        this.e = e;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Bar.inflight.js".replace(/\\/g, "/");
        const FooClient = Foo._toInflightType(context);
        const MyEnumClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["A"] = 0] = "A";
            tmp[tmp["B"] = 1] = "B";
            tmp[tmp["C"] = 2] = "C";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Foo: ${FooClient.text},
            MyEnum: ${MyEnumClient.text},
          })
        `);
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        const e_client = this._lift(this.e);
        const foo_client = this._lift(this.foo);
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this).text};
            const client = new BarClient({
              b: ${b_client},
              e: ${e_client},
              foo: ${foo_client},
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Bar._registerBindObject(this.b, host, []);
          Bar._registerBindObject(this.e, host, []);
          Bar._registerBindObject(this.foo, host, []);
          Bar._registerBindObject(this.name, host, []);
        }
        if (ops.includes("myMethod")) {
          Bar._registerBindObject(Foo, host, ["fooStatic"]);
          Bar._registerBindObject(this.b, host, ["get", "put"]);
          Bar._registerBindObject(this.foo, host, ["fooGet", "fooInc"]);
        }
        if (ops.includes("testTypeAccess")) {
          Bar._registerBindObject(Bar, host, ["barStatic"]);
          Bar._registerBindObject(Foo, host, ["fooStatic"]);
          Bar._registerBindObject(this.e, host, []);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("barStatic")) {
        }
        super._registerTypeBind(host, ops);
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
        const res_client = context._lift(res);
        const bucket_client = context._lift(bucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            res: ${res_client},
            bucket: ${bucket_client},
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
          $Inflight1._registerBindObject(bucket, host, []);
          $Inflight1._registerBindObject(res, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(bucket, host, ["list"]);
          $Inflight1._registerBindObject(res, host, ["myMethod", "testTypeAccess"]);
          $Inflight1._registerBindObject(res.foo, host, ["inflightField"]);
        }
        super._registerBind(host, ops);
      }
    }
    class BigPublisher extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("publish", "getObjectCount");
        const __parent_this = this;
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.b2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2");
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        class $Inflight2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
            const __parent_this_client = context._lift(__parent_this);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this: ${__parent_this_client},
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
              $Inflight2._registerBindObject(__parent_this, host, []);
            }
            if (ops.includes("handle")) {
              $Inflight2._registerBindObject(__parent_this.b, host, ["put"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.t.onMessage(new $Inflight2(this,"$Inflight2")));
        class $Inflight3 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "./clients/$Inflight3.inflight.js".replace(/\\/g, "/");
            const __parent_this_client = context._lift(__parent_this);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this: ${__parent_this_client},
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
              $Inflight3._registerBindObject(__parent_this, host, []);
            }
            if (ops.includes("handle")) {
              $Inflight3._registerBindObject(__parent_this.b, host, ["put"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.q.addConsumer(new $Inflight3(this,"$Inflight3")));
        class $Inflight4 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "./clients/$Inflight4.inflight.js".replace(/\\/g, "/");
            const __parent_this_client = context._lift(__parent_this);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this: ${__parent_this_client},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight4Client = ${$Inflight4._toInflightType(this).text};
                const client = new $Inflight4Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
              $Inflight4._registerBindObject(__parent_this, host, []);
            }
            if (ops.includes("handle")) {
              $Inflight4._registerBindObject(__parent_this.q, host, ["push"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.b2.onCreate(new $Inflight4(this,"$Inflight4")));
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/BigPublisher.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        const b2_client = this._lift(this.b2);
        const q_client = this._lift(this.q);
        const t_client = this._lift(this.t);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BigPublisherClient = ${BigPublisher._toInflightType(this).text};
            const client = new BigPublisherClient({
              b: ${b_client},
              b2: ${b2_client},
              q: ${q_client},
              t: ${t_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          BigPublisher._registerBindObject(this.b, host, []);
          BigPublisher._registerBindObject(this.b2, host, []);
          BigPublisher._registerBindObject(this.q, host, []);
          BigPublisher._registerBindObject(this.t, host, []);
        }
        if (ops.includes("getObjectCount")) {
          BigPublisher._registerBindObject(this.b, host, ["list"]);
        }
        if (ops.includes("publish")) {
          BigPublisher._registerBindObject(this.b2, host, ["put"]);
          BigPublisher._registerBindObject(this.q, host, ["push"]);
          BigPublisher._registerBindObject(this.t, host, ["publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight5.inflight.js".replace(/\\/g, "/");
        const bigOlPublisher_client = context._lift(bigOlPublisher);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            bigOlPublisher: ${bigOlPublisher_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight5Client = ${$Inflight5._toInflightType(this).text};
            const client = new $Inflight5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight5._registerBindObject(bigOlPublisher, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight5._registerBindObject(bigOlPublisher, host, ["getObjectCount", "publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    const MyEnum = 
      Object.freeze((function (tmp) {
        tmp[tmp["A"] = 0] = "A";
        tmp[tmp["B"] = 1] = "B";
        tmp[tmp["C"] = 2] = "C";
        return tmp;
      })({}))
    ;
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const res = new Bar(this,"Bar","Arr",bucket,MyEnum.B);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Inflight1(this,"$Inflight1"));
    const bigOlPublisher = new BigPublisher(this,"BigPublisher");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:dependency cycles",new $Inflight5(this,"$Inflight5"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


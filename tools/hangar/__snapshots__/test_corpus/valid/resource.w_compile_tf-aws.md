# [resource.w](../../../../../examples/tests/valid/resource.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ res, bucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const s = (await res.myMethod());
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"counter is: 101\"")})((s === "counter is: 101"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bucket.list().length == 1")})(((await bucket.list()).length === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: res.foo.inflightField == 123")})((res.foo.inflightField === 123))};
      (await res.testTypeAccess());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ __parent_this_2 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await __parent_this_2.b.put("foo1.txt","bar"));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ __parent_this_3 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await __parent_this_3.b.put("foo2.txt","bar"));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ __parent_this_4 }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await __parent_this_4.q.push("foo"));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({ bigOlPublisher }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await bigOlPublisher.publish("foo"));
      const count = (await bigOlPublisher.getObjectCount());
    }
  }
  return $Closure5;
}

```

## inflight.Bar.js
```js
module.exports = function({ Foo, MyEnum }) {
  class Bar {
    constructor({ b, e, foo, name }) {
      this.b = b;
      this.e = e;
      this.foo = foo;
      this.name = name;
    }
    async $inflight_init()  {
    }
    static async barStatic()  {
      return "bar static";
    }
    async myMethod()  {
      (await this.foo.fooInc());
      const s = (await Foo.fooStatic());
      (await this.b.put("foo",String.raw({ raw: ["counter is: ", ""] }, (await this.foo.fooGet()))));
      return (await this.b.get("foo"));
    }
    async testTypeAccess()  {
      if (true) {
        {((cond) => {if (!cond) throw new Error("assertion failed: Bar.barStatic() == \"bar static\"")})(((await Bar.barStatic()) === "bar static"))};
        {((cond) => {if (!cond) throw new Error("assertion failed: Foo.fooStatic() == \"foo static\"")})(((await Foo.fooStatic()) === "foo static"))};
        {((cond) => {if (!cond) throw new Error("assertion failed: this.e == MyEnum.B")})((this.e === MyEnum.B))};
      }
    }
  }
  return Bar;
}

```

## inflight.BigPublisher.js
```js
module.exports = function({  }) {
  class BigPublisher {
    constructor({ b, b2, q, t }) {
      this.b = b;
      this.b2 = b2;
      this.q = q;
      this.t = t;
    }
    async $inflight_init()  {
    }
    async publish(s)  {
      (await this.t.publish(s));
      (await this.q.push(s));
      (await this.b2.put("foo",s));
    }
    async getObjectCount()  {
      return (await this.b.list()).length;
    }
  }
  return BigPublisher;
}

```

## inflight.Dummy.js
```js
module.exports = function({  }) {
  class Dummy {
    constructor({  }) {
    }
    async $inflight_init()  {
    }
  }
  return Dummy;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ c }) {
      this.c = c;
    }
    async $inflight_init()  {
      this.inflightField = 123;
      (await this.c.inc(110));
      (await this.c.dec(10));
    }
    async fooInc()  {
      (await this.c.inc());
    }
    async fooGet()  {
      return (await this.c.peek());
    }
    static async fooStatic()  {
      return "foo static";
    }
  }
  return Foo;
}

```

## inflight.ScopeAndIdTestClass.js
```js
module.exports = function({  }) {
  class ScopeAndIdTestClass {
    constructor({  }) {
    }
    async $inflight_init()  {
    }
  }
  return ScopeAndIdTestClass;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.testtest_Handler_295107CC.arn}\"],[\"root/Default/Default/test:dependency cycles\",\"${aws_lambda_function.testdependencycycles_Handler_2DD0D3F7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "Bar_Foo_cloudCounter_DF879883": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bar/Foo/cloud.Counter/Default",
            "uniqueId": "Bar_Foo_cloudCounter_DF879883"
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
      "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRole_ADCAC8AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a6a70fca/IamRole",
            "uniqueId": "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRole_ADCAC8AB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRole_7FC6BA51": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-SetConsumer-c50bc9ef/IamRole",
            "uniqueId": "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRole_7FC6BA51"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_IamRole_1067F50A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/IamRole",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_IamRole_1067F50A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testdependencycycles_Handler_IamRole_F8C18B08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRole",
            "uniqueId": "testdependencycycles_Handler_IamRole_F8C18B08"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testtest_Handler_IamRole_15693C93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "testtest_Handler_IamRole_15693C93"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRolePolicy_46BA1064": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a6a70fca/IamRolePolicy",
            "uniqueId": "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRolePolicy_46BA1064"
          }
        },
<<<<<<< HEAD
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessagea6a70fca_IamRole_D1453FEC.name}"
=======
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRole_ADCAC8AB.name}"
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
      },
      "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRolePolicy_6AF2C97F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-SetConsumer-c50bc9ef/IamRolePolicy",
            "uniqueId": "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRolePolicy_6AF2C97F"
          }
        },
<<<<<<< HEAD
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueSetConsumerc50bc9ef_IamRole_E639C724.name}"
=======
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}\",\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRole_7FC6BA51.name}"
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_IamRolePolicy_51FA866C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/IamRolePolicy",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_IamRolePolicy_51FA866C"
          }
        },
<<<<<<< HEAD
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessage113c9059_IamRole_883C1765.name}"
=======
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}\",\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_cloudTopic-OnMessage-113c9059_IamRole_1067F50A.name}"
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
      },
      "testdependencycycles_Handler_IamRolePolicy_A8D5A9DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRolePolicy",
            "uniqueId": "testdependencycycles_Handler_IamRolePolicy_A8D5A9DF"
          }
        },
<<<<<<< HEAD
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testdependencycycles_Handler_IamRole_74890367.name}"
=======
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}\",\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}\",\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testdependencycycles_Handler_IamRole_F8C18B08.name}"
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
      },
      "testtest_Handler_IamRolePolicy_AF0279BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "testtest_Handler_IamRolePolicy_AF0279BD"
          }
        },
<<<<<<< HEAD
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
=======
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Bar_Foo_cloudCounter_DF879883.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.Bar_Foo_cloudCounter_DF879883.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
      }
    },
    "aws_iam_role_policy_attachment": {
      "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRolePolicyAttachment_03D41CF4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a6a70fca/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRolePolicyAttachment_03D41CF4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRole_ADCAC8AB.name}"
      },
      "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRolePolicyAttachment_FF25AF25": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-SetConsumer-c50bc9ef/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRolePolicyAttachment_FF25AF25"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRole_7FC6BA51.name}"
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_IamRolePolicyAttachment_5DDA8339": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_IamRolePolicyAttachment_5DDA8339"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_cloudTopic-OnMessage-113c9059_IamRole_1067F50A.name}"
      },
      "testdependencycycles_Handler_IamRolePolicyAttachment_2F3D0611": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRolePolicyAttachment",
            "uniqueId": "testdependencycycles_Handler_IamRolePolicyAttachment_2F3D0611"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testdependencycycles_Handler_IamRole_F8C18B08.name}"
      },
      "testtest_Handler_IamRolePolicyAttachment_ADF4752D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest_Handler_IamRolePolicyAttachment_ADF4752D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "BigPublisher_cloudQueue_EventSourceMapping_D1299C34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue/EventSourceMapping",
            "uniqueId": "BigPublisher_cloudQueue_EventSourceMapping_D1299C34"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}",
        "function_name": "${aws_lambda_function.BigPublisher_cloudQueue-SetConsumer-c50bc9ef_67ECF75E.function_name}"
      }
    },
    "aws_lambda_function": {
      "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_923E0E37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a6a70fca/Default",
            "uniqueId": "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_923E0E37"
          }
        },
        "environment": {
          "variables": {
<<<<<<< HEAD
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
=======
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}",
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
            "WING_FUNCTION_NAME": "b2-on_create-OnMessage-a6a70fca-c87e0778",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b2-on_create-OnMessage-a6a70fca-c87e0778",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_IamRole_ADCAC8AB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_S3Object_0C652C61.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_67ECF75E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-SetConsumer-c50bc9ef/Default",
            "uniqueId": "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_67ECF75E"
          }
        },
        "environment": {
          "variables": {
<<<<<<< HEAD
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
=======
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}",
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-c50bc9ef-c889d16f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-c50bc9ef-c889d16f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRole_7FC6BA51.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_cloudQueue-SetConsumer-c50bc9ef_S3Object_D9D9B438.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_12D15502": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/Default",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_12D15502"
          }
        },
        "environment": {
          "variables": {
<<<<<<< HEAD
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
=======
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}",
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-113c9059-c81d1d09",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-113c9059-c81d1d09",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_cloudTopic-OnMessage-113c9059_IamRole_1067F50A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_cloudTopic-OnMessage-113c9059_S3Object_EB632F0F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testdependencycycles_Handler_2DD0D3F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/Default",
            "uniqueId": "testdependencycycles_Handler_2DD0D3F7"
          }
        },
        "environment": {
          "variables": {
<<<<<<< HEAD
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.bucket}",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.bucket}",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}",
=======
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
            "BUCKET_NAME_584271ad_IS_PUBLIC": "false",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
            "BUCKET_NAME_7ef741f5_IS_PUBLIC": "false",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}",
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
            "WING_FUNCTION_NAME": "Handler-c893ad83",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c893ad83",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testdependencycycles_Handler_IamRole_F8C18B08.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testdependencycycles_Handler_S3Object_04D975F4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testtest_Handler_295107CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "testtest_Handler_295107CC"
          }
        },
        "environment": {
          "variables": {
<<<<<<< HEAD
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "DYNAMODB_TABLE_NAME_c7446906": "${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.name}",
=======
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_c7446906": "${aws_dynamodb_table.Bar_Foo_cloudCounter_DF879883.name}",
>>>>>>> parent of 1ead58d5a (chore: revert switch to pnpm (#3222))
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest_Handler_S3Object_9F4E28A7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_InvokePermission-c8c6cd46b3f874f3b457086bc49850e7b4b9316bc8_A3CAB3D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a6a70fca/InvokePermission-c8c6cd46b3f874f3b457086bc49850e7b4b9316bc8",
            "uniqueId": "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_InvokePermission-c8c6cd46b3f874f3b457086bc49850e7b4b9316bc8_A3CAB3D3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_923E0E37.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.BigPublisher_b2_b2-on_create_842E953B.arn}"
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_InvokePermission-c86b6469dec0edbe23d2827b4ea7006182eb0072ec_BE523D68": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/InvokePermission-c86b6469dec0edbe23d2827b4ea7006182eb0072ec",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_InvokePermission-c86b6469dec0edbe23d2827b4ea7006182eb0072ec_BE523D68"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.BigPublisher_cloudTopic-OnMessage-113c9059_12D15502.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}"
      }
    },
    "aws_s3_bucket": {
      "BigPublisher_b2_702AC841": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/Default",
            "uniqueId": "BigPublisher_b2_702AC841"
          }
        },
        "bucket_prefix": "b2-c851683a-",
        "force_destroy": false
      },
      "BigPublisher_cloudBucket_ABF95118": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Bucket/Default",
            "uniqueId": "BigPublisher_cloudBucket_ABF95118"
          }
        },
        "bucket_prefix": "cloud-bucket-c82f13dc-",
        "force_destroy": false
      },
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "BigPublisher_b2_S3BucketNotification_26500622": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/S3BucketNotification",
            "uniqueId": "BigPublisher_b2_S3BucketNotification_26500622"
          }
        },
        "bucket": "${aws_s3_bucket.BigPublisher_b2_702AC841.id}",
        "depends_on": [
          "aws_sns_topic_policy.BigPublisher_b2_b2-on_create_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_BCEFDC74"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.BigPublisher_b2_b2-on_create_842E953B.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "BigPublisher_b2_PublicAccessBlock_AB982F06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/PublicAccessBlock",
            "uniqueId": "BigPublisher_b2_PublicAccessBlock_AB982F06"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "BigPublisher_cloudBucket_PublicAccessBlock_6DB1CA1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "BigPublisher_cloudBucket_PublicAccessBlock_6DB1CA1E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "cloudBucket_PublicAccessBlock_5946CCE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "cloudBucket_PublicAccessBlock_5946CCE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "BigPublisher_b2_Encryption_24266321": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/Encryption",
            "uniqueId": "BigPublisher_b2_Encryption_24266321"
          }
        },
        "bucket": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "BigPublisher_cloudBucket_Encryption_F03B9FDE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Bucket/Encryption",
            "uniqueId": "BigPublisher_cloudBucket_Encryption_F03B9FDE"
          }
        },
        "bucket": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
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
      "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_S3Object_0C652C61": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a6a70fca/S3Object",
            "uniqueId": "BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_S3Object_0C652C61"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_S3Object_D9D9B438": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-SetConsumer-c50bc9ef/S3Object",
            "uniqueId": "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_S3Object_D9D9B438"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_S3Object_EB632F0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/S3Object",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_S3Object_EB632F0F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testdependencycycles_Handler_S3Object_04D975F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/S3Object",
            "uniqueId": "testdependencycycles_Handler_S3Object_04D975F4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testtest_Handler_S3Object_9F4E28A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "testtest_Handler_S3Object_9F4E28A7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "BigPublisher_b2_b2-on_create_842E953B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/Default",
            "uniqueId": "BigPublisher_b2_b2-on_create_842E953B"
          }
        },
        "name": "b2-on_create-c8c6cd46"
      },
      "BigPublisher_cloudTopic_61DC7B63": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic/Default",
            "uniqueId": "BigPublisher_cloudTopic_61DC7B63"
          }
        },
        "name": "cloud-Topic-c86b6469"
      }
    },
    "aws_sns_topic_policy": {
      "BigPublisher_b2_b2-on_create_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_BCEFDC74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad",
            "uniqueId": "BigPublisher_b2_b2-on_create_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_BCEFDC74"
          }
        },
        "arn": "${aws_sns_topic.BigPublisher_b2_b2-on_create_842E953B.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.BigPublisher_b2_b2-on_create_842E953B.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "BigPublisher_b2_b2-on_create_b2-on_create-TopicSubscription-a6a70fca_D0234945": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/b2-on_create-TopicSubscription-a6a70fca",
            "uniqueId": "BigPublisher_b2_b2-on_create_b2-on_create-TopicSubscription-a6a70fca_D0234945"
          }
        },
        "endpoint": "${aws_lambda_function.BigPublisher_b2_b2-on_create-OnMessage-a6a70fca_923E0E37.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.BigPublisher_b2_b2-on_create_842E953B.arn}"
      },
      "BigPublisher_cloudTopic_cloudTopic-TopicSubscription-113c9059_D8CEACCD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic/cloud.Topic-TopicSubscription-113c9059",
            "uniqueId": "BigPublisher_cloudTopic_cloudTopic-TopicSubscription-113c9059_D8CEACCD"
          }
        },
        "endpoint": "${aws_lambda_function.BigPublisher_cloudTopic-OnMessage-113c9059_12D15502.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}"
      }
    },
    "aws_sqs_queue": {
      "BigPublisher_cloudQueue_2EE8871A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue/Default",
            "uniqueId": "BigPublisher_cloudQueue_2EE8871A"
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
        this.c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
        this._addInflightOps("fooInc", "fooGet", "fooStatic", "inflightField");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Foo.js";
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
        this.name = name;
        this.b = b;
        this.foo = new Foo(this,"Foo");
        this.e = e;
        this._addInflightOps("barStatic", "myMethod", "testTypeAccess");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Bar.js";
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
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
          $Closure1._registerBindObject(bucket, host, []);
          $Closure1._registerBindObject(res, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(bucket, host, ["list"]);
          $Closure1._registerBindObject(res, host, ["myMethod", "testTypeAccess"]);
          $Closure1._registerBindObject(res.foo, host, ["inflightField"]);
        }
        super._registerBind(host, ops);
      }
    }
    class BigPublisher extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.b2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2");
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this.display.hidden = true;
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure2.js";
            const __parent_this_2_client = context._lift(__parent_this_2);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this_2: ${__parent_this_2_client},
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
              $Closure2._registerBindObject(__parent_this_2, host, []);
            }
            if (ops.includes("handle")) {
              $Closure2._registerBindObject(__parent_this_2.b, host, ["put"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.t.onMessage(new $Closure2(this,"$Closure2")));
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this.display.hidden = true;
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure3.js";
            const __parent_this_3_client = context._lift(__parent_this_3);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this_3: ${__parent_this_3_client},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Closure3Client = ${$Closure3._toInflightType(this).text};
                const client = new $Closure3Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
              $Closure3._registerBindObject(__parent_this_3, host, []);
            }
            if (ops.includes("handle")) {
              $Closure3._registerBindObject(__parent_this_3.b, host, ["put"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.q.setConsumer(new $Closure3(this,"$Closure3")));
        const __parent_this_4 = this;
        class $Closure4 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this.display.hidden = true;
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure4.js";
            const __parent_this_4_client = context._lift(__parent_this_4);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this_4: ${__parent_this_4_client},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Closure4Client = ${$Closure4._toInflightType(this).text};
                const client = new $Closure4Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
              $Closure4._registerBindObject(__parent_this_4, host, []);
            }
            if (ops.includes("handle")) {
              $Closure4._registerBindObject(__parent_this_4.q, host, ["push"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.b2.onCreate(new $Closure4(this,"$Closure4")));
        this._addInflightOps("publish", "getObjectCount");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.BigPublisher.js";
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
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure5.js";
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
            const $Closure5Client = ${$Closure5._toInflightType(this).text};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure5._registerBindObject(bigOlPublisher, host, []);
        }
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(bigOlPublisher, host, ["getObjectCount", "publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    class Dummy extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Dummy.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const DummyClient = ${Dummy._toInflightType(this).text};
            const client = new DummyClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class ScopeAndIdTestClass extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const d1 = new Dummy(this,"Dummy");
        {((cond) => {if (!cond) throw new Error("assertion failed: d1.node.path.endsWith(\"/ScopeAndIdTestClass/Dummy\")")})(d1.node.path.endsWith("/ScopeAndIdTestClass/Dummy"))};
        const d2 = new Dummy(d1,"Dummy");
        {((cond) => {if (!cond) throw new Error("assertion failed: d2.node.path.endsWith(\"/ScopeAndIdTestClass/Dummy/Dummy\")")})(d2.node.path.endsWith("/ScopeAndIdTestClass/Dummy/Dummy"))};
        for (const i of $stdlib.std.Range.of(0, 3, false)) {
          const x = new Dummy(this,String.raw({ raw: ["tc", ""] }, i));
          const expected_path = String.raw({ raw: ["/ScopeAndIdTestClass/tc", ""] }, i);
          {((cond) => {if (!cond) throw new Error("assertion failed: x.node.path.endsWith(expected_path)")})(x.node.path.endsWith(expected_path))};
        }
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.ScopeAndIdTestClass.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const ScopeAndIdTestClassClient = ${ScopeAndIdTestClass._toInflightType(this).text};
            const client = new ScopeAndIdTestClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
    const bigOlPublisher = new BigPublisher(this,"BigPublisher");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:dependency cycles",new $Closure5(this,"$Closure5"));
    new ScopeAndIdTestClass(this,"ScopeAndIdTestClass");
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


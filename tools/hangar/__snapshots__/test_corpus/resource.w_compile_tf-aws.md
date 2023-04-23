# [resource.w](../../../../examples/tests/valid/resource.w) | compile | tf-aws

## clients/Bar.inflight.js
```js
class  Bar {
  constructor({ b, foo, name, stateful }) {
    this.b = b;
    this.foo = foo;
    this.name = name;
    this.stateful = stateful;
  }
  async my_method()  {
    {
      (await this.foo.foo_inc());
      (await this.b.put("foo",`counter is: ${(await this.foo.foo_get())}`));
      return (await this.b.get("foo"));
    }
  }
}
exports.Bar = Bar;

```

## clients/BigPublisher.inflight.js
```js
class  BigPublisher {
  constructor({ b, b2, q, t, stateful }) {
    this.b = b;
    this.b2 = b2;
    this.q = q;
    this.t = t;
    this.stateful = stateful;
  }
  async publish(s)  {
    {
      (await this.t.publish(s));
      (await this.q.push(s));
      (await this.b2.put("foo",s));
    }
  }
  async getObjectCount()  {
    {
      return (await this.b.list()).length;
    }
  }
}
exports.BigPublisher = BigPublisher;

```

## clients/Foo.inflight.js
```js
class  Foo {
  constructor({ c, stateful }) {
    this.c = c;
    this.stateful = stateful;
  }
  async $inflight_init()  {
    {
      this.inflight_field = 123;
      (await this.c.inc(110));
      (await this.c.dec(10));
    }
  }
  async foo_inc()  {
    {
      (await this.c.inc());
    }
  }
  async foo_get()  {
    {
      return (await this.c.peek());
    }
  }
}
exports.Foo = Foo;

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
      "value": "[[\"root/Default/Default/test\",\"${aws_lambda_function.root_test_AAE85061.arn}\"],[\"root/Default/Default/test: dependency cycles\",\"${aws_lambda_function.root_testdependencycycles_1C5B99E3.arn}\"]]"
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
      "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRole_3DE070D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a754ef69/IamRole",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRole_3DE070D7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_BigPublisher_cloudQueueAddConsumerc351460f_IamRole_74516E60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-c351460f/IamRole",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerc351460f_IamRole_74516E60"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_BigPublisher_cloudTopicOnMessagecb235724_IamRole_E95E92A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-cb235724/IamRole",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagecb235724_IamRole_E95E92A5"
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
      },
      "root_testdependencycycles_IamRole_35624E89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test: dependency cycles/IamRole",
            "uniqueId": "root_testdependencycycles_IamRole_35624E89"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRolePolicy_C652F526": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a754ef69/IamRolePolicy",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRolePolicy_C652F526"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRole_3DE070D7.name}"
      },
      "root_BigPublisher_cloudQueueAddConsumerc351460f_IamRolePolicy_D08CA95F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-c351460f/IamRolePolicy",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerc351460f_IamRolePolicy_D08CA95F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueAddConsumerc351460f_IamRole_74516E60.name}"
      },
      "root_BigPublisher_cloudTopicOnMessagecb235724_IamRolePolicy_D5F2860C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-cb235724/IamRolePolicy",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagecb235724_IamRolePolicy_D5F2860C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessagecb235724_IamRole_E95E92A5.name}"
      },
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      },
      "root_testdependencycycles_IamRolePolicy_43BC84C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test: dependency cycles/IamRolePolicy",
            "uniqueId": "root_testdependencycycles_IamRolePolicy_43BC84C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}\",\"${aws_s3_bucket.root_BigPublisher_cloudBucket_7AC8CA7E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}\",\"${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_BigPublisher_cloudQueue_0E439190.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_BigPublisher_cloudTopic_B7FD0C9E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testdependencycycles_IamRole_35624E89.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRolePolicyAttachment_66424626": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a754ef69/IamRolePolicyAttachment",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRolePolicyAttachment_66424626"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRole_3DE070D7.name}"
      },
      "root_BigPublisher_cloudQueueAddConsumerc351460f_IamRolePolicyAttachment_ABDC1F5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-c351460f/IamRolePolicyAttachment",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerc351460f_IamRolePolicyAttachment_ABDC1F5D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueAddConsumerc351460f_IamRole_74516E60.name}"
      },
      "root_BigPublisher_cloudTopicOnMessagecb235724_IamRolePolicyAttachment_5E9EE0B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-cb235724/IamRolePolicyAttachment",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagecb235724_IamRolePolicyAttachment_5E9EE0B3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessagecb235724_IamRole_E95E92A5.name}"
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
      },
      "root_testdependencycycles_IamRolePolicyAttachment_51136FA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test: dependency cycles/IamRolePolicyAttachment",
            "uniqueId": "root_testdependencycycles_IamRolePolicyAttachment_51136FA4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testdependencycycles_IamRole_35624E89.name}"
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
        "function_name": "${aws_lambda_function.root_BigPublisher_cloudQueueAddConsumerc351460f_1B79B5EB.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_345CF0BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a754ef69/Default",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_345CF0BF"
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
            "WING_FUNCTION_NAME": "b2-on_create-OnMessage-a754ef69-c8c09220"
          }
        },
        "function_name": "b2-on_create-OnMessage-a754ef69-c8c09220",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_BigPublisher_b2_b2oncreateOnMessagea754ef69_IamRole_3DE070D7.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_BigPublisher_b2_b2oncreateOnMessagea754ef69_S3Object_06566844.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_BigPublisher_cloudQueueAddConsumerc351460f_1B79B5EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-c351460f/Default",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerc351460f_1B79B5EB"
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
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-c351460f-c8dcf1d2"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-c351460f-c8dcf1d2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_BigPublisher_cloudQueueAddConsumerc351460f_IamRole_74516E60.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_BigPublisher_cloudQueueAddConsumerc351460f_S3Object_626A0CF8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_BigPublisher_cloudTopicOnMessagecb235724_0B2069A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-cb235724/Default",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagecb235724_0B2069A9"
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
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-cb235724-c8112f05"
          }
        },
        "function_name": "cloud-Topic-OnMessage-cb235724-c8112f05",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_BigPublisher_cloudTopicOnMessagecb235724_IamRole_E95E92A5.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_BigPublisher_cloudTopicOnMessagecb235724_S3Object_100A1F10.key}",
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
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_c7446906": "${aws_dynamodb_table.root_Bar_Foo_cloudCounter_616CF239.name}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testdependencycycles_1C5B99E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test: dependency cycles/Default",
            "uniqueId": "root_testdependencycycles_1C5B99E3"
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
            "WING_FUNCTION_NAME": "test-dependency-cycles-c8c6fae2"
          }
        },
        "function_name": "test-dependency-cycles-c8c6fae2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testdependencycycles_IamRole_35624E89.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testdependencycycles_S3Object_8DA21812.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_InvokePermissionc8c6cd46b3f874f3b457086bc49850e7b4b9316bc8_E07B0123": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a754ef69/InvokePermission-c8c6cd46b3f874f3b457086bc49850e7b4b9316bc8",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_InvokePermissionc8c6cd46b3f874f3b457086bc49850e7b4b9316bc8_E07B0123"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_BigPublisher_b2_b2oncreateOnMessagea754ef69_345CF0BF.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}"
      },
      "root_BigPublisher_cloudTopicOnMessagecb235724_InvokePermissionc86b6469dec0edbe23d2827b4ea7006182eb0072ec_0D43DB48": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-cb235724/InvokePermission-c86b6469dec0edbe23d2827b4ea7006182eb0072ec",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagecb235724_InvokePermissionc86b6469dec0edbe23d2827b4ea7006182eb0072ec_0D43DB48"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_BigPublisher_cloudTopicOnMessagecb235724_0B2069A9.function_name}",
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
      "root_BigPublisher_b2_S3Objectoncreatenotifier_C4BA755A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/S3Object_on_create_notifier",
            "uniqueId": "root_BigPublisher_b2_S3Objectoncreatenotifier_C4BA755A"
          }
        },
        "bucket": "${aws_s3_bucket.root_BigPublisher_b2_48CEFEE6.id}",
        "depends_on": [
          "aws_sns_topic_policy.root_BigPublisher_b2_b2oncreate_PublishPermissionc851683a81379a8ef8351c83fe31924055584271ad_88D6EEA4"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
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
      "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_S3Object_06566844": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create-OnMessage-a754ef69/S3Object",
            "uniqueId": "root_BigPublisher_b2_b2oncreateOnMessagea754ef69_S3Object_06566844"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_BigPublisher_cloudQueueAddConsumerc351460f_S3Object_626A0CF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-AddConsumer-c351460f/S3Object",
            "uniqueId": "root_BigPublisher_cloudQueueAddConsumerc351460f_S3Object_626A0CF8"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_BigPublisher_cloudTopicOnMessagecb235724_S3Object_100A1F10": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-cb235724/S3Object",
            "uniqueId": "root_BigPublisher_cloudTopicOnMessagecb235724_S3Object_100A1F10"
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
      },
      "root_testdependencycycles_S3Object_8DA21812": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test: dependency cycles/S3Object",
            "uniqueId": "root_testdependencycycles_S3Object_8DA21812"
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
      "root_BigPublisher_b2_b2oncreate_b2oncreateTopicSubscriptiona754ef69_88F72FA6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-on_create/b2-on_create-TopicSubscription-a754ef69",
            "uniqueId": "root_BigPublisher_b2_b2oncreate_b2oncreateTopicSubscriptiona754ef69_88F72FA6"
          }
        },
        "endpoint": "${aws_lambda_function.root_BigPublisher_b2_b2oncreateOnMessagea754ef69_345CF0BF.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_BigPublisher_b2_b2oncreate_DFA80519.arn}"
      },
      "root_BigPublisher_cloudTopic_cloudTopicTopicSubscriptioncb235724_7426CD38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic/cloud.Topic-TopicSubscription-cb235724",
            "uniqueId": "root_BigPublisher_cloudTopic_cloudTopicTopicSubscriptioncb235724_7426CD38"
          }
        },
        "endpoint": "${aws_lambda_function.root_BigPublisher_cloudTopicOnMessagecb235724_0B2069A9.arn}",
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
      }
      _toInflight() {
        const c_client = this._lift(this.c);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Foo({
              c: ${c_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Foo._annotateInflight("$inflight_init", {"this.c": { ops: ["dec","inc"] },"this.stateful": { ops: [] }});
    Foo._annotateInflight("foo_get", {"this.c": { ops: ["peek"] }});
    Foo._annotateInflight("foo_inc", {"this.c": { ops: ["inc"] }});
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, name, b) {
        super(scope, id);
        this.name = name;
        this.b = b;
        this.foo = new Foo(this,"Foo");
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        const foo_client = this._lift(this.foo);
        const name_client = this._lift(this.name);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Bar.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Bar({
              b: ${b_client},
              foo: ${foo_client},
              name: ${name_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Bar._annotateInflight("$inflight_init", {"this.b": { ops: [] },"this.foo": { ops: [] },"this.name": { ops: [] },"this.stateful": { ops: [] }});
    Bar._annotateInflight("my_method", {"this.b": { ops: ["get","put"] },"this.foo": { ops: ["foo_get","foo_inc"] }});
    class BigPublisher extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.b2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2");
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        (this.t.onMessage(new $stdlib.core.Inflight(this, "$Inflight1", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
          bindings: {
            this: {
              obj: this,
              ops: ["getObjectCount","publish"]
            },
          }
        })
        ));
        (this.q.addConsumer(new $stdlib.core.Inflight(this, "$Inflight2", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
          bindings: {
            this: {
              obj: this,
              ops: ["getObjectCount","publish"]
            },
          }
        })
        ));
        (this.b2.onCreate(new $stdlib.core.Inflight(this, "$Inflight3", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
          bindings: {
            this: {
              obj: this,
              ops: ["getObjectCount","publish"]
            },
          }
        })
        ));
      }
      _toInflight() {
        const b_client = this._lift(this.b);
        const b2_client = this._lift(this.b2);
        const q_client = this._lift(this.q);
        const t_client = this._lift(this.t);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/BigPublisher.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).BigPublisher({
              b: ${b_client},
              b2: ${b2_client},
              q: ${q_client},
              t: ${t_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    BigPublisher._annotateInflight("$inflight_init", {"this.b": { ops: [] },"this.b2": { ops: [] },"this.q": { ops: [] },"this.stateful": { ops: [] },"this.t": { ops: [] }});
    BigPublisher._annotateInflight("getObjectCount", {"this.b": { ops: ["list"] }});
    BigPublisher._annotateInflight("publish", {"this.b2": { ops: ["put"] },"this.q": { ops: ["push"] },"this.t": { ops: ["publish"] }});
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const res = new Bar(this,"Bar","Arr",bucket);
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc4/index.js".replace(/\\/g, "/"))),
      bindings: {
        bucket: {
          obj: bucket,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        res: {
          obj: res,
          ops: ["my_method"]
        },
      }
    })
    );
    const bigOlPublisher = new BigPublisher(this,"BigPublisher");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test: dependency cycles",new $stdlib.core.Inflight(this, "$Inflight5", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc5/index.js".replace(/\\/g, "/"))),
      bindings: {
        bigOlPublisher: {
          obj: bigOlPublisher,
          ops: ["getObjectCount","publish"]
        },
      }
    })
    );
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

## proc1/index.js
```js
async handle() {
  const { this } = this;
  (await this.b.put("foo1.txt","bar"));
}

```

## proc2/index.js
```js
async handle() {
  const { this } = this;
  (await this.b.put("foo2.txt","bar"));
}

```

## proc3/index.js
```js
async handle() {
  const { this } = this;
  (await this.q.push("foo"));
}

```

## proc4/index.js
```js
async handle() {
  const { bucket, res } = this;
  const s = (await res.my_method());
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "counter is: 101")'`)})((s === "counter is: 101"))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await bucket.list()).length === 1)'`)})(((await bucket.list()).length === 1))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(res.foo.inflight_field === 123)'`)})((res.foo.inflight_field === 123))};
}

```

## proc5/index.js
```js
async handle() {
  const { bigOlPublisher } = this;
  (await bigOlPublisher.publish("foo"));
  const count = (await bigOlPublisher.getObjectCount());
}

```


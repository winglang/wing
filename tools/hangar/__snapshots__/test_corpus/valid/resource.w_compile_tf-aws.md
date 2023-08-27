# [resource.w](../../../../../examples/tests/valid/resource.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $bucket, $res, $res_foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = (await $res.myMethod());
      {console.log(s)};
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"counter is: 201\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"counter is: 201")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bucket.list().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $bucket.list()).length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: res.foo.inflightField == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($res_foo.inflightField,123)))};
      (await $res.testTypeAccess());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $__parent_this_2_b }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_2_b.put("foo1.txt","bar"));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $__parent_this_3_b }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_3_b.put("foo2.txt","bar"));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({ $__parent_this_4_q }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_4_q.push("foo"));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({ $bigOlPublisher }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bigOlPublisher.publish("foo"));
      const count = (await $bigOlPublisher.getObjectCount());
    }
  }
  return $Closure5;
}

```

## inflight.Bar-1.js
```js
module.exports = function({ $Foo, $MyEnum }) {
  class Bar {
    constructor({ $this_b, $this_e, $this_foo }) {
      this.$this_b = $this_b;
      this.$this_e = $this_e;
      this.$this_foo = $this_foo;
    }
    static async barStatic() {
      return "bar static";
    }
    async myMethod() {
      (await this.$this_foo.fooInc());
      const s = (await $Foo.fooStatic());
      (await this.$this_b.put("foo",String.raw({ raw: ["counter is: ", ""] }, (await this.$this_foo.fooGet()))));
      return (await this.$this_b.get("foo"));
    }
    async testTypeAccess() {
      if (true) {
        {((cond) => {if (!cond) throw new Error("assertion failed: Bar.barStatic() == \"bar static\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await Bar.barStatic()),"bar static")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: Foo.fooStatic() == \"foo static\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Foo.fooStatic()),"foo static")))};
        {((cond) => {if (!cond) throw new Error("assertion failed: this.e == MyEnum.B")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_e,$MyEnum.B)))};
      }
    }
  }
  return Bar;
}

```

## inflight.BigPublisher-1.js
```js
module.exports = function({  }) {
  class BigPublisher {
    constructor({ $this_b, $this_b2, $this_q, $this_t }) {
      this.$this_b = $this_b;
      this.$this_b2 = $this_b2;
      this.$this_q = $this_q;
      this.$this_t = $this_t;
    }
    async publish(s) {
      (await this.$this_t.publish(s));
      (await this.$this_q.push(s));
      (await this.$this_b2.put("foo",s));
    }
    async getObjectCount() {
      return (await this.$this_b.list()).length;
    }
  }
  return BigPublisher;
}

```

## inflight.Dummy-1.js
```js
module.exports = function({  }) {
  class Dummy {
    constructor({  }) {
    }
  }
  return Dummy;
}

```

## inflight.Foo-1.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({ $this_c }) {
      this.$this_c = $this_c;
    }
    async fooInc() {
      (await this.$this_c.inc());
    }
    async fooGet() {
      return (await this.$this_c.peek());
    }
    static async fooStatic() {
      return "foo static";
    }
    async $inflight_init() {
      this.inflightField = 123;
      (await this.$this_c.inc(110));
      (await this.$this_c.dec(10));
    }
  }
  return Foo;
}

```

## inflight.ScopeAndIdTestClass-1.js
```js
module.exports = function({  }) {
  class ScopeAndIdTestClass {
    constructor({  }) {
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
      "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRole_C27B12C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate-OnMessage-59543b60/IamRole",
            "uniqueId": "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRole_C27B12C3"
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
      "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRolePolicy_6657EAFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate-OnMessage-59543b60/IamRolePolicy",
            "uniqueId": "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRolePolicy_6657EAFB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRole_C27B12C3.name}"
      },
      "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRolePolicy_6AF2C97F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Queue-SetConsumer-c50bc9ef/IamRolePolicy",
            "uniqueId": "BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRolePolicy_6AF2C97F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}\",\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_cloudQueue-SetConsumer-c50bc9ef_IamRole_7FC6BA51.name}"
      },
      "BigPublisher_cloudTopic-OnMessage-113c9059_IamRolePolicy_51FA866C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/cloud.Topic-OnMessage-113c9059/IamRolePolicy",
            "uniqueId": "BigPublisher_cloudTopic-OnMessage-113c9059_IamRolePolicy_51FA866C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}\",\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_cloudTopic-OnMessage-113c9059_IamRole_1067F50A.name}"
      },
      "testdependencycycles_Handler_IamRolePolicy_A8D5A9DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:dependency cycles/Handler/IamRolePolicy",
            "uniqueId": "testdependencycycles_Handler_IamRolePolicy_A8D5A9DF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}\",\"${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}\",\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testdependencycycles_Handler_IamRole_F8C18B08.name}"
      },
      "testtest_Handler_IamRolePolicy_AF0279BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "testtest_Handler_IamRolePolicy_AF0279BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.Bar_Foo_cloudCounter_DF879883.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.Bar_Foo_cloudCounter_DF879883.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRolePolicyAttachment_53F63590": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate-OnMessage-59543b60/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRolePolicyAttachment_53F63590"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRole_C27B12C3.name}"
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
      "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_93D04CBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate-OnMessage-59543b60/Default",
            "uniqueId": "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_93D04CBC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.url}",
            "WING_FUNCTION_NAME": "b2-oncreate-OnMessage-59543b60-c807494b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b2-oncreate-OnMessage-59543b60-c807494b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_b2_b2-oncreate-OnMessage-59543b60_IamRole_C27B12C3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_b2_b2-oncreate-OnMessage-59543b60_S3Object_759B056E.key}",
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
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
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
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
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
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_584271ad": "${aws_s3_bucket.BigPublisher_b2_702AC841.bucket}",
            "BUCKET_NAME_7ef741f5": "${aws_s3_bucket.BigPublisher_cloudBucket_ABF95118.bucket}",
            "QUEUE_URL_b0ba884c": "${aws_sqs_queue.BigPublisher_cloudQueue_2EE8871A.url}",
            "TOPIC_ARN_eb0072ec": "${aws_sns_topic.BigPublisher_cloudTopic_61DC7B63.arn}",
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
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "DYNAMODB_TABLE_NAME_c7446906": "${aws_dynamodb_table.Bar_Foo_cloudCounter_DF879883.name}",
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
      "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_InvokePermission-c85dfafbf5013871aa3434b4c0d215d292753b3141_40279100": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate-OnMessage-59543b60/InvokePermission-c85dfafbf5013871aa3434b4c0d215d292753b3141",
            "uniqueId": "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_InvokePermission-c85dfafbf5013871aa3434b4c0d215d292753b3141_40279100"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.BigPublisher_b2_b2-oncreate-OnMessage-59543b60_93D04CBC.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.BigPublisher_b2_b2-oncreate_B37DE1E1.arn}"
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
          "aws_sns_topic_policy.BigPublisher_b2_b2-oncreate_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_19647381"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.BigPublisher_b2_b2-oncreate_B37DE1E1.arn}"
          }
        ]
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
      "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_S3Object_759B056E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate-OnMessage-59543b60/S3Object",
            "uniqueId": "BigPublisher_b2_b2-oncreate-OnMessage-59543b60_S3Object_759B056E"
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
      "BigPublisher_b2_b2-oncreate_B37DE1E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate/Default",
            "uniqueId": "BigPublisher_b2_b2-oncreate_B37DE1E1"
          }
        },
        "name": "b2-oncreate-c85dfafb"
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
      "BigPublisher_b2_b2-oncreate_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_19647381": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate/PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad",
            "uniqueId": "BigPublisher_b2_b2-oncreate_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_19647381"
          }
        },
        "arn": "${aws_sns_topic.BigPublisher_b2_b2-oncreate_B37DE1E1.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.BigPublisher_b2_b2-oncreate_B37DE1E1.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "BigPublisher_b2_b2-oncreate_b2-oncreate-TopicSubscription-59543b60_9824C8F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/b2-oncreate/b2-oncreate-TopicSubscription-59543b60",
            "uniqueId": "BigPublisher_b2_b2-oncreate_b2-oncreate-TopicSubscription-59543b60_9824C8F9"
          }
        },
        "endpoint": "${aws_lambda_function.BigPublisher_b2_b2-oncreate-OnMessage-59543b60_93D04CBC.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.BigPublisher_b2_b2-oncreate_B37DE1E1.arn}"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
              $this_c: ${this._lift(this.c)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["inflightField", "fooInc", "fooGet", "fooStatic", "$inflight_init"];
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
    }
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, name, b, e) {
        super(scope, id);
        this.name = name;
        this.b = b;
        this.foo = new Foo(this,"Foo");
        this.e = e;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Bar-1.js")({
            $Foo: ${context._lift(Foo)},
            $MyEnum: ${context._lift(MyEnum)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this)};
            const client = new BarClient({
              $this_b: ${this._lift(this.b)},
              $this_e: ${this._lift(this.e)},
              $this_foo: ${this._lift(this.foo)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["barStatic", "myMethod", "testTypeAccess", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Bar._registerBindObject(this.b, host, []);
          Bar._registerBindObject(this.e, host, []);
          Bar._registerBindObject(this.foo, host, []);
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
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $bucket: ${context._lift(bucket)},
            $res: ${context._lift(res)},
            $res_foo: ${context._lift(res.foo)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
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
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure2-1.js")({
                $__parent_this_2_b: ${context._lift(__parent_this_2.b)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType(this)};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
          _registerBind(host, ops) {
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
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure3-1.js")({
                $__parent_this_3_b: ${context._lift(__parent_this_3.b)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure3Client = ${$Closure3._toInflightType(this)};
                const client = new $Closure3Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
          _registerBind(host, ops) {
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
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure4-1.js")({
                $__parent_this_4_q: ${context._lift(__parent_this_4.q)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure4Client = ${$Closure4._toInflightType(this)};
                const client = new $Closure4Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
          _registerBind(host, ops) {
            if (ops.includes("handle")) {
              $Closure4._registerBindObject(__parent_this_4.q, host, ["push"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.b2.onCreate(new $Closure4(this,"$Closure4")));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.BigPublisher-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const BigPublisherClient = ${BigPublisher._toInflightType(this)};
            const client = new BigPublisherClient({
              $this_b: ${this._lift(this.b)},
              $this_b2: ${this._lift(this.b2)},
              $this_q: ${this._lift(this.q)},
              $this_t: ${this._lift(this.t)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["publish", "getObjectCount", "$inflight_init"];
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
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
            $bigOlPublisher: ${context._lift(bigOlPublisher)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
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
        return `
          require("./inflight.Dummy-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DummyClient = ${Dummy._toInflightType(this)};
            const client = new DummyClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["$inflight_init"];
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
        return `
          require("./inflight.ScopeAndIdTestClass-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const ScopeAndIdTestClassClient = ${ScopeAndIdTestClass._toInflightType(this)};
            const client = new ScopeAndIdTestClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["$inflight_init"];
      }
    }
    const MyEnum =
      (function (tmp) {
        tmp[tmp["A"] = 0] = "A";
        tmp[tmp["B"] = 1] = "B";
        tmp[tmp["C"] = 2] = "C";
        return tmp;
      })({})
    ;
    const bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const res = new Bar(this,"Bar","Arr",bucket,MyEnum.B);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
    const bigOlPublisher = new BigPublisher(this,"BigPublisher");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:dependency cycles",new $Closure5(this,"$Closure5"));
    new ScopeAndIdTestClass(this,"ScopeAndIdTestClass");
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "resource", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


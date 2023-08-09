# [resource.w](../../../../../examples/tests/valid/resource.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
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

## inflight.$Closure3.js
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

## inflight.$Closure4.js
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

## inflight.$Closure5.js
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

## inflight.Bar.js
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

## inflight.BigPublisher.js
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

## inflight.Dummy.js
```js
module.exports = function({  }) {
  class Dummy {
    constructor({  }) {
    }
  }
  return Dummy;
}

```

## inflight.Foo.js
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

## inflight.ScopeAndIdTestClass.js
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:test\",\"${aws_lambda_function.undefined_testtest_Handler_A295E574.arn}\"],[\"root/undefined/Default/test:dependency cycles\",\"${aws_lambda_function.undefined_testdependencycycles_Handler_91CB6A3F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_Bar_Foo_cloudCounter_735F5A7D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Bar/Foo/cloud.Counter/Default",
            "uniqueId": "undefined_Bar_Foo_cloudCounter_735F5A7D"
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
        "name": "wing-counter-cloud.Counter-c88cd877"
      }
    },
    "aws_iam_role": {
      "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRole_68EA42D8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate-OnMessage-d25747d0/IamRole",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRole_68EA42D8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRole_64A5D3F1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue-SetConsumer-046cff56/IamRole",
            "uniqueId": "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRole_64A5D3F1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRole_CF31F711": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic-OnMessage-ba4d1959/IamRole",
            "uniqueId": "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRole_CF31F711"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testdependencycycles_Handler_IamRole_FAF18670": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dependency cycles/Handler/IamRole",
            "uniqueId": "undefined_testdependencycycles_Handler_IamRole_FAF18670"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testtest_Handler_IamRole_50D3D3C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRole",
            "uniqueId": "undefined_testtest_Handler_IamRole_50D3D3C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRolePolicy_F2C38375": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate-OnMessage-d25747d0/IamRolePolicy",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRolePolicy_F2C38375"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.undefined_BigPublisher_cloudQueue_CBF3C51A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRole_68EA42D8.name}"
      },
      "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRolePolicy_2E0978B9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue-SetConsumer-046cff56/IamRolePolicy",
            "uniqueId": "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRolePolicy_2E0978B9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_BigPublisher_cloudQueue_CBF3C51A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.arn}\",\"${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRole_64A5D3F1.name}"
      },
      "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRolePolicy_9DFEAC3E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic-OnMessage-ba4d1959/IamRolePolicy",
            "uniqueId": "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRolePolicy_9DFEAC3E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.arn}\",\"${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRole_CF31F711.name}"
      },
      "undefined_testdependencycycles_Handler_IamRolePolicy_D60F3FB1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dependency cycles/Handler/IamRolePolicy",
            "uniqueId": "undefined_testdependencycycles_Handler_IamRolePolicy_D60F3FB1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.arn}\",\"${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.arn}\",\"${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.undefined_BigPublisher_cloudQueue_CBF3C51A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.undefined_BigPublisher_cloudTopic_847AF2D6.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testdependencycycles_Handler_IamRole_FAF18670.name}"
      },
      "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_Bar_Foo_cloudCounter_735F5A7D.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_Bar_Foo_cloudCounter_735F5A7D.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRolePolicyAttachment_C67FCEB6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate-OnMessage-d25747d0/IamRolePolicyAttachment",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRolePolicyAttachment_C67FCEB6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRole_68EA42D8.name}"
      },
      "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRolePolicyAttachment_4458E5D5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue-SetConsumer-046cff56/IamRolePolicyAttachment",
            "uniqueId": "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRolePolicyAttachment_4458E5D5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRole_64A5D3F1.name}"
      },
      "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRolePolicyAttachment_528FF0E5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic-OnMessage-ba4d1959/IamRolePolicyAttachment",
            "uniqueId": "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRolePolicyAttachment_528FF0E5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRole_CF31F711.name}"
      },
      "undefined_testdependencycycles_Handler_IamRolePolicyAttachment_3564F968": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dependency cycles/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testdependencycycles_Handler_IamRolePolicyAttachment_3564F968"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testdependencycycles_Handler_IamRole_FAF18670.name}"
      },
      "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "undefined_BigPublisher_cloudQueue_EventSourceMapping_813EC20D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue/EventSourceMapping",
            "uniqueId": "undefined_BigPublisher_cloudQueue_EventSourceMapping_813EC20D"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.undefined_BigPublisher_cloudQueue_CBF3C51A.arn}",
        "function_name": "${aws_lambda_function.undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_D26EFBC1.function_name}"
      }
    },
    "aws_lambda_function": {
      "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_4805A676": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate-OnMessage-d25747d0/Default",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_4805A676"
          }
        },
        "environment": {
          "variables": {
            "QUEUE_URL_b4b5bccd": "${aws_sqs_queue.undefined_BigPublisher_cloudQueue_CBF3C51A.url}",
            "WING_FUNCTION_NAME": "b2-oncreate-OnMessage-d25747d0-c833c6db",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b2-oncreate-OnMessage-d25747d0-c833c6db",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_IamRole_68EA42D8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_S3Object_3FA85E62.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_D26EFBC1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue-SetConsumer-046cff56/Default",
            "uniqueId": "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_D26EFBC1"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_3e4cccc8": "${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.bucket}",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-046cff56-c88297b4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-046cff56-c88297b4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_IamRole_64A5D3F1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_S3Object_273906D7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_7DB8E313": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic-OnMessage-ba4d1959/Default",
            "uniqueId": "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_7DB8E313"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_3e4cccc8": "${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.bucket}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-ba4d1959-c80a11cf",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-ba4d1959-c80a11cf",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_IamRole_CF31F711.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_S3Object_73C4B06C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testdependencycycles_Handler_91CB6A3F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dependency cycles/Handler/Default",
            "uniqueId": "undefined_testdependencycycles_Handler_91CB6A3F"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_3e4cccc8": "${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.bucket}",
            "BUCKET_NAME_9805ebab": "${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.bucket}",
            "QUEUE_URL_b4b5bccd": "${aws_sqs_queue.undefined_BigPublisher_cloudQueue_CBF3C51A.url}",
            "TOPIC_ARN_785087e0": "${aws_sns_topic.undefined_BigPublisher_cloudTopic_847AF2D6.arn}",
            "WING_FUNCTION_NAME": "Handler-c8fc3d05",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fc3d05",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testdependencycycles_Handler_IamRole_FAF18670.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testdependencycycles_Handler_S3Object_BF30D9BA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testtest_Handler_A295E574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/Default",
            "uniqueId": "undefined_testtest_Handler_A295E574"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "DYNAMODB_TABLE_NAME_278de54d": "${aws_dynamodb_table.undefined_Bar_Foo_cloudCounter_735F5A7D.name}",
            "WING_FUNCTION_NAME": "Handler-c831cefb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c831cefb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtest_Handler_S3Object_96D88A6C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_InvokePermission-c8800bc9c92fa883fb331b5ccf194d22cc3bef1d9c_1A46E557": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate-OnMessage-d25747d0/InvokePermission-c8800bc9c92fa883fb331b5ccf194d22cc3bef1d9c",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_InvokePermission-c8800bc9c92fa883fb331b5ccf194d22cc3bef1d9c_1A46E557"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_4805A676.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_BigPublisher_b2_b2-oncreate_BA8C0023.arn}"
      },
      "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_InvokePermission-c8538ac8b1f4278f74cde8bcab6ea519d2785087e0_2075D56D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic-OnMessage-ba4d1959/InvokePermission-c8538ac8b1f4278f74cde8bcab6ea519d2785087e0",
            "uniqueId": "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_InvokePermission-c8538ac8b1f4278f74cde8bcab6ea519d2785087e0_2075D56D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_7DB8E313.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_BigPublisher_cloudTopic_847AF2D6.arn}"
      }
    },
    "aws_s3_bucket": {
      "undefined_BigPublisher_b2_A43AF336": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/Default",
            "uniqueId": "undefined_BigPublisher_b2_A43AF336"
          }
        },
        "bucket_prefix": "b2-c8c7be9d-",
        "force_destroy": false
      },
      "undefined_BigPublisher_cloudBucket_5BB7316E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Bucket/Default",
            "uniqueId": "undefined_BigPublisher_cloudBucket_5BB7316E"
          }
        },
        "bucket_prefix": "cloud-bucket-c8e54c88-",
        "force_destroy": false
      },
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      },
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "undefined_BigPublisher_b2_S3BucketNotification_3334A6D7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/S3BucketNotification",
            "uniqueId": "undefined_BigPublisher_b2_S3BucketNotification_3334A6D7"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.id}",
        "depends_on": [
          "aws_sns_topic_policy.undefined_BigPublisher_b2_b2-oncreate_PublishPermission-c8c7be9d181e557657332e966bdc31e73a9805ebab_7C339352"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.undefined_BigPublisher_b2_b2-oncreate_BA8C0023.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_BigPublisher_b2_PublicAccessBlock_B966A1FE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/PublicAccessBlock",
            "uniqueId": "undefined_BigPublisher_b2_PublicAccessBlock_B966A1FE"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_BigPublisher_cloudBucket_PublicAccessBlock_9BC622A3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_BigPublisher_cloudBucket_PublicAccessBlock_9BC622A3"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_BigPublisher_b2_Encryption_8417EEB2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/Encryption",
            "uniqueId": "undefined_BigPublisher_b2_Encryption_8417EEB2"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_BigPublisher_cloudBucket_Encryption_7C8E045C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Bucket/Encryption",
            "uniqueId": "undefined_BigPublisher_cloudBucket_Encryption_7C8E045C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_BigPublisher_cloudBucket_5BB7316E.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_S3Object_3FA85E62": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate-OnMessage-d25747d0/S3Object",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_S3Object_3FA85E62"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_S3Object_273906D7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue-SetConsumer-046cff56/S3Object",
            "uniqueId": "undefined_BigPublisher_cloudQueue-SetConsumer-046cff56_S3Object_273906D7"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_S3Object_73C4B06C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic-OnMessage-ba4d1959/S3Object",
            "uniqueId": "undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_S3Object_73C4B06C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testdependencycycles_Handler_S3Object_BF30D9BA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dependency cycles/Handler/S3Object",
            "uniqueId": "undefined_testdependencycycles_Handler_S3Object_BF30D9BA"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testtest_Handler_S3Object_96D88A6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/S3Object",
            "uniqueId": "undefined_testtest_Handler_S3Object_96D88A6C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "undefined_BigPublisher_b2_b2-oncreate_BA8C0023": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate/Default",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate_BA8C0023"
          }
        },
        "name": "b2-oncreate-c8800bc9"
      },
      "undefined_BigPublisher_cloudTopic_847AF2D6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic/Default",
            "uniqueId": "undefined_BigPublisher_cloudTopic_847AF2D6"
          }
        },
        "name": "cloud-Topic-c8538ac8"
      }
    },
    "aws_sns_topic_policy": {
      "undefined_BigPublisher_b2_b2-oncreate_PublishPermission-c8c7be9d181e557657332e966bdc31e73a9805ebab_7C339352": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate/PublishPermission-c8c7be9d181e557657332e966bdc31e73a9805ebab",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate_PublishPermission-c8c7be9d181e557657332e966bdc31e73a9805ebab_7C339352"
          }
        },
        "arn": "${aws_sns_topic.undefined_BigPublisher_b2_b2-oncreate_BA8C0023.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_BigPublisher_b2_b2-oncreate_BA8C0023.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_BigPublisher_b2_A43AF336.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "undefined_BigPublisher_b2_b2-oncreate_b2-oncreate-TopicSubscription-d25747d0_B8FDA459": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/b2/b2-oncreate/b2-oncreate-TopicSubscription-d25747d0",
            "uniqueId": "undefined_BigPublisher_b2_b2-oncreate_b2-oncreate-TopicSubscription-d25747d0_B8FDA459"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_BigPublisher_b2_b2-oncreate-OnMessage-d25747d0_4805A676.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_BigPublisher_b2_b2-oncreate_BA8C0023.arn}"
      },
      "undefined_BigPublisher_cloudTopic_cloudTopic-TopicSubscription-ba4d1959_F9E1B707": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Topic/cloud.Topic-TopicSubscription-ba4d1959",
            "uniqueId": "undefined_BigPublisher_cloudTopic_cloudTopic-TopicSubscription-ba4d1959_F9E1B707"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_BigPublisher_cloudTopic-OnMessage-ba4d1959_7DB8E313.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_BigPublisher_cloudTopic_847AF2D6.arn}"
      }
    },
    "aws_sqs_queue": {
      "undefined_BigPublisher_cloudQueue_CBF3C51A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/BigPublisher/cloud.Queue/Default",
            "uniqueId": "undefined_BigPublisher_cloudQueue_CBF3C51A"
          }
        },
        "name": "cloud-Queue-c87f7579"
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
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("fooInc", "fooGet", "fooStatic", "$inflight_init", "inflightField");
        this.c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
              $this_c: ${this._lift(this.c)},
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
    }
    class Bar extends $stdlib.std.Resource {
      constructor(scope, id, name, b, e) {
        super(scope, id);
        this._addInflightOps("barStatic", "myMethod", "testTypeAccess", "$inflight_init");
        this.name = name;
        this.b = b;
        this.foo = new Foo(this,"Foo");
        this.e = e;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Bar.js")({
            $Foo: ${context._lift(Foo)},
            $MyEnum: ${context._lift(MyEnum)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BarClient = ${Bar._toInflightType(this).text};
            const client = new BarClient({
              $this_b: ${this._lift(this.b)},
              $this_e: ${this._lift(this.e)},
              $this_foo: ${this._lift(this.foo)},
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
        }
        if (ops.includes("myMethod")) {
          Bar._registerBindObject(Foo, host, ["fooStatic"]);
          Bar._registerBindObject(this.b, host, ["get", "put"]);
          Bar._registerBindObject(this.foo, host, ["fooGet", "fooInc"]);
        }
        if (ops.includes("testTypeAccess")) {
          Bar._registerBindObject(Foo, host, ["fooStatic"]);
          Bar._registerBindObject(this.e, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $bucket: ${context._lift(bucket)},
            $res: ${context._lift(res)},
            $res_foo: ${context._lift(res.foo)},
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
        this._addInflightOps("publish", "getObjectCount", "$inflight_init");
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.b2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2");
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure2.js")({
                $__parent_this_2_b: ${context._lift(__parent_this_2.b)},
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
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure3.js")({
                $__parent_this_3_b: ${context._lift(__parent_this_3.b)},
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
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure4.js")({
                $__parent_this_4_q: ${context._lift(__parent_this_4.q)},
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
            if (ops.includes("handle")) {
              $Closure4._registerBindObject(__parent_this_4.q, host, ["push"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.b2.onCreate(new $Closure4(this,"$Closure4")));
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.BigPublisher.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const BigPublisherClient = ${BigPublisher._toInflightType(this).text};
            const client = new BigPublisherClient({
              $this_b: ${this._lift(this.b)},
              $this_b2: ${this._lift(this.b2)},
              $this_q: ${this._lift(this.q)},
              $this_t: ${this._lift(this.t)},
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure5.js")({
            $bigOlPublisher: ${context._lift(bigOlPublisher)},
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
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(bigOlPublisher, host, ["getObjectCount", "publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    class Dummy extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Dummy.js")({
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
    }
    class ScopeAndIdTestClass extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.ScopeAndIdTestClass.js")({
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


# [resource.test.w](../../../../../tests/valid/resource.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bucket, $res, $res_foo }) {
  class $Closure1 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = (await $res.myMethod());
      console.log(s);
      $helpers.assert($helpers.eq(s, "counter is: 201"), "s == \"counter is: 201\"");
      $helpers.assert($helpers.eq((await $bucket.list()).length, 1), "bucket.list().length == 1");
      $helpers.assert($helpers.eq($res_foo.inflightField, 123), "res.foo.inflightField == 123");
      (await $res.testTypeAccess());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $__parent_this_2_b }) {
  class $Closure2 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_2_b.put("foo1.txt", "bar"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $__parent_this_3_b }) {
  class $Closure3 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_3_b.put("foo2.txt", "bar"));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $__parent_this_4_q }) {
  class $Closure4 {
    constructor($args) {
      const {  } = $args;
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
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $bigOlPublisher, $util_Util }) {
  class $Closure5 {
    constructor($args) {
      const {  } = $args;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bigOlPublisher.publish("foo"));
      (await $util_Util.waitUntil((async () => {
        const count = (await $bigOlPublisher.getObjectCount());
        return $helpers.eq(count, 2);
      })));
      $helpers.assert($helpers.eq((await $bigOlPublisher.getObjectCount()), 2), "bigOlPublisher.getObjectCount() == 2");
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map
```

## inflight.Bar-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $Foo, $MyEnum }) {
  class Bar {
    constructor($args) {
      const { $this_b, $this_e, $this_foo } = $args;
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
      (await this.$this_b.put("foo", String.raw({ raw: ["counter is: ", ""] }, (await this.$this_foo.fooGet()))));
      return (await this.$this_b.get("foo"));
    }
    async testTypeAccess() {
      if (true) {
        $helpers.assert($helpers.eq((await Bar.barStatic()), "bar static"), "Bar.barStatic() == \"bar static\"");
        $helpers.assert($helpers.eq((await $Foo.fooStatic()), "foo static"), "Foo.fooStatic() == \"foo static\"");
        $helpers.assert($helpers.eq(this.$this_e, $MyEnum.B), "this.e == MyEnum.B");
      }
    }
  }
  return Bar;
}
//# sourceMappingURL=inflight.Bar-1.cjs.map
```

## inflight.BigPublisher-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class BigPublisher {
    constructor($args) {
      const { $this_b, $this_b2, $this_q, $this_t } = $args;
      this.$this_b = $this_b;
      this.$this_b2 = $this_b2;
      this.$this_q = $this_q;
      this.$this_t = $this_t;
    }
    async publish(s) {
      (await this.$this_t.publish(s));
      (await this.$this_q.push(s));
      (await this.$this_b2.put("foo", s));
    }
    async getObjectCount() {
      return (await this.$this_b.list()).length;
    }
  }
  return BigPublisher;
}
//# sourceMappingURL=inflight.BigPublisher-1.cjs.map
```

## inflight.Dummy-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Dummy {
  }
  return Dummy;
}
//# sourceMappingURL=inflight.Dummy-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class Foo {
    constructor($args) {
      const { $this_c } = $args;
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
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## inflight.ScopeAndIdTestClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class ScopeAndIdTestClass {
  }
  return ScopeAndIdTestClass;
}
//# sourceMappingURL=inflight.ScopeAndIdTestClass-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "BigPublisher_Queue-SetConsumer0_CloudwatchLogGroup_59DF8618": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "BigPublisher_Queue-SetConsumer0_CloudwatchLogGroup_59DF8618"
          }
        },
        "name": "/aws/lambda/Queue-SetConsumer0-c8931d51",
        "retention_in_days": 30
      },
      "BigPublisher_Topic-OnMessage0_CloudwatchLogGroup_7B9F7944": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "BigPublisher_Topic-OnMessage0_CloudwatchLogGroup_7B9F7944"
          }
        },
        "name": "/aws/lambda/Topic-OnMessage0-c8bea057",
        "retention_in_days": 30
      },
      "BigPublisher_b2_OnCreate-OnMessage0_CloudwatchLogGroup_8914F373": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_CloudwatchLogGroup_8914F373"
          }
        },
        "name": "/aws/lambda/OnCreate-OnMessage0-c8ab841c",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "Bar_Foo_Counter_0BF3941D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bar/Foo/Counter/Default",
            "uniqueId": "Bar_Foo_Counter_0BF3941D"
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
        "name": "wing-counter-Counter-c8066681"
      }
    },
    "aws_iam_role": {
      "BigPublisher_Queue-SetConsumer0_IamRole_D38B87EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue-SetConsumer0/IamRole",
            "uniqueId": "BigPublisher_Queue-SetConsumer0_IamRole_D38B87EE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BigPublisher_Topic-OnMessage0_IamRole_FEF4CFBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/IamRole",
            "uniqueId": "BigPublisher_Topic-OnMessage0_IamRole_FEF4CFBB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "BigPublisher_b2_OnCreate-OnMessage0_IamRole_2B7C8C04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/IamRole",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_IamRole_2B7C8C04"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "BigPublisher_Queue-SetConsumer0_IamRolePolicy_AC1DBF7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "BigPublisher_Queue-SetConsumer0_IamRolePolicy_AC1DBF7E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_Queue_2C024F97.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.arn}\",\"${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_Queue-SetConsumer0_IamRole_D38B87EE.name}"
      },
      "BigPublisher_Topic-OnMessage0_IamRolePolicy_6D3D4F05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/IamRolePolicy",
            "uniqueId": "BigPublisher_Topic-OnMessage0_IamRolePolicy_6D3D4F05"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.arn}\",\"${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_Topic-OnMessage0_IamRole_FEF4CFBB.name}"
      },
      "BigPublisher_b2_OnCreate-OnMessage0_IamRolePolicy_7D531F15": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/IamRolePolicy",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_IamRolePolicy_7D531F15"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:GetQueueUrl\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_Queue_2C024F97.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.BigPublisher_Queue_2C024F97.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.BigPublisher_b2_OnCreate-OnMessage0_IamRole_2B7C8C04.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "BigPublisher_Queue-SetConsumer0_IamRolePolicyAttachment_263D5243": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_Queue-SetConsumer0_IamRolePolicyAttachment_263D5243"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_Queue-SetConsumer0_IamRole_D38B87EE.name}"
      },
      "BigPublisher_Topic-OnMessage0_IamRolePolicyAttachment_9752C0C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_Topic-OnMessage0_IamRolePolicyAttachment_9752C0C1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_Topic-OnMessage0_IamRole_FEF4CFBB.name}"
      },
      "BigPublisher_b2_OnCreate-OnMessage0_IamRolePolicyAttachment_56FA395A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_IamRolePolicyAttachment_56FA395A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.BigPublisher_b2_OnCreate-OnMessage0_IamRole_2B7C8C04.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "BigPublisher_Queue_EventSourceMapping_D3253A7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue/EventSourceMapping",
            "uniqueId": "BigPublisher_Queue_EventSourceMapping_D3253A7F"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.BigPublisher_Queue_2C024F97.arn}",
        "function_name": "${aws_lambda_function.BigPublisher_Queue-SetConsumer0_55896C65.function_name}",
        "function_response_types": [
          "ReportBatchItemFailures"
        ]
      }
    },
    "aws_lambda_function": {
      "BigPublisher_Queue-SetConsumer0_55896C65": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue-SetConsumer0/Default",
            "uniqueId": "BigPublisher_Queue-SetConsumer0_55896C65"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_82fe1f9e": "${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Queue-SetConsumer0-c8931d51",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Queue-SetConsumer0-c8931d51",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_Queue-SetConsumer0_IamRole_D38B87EE.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_Queue-SetConsumer0_S3Object_21F398A2.key}",
        "timeout": "${aws_sqs_queue.BigPublisher_Queue_2C024F97.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BigPublisher_Topic-OnMessage0_A623A9EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/Default",
            "uniqueId": "BigPublisher_Topic-OnMessage0_A623A9EA"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_82fe1f9e": "${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Topic-OnMessage0-c8bea057",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Topic-OnMessage0-c8bea057",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_Topic-OnMessage0_IamRole_FEF4CFBB.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_Topic-OnMessage0_S3Object_3B80DE9B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "BigPublisher_b2_OnCreate-OnMessage0_F967A96B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/Default",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_F967A96B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "QUEUE_URL_cb1bcecf": "${aws_sqs_queue.BigPublisher_Queue_2C024F97.url}",
            "WING_FUNCTION_NAME": "OnCreate-OnMessage0-c8ab841c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "OnCreate-OnMessage0-c8ab841c",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.BigPublisher_b2_OnCreate-OnMessage0_IamRole_2B7C8C04.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.BigPublisher_b2_OnCreate-OnMessage0_S3Object_75F3ED03.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "BigPublisher_Topic-OnMessage0_InvokePermission-c884cd53ef51dde6112319447c29f4ea9473f19e6a_EFD91A7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/InvokePermission-c884cd53ef51dde6112319447c29f4ea9473f19e6a",
            "uniqueId": "BigPublisher_Topic-OnMessage0_InvokePermission-c884cd53ef51dde6112319447c29f4ea9473f19e6a_EFD91A7E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.BigPublisher_Topic-OnMessage0_A623A9EA.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.BigPublisher_Topic_F8E12E52.arn}"
      },
      "BigPublisher_b2_OnCreate-OnMessage0_InvokePermission-c8957161bd24a9a75910007bdeef4fc517fd85b21a_AB564705": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/InvokePermission-c8957161bd24a9a75910007bdeef4fc517fd85b21a",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_InvokePermission-c8957161bd24a9a75910007bdeef4fc517fd85b21a_AB564705"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.BigPublisher_b2_OnCreate-OnMessage0_F967A96B.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.BigPublisher_b2_OnCreate_25B21222.arn}"
      }
    },
    "aws_s3_bucket": {
      "BigPublisher_Bucket_F4CC95F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Bucket/Default",
            "uniqueId": "BigPublisher_Bucket_F4CC95F6"
          }
        },
        "bucket_prefix": "bucket-c8856dc5-",
        "force_destroy": false
      },
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
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
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
      }
    },
    "aws_s3_bucket_cors_configuration": {
      "BigPublisher_Bucket_CorsConfiguration-82fe1f9e_A1667736": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Bucket/CorsConfiguration-82fe1f9e",
            "uniqueId": "BigPublisher_Bucket_CorsConfiguration-82fe1f9e_A1667736"
          }
        },
        "bucket": "${aws_s3_bucket.BigPublisher_Bucket_F4CC95F6.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      },
      "BigPublisher_b2_CorsConfiguration-584271ad_E76AB82E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/CorsConfiguration-584271ad",
            "uniqueId": "BigPublisher_b2_CorsConfiguration-584271ad_E76AB82E"
          }
        },
        "bucket": "${aws_s3_bucket.BigPublisher_b2_702AC841.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
      },
      "Bucket_CorsConfiguration-1357ca3a_A4CCA40A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/CorsConfiguration-1357ca3a",
            "uniqueId": "Bucket_CorsConfiguration-1357ca3a_A4CCA40A"
          }
        },
        "bucket": "${aws_s3_bucket.Bucket.id}",
        "cors_rule": [
          {
            "allowed_headers": [
              "*"
            ],
            "allowed_methods": [
              "GET",
              "POST",
              "PUT",
              "DELETE",
              "HEAD"
            ],
            "allowed_origins": [
              "*"
            ],
            "expose_headers": [],
            "max_age_seconds": 0
          }
        ]
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
          "aws_sns_topic_policy.BigPublisher_b2_OnCreate_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_4DA82EC3"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.BigPublisher_b2_OnCreate_25B21222.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "BigPublisher_Queue-SetConsumer0_S3Object_21F398A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue-SetConsumer0/S3Object",
            "uniqueId": "BigPublisher_Queue-SetConsumer0_S3Object_21F398A2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BigPublisher_Topic-OnMessage0_S3Object_3B80DE9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic-OnMessage0/S3Object",
            "uniqueId": "BigPublisher_Topic-OnMessage0_S3Object_3B80DE9B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "BigPublisher_b2_OnCreate-OnMessage0_S3Object_75F3ED03": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate-OnMessage0/S3Object",
            "uniqueId": "BigPublisher_b2_OnCreate-OnMessage0_S3Object_75F3ED03"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "BigPublisher_Topic_F8E12E52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic/Default",
            "uniqueId": "BigPublisher_Topic_F8E12E52"
          }
        },
        "name": "Topic-c884cd53"
      },
      "BigPublisher_b2_OnCreate_25B21222": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate/Default",
            "uniqueId": "BigPublisher_b2_OnCreate_25B21222"
          }
        },
        "name": "OnCreate-c8957161"
      }
    },
    "aws_sns_topic_policy": {
      "BigPublisher_b2_OnCreate_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_4DA82EC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate/PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad",
            "uniqueId": "BigPublisher_b2_OnCreate_PublishPermission-c851683a81379a8ef8351c83fe31924055584271ad_4DA82EC3"
          }
        },
        "arn": "${aws_sns_topic.BigPublisher_b2_OnCreate_25B21222.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.BigPublisher_b2_OnCreate_25B21222.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.BigPublisher_b2_702AC841.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "BigPublisher_Topic_TopicSubscription0_5DDBA778": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Topic/TopicSubscription0",
            "uniqueId": "BigPublisher_Topic_TopicSubscription0_5DDBA778"
          }
        },
        "endpoint": "${aws_lambda_function.BigPublisher_Topic-OnMessage0_A623A9EA.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.BigPublisher_Topic_F8E12E52.arn}"
      },
      "BigPublisher_b2_OnCreate_TopicSubscription0_E6A5285C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/b2/OnCreate/TopicSubscription0",
            "uniqueId": "BigPublisher_b2_OnCreate_TopicSubscription0_E6A5285C"
          }
        },
        "endpoint": "${aws_lambda_function.BigPublisher_b2_OnCreate-OnMessage0_F967A96B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.BigPublisher_b2_OnCreate_25B21222.arn}"
      }
    },
    "aws_sqs_queue": {
      "BigPublisher_Queue_2C024F97": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/BigPublisher/Queue/Default",
            "uniqueId": "BigPublisher_Queue_2C024F97"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c852a48d",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const util = $stdlib.util;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const MyEnum =
      (function (tmp) {
        tmp["A"] = "A";
        tmp["B"] = "B";
        tmp["C"] = "C";
        return tmp;
      })({})
    ;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.c = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_c: $stdlib.core.liftObject(this.c),
        };
      }
      get _liftMap() {
        return ({
          "fooInc": [
            [this.c, ["inc"]],
          ],
          "fooGet": [
            [this.c, ["peek"]],
          ],
          "$inflight_init": [
            [this.c, [].concat(["inc"], ["dec"])],
          ],
          "inflightField": [
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "fooStatic": [
          ],
        });
      }
    }
    class Bar extends $stdlib.std.Resource {
      constructor($scope, $id, name, b, e) {
        super($scope, $id);
        this.name = name;
        this.b = b;
        this.foo = new Foo(this, "Foo");
        this.e = e;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Bar-1.cjs")({
            $Foo: ${$stdlib.core.liftObject(Foo)},
            $MyEnum: ${$stdlib.core.liftObject(MyEnum)},
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_b: $stdlib.core.liftObject(this.b),
          $this_e: $stdlib.core.liftObject(this.e),
          $this_foo: $stdlib.core.liftObject(this.foo),
        };
      }
      get _liftMap() {
        return ({
          "myMethod": [
            [Foo, ["fooStatic"]],
            [this.b, [].concat(["put"], ["get"])],
            [this.foo, [].concat(["fooInc"], ["fooGet"])],
          ],
          "testTypeAccess": [
            [Bar, ["barStatic"]],
            [Foo, ["fooStatic"]],
            [MyEnum, ["B"]],
            [this.e, []],
          ],
          "$inflight_init": [
            [Bar, []],
            [Foo, []],
            [MyEnum, []],
            [this.b, []],
            [this.e, []],
            [this.foo, []],
          ],
        });
      }
      static get _liftTypeMap() {
        return ({
          "barStatic": [
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $bucket: ${$stdlib.core.liftObject(bucket)},
            $res: ${$stdlib.core.liftObject(res)},
            $res_foo: ${$stdlib.core.liftObject(res.foo)},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [bucket, ["list"]],
            [res, [].concat(["myMethod"], ["testTypeAccess"])],
            [res.foo, ["inflightField"]],
          ],
          "$inflight_init": [
            [bucket, []],
            [res, []],
            [res.foo, []],
          ],
        });
      }
    }
    class BigPublisher extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.b = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
        this.b2 = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "b2");
        this.q = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
        this.t = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Topic", cloud.Topic, this, "Topic");
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
                $__parent_this_2_b: ${$stdlib.core.liftObject(__parent_this_2.b)},
              })
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_2.b, ["put"]],
              ],
              "$inflight_init": [
                [__parent_this_2.b, []],
              ],
            });
          }
        }
        (this.t.onMessage(new $Closure2(this, "$Closure2")));
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
                $__parent_this_3_b: ${$stdlib.core.liftObject(__parent_this_3.b)},
              })
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_3.b, ["put"]],
              ],
              "$inflight_init": [
                [__parent_this_3.b, []],
              ],
            });
          }
        }
        (this.q.setConsumer(new $Closure3(this, "$Closure3")));
        const __parent_this_4 = this;
        class $Closure4 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
                $__parent_this_4_q: ${$stdlib.core.liftObject(__parent_this_4.q)},
              })
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [__parent_this_4.q, ["push"]],
              ],
              "$inflight_init": [
                [__parent_this_4.q, []],
              ],
            });
          }
        }
        (this.b2.onCreate(new $Closure4(this, "$Closure4")));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.BigPublisher-1.cjs")({
          })
        `;
      }
      _liftedState() {
        return {
          ...(super._liftedState?.() ?? {}),
          $this_b: $stdlib.core.liftObject(this.b),
          $this_b2: $stdlib.core.liftObject(this.b2),
          $this_q: $stdlib.core.liftObject(this.q),
          $this_t: $stdlib.core.liftObject(this.t),
        };
      }
      get _liftMap() {
        return ({
          "publish": [
            [this.b2, ["put"]],
            [this.q, ["push"]],
            [this.t, ["publish"]],
          ],
          "getObjectCount": [
            [this.b, ["list"]],
          ],
          "$inflight_init": [
            [this.b, []],
            [this.b2, []],
            [this.q, []],
            [this.t, []],
          ],
        });
      }
    }
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.cjs")({
            $bigOlPublisher: ${$stdlib.core.liftObject(bigOlPublisher)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"))},
          })
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), ["waitUntil"]],
            [bigOlPublisher, [].concat(["publish"], ["getObjectCount"])],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(globalThis.$ClassFactory.resolveType("@winglang/sdk.util.Util") ?? util.Util, "@winglang/sdk/util", "Util"), []],
            [bigOlPublisher, []],
          ],
        });
      }
    }
    class Dummy extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static getInstance($scope, scope) {
        return new Dummy(scope, "StaticDummy");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Dummy-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class ScopeAndIdTestClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const d1 = new Dummy(this, "Dummy");
        $helpers.assert($macros.__String_endsWith(false, $helpers.nodeof(d1).path, "/ScopeAndIdTestClass/Dummy"), "nodeof(d1).path.endsWith(\"/ScopeAndIdTestClass/Dummy\")");
        const d2 = new Dummy(d1, "Dummy");
        $helpers.assert($macros.__String_endsWith(false, $helpers.nodeof(d2).path, "/ScopeAndIdTestClass/Dummy/Dummy"), "nodeof(d2).path.endsWith(\"/ScopeAndIdTestClass/Dummy/Dummy\")");
        const d3 = new Dummy((Dummy.getInstance(this, d2)), "Dummy");
        $helpers.assert($macros.__String_endsWith(false, $helpers.nodeof(d3).path, "/ScopeAndIdTestClass/Dummy/Dummy/StaticDummy/Dummy"), "nodeof(d3).path.endsWith(\"/ScopeAndIdTestClass/Dummy/Dummy/StaticDummy/Dummy\")");
        for (const i of $helpers.range(0,3,false)) {
          const x = new Dummy(this, String.raw({ raw: ["tc", ""] }, i));
          const expected_path = String.raw({ raw: ["/ScopeAndIdTestClass/tc", ""] }, i);
          $helpers.assert($macros.__String_endsWith(false, $helpers.nodeof(x).path, expected_path), "nodeof(x).path.endsWith(expected_path)");
        }
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.ScopeAndIdTestClass-1.cjs")({
          })
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    const bucket = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const res = new Bar(this, "Bar", "Arr", bucket, MyEnum.B);
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
    const bigOlPublisher = new BigPublisher(this, "BigPublisher");
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:dependency cycles", new $Closure5(this, "$Closure5"));
    new ScopeAndIdTestClass(this, "ScopeAndIdTestClass");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "resource.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


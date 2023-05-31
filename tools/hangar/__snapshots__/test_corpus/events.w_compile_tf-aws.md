# [events.w](../../../../examples/tests/valid/events.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight3;
}

```

## clients/$Inflight4.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight4;
}

```

## clients/$Inflight5.inflight.js
```js
module.exports = function({ counter, b }) {
  class $Inflight5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, event)  {
      {
        (typeof logHistory === "function" ? await logHistory(key,`${event}`,2) : await logHistory.handle(key,`${event}`,2));
      }
    }
  }
  return $Inflight5;
}

```

## clients/$Inflight6.inflight.js
```js
module.exports = function({ table, b, Util }) {
  class  $Inflight6 {
    constructor({  }) {
    }
    async handle()  {
      class Predicate {
        constructor(counterVal)  {
          this.counterVal = counterVal;
        }
        counterVal;
        static async sleep(ms)  {
          return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(ms)
        }
        async assertion()  {
          return ((await counter.peek()) === this.counterVal);
        }
        async testAssertion()  {
          let i = 0;
          while ((i < 12)) {
            i = (i + 1);
            if ((await this.assertion())) {
              {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.assertion())'`)})((await this.assertion()))};
              return;
            }
            (await Predicate.sleep((1000 * 10)));
          }
          {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.assertion())'`)})((await this.assertion()))};
        }
      }
      (await b.put("a","1"));
      (await b.put("b","1"));
      (await b.put("c","1"));
      (await b.put("b","100"));
      (await b.delete("c"));
      (await new Predicate(10).testAssertion());
    }
  }
  return $Inflight6;
}

```

## clients/Util.inflight.js
```js
module.exports = function({  }) {
  class  Util {
    constructor({  }) {
    }
    static async sleep(milli)  {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
  }
  return Util;
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
      "value": "[[\"root/Default/Default/hitCount is incremented according to the bucket event\",\"${aws_lambda_function.root_hitCountisincrementedaccordingtothebucketevent_Handler_EC2858A2.arn}\"]]"
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
      },
      "root_cloudTable_323D7643": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/Default",
            "uniqueId": "root_cloudTable_323D7643"
          }
        },
        "attribute": [
          {
            "name": "_id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "_id",
        "name": "key-historycloud.Table-c83b78a7"
      }
    },
    "aws_iam_role": {
      "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRole_5EB7D654": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-392f21a0/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRole_5EB7D654"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRole_362418ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e55b7a86/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRole_362418ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRole_CB508794": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-6c59d0f3/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRole_CB508794"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRole_70F27C7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-ea5abcfd/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRole_70F27C7C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRole_6BB36B7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-66a412ba/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRole_6BB36B7B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRole_5D83FBEA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-88f53ef3/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRole_5D83FBEA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRole",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRolePolicy_4DDE527A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-392f21a0/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRolePolicy_4DDE527A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRole_5EB7D654.name}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRolePolicy_BBB28D2B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e55b7a86/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRolePolicy_BBB28D2B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRole_362418ED.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRolePolicy_0CB041A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-6c59d0f3/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRolePolicy_0CB041A4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRole_CB508794.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRolePolicy_93B67CCE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-ea5abcfd/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRolePolicy_93B67CCE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRole_70F27C7C.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRolePolicy_AD5DEAD8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-66a412ba/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRolePolicy_AD5DEAD8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRole_6BB36B7B.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRolePolicy_F7FF2C7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-88f53ef3/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRolePolicy_F7FF2C7F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRole_5D83FBEA.name}"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_3CBCB600": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicy",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_3CBCB600"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRolePolicyAttachment_62FB3710": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-392f21a0/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRolePolicyAttachment_62FB3710"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRole_5EB7D654.name}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRolePolicyAttachment_D1E6B1AE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e55b7a86/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRolePolicyAttachment_D1E6B1AE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRole_362418ED.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRolePolicyAttachment_CF7A0938": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-6c59d0f3/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRolePolicyAttachment_CF7A0938"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRole_CB508794.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRolePolicyAttachment_DAFC7854": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-ea5abcfd/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRolePolicyAttachment_DAFC7854"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRole_70F27C7C.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRolePolicyAttachment_3ED61063": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-66a412ba/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRolePolicyAttachment_3ED61063"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRole_6BB36B7B.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRolePolicyAttachment_78516730": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-88f53ef3/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRolePolicyAttachment_78516730"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRole_5D83FBEA.name}"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_CDE69A9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_CDE69A9E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_3F3B50A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-392f21a0/Default",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_3F3B50A3"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_create-OnMessage-392f21a0-c8b1526e"
          }
        },
        "function_name": "cloud-Bucket-on_create-OnMessage-392f21a0-c8b1526e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_IamRole_5EB7D654.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_S3Object_A2380920.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_10754353": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e55b7a86/Default",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_10754353"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_create-OnMessage-e55b7a86-c83e9160"
          }
        },
        "function_name": "cloud-Bucket-on_create-OnMessage-e55b7a86-c83e9160",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_IamRole_362418ED.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_S3Object_0BE1D861.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_D52B8AC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-6c59d0f3/Default",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_D52B8AC5"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_delete-OnMessage-6c59d0f3-c874cd6e"
          }
        },
        "function_name": "cloud-Bucket-on_delete-OnMessage-6c59d0f3-c874cd6e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_IamRole_CB508794.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_S3Object_CAB4156C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_8513AC63": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-ea5abcfd/Default",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_8513AC63"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_delete-OnMessage-ea5abcfd-c891faed"
          }
        },
        "function_name": "cloud-Bucket-on_delete-OnMessage-ea5abcfd-c891faed",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_IamRole_70F27C7C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_S3Object_9E43E53E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_42005686": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-66a412ba/Default",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_42005686"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_update-OnMessage-66a412ba-c83957be"
          }
        },
        "function_name": "cloud-Bucket-on_update-OnMessage-66a412ba-c83957be",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_IamRole_6BB36B7B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_S3Object_4F5C8EA5.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_99378996": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-88f53ef3/Default",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_99378996"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_update-OnMessage-88f53ef3-c80370d2"
          }
        },
        "function_name": "cloud-Bucket-on_update-OnMessage-88f53ef3-c80370d2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_IamRole_5D83FBEA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_S3Object_6D17C056.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_EC2858A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/Default",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_EC2858A2"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "Handler-c88204a7"
          }
        },
        "function_name": "Handler-c88204a7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_24D57850.key}",
        "timeout": 480,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_871E2085": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-392f21a0/InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_871E2085"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_3F3B50A3.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_2AF431FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e55b7a86/InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_2AF431FA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_10754353.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_8D87DE4B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-6c59d0f3/InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_8D87DE4B"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_D52B8AC5.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_79D2F40D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-ea5abcfd/InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_79D2F40D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_8513AC63.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_0C8CD6D5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-66a412ba/InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_0C8CD6D5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_42005686.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_3C3255CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-88f53ef3/InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_3C3255CC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_99378996.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
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
      "root_cloudBucket_S3BucketNotification_2AEE506E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3BucketNotification",
            "uniqueId": "root_cloudBucket_S3BucketNotification_2AEE506E"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.id}",
        "depends_on": [
          "aws_sns_topic_policy.root_cloudBucket_cloudBucketondelete_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B4C9C45B",
          "aws_sns_topic_policy.root_cloudBucket_cloudBucketonupdate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B73EA539",
          "aws_sns_topic_policy.root_cloudBucket_cloudBucketoncreate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_3717A939"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
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
      "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_S3Object_A2380920": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-392f21a0/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_S3Object_A2380920"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_S3Object_0BE1D861": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e55b7a86/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_S3Object_0BE1D861"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_S3Object_CAB4156C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-6c59d0f3/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_S3Object_CAB4156C"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_S3Object_9E43E53E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-ea5abcfd/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_S3Object_9E43E53E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_S3Object_4F5C8EA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-66a412ba/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_S3Object_4F5C8EA5"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_S3Object_6D17C056": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-88f53ef3/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_S3Object_6D17C056"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_24D57850": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/S3Object",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_24D57850"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_cloudBucket_cloudBucketoncreate_B562FEB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/Default",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_B562FEB8"
          }
        },
        "name": "cloud-Bucket-on_create-c89fd668"
      },
      "root_cloudBucket_cloudBucketondelete_34EA6151": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/Default",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_34EA6151"
          }
        },
        "name": "cloud-Bucket-on_delete-c8f63fc3"
      },
      "root_cloudBucket_cloudBucketonupdate_AAD81D71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/Default",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_AAD81D71"
          }
        },
        "name": "cloud-Bucket-on_update-c8cecab7"
      }
    },
    "aws_sns_topic_policy": {
      "root_cloudBucket_cloudBucketoncreate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_3717A939": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_3717A939"
          }
        },
        "arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\"}}}]}"
      },
      "root_cloudBucket_cloudBucketondelete_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B4C9C45B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B4C9C45B"
          }
        },
        "arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\"}}}]}"
      },
      "root_cloudBucket_cloudBucketonupdate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B73EA539": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B73EA539"
          }
        },
        "arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscription392f21a0_49B8363D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/cloud.Bucket-on_create-TopicSubscription-392f21a0",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscription392f21a0_49B8363D"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessage392f21a0_3F3B50A3.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscriptione55b7a86_A8B85C96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/cloud.Bucket-on_create-TopicSubscription-e55b7a86",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscriptione55b7a86_A8B85C96"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessagee55b7a86_10754353.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscription6c59d0f3_06314A09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/cloud.Bucket-on_delete-TopicSubscription-6c59d0f3",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscription6c59d0f3_06314A09"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessage6c59d0f3_D52B8AC5.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscriptionea5abcfd_03580D6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/cloud.Bucket-on_delete-TopicSubscription-ea5abcfd",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscriptionea5abcfd_03580D6A"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessageea5abcfd_8513AC63.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscription66a412ba_B03D7D62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/cloud.Bucket-on_update-TopicSubscription-66a412ba",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscription66a412ba_B03D7D62"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessage66a412ba_42005686.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
      },
      "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscription88f53ef3_0758A917": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/cloud.Bucket-on_update-TopicSubscription-88f53ef3",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscription88f53ef3_0758A917"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessage88f53ef3_99378996.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
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
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Util.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const UtilClient = ${Util._toInflightType(this).text};
            const client = new UtilClient({
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
      static _registerTypeBind(host, ops) {
        if (ops.includes("sleep")) {
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
        const table_client = context._lift(table);
        const idsCounter_client = context._lift(idsCounter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            table: ${table_client},
            idsCounter: ${idsCounter_client},
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
          $Inflight1._registerBindObject(idsCounter, host, []);
          $Inflight1._registerBindObject(table, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(idsCounter, host, ["inc"]);
          $Inflight1._registerBindObject(table, host, ["insert"]);
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
        const logHistory_client = context._lift(logHistory);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
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
          $Inflight2._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js".replace(/\\/g, "/");
        const logHistory_client = context._lift(logHistory);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
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
          $Inflight3._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight3._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight4.inflight.js".replace(/\\/g, "/");
        const logHistory_client = context._lift(logHistory);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
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
          $Inflight4._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight4._registerBindObject(logHistory, host, ["handle"]);
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
        const logHistory_client = context._lift(logHistory);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
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
          $Inflight5._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight5._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight6.inflight.js".replace(/\\/g, "/");
        const table_client = context._lift(table);
        const b_client = context._lift(b);
        const UtilClient = Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            table: ${table_client},
            b: ${b_client},
            Util: ${UtilClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight6Client = ${$Inflight6._toInflightType(this).text};
            const client = new $Inflight6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight6._registerBindObject(b, host, []);
          $Inflight6._registerBindObject(table, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight6._registerBindObject(Util, host, ["sleep"]);
          $Inflight6._registerBindObject(b, host, ["delete", "put"]);
          $Inflight6._registerBindObject(table, host, ["list"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const idsCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{
    "name": "key-history",
    "primaryKey": "_id",
    "columns": Object.freeze({"_id":cloud.ColumnType.STRING,"key":cloud.ColumnType.STRING,"operation":cloud.ColumnType.STRING,"source":cloud.ColumnType.NUMBER}),}
    );
    const logHistory = new $Inflight1(this,"$Inflight1");
    (b.onDelete(new $Inflight2(this,"$Inflight2")));
    (b.onUpdate(new $Inflight3(this,"$Inflight3")));
    (b.onCreate(new $Inflight4(this,"$Inflight4")));
    (b.onEvent(new $Inflight5(this,"$Inflight5")));
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"hitCount is incremented according to the bucket event",new $Inflight6(this,"$Inflight6"),{
    "timeout": $stdlib.std.Duration.fromSeconds(480),}
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "events", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


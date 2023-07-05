# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ res }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await res.myPut());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ Another }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: Another.myStaticMethod() == 0")})(((await Another.myStaticMethod()) === 0))};
    }
  }
  return $Closure2;
}

```

## inflight.Another.js
```js
module.exports = function({ globalCounter }) {
  class Another {
    constructor({ first, myField }) {
      this.first = first;
      this.myField = myField;
    }
    async $inflight_init()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: globalCounter.peek() == 0")})(((await globalCounter.peek()) === 0))};
    }
    async myMethod()  {
      (await globalCounter.inc());
      return (await globalCounter.peek());
    }
    static async myStaticMethod()  {
      return (await globalCounter.peek());
    }
  }
  return Another;
}

```

## inflight.First.js
```js
module.exports = function({  }) {
  class First {
    constructor({ myResource }) {
      this.myResource = myResource;
    }
    async $inflight_init()  {
    }
  }
  return First;
}

```

## inflight.MyResource.js
```js
module.exports = function({ globalBucket, globalStr, globalBool, globalNum, globalArrayOfStr, globalMapOfNum, globalSetOfStr, globalAnother, Another }) {
  class MyResource {
    constructor({ localCounter, localTopic }) {
      this.localCounter = localCounter;
      this.localTopic = localTopic;
    }
    async $inflight_init()  {
    }
    async myPut()  {
      (await this.localTopic.publish("hello"));
      (await globalBucket.put("key","value"));
      {((cond) => {if (!cond) throw new Error("assertion failed: globalStr == \"hello\"")})((globalStr === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalBool == true")})((globalBool === true))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalNum == 42")})((globalNum === 42))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalArrayOfStr.at(0) == \"hello\"")})(((await globalArrayOfStr.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalMapOfNum.get(\"a\") == -5")})(((globalMapOfNum)["a"] === (-5)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalSetOfStr.has(\"a\")")})((await globalSetOfStr.has("a")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalAnother.myField == \"hello!\"")})((globalAnother.myField === "hello!"))};
      (await globalAnother.first.myResource.put("key","value"));
      {((cond) => {if (!cond) throw new Error("assertion failed: globalAnother.myMethod() > 0")})(((await globalAnother.myMethod()) > 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Another.myStaticMethod() > 0")})(((await Another.myStaticMethod()) > 0))};
    }
  }
  return MyResource;
}

```

## inflight.R.js
```js
module.exports = function({ globalCounter, $parentThis }) {
  class R {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await globalCounter.inc());
      (await $parentThis.localCounter.inc());
    }
  }
  return R;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.root_testtest_Handler_046C3415.arn}\"],[\"root/Default/Default/test:access cloud resource through static methods only\",\"${aws_lambda_function.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_90784797.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_MyResource_cloudCounter_B6FF7B6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "root_MyResource_cloudCounter_B6FF7B6A"
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
        "name": "wing-counter-cloud.Counter-c87187fa"
      },
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
      "root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRole",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRole",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD"
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
      "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicy_389E9A62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRolePolicy",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicy_389E9A62"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[],\"Resource\":[\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}\",\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54.name}"
      },
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_2AD210AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRolePolicy",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_2AD210AF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD.name}"
      },
      "root_testtest_Handler_IamRolePolicy_65A1D8BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "root_testtest_Handler_IamRolePolicy_65A1D8BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}\",\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicyAttachment_B9171011": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRolePolicyAttachment",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicyAttachment_B9171011"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54.name}"
      },
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B013CEF2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B013CEF2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD.name}"
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
    "aws_lambda_function": {
      "root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/Default",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_ae5b06c6": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.name}",
            "TOPIC_ARN_53de52bf": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-f10eb240-c8df2c86",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-f10eb240-c8df2c86",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_MyResource_cloudTopicOnMessagef10eb240_S3Object_7458F840.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_90784797": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/Default",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_90784797"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8de1ef1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8de1ef1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_6B8CBEFD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_2C11A1C8.key}",
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
            "BUCKET_NAME_ae5b06c6": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.name}",
            "TOPIC_ARN_53de52bf": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}",
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws"
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
      "root_MyResource_cloudTopicOnMessagef10eb240_InvokePermissionc8f2c43e88c72aa87b4192974983c81bf653de52bf_BEBFCC54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_InvokePermissionc8f2c43e88c72aa87b4192974983c81bf653de52bf_BEBFCC54"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}"
      }
    },
    "aws_s3_bucket": {
      "root_Another_First_cloudBucket_B4A67079": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Default",
            "uniqueId": "root_Another_First_cloudBucket_B4A67079"
          }
        },
        "bucket_prefix": "cloud-bucket-c84d72a1-",
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
    "aws_s3_bucket_public_access_block": {
      "root_Another_First_cloudBucket_PublicAccessBlock_E03A84DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_Another_First_cloudBucket_PublicAccessBlock_E03A84DE"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
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
      "root_Another_First_cloudBucket_Encryption_1049825A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "root_Another_First_cloudBucket_Encryption_1049825A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
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
      "root_MyResource_cloudTopicOnMessagef10eb240_S3Object_7458F840": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/S3Object",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_S3Object_7458F840"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_2C11A1C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/S3Object",
            "uniqueId": "root_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_2C11A1C8"
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
      "root_MyResource_cloudTopic_F71B23B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/Default",
            "uniqueId": "root_MyResource_cloudTopic_F71B23B1"
          }
        },
        "name": "cloud-Topic-c8f2c43e"
      }
    },
    "aws_sns_topic_subscription": {
      "root_MyResource_cloudTopic_cloudTopicTopicSubscriptionf10eb240_334AAAEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/cloud.Topic-TopicSubscription-f10eb240",
            "uniqueId": "root_MyResource_cloudTopic_cloudTopicTopicSubscriptionf10eb240_334AAAEE"
          }
        },
        "endpoint": "${aws_lambda_function.root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}"
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
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.First.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const myResource_client = this._lift(this.myResource);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FirstClient = ${First._toInflightType(this).text};
            const client = new FirstClient({
              myResource: ${myResource_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          First._registerBindObject(this.myResource, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.myField = "hello!";
        this.first = new First(this,"First");
        this._addInflightOps("myMethod", "myStaticMethod");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Another.js";
        const globalCounter_client = context._lift(globalCounter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            globalCounter: ${globalCounter_client},
          })
        `);
      }
      _toInflight() {
        const first_client = this._lift(this.first);
        const myField_client = this._lift(this.myField);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
              first: ${first_client},
              myField: ${myField_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Another._registerBindObject(globalCounter, host, ["peek"]);
          Another._registerBindObject(this.first, host, []);
          Another._registerBindObject(this.myField, host, []);
        }
        if (ops.includes("myMethod")) {
          Another._registerBindObject(globalCounter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("myStaticMethod")) {
          Another._registerBindObject(globalCounter, host, ["peek"]);
        }
        super._registerTypeBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.localTopic = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        this.localCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
        const $parentThis = this;
        class R extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.R.js";
            const globalCounter_client = context._lift(globalCounter);
            const $parentThis_client = context._lift($parentThis);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                globalCounter: ${globalCounter_client},
                $parentThis: ${$parentThis_client},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const RClient = ${R._toInflightType(this).text};
                const client = new RClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
              R._registerBindObject($parentThis, host, []);
              R._registerBindObject(globalCounter, host, []);
            }
            if (ops.includes("handle")) {
              R._registerBindObject($parentThis.localCounter, host, ["inc"]);
              R._registerBindObject(globalCounter, host, ["inc"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.localTopic.onMessage(new R(this,"R")));
        this._addInflightOps("myPut");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.MyResource.js";
        const globalBucket_client = context._lift(globalBucket);
        const globalStr_client = context._lift(globalStr);
        const globalBool_client = context._lift(globalBool);
        const globalNum_client = context._lift(globalNum);
        const globalArrayOfStr_client = context._lift(globalArrayOfStr);
        const globalMapOfNum_client = context._lift(globalMapOfNum);
        const globalSetOfStr_client = context._lift(globalSetOfStr);
        const globalAnother_client = context._lift(globalAnother);
        const AnotherClient = Another._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            globalBucket: ${globalBucket_client},
            globalStr: ${globalStr_client},
            globalBool: ${globalBool_client},
            globalNum: ${globalNum_client},
            globalArrayOfStr: ${globalArrayOfStr_client},
            globalMapOfNum: ${globalMapOfNum_client},
            globalSetOfStr: ${globalSetOfStr_client},
            globalAnother: ${globalAnother_client},
            Another: ${AnotherClient.text},
          })
        `);
      }
      _toInflight() {
        const localCounter_client = this._lift(this.localCounter);
        const localTopic_client = this._lift(this.localTopic);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              localCounter: ${localCounter_client},
              localTopic: ${localTopic_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(globalAnother, host, []);
          MyResource._registerBindObject(globalArrayOfStr, host, []);
          MyResource._registerBindObject(globalBool, host, []);
          MyResource._registerBindObject(globalBucket, host, []);
          MyResource._registerBindObject(globalMapOfNum, host, []);
          MyResource._registerBindObject(globalNum, host, []);
          MyResource._registerBindObject(globalSetOfStr, host, []);
          MyResource._registerBindObject(globalStr, host, []);
          MyResource._registerBindObject(this.localCounter, host, []);
          MyResource._registerBindObject(this.localTopic, host, []);
        }
        if (ops.includes("myPut")) {
          MyResource._registerBindObject(Another, host, ["myStaticMethod"]);
          MyResource._registerBindObject(globalAnother, host, ["myMethod"]);
          MyResource._registerBindObject(globalAnother.first.myResource, host, ["put"]);
          MyResource._registerBindObject(globalAnother.myField, host, []);
          MyResource._registerBindObject(globalArrayOfStr, host, ["at"]);
          MyResource._registerBindObject(globalBool, host, []);
          MyResource._registerBindObject(globalBucket, host, ["put"]);
          MyResource._registerBindObject(globalMapOfNum, host, ["get"]);
          MyResource._registerBindObject(globalNum, host, []);
          MyResource._registerBindObject(globalSetOfStr, host, ["has"]);
          MyResource._registerBindObject(globalStr, host, []);
          MyResource._registerBindObject(this.localTopic, host, ["publish"]);
        }
        super._registerBind(host, ops);
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            res: ${res_client},
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
          $Closure1._registerBindObject(res, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(res, host, ["myPut"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const AnotherClient = Another._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Another: ${AnotherClient.text},
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
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(Another, host, ["myStaticMethod"]);
        }
        super._registerBind(host, ops);
      }
    }
    const globalBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const globalCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const globalStr = "hello";
    const globalBool = true;
    const globalNum = 42;
    const globalArrayOfStr = Object.freeze(["hello", "world"]);
    const globalMapOfNum = Object.freeze({"a":(-5),"b":2});
    const globalSetOfStr = Object.freeze(new Set(["a", "b"]));
    const globalAnother = new Another(this,"Another");
    const res = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access cloud resource through static methods only",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource_captures_globals", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


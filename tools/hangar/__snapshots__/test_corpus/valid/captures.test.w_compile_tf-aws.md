# [captures.test.w](../../../../../examples/tests/valid/captures.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $bucket1, $bucket2, $bucket3 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      (await $bucket1.put("file.txt", "data"));
      (await $bucket2.get("file.txt"));
      (await $bucket2.get("file2.txt"));
      (await $bucket3.get("file3.txt"));
      for (const stuff of (await $bucket1.list())) {
        {console.log(stuff)};
      }
      {console.log((await $bucket2.publicUrl("file.txt")))};
      try {
        (await $bucket1.publicUrl("file.txt"));
      }
      catch ($error_error) {
        const error = $error_error.message;
        {console.log(error)};
      }
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $handler }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      (await $handler(event));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $headers }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"status": 200, "headers": $headers, "body": "Hello, world!"});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
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
          "Default": {
            "cloud.Api": {
              "Endpoint": {
                "Url": "cloudApi_Endpoint_Url_CD8AC9A6"
              }
            }
          }
        }
      }
    }
  },
  "data": {
    "aws_region": {
      "Region": {
        "//": {
          "metadata": {
            "path": "root/Default/Region",
            "uniqueId": "Region"
          }
        }
      }
    }
  },
  "output": {
    "cloudApi_Endpoint_Url_CD8AC9A6": {
      "value": "https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "cloudApi_api_deployment_545514BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/deployment",
            "uniqueId": "cloudApi_api_deployment_545514BF"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.cloudApi_api_2B334D75.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello\":{\"get\":{\"operationId\":\"get-hello\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_hello_0_2F9F5F19.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "cloudApi_api_stage_BBB283E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "cloudApi_api_stage_BBB283E4"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.cloudApi_api_deployment_545514BF.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "AnotherFunction_CloudwatchLogGroup_DE8459FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/CloudwatchLogGroup",
            "uniqueId": "AnotherFunction_CloudwatchLogGroup_DE8459FC"
          }
        },
        "name": "/aws/lambda/AnotherFunction-c88d2a81",
        "retention_in_days": 30
      },
      "cloudApi_get_hello_0_CloudwatchLogGroup_332ABC56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_hello_0_CloudwatchLogGroup_332ABC56"
          }
        },
        "name": "/aws/lambda/get_hello_-0-c8ed7599",
        "retention_in_days": 30
      },
      "cloudFunction_CloudwatchLogGroup_7399B890": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "cloudFunction_CloudwatchLogGroup_7399B890"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8d2eca1",
        "retention_in_days": 30
      },
      "cloudQueue-SetConsumer0_CloudwatchLogGroup_FCFCF419": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/CloudwatchLogGroup",
            "uniqueId": "cloudQueue-SetConsumer0_CloudwatchLogGroup_FCFCF419"
          }
        },
        "name": "/aws/lambda/cloud-Queue-SetConsumer0-c8b576c9",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "AnotherFunction_IamRole_74447271": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/IamRole",
            "uniqueId": "AnotherFunction_IamRole_74447271"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_hello_0_IamRole_AF63D6EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_}0/IamRole",
            "uniqueId": "cloudApi_get_hello_0_IamRole_AF63D6EC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudFunction_IamRole_5A4430DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "cloudFunction_IamRole_5A4430DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudQueue-SetConsumer0_IamRole_968DB138": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRole",
            "uniqueId": "cloudQueue-SetConsumer0_IamRole_968DB138"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "AnotherFunction_IamRolePolicy_5A9BEFB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/IamRolePolicy",
            "uniqueId": "AnotherFunction_IamRolePolicy_5A9BEFB1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.PublicBucket.arn}\",\"${aws_s3_bucket.PublicBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.PrivateBucket.arn}\",\"${aws_s3_bucket.PrivateBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.AnotherFunction_IamRole_74447271.name}"
      },
      "cloudApi_get_hello_0_IamRolePolicy_0D701926": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_hello_0_IamRolePolicy_0D701926"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_hello_0_IamRole_AF63D6EC.name}"
      },
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.PublicBucket.arn}\",\"${aws_s3_bucket.PublicBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.PrivateBucket.arn}\",\"${aws_s3_bucket.PrivateBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      },
      "cloudQueue-SetConsumer0_IamRolePolicy_3E29E517": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRolePolicy",
            "uniqueId": "cloudQueue-SetConsumer0_IamRolePolicy_3E29E517"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.PublicBucket.arn}\",\"${aws_s3_bucket.PublicBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.PrivateBucket.arn}\",\"${aws_s3_bucket.PrivateBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "AnotherFunction_IamRolePolicyAttachment_06C77F44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/IamRolePolicyAttachment",
            "uniqueId": "AnotherFunction_IamRolePolicyAttachment_06C77F44"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.AnotherFunction_IamRole_74447271.name}"
      },
      "cloudApi_get_hello_0_IamRolePolicyAttachment_65673571": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_hello_0_IamRolePolicyAttachment_65673571"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_hello_0_IamRole_AF63D6EC.name}"
      },
      "cloudFunction_IamRolePolicyAttachment_288B9653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction_IamRolePolicyAttachment_288B9653"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      },
      "cloudQueue-SetConsumer0_IamRolePolicyAttachment_B207137A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue-SetConsumer0_IamRolePolicyAttachment_B207137A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "cloudQueue_EventSourceMapping_41814136": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "cloudQueue_EventSourceMapping_41814136"
          }
        },
        "batch_size": 5,
        "event_source_arn": "${aws_sqs_queue.cloudQueue.arn}",
        "function_name": "${aws_lambda_function.cloudQueue-SetConsumer0.function_name}"
      }
    },
    "aws_lambda_function": {
      "AnotherFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/Default",
            "uniqueId": "AnotherFunction"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_0c557d45": "${aws_s3_bucket.PrivateBucket.bucket}",
            "BUCKET_NAME_21bd2572": "${aws_s3_bucket.PublicBucket.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "AnotherFunction-c88d2a81",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "AnotherFunction-c88d2a81",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.AnotherFunction_IamRole_74447271.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.AnotherFunction_S3Object_6987727B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_hello_0_2F9F5F19": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_}0/Default",
            "uniqueId": "cloudApi_get_hello_0_2F9F5F19"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_hello_-0-c8ed7599",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_hello_-0-c8ed7599",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_hello_0_IamRole_AF63D6EC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_hello_0_S3Object_B8DCD8E8.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "cloudFunction"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_0c557d45": "${aws_s3_bucket.PrivateBucket.bucket}",
            "BUCKET_NAME_21bd2572": "${aws_s3_bucket.PublicBucket.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudQueue-SetConsumer0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/Default",
            "uniqueId": "cloudQueue-SetConsumer0"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_0c557d45": "${aws_s3_bucket.PrivateBucket.bucket}",
            "BUCKET_NAME_21bd2572": "${aws_s3_bucket.PublicBucket.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer0-c8b576c9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer0-c8b576c9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudQueue-SetConsumer0_IamRole_968DB138.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer0_S3Object_52D070FF.key}",
        "timeout": "${aws_sqs_queue.cloudQueue.visibility_timeout_seconds}",
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-df16733f_0EEF8FF5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-df16733f",
            "uniqueId": "cloudApi_api_permission-GET-df16733f_0EEF8FF5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_hello_0_2F9F5F19.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/hello",
        "statement_id": "AllowExecutionFromAPIGateway-GET-df16733f"
      }
    },
    "aws_s3_bucket": {
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "PrivateBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PrivateBucket/Default",
            "uniqueId": "PrivateBucket"
          }
        },
        "bucket_prefix": "privatebucket-c8a9b08c-",
        "force_destroy": false
      },
      "PublicBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/Default",
            "uniqueId": "PublicBucket"
          }
        },
        "bucket_prefix": "publicbucket-c8fea5d9-",
        "force_destroy": false
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
    "aws_s3_bucket_policy": {
      "PublicBucket_PublicPolicy_771B9F9A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/PublicPolicy",
            "uniqueId": "PublicBucket_PublicPolicy_771B9F9A"
          }
        },
        "bucket": "${aws_s3_bucket.PublicBucket.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.PublicBucket_PublicAccessBlock_4FE1A1A3"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.PublicBucket.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "PublicBucket_PublicAccessBlock_4FE1A1A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/PublicAccessBlock",
            "uniqueId": "PublicBucket_PublicAccessBlock_4FE1A1A3"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.PublicBucket.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
      }
    },
    "aws_s3_object": {
      "AnotherFunction_S3Object_6987727B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/S3Object",
            "uniqueId": "AnotherFunction_S3Object_6987727B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_hello_0_S3Object_B8DCD8E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_}0/S3Object",
            "uniqueId": "cloudApi_get_hello_0_S3Object_B8DCD8E8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudFunction_S3Object_71908BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "cloudFunction_S3Object_71908BAD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudQueue-SetConsumer0_S3Object_52D070FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer0/S3Object",
            "uniqueId": "cloudQueue-SetConsumer0_S3Object_52D070FF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c86e03d8",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $bucket1: ${$stdlib.core.liftObject(bucket1)},
            $bucket2: ${$stdlib.core.liftObject(bucket2)},
            $bucket3: ${$stdlib.core.liftObject(bucket3)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(bucket1, host, ["list", "publicUrl", "put"]);
          $Closure1._registerOnLiftObject(bucket2, host, ["get", "publicUrl"]);
          $Closure1._registerOnLiftObject(bucket3, host, ["get"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure2-1.js")({
            $handler: ${$stdlib.core.liftObject(handler)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(handler, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure3-1.js")({
            $headers: ${$stdlib.core.liftObject(headers)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(headers, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const bucket1 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const bucket2 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "PublicBucket", ({"public": true}));
    const bucket3 = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "PrivateBucket", { public: false });
    const queue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "cloud.Queue");
    const handler = new $Closure1(this, "$Closure1");
    (queue.setConsumer(new $Closure2(this, "$Closure2"), { batchSize: 5 }));
    this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function", handler, { env: ({}) });
    const emptyEnv = ({});
    this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "AnotherFunction", handler, { env: emptyEnv });
    const headers = ({["my-fancy-header"]: "my-fancy-value", ["not-even-real\""]: "wow` !"});
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
    (api.get("/hello", new $Closure3(this, "$Closure3")));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "captures.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


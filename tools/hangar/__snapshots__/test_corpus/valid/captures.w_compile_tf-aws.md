# [captures.w](../../../../../examples/tests/valid/captures.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $bucket1, $bucket2, $bucket3 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      (await $bucket1.put("file.txt","data"));
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

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $headers }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"status": 200,"headers": $headers,"body": "Hello, world!"});
    }
  }
  return $Closure2;
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
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello\":{\"get\":{\"operationId\":\"get-hello\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-86898773_701F5CA7.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"consumes\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404}\"},\"responses\":{\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode: 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F"
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
      "cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/IamRole",
            "uniqueId": "cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828"
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
      "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicy_DAC639E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicy_DAC639E5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F.name}"
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
      "cloudQueue-SetConsumer-cdafee6e_IamRolePolicy_37133937": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudQueue-SetConsumer-cdafee6e_IamRolePolicy_37133937"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.cloudQueue.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.PublicBucket.arn}\",\"${aws_s3_bucket.PublicBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.PrivateBucket.arn}\",\"${aws_s3_bucket.PrivateBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828.name}"
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
      "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicyAttachment_6E485A17": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_IamRolePolicyAttachment_6E485A17"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F.name}"
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
      "cloudQueue-SetConsumer-cdafee6e_IamRolePolicyAttachment_45079F65": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudQueue-SetConsumer-cdafee6e_IamRolePolicyAttachment_45079F65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828.name}"
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
        "function_name": "${aws_lambda_function.cloudQueue-SetConsumer-cdafee6e.function_name}"
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
            "WING_FUNCTION_NAME": "AnotherFunction-c88d2a81",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "AnotherFunction-c88d2a81",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.AnotherFunction_IamRole_74447271.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.AnotherFunction_S3Object_6987727B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_cloudApi-OnRequest-86898773_701F5CA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_701F5CA7"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-86898773-c8ed6547",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-86898773-c8ed6547",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-86898773_IamRole_6300C24F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-86898773_S3Object_12D28469.key}",
        "timeout": 30,
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
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudQueue-SetConsumer-cdafee6e": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/Default",
            "uniqueId": "cloudQueue-SetConsumer-cdafee6e"
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
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-cdafee6e-c8eb6a09",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-cdafee6e-c8eb6a09",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudQueue-SetConsumer-cdafee6e_S3Object_8868B9FB.key}",
        "timeout": 30,
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
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-86898773_701F5CA7.function_name}",
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
    "aws_s3_bucket_server_side_encryption_configuration": {
      "PrivateBucket_Encryption_38F5F83C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PrivateBucket/Encryption",
            "uniqueId": "PrivateBucket_Encryption_38F5F83C"
          }
        },
        "bucket": "${aws_s3_bucket.PrivateBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "PublicBucket_Encryption_4F6F735E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/Encryption",
            "uniqueId": "PublicBucket_Encryption_4F6F735E"
          }
        },
        "bucket": "${aws_s3_bucket.PublicBucket.bucket}",
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
      "cloudApi_cloudApi-OnRequest-86898773_S3Object_12D28469": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-86898773_S3Object_12D28469"
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
      "cloudQueue-SetConsumer-cdafee6e_S3Object_8868B9FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-SetConsumer-cdafee6e/S3Object",
            "uniqueId": "cloudQueue-SetConsumer-cdafee6e_S3Object_8868B9FB"
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
        "name": "cloud-Queue-c86e03d8"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $bucket1: ${context._lift(bucket1)},
            $bucket2: ${context._lift(bucket2)},
            $bucket3: ${context._lift(bucket3)},
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
          $Closure1._registerBindObject(bucket1, host, ["list", "publicUrl", "put"]);
          $Closure1._registerBindObject(bucket2, host, ["get", "publicUrl"]);
          $Closure1._registerBindObject(bucket3, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $headers: ${context._lift(headers)},
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
          $Closure2._registerBindObject(headers, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PublicBucket",({"public": true}));
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PrivateBucket",{ public: false });
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $Closure1(this,"$Closure1");
    (queue.setConsumer(handler,{ batchSize: 5 }));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",handler,{ env: ({}) });
    const emptyEnv = ({});
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"AnotherFunction",handler,{ env: emptyEnv });
    const headers = ({"my-fancy-header": "my-fancy-value","not-even-real\"": "wow` !"});
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    (api.get("/hello",new $Closure2(this,"$Closure2")));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "captures", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


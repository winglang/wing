# [website_with_api.w](../../../../../examples/tests/valid/website_with_api.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $std_Json, $usersTable }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([({"users": (await $usersTable.list())})]),"status": 200});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $std_Json, $usersTable }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const body = (JSON.parse((req.body ?? ((args) => { return JSON.stringify(args[0], null, args[1]) })([({"name": "","age": "","id": ""})]))));
      if ((((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((body)["name"],"")) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((body)["age"],""))) || (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((body)["id"],"")))) {
        return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([({"error": "incomplete details"})]),"status": 400});
      }
      (await $usersTable.insert(((args) => { return JSON.stringify(args[0], null, args[1]) })([(body)["id"]]),body));
      return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([({"user": (body)["id"]})]),"status": 201});
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"headers": ({"Access-Control-Allow-Headers": "Content-Type","Access-Control-Allow-Origin": "*","Access-Control-Allow-Methods": "OPTIONS,POST,GET"}),"status": 204});
    }
  }
  return $Closure3;
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
  "data": {
    "aws_iam_policy_document": {
      "undefined_cloudWebsite_AllowDistributionReadOnly_77DF4812": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/AllowDistributionReadOnly",
            "uniqueId": "undefined_cloudWebsite_AllowDistributionReadOnly_77DF4812"
          }
        },
        "statement": [
          {
            "actions": [
              "s3:GetObject"
            ],
            "condition": [
              {
                "test": "StringEquals",
                "values": [
                  "${aws_cloudfront_distribution.undefined_cloudWebsite_Distribution_1CA30B8E.arn}"
                ],
                "variable": "AWS:SourceArn"
              }
            ],
            "principals": [
              {
                "identifiers": [
                  "cloudfront.amazonaws.com"
                ],
                "type": "Service"
              }
            ],
            "resources": [
              "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.arn}/*"
            ]
          }
        ]
      }
    },
    "aws_region": {
      "undefined_Region_1B664D6B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Region",
            "uniqueId": "undefined_Region_1B664D6B"
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
      "undefined_cloudApi_api_deployment_CC787C1B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/deployment",
            "uniqueId": "undefined_cloudApi_api_deployment_CC787C1B"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.id}",
        "triggers": {
          "redeployment": "cdd4e9e04bfdff956629a1812b4cef862849e475"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "undefined_cloudApi_api_3000E149": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/api",
            "uniqueId": "undefined_cloudApi_api_3000E149"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.undefined_Region_1B664D6B.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"post\":{\"operationId\":\"post-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.undefined_Region_1B664D6B.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-b378226f_386E3006.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"options\":{\"operationId\":\"options-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.undefined_Region_1B664D6B.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-a797f2c0_9107485A.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c8c76c9d"
      }
    },
    "aws_api_gateway_stage": {
      "undefined_cloudApi_api_stage_A2D24536": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/stage",
            "uniqueId": "undefined_cloudApi_api_stage_A2D24536"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.undefined_cloudApi_api_deployment_CC787C1B.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudfront_distribution": {
      "undefined_cloudWebsite_Distribution_1CA30B8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/Distribution",
            "uniqueId": "undefined_cloudWebsite_Distribution_1CA30B8E"
          }
        },
        "default_cache_behavior": {
          "allowed_methods": [
            "GET",
            "HEAD"
          ],
          "cached_methods": [
            "GET",
            "HEAD"
          ],
          "compress": true,
          "default_ttl": 3600,
          "forwarded_values": {
            "cookies": {
              "forward": "none"
            },
            "query_string": false
          },
          "max_ttl": 86400,
          "min_ttl": 0,
          "target_origin_id": "s3Origin",
          "viewer_protocol_policy": "redirect-to-https"
        },
        "default_root_object": "index.html",
        "enabled": true,
        "origin": [
          {
            "domain_name": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.undefined_cloudWebsite_CloudfrontOac_59E8E5A1.id}",
            "origin_id": "s3Origin"
          }
        ],
        "price_class": "PriceClass_100",
        "restrictions": {
          "geo_restriction": {
            "locations": [],
            "restriction_type": "none"
          }
        },
        "viewer_certificate": {
          "cloudfront_default_certificate": true
        }
      }
    },
    "aws_cloudfront_origin_access_control": {
      "undefined_cloudWebsite_CloudfrontOac_59E8E5A1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/CloudfrontOac",
            "uniqueId": "undefined_cloudWebsite_CloudfrontOac_59E8E5A1"
          }
        },
        "name": "cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_dynamodb_table": {
      "undefined_exTable_DEFCFB8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/ex.Table/Default",
            "uniqueId": "undefined_exTable_DEFCFB8E"
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
        "name": "users-tableex.Table-c8865529"
      }
    },
    "aws_iam_role": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRole",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRole_2182CE33": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-a797f2c0/IamRole",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRole_2182CE33"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRole_009D3506": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-b378226f/IamRole",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRole_009D3506"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicy_2E3DCD14": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicy_2E3DCD14"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRolePolicy_3E414651": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-a797f2c0/IamRolePolicy",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRolePolicy_3E414651"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRole_2182CE33.name}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRolePolicy_4CC6E5E2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-b378226f/IamRolePolicy",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRolePolicy_4CC6E5E2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRole_009D3506.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicyAttachment_66336CBE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicyAttachment_66336CBE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRolePolicyAttachment_257EA05E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-a797f2c0/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRolePolicyAttachment_257EA05E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRole_2182CE33.name}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRolePolicyAttachment_BFD2840E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-b378226f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRolePolicyAttachment_BFD2840E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRole_009D3506.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/Default",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "id",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-83b2983f-c853749c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-83b2983f-c853749c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudApi_cloudApi-OnRequest-83b2983f_S3Object_647788A1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_9107485A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-a797f2c0/Default",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_9107485A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-a797f2c0-c8f61c08",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-a797f2c0-c8f61c08",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-a797f2c0_IamRole_2182CE33.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudApi_cloudApi-OnRequest-a797f2c0_S3Object_83422550.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudApi_cloudApi-OnRequest-b378226f_386E3006": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-b378226f/Default",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-b378226f_386E3006"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "id",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-b378226f-c87f41e5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-b378226f-c87f41e5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-b378226f_IamRole_009D3506.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudApi_cloudApi-OnRequest-b378226f_S3Object_029F9433.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_cloudApi_api_permission-GET-41f0e61d_F80D6487": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/permission-GET-41f0e61d",
            "uniqueId": "undefined_cloudApi_api_permission-GET-41f0e61d_F80D6487"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.execution_arn}/*/GET/users",
        "statement_id": "AllowExecutionFromAPIGateway-GET-41f0e61d"
      },
      "undefined_cloudApi_api_permission-OPTIONS-41f0e61d_9A946A3E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/permission-OPTIONS-41f0e61d",
            "uniqueId": "undefined_cloudApi_api_permission-OPTIONS-41f0e61d_9A946A3E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-a797f2c0_9107485A.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.execution_arn}/*/OPTIONS/users",
        "statement_id": "AllowExecutionFromAPIGateway-OPTIONS-41f0e61d"
      },
      "undefined_cloudApi_api_permission-POST-41f0e61d_E3A809A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/permission-POST-41f0e61d",
            "uniqueId": "undefined_cloudApi_api_permission-POST-41f0e61d_E3A809A9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-b378226f_386E3006.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.execution_arn}/*/POST/users",
        "statement_id": "AllowExecutionFromAPIGateway-POST-41f0e61d"
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      },
      "undefined_cloudWebsite_WebsiteBucket_6AF09691": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/WebsiteBucket",
            "uniqueId": "undefined_cloudWebsite_WebsiteBucket_6AF09691"
          }
        },
        "bucket_prefix": "cloud-website-c8a0a3b5-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "undefined_cloudWebsite_DistributionS3BucketPolicy_63A56202": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/DistributionS3BucketPolicy",
            "uniqueId": "undefined_cloudWebsite_DistributionS3BucketPolicy_63A56202"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.id}",
        "policy": "${data.aws_iam_policy_document.undefined_cloudWebsite_AllowDistributionReadOnly_77DF4812.json}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_cloudWebsite_PublicAccessBlock_FEA8B01D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/PublicAccessBlock",
            "uniqueId": "undefined_cloudWebsite_PublicAccessBlock_FEA8B01D"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_cloudWebsite_Encryption_D10D0AD9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/Encryption",
            "uniqueId": "undefined_cloudWebsite_Encryption_D10D0AD9"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_bucket_website_configuration": {
      "undefined_cloudWebsite_BucketWebsiteConfiguration_5EFCE1BD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/BucketWebsiteConfiguration",
            "uniqueId": "undefined_cloudWebsite_BucketWebsiteConfiguration_5EFCE1BD"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_S3Object_647788A1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/S3Object",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_S3Object_647788A1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_S3Object_83422550": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-a797f2c0/S3Object",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-a797f2c0_S3Object_83422550"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudApi_cloudApi-OnRequest-b378226f_S3Object_029F9433": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-b378226f/S3Object",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-b378226f_S3Object_029F9433"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudWebsite_File--indexhtml_D4B858B4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/File--index.html",
            "uniqueId": "undefined_cloudWebsite_File--indexhtml_D4B858B4"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691"
        ],
        "key": "/index.html",
        "source": "<SOURCE>"
      },
      "undefined_cloudWebsite_File-configjson_AD240E0F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Website/File-config.json",
            "uniqueId": "undefined_cloudWebsite_File-configjson_AD240E0F"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691.bucket}",
        "content": "{\"apiUrl\":\"${aws_api_gateway_stage.undefined_cloudApi_api_stage_A2D24536.invoke_url}\"}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.undefined_cloudWebsite_WebsiteBucket_6AF09691"
        ],
        "key": "config.json"
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
const ex = $stdlib.ex;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $std_Json: ${context._lift(std.Json)},
            $usersTable: ${context._lift(usersTable)},
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
          $Closure1._registerBindObject(usersTable, host, ["list"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $std_Json: ${context._lift(std.Json)},
            $usersTable: ${context._lift(usersTable)},
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
          $Closure2._registerBindObject(usersTable, host, ["insert"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
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
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const website = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website_with_api" });
    const usersTable = this.node.root.newAbstract("@winglang/sdk.ex.Table",this,"ex.Table",{ name: "users-table", primaryKey: "id", columns: ({"id": ex.ColumnType.STRING,"name": ex.ColumnType.STRING,"age": ex.ColumnType.NUMBER}) });
    const getHandler = new $Closure1(this,"$Closure1");
    const postHandler = new $Closure2(this,"$Closure2");
    const optionsHandler = new $Closure3(this,"$Closure3");
    (api.get("/users",getHandler));
    (api.post("/users",postHandler));
    (api.options("/users",optionsHandler));
    (website.addJson("config.json",({"apiUrl": api.url})));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "website_with_api", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


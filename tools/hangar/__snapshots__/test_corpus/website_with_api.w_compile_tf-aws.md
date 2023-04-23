# [website_with_api.w](../../../../examples/tests/valid/website_with_api.w) | compile | tf-aws

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
  "data": {
    "aws_region": {
      "root_Region_A2D17352": {
        "//": {
          "metadata": {
            "path": "root/Default/Region",
            "uniqueId": "root_Region_A2D17352"
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
      "root_cloudApi_api_deployment_E29F699A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/deployment",
            "uniqueId": "root_cloudApi_api_deployment_E29F699A"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.id}",
        "triggers": {
          "redeployment": "c46535d385dc86a1ba350f23ab28b58821f513fc"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "root_cloudApi_api_8C9FE51E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "root_cloudApi_api_8C9FE51E"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"post\":{\"operationId\":\"post-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequestb3f3d188_7B78D0CA.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"options\":{\"operationId\":\"options-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequest7df3a533_FF569143.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "root_cloudApi_api_stage_57D6284A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/stage",
            "uniqueId": "root_cloudApi_api_stage_57D6284A"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.root_cloudApi_api_deployment_E29F699A.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudfront_distribution": {
      "root_cloudWebsite_distribution_CC27FD7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/distribution",
            "uniqueId": "root_cloudWebsite_distribution_CC27FD7B"
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
            "domain_name": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket_regional_domain_name}",
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
    "aws_dynamodb_table": {
      "root_cloudTable_323D7643": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/Default",
            "uniqueId": "root_cloudTable_323D7643"
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
        "name": "users-tablecloud.Table-c83b78a7"
      }
    },
    "aws_iam_role": {
      "root_cloudApi_cloudApiOnRequest7df3a533_IamRole_D3D4353A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7df3a533/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequest7df3a533_IamRole_D3D4353A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudApi_cloudApiOnRequestb3f3d188_IamRole_94B392C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-b3f3d188/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequestb3f3d188_IamRole_94B392C2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudApi_cloudApiOnRequest7df3a533_IamRolePolicy_FFC9D43D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7df3a533/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequest7df3a533_IamRolePolicy_FFC9D43D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest7df3a533_IamRole_D3D4353A.name}"
      },
      "root_cloudApi_cloudApiOnRequestb3f3d188_IamRolePolicy_5AC6F400": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-b3f3d188/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequestb3f3d188_IamRolePolicy_5AC6F400"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:DeleteItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestb3f3d188_IamRole_94B392C2.name}"
      },
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicy_0281983F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicy_0281983F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:DeleteItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudApi_cloudApiOnRequest7df3a533_IamRolePolicyAttachment_5BF75C0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7df3a533/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequest7df3a533_IamRolePolicyAttachment_5BF75C0A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest7df3a533_IamRole_D3D4353A.name}"
      },
      "root_cloudApi_cloudApiOnRequestb3f3d188_IamRolePolicyAttachment_7B41A4E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-b3f3d188/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequestb3f3d188_IamRolePolicyAttachment_7B41A4E5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestb3f3d188_IamRole_94B392C2.name}"
      },
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicyAttachment_3D2A6333": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicyAttachment_3D2A6333"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudApi_cloudApiOnRequest7df3a533_FF569143": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7df3a533/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequest7df3a533_FF569143"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-7df3a533-c810999d"
          }
        },
        "function_name": "cloud-Api-OnRequest-7df3a533-c810999d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest7df3a533_IamRole_D3D4353A.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequest7df3a533_S3Object_C7921AF3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudApi_cloudApiOnRequestb3f3d188_7B78D0CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-b3f3d188/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequestb3f3d188_7B78D0CA"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "id",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-b3f3d188-c8c66531"
          }
        },
        "function_name": "cloud-Api-OnRequest-b3f3d188-c8c66531",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestb3f3d188_IamRole_94B392C2.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequestb3f3d188_S3Object_AD66E23A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "id",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-e46e5cb7-c8fd44c0"
          }
        },
        "function_name": "cloud-Api-OnRequest-e46e5cb7-c8fd44c0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequeste46e5cb7_S3Object_69EE2256.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudApi_api_permissionGET41f0e61d_2733A090": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-41f0e61d",
            "uniqueId": "root_cloudApi_api_permissionGET41f0e61d_2733A090"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/users",
        "statement_id": "AllowExecutionFromAPIGateway-GET-41f0e61d"
      },
      "root_cloudApi_api_permissionOPTIONS41f0e61d_0311282D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-OPTIONS-41f0e61d",
            "uniqueId": "root_cloudApi_api_permissionOPTIONS41f0e61d_0311282D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequest7df3a533_FF569143.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/OPTIONS/users",
        "statement_id": "AllowExecutionFromAPIGateway-OPTIONS-41f0e61d"
      },
      "root_cloudApi_api_permissionPOST41f0e61d_CC99E399": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-POST-41f0e61d",
            "uniqueId": "root_cloudApi_api_permissionPOST41f0e61d_CC99E399"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequestb3f3d188_7B78D0CA.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/POST/users",
        "statement_id": "AllowExecutionFromAPIGateway-POST-41f0e61d"
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
      "root_cloudWebsite_B2013695": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Default",
            "uniqueId": "root_cloudWebsite_B2013695"
          }
        },
        "bucket_prefix": "cloud-website-c8e58765-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "root_cloudWebsite_PublicPolicy_2884A0C6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/PublicPolicy",
            "uniqueId": "root_cloudWebsite_PublicPolicy_2884A0C6"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket}",
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.root_cloudWebsite_B2013695.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudWebsite_Encryption_8B168696": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Encryption",
            "uniqueId": "root_cloudWebsite_Encryption_8B168696"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket}",
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
      "root_cloudWebsite_136F5C7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Website",
            "uniqueId": "root_cloudWebsite_136F5C7F"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "root_cloudApi_cloudApiOnRequest7df3a533_S3Object_C7921AF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-7df3a533/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequest7df3a533_S3Object_C7921AF3"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudApi_cloudApiOnRequestb3f3d188_S3Object_AD66E23A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-b3f3d188/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequestb3f3d188_S3Object_AD66E23A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudApi_cloudApiOnRequeste46e5cb7_S3Object_69EE2256": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_S3Object_69EE2256"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudWebsite_awss3bucketobjectDSStore_12291830": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/aws_s3_bucket_object_.DS_Store",
            "uniqueId": "root_cloudWebsite_awss3bucketobjectDSStore_12291830"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket}",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_B2013695"
        ],
        "key": "/.DS_Store",
        "source": "/Users/tsuf/Documents/wing/examples/tests/valid/website_with_api/.DS_Store"
      },
      "root_cloudWebsite_awss3bucketobjectconfigjson_BC6959AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/aws_s3_bucket_object_config.json",
            "uniqueId": "root_cloudWebsite_awss3bucketobjectconfigjson_BC6959AB"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket}",
        "content": "{\"apiUrl\":\"${aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url}\"}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_B2013695"
        ],
        "key": "config.json"
      },
      "root_cloudWebsite_awss3bucketobjectindexhtml_3A649306": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/aws_s3_bucket_object_index.html",
            "uniqueId": "root_cloudWebsite_awss3bucketobjectindexhtml_3A649306"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_B2013695.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_B2013695"
        ],
        "key": "/index.html",
        "source": "/Users/tsuf/Documents/wing/examples/tests/valid/website_with_api/index.html"
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
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const website = this.node.root.newAbstract("@winglang/sdk.cloud.Website",this,"cloud.Website",{ path: "./website_with_api" });
    const users_table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{
    "name": "users-table",
    "primaryKey": "id",
    "columns": Object.freeze({"id":cloud.ColumnType.STRING,"name":cloud.ColumnType.STRING,"age":cloud.ColumnType.NUMBER}),}
    );
    const get_handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        users_table: {
          obj: users_table,
          ops: ["delete","get","insert","list","update"]
        },
      }
    })
    ;
    const post_handler = new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        users_table: {
          obj: users_table,
          ops: ["delete","get","insert","list","update"]
        },
      }
    })
    ;
    const options_handler = new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    (api.get("/users",get_handler));
    (api.post("/users",post_handler));
    (api.options("/users",options_handler));
    (website.addJson("config.json",Object.freeze({"apiUrl":api.url})));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "website_with_api", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(req) {
  const { users_table } = this;
  return {
  "body": Object.freeze({"users":(await users_table.list())}),
  "status": 200,}
  ;
}

```

## proc2/index.js
```js
async handle(req) {
  const { users_table } = this;
  const body = (req.body ?? Object.freeze({"name":"","age":"","id":""}));
  if (((((body)["name"] === "") || ((body)["age"] === "")) || ((body)["id"] === ""))) {
    return {
    "body": Object.freeze({"error":"incomplete details"}),
    "status": 500,}
    ;
  }
  (await users_table.insert(body));
  return {
  "body": Object.freeze({"user":(body)["id"]}),
  "status": 200,}
  ;
}

```

## proc3/index.js
```js
async handle(req) {
  const {  } = this;
  return {
  "headers": Object.freeze({"Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"OPTIONS,POST,GET"}),
  "status": 200,}
  ;
}

```


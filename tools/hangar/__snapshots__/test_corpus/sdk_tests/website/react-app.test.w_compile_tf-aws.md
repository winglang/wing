# [react-app.test.w](../../../../../../examples/tests/sdk_tests/website/react-app.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {
      "root": {
        "Default": {
          "Default": {
            "Api": {
              "Endpoint": {
                "Url": "Api_Endpoint_Url_473FEE9F"
              }
            },
            "ReactApp": {
              "ReactApp-host": {
                "Endpoint": {
                  "Url": "ReactApp_ReactApp-host_Endpoint_Url_62B1895E"
                }
              }
            }
          }
        }
      }
    }
  },
  "data": {
    "aws_caller_identity": {
      "account": {
        "//": {
          "metadata": {
            "path": "root/Default/account",
            "uniqueId": "account"
          }
        }
      }
    },
    "aws_iam_policy_document": {
      "ReactApp_ReactApp-host_AllowDistributionReadOnly_372196CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/AllowDistributionReadOnly",
            "uniqueId": "ReactApp_ReactApp-host_AllowDistributionReadOnly_372196CD"
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
                  "${aws_cloudfront_distribution.ReactApp_ReactApp-host_Distribution_D777C7AA.arn}"
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
              "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.arn}/*"
            ]
          }
        ]
      }
    },
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
    "Api_Endpoint_Url_473FEE9F": {
      "value": "https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}"
    },
    "ReactApp_ReactApp-host_Endpoint_Url_62B1895E": {
      "value": "https://${aws_cloudfront_distribution.ReactApp_ReactApp-host_Distribution_D777C7AA.domain_name}"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "Api_api_deployment_7FB64CC4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/deployment",
            "uniqueId": "Api_api_deployment_7FB64CC4"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.Api_api_91C07D84.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.Api_api_91C07D84.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "Api_api_91C07D84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/api",
            "uniqueId": "Api_api_91C07D84"
          }
        },
        "body": "{\"paths\":{\"/\":{\"get\":{\"operationId\":\"get\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_0-c86d29bb/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}},\"openapi\":\"3.0.3\"}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8f613f0"
      }
    },
    "aws_api_gateway_stage": {
      "Api_api_stage_E0FA39D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/stage",
            "uniqueId": "Api_api_stage_E0FA39D6"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.Api_api_deployment_7FB64CC4.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.Api_api_91C07D84.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudfront_distribution": {
      "ReactApp_ReactApp-host_Distribution_D777C7AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/Distribution",
            "uniqueId": "ReactApp_ReactApp-host_Distribution_D777C7AA"
          }
        },
        "custom_error_response": [
          {
            "error_code": 404,
            "response_code": 200,
            "response_page_path": "/index.html"
          },
          {
            "error_code": 403,
            "response_code": 200,
            "response_page_path": "/index.html"
          }
        ],
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
            "domain_name": "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.ReactApp_ReactApp-host_CloudfrontOac_A9CBE717.id}",
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
      "ReactApp_ReactApp-host_CloudfrontOac_A9CBE717": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/CloudfrontOac",
            "uniqueId": "ReactApp_ReactApp-host_CloudfrontOac_A9CBE717"
          }
        },
        "name": "ReactApp-c8d263a6-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_cloudwatch_log_group": {
      "Api_get_0_CloudwatchLogGroup_196DE719": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_0/CloudwatchLogGroup",
            "uniqueId": "Api_get_0_CloudwatchLogGroup_196DE719"
          }
        },
        "name": "/aws/lambda/get_0-c86d29bb",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Api_get_0_IamRole_2FAC475D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_0/IamRole",
            "uniqueId": "Api_get_0_IamRole_2FAC475D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_0_IamRolePolicy_D9FB373B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_0/IamRolePolicy",
            "uniqueId": "Api_get_0_IamRolePolicy_D9FB373B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Api_get_0_IamRole_2FAC475D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_0_IamRolePolicyAttachment_AEF1DC01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_0_IamRolePolicyAttachment_AEF1DC01"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_0_IamRole_2FAC475D.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_0_244A7BA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_0/Default",
            "uniqueId": "Api_get_0_244A7BA4"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_0-c86d29bb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_0-c86d29bb",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_0_IamRole_2FAC475D.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_0_S3Object_D1844823.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-c2e3ffa8_5BF93889": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-c2e3ffa8",
            "uniqueId": "Api_api_permission-GET-c2e3ffa8_5BF93889"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_0_244A7BA4.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/",
        "statement_id": "AllowExecutionFromAPIGateway-GET-c2e3ffa8"
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
      "ReactApp_ReactApp-host_WebsiteBucket_89CDC093": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/WebsiteBucket",
            "uniqueId": "ReactApp_ReactApp-host_WebsiteBucket_89CDC093"
          }
        },
        "bucket_prefix": "reactapp-host-c8d263a6-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "ReactApp_ReactApp-host_DistributionS3BucketPolicy_83FDF6F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/DistributionS3BucketPolicy",
            "uniqueId": "ReactApp_ReactApp-host_DistributionS3BucketPolicy_83FDF6F5"
          }
        },
        "bucket": "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.id}",
        "policy": "${data.aws_iam_policy_document.ReactApp_ReactApp-host_AllowDistributionReadOnly_372196CD.json}"
      }
    },
    "aws_s3_bucket_website_configuration": {
      "ReactApp_ReactApp-host_BucketWebsiteConfiguration_7CEC9155": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/BucketWebsiteConfiguration",
            "uniqueId": "ReactApp_ReactApp-host_BucketWebsiteConfiguration_7CEC9155"
          }
        },
        "bucket": "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.bucket}",
        "error_document": {
          "key": "index.html"
        },
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "Api_get_0_S3Object_D1844823": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_0/S3Object",
            "uniqueId": "Api_get_0_S3Object_D1844823"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "ReactApp_ReactApp-host_File--indexhtml_5D49E05F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/File--index.html",
            "uniqueId": "ReactApp_ReactApp-host_File--indexhtml_5D49E05F"
          }
        },
        "bucket": "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "ReactApp_ReactApp-host_File--indexjs_1DE8B5B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/File--index.js",
            "uniqueId": "ReactApp_ReactApp-host_File--indexjs_1DE8B5B1"
          }
        },
        "bucket": "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.bucket}",
        "content_type": "application/javascript; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093"
        ],
        "key": "/index.js",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "ReactApp_ReactApp-host_File-wingjs_2C73E578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ReactApp/ReactApp-host/File-wing.js",
            "uniqueId": "ReactApp_ReactApp-host_File-wingjs_2C73E578"
          }
        },
        "bucket": "${aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093.bucket}",
        "content": "// This file is generated by wing\nwindow.wingEnv = {\n  \"apiUrl\": \"https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}\",\n  \"anotherEnvVar\": \"preflight variable\"\n};",
        "content_type": "text/javascript",
        "depends_on": [
          "aws_s3_bucket.ReactApp_ReactApp-host_WebsiteBucket_89CDC093"
        ],
        "key": "wing.js"
      }
    }
  }
}
```


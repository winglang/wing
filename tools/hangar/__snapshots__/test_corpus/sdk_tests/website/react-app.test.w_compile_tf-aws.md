# [react-app.test.w](../../../../../../examples/tests/sdk_tests/website/react-app.test.w) | compile | tf-aws

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
            },
            "ex.ReactApp": {
              "ex.ReactApp-host": {
                "Endpoint": {
                  "Url": "exReactApp_exReactApp-host_Endpoint_Url_CC674145"
                }
              }
            }
          }
        }
      }
    }
  },
  "data": {
    "aws_iam_policy_document": {
      "exReactApp_exReactApp-host_AllowDistributionReadOnly_449FAF0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/AllowDistributionReadOnly",
            "uniqueId": "exReactApp_exReactApp-host_AllowDistributionReadOnly_449FAF0F"
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
                  "${aws_cloudfront_distribution.exReactApp_exReactApp-host_Distribution_FE9291B1.arn}"
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
              "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.arn}/*"
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
    "cloudApi_Endpoint_Url_CD8AC9A6": {
      "value": "https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}"
    },
    "exReactApp_exReactApp-host_Endpoint_Url_CC674145": {
      "value": "https://${aws_cloudfront_distribution.exReactApp_exReactApp-host_Distribution_FE9291B1.domain_name}"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/\":{\"get\":{\"operationId\":\"get\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get__0_53449ADC.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
    "aws_cloudfront_distribution": {
      "exReactApp_exReactApp-host_Distribution_FE9291B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/Distribution",
            "uniqueId": "exReactApp_exReactApp-host_Distribution_FE9291B1"
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
            "domain_name": "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.exReactApp_exReactApp-host_CloudfrontOac_B85B4BF9.id}",
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
      "exReactApp_exReactApp-host_CloudfrontOac_B85B4BF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/CloudfrontOac",
            "uniqueId": "exReactApp_exReactApp-host_CloudfrontOac_B85B4BF9"
          }
        },
        "name": "ex-React-c8e2f35e-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_cloudwatch_log_group": {
      "cloudApi_get__0_CloudwatchLogGroup_8157F45B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get__}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get__0_CloudwatchLogGroup_8157F45B"
          }
        },
        "name": "/aws/lambda/get__-0-c83a3423",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get__0_IamRole_BA7625E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get__}0/IamRole",
            "uniqueId": "cloudApi_get__0_IamRole_BA7625E6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get__0_IamRolePolicy_EA1F05B0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get__}0/IamRolePolicy",
            "uniqueId": "cloudApi_get__0_IamRolePolicy_EA1F05B0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get__0_IamRole_BA7625E6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get__0_IamRolePolicyAttachment_9A60D059": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get__}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get__0_IamRolePolicyAttachment_9A60D059"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get__0_IamRole_BA7625E6.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get__0_53449ADC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get__}0/Default",
            "uniqueId": "cloudApi_get__0_53449ADC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get__-0-c83a3423",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get__-0-c83a3423",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get__0_IamRole_BA7625E6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get__0_S3Object_806093F6.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-c2e3ffa8_37FA5D89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-c2e3ffa8",
            "uniqueId": "cloudApi_api_permission-GET-c2e3ffa8_37FA5D89"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get__0_53449ADC.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/",
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
      "exReactApp_exReactApp-host_WebsiteBucket_FE5E163A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/WebsiteBucket",
            "uniqueId": "exReactApp_exReactApp-host_WebsiteBucket_FE5E163A"
          }
        },
        "bucket_prefix": "ex-reactapp-host-c8e2f35e-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "exReactApp_exReactApp-host_DistributionS3BucketPolicy_2BAB64DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/DistributionS3BucketPolicy",
            "uniqueId": "exReactApp_exReactApp-host_DistributionS3BucketPolicy_2BAB64DC"
          }
        },
        "bucket": "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.id}",
        "policy": "${data.aws_iam_policy_document.exReactApp_exReactApp-host_AllowDistributionReadOnly_449FAF0F.json}"
      }
    },
    "aws_s3_bucket_website_configuration": {
      "exReactApp_exReactApp-host_BucketWebsiteConfiguration_BDF89618": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/BucketWebsiteConfiguration",
            "uniqueId": "exReactApp_exReactApp-host_BucketWebsiteConfiguration_BDF89618"
          }
        },
        "bucket": "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "cloudApi_get__0_S3Object_806093F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get__}0/S3Object",
            "uniqueId": "cloudApi_get__0_S3Object_806093F6"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "exReactApp_exReactApp-host_File--indexhtml_B6124CA6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/File--index.html",
            "uniqueId": "exReactApp_exReactApp-host_File--indexhtml_B6124CA6"
          }
        },
        "bucket": "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "exReactApp_exReactApp-host_File--indexjs_212AAA99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/File--index.js",
            "uniqueId": "exReactApp_exReactApp-host_File--indexjs_212AAA99"
          }
        },
        "bucket": "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.bucket}",
        "content_type": "application/javascript; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A"
        ],
        "key": "/index.js",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "exReactApp_exReactApp-host_File-wingjs_43F0A844": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.ReactApp/ex.ReactApp-host/File-wing.js",
            "uniqueId": "exReactApp_exReactApp-host_File-wingjs_43F0A844"
          }
        },
        "bucket": "${aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A.bucket}",
        "content": "// This file is generated by wing\nwindow.wingEnv = {\n  \"apiUrl\": \"https://${aws_api_gateway_rest_api.cloudApi_api_2B334D75.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.stage_name}\",\n  \"anotherEnvVar\": \"preflight variable\"\n};",
        "content_type": "text/javascript",
        "depends_on": [
          "aws_s3_bucket.exReactApp_exReactApp-host_WebsiteBucket_FE5E163A"
        ],
        "key": "wing.js"
      }
    }
  }
}
```


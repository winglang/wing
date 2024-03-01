# [website_with_api.test.w](../../../../../examples/tests/valid/website_with_api.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $std_Json, $usersTable }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"users": (await $usersTable.list())})), "status": 200});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $std_Json, $usersTable }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const body = JSON.parse((req.body ?? ""));
      if ((($helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(body, "name"), "") || $helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(body, "age"), "")) || $helpers.eq(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(body, "id"), ""))) {
        return ({"body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"error": "incomplete details"})), "status": 400});
      }
      (await $usersTable.insert(((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(body, "id")), body));
      return ({"body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(({"user": ((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(body, "id")})), "status": 201});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url, $expect_Util, $http_HttpMethod, $http_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($api_url + "/users"), ({"method": $http_HttpMethod.GET, "headers": ({"Content-Type": "text/json"})})));
      const headers = response.headers;
      (await $expect_Util.equal(response.status, 200));
      (await $expect_Util.equal((headers)["access-control-allow-origin"], "*"));
      (await $expect_Util.equal((headers)["access-control-expose-headers"], "Content-Type"));
      (await $expect_Util.equal((headers)["access-control-allow-credentials"], "false"));
      (await $expect_Util.nil((headers)["access-control-allow-headers"]));
      (await $expect_Util.nil((headers)["access-control-allow-methods"]));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.$Closure4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url, $expect_Util, $http_HttpMethod, $http_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($api_url + "/users"), ({"method": $http_HttpMethod.OPTIONS, "headers": ({"Content-Type": "text/json"})})));
      const headers = response.headers;
      (await $expect_Util.equal(response.status, 204));
      (await $expect_Util.equal((headers)["access-control-allow-methods"], "GET,POST,OPTIONS"));
      (await $expect_Util.equal((headers)["access-control-allow-headers"], "Content-Type"));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map
```

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
            "Website": {
              "Endpoint": {
                "Url": "Website_Endpoint_Url_0CC0343F"
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
      "Website_AllowDistributionReadOnly_24CFF6C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/AllowDistributionReadOnly",
            "uniqueId": "Website_AllowDistributionReadOnly_24CFF6C0"
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
                  "${aws_cloudfront_distribution.Website_Distribution_5E840E42.arn}"
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
              "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.arn}/*"
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
    "Website_Endpoint_Url_0CC0343F": {
      "value": "https://${aws_cloudfront_distribution.Website_Distribution_5E840E42.domain_name}"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{},\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Methods\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Headers\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Max-Age\":{\"schema\":{\"type\":\"string\"}}}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_users0-c82bfbcd/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"post\":{\"operationId\":\"post-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{},\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Methods\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Headers\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Max-Age\":{\"schema\":{\"type\":\"string\"}}}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:post_users0-c8ae30d9/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                #if ($context.httpMethod == \\\"OPTIONS\\\")\\n                    {\\\"statusCode\\\": 204}\\n                #else\\n                    {\\\"statusCode\\\": 404}\\n                #end\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"204\":{\"statusCode\":\"204\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\",\"method.response.header.Access-Control-Allow-Origin\":\"'*'\",\"method.response.header.Access-Control-Allow-Methods\":\"'GET,POST,OPTIONS'\",\"method.response.header.Access-Control-Allow-Headers\":\"'Content-Type'\"},\"responseTemplates\":{\"application/json\":\"{}\"}},\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"204\":{\"description\":\"204 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"},\"Access-Control-Allow-Origin\":{\"type\":\"string\"},\"Access-Control-Allow-Methods\":{\"type\":\"string\"},\"Access-Control-Allow-Headers\":{\"type\":\"string\"}}},\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "Website_Distribution_5E840E42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/Distribution",
            "uniqueId": "Website_Distribution_5E840E42"
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
            "domain_name": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket_regional_domain_name}",
            "origin_access_control_id": "${aws_cloudfront_origin_access_control.Website_CloudfrontOac_756836A4.id}",
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
      "Website_CloudfrontOac_756836A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/CloudfrontOac",
            "uniqueId": "Website_CloudfrontOac_756836A4"
          }
        },
        "name": "Website-c80d509a-cloudfront-oac",
        "origin_access_control_origin_type": "s3",
        "signing_behavior": "always",
        "signing_protocol": "sigv4"
      }
    },
    "aws_cloudwatch_log_group": {
      "Api_get_users0_CloudwatchLogGroup_6649CB35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users0/CloudwatchLogGroup",
            "uniqueId": "Api_get_users0_CloudwatchLogGroup_6649CB35"
          }
        },
        "name": "/aws/lambda/get_users0-c82bfbcd",
        "retention_in_days": 30
      },
      "Api_post_users0_CloudwatchLogGroup_9A416640": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_users0/CloudwatchLogGroup",
            "uniqueId": "Api_post_users0_CloudwatchLogGroup_9A416640"
          }
        },
        "name": "/aws/lambda/post_users0-c8ae30d9",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "Table": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/Default",
            "uniqueId": "Table"
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
        "name": "users-tableTable-c89b2d37",
        "point_in_time_recovery": {
          "enabled": true
        }
      }
    },
    "aws_iam_role": {
      "Api_get_users0_IamRole_950ACE40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users0/IamRole",
            "uniqueId": "Api_get_users0_IamRole_950ACE40"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "Api_post_users0_IamRole_B6E18B7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_users0/IamRole",
            "uniqueId": "Api_post_users0_IamRole_B6E18B7C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Api_get_users0_IamRolePolicy_1C96E6D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users0/IamRolePolicy",
            "uniqueId": "Api_get_users0_IamRolePolicy_1C96E6D8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Api_get_users0_IamRole_950ACE40.name}"
      },
      "Api_post_users0_IamRolePolicy_32ED25A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_users0/IamRolePolicy",
            "uniqueId": "Api_post_users0_IamRolePolicy_32ED25A9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.Table.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.Api_post_users0_IamRole_B6E18B7C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Api_get_users0_IamRolePolicyAttachment_EB78BB64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users0/IamRolePolicyAttachment",
            "uniqueId": "Api_get_users0_IamRolePolicyAttachment_EB78BB64"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_get_users0_IamRole_950ACE40.name}"
      },
      "Api_post_users0_IamRolePolicyAttachment_F08ACD31": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_users0/IamRolePolicyAttachment",
            "uniqueId": "Api_post_users0_IamRolePolicyAttachment_F08ACD31"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Api_post_users0_IamRole_B6E18B7C.name}"
      }
    },
    "aws_lambda_function": {
      "Api_get_users0_F1BDFB04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users0/Default",
            "uniqueId": "Api_get_users0_F1BDFB04"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_users0-c82bfbcd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_users0-c82bfbcd",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_get_users0_IamRole_950ACE40.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_get_users0_S3Object_5E4DF6D1.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "Api_post_users0_7459F559": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_users0/Default",
            "uniqueId": "Api_post_users0_7459F559"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e7245baa": "${aws_dynamodb_table.Table.name}",
            "DYNAMODB_TABLE_NAME_e7245baa_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_e7245baa_PRIMARY_KEY": "id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "post_users0-c8ae30d9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "post_users0-c8ae30d9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Api_post_users0_IamRole_B6E18B7C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Api_post_users0_S3Object_8FA5AEB9.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "Api_api_permission-GET-41f0e61d_AD17285B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-GET-41f0e61d",
            "uniqueId": "Api_api_permission-GET-41f0e61d_AD17285B"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_get_users0_F1BDFB04.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/GET/users",
        "statement_id": "AllowExecutionFromAPIGateway-GET-41f0e61d"
      },
      "Api_api_permission-POST-41f0e61d_3C9809C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/api/permission-POST-41f0e61d",
            "uniqueId": "Api_api_permission-POST-41f0e61d_3C9809C9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.Api_post_users0_7459F559.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.Api_api_91C07D84.execution_arn}/*/POST/users",
        "statement_id": "AllowExecutionFromAPIGateway-POST-41f0e61d"
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
      "Website_WebsiteBucket_3C0321F0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/WebsiteBucket",
            "uniqueId": "Website_WebsiteBucket_3C0321F0"
          }
        },
        "bucket_prefix": "website-c80d509a-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_policy": {
      "Website_DistributionS3BucketPolicy_09AE0BCA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/DistributionS3BucketPolicy",
            "uniqueId": "Website_DistributionS3BucketPolicy_09AE0BCA"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.id}",
        "policy": "${data.aws_iam_policy_document.Website_AllowDistributionReadOnly_24CFF6C0.json}"
      }
    },
    "aws_s3_bucket_website_configuration": {
      "Website_BucketWebsiteConfiguration_58F891B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/BucketWebsiteConfiguration",
            "uniqueId": "Website_BucketWebsiteConfiguration_58F891B4"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "Api_get_users0_S3Object_5E4DF6D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/get_users0/S3Object",
            "uniqueId": "Api_get_users0_S3Object_5E4DF6D1"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Api_post_users0_S3Object_8FA5AEB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Api/post_users0/S3Object",
            "uniqueId": "Api_post_users0_S3Object_8FA5AEB9"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "Website_File--indexhtml_864F8C36": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/File--index.html",
            "uniqueId": "Website_File--indexhtml_864F8C36"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.Website_WebsiteBucket_3C0321F0"
        ],
        "key": "/index.html",
        "source": "<SOURCE>",
        "source_hash": "${filemd5(<SOURCE>)}"
      },
      "Website_File-configjson_1F1498B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Website/File-config.json",
            "uniqueId": "Website_File-configjson_1F1498B9"
          }
        },
        "bucket": "${aws_s3_bucket.Website_WebsiteBucket_3C0321F0.bucket}",
        "content": "{\"apiUrl\":\"https://${aws_api_gateway_rest_api.Api_api_91C07D84.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.Api_api_stage_E0FA39D6.stage_name}\"}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.Website_WebsiteBucket_3C0321F0"
        ],
        "key": "config.json"
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const http = $stdlib.http;
const expect = $stdlib.expect;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $usersTable: ${$stdlib.core.liftObject(usersTable)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [usersTable, ["list"]],
          ],
          "$inflight_init": [
            [usersTable, []],
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
            $usersTable: ${$stdlib.core.liftObject(usersTable)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [usersTable, ["insert"]],
          ],
          "$inflight_init": [
            [usersTable, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_HttpMethod: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_HttpMethod: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "Api", { cors: true, corsOptions: ({"allowOrigin": ["*"], "allowMethods": [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS], "allowHeaders": ["Content-Type"], "allowCredentials": false, "exposeHeaders": ["Content-Type"], "maxAge": (std.Duration.fromSeconds(600))}) });
    const website = this.node.root.new("@winglang/sdk.cloud.Website", cloud.Website, this, "Website", { path: "./website_with_api" });
    const usersTable = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", { name: "users-table", primaryKey: "id", columns: ({["id"]: ex.ColumnType.STRING, ["name"]: ex.ColumnType.STRING, ["age"]: ex.ColumnType.NUMBER}) });
    const getHandler = new $Closure1(this, "$Closure1");
    const postHandler = new $Closure2(this, "$Closure2");
    (api.get("/users", getHandler));
    (api.post("/users", postHandler));
    (website.addJson("config.json", ({"apiUrl": api.url})));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:GET /users", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:OPTIONS /users", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "website_with_api.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


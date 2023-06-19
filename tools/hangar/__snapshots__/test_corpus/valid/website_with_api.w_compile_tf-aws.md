# [website_with_api.w](../../../../../examples/tests/valid/website_with_api.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ std_Json, usersTable }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req)  {
      return {
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([Object.freeze({"users":(await usersTable.list())})]),
      "status": 200,}
      ;
    }
    async $inflight_init()  {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ std_Json, usersTable }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req)  {
      const body = (JSON.parse((req.body ?? ((args) => { return JSON.stringify(args[0], null, args[1]) })([Object.freeze({"name":"","age":"","id":""})]))));
      if (((((body)["name"] === "") || ((body)["age"] === "")) || ((body)["id"] === ""))) {
        return {
        "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([Object.freeze({"error":"incomplete details"})]),
        "status": 400,}
        ;
      }
      (await usersTable.insert(((args) => { return JSON.stringify(args[0], null, args[1]) })([(body)["id"]]),body));
      return {
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([Object.freeze({"user":(body)["id"]})]),
      "status": 201,}
      ;
    }
    async $inflight_init()  {
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
    async handle(req)  {
      return {
      "headers": Object.freeze({"Access-Control-Allow-Headers":"Content-Type","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"OPTIONS,POST,GET"}),
      "status": 204,}
      ;
    }
    async $inflight_init()  {
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
          "redeployment": "67854313abc040abe4f906782a46948864d75773"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"post\":{\"operationId\":\"post-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequest86898773_09C7D592.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"options\":{\"operationId\":\"options-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequest3fc9280c_C82E08D0.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
      "root_cloudWebsite_Distribution_6BC863F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/Distribution",
            "uniqueId": "root_cloudWebsite_Distribution_6BC863F8"
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
            "domain_name": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket_regional_domain_name}",
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
      "root_cloudApi_cloudApiOnRequest3fc9280c_IamRole_F8FA04E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-3fc9280c/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequest3fc9280c_IamRole_F8FA04E0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudApi_cloudApiOnRequest86898773_IamRole_A003777E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequest86898773_IamRole_A003777E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRole",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudApi_cloudApiOnRequest3fc9280c_IamRolePolicy_338A11C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-3fc9280c/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequest3fc9280c_IamRolePolicy_338A11C4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest3fc9280c_IamRole_F8FA04E0.name}"
      },
      "root_cloudApi_cloudApiOnRequest86898773_IamRolePolicy_9285690E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequest86898773_IamRolePolicy_9285690E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest86898773_IamRole_A003777E.name}"
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudApi_cloudApiOnRequest3fc9280c_IamRolePolicyAttachment_78296992": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-3fc9280c/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequest3fc9280c_IamRolePolicyAttachment_78296992"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest3fc9280c_IamRole_F8FA04E0.name}"
      },
      "root_cloudApi_cloudApiOnRequest86898773_IamRolePolicyAttachment_02F1CEAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequest86898773_IamRolePolicyAttachment_02F1CEAE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest86898773_IamRole_A003777E.name}"
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicyAttachment_4A873879": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicyAttachment_4A873879"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudApi_cloudApiOnRequest3fc9280c_C82E08D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-3fc9280c/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequest3fc9280c_C82E08D0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-3fc9280c-c8d3ecf9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-3fc9280c-c8d3ecf9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest3fc9280c_IamRole_F8FA04E0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequest3fc9280c_S3Object_C3E15764.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudApi_cloudApiOnRequest86898773_09C7D592": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequest86898773_09C7D592"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "id",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-86898773-c8ed6547",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-86898773-c8ed6547",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest86898773_IamRole_A003777E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequest86898773_S3Object_4F173732.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_582EA655": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_582EA655"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"id\":0,\"name\":0,\"age\":1}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "id",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-cdafee6e-c8147384",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-cdafee6e-c8147384",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudApi_cloudApiOnRequestcdafee6e_S3Object_AA762041.key}",
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
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.function_name}",
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
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequest3fc9280c_C82E08D0.function_name}",
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
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequest86898773_09C7D592.function_name}",
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
      "root_cloudWebsite_WebsiteBucket_E28E35CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/WebsiteBucket",
            "uniqueId": "root_cloudWebsite_WebsiteBucket_E28E35CE"
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
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudWebsite_PublicAccessBlock_89CD01D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/PublicAccessBlock",
            "uniqueId": "root_cloudWebsite_PublicAccessBlock_89CD01D0"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
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
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
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
      "root_cloudWebsite_BucketWebsiteConfiguration_DEE39F09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/BucketWebsiteConfiguration",
            "uniqueId": "root_cloudWebsite_BucketWebsiteConfiguration_DEE39F09"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "index_document": {
          "suffix": "index.html"
        }
      }
    },
    "aws_s3_object": {
      "root_cloudApi_cloudApiOnRequest3fc9280c_S3Object_C3E15764": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-3fc9280c/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequest3fc9280c_S3Object_C3E15764"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudApi_cloudApiOnRequest86898773_S3Object_4F173732": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-86898773/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequest86898773_S3Object_4F173732"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_S3Object_AA762041": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/S3Object",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_S3Object_AA762041"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudWebsite_Fileconfigjson_366296B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File-config.json",
            "uniqueId": "root_cloudWebsite_Fileconfigjson_366296B1"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "content": "{\"apiUrl\":\"${aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url}\"}",
        "content_type": "application/json",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE"
        ],
        "key": "config.json"
      },
      "root_cloudWebsite_Fileindexhtml_A07B6D26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Website/File--index.html",
            "uniqueId": "root_cloudWebsite_Fileindexhtml_A07B6D26"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE.bucket}",
        "content_type": "text/html; charset=utf-8",
        "depends_on": [
          "aws_s3_bucket.root_cloudWebsite_WebsiteBucket_E28E35CE"
        ],
        "key": "/index.html",
        "source": "<SOURCE>"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            usersTable: ${context._lift(usersTable, ["list"])},
            std_Json: ${std_JsonClient.text},
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
          $Closure1._registerBindObject(usersTable, host, ["list"]);
        }
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
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            usersTable: ${context._lift(usersTable, ["insert"])},
            std_Json: ${std_JsonClient.text},
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
          $Closure2._registerBindObject(usersTable, host, ["insert"]);
        }
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
    const usersTable = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{ name: "users-table", primaryKey: "id", columns: Object.freeze({"id":cloud.ColumnType.STRING,"name":cloud.ColumnType.STRING,"age":cloud.ColumnType.NUMBER}) });
    const getHandler = new $Closure1(this,"$Closure1");
    const postHandler = new $Closure2(this,"$Closure2");
    const optionsHandler = new $Closure3(this,"$Closure3");
    (api.get("/users",getHandler));
    (api.post("/users",postHandler));
    (api.options("/users",optionsHandler));
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


# [options.w](../../../../../../examples/tests/sdk_tests/api/options.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ api_OPTIONS, path }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(req)  {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == api_OPTIONS")})((req.method === api_OPTIONS))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == path")})((req.path === path))};
      return {
      "status": 204,}
      ;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ api_HEAD, path }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(req)  {
      {((cond) => {if (!cond) throw new Error("assertion failed: req.method == api_HEAD")})((req.method === api_HEAD))};
      {((cond) => {if (!cond) throw new Error("assertion failed: req.path == path")})((req.path === path))};
      return {
      "status": 204,}
      ;
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
    async $inflight_init()  {
    }
    async handle(req)  {
      return {
      "status": 204,}
      ;
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ api, path, http_OPTIONS, http_HEAD, http_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const url = (api.url + path);
      const options = (await http_Util.fetch(url,{
      "method": http_OPTIONS,}
      ));
      const head = (await http_Util.fetch(url,{
      "method": http_HEAD,}
      ));
      {((cond) => {if (!cond) throw new Error("assertion failed: options.status == 204")})((options.status === 204))};
      {((cond) => {if (!cond) throw new Error("assertion failed: options.url == url")})((options.url === url))};
      {((cond) => {if (!cond) throw new Error("assertion failed: head.status == 204")})((head.status === 204))};
      {((cond) => {if (!cond) throw new Error("assertion failed: head.url == url")})((head.url === url))};
    }
  }
  return $Closure4;
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
      "value": "[[\"root/Default/Default/test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS\",\"${aws_lambda_function.root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_7DB6D861.arn}\"]]"
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
          "redeployment": "8b2f49112bd467ba9558fc860ae398e857923872"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/path\":{\"options\":{\"operationId\":\"options-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"head\":{\"operationId\":\"head-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequest86898773_09C7D592.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}},\"connect\":{\"operationId\":\"connect-path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequest3fc9280c_C82E08D0.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
      },
      "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRole_3BDAF59B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS/Handler/IamRole",
            "uniqueId": "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRole_3BDAF59B"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequest86898773_IamRole_A003777E.name}"
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.name}"
      },
      "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRolePolicy_880A6624": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS/Handler/IamRolePolicy",
            "uniqueId": "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRolePolicy_880A6624"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRole_3BDAF59B.name}"
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
      },
      "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRolePolicyAttachment_11B267B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRolePolicyAttachment_11B267B2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRole_3BDAF59B.name}"
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
      },
      "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_7DB6D861": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS/Handler/Default",
            "uniqueId": "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_7DB6D861"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8f5c667",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_49": "${jsonencode(aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url)}"
          }
        },
        "function_name": "Handler-c8f5c667",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_IamRole_3BDAF59B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_S3Object_0C20A415.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudApi_api_permissionCONNECTe2131352_9D0DACD1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-CONNECT-e2131352",
            "uniqueId": "root_cloudApi_api_permissionCONNECTe2131352_9D0DACD1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequest3fc9280c_C82E08D0.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/CONNECT/path",
        "statement_id": "AllowExecutionFromAPIGateway-CONNECT-e2131352"
      },
      "root_cloudApi_api_permissionHEADe2131352_A5621DDB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-HEAD-e2131352",
            "uniqueId": "root_cloudApi_api_permissionHEADe2131352_A5621DDB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequest86898773_09C7D592.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/HEAD/path",
        "statement_id": "AllowExecutionFromAPIGateway-HEAD-e2131352"
      },
      "root_cloudApi_api_permissionOPTIONSe2131352_9754E8A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-OPTIONS-e2131352",
            "uniqueId": "root_cloudApi_api_permissionOPTIONSe2131352_9754E8A7"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/OPTIONS/path",
        "statement_id": "AllowExecutionFromAPIGateway-OPTIONS-e2131352"
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
      "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_S3Object_0C20A415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS/Handler/S3Object",
            "uniqueId": "root_testhttpfetchcanpreformacalltoanapitoCONNECTHEADandOPTIONS_Handler_S3Object_0C20A415"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
const http = require('@winglang/sdk').http;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const api_OPTIONS_client = context._lift(api_OPTIONS);
        const path_client = context._lift(path);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api_OPTIONS: ${api_OPTIONS_client},
            path: ${path_client},
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
          $Closure1._registerBindObject(api_OPTIONS, host, []);
          $Closure1._registerBindObject(path, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(api_OPTIONS, host, []);
          $Closure1._registerBindObject(path, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const api_HEAD_client = context._lift(api_HEAD);
        const path_client = context._lift(path);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api_HEAD: ${api_HEAD_client},
            path: ${path_client},
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
          $Closure2._registerBindObject(api_HEAD, host, []);
          $Closure2._registerBindObject(path, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api_HEAD, host, []);
          $Closure2._registerBindObject(path, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const api_client = context._lift(api);
        const path_client = context._lift(path);
        const http_OPTIONS_client = context._lift(http_OPTIONS);
        const http_HEAD_client = context._lift(http_HEAD);
        const http_UtilClient = http.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api: ${api_client},
            path: ${path_client},
            http_OPTIONS: ${http_OPTIONS_client},
            http_HEAD: ${http_HEAD_client},
            http_Util: ${http_UtilClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure4._registerBindObject(api, host, []);
          $Closure4._registerBindObject(http_HEAD, host, []);
          $Closure4._registerBindObject(http_OPTIONS, host, []);
          $Closure4._registerBindObject(path, host, []);
        }
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(api.url, host, []);
          $Closure4._registerBindObject(http_HEAD, host, []);
          $Closure4._registerBindObject(http_OPTIONS, host, []);
          $Closure4._registerBindObject(path, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const api_OPTIONS = cloud.HttpMethod.OPTIONS;
    const http_OPTIONS = http.HttpMethod.OPTIONS;
    const api_HEAD = cloud.HttpMethod.HEAD;
    const http_HEAD = http.HttpMethod.HEAD;
    const api_CONNECT = cloud.HttpMethod.CONNECT;
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const path = "/path";
    (api.options(path,new $Closure1(this,"$Closure1")));
    (api.head(path,new $Closure2(this,"$Closure2")));
    (api.connect(path,new $Closure3(this,"$Closure3")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS",new $Closure4(this,"$Closure4"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "options", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


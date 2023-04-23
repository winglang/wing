# [api_valid_path.w](../../../../examples/tests/valid/api_valid_path.w) | compile | tf-aws

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
          "redeployment": "934e9973d7d898c43f960c4bc11231cc4be43a56"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/test\":{\"get\":{\"operationId\":\"get-test\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/alphanumer1cPa_th\":{\"get\":{\"operationId\":\"get-test/alphanumer1cPa_th\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/regular/path\":{\"get\":{\"operationId\":\"get-test/regular/path\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6\":{\"get\":{\"operationId\":\"get-test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"with\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"variable_s\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/test/param/is/{last}\":{\"get\":{\"operationId\":\"get-test/param/is/{last}\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"last\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
      "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicy_0281983F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_IamRolePolicy_0281983F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequeste46e5cb7_IamRole_15046B29.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
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
      "root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/Default",
            "uniqueId": "root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E"
          }
        },
        "environment": {
          "variables": {
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
      "root_cloudApi_api_permissionGET08e6e523_E4848AA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-08e6e523",
            "uniqueId": "root_cloudApi_api_permissionGET08e6e523_E4848AA4"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6",
        "statement_id": "AllowExecutionFromAPIGateway-GET-08e6e523"
      },
      "root_cloudApi_api_permissionGET8d6a8a39_56BCB29B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-8d6a8a39",
            "uniqueId": "root_cloudApi_api_permissionGET8d6a8a39_56BCB29B"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/test/regular/path",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8d6a8a39"
      },
      "root_cloudApi_api_permissionGET8dfdf611_255A0960": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-8dfdf611",
            "uniqueId": "root_cloudApi_api_permissionGET8dfdf611_255A0960"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/test/alphanumer1cPa_th",
        "statement_id": "AllowExecutionFromAPIGateway-GET-8dfdf611"
      },
      "root_cloudApi_api_permissionGETb53ce5f6_3164D41C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-b53ce5f6",
            "uniqueId": "root_cloudApi_api_permissionGETb53ce5f6_3164D41C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/test/param/is/{last}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-b53ce5f6"
      },
      "root_cloudApi_api_permissionGETe8d09b4f_716EA8C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e8d09b4f",
            "uniqueId": "root_cloudApi_api_permissionGETe8d09b4f_716EA8C2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequeste46e5cb7_489FDB7E.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/test",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e8d09b4f"
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
    const handler = new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    ;
    const test_invalid_path =  (path) =>  {
      {
        let error = "";
        const expected = `Invalid route ${path}. Url cannot contain \":\", params contains only alpha-numeric chars or \"_\".`;
        try {
          (api.get(path,handler));
        }
        catch ($error_e) {
          const e = $error_e.message;
          error = e;
        }
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === expected)'`)})((error === expected))};
      }
    }
    ;
    const test_valid_path =  (path) =>  {
      {
        let error = "";
        try {
          (api.get(path,handler));
        }
        catch ($error_e) {
          const e = $error_e.message;
          error = e;
        }
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "")'`)})((error === ""))};
      }
    }
    ;
    (test_invalid_path("/test/{sup:er/:annoying//path}"));
    (test_invalid_path("/test/{::another:annoying:path}"));
    (test_invalid_path("/test/n0t_alphanumer1cPa:th"));
    (test_invalid_path("/test/path/{with}/{two:invali4d#}/variables"));
    (test_invalid_path("/test/path/{unclosed"));
    (test_invalid_path("/test/m{issplaced}"));
    (test_invalid_path("/test/{misspla}ced"));
    (test_invalid_path("/test/{}/empty"));
    (test_valid_path("/test"));
    (test_valid_path("/test/alphanumer1cPa_th"));
    (test_valid_path("/test/regular/path"));
    (test_valid_path("/test/pa-th/{with}/two/{variable_s}/f?bla=5&b=6"));
    (test_valid_path("/test/param/is/{last}"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "api_valid_path", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc.85cd22e95db4b8ae13939c7cb02f67a11a2af3c66bd3ccb217b2336de0f22399/index.js
```js
async handle(req) {
  const {  } = this;
  return {
  "body": "ok",
  "status": 200,}
  ;
}

```

## proc1/index.js
```js
async handle(req) {
  const {  } = this;
  return {
  "body": "ok",
  "status": 200,}
  ;
}

```


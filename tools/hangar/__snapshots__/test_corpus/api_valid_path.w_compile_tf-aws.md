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

## tree.json
```json
{
  "version": "tree-0.1",
  "tree": {
    "id": "App",
    "path": "",
    "children": {
      "root": {
        "id": "root",
        "path": "root",
        "children": {
          "Default": {
            "id": "Default",
            "path": "root/Default",
            "children": {
              "aws": {
                "id": "aws",
                "path": "root/Default/aws",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.provider.AwsProvider",
                  "version": "12.0.2"
                }
              },
              "cloud.TestRunner": {
                "id": "cloud.TestRunner",
                "path": "root/Default/cloud.TestRunner",
                "children": {
                  "TestFunctionArns": {
                    "id": "TestFunctionArns",
                    "path": "root/Default/cloud.TestRunner/TestFunctionArns",
                    "constructInfo": {
                      "fqn": "cdktf.TerraformOutput",
                      "version": "0.15.2"
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.cloud.TestRunner",
                  "version": "0.0.0"
                },
                "display": {
                  "title": "TestRunner",
                  "description": "A suite of APIs for running tests and collecting results.",
                  "hidden": true
                }
              },
              "Default": {
                "id": "Default",
                "path": "root/Default/Default",
                "children": {
                  "cloud.Api": {
                    "id": "cloud.Api",
                    "path": "root/Default/Default/cloud.Api",
                    "children": {
                      "api": {
                        "id": "api",
                        "path": "root/Default/Default/cloud.Api/api",
                        "children": {
                          "api": {
                            "id": "api",
                            "path": "root/Default/Default/cloud.Api/api/api",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.apiGatewayRestApi.ApiGatewayRestApi",
                              "version": "12.0.2"
                            }
                          },
                          "deployment": {
                            "id": "deployment",
                            "path": "root/Default/Default/cloud.Api/api/deployment",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.apiGatewayDeployment.ApiGatewayDeployment",
                              "version": "12.0.2"
                            }
                          },
                          "stage": {
                            "id": "stage",
                            "path": "root/Default/Default/cloud.Api/api/stage",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.apiGatewayStage.ApiGatewayStage",
                              "version": "12.0.2"
                            }
                          },
                          "permission-GET-e8d09b4f": {
                            "id": "permission-GET-e8d09b4f",
                            "path": "root/Default/Default/cloud.Api/api/permission-GET-e8d09b4f",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.lambdaPermission.LambdaPermission",
                              "version": "12.0.2"
                            }
                          },
                          "permission-GET-8dfdf611": {
                            "id": "permission-GET-8dfdf611",
                            "path": "root/Default/Default/cloud.Api/api/permission-GET-8dfdf611",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.lambdaPermission.LambdaPermission",
                              "version": "12.0.2"
                            }
                          },
                          "permission-GET-8d6a8a39": {
                            "id": "permission-GET-8d6a8a39",
                            "path": "root/Default/Default/cloud.Api/api/permission-GET-8d6a8a39",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.lambdaPermission.LambdaPermission",
                              "version": "12.0.2"
                            }
                          },
                          "permission-GET-08e6e523": {
                            "id": "permission-GET-08e6e523",
                            "path": "root/Default/Default/cloud.Api/api/permission-GET-08e6e523",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.lambdaPermission.LambdaPermission",
                              "version": "12.0.2"
                            }
                          },
                          "permission-GET-b53ce5f6": {
                            "id": "permission-GET-b53ce5f6",
                            "path": "root/Default/Default/cloud.Api/api/permission-GET-b53ce5f6",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.lambdaPermission.LambdaPermission",
                              "version": "12.0.2"
                            }
                          }
                        },
                        "constructInfo": {
                          "fqn": "constructs.Construct",
                          "version": "10.1.245"
                        }
                      },
                      "cloud.Api-OnRequestHandler-e46e5cb7": {
                        "id": "cloud.Api-OnRequestHandler-e46e5cb7",
                        "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequestHandler-e46e5cb7",
                        "attributes": {
                          "wing:resource:stateful": false,
                          "wing:resource:connections": []
                        },
                        "constructInfo": {
                          "fqn": "@winglang/sdk.std.Resource",
                          "version": "0.0.0"
                        },
                        "display": {
                          "hidden": true
                        }
                      },
                      "cloud.Api-OnRequest-e46e5cb7": {
                        "id": "cloud.Api-OnRequest-e46e5cb7",
                        "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7",
                        "children": {
                          "Asset": {
                            "id": "Asset",
                            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/Asset",
                            "constructInfo": {
                              "fqn": "cdktf.TerraformAsset",
                              "version": "0.15.2"
                            }
                          },
                          "S3Object": {
                            "id": "S3Object",
                            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/S3Object",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                              "version": "12.0.2"
                            }
                          },
                          "IamRole": {
                            "id": "IamRole",
                            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRole",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                              "version": "12.0.2"
                            }
                          },
                          "IamRolePolicy": {
                            "id": "IamRolePolicy",
                            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicy",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                              "version": "12.0.2"
                            }
                          },
                          "IamRolePolicyAttachment": {
                            "id": "IamRolePolicyAttachment",
                            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/IamRolePolicyAttachment",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                              "version": "12.0.2"
                            }
                          },
                          "Default": {
                            "id": "Default",
                            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7/Default",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.lambdaFunction.LambdaFunction",
                              "version": "12.0.2"
                            }
                          }
                        },
                        "attributes": {
                          "wing:resource:stateful": false,
                          "wing:resource:connections": [
                            {
                              "direction": "outbound",
                              "relationship": "handle",
                              "resource": "root/Default/Default/$Inflight1",
                              "implicit": false
                            },
                            {
                              "direction": "inbound",
                              "relationship": "on_get_request",
                              "resource": "root/Default/Default/cloud.Api",
                              "implicit": false
                            }
                          ]
                        },
                        "constructInfo": {
                          "fqn": "@winglang/sdk.cloud.Function",
                          "version": "0.0.0"
                        },
                        "display": {
                          "title": "Function",
                          "description": "A cloud function (FaaS)"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": true,
                      "wing:resource:connections": [
                        {
                          "direction": "outbound",
                          "relationship": "on_get_request",
                          "resource": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Api",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Api",
                      "description": "A REST API endpoint"
                    }
                  },
                  "$Inflight1": {
                    "id": "$Inflight1",
                    "path": "root/Default/Default/$Inflight1",
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": [
                        {
                          "direction": "inbound",
                          "relationship": "handle",
                          "resource": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-e46e5cb7",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.std.Resource",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Inflight",
                      "description": "An inflight resource",
                      "hidden": true
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.std.Resource",
                  "version": "0.0.0"
                }
              },
              "Region": {
                "id": "Region",
                "path": "root/Default/Region",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.dataAwsRegion.DataAwsRegion",
                  "version": "12.0.2"
                }
              },
              "Code": {
                "id": "Code",
                "path": "root/Default/Code",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                  "version": "12.0.2"
                }
              }
            },
            "constructInfo": {
              "fqn": "@winglang/sdk.core.CdktfApp",
              "version": "0.0.0"
            }
          },
          "backend": {
            "id": "backend",
            "path": "root/backend",
            "constructInfo": {
              "fqn": "cdktf.LocalBackend",
              "version": "0.15.2"
            }
          }
        },
        "constructInfo": {
          "fqn": "cdktf.TerraformStack",
          "version": "0.15.2"
        }
      }
    },
    "constructInfo": {
      "fqn": "cdktf.App",
      "version": "0.15.2"
    }
  }
}
```


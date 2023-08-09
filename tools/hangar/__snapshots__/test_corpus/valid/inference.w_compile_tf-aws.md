# [inference.w](../../../../../examples/tests/valid/inference.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      return ({"body": request.body,"status": 200});
    }
  }
  return $Closure1;
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
          "redeployment": "06d5d79d88a464ffe5666fff8744c6bcc926732c"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.undefined_Region_1B664D6B.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
    "aws_iam_role": {
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRole",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
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
      }
    },
    "aws_lambda_permission": {
      "undefined_cloudApi_api_permission-GET-ceca4943_D7D5D680": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/permission-GET-ceca4943",
            "uniqueId": "undefined_cloudApi_api_permission-GET-ceca4943_D7D5D680"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.undefined_cloudApi_api_3000E149.execution_arn}/*/GET/hello/world",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ceca4943"
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
    }
    const preflightClosure = ((nice) => {
      {console.log(nice)};
      return true;
    });
    const recursiveClosure = ((nice) => {
      if (false) {
        return (recursiveClosure(nice));
      }
    });
    (recursiveClosure(2));
    const emptyArray = [];
    const num_array = emptyArray;
    const emptyArray2 = [];
    const clonedArray2 = [...(emptyArray2)];
    (clonedArray2.push(1));
    (clonedArray2.push(2));
    (clonedArray2.push(((clonedArray2.at(0)) + (clonedArray2.at(1)))));
    {((cond) => {if (!cond) throw new Error("assertion failed: clonedArray2.at(2) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((clonedArray2.at(2)),3)))};
    const emptySet = new Set([(clonedArray2.at(2))]);
    const clonedSet = new Set(emptySet);
    (clonedSet.add(4));
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const func = new $Closure1(this,"$Closure1");
    if (true) {
      (api.get("/hello/world",func));
    }
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inference", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


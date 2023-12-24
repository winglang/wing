# [inference.test.w](../../../../../examples/tests/valid/inference.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      return ({"body": request.body, "status": 200});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
        "Default": {
          "Default": {
            "cloud.Api": {
              "Endpoint": {
                "Url": "cloudApi_Endpoint_Url_CD8AC9A6"
              }
            }
          }
        }
      }
    }
  },
  "data": {
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_hello_world_0_544AFF00.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
    "aws_cloudwatch_log_group": {
      "cloudApi_get_hello_world_0_CloudwatchLogGroup_1B6F3287": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_hello_world_0_CloudwatchLogGroup_1B6F3287"
          }
        },
        "name": "/aws/lambda/get_hello_world_-0-c88edd5b",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_hello_world_0_IamRole_18803888": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world_}0/IamRole",
            "uniqueId": "cloudApi_get_hello_world_0_IamRole_18803888"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_hello_world_0_IamRolePolicy_6EFA235E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_hello_world_0_IamRolePolicy_6EFA235E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_hello_world_0_IamRole_18803888.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_hello_world_0_IamRolePolicyAttachment_80FC0127": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_hello_world_0_IamRolePolicyAttachment_80FC0127"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_hello_world_0_IamRole_18803888.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_hello_world_0_544AFF00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world_}0/Default",
            "uniqueId": "cloudApi_get_hello_world_0_544AFF00"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_hello_world_-0-c88edd5b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_hello_world_-0-c88edd5b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_hello_world_0_IamRole_18803888.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_hello_world_0_S3Object_A19D89E0.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-ceca4943_9997DB29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-ceca4943",
            "uniqueId": "cloudApi_api_permission-GET-ceca4943_9997DB29"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_hello_world_0_544AFF00.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/hello/world",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ceca4943"
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
      }
    },
    "aws_s3_object": {
      "cloudApi_get_hello_world_0_S3Object_A19D89E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world_}0/S3Object",
            "uniqueId": "cloudApi_get_hello_world_0_S3Object_A19D89E0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
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
    ((obj, args) => { obj.push(...args); })(clonedArray2, [1]);
    ((obj, args) => { obj.push(...args); })(clonedArray2, [2]);
    ((obj, args) => { obj.push(...args); })(clonedArray2, [(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(clonedArray2, 0) + ((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(clonedArray2, 1))]);
    {((cond) => {if (!cond) throw new Error("assertion failed: clonedArray2.at(2) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(clonedArray2, 2),3)))};
    const emptySet = new Set([((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(clonedArray2, 2)]);
    const clonedSet = new Set(emptySet);
    (clonedSet.add(4));
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
    const func = new $Closure1(this, "$Closure1");
    (api.get("/hello/world", func));
    const argReturn = ((n) => {
      return n;
    });
    const implicitReturn = (() => {
      return 1;
    });
    if (true) {
      const a = (argReturn(1));
      const b = (implicitReturn());
    }
    const returnsString = (() => {
      return "hi";
    });
    const shouldBeString = (returnsString());
    const stringArray = [shouldBeString];
    const closureWithUnwrapping = ((optionalString) => {
      {
        const $if_let_value = optionalString;
        if ($if_let_value != undefined) {
          const justString = $if_let_value;
          {console.log(justString)};
        }
      }
    });
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inference.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


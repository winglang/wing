# [aws-api.test.w](../../../../../../examples/tests/sdk_tests/api/aws-api.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"status": 200});
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $apiName }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $apiName;
        if ($if_let_value != undefined) {
          const api = $if_let_value;
          {((cond) => {if (!cond) throw new Error("assertion failed: api.get(\"restApiArn\").contains(\"arn:aws:execute-api:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "restApiArn").includes("arn:aws:execute-api:"))};
          {((cond) => {if (!cond) throw new Error("assertion failed: api.get(\"restApiArn\").contains(api.get(\"restApiId\"))")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "restApiArn").includes(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "restApiId")))};
          {((cond) => {if (!cond) throw new Error("assertion failed: api.get(\"invokeUrl\").contains(\"https://\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "invokeUrl").includes("https://"))};
          {((cond) => {if (!cond) throw new Error("assertion failed: api.get(\"invokeUrl\").contains(api.get(\"restApiId\"))")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "invokeUrl").includes(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "restApiId")))};
          {((cond) => {if (!cond) throw new Error("assertion failed: api.get(\"invokeUrl\").contains(api.get(\"stageName\"))")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "invokeUrl").includes(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(api, "stageName")))};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
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
    "outputs": {}
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
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "api_deployment_4CFF72BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/deployment",
            "uniqueId": "api_deployment_4CFF72BC"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.api_DD79FE08.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.api_DD79FE08.body)}"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "api_DD79FE08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/api",
            "uniqueId": "api_DD79FE08"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/api\":{\"get\":{\"operationId\":\"get-api\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.api_get_api_0_80CC0CB8.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8c33ffd"
      }
    },
    "aws_api_gateway_stage": {
      "api_stage_ABA3AD8B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/stage",
            "uniqueId": "api_stage_ABA3AD8B"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.api_deployment_4CFF72BC.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.api_DD79FE08.id}",
        "stage_name": "prod"
      }
    },
    "aws_cloudwatch_log_group": {
      "api_get_api_0_CloudwatchLogGroup_3A146126": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api_}0/CloudwatchLogGroup",
            "uniqueId": "api_get_api_0_CloudwatchLogGroup_3A146126"
          }
        },
        "name": "/aws/lambda/get_api_-0-c8a09fa4",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "api_get_api_0_IamRole_EB61CF92": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api_}0/IamRole",
            "uniqueId": "api_get_api_0_IamRole_EB61CF92"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "api_get_api_0_IamRolePolicy_91C67C80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api_}0/IamRolePolicy",
            "uniqueId": "api_get_api_0_IamRolePolicy_91C67C80"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.api_get_api_0_IamRole_EB61CF92.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "api_get_api_0_IamRolePolicyAttachment_E4D8A20D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api_}0/IamRolePolicyAttachment",
            "uniqueId": "api_get_api_0_IamRolePolicyAttachment_E4D8A20D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.api_get_api_0_IamRole_EB61CF92.name}"
      }
    },
    "aws_lambda_function": {
      "api_get_api_0_80CC0CB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api_}0/Default",
            "uniqueId": "api_get_api_0_80CC0CB8"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_api_-0-c8a09fa4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_api_-0-c8a09fa4",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.api_get_api_0_IamRole_EB61CF92.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.api_get_api_0_S3Object_797A12CE.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "api_permission-GET-77bab856_CA593EA0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/api/permission-GET-77bab856",
            "uniqueId": "api_permission-GET-77bab856_CA593EA0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.api_get_api_0_80CC0CB8.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.api_DD79FE08.execution_arn}/*/GET/api",
        "statement_id": "AllowExecutionFromAPIGateway-GET-77bab856"
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
      "api_get_api_0_S3Object_797A12CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/api/get_api_}0/S3Object",
            "uniqueId": "api_get_api_0_S3Object_797A12CE"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const aws = $stdlib.aws;
const util = $stdlib.util;
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
          require("././inflight.$Closure1-1.cjs")({
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
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure2-1.cjs")({
            $apiName: ${$stdlib.core.liftObject(apiName)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(apiName, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "api");
    (api.get("/api", new $Closure1(this, "$Closure1")));
    const getApiInfo = ((a) => {
      {
        const $if_let_value = (aws.Api.from(a));
        if ($if_let_value != undefined) {
          const api = $if_let_value;
          return ({"restApiArn": api.restApiArn, "restApiId": api.restApiId, "restApiName": api.restApiName, "stageName": api.stageName, "invokeUrl": api.invokeUrl, "deploymentId": api.deploymentId});
        }
      }
      return undefined;
    });
    const apiName = (getApiInfo(api));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS Api", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-api.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


# [api.test.w](../../../../../examples/tests/valid/api.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $counter, $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(request) {
      const count = (await $counter.inc());
      const bodyResponse = ({"count": count});
      const resp = ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([bodyResponse]), "headers": ({"content-type": "application/json"}), "status": 200});
      return resp;
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $api_url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = $api_url;
      {((cond) => {if (!cond) throw new Error("assertion failed: url.startsWith(\"http\")")})(url.startsWith("http"))};
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $__parent_this_3_api_url }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const text = String.raw({ raw: ["", "/endpoint2"] }, $__parent_this_3_api_url);
      return ({"status": 200, "body": text});
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.A-1.js
```js
"use strict";
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
}
//# sourceMappingURL=inflight.A-1.js.map
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
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
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
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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
      "A_cloudApi_api_deployment_8CFEA08D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/deployment",
            "uniqueId": "A_cloudApi_api_deployment_8CFEA08D"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.body)}"
        }
      },
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
      "A_cloudApi_api_37FCEF91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/api",
            "uniqueId": "A_cloudApi_api_37FCEF91"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/endpoint1\":{\"get\":{\"operationId\":\"get-endpoint1\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.A_cloudApi_cloudApi-OnRequest-1988da_C0BE3003.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c8c7a7a3"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-fec0a2_AB3CDCCB.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "lifecycle": {
          "create_before_destroy": true
        },
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "A_cloudApi_api_stage_6D822CCE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/stage",
            "uniqueId": "A_cloudApi_api_stage_6D822CCE"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.A_cloudApi_api_deployment_8CFEA08D.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.id}",
        "stage_name": "prod"
      },
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
      "A_cloudApi_cloudApi-OnRequest-1988da_CloudwatchLogGroup_E9A05426": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-1988da/CloudwatchLogGroup",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-1988da_CloudwatchLogGroup_E9A05426"
          }
        },
        "name": "/aws/lambda/cloud-Api-OnRequest-1988da-c8bbad7f",
        "retention_in_days": 30
      },
      "cloudApi_cloudApi-OnRequest-fec0a2_CloudwatchLogGroup_9F56D403": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-fec0a2/CloudwatchLogGroup",
            "uniqueId": "cloudApi_cloudApi-OnRequest-fec0a2_CloudwatchLogGroup_9F56D403"
          }
        },
        "name": "/aws/lambda/cloud-Api-OnRequest-fec0a2-c80cb963",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "A_cloudApi_cloudApi-OnRequest-1988da_IamRole_F76555C7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-1988da/IamRole",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-1988da_IamRole_F76555C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_cloudApi-OnRequest-fec0a2_IamRole_FEF5D829": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-fec0a2/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-fec0a2_IamRole_FEF5D829"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "A_cloudApi_cloudApi-OnRequest-1988da_IamRolePolicy_C64A3763": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-1988da/IamRolePolicy",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-1988da_IamRolePolicy_C64A3763"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.A_cloudApi_cloudApi-OnRequest-1988da_IamRole_F76555C7.name}"
      },
      "cloudApi_cloudApi-OnRequest-fec0a2_IamRolePolicy_70D707DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-fec0a2/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-fec0a2_IamRolePolicy_70D707DD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-fec0a2_IamRole_FEF5D829.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "A_cloudApi_cloudApi-OnRequest-1988da_IamRolePolicyAttachment_5453B632": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-1988da/IamRolePolicyAttachment",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-1988da_IamRolePolicyAttachment_5453B632"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.A_cloudApi_cloudApi-OnRequest-1988da_IamRole_F76555C7.name}"
      },
      "cloudApi_cloudApi-OnRequest-fec0a2_IamRolePolicyAttachment_A59DED88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-fec0a2/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-fec0a2_IamRolePolicyAttachment_A59DED88"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-fec0a2_IamRole_FEF5D829.name}"
      }
    },
    "aws_lambda_function": {
      "A_cloudApi_cloudApi-OnRequest-1988da_C0BE3003": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-1988da/Default",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-1988da_C0BE3003"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-1988da-c8bbad7f",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_31_EXECUTE_API_TFTOKEN_TOKEN_24_AMAZONAWS_COM_TFTOKEN_TOKEN_32": "${jsonencode(\"https://${aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.A_cloudApi_api_stage_6D822CCE.stage_name}\")}"
          }
        },
        "function_name": "cloud-Api-OnRequest-1988da-c8bbad7f",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.A_cloudApi_cloudApi-OnRequest-1988da_IamRole_F76555C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.A_cloudApi_cloudApi-OnRequest-1988da_S3Object_563990D8.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_cloudApi-OnRequest-fec0a2_AB3CDCCB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-fec0a2/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-fec0a2_AB3CDCCB"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-fec0a2-c80cb963",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-fec0a2-c80cb963",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-fec0a2_IamRole_FEF5D829.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-fec0a2_S3Object_1600F643.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "A_cloudApi_api_permission-GET-1454206f_5CDB71B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/permission-GET-1454206f",
            "uniqueId": "A_cloudApi_api_permission-GET-1454206f_5CDB71B7"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.A_cloudApi_cloudApi-OnRequest-1988da_C0BE3003.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.execution_arn}/*/GET/endpoint1",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1454206f"
      },
      "cloudApi_api_permission-GET-ceca4943_9997DB29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-ceca4943",
            "uniqueId": "cloudApi_api_permission-GET-ceca4943_9997DB29"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-fec0a2_AB3CDCCB.function_name}",
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
      "A_cloudApi_cloudApi-OnRequest-1988da_S3Object_563990D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-1988da/S3Object",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-1988da_S3Object_563990D8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_cloudApi-OnRequest-fec0a2_S3Object_1600F643": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-fec0a2/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-fec0a2_S3Object_1600F643"
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
            $counter: ${$stdlib.core.liftObject(counter)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(counter, host, ["inc"]);
        }
        super._registerOnLift(host, ops);
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
          require("./inflight.$Closure2-1.js")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(api.url, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.Resource {
          _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType() {
            return `
              require("./inflight.$Closure3-1.js")({
                $__parent_this_3_api_url: ${$stdlib.core.liftObject(__parent_this_3.api.url)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure3Client = ${$Closure3._toInflightType(this)};
                const client = new $Closure3Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _supportedOps() {
            return ["handle", "$inflight_init"];
          }
          _registerOnLift(host, ops) {
            if (ops.includes("handle")) {
              $Closure3._registerOnLiftObject(__parent_this_3.api.url, host, []);
            }
            super._registerOnLift(host, ops);
          }
        }
        (this.api.get("/endpoint1", new $Closure3(this, "$Closure3")));
      }
      static _toInflightType() {
        return `
          require("./inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
    const counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    const handler = new $Closure1(this, "$Closure1");
    (api.get("/hello/world", handler));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:api url", new $Closure2(this, "$Closure2"));
    new A(this, "A");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "api.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


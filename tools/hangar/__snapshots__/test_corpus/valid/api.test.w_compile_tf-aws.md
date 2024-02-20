# [api.test.w](../../../../../examples/tests/valid/api.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
      const resp = ({"body": ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(bodyResponse), "headers": ({["content-type"]: "application/json"}), "status": 200});
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
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const url = $api_url;
      $helpers.assert(url.startsWith("http"), "url.startsWith(\"http\")");
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
const $helpers = require("@winglang/sdk/lib/helpers");
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
      "version": "0.20.3"
    },
    "outputs": {
      "root": {
        "Default": {
          "Default": {
            "A": {
              "cloud.Api": {
                "Endpoint": {
                  "Url": "A_cloudApi_Endpoint_Url_77CB2098"
                }
              }
            },
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
    "A_cloudApi_Endpoint_Url_77CB2098": {
      "value": "https://${aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.A_cloudApi_api_stage_6D822CCE.stage_name}"
    },
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/endpoint1\":{\"get\":{\"operationId\":\"get-endpoint1\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_endpoint10-c85d0b50/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_hello_world0-c8d20d3c/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "A_cloudApi_get_endpoint10_CloudwatchLogGroup_4BD4AFFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/get_endpoint10/CloudwatchLogGroup",
            "uniqueId": "A_cloudApi_get_endpoint10_CloudwatchLogGroup_4BD4AFFD"
          }
        },
        "name": "/aws/lambda/get_endpoint10-c85d0b50",
        "retention_in_days": 30
      },
      "cloudApi_get_hello_world0_CloudwatchLogGroup_29C4F429": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_hello_world0_CloudwatchLogGroup_29C4F429"
          }
        },
        "name": "/aws/lambda/get_hello_world0-c8d20d3c",
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
      "A_cloudApi_get_endpoint10_IamRole_9ABC6EDD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/get_endpoint10/IamRole",
            "uniqueId": "A_cloudApi_get_endpoint10_IamRole_9ABC6EDD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_hello_world0_IamRole_E302D75D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world0/IamRole",
            "uniqueId": "cloudApi_get_hello_world0_IamRole_E302D75D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "A_cloudApi_get_endpoint10_IamRolePolicy_8DF88DF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/get_endpoint10/IamRolePolicy",
            "uniqueId": "A_cloudApi_get_endpoint10_IamRolePolicy_8DF88DF1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.A_cloudApi_get_endpoint10_IamRole_9ABC6EDD.name}"
      },
      "cloudApi_get_hello_world0_IamRolePolicy_56CA9635": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world0/IamRolePolicy",
            "uniqueId": "cloudApi_get_hello_world0_IamRolePolicy_56CA9635"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudApi_get_hello_world0_IamRole_E302D75D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "A_cloudApi_get_endpoint10_IamRolePolicyAttachment_1D18524A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/get_endpoint10/IamRolePolicyAttachment",
            "uniqueId": "A_cloudApi_get_endpoint10_IamRolePolicyAttachment_1D18524A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.A_cloudApi_get_endpoint10_IamRole_9ABC6EDD.name}"
      },
      "cloudApi_get_hello_world0_IamRolePolicyAttachment_861BE130": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_hello_world0_IamRolePolicyAttachment_861BE130"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_hello_world0_IamRole_E302D75D.name}"
      }
    },
    "aws_lambda_function": {
      "A_cloudApi_get_endpoint10_4C55BA1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/get_endpoint10/Default",
            "uniqueId": "A_cloudApi_get_endpoint10_4C55BA1A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_endpoint10-c85d0b50",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_HTTPS_TFTOKEN_TOKEN_33_EXECUTE_API_TFTOKEN_TOKEN_25_AMAZONAWS_COM_TFTOKEN_TOKEN_34": "${jsonencode(\"https://${aws_api_gateway_rest_api.A_cloudApi_api_37FCEF91.id}.execute-api.${data.aws_region.Region.name}.amazonaws.com/${aws_api_gateway_stage.A_cloudApi_api_stage_6D822CCE.stage_name}\")}"
          }
        },
        "function_name": "get_endpoint10-c85d0b50",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.A_cloudApi_get_endpoint10_IamRole_9ABC6EDD.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.A_cloudApi_get_endpoint10_S3Object_0D156109.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_hello_world0_5CAA6AF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world0/Default",
            "uniqueId": "cloudApi_get_hello_world0_5CAA6AF9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_hello_world0-c8d20d3c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_hello_world0-c8d20d3c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_hello_world0_IamRole_E302D75D.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_hello_world0_S3Object_07DCCF6D.key}",
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
        "function_name": "${aws_lambda_function.A_cloudApi_get_endpoint10_4C55BA1A.function_name}",
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
        "function_name": "${aws_lambda_function.cloudApi_get_hello_world0_5CAA6AF9.function_name}",
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
      "A_cloudApi_get_endpoint10_S3Object_0D156109": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/get_endpoint10/S3Object",
            "uniqueId": "A_cloudApi_get_endpoint10_S3Object_0D156109"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_hello_world0_S3Object_07DCCF6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_hello_world0/S3Object",
            "uniqueId": "cloudApi_get_hello_world0_S3Object_07DCCF6D"
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
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
            $counter: ${$stdlib.core.liftObject(counter)},
            $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
            [$stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"), ["stringify"]],
            [counter, ["inc"]],
          ],
          "$inflight_init": [
            [counter, []],
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
            $api_url: ${$stdlib.core.liftObject(api.url)},
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
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
                $__parent_this_3_api_url: ${$stdlib.core.liftObject(__parent_this_3.api.url)},
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
                [__parent_this_3.api.url, []],
              ],
              "$inflight_init": [
                [__parent_this_3.api.url, []],
              ],
            });
          }
        }
        (this.api.get("/endpoint1", new $Closure3(this, "$Closure3")));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.A-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType()};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
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


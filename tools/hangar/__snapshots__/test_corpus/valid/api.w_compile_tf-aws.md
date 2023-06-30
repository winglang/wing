# [api.w](../../../../../examples/tests/valid/api.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ counter, std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(request)  {
      const count = (await counter.inc());
      const bodyResponse = Object.freeze({"count":count});
      const resp = {
      "body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([bodyResponse]),
      "headers": Object.freeze({"content-type":"application/json"}),
      "status": 200,}
      ;
      return resp;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ api }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const url = api.url;
      {((cond) => {if (!cond) throw new Error("assertion failed: url.startsWith(\"http\")")})(url.startsWith("http"))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ __parent_this_3 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(req)  {
      const text = String.raw({ raw: ["", "/endpoint2"] }, __parent_this_3.api.url);
      return {
      "status": 200,
      "body": text,}
      ;
    }
  }
  return $Closure3;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor({ api }) {
      this.api = api;
    }
    async $inflight_init()  {
    }
  }
  return A;
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
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:api url\",\"${aws_lambda_function.testapiurl_Handler_7D451301.arn}\"]]"
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
          "redeployment": "66f9e4b69146527e1951e6308dc9128a3ca41abb"
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
          "redeployment": "06d5d79d88a464ffe5666fff8744c6bcc926732c"
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/endpoint1\":{\"get\":{\"operationId\":\"get-endpoint1\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.A_cloudApi_cloudApi-OnRequest-73c5308f_E645B0BE.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c8c7a7a3"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
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
      "A_cloudApi_cloudApi-OnRequest-73c5308f_IamRole_318C449E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/IamRole",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-73c5308f_IamRole_318C449E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRole",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testapiurl_Handler_IamRole_DD062BAC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/IamRole",
            "uniqueId": "testapiurl_Handler_IamRole_DD062BAC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "A_cloudApi_cloudApi-OnRequest-73c5308f_IamRolePolicy_4FEB7AD7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/IamRolePolicy",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-73c5308f_IamRolePolicy_4FEB7AD7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.A_cloudApi_cloudApi-OnRequest-73c5308f_IamRole_318C449E.name}"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicy_8BF9C89F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicy_8BF9C89F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.name}"
      },
      "testapiurl_Handler_IamRolePolicy_E5640AD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/IamRolePolicy",
            "uniqueId": "testapiurl_Handler_IamRolePolicy_E5640AD9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testapiurl_Handler_IamRole_DD062BAC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "A_cloudApi_cloudApi-OnRequest-73c5308f_IamRolePolicyAttachment_B3C5BE3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/IamRolePolicyAttachment",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-73c5308f_IamRolePolicyAttachment_B3C5BE3B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.A_cloudApi_cloudApi-OnRequest-73c5308f_IamRole_318C449E.name}"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicyAttachment_5383D6A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_IamRolePolicyAttachment_5383D6A2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.name}"
      },
      "testapiurl_Handler_IamRolePolicyAttachment_564B7A5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/IamRolePolicyAttachment",
            "uniqueId": "testapiurl_Handler_IamRolePolicyAttachment_564B7A5D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testapiurl_Handler_IamRole_DD062BAC.name}"
      }
    },
    "aws_lambda_function": {
      "A_cloudApi_cloudApi-OnRequest-73c5308f_E645B0BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/Default",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-73c5308f_E645B0BE"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C8B1D888": "${aws_api_gateway_stage.A_cloudApi_api_stage_6D822CCE.invoke_url}",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-73c5308f-c85168bb",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_41": "${jsonencode(aws_api_gateway_stage.A_cloudApi_api_stage_6D822CCE.invoke_url)}"
          }
        },
        "function_name": "cloud-Api-OnRequest-73c5308f-c85168bb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.A_cloudApi_cloudApi-OnRequest-73c5308f_IamRole_318C449E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.A_cloudApi_cloudApi-OnRequest-73c5308f_S3Object_1BF80DF3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/Default",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-cdafee6e-c8147384",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-cdafee6e-c8147384",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudApi_cloudApi-OnRequest-cdafee6e_IamRole_4382C442.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testapiurl_Handler_7D451301": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/Default",
            "uniqueId": "testapiurl_Handler_7D451301"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8315524",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_21": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c8315524",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testapiurl_Handler_IamRole_DD062BAC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testapiurl_Handler_S3Object_20B7D72E.key}",
        "timeout": 30,
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
        "function_name": "${aws_lambda_function.A_cloudApi_cloudApi-OnRequest-73c5308f_E645B0BE.function_name}",
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
        "function_name": "${aws_lambda_function.cloudApi_cloudApi-OnRequest-cdafee6e_A6C8366F.function_name}",
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
      "A_cloudApi_cloudApi-OnRequest-73c5308f_S3Object_1BF80DF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/S3Object",
            "uniqueId": "A_cloudApi_cloudApi-OnRequest-73c5308f_S3Object_1BF80DF3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/S3Object",
            "uniqueId": "cloudApi_cloudApi-OnRequest-cdafee6e_S3Object_5DAAA0EF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testapiurl_Handler_S3Object_20B7D72E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/S3Object",
            "uniqueId": "testapiurl_Handler_S3Object_20B7D72E"
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
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const counter_client = context._lift(counter);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Closure1._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(counter, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const api_client = context._lift(api);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            api: ${api_client},
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
          $Closure2._registerBindObject(api, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this.display.hidden = true;
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure3.js";
            const __parent_this_3_client = context._lift(__parent_this_3);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                __parent_this_3: ${__parent_this_3_client},
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
              $Closure3._registerBindObject(__parent_this_3, host, []);
            }
            if (ops.includes("handle")) {
              $Closure3._registerBindObject(__parent_this_3.api.url, host, []);
            }
            super._registerBind(host, ops);
          }
        }
        (this.api.get("/endpoint1",new $Closure3(this,"$Closure3")));
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.A.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const api_client = this._lift(this.api);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
              api: ${api_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          A._registerBindObject(this.api, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const handler = new $Closure1(this,"$Closure1");
    (api.get("/hello/world",handler));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:api url",new $Closure2(this,"$Closure2"));
    new A(this,"A");
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "api", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


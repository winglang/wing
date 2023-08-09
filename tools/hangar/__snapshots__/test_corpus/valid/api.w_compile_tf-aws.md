# [api.w](../../../../../examples/tests/valid/api.w) | compile | tf-aws

## inflight.$Closure1.js
```js
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
      const resp = ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]) })([bodyResponse]),"headers": ({"content-type": "application/json"}),"status": 200});
      return resp;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
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

```

## inflight.$Closure3.js
```js
module.exports = function({ $__parent_this_3_api_url }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      const text = String.raw({ raw: ["", "/endpoint2"] }, $__parent_this_3_api_url);
      return ({"status": 200,"body": text});
    }
  }
  return $Closure3;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor({  }) {
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
      "value": "[[\"root/undefined/Default/test:api url\",\"${aws_lambda_function.undefined_testapiurl_Handler_E84AF590.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "undefined_A_cloudApi_api_deployment_E68952FA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/api/deployment",
            "uniqueId": "undefined_A_cloudApi_api_deployment_E68952FA"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_A_cloudApi_api_08B88EBD.id}",
        "triggers": {
          "redeployment": "ee737a93987c97858ba9524a5b87b2ff1b0e62e4"
        }
      },
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
      "undefined_A_cloudApi_api_08B88EBD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/api/api",
            "uniqueId": "undefined_A_cloudApi_api_08B88EBD"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/endpoint1\":{\"get\":{\"operationId\":\"get-endpoint1\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.undefined_Region_1B664D6B.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_0340F6C3.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c808a7bf"
      },
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
      "undefined_A_cloudApi_api_stage_F0650888": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/api/stage",
            "uniqueId": "undefined_A_cloudApi_api_stage_F0650888"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.undefined_A_cloudApi_api_deployment_E68952FA.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_A_cloudApi_api_08B88EBD.id}",
        "stage_name": "prod"
      },
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
    "aws_dynamodb_table": {
      "undefined_cloudCounter_4B4E77ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Counter/Default",
            "uniqueId": "undefined_cloudCounter_4B4E77ED"
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
        "name": "wing-counter-cloud.Counter-c86bae23"
      }
    },
    "aws_iam_role": {
      "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRole_211EA112": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/cloud.Api-OnRequest-a9d3bf5c/IamRole",
            "uniqueId": "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRole_211EA112"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRole",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testapiurl_Handler_IamRole_C4E3E4D7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:api url/Handler/IamRole",
            "uniqueId": "undefined_testapiurl_Handler_IamRole_C4E3E4D7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRolePolicy_F103D410": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/cloud.Api-OnRequest-a9d3bf5c/IamRolePolicy",
            "uniqueId": "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRolePolicy_F103D410"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRole_211EA112.name}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicy_2E3DCD14": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicy_2E3DCD14"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
      },
      "undefined_testapiurl_Handler_IamRolePolicy_9F80268E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:api url/Handler/IamRolePolicy",
            "uniqueId": "undefined_testapiurl_Handler_IamRolePolicy_9F80268E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testapiurl_Handler_IamRole_C4E3E4D7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRolePolicyAttachment_7B0DCA0D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/cloud.Api-OnRequest-a9d3bf5c/IamRolePolicyAttachment",
            "uniqueId": "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRolePolicyAttachment_7B0DCA0D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRole_211EA112.name}"
      },
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicyAttachment_66336CBE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRolePolicyAttachment_66336CBE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudApi_cloudApi-OnRequest-83b2983f_IamRole_2837BADD.name}"
      },
      "undefined_testapiurl_Handler_IamRolePolicyAttachment_FD51E70E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:api url/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testapiurl_Handler_IamRolePolicyAttachment_FD51E70E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testapiurl_Handler_IamRole_C4E3E4D7.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_0340F6C3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/cloud.Api-OnRequest-a9d3bf5c/Default",
            "uniqueId": "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_0340F6C3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-a9d3bf5c-c831136d",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_42": "${jsonencode(aws_api_gateway_stage.undefined_A_cloudApi_api_stage_F0650888.invoke_url)}"
          }
        },
        "function_name": "cloud-Api-OnRequest-a9d3bf5c-c831136d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_IamRole_211EA112.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_S3Object_846CE68B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/cloud.Api-OnRequest-83b2983f/Default",
            "uniqueId": "undefined_cloudApi_cloudApi-OnRequest-83b2983f_3EFB36ED"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
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
      },
      "undefined_testapiurl_Handler_E84AF590": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:api url/Handler/Default",
            "uniqueId": "undefined_testapiurl_Handler_E84AF590"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8cf004b",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_21": "${jsonencode(aws_api_gateway_stage.undefined_cloudApi_api_stage_A2D24536.invoke_url)}"
          }
        },
        "function_name": "Handler-c8cf004b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testapiurl_Handler_IamRole_C4E3E4D7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testapiurl_Handler_S3Object_14C1ACB8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_A_cloudApi_api_permission-GET-1454206f_27F237F5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/api/permission-GET-1454206f",
            "uniqueId": "undefined_A_cloudApi_api_permission-GET-1454206f_27F237F5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_0340F6C3.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.undefined_A_cloudApi_api_08B88EBD.execution_arn}/*/GET/endpoint1",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1454206f"
      },
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
      "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_S3Object_846CE68B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Api/cloud.Api-OnRequest-a9d3bf5c/S3Object",
            "uniqueId": "undefined_A_cloudApi_cloudApi-OnRequest-a9d3bf5c_S3Object_846CE68B"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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
      },
      "undefined_testapiurl_Handler_S3Object_14C1ACB8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:api url/Handler/S3Object",
            "uniqueId": "undefined_testapiurl_Handler_S3Object_14C1ACB8"
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
            $counter: ${context._lift(counter)},
            $std_Json: ${context._lift(std.Json)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(counter, host, ["inc"]);
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $api_url: ${context._lift(api.url)},
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
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(api.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        const __parent_this_3 = this;
        class $Closure3 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure3.js")({
                $__parent_this_3_api_url: ${context._lift(__parent_this_3.api.url)},
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
            if (ops.includes("handle")) {
              $Closure3._registerBindObject(__parent_this_3.api.url, host, []);
            }
            super._registerBind(host, ops);
          }
        }
        (this.api.get("/endpoint1",new $Closure3(this,"$Closure3")));
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.A.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "api", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


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
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'url.startsWith("http")'`)})(url.startsWith("http"))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ __parent_this }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(req)  {
      const text = `${__parent_this.api.url}/endpoint2`;
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
      const __parent_this = this;
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
      "value": "[[\"root/Default/Default/test:api url\",\"${aws_lambda_function.root_testapiurl_Handler_269705C1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "root_A_cloudApi_api_deployment_308A0AB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/deployment",
            "uniqueId": "root_A_cloudApi_api_deployment_308A0AB8"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.root_A_cloudApi_api_A554547B.id}",
        "triggers": {
          "redeployment": "8d85f556eceab603684e614bfa994e4559716a60"
        }
      },
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
          "redeployment": "06d5d79d88a464ffe5666fff8744c6bcc926732c"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "root_A_cloudApi_api_A554547B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/api",
            "uniqueId": "root_A_cloudApi_api_A554547B"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/endpoint1\":{\"get\":{\"operationId\":\"get-endpoint1\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_A_cloudApi_cloudApiOnRequest73c5308f_F3914485.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c8c7a7a3"
      },
      "root_cloudApi_api_8C9FE51E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "root_cloudApi_api_8C9FE51E"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/hello/world\":{\"get\":{\"operationId\":\"get-hello/world\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.root_Region_A2D17352.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "root_A_cloudApi_api_stage_EEF6B12C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/stage",
            "uniqueId": "root_A_cloudApi_api_stage_EEF6B12C"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.root_A_cloudApi_api_deployment_308A0AB8.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.root_A_cloudApi_api_A554547B.id}",
        "stage_name": "prod"
      },
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
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
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
      "root_A_cloudApi_cloudApiOnRequest73c5308f_IamRole_E2B24C2A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/IamRole",
            "uniqueId": "root_A_cloudApi_cloudApiOnRequest73c5308f_IamRole_E2B24C2A"
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
      "root_testapiurl_Handler_IamRole_FD32C825": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/IamRole",
            "uniqueId": "root_testapiurl_Handler_IamRole_FD32C825"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_A_cloudApi_cloudApiOnRequest73c5308f_IamRolePolicy_BFD6113E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/IamRolePolicy",
            "uniqueId": "root_A_cloudApi_cloudApiOnRequest73c5308f_IamRolePolicy_BFD6113E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_A_cloudApi_cloudApiOnRequest73c5308f_IamRole_E2B24C2A.name}"
      },
      "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/cloud.Api-OnRequest-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudApi_cloudApiOnRequestcdafee6e_IamRolePolicy_E6B9BE66"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudApi_cloudApiOnRequestcdafee6e_IamRole_2B8A04C3.name}"
      },
      "root_testapiurl_Handler_IamRolePolicy_9E04E94B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/IamRolePolicy",
            "uniqueId": "root_testapiurl_Handler_IamRolePolicy_9E04E94B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testapiurl_Handler_IamRole_FD32C825.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_A_cloudApi_cloudApiOnRequest73c5308f_IamRolePolicyAttachment_0E9CC19F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/IamRolePolicyAttachment",
            "uniqueId": "root_A_cloudApi_cloudApiOnRequest73c5308f_IamRolePolicyAttachment_0E9CC19F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_A_cloudApi_cloudApiOnRequest73c5308f_IamRole_E2B24C2A.name}"
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
      "root_testapiurl_Handler_IamRolePolicyAttachment_145983C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testapiurl_Handler_IamRolePolicyAttachment_145983C3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testapiurl_Handler_IamRole_FD32C825.name}"
      }
    },
    "aws_lambda_function": {
      "root_A_cloudApi_cloudApiOnRequest73c5308f_F3914485": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/Default",
            "uniqueId": "root_A_cloudApi_cloudApiOnRequest73c5308f_F3914485"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C8B1D888": "${aws_api_gateway_stage.root_A_cloudApi_api_stage_EEF6B12C.invoke_url}",
            "WING_FUNCTION_NAME": "cloud-Api-OnRequest-73c5308f-c85168bb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Api-OnRequest-73c5308f-c85168bb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_A_cloudApi_cloudApiOnRequest73c5308f_IamRole_E2B24C2A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_A_cloudApi_cloudApiOnRequest73c5308f_S3Object_E1A9442C.key}",
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
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
      "root_testapiurl_Handler_269705C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/Default",
            "uniqueId": "root_testapiurl_Handler_269705C1"
          }
        },
        "environment": {
          "variables": {
            "CLOUD_API_C82DF3A5": "${aws_api_gateway_stage.root_cloudApi_api_stage_57D6284A.invoke_url}",
            "WING_FUNCTION_NAME": "Handler-c8315524",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8315524",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testapiurl_Handler_IamRole_FD32C825.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testapiurl_Handler_S3Object_332E0FDE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_A_cloudApi_api_permissionGET1454206f_B95AEC8A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/api/permission-GET-1454206f",
            "uniqueId": "root_A_cloudApi_api_permissionGET1454206f_B95AEC8A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_A_cloudApi_cloudApiOnRequest73c5308f_F3914485.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_A_cloudApi_api_A554547B.execution_arn}/*/GET/endpoint1",
        "statement_id": "AllowExecutionFromAPIGateway-GET-1454206f"
      },
      "root_cloudApi_api_permissionGETceca4943_C84933C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-ceca4943",
            "uniqueId": "root_cloudApi_api_permissionGETceca4943_C84933C8"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudApi_cloudApiOnRequestcdafee6e_582EA655.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.root_cloudApi_api_8C9FE51E.execution_arn}/*/GET/hello/world",
        "statement_id": "AllowExecutionFromAPIGateway-GET-ceca4943"
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
      "root_A_cloudApi_cloudApiOnRequest73c5308f_S3Object_E1A9442C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Api/cloud.Api-OnRequest-73c5308f/S3Object",
            "uniqueId": "root_A_cloudApi_cloudApiOnRequest73c5308f_S3Object_E1A9442C"
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
      "root_testapiurl_Handler_S3Object_332E0FDE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:api url/Handler/S3Object",
            "uniqueId": "root_testapiurl_Handler_S3Object_332E0FDE"
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
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            counter: ${context._lift(counter, ["inc"])},
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            api: ${context._lift(api, ["url"])},
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
          $Closure2._registerBindObject(api, host, ["url"]);
        }
        super._registerBind(host, ops);
      }
    }
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        class $Closure3 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure3.js")({
                __parent_this: ${context._lift(__parent_this, [])},
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
              $Closure3._registerBindObject(__parent_this, host, []);
            }
            if (ops.includes("handle")) {
              $Closure3._registerBindObject(__parent_this.api, host, ["url"]);
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
              api: ${this._lift(this.api, [])},
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


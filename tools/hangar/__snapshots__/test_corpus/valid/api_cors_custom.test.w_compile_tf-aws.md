# [api_cors_custom.test.w](../../../../../examples/tests/valid/api_cors_custom.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": "hello world", "status": 200});
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
module.exports = function({ $api_url, $expect_Util, $http_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.get(($api_url + "/users")));
      const headers = response.headers;
      (await $expect_Util.equal(response.status, 200));
      (await $expect_Util.equal((headers)["access-control-allow-origin"], "winglang.io"));
      (await $expect_Util.equal((headers)["access-control-allow-credentials"], "true"));
      (await $expect_Util.equal((headers)["access-control-expose-headers"], "Content-Type"));
      (await $expect_Util.nil((headers)["access-control-allow-headers"]));
      (await $expect_Util.nil((headers)["access-control-allow-methods"]));
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
module.exports = function({ $api_url, $expect_Util, $http_HttpMethod, $http_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($api_url + "/users"), ({"method": $http_HttpMethod.OPTIONS})));
      const headers = response.headers;
      (await $expect_Util.equal(response.status, 204));
      (await $expect_Util.equal((headers)["access-control-allow-methods"], "GET,POST,OPTIONS"));
      (await $expect_Util.equal((headers)["access-control-allow-headers"], "Content-Type,Authorization,X-Custom-Header"));
      (await $expect_Util.equal((headers)["access-control-allow-origin"], "winglang.io"));
      (await $expect_Util.nil((headers)["access-control-expose-headers"]));
      (await $expect_Util.nil((headers)["access-control-allow-credentials"]));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.$Closure4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $api_url, $expect_Util, $http_HttpMethod, $http_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const response = (await $http_Util.fetch(($api_url + "/users"), ({"method": $http_HttpMethod.OPTIONS, "headers": ({"Access-Control-Request-Method": "PUT", "Access-Control-Request-Headers": "Content-Type,Authorization,X-Custom-Foo"})})));
      const headers = response.headers;
      (await $expect_Util.equal(response.status, 204));
      (await $expect_Util.equal((headers)["access-control-allow-methods"], "GET,POST,OPTIONS"));
      (await $expect_Util.equal((headers)["access-control-allow-headers"], "Content-Type,Authorization,X-Custom-Header"));
      (await $expect_Util.equal((headers)["access-control-allow-origin"], "winglang.io"));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users\":{\"get\":{\"operationId\":\"get-users\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{},\"headers\":{\"Access-Control-Allow-Origin\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Methods\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Allow-Headers\":{\"schema\":{\"type\":\"string\"}},\"Access-Control-Max-Age\":{\"schema\":{\"type\":\"string\"}}}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/arn:aws:lambda:${data.aws_region.Region.name}:${data.aws_caller_identity.account.account_id}:function:get_users0-c86dec9c/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                #if ($context.httpMethod == \\\"OPTIONS\\\")\\n                    {\\\"statusCode\\\": 204}\\n                #else\\n                    {\\\"statusCode\\\": 404}\\n                #end\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"204\":{\"statusCode\":\"204\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\",\"method.response.header.Access-Control-Allow-Origin\":\"'winglang.io'\",\"method.response.header.Access-Control-Allow-Methods\":\"'GET,POST,OPTIONS'\",\"method.response.header.Access-Control-Allow-Headers\":\"'Content-Type,Authorization,X-Custom-Header'\"},\"responseTemplates\":{\"application/json\":\"{}\"}},\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"204\":{\"description\":\"204 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"},\"Access-Control-Allow-Origin\":{\"type\":\"string\"},\"Access-Control-Allow-Methods\":{\"type\":\"string\"},\"Access-Control-Allow-Headers\":{\"type\":\"string\"}}},\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_users0_CloudwatchLogGroup_78A5F1D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_users0_CloudwatchLogGroup_78A5F1D9"
          }
        },
        "name": "/aws/lambda/get_users0-c86dec9c",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_users0_IamRole_5BFD476C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users0/IamRole",
            "uniqueId": "cloudApi_get_users0_IamRole_5BFD476C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_users0_IamRolePolicy_295FFAAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users0/IamRolePolicy",
            "uniqueId": "cloudApi_get_users0_IamRolePolicy_295FFAAE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_users0_IamRole_5BFD476C.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_users0_IamRolePolicyAttachment_9E738C04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_users0_IamRolePolicyAttachment_9E738C04"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_users0_IamRole_5BFD476C.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_users0_483BD7DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users0/Default",
            "uniqueId": "cloudApi_get_users0_483BD7DE"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_users0-c86dec9c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_users0-c86dec9c",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_users0_IamRole_5BFD476C.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_users0_S3Object_513E5470.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-41f0e61d_DD9B4FD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-41f0e61d",
            "uniqueId": "cloudApi_api_permission-GET-41f0e61d_DD9B4FD0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users0_483BD7DE.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users",
        "statement_id": "AllowExecutionFromAPIGateway-GET-41f0e61d"
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
      "cloudApi_get_users0_S3Object_513E5470": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users0/S3Object",
            "uniqueId": "cloudApi_get_users0_S3Object_513E5470"
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
const ex = $stdlib.ex;
const http = $stdlib.http;
const expect = $stdlib.expect;
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
          ],
          "$inflight_init": [
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
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
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
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), ["equal", "nil"]],
            [$stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"), ["get"]],
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_HttpMethod: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
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
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), ["equal", "nil"]],
            [$stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"), ["OPTIONS"]],
            [$stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"), ["fetch"]],
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
            $api_url: ${$stdlib.core.liftObject(api.url)},
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $http_HttpMethod: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"))},
            $http_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType()};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [$stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"), ["equal"]],
            [$stdlib.core.toLiftableModuleType(http.HttpMethod, "@winglang/sdk/http", "HttpMethod"), ["OPTIONS"]],
            [$stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"), ["fetch"]],
            [api.url, []],
          ],
          "$inflight_init": [
            [api.url, []],
          ],
        });
      }
    }
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api", { cors: true, corsOptions: ({"allowOrigin": ["winglang.io"], "allowMethods": [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS], "allowHeaders": ["Content-Type", "Authorization", "X-Custom-Header"], "allowCredentials": true, "exposeHeaders": ["Content-Type"]}) });
    (api.get("/users", new $Closure1(this, "$Closure1")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:GET /users has cors headers", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:OPTIONS /users has cors headers", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:OPTIONS /users responds with proper headers for requested", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "api_cors_custom.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


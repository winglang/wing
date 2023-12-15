# [path_vars.test.w](../../../../../../examples/tests/sdk_tests/api/path_vars.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([({"user": ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "name")})]),"headers": ({"content-type": "application/json"}),"status": 200});
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(req) {
      return ({"body": ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([({"user": ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "name"),"age": ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(req.vars, "age")})]),"headers": ({"content-type": "application/json"}),"status": 200});
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "tsuf";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/users/", ""] }, $api_url, username)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((JSON.parse((res.body ?? ""))), "user"),username)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "akhil";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/path/", ""] }, $api_url, username)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((JSON.parse((res.body ?? ""))), "user"),username)))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "akhil";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/users/permission/", ""] }, $api_url, username)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((JSON.parse((res.body ?? ""))), "user"),username)))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.cjs
```cjs
"use strict";
module.exports = function({ $api_url, $http_Util, $std_Json }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const username = "akhil";
      const age = "23";
      const res = (await $http_Util.get(String.raw({ raw: ["", "/path/", "/", ""] }, $api_url, username, age)));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.status == 200")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(res.status,200)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"user\") == username")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((JSON.parse((res.body ?? ""))), "user"),username)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Json.parse(res.body ?? \"\").get(\"age\") == age")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((JSON.parse((res.body ?? ""))), "age"),age)))};
    }
  }
  return $Closure6;
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/users/{name}\":{\"get\":{\"operationId\":\"get-users/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/path/{name}\":{\"get\":{\"operationId\":\"get-path/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/users/permission/{name}\":{\"get\":{\"operationId\":\"get-users/permission/:name\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/path/{name}/{age}\":{\"get\":{\"operationId\":\"get-path/:name/:age\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[{\"name\":\"name\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"name\":\"age\",\"in\":\"path\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_path_name_age_0_65BF533A.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_path_name_age_0_CloudwatchLogGroup_13A3BAE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_path_name_age_0_CloudwatchLogGroup_13A3BAE4"
          }
        },
        "name": "/aws/lambda/get_path_-name_-age_-0-c80a5333",
        "retention_in_days": 30
      },
      "cloudApi_get_users_name_0_CloudwatchLogGroup_6D58B237": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_users_name_0_CloudwatchLogGroup_6D58B237"
          }
        },
        "name": "/aws/lambda/get_users_-name_-0-c8bea0a1",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_path_name_age_0_IamRole_B346AB90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/IamRole",
            "uniqueId": "cloudApi_get_path_name_age_0_IamRole_B346AB90"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_users_name_0_IamRole_595620B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/IamRole",
            "uniqueId": "cloudApi_get_users_name_0_IamRole_595620B4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_path_name_age_0_IamRolePolicy_413CFA9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_path_name_age_0_IamRolePolicy_413CFA9D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_path_name_age_0_IamRole_B346AB90.name}"
      },
      "cloudApi_get_users_name_0_IamRolePolicy_86600901": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_users_name_0_IamRolePolicy_86600901"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_users_name_0_IamRole_595620B4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_path_name_age_0_IamRolePolicyAttachment_AC1D94FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_path_name_age_0_IamRolePolicyAttachment_AC1D94FC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_path_name_age_0_IamRole_B346AB90.name}"
      },
      "cloudApi_get_users_name_0_IamRolePolicyAttachment_0A04DDBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_users_name_0_IamRolePolicyAttachment_0A04DDBA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_users_name_0_IamRole_595620B4.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_path_name_age_0_65BF533A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/Default",
            "uniqueId": "cloudApi_get_path_name_age_0_65BF533A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_path_-name_-age_-0-c80a5333",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_path_-name_-age_-0-c80a5333",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_path_name_age_0_IamRole_B346AB90.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_path_name_age_0_S3Object_44C9D5F4.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_users_name_0_20FCFE31": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/Default",
            "uniqueId": "cloudApi_get_users_name_0_20FCFE31"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_users_-name_-0-c8bea0a1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_users_-name_-0-c8bea0a1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_users_name_0_IamRole_595620B4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_users_name_0_S3Object_447D8506.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-26eaaef3_CF20170D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-26eaaef3",
            "uniqueId": "cloudApi_api_permission-GET-26eaaef3_CF20170D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users/permission/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-26eaaef3"
      },
      "cloudApi_api_permission-GET-35cb425d_1F0EB84A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-35cb425d",
            "uniqueId": "cloudApi_api_permission-GET-35cb425d_1F0EB84A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/users/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-35cb425d"
      },
      "cloudApi_api_permission-GET-e8bcf98a_080C36F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e8bcf98a",
            "uniqueId": "cloudApi_api_permission-GET-e8bcf98a_080C36F9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_path_name_age_0_65BF533A.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path/{name}/{age}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e8bcf98a"
      },
      "cloudApi_api_permission-GET-e93953c8_FF4AD35C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-e93953c8",
            "uniqueId": "cloudApi_api_permission-GET-e93953c8_FF4AD35C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_users_name_0_20FCFE31.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/path/{name}",
        "statement_id": "AllowExecutionFromAPIGateway-GET-e93953c8"
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
      "cloudApi_get_path_name_age_0_S3Object_44C9D5F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_path_:name_:age_}0/S3Object",
            "uniqueId": "cloudApi_get_path_name_age_0_S3Object_44C9D5F4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_users_name_0_S3Object_447D8506": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_users_:name_}0/S3Object",
            "uniqueId": "cloudApi_get_users_name_0_S3Object_447D8506"
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
const http = $stdlib.http;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.cjs")({
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.cjs")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
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
          $Closure3._registerOnLiftObject(api.url, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.cjs")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
          $Closure4._registerOnLiftObject(api.url, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.cjs")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
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
          $Closure5._registerOnLiftObject(api.url, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.cjs")({
            $api_url: ${context._lift(api.url)},
            $http_Util: ${context._lift($stdlib.core.toLiftableModuleType(http.Util, "@winglang/sdk/http", "Util"))},
            $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
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
          $Closure6._registerOnLiftObject(api.url, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this, "cloud.Api");
    const handler = new $Closure1(this, "$Closure1");
    const handler_two = new $Closure2(this, "$Closure2");
    (api.get("/users/{name}", handler));
    (api.get("/path/{name}", handler));
    (api.get("/users/permission/{name}", handler));
    (api.get("/path/{name}/{age}", handler_two));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test2", new $Closure4(this, "$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test3", new $Closure5(this, "$Closure5"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test4", new $Closure6(this, "$Closure6"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "path_vars.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


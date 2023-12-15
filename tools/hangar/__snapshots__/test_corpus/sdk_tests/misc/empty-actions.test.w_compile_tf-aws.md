# [empty-actions.test.w](../../../../../../examples/tests/sdk_tests/misc/empty-actions.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $a }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $a.foo());
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
module.exports = function({ $a }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $a.bar());
      return ({"status": 200});
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: 1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(1,1)))};
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
```

## inflight.A-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class A {
    constructor({ $this_b }) {
      this.$this_b = $this_b;
    }
    async foo() {
      {console.log((await this.$this_b.get("/")))};
    }
    async bar() {
    }
  }
  return A;
}
//# sourceMappingURL=./inflight.A-1.cjs.map
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
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/foo\":{\"get\":{\"operationId\":\"get-foo\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_foo_0_1FC193B8.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/bar\":{\"get\":{\"operationId\":\"get-bar\",\"responses\":{\"200\":{\"description\":\"200 response\",\"content\":{}}},\"parameters\":[],\"x-amazon-apigateway-integration\":{\"uri\":\"arn:aws:apigateway:${data.aws_region.Region.name}:lambda:path/2015-03-31/functions/${aws_lambda_function.cloudApi_get_bar_0_7132CABE.arn}/invocations\",\"type\":\"aws_proxy\",\"httpMethod\":\"POST\",\"responses\":{\"default\":{\"statusCode\":\"200\"}},\"passthroughBehavior\":\"when_no_match\",\"contentHandling\":\"CONVERT_TO_TEXT\"}}},\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"\\n                {\\\"statusCode\\\": 404}\\n              \"},\"passthroughBehavior\":\"never\",\"responses\":{\"404\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}},\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
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
      "cloudApi_get_bar_0_CloudwatchLogGroup_30A6F119": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_bar_0_CloudwatchLogGroup_30A6F119"
          }
        },
        "name": "/aws/lambda/get_bar_-0-c8961001",
        "retention_in_days": 30
      },
      "cloudApi_get_foo_0_CloudwatchLogGroup_ED1063ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo_}0/CloudwatchLogGroup",
            "uniqueId": "cloudApi_get_foo_0_CloudwatchLogGroup_ED1063ED"
          }
        },
        "name": "/aws/lambda/get_foo_-0-c8c183c7",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudApi_get_bar_0_IamRole_7740C464": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar_}0/IamRole",
            "uniqueId": "cloudApi_get_bar_0_IamRole_7740C464"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudApi_get_foo_0_IamRole_B5D27436": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo_}0/IamRole",
            "uniqueId": "cloudApi_get_foo_0_IamRole_B5D27436"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudApi_get_bar_0_IamRolePolicy_D5C83F1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_bar_0_IamRolePolicy_D5C83F1D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudApi_get_bar_0_IamRole_7740C464.name}"
      },
      "cloudApi_get_foo_0_IamRolePolicy_1AF0974B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo_}0/IamRolePolicy",
            "uniqueId": "cloudApi_get_foo_0_IamRolePolicy_1AF0974B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.A_cloudBucket_DFCC9367.arn}\",\"${aws_s3_bucket.A_cloudBucket_DFCC9367.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudApi_get_foo_0_IamRole_B5D27436.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudApi_get_bar_0_IamRolePolicyAttachment_1C9C4A76": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_bar_0_IamRolePolicyAttachment_1C9C4A76"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_bar_0_IamRole_7740C464.name}"
      },
      "cloudApi_get_foo_0_IamRolePolicyAttachment_6C30798B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo_}0/IamRolePolicyAttachment",
            "uniqueId": "cloudApi_get_foo_0_IamRolePolicyAttachment_6C30798B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudApi_get_foo_0_IamRole_B5D27436.name}"
      }
    },
    "aws_lambda_function": {
      "cloudApi_get_bar_0_7132CABE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar_}0/Default",
            "uniqueId": "cloudApi_get_bar_0_7132CABE"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_5c35566c": "${aws_s3_bucket.A_cloudBucket_DFCC9367.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_bar_-0-c8961001",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_bar_-0-c8961001",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_bar_0_IamRole_7740C464.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_bar_0_S3Object_412B6C4E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudApi_get_foo_0_1FC193B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo_}0/Default",
            "uniqueId": "cloudApi_get_foo_0_1FC193B8"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_5c35566c": "${aws_s3_bucket.A_cloudBucket_DFCC9367.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "get_foo_-0-c8c183c7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "get_foo_-0-c8c183c7",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudApi_get_foo_0_IamRole_B5D27436.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudApi_get_foo_0_S3Object_E859AED1.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudApi_api_permission-GET-2d589ee9_3D8411D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-2d589ee9",
            "uniqueId": "cloudApi_api_permission-GET-2d589ee9_3D8411D8"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_bar_0_7132CABE.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/bar",
        "statement_id": "AllowExecutionFromAPIGateway-GET-2d589ee9"
      },
      "cloudApi_api_permission-GET-4273ae49_974F3EC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/permission-GET-4273ae49",
            "uniqueId": "cloudApi_api_permission-GET-4273ae49_974F3EC5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudApi_get_foo_0_1FC193B8.function_name}",
        "principal": "apigateway.amazonaws.com",
        "source_arn": "${aws_api_gateway_rest_api.cloudApi_api_2B334D75.execution_arn}/*/GET/foo",
        "statement_id": "AllowExecutionFromAPIGateway-GET-4273ae49"
      }
    },
    "aws_s3_bucket": {
      "A_cloudBucket_DFCC9367": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/cloud.Bucket/Default",
            "uniqueId": "A_cloudBucket_DFCC9367"
          }
        },
        "bucket_prefix": "cloud-bucket-c8eec589-",
        "force_destroy": false
      },
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
      "cloudApi_get_bar_0_S3Object_412B6C4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_bar_}0/S3Object",
            "uniqueId": "cloudApi_get_bar_0_S3Object_412B6C4E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudApi_get_foo_0_S3Object_E859AED1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/get_foo_}0/S3Object",
            "uniqueId": "cloudApi_get_foo_0_S3Object_E859AED1"
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
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class A extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
      }
      static _toInflightType() {
        return `
          require("././inflight.A-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AClient = ${A._toInflightType(this)};
            const client = new AClient({
              $this_b: ${$stdlib.core.liftObject(this.b)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "foo", "bar", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          A._registerOnLiftObject(this.b, host, []);
        }
        if (ops.includes("foo")) {
          A._registerOnLiftObject(this.b, host, ["get"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $a: ${$stdlib.core.liftObject(a)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(a, host, ["foo"]);
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
          require("././inflight.$Closure2-1.cjs")({
            $a: ${$stdlib.core.liftObject(a)},
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
          $Closure2._registerOnLiftObject(a, host, ["bar"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure3-1.cjs")({
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    const a = new A(this, "A");
    const api = this.node.root.new("@winglang/sdk.cloud.Api", cloud.Api, this, "cloud.Api");
    (api.get("/foo", new $Closure1(this, "$Closure1")));
    (api.get("/bar", new $Closure2(this, "$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:main", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "empty-actions.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


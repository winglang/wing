# [capture_tokens.w](../../../../../examples/tests/valid/capture_tokens.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $r }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $r.foo());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $MyResource, $api_url, $url }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(url)")})((await $MyResource.isValidUrl($url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(api.url)")})((await $MyResource.isValidUrl($api_url)))};
    }
  }
  return $Closure2;
}

```

## inflight.MyResource-1.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ $this_api_url, $this_url }) {
      this.$this_api_url = $this_api_url;
      this.$this_url = $this_url;
    }
    static async isValidUrl(url) {
      return (require("<ABSOLUTE_PATH>/url_utils.js")["isValidUrl"])(url)
    }
    async foo() {
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(this.url)")})((await MyResource.isValidUrl(this.$this_url)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: MyResource.isValidUrl(this.api.url)")})((await MyResource.isValidUrl(this.$this_api_url)))};
    }
  }
  return MyResource;
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
      "value": "[[\"root/Default/Default/test:inflight class\",\"${aws_lambda_function.testinflightclass_Handler_F51916C9.arn}\"],[\"root/Default/Default/test:inflight globals\",\"${aws_lambda_function.testinflightglobals_Handler_386DF115.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "MyResource_cloudApi_api_deployment_6DBAED7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/deployment",
            "uniqueId": "MyResource_cloudApi_api_deployment_6DBAED7F"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}",
        "triggers": {
          "redeployment": "${sha256(aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.body)}"
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
      "MyResource_cloudApi_api_4CB9B8E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/api",
            "uniqueId": "MyResource_cloudApi_api_4CB9B8E3"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"consumes\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404}\"},\"responses\":{\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode: 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "name": "api-c8ef4b64"
      },
      "cloudApi_api_2B334D75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Api/api/api",
            "uniqueId": "cloudApi_api_2B334D75"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{\"/{proxy+}\":{\"x-amazon-apigateway-any-method\":{\"produces\":[\"application/json\"],\"consumes\":[\"application/json\"],\"x-amazon-apigateway-integration\":{\"type\":\"mock\",\"requestTemplates\":{\"application/json\":\"{\\\"statusCode\\\": 404}\"},\"responses\":{\"default\":{\"statusCode\":\"404\",\"responseParameters\":{\"method.response.header.Content-Type\":\"'application/json'\"},\"responseTemplates\":{\"application/json\":\"{\\\"statusCode: 404, \\\"message\\\": \\\"Error: Resource not found\\\"}\"}}}},\"responses\":{\"404\":{\"description\":\"404 response\",\"headers\":{\"Content-Type\":{\"type\":\"string\"}}}}}}}}",
        "name": "api-c895068c"
      }
    },
    "aws_api_gateway_stage": {
      "MyResource_cloudApi_api_stage_A26656F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Api/api/stage",
            "uniqueId": "MyResource_cloudApi_api_stage_A26656F9"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.MyResource_cloudApi_api_deployment_6DBAED7F.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.MyResource_cloudApi_api_4CB9B8E3.id}",
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
    "aws_iam_role": {
      "testinflightclass_Handler_IamRole_49C4923D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRole",
            "uniqueId": "testinflightclass_Handler_IamRole_49C4923D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightglobals_Handler_IamRole_09D0E2CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRole",
            "uniqueId": "testinflightglobals_Handler_IamRole_09D0E2CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightclass_Handler_IamRolePolicy_1427C4D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRolePolicy",
            "uniqueId": "testinflightclass_Handler_IamRolePolicy_1427C4D0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightclass_Handler_IamRole_49C4923D.name}"
      },
      "testinflightglobals_Handler_IamRolePolicy_B2F53672": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRolePolicy",
            "uniqueId": "testinflightglobals_Handler_IamRolePolicy_B2F53672"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightglobals_Handler_IamRole_09D0E2CB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightclass_Handler_IamRolePolicyAttachment_D71572F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightclass_Handler_IamRolePolicyAttachment_D71572F9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightclass_Handler_IamRole_49C4923D.name}"
      },
      "testinflightglobals_Handler_IamRolePolicyAttachment_82A71498": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightglobals_Handler_IamRolePolicyAttachment_82A71498"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightglobals_Handler_IamRole_09D0E2CB.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightclass_Handler_F51916C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/Default",
            "uniqueId": "testinflightclass_Handler_F51916C9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8ed8f29",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.MyResource_cloudApi_api_stage_A26656F9.invoke_url)}"
          }
        },
        "function_name": "Handler-c8ed8f29",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightclass_Handler_IamRole_49C4923D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightclass_Handler_S3Object_6D43304B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightglobals_Handler_386DF115": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/Default",
            "uniqueId": "testinflightglobals_Handler_386DF115"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8ecc6d5",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_32": "${jsonencode(aws_api_gateway_stage.cloudApi_api_stage_BBB283E4.invoke_url)}"
          }
        },
        "function_name": "Handler-c8ecc6d5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightglobals_Handler_IamRole_09D0E2CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightglobals_Handler_S3Object_943E1D01.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      "testinflightclass_Handler_S3Object_6D43304B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class/Handler/S3Object",
            "uniqueId": "testinflightclass_Handler_S3Object_6D43304B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightglobals_Handler_S3Object_943E1D01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight globals/Handler/S3Object",
            "uniqueId": "testinflightglobals_Handler_S3Object_943E1D01"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        this.url = this.api.url;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this)};
            const client = new MyResourceClient({
              $this_api_url: ${this._lift(this.api.url)},
              $this_url: ${this._lift(this.url)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["isValidUrl", "foo", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        if (ops.includes("foo")) {
          MyResource._registerBindObject(MyResource, host, ["isValidUrl"]);
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $r: ${context._lift(r)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(r, host, ["foo"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $MyResource: ${context._lift(MyResource)},
            $api_url: ${context._lift(api.url)},
            $url: ${context._lift(url)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(MyResource, host, ["isValidUrl"]);
          $Closure2._registerBindObject(api.url, host, []);
          $Closure2._registerBindObject(url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const r = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight class",new $Closure1(this,"$Closure1"));
    const api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
    const url = api.url;
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight globals",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_tokens", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


# [capture_tokens.w](../../../../../examples/tests/valid/capture_tokens.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
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

## inflight.MyResource.js
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
      "value": "[[\"root/undefined/Default/test:inflight class\",\"${aws_lambda_function.undefined_testinflightclass_Handler_12D03F7C.arn}\"],[\"root/undefined/Default/test:inflight globals\",\"${aws_lambda_function.undefined_testinflightglobals_Handler_FE47301B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_api_gateway_deployment": {
      "undefined_MyResource_cloudApi_api_deployment_DFDF6834": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Api/api/deployment",
            "uniqueId": "undefined_MyResource_cloudApi_api_deployment_DFDF6834"
          }
        },
        "lifecycle": {
          "create_before_destroy": true
        },
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_MyResource_cloudApi_api_86F2361B.id}",
        "triggers": {
          "redeployment": "6eb5a41974a89ebc5d63af9e7fe3ce6e1d6619c7"
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
          "redeployment": "6eb5a41974a89ebc5d63af9e7fe3ce6e1d6619c7"
        }
      }
    },
    "aws_api_gateway_rest_api": {
      "undefined_MyResource_cloudApi_api_86F2361B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Api/api/api",
            "uniqueId": "undefined_MyResource_cloudApi_api_86F2361B"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{}}",
        "name": "api-c8256bfc"
      },
      "undefined_cloudApi_api_3000E149": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Api/api/api",
            "uniqueId": "undefined_cloudApi_api_3000E149"
          }
        },
        "body": "{\"openapi\":\"3.0.3\",\"paths\":{}}",
        "name": "api-c8c76c9d"
      }
    },
    "aws_api_gateway_stage": {
      "undefined_MyResource_cloudApi_api_stage_7EE00C6F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Api/api/stage",
            "uniqueId": "undefined_MyResource_cloudApi_api_stage_7EE00C6F"
          }
        },
        "deployment_id": "${aws_api_gateway_deployment.undefined_MyResource_cloudApi_api_deployment_DFDF6834.id}",
        "rest_api_id": "${aws_api_gateway_rest_api.undefined_MyResource_cloudApi_api_86F2361B.id}",
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
    "aws_iam_role": {
      "undefined_testinflightclass_Handler_IamRole_FBE3D5BC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class/Handler/IamRole",
            "uniqueId": "undefined_testinflightclass_Handler_IamRole_FBE3D5BC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinflightglobals_Handler_IamRole_D32E6CE4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight globals/Handler/IamRole",
            "uniqueId": "undefined_testinflightglobals_Handler_IamRole_D32E6CE4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightclass_Handler_IamRolePolicy_01DA78B2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightclass_Handler_IamRolePolicy_01DA78B2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightclass_Handler_IamRole_FBE3D5BC.name}"
      },
      "undefined_testinflightglobals_Handler_IamRolePolicy_0080B73D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight globals/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightglobals_Handler_IamRolePolicy_0080B73D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightglobals_Handler_IamRole_D32E6CE4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightclass_Handler_IamRolePolicyAttachment_F6D4342B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightclass_Handler_IamRolePolicyAttachment_F6D4342B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightclass_Handler_IamRole_FBE3D5BC.name}"
      },
      "undefined_testinflightglobals_Handler_IamRolePolicyAttachment_ACADADE3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight globals/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightglobals_Handler_IamRolePolicyAttachment_ACADADE3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightglobals_Handler_IamRole_D32E6CE4.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightclass_Handler_12D03F7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class/Handler/Default",
            "uniqueId": "undefined_testinflightclass_Handler_12D03F7C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82f7c5f",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_11": "${jsonencode(aws_api_gateway_stage.undefined_MyResource_cloudApi_api_stage_7EE00C6F.invoke_url)}",
            "WING_TOKEN_TFTOKEN_TOKEN_7": "${jsonencode(aws_api_gateway_stage.undefined_MyResource_cloudApi_api_stage_7EE00C6F.invoke_url)}",
            "WING_TOKEN_TFTOKEN_TOKEN_8": "${jsonencode(aws_api_gateway_stage.undefined_MyResource_cloudApi_api_stage_7EE00C6F.invoke_url)}"
          }
        },
        "function_name": "Handler-c82f7c5f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightclass_Handler_IamRole_FBE3D5BC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightclass_Handler_S3Object_99FB13E8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinflightglobals_Handler_FE47301B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight globals/Handler/Default",
            "uniqueId": "undefined_testinflightglobals_Handler_FE47301B"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c88b7f9a",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_TFTOKEN_TOKEN_33": "${jsonencode(aws_api_gateway_stage.undefined_cloudApi_api_stage_A2D24536.invoke_url)}",
            "WING_TOKEN_TFTOKEN_TOKEN_34": "${jsonencode(aws_api_gateway_stage.undefined_cloudApi_api_stage_A2D24536.invoke_url)}"
          }
        },
        "function_name": "Handler-c88b7f9a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightglobals_Handler_IamRole_D32E6CE4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightglobals_Handler_S3Object_2AA98757.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      "undefined_testinflightclass_Handler_S3Object_99FB13E8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight class/Handler/S3Object",
            "uniqueId": "undefined_testinflightclass_Handler_S3Object_99FB13E8"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinflightglobals_Handler_S3Object_2AA98757": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight globals/Handler/S3Object",
            "uniqueId": "undefined_testinflightglobals_Handler_S3Object_2AA98757"
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
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("isValidUrl", "foo", "$inflight_init");
        this.api = this.node.root.newAbstract("@winglang/sdk.cloud.Api",this,"cloud.Api");
        this.url = this.api.url;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyResource.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              $this_api_url: ${this._lift(this.api.url)},
              $this_url: ${this._lift(this.url)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        if (ops.includes("foo")) {
          MyResource._registerBindObject(this.api.url, host, []);
          MyResource._registerBindObject(this.url, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $r: ${context._lift(r)},
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
          $Closure1._registerBindObject(r, host, ["foo"]);
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
            $MyResource: ${context._lift(MyResource)},
            $api_url: ${context._lift(api.url)},
            $url: ${context._lift(url)},
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


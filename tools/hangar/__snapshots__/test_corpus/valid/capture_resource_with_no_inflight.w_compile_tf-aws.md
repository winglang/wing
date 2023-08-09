# [capture_resource_with_no_inflight.w](../../../../../examples/tests/valid/capture_resource_with_no_inflight.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $a, $a_field }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: \"hey\" == a.field")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })("hey",$a_field)))};
      (await $a.bar());
    }
  }
  return $Closure1;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor({ $this_counter }) {
      this.$this_counter = $this_counter;
    }
    async incCounter() {
      (await this.$this_counter.inc());
    }
    async bar() {
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
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:test\",\"${aws_lambda_function.undefined_testtest_Handler_A295E574.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_A_cloudCounter_F4D0A463": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/cloud.Counter/Default",
            "uniqueId": "undefined_A_cloudCounter_F4D0A463"
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
        "name": "wing-counter-cloud.Counter-c876f138"
      }
    },
    "aws_iam_role": {
      "undefined_testtest_Handler_IamRole_50D3D3C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRole",
            "uniqueId": "undefined_testtest_Handler_IamRole_50D3D3C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testtest_Handler_A295E574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/Default",
            "uniqueId": "undefined_testtest_Handler_A295E574"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_40d97835": "${aws_dynamodb_table.undefined_A_cloudCounter_F4D0A463.name}",
            "WING_FUNCTION_NAME": "Handler-c831cefb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c831cefb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtest_Handler_S3Object_96D88A6C.key}",
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
      "undefined_testtest_Handler_S3Object_96D88A6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/S3Object",
            "uniqueId": "undefined_testtest_Handler_S3Object_96D88A6C"
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
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("incCounter", "bar", "$inflight_init");
        this.field = "hey";
        this.counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
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
              $this_counter: ${this._lift(this.counter)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          A._registerBindObject(this.counter, host, []);
        }
        if (ops.includes("incCounter")) {
          A._registerBindObject(this.counter, host, ["inc"]);
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
            $a: ${context._lift(a)},
            $a_field: ${context._lift(a.field)},
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
          $Closure1._registerBindObject(a, host, ["bar"]);
          $Closure1._registerBindObject(a.field, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const a = new A(this,"A");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_resource_with_no_inflight", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


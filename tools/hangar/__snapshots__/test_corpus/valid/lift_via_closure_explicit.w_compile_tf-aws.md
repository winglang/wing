# [lift_via_closure_explicit.w](../../../../../examples/tests/valid/lift_via_closure_explicit.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $fn }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn());
    }
  }
  return $Closure1;
}

```

## inflight.MyClosure.js
```js
module.exports = function({  }) {
  class MyClosure {
    constructor({ $this_q }) {
      this.$this_q = $this_q;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await this.$this_q.push("hello"));
    }
  }
  return MyClosure;
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.undefined_MyClosure_cloudQueue_FEFFB9BA.arn}\"],\"Effect\":\"Allow\"}]}",
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
            "QUEUE_URL_59cfce9e": "${aws_sqs_queue.undefined_MyClosure_cloudQueue_FEFFB9BA.url}",
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
    },
    "aws_sqs_queue": {
      "undefined_MyClosure_cloudQueue_FEFFB9BA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyClosure/cloud.Queue/Default",
            "uniqueId": "undefined_MyClosure_cloudQueue_FEFFB9BA"
          }
        },
        "name": "cloud-Queue-c8d3458e"
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
    class MyClosure extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyClosure.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyClosureClient = ${MyClosure._toInflightType(this).text};
            const client = new MyClosureClient({
              $this_q: ${this._lift(this.q)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyClosure._registerBindObject(this.q, host, []);
        }
        if (ops.includes("handle")) {
          MyClosure._registerBindObject(this.q, host, ["push"]);
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
            $fn: ${context._lift(fn)},
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
          $Closure1._registerBindObject(fn, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const fn = new MyClosure(this,"MyClosure");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "lift_via_closure_explicit", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


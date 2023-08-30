# [capture_mutables.w](../../../../../examples/tests/valid/capture_mutables.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $Object_keys_m__length, $aCloned_length, $a_length, $s_size }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: a.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($a_length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: s.size == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s_size,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: m.size() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($Object_keys_m__length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: aCloned.length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($aCloned_length,1)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $handler }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $handler());
    }
  }
  return $Closure2;
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
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:main\",\"${aws_lambda_function.testmain_Handler_242B2607.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testmain_Handler_IamRole_0E2C4B8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRole",
            "uniqueId": "testmain_Handler_IamRole_0E2C4B8D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testmain_Handler_IamRolePolicy_A91080AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRolePolicy",
            "uniqueId": "testmain_Handler_IamRolePolicy_A91080AC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testmain_Handler_IamRole_0E2C4B8D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testmain_Handler_IamRolePolicyAttachment_4B878377": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRolePolicyAttachment",
            "uniqueId": "testmain_Handler_IamRolePolicyAttachment_4B878377"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testmain_Handler_IamRole_0E2C4B8D.name}"
      }
    },
    "aws_lambda_function": {
      "testmain_Handler_242B2607": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/Default",
            "uniqueId": "testmain_Handler_242B2607"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d10438",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d10438",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testmain_Handler_IamRole_0E2C4B8D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testmain_Handler_S3Object_3FA67F7E.key}",
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
      "testmain_Handler_S3Object_3FA67F7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/S3Object",
            "uniqueId": "testmain_Handler_S3Object_3FA67F7E"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $Object_keys_m__length: ${context._lift(Object.keys(m).length)},
            $aCloned_length: ${context._lift(aCloned.length)},
            $a_length: ${context._lift(a.length)},
            $s_size: ${context._lift(s.size)},
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
          $Closure1._registerBindObject(Object.keys(m).length, host, []);
          $Closure1._registerBindObject(a.length, host, []);
          $Closure1._registerBindObject(aCloned.length, host, []);
          $Closure1._registerBindObject(s.size, host, []);
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
            $handler: ${context._lift(handler)},
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
          $Closure2._registerBindObject(handler, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const a = ["hello"];
    const s = new Set([12]);
    const m = ({"hello": true});
    const aCloned = [...(["hello"])];
    const handler = new $Closure1(this,"$Closure1");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:main",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_mutables", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


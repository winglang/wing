# [resource_as_inflight_literal.test.w](../../../../../examples/tests/valid/resource_as_inflight_literal.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $fn }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: fn.invoke(\"test\") == \"hello world!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fn.invoke("test")),"hello world!")))};
    }
  }
  return $Closure1;
}

```

## inflight.Foo-1.js
```js
"use strict";
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(message) {
      return "hello world!";
    }
  }
  return Foo;
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "cloudFunction_CloudwatchLogGroup_7399B890": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "cloudFunction_CloudwatchLogGroup_7399B890"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8d2eca1",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "cloudFunction_IamRole_5A4430DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "cloudFunction_IamRole_5A4430DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudFunction_IamRolePolicyAttachment_288B9653": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction_IamRolePolicyAttachment_288B9653"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_lambda_function": {
      "cloudFunction": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "cloudFunction"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
        "timeout": 60,
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
      "cloudFunction_S3Object_71908BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "cloudFunction_S3Object_71908BAD"
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $fn: ${context._lift(fn)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(fn, host, ["invoke"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const fn = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "cloud.Function", new Foo(this, "Foo"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "resource_as_inflight_literal.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


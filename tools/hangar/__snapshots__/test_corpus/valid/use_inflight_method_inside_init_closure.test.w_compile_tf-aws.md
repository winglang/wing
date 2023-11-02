# [use_inflight_method_inside_init_closure.test.w](../../../../../examples/tests/valid/use_inflight_method_inside_init_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $__parent_this_1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1.bar());
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
    }
    async bar() {
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
      "Foo_cloudFunction_CloudwatchLogGroup_B531638C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "Foo_cloudFunction_CloudwatchLogGroup_B531638C"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8858302",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Foo_cloudFunction_IamRole_037E9FB3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/cloud.Function/IamRole",
            "uniqueId": "Foo_cloudFunction_IamRole_037E9FB3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Foo_cloudFunction_IamRolePolicy_70B25789": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/cloud.Function/IamRolePolicy",
            "uniqueId": "Foo_cloudFunction_IamRolePolicy_70B25789"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Foo_cloudFunction_IamRole_037E9FB3.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Foo_cloudFunction_IamRolePolicyAttachment_E775DFDC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "Foo_cloudFunction_IamRolePolicyAttachment_E775DFDC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Foo_cloudFunction_IamRole_037E9FB3.name}"
      }
    },
    "aws_lambda_function": {
      "Foo_cloudFunction_E4309ED7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/cloud.Function/Default",
            "uniqueId": "Foo_cloudFunction_E4309ED7"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8858302",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8858302",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.Foo_cloudFunction_IamRole_037E9FB3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Foo_cloudFunction_S3Object_B910EE1D.key}",
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
      "Foo_cloudFunction_S3Object_B910EE1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/cloud.Function/S3Object",
            "uniqueId": "Foo_cloudFunction_S3Object_B910EE1D"
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
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure1-1.js")({
                $__parent_this_1: ${context._lift(__parent_this_1)},
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
              $Closure1._registerOnLiftObject(__parent_this_1, host, ["bar"]);
            }
            super._registerOnLift(host, ops);
          }
        }
        this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "cloud.Function", new $Closure1(this, "$Closure1"));
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
        return ["bar", "$inflight_init"];
      }
    }
    new Foo(this, "Foo");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "use_inflight_method_inside_init_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


# [use_inflight_method_inside_init_closure.test.w](../../../../../examples/tests/valid/use_inflight_method_inside_init_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Foo-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    async bar() {
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "Foo_Function_CloudwatchLogGroup_1EA3CEF7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/Function/CloudwatchLogGroup",
            "uniqueId": "Foo_Function_CloudwatchLogGroup_1EA3CEF7"
          }
        },
        "name": "/aws/lambda/Function-c8e9a190",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Foo_Function_IamRole_F86A3AD2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/Function/IamRole",
            "uniqueId": "Foo_Function_IamRole_F86A3AD2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Foo_Function_IamRolePolicy_6E60CEA6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/Function/IamRolePolicy",
            "uniqueId": "Foo_Function_IamRolePolicy_6E60CEA6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Foo_Function_IamRole_F86A3AD2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Foo_Function_IamRolePolicyAttachment_3B82E0B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/Function/IamRolePolicyAttachment",
            "uniqueId": "Foo_Function_IamRolePolicyAttachment_3B82E0B3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Foo_Function_IamRole_F86A3AD2.name}"
      }
    },
    "aws_lambda_function": {
      "Foo_Function_A6241043": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/Function/Default",
            "uniqueId": "Foo_Function_A6241043"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c8e9a190",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c8e9a190",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Foo_Function_IamRole_F86A3AD2.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Foo_Function_S3Object_790E7779.key}",
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
      "Foo_Function_S3Object_790E7779": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Foo/Function/S3Object",
            "uniqueId": "Foo_Function_S3Object_790E7779"
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
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
                $__parent_this_1: ${$stdlib.core.liftObject(__parent_this_1)},
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
                [__parent_this_1, ["bar"]],
              ],
              "$inflight_init": [
                [__parent_this_1, []],
              ],
            });
          }
        }
        globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "Function", new $Closure1(this, "$Closure1"));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType()};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "bar": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    new Foo(this, "Foo");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "use_inflight_method_inside_init_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


# [inflight_class_inside_inflight_closure.test.w](../../../../../examples/tests/valid/inflight_class_inside_inflight_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1_b.put("k", "v"));
      class InflightClass {
        async method() {
          $helpers.assert($helpers.eq(this.field, "value"), "this.field == \"value\"");
        }
        constructor(){
          this.$inflight_init = async () => {
            this.field = "value";
          }
        }
      }
      const c = (await (async () => {const o = new InflightClass(); await o.$inflight_init?.(); return o; })());
      (await c.method());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({ $f }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f.invoke("text"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = 12;
      class Foo {
        async getX() {
          return x;
        }
      }
      const foo = (await (async () => {const o = new Foo(); await o.$inflight_init?.(); return o; })());
      const y = (await foo.getX());
      $helpers.assert($helpers.eq(y, 12), "y == 12");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.PreflightClass-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class PreflightClass {
    constructor({  }) {
    }
  }
  return PreflightClass;
}
//# sourceMappingURL=inflight.PreflightClass-1.cjs.map
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
      "PreflightClass_Function_CloudwatchLogGroup_06161414": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Function/CloudwatchLogGroup",
            "uniqueId": "PreflightClass_Function_CloudwatchLogGroup_06161414"
          }
        },
        "name": "/aws/lambda/Function-c8565504",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "PreflightClass_Function_IamRole_A6FFCAE6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Function/IamRole",
            "uniqueId": "PreflightClass_Function_IamRole_A6FFCAE6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "PreflightClass_Function_IamRolePolicy_6D810369": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Function/IamRolePolicy",
            "uniqueId": "PreflightClass_Function_IamRolePolicy_6D810369"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.PreflightClass_Bucket_93EC74D7.arn}\",\"${aws_s3_bucket.PreflightClass_Bucket_93EC74D7.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.PreflightClass_Function_IamRole_A6FFCAE6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "PreflightClass_Function_IamRolePolicyAttachment_87F27E90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Function/IamRolePolicyAttachment",
            "uniqueId": "PreflightClass_Function_IamRolePolicyAttachment_87F27E90"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.PreflightClass_Function_IamRole_A6FFCAE6.name}"
      }
    },
    "aws_lambda_function": {
      "PreflightClass_Function_5A515406": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Function/Default",
            "uniqueId": "PreflightClass_Function_5A515406"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_5318ec22": "${aws_s3_bucket.PreflightClass_Bucket_93EC74D7.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Function-c8565504",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c8565504",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.PreflightClass_Function_IamRole_A6FFCAE6.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.PreflightClass_Function_S3Object_84DFAC83.key}",
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
      },
      "PreflightClass_Bucket_93EC74D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Bucket/Default",
            "uniqueId": "PreflightClass_Bucket_93EC74D7"
          }
        },
        "bucket_prefix": "bucket-c8739e77-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "PreflightClass_Function_S3Object_84DFAC83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/Function/S3Object",
            "uniqueId": "PreflightClass_Function_S3Object_84DFAC83"
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
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class PreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.b = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
      }
      preflight_method() {
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
                $__parent_this_1_b: ${$stdlib.core.liftObject(__parent_this_1.b)},
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
                [__parent_this_1.b, ["put"]],
              ],
              "$inflight_init": [
                [__parent_this_1.b, []],
              ],
            });
          }
        }
        const inflight_closure = new $Closure1(this, "$Closure1");
        return globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "Function", inflight_closure);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.PreflightClass-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const PreflightClassClient = ${PreflightClass._toInflightType()};
            const client = new PreflightClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $f: ${$stdlib.core.liftObject(f)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [f, ["invoke"]],
          ],
          "$inflight_init": [
            [f, []],
          ],
        });
      }
    }
    class $Closure3 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType()};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const p = new PreflightClass(this, "PreflightClass");
    const f = (p.preflight_method());
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:it works", new $Closure2(this, "$Closure2"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class inside closure captures from closure", new $Closure3(this, "$Closure3"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_inside_inflight_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


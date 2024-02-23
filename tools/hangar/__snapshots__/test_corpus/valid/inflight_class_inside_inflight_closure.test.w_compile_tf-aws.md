# [inflight_class_inside_inflight_closure.test.w](../../../../../examples/tests/valid/inflight_class_inside_inflight_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.$Closure2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure2-1.js.map
```

## inflight.$Closure3-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.PreflightClass-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class PreflightClass {
    constructor({  }) {
    }
  }
  return PreflightClass;
}
//# sourceMappingURL=inflight.PreflightClass-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
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
      "PreflightClass_cloudFunction_CloudwatchLogGroup_0BDDEF5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "PreflightClass_cloudFunction_CloudwatchLogGroup_0BDDEF5D"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8db99e3",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "PreflightClass_cloudFunction_IamRole_60AD4A3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRole",
            "uniqueId": "PreflightClass_cloudFunction_IamRole_60AD4A3B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "PreflightClass_cloudFunction_IamRolePolicy_B064DBB3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRolePolicy",
            "uniqueId": "PreflightClass_cloudFunction_IamRolePolicy_B064DBB3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.PreflightClass_cloudBucket_05421049.arn}\",\"${aws_s3_bucket.PreflightClass_cloudBucket_05421049.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "PreflightClass_cloudFunction_IamRolePolicyAttachment_008B87A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "PreflightClass_cloudFunction_IamRolePolicyAttachment_008B87A9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.name}"
      }
    },
    "aws_lambda_function": {
      "PreflightClass_cloudFunction_9F7C6688": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/Default",
            "uniqueId": "PreflightClass_cloudFunction_9F7C6688"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_70ca4fed": "${aws_s3_bucket.PreflightClass_cloudBucket_05421049.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8db99e3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8db99e3",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "reserved_concurrent_executions": 10,
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.PreflightClass_cloudFunction_S3Object_D4E803CB.key}",
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
      "PreflightClass_cloudBucket_05421049": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Bucket/Default",
            "uniqueId": "PreflightClass_cloudBucket_05421049"
          }
        },
        "bucket_prefix": "cloud-bucket-c8bbe938-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "PreflightClass_cloudFunction_S3Object_D4E803CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PreflightClass/cloud.Function/S3Object",
            "uniqueId": "PreflightClass_cloudFunction_S3Object_D4E803CB"
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class PreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
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
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
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
        return this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function", inflight_closure);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.PreflightClass-1.js")({
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
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
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:it works", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflight class inside closure captures from closure", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_inside_inflight_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


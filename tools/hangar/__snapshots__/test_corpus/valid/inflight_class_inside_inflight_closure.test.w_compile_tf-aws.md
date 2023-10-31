# [inflight_class_inside_inflight_closure.test.w](../../../../../examples/tests/valid/inflight_class_inside_inflight_closure.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $__parent_this_1_b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(payload) {
      (await $__parent_this_1_b.put("k", "v"));
      class InflightClass {
        async method() {
          {((cond) => {if (!cond) throw new Error("assertion failed: this.field == \"value\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.field,"value")))};
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

```

## inflight.$Closure2-1.js
```js
"use strict";
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

```

## inflight.$Closure3-1.js
```js
"use strict";
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
      {((cond) => {if (!cond) throw new Error("assertion failed: y == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,12)))};
    }
  }
  return $Closure3;
}

```

## inflight.PreflightClass-1.js
```js
"use strict";
module.exports = function({  }) {
  class PreflightClass {
    constructor({  }) {
    }
  }
  return PreflightClass;
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
            "WING_FUNCTION_NAME": "cloud-Function-c8db99e3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8db99e3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.PreflightClass_cloudFunction_IamRole_60AD4A3B.arn}",
        "runtime": "nodejs18.x",
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class PreflightClass extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this, "cloud.Bucket");
      }
      preflight_method() {
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure1-1.js")({
                $__parent_this_1_b: ${context._lift(__parent_this_1.b)},
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
              $Closure1._registerOnLiftObject(__parent_this_1.b, host, ["put"]);
            }
            super._registerOnLift(host, ops);
          }
        }
        const inflight_closure = new $Closure1(this, "$Closure1");
        return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "cloud.Function", inflight_closure);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.PreflightClass-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const PreflightClassClient = ${PreflightClass._toInflightType(this)};
            const client = new PreflightClassClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $f: ${context._lift(f)},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(f, host, ["invoke"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
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
    const p = new PreflightClass(this, "PreflightClass");
    const f = (p.preflight_method());
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:it works", new $Closure2(this, "$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:inflight class inside closure captures from closure", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_class_inside_inflight_closure.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


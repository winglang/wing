# [inflights_calling_inflights.test.w](../../../../../examples/tests/valid/inflights_calling_inflights.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $globalBucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event, file) {
      (await $globalBucket.put(file, event));
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
module.exports = function({ $storeInBucket }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      {
        const $if_let_value = event;
        if ($if_let_value != undefined) {
          const event = $if_let_value;
          (await $storeInBucket(event, "file1"));
        }
      }
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
module.exports = function({ $func1, $globalBucket }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $func1.invoke("hi1"));
      $helpers.assert($helpers.eq((await $globalBucket.get("file1")), "hi1"), "globalBucket.get(\"file1\") == \"hi1\"");
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $globalBucket }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(s) {
      (await $globalBucket.list());
      return "hello";
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $x }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const val = (await $x.foo());
      $helpers.assert($helpers.eq(val, "hello"), "val == \"hello\"");
    }
  }
  return $Closure5;
}
//# sourceMappingURL=inflight.$Closure5-1.cjs.map
```

## inflight.MyResource-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class MyResource {
    constructor({ $this_closure }) {
      this.$this_closure = $this_closure;
    }
    async foo() {
      return (await this.$this_closure("anything"));
    }
  }
  return MyResource;
}
//# sourceMappingURL=inflight.MyResource-1.cjs.map
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
      "func1_CloudwatchLogGroup_6FFB465C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/CloudwatchLogGroup",
            "uniqueId": "func1_CloudwatchLogGroup_6FFB465C"
          }
        },
        "name": "/aws/lambda/func1-c899062d",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "func1_IamRole_31EC29DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRole",
            "uniqueId": "func1_IamRole_31EC29DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "func1_IamRolePolicy_B533BD74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRolePolicy",
            "uniqueId": "func1_IamRolePolicy_B533BD74"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.Bucket.arn}\",\"${aws_s3_bucket.Bucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.func1_IamRole_31EC29DC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "func1_IamRolePolicyAttachment_347CFCA0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRolePolicyAttachment",
            "uniqueId": "func1_IamRolePolicyAttachment_347CFCA0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.func1_IamRole_31EC29DC.name}"
      }
    },
    "aws_lambda_function": {
      "func1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/Default",
            "uniqueId": "func1"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_1357ca3a": "${aws_s3_bucket.Bucket.bucket}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "func1-c899062d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "func1-c899062d",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.func1_IamRole_31EC29DC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.func1_S3Object_33D0CBF3.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
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
      "func1_S3Object_33D0CBF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/S3Object",
            "uniqueId": "func1_S3Object_33D0CBF3"
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $globalBucket: ${$stdlib.core.liftObject(globalBucket)},
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
            [globalBucket, ["put"]],
          ],
          "$inflight_init": [
            [globalBucket, []],
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
            $storeInBucket: ${$stdlib.core.liftObject(storeInBucket)},
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
            [storeInBucket, ["handle"]],
          ],
          "$inflight_init": [
            [storeInBucket, []],
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
            $func1: ${$stdlib.core.liftObject(func1)},
            $globalBucket: ${$stdlib.core.liftObject(globalBucket)},
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
            [func1, ["invoke"]],
            [globalBucket, ["get"]],
          ],
          "$inflight_init": [
            [func1, []],
            [globalBucket, []],
          ],
        });
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        class $Closure4 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.cjs")({
                $globalBucket: ${$stdlib.core.liftObject(globalBucket)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const $Closure4Client = ${$Closure4._toInflightType()};
                const client = new $Closure4Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          get _liftMap() {
            return ({
              "handle": [
                [globalBucket, ["list"]],
              ],
              "$inflight_init": [
                [globalBucket, []],
              ],
            });
          }
        }
        this.closure = new $Closure4(this, "$Closure4");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyResource-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType()};
            const client = new MyResourceClient({
              $this_closure: ${$stdlib.core.liftObject(this.closure)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "foo": [
            [this.closure, ["handle"]],
          ],
          "$inflight_init": [
            [this.closure, []],
          ],
        });
      }
    }
    class $Closure5 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure5-1.cjs")({
            $x: ${$stdlib.core.liftObject(x)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType()};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [x, ["foo"]],
          ],
          "$inflight_init": [
            [x, []],
          ],
        });
      }
    }
    const globalBucket = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const storeInBucket = new $Closure1(this, "$Closure1");
    const handler1 = new $Closure2(this, "$Closure2");
    const func1 = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "func1", handler1);
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:inflights can call other inflights", new $Closure3(this, "$Closure3"));
    const x = new MyResource(this, "MyResource");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:variable can be an inflight closure", new $Closure5(this, "$Closure5"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflights_calling_inflights.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


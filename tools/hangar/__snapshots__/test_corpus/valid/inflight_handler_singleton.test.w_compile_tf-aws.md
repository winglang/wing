# [inflight_handler_singleton.test.w](../../../../../examples/tests/valid/inflight_handler_singleton.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $foo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const n = (await $foo.inc());
      return String.raw({ raw: ["", ""] }, n);
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
module.exports = function({ $foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const n = (await $foo.inc());
      return String.raw({ raw: ["", ""] }, n);
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
module.exports = function({ $expect_Util, $fn, $fooInitCounter, $sim }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = (await $fn.invoke(""));
      const y = (await $fn.invoke(""));
      if ($sim) {
        (await $expect_Util.equal(x, "100"));
        (await $expect_Util.equal(y, "101"));
        (await $expect_Util.equal((await $fooInitCounter.peek()), 1));
        console.log("client has been reused");
      }
    }
  }
  return $Closure3;
}
//# sourceMappingURL=inflight.$Closure3-1.js.map
```

## inflight.$Closure4-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $fn, $fn2, $fooInitCounter }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $expect_Util.equal((await $fooInitCounter.peek()), 0));
      const x = (await $fn.invoke(""));
      const y = (await $fn2.invoke(""));
      (await $expect_Util.equal(x, "100"));
      (await $expect_Util.equal(y, "100"));
      (await $expect_Util.equal((await $fooInitCounter.peek()), 2));
      console.log("client has not been reused");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map
```

## inflight.Foo-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $fooInitCounter }) {
  class Foo {
    constructor({  }) {
    }
    async inc() {
      this.n += 1;
      return this.n;
    }
    async $inflight_init() {
      this.n = 99;
      (await $fooInitCounter.inc());
    }
  }
  return Foo;
}
//# sourceMappingURL=inflight.Foo-1.js.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "cloudFunction2_CloudwatchLogGroup_594B23C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function2/CloudwatchLogGroup",
            "uniqueId": "cloudFunction2_CloudwatchLogGroup_594B23C8"
          }
        },
        "name": "/aws/lambda/cloud-Function2-c86388d1",
        "retention_in_days": 30
      },
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
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "cloudFunction2_IamRole_82CD8D56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function2/IamRole",
            "uniqueId": "cloudFunction2_IamRole_82CD8D56"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
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
      "cloudFunction2_IamRolePolicy_CCD2D213": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function2/IamRolePolicy",
            "uniqueId": "cloudFunction2_IamRolePolicy_CCD2D213"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudFunction2_IamRole_82CD8D56.name}"
      },
      "cloudFunction_IamRolePolicy_618BF987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "cloudFunction_IamRolePolicy_618BF987"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudFunction2_IamRolePolicyAttachment_1B1741AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function2/IamRolePolicyAttachment",
            "uniqueId": "cloudFunction2_IamRolePolicyAttachment_1B1741AB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudFunction2_IamRole_82CD8D56.name}"
      },
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudFunction_IamRole_5A4430DC.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction_S3Object_71908BAD.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudFunction2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function2/Default",
            "uniqueId": "cloudFunction2"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function2-c86388d1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function2-c86388d1",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudFunction2_IamRole_82CD8D56.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudFunction2_S3Object_1779A237.key}",
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
      "cloudFunction2_S3Object_1779A237": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function2/S3Object",
            "uniqueId": "cloudFunction2_S3Object_1779A237"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const expect = $stdlib.expect;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Foo extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Foo-1.js")({
            $fooInitCounter: ${$stdlib.core.liftObject(fooInitCounter)},
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
      _supportedOps() {
        return [...super._supportedOps(), "n", "inc", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "$inflight_init": [
            [fooInitCounter, ["inc"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $foo: ${$stdlib.core.liftObject(foo)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [foo, ["inc"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
            $foo: ${$stdlib.core.liftObject(foo)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [foo, ["inc"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure3-1.js")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $fn: ${$stdlib.core.liftObject(fn)},
            $fooInitCounter: ${$stdlib.core.liftObject(fooInitCounter)},
            $sim: ${$stdlib.core.liftObject(sim)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [fn, ["invoke"]],
            [fooInitCounter, ["peek"]],
            [sim, []],
          ],
        });
        super.onLift(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $fn: ${$stdlib.core.liftObject(fn)},
            $fn2: ${$stdlib.core.liftObject(fn2)},
            $fooInitCounter: ${$stdlib.core.liftObject(fooInitCounter)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      onLift(host, ops) {
        $stdlib.core.onLiftMatrix(host, ops, {
          "handle": [
            [fn, ["invoke"]],
            [fn2, ["invoke"]],
            [fooInitCounter, ["peek"]],
          ],
        });
        super.onLift(host, ops);
      }
    }
    const fooInitCounter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    const foo = new Foo(this, "Foo");
    const fn = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function", new $Closure1(this, "$Closure1"));
    const fn2 = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function2", new $Closure2(this, "$Closure2"));
    const sim = $helpers.eq((util.Util.env("WING_TARGET")), "sim");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:single instance of Foo", new $Closure3(this, "$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:separate instances of Foo", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "inflight_handler_singleton.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


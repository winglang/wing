# [doubler.test.w](../../../../../examples/tests/valid/doubler.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(m) {
      return String.raw({ raw: ["Hello ", "!"] }, m);
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
module.exports = function({ $handler, $std_Json, $std_Number }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(x) {
      const xStr = ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return Number(args) })(x);
      const y = (await $handler(xStr));
      const z = (await $handler(y));
      return ((json, opts) => { return JSON.stringify(json, null, opts?.indent) })(z);
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
    async handle(x) {
      return (x * 2);
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
module.exports = function({ $f }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = (await $f.invoke("2"));
      $helpers.assert($helpers.eq(result, "8"), "result == \"8\"");
    }
  }
  return $Closure4;
}
//# sourceMappingURL=inflight.$Closure4-1.js.map
```

## inflight.Doubler-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Doubler {
    constructor({ $this_func }) {
      this.$this_func = $this_func;
    }
    async invoke(message) {
      const res1 = ((await this.$this_func.handle(message)) ?? "");
      const res2 = ((await this.$this_func.handle(res1)) ?? "");
      return res2;
    }
  }
  return Doubler;
}
//# sourceMappingURL=inflight.Doubler-1.js.map
```

## inflight.Doubler2-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class Doubler2 {
    constructor({  }) {
    }
  }
  return Doubler2;
}
//# sourceMappingURL=inflight.Doubler2-1.js.map
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
      "Doubler2_cloudFunction_CloudwatchLogGroup_517BCD05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/CloudwatchLogGroup",
            "uniqueId": "Doubler2_cloudFunction_CloudwatchLogGroup_517BCD05"
          }
        },
        "name": "/aws/lambda/cloud-Function-c8d4b6f0",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "Doubler2_cloudFunction_IamRole_3E4BED38": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/IamRole",
            "uniqueId": "Doubler2_cloudFunction_IamRole_3E4BED38"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "Doubler2_cloudFunction_IamRolePolicy_0E850719": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/IamRolePolicy",
            "uniqueId": "Doubler2_cloudFunction_IamRolePolicy_0E850719"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.Doubler2_cloudFunction_IamRole_3E4BED38.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "Doubler2_cloudFunction_IamRolePolicyAttachment_A02FB4B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "Doubler2_cloudFunction_IamRolePolicyAttachment_A02FB4B1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.Doubler2_cloudFunction_IamRole_3E4BED38.name}"
      }
    },
    "aws_lambda_function": {
      "Doubler2_cloudFunction_402CDAA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/Default",
            "uniqueId": "Doubler2_cloudFunction_402CDAA3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "cloud-Function-c8d4b6f0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d4b6f0",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.Doubler2_cloudFunction_IamRole_3E4BED38.arn}",
        "runtime": "nodejs20.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.Doubler2_cloudFunction_S3Object_8029A145.key}",
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
      "Doubler2_cloudFunction_S3Object_8029A145": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/S3Object",
            "uniqueId": "Doubler2_cloudFunction_S3Object_8029A145"
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
    class Doubler extends $stdlib.std.Resource {
      constructor($scope, $id, func) {
        super($scope, $id);
        this.func = func;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Doubler-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DoublerClient = ${Doubler._toInflightType()};
            const client = new DoublerClient({
              $this_func: ${$stdlib.core.liftObject(this.func)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "invoke": [
            [this.func, ["handle"]],
          ],
          "$inflight_init": [
            [this.func, []],
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
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
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class Doubler2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      makeFunc(handler) {
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.AutoIdResource {
          _id = $stdlib.core.closureId();
          constructor($scope, $id, ) {
            super($scope, $id);
            $helpers.nodeof(this).hidden = true;
          }
          static _toInflightType() {
            return `
              require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.js")({
                $handler: ${$stdlib.core.liftObject(handler)},
                $std_Json: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
                $std_Number: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
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
                [handler, ["handle"]],
              ],
              "$inflight_init": [
              ],
            });
          }
        }
        return this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "cloud.Function", new $Closure2(this, "$Closure2"));
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Doubler2-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const Doubler2Client = ${Doubler2._toInflightType()};
            const client = new Doubler2Client({
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
    class $Closure4 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure4-1.js")({
            $f: ${$stdlib.core.liftObject(f)},
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
            [f, ["invoke"]],
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    const fn = new Doubler(this, "Doubler", new $Closure1(this, "$Closure1"));
    const doubler2 = new Doubler2(this, "Doubler2");
    const f = (doubler2.makeFunc(new $Closure3(this, "$Closure3")));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:f(2) == 8", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "doubler.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


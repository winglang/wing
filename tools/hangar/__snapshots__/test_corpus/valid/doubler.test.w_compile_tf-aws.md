# [doubler.test.w](../../../../../examples/tests/valid/doubler.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
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

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $handler, $std_Json, $std_Number }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(x) {
      const xStr = ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })(x);
      const y = (await $handler(xStr));
      const z = (await $handler(y));
      return ((args) => { return JSON.stringify(args[0], null, args[1]?.indent) })([z]);
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
    async handle(x) {
      return (x * 2);
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({ $f }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const result = (await $f.invoke("2"));
      {((cond) => {if (!cond) throw new Error("assertion failed: result == \"8\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result,"8")))};
    }
  }
  return $Closure4;
}

```

## inflight.Doubler-1.js
```js
"use strict";
module.exports = function({  }) {
  class Doubler {
    constructor({ $this_func }) {
      this.$this_func = $this_func;
    }
    async invoke(message) {
      (await this.$this_func.handle(message));
      (await this.$this_func.handle(message));
    }
  }
  return Doubler;
}

```

## inflight.Doubler2-1.js
```js
"use strict";
module.exports = function({  }) {
  class Doubler2 {
    constructor({  }) {
    }
  }
  return Doubler2;
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
            "WING_FUNCTION_NAME": "cloud-Function-c8d4b6f0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d4b6f0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.Doubler2_cloudFunction_IamRole_3E4BED38.arn}",
        "runtime": "nodejs18.x",
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
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Doubler extends $stdlib.std.Resource {
      constructor($scope, $id, func) {
        super($scope, $id);
        this.func = func;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Doubler-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DoublerClient = ${Doubler._toInflightType(this)};
            const client = new DoublerClient({
              $this_func: ${this._lift(this.func)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["invoke", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          Doubler._registerOnLiftObject(this.func, host, []);
        }
        if (ops.includes("invoke")) {
          Doubler._registerOnLiftObject(this.func, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
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
    }
    class Doubler2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      makeFunc(handler) {
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType(context) {
            return `
              require("./inflight.$Closure2-1.js")({
                $handler: ${context._lift(handler)},
                $std_Json: ${context._lift($stdlib.core.toLiftableModuleType(std.Json, "@winglang/sdk/std", "Json"))},
                $std_Number: ${context._lift($stdlib.core.toLiftableModuleType(std.Number, "@winglang/sdk/std", "Number"))},
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
              $Closure2._registerOnLiftObject(handler, host, ["handle"]);
            }
            super._registerOnLift(host, ops);
          }
        }
        return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "cloud.Function", new $Closure2(this, "$Closure2"));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Doubler2-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const Doubler2Client = ${Doubler2._toInflightType(this)};
            const client = new Doubler2Client({
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
    class $Closure4 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $f: ${context._lift(f)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
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
          $Closure4._registerOnLiftObject(f, host, ["invoke"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const fn = new Doubler(this, "Doubler", new $Closure1(this, "$Closure1"));
    const doubler2 = new Doubler2(this, "Doubler2");
    const f = (doubler2.makeFunc(new $Closure3(this, "$Closure3")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:f(2) == 8", new $Closure4(this, "$Closure4"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "doubler.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


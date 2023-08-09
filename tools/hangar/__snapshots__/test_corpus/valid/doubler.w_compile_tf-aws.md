# [doubler.w](../../../../../examples/tests/valid/doubler.w) | compile | tf-aws

## inflight.$Closure1.js
```js
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

## inflight.$Closure2.js
```js
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
      return ((args) => { return JSON.stringify(args[0], null, args[1]) })([z]);
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
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

## inflight.$Closure4.js
```js
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

## inflight.Doubler.js
```js
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

## inflight.Doubler2.js
```js
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:f(2) == 8\",\"${aws_lambda_function.undefined_testf28_Handler_93147A2D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_Doubler2_cloudFunction_IamRole_604632F7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Doubler2/cloud.Function/IamRole",
            "uniqueId": "undefined_Doubler2_cloudFunction_IamRole_604632F7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testf28_Handler_IamRole_BFF89FC1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:f(2) == 8/Handler/IamRole",
            "uniqueId": "undefined_testf28_Handler_IamRole_BFF89FC1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_Doubler2_cloudFunction_IamRolePolicy_11F994F2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Doubler2/cloud.Function/IamRolePolicy",
            "uniqueId": "undefined_Doubler2_cloudFunction_IamRolePolicy_11F994F2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_Doubler2_cloudFunction_IamRole_604632F7.name}"
      },
      "undefined_testf28_Handler_IamRolePolicy_3372F299": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:f(2) == 8/Handler/IamRolePolicy",
            "uniqueId": "undefined_testf28_Handler_IamRolePolicy_3372F299"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_Doubler2_cloudFunction_5850DA23.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testf28_Handler_IamRole_BFF89FC1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_Doubler2_cloudFunction_IamRolePolicyAttachment_D549FF09": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Doubler2/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_Doubler2_cloudFunction_IamRolePolicyAttachment_D549FF09"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_Doubler2_cloudFunction_IamRole_604632F7.name}"
      },
      "undefined_testf28_Handler_IamRolePolicyAttachment_36A5B72F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:f(2) == 8/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testf28_Handler_IamRolePolicyAttachment_36A5B72F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testf28_Handler_IamRole_BFF89FC1.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_Doubler2_cloudFunction_5850DA23": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Doubler2/cloud.Function/Default",
            "uniqueId": "undefined_Doubler2_cloudFunction_5850DA23"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8ece7ae",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8ece7ae",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_Doubler2_cloudFunction_IamRole_604632F7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_Doubler2_cloudFunction_S3Object_8CDB1A8A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testf28_Handler_93147A2D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:f(2) == 8/Handler/Default",
            "uniqueId": "undefined_testf28_Handler_93147A2D"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_53569b86": "${aws_lambda_function.undefined_Doubler2_cloudFunction_5850DA23.arn}",
            "WING_FUNCTION_NAME": "Handler-c8112053",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8112053",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testf28_Handler_IamRole_BFF89FC1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testf28_Handler_S3Object_C6FC4594.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      }
    },
    "aws_s3_object": {
      "undefined_Doubler2_cloudFunction_S3Object_8CDB1A8A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Doubler2/cloud.Function/S3Object",
            "uniqueId": "undefined_Doubler2_cloudFunction_S3Object_8CDB1A8A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testf28_Handler_S3Object_C6FC4594": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:f(2) == 8/Handler/S3Object",
            "uniqueId": "undefined_testf28_Handler_S3Object_C6FC4594"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Doubler extends $stdlib.std.Resource {
      constructor(scope, id, func) {
        super(scope, id);
        this._addInflightOps("invoke", "$inflight_init");
        this.func = func;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Doubler.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const DoublerClient = ${Doubler._toInflightType(this).text};
            const client = new DoublerClient({
              $this_func: ${this._lift(this.func)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Doubler._registerBindObject(this.func, host, []);
        }
        if (ops.includes("invoke")) {
          Doubler._registerBindObject(this.func, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Doubler2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      makeFunc(handler) {
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure2.js")({
                $handler: ${context._lift(handler)},
                $std_Json: ${context._lift(std.Json)},
                $std_Number: ${context._lift(std.Number)},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Closure2Client = ${$Closure2._toInflightType(this).text};
                const client = new $Closure2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("handle")) {
              $Closure2._registerBindObject(handler, host, ["handle"]);
            }
            super._registerBind(host, ops);
          }
        }
        return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Closure2(this,"$Closure2"));
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Doubler2.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Doubler2Client = ${Doubler2._toInflightType(this).text};
            const client = new Doubler2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({
            $f: ${context._lift(f)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(f, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const fn = new Doubler(this,"Doubler",new $Closure1(this,"$Closure1"));
    const doubler2 = new Doubler2(this,"Doubler2");
    const f = (doubler2.makeFunc(new $Closure3(this,"$Closure3")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:f(2) == 8",new $Closure4(this,"$Closure4"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "doubler", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


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
    async $inflight_init()  {
    }
    async handle(m)  {
      return `Hello ${m}!`;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ handler, std_Number, std_Json }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(x)  {
      const xStr = ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })(x);
      const y = (await handler(xStr));
      const z = (await handler(y));
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
    async $inflight_init()  {
    }
    async handle(x)  {
      return (x * 2);
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ f }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const result = (await f.invoke("2"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(result === "8")'`)})((result === "8"))};
    }
  }
  return $Closure4;
}

```

## inflight.Doubler.js
```js
module.exports = function({  }) {
  class Doubler {
    constructor({ func }) {
      this.func = func;
    }
    async $inflight_init()  {
    }
    async invoke(message)  {
      (await this.func.handle(message));
      (await this.func.handle(message));
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
    async $inflight_init()  {
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
      "version": "0.15.2"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:f(2) == 8\",\"${aws_lambda_function.root_testf28_Handler_7820D5E5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_Doubler2_cloudFunction_IamRole_E6732952": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/IamRole",
            "uniqueId": "root_Doubler2_cloudFunction_IamRole_E6732952"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testf28_Handler_IamRole_4BC8B51F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:f(2) == 8/Handler/IamRole",
            "uniqueId": "root_testf28_Handler_IamRole_4BC8B51F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_Doubler2_cloudFunction_IamRolePolicy_9E1386BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/IamRolePolicy",
            "uniqueId": "root_Doubler2_cloudFunction_IamRolePolicy_9E1386BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_Doubler2_cloudFunction_IamRole_E6732952.name}"
      },
      "root_testf28_Handler_IamRolePolicy_0B04969B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:f(2) == 8/Handler/IamRolePolicy",
            "uniqueId": "root_testf28_Handler_IamRolePolicy_0B04969B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_Doubler2_cloudFunction_37D1882D.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testf28_Handler_IamRole_4BC8B51F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_Doubler2_cloudFunction_IamRolePolicyAttachment_D4975F78": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_Doubler2_cloudFunction_IamRolePolicyAttachment_D4975F78"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_Doubler2_cloudFunction_IamRole_E6732952.name}"
      },
      "root_testf28_Handler_IamRolePolicyAttachment_EDE55C88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:f(2) == 8/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testf28_Handler_IamRolePolicyAttachment_EDE55C88"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testf28_Handler_IamRole_4BC8B51F.name}"
      }
    },
    "aws_lambda_function": {
      "root_Doubler2_cloudFunction_37D1882D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/Default",
            "uniqueId": "root_Doubler2_cloudFunction_37D1882D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8d4b6f0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d4b6f0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_Doubler2_cloudFunction_IamRole_E6732952.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_Doubler2_cloudFunction_S3Object_D063F5F9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testf28_Handler_7820D5E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:f(2) == 8/Handler/Default",
            "uniqueId": "root_testf28_Handler_7820D5E5"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_f7db7b1d": "${aws_lambda_function.root_Doubler2_cloudFunction_37D1882D.arn}",
            "WING_FUNCTION_NAME": "Handler-c8914de5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8914de5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testf28_Handler_IamRole_4BC8B51F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testf28_Handler_S3Object_C4E9F0F5.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_Doubler2_cloudFunction_S3Object_D063F5F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Doubler2/cloud.Function/S3Object",
            "uniqueId": "root_Doubler2_cloudFunction_S3Object_D063F5F9"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testf28_Handler_S3Object_C4E9F0F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:f(2) == 8/Handler/S3Object",
            "uniqueId": "root_testf28_Handler_S3Object_C4E9F0F5"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Doubler extends $stdlib.std.Resource {
      constructor(scope, id, func) {
        super(scope, id);
        this._addInflightOps("invoke");
        this.func = func;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Doubler.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const func_client = this._lift(this.func);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const DoublerClient = ${Doubler._toInflightType(this).text};
            const client = new DoublerClient({
              func: ${func_client},
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class Doubler2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
       makeFunc(handler)  {
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure2.js";
            const handler_client = context._lift(handler);
            const std_NumberClient = std.Number._toInflightType(context);
            const std_JsonClient = std.Json._toInflightType(context);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                handler: ${handler_client},
                std_Number: ${std_NumberClient.text},
                std_Json: ${std_JsonClient.text},
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
            if (ops.includes("$inflight_init")) {
              $Closure2._registerBindObject(handler, host, []);
            }
            if (ops.includes("handle")) {
              $Closure2._registerBindObject(handler, host, ["handle"]);
            }
            super._registerBind(host, ops);
          }
        }
        return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Closure2(this,"$Closure2"));
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Doubler2.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const f_client = context._lift(f);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            f: ${f_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure4._registerBindObject(f, host, []);
        }
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
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "doubler", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```


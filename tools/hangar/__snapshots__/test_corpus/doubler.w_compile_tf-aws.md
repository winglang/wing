# [doubler.w](../../../../examples/tests/valid/doubler.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle(m)  {
      {
        return `Hello ${m}!`;
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ handler }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle(x)  {
      {
        const xStr = ((args) => { if (isNaN(args)) {throw new Error("unable to parse \"" + args + "\" as a number")}; return parseInt(args) })(x);
        const y = (typeof handler === "function" ? await handler(xStr) : await handler.handle(xStr));
        const z = (typeof handler === "function" ? await handler(y) : await handler.handle(y));
        return ((args) => { return JSON.stringify(args[0], null, args[1]) })([z]);
      }
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({  }) {
  class  $Inflight3 {
    constructor({  }) {
    }
    async handle(x)  {
      {
        return (x * 2);
      }
    }
  }
  return $Inflight3;
}

```

## clients/$Inflight4.inflight.js
```js
module.exports = function({ f }) {
  class  $Inflight4 {
    constructor({  }) {
    }
    async handle()  {
      {
        const result = (typeof f.invoke === "function" ? await f.invoke("2") : await f.invoke.handle("2"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(result === "8")'`)})((result === "8"))};
      }
    }
  }
  return $Inflight4;
}

```

## clients/Doubler.inflight.js
```js
module.exports = function({  }) {
  class  Doubler {
    constructor({ func }) {
      this.func = func;
    }
    async invoke(message)  {
      {
        const __parent_this = this;
        (typeof this.func.handle === "function" ? await this.func.handle(message) : await this.func.handle.handle(message));
        (typeof this.func.handle === "function" ? await this.func.handle(message) : await this.func.handle.handle(message));
      }
    }
  }
  return Doubler;
}

```

## clients/Doubler2.inflight.js
```js
module.exports = function({  }) {
  class  Doubler2 {
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
            "WING_FUNCTION_NAME": "cloud-Function-c8d4b6f0"
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
            "WING_FUNCTION_NAME": "Handler-c8914de5"
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
        const __parent_this = this;
        this.func = func;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Doubler.inflight.js".replace(/\\/g, "/");
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
          this._registerBindObject(this.func, host, []);
        }
        if (ops.includes("invoke")) {
          this._registerBindObject(this.func, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
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
        const __parent_this = this;
      }
       makeFunc(handler)  {
        {
          const __parent_this = this;
          class $Inflight2 extends $stdlib.std.Resource {
            constructor(scope, id, ) {
              super(scope, id);
              this._addInflightOps("handle");
              this.display.hidden = true;
            }
            static _toInflightType(context) {
              const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
              const handler_client = context._lift(handler);
              return $stdlib.core.NodeJsCode.fromInline(`
                require("${self_client_path}")({
                  handler: ${handler_client},
                })
              `);
            }
            _toInflight() {
              return $stdlib.core.NodeJsCode.fromInline(`
                (await (async () => {
                  const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
                  const client = new $Inflight2Client({
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
                this._registerBindObject(handler, host, ["handle"]);
              }
              super._registerBind(host, ops);
            }
          }
          return this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Inflight2(this,"$Inflight2"));
        }
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Doubler2.inflight.js".replace(/\\/g, "/");
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
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight3Client = ${$Inflight3._toInflightType(this).text};
            const client = new $Inflight3Client({
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
    class $Inflight4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight4.inflight.js".replace(/\\/g, "/");
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
            const $Inflight4Client = ${$Inflight4._toInflightType(this).text};
            const client = new $Inflight4Client({
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
          this._registerBindObject(f, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const fn = new Doubler(this,"Doubler",new $Inflight1(this,"$Inflight1"));
    const doubler2 = new Doubler2(this,"Doubler2");
    const f = (doubler2.makeFunc(new $Inflight3(this,"$Inflight3")));
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:f(2) == 8",new $Inflight4(this,"$Inflight4"));
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


# [class.w](../../../../examples/tests/valid/class.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ c5 }) {
  class  $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(c5.x === 123)'`)})((c5.x === 123))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(c5.y === 321)'`)})((c5.y === 321))};
        (await c5.set(111));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(c5.y === 111)'`)})((c5.y === 111))};
      }
    }
  }
  return $Inflight1;
}

```

## clients/C1.inflight.js
```js
module.exports = function({  }) {
  class  C1 {
    constructor({  }) {
    }
  }
  return C1;
}

```

## clients/C2.inflight.js
```js
module.exports = function({  }) {
  class  C2 {
    constructor({ x }) {
      this.x = x;
    }
  }
  return C2;
}

```

## clients/C3.inflight.js
```js
module.exports = function({  }) {
  class  C3 {
    constructor({ x, y }) {
      this.x = x;
      this.y = y;
    }
  }
  return C3;
}

```

## clients/C4.inflight.js
```js
module.exports = function({  }) {
  class  C4 {
    constructor({  }) {
    }
  }
  return C4;
}

```

## clients/C5.inflight.js
```js
module.exports = function({  }) {
  class  C5 {
    constructor({  }) {
    }
    async $inflight_init()  {
      {
        const __parent_this = this;
        this.x = 123;
        this.y = 321;
      }
    }
    async set(b)  {
      {
        const __parent_this = this;
        this.y = b;
      }
    }
  }
  return C5;
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
      "value": "[[\"root/Default/Default/test:access inflight field\",\"${aws_lambda_function.root_testaccessinflightfield_Handler_79266A8C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testaccessinflightfield_Handler_IamRole_7C027402": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRole",
            "uniqueId": "root_testaccessinflightfield_Handler_IamRole_7C027402"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testaccessinflightfield_Handler_IamRolePolicy_978909ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRolePolicy",
            "uniqueId": "root_testaccessinflightfield_Handler_IamRolePolicy_978909ED"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testaccessinflightfield_Handler_IamRole_7C027402.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testaccessinflightfield_Handler_IamRolePolicyAttachment_810CAE61": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testaccessinflightfield_Handler_IamRolePolicyAttachment_810CAE61"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testaccessinflightfield_Handler_IamRole_7C027402.name}"
      }
    },
    "aws_lambda_function": {
      "root_testaccessinflightfield_Handler_79266A8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/Default",
            "uniqueId": "root_testaccessinflightfield_Handler_79266A8C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c84be49a"
          }
        },
        "function_name": "Handler-c84be49a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testaccessinflightfield_Handler_IamRole_7C027402.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testaccessinflightfield_Handler_S3Object_FA4AA9DF.key}",
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
      "root_testaccessinflightfield_Handler_S3Object_FA4AA9DF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access inflight field/Handler/S3Object",
            "uniqueId": "root_testaccessinflightfield_Handler_S3Object_FA4AA9DF"
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
    class C1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/C1.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C1Client = ${C1._toInflightType(this).text};
            const client = new C1Client({
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
    class C2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.x = 1;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/C2.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const x_client = this._lift(this.x);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C2Client = ${C2._toInflightType(this).text};
            const client = new C2Client({
              x: ${x_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          C2._registerBindObject(this.x, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class C3 extends $stdlib.std.Resource {
      constructor(scope, id, a, b) {
        super(scope, id);
        const __parent_this = this;
        this.x = a;
        if (true) {
          const __parent_this = this;
          this.y = b;
        }
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/C3.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const x_client = this._lift(this.x);
        const y_client = this._lift(this.y);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C3Client = ${C3._toInflightType(this).text};
            const client = new C3Client({
              x: ${x_client},
              y: ${y_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          C3._registerBindObject(this.x, host, []);
          C3._registerBindObject(this.y, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class C4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
      }
      static m()  {
        {
          return 1;
        }
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/C4.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C4Client = ${C4._toInflightType(this).text};
            const client = new C4Client({
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
    class C5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("set", "x", "y");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/C5.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const C5Client = ${C5._toInflightType(this).text};
            const client = new C5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("set")) {
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
        const c5_client = context._lift(c5);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c5: ${c5_client},
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
          $Inflight1._registerBindObject(c5, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(c5, host, ["set", "x", "y"]);
        }
        super._registerBind(host, ops);
      }
    }
    new C1(this,"C1");
    const c2 = new C2(this,"C2");
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c2.x === 1)'`)})((c2.x === 1))};
    const c3 = new C3(this,"C3",1,2);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c3.x === 1)'`)})((c3.x === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c3.y === 2)'`)})((c3.y === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((C4.m()) === 1)'`)})(((C4.m()) === 1))};
    const c5 = new C5(this,"C5");
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:access inflight field",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "class", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


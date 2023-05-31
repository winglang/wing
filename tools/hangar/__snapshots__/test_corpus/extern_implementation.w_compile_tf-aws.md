# [extern_implementation.w](../../../../examples/tests/valid/extern_implementation.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ f }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      (await f.call());
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ f }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      (await f.print("hey there"));
    }
  }
  return $Inflight2;
}

```

## clients/Foo.inflight.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    static async regexInflight(pattern, text)  {
      return (require("<ABSOLUTE_PATH>/external_js.js")["regexInflight"])(pattern, text)
    }
    static async getUuid()  {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getUuid"])()
    }
    static async getData()  {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getData"])()
    }
    async print(msg)  {
      return (require("<ABSOLUTE_PATH>/external_js.js")["print"])(msg)
    }
    async call()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await Foo.regexInflight("[a-z]+-\\d+","abc-123"))'`)})((await Foo.regexInflight("[a-z]+-\\d+","abc-123")))};
      const uuid = (await Foo.getUuid());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(uuid.length === 36)'`)})((uuid.length === 36))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Foo.getData()) === "Cool data!")'`)})(((await Foo.getData()) === "Cool data!"))};
    }
  }
  return Foo;
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
      "value": "[[\"root/Default/Default/test:call\",\"${aws_lambda_function.root_testcall_Handler_C73C89A7.arn}\"],[\"root/Default/Default/test:console\",\"${aws_lambda_function.root_testconsole_Handler_DD0D6BBA.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcall_Handler_IamRole_B9068115": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/IamRole",
            "uniqueId": "root_testcall_Handler_IamRole_B9068115"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testconsole_Handler_IamRole_65E31A0B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/IamRole",
            "uniqueId": "root_testconsole_Handler_IamRole_65E31A0B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcall_Handler_IamRolePolicy_E93D23FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/IamRolePolicy",
            "uniqueId": "root_testcall_Handler_IamRolePolicy_E93D23FF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcall_Handler_IamRole_B9068115.name}"
      },
      "root_testconsole_Handler_IamRolePolicy_0247158D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/IamRolePolicy",
            "uniqueId": "root_testconsole_Handler_IamRolePolicy_0247158D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testconsole_Handler_IamRole_65E31A0B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcall_Handler_IamRolePolicyAttachment_D5A14EE2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcall_Handler_IamRolePolicyAttachment_D5A14EE2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcall_Handler_IamRole_B9068115.name}"
      },
      "root_testconsole_Handler_IamRolePolicyAttachment_88293121": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testconsole_Handler_IamRolePolicyAttachment_88293121"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testconsole_Handler_IamRole_65E31A0B.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcall_Handler_C73C89A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/Default",
            "uniqueId": "root_testcall_Handler_C73C89A7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8074088"
          }
        },
        "function_name": "Handler-c8074088",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcall_Handler_IamRole_B9068115.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcall_Handler_S3Object_343DEC5F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testconsole_Handler_DD0D6BBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/Default",
            "uniqueId": "root_testconsole_Handler_DD0D6BBA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8fb077d"
          }
        },
        "function_name": "Handler-c8fb077d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testconsole_Handler_IamRole_65E31A0B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testconsole_Handler_S3Object_12E2B161.key}",
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
      "root_testcall_Handler_S3Object_343DEC5F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/S3Object",
            "uniqueId": "root_testcall_Handler_S3Object_343DEC5F"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testconsole_Handler_S3Object_12E2B161": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/S3Object",
            "uniqueId": "root_testconsole_Handler_S3Object_12E2B161"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("regexInflight", "getUuid", "getData", "print", "call");
        const __parent_this = this;
      }
      static getGreeting(name)  {
        return (require("<ABSOLUTE_PATH>/external_js.js")["getGreeting"])(name)
      }
      static v4()  {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("call")) {
          Foo._registerBindObject(Foo, host, ["getData", "getUuid", "regexInflight"]);
        }
        if (ops.includes("print")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("getData")) {
        }
        if (ops.includes("getUuid")) {
        }
        if (ops.includes("regexInflight")) {
        }
        super._registerTypeBind(host, ops);
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
          $Inflight1._registerBindObject(f, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(f, host, ["call"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
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
          $Inflight2._registerBindObject(f, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(f, host, ["print"]);
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.getGreeting("Wingding")) === "Hello, Wingding!")'`)})(((Foo.getGreeting("Wingding")) === "Hello, Wingding!"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.v4()).length === 36)'`)})(((Foo.v4()).length === 36))};
    const f = new Foo(this,"Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call",new $Inflight1(this,"$Inflight1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:console",new $Inflight2(this,"$Inflight2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "extern_implementation", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


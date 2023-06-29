# [extern_implementation.w](../../../../../examples/tests/valid/extern_implementation.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ f }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await f.call());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ f }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await f.print("hey there"));
    }
  }
  return $Closure2;
}

```

## inflight.Foo.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    async $inflight_init()  {
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
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.regexInflight(\"[a-z]+-\\\\d+\", \"abc-123\")")})((await Foo.regexInflight("[a-z]+-\\d+","abc-123")))};
      const uuid = (await Foo.getUuid());
      {((cond) => {if (!cond) throw new Error("assertion failed: uuid.length == 36")})((uuid.length === 36))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.getData() == \"Cool data!\"")})(((await Foo.getData()) === "Cool data!"))};
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
      "version": "0.17.0"
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
      "value": "[[\"root/Default/Default/test:call\",\"${aws_lambda_function.testcall_Handler_7902F7E6.arn}\"],[\"root/Default/Default/test:console\",\"${aws_lambda_function.testconsole_Handler_057D9B4E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcall_Handler_IamRole_1805137E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/IamRole",
            "uniqueId": "testcall_Handler_IamRole_1805137E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testconsole_Handler_IamRole_8E32F17A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/IamRole",
            "uniqueId": "testconsole_Handler_IamRole_8E32F17A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcall_Handler_IamRolePolicy_36120113": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/IamRolePolicy",
            "uniqueId": "testcall_Handler_IamRolePolicy_36120113"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcall_Handler_IamRole_1805137E.name}"
      },
      "testconsole_Handler_IamRolePolicy_1B35ECBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/IamRolePolicy",
            "uniqueId": "testconsole_Handler_IamRolePolicy_1B35ECBA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testconsole_Handler_IamRole_8E32F17A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcall_Handler_IamRolePolicyAttachment_5D02ABBD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcall_Handler_IamRolePolicyAttachment_5D02ABBD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcall_Handler_IamRole_1805137E.name}"
      },
      "testconsole_Handler_IamRolePolicyAttachment_2468EE7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/IamRolePolicyAttachment",
            "uniqueId": "testconsole_Handler_IamRolePolicyAttachment_2468EE7E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testconsole_Handler_IamRole_8E32F17A.name}"
      }
    },
    "aws_lambda_function": {
      "testcall_Handler_7902F7E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/Default",
            "uniqueId": "testcall_Handler_7902F7E6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8074088",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8074088",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcall_Handler_IamRole_1805137E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcall_Handler_S3Object_5E5ED905.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testconsole_Handler_057D9B4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/Default",
            "uniqueId": "testconsole_Handler_057D9B4E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8fb077d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8fb077d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testconsole_Handler_IamRole_8E32F17A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testconsole_Handler_S3Object_8A485397.key}",
        "timeout": 30,
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
      "testcall_Handler_S3Object_5E5ED905": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Handler/S3Object",
            "uniqueId": "testcall_Handler_S3Object_5E5ED905"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testconsole_Handler_S3Object_8A485397": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Handler/S3Object",
            "uniqueId": "testconsole_Handler_S3Object_8A485397"
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
      }
      static getGreeting(name)  {
        return (require("<ABSOLUTE_PATH>/external_js.js")["getGreeting"])(name)
      }
      static v4()  {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Foo.js";
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
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
          $Closure1._registerBindObject(f, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(f, host, ["call"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
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
          $Closure2._registerBindObject(f, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(f, host, ["print"]);
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.getGreeting(\"Wingding\") == \"Hello, Wingding!\"")})(((Foo.getGreeting("Wingding")) === "Hello, Wingding!"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.v4().length == 36")})(((Foo.v4()).length === 36))};
    const f = new Foo(this,"Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:console",new $Closure2(this,"$Closure2"));
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


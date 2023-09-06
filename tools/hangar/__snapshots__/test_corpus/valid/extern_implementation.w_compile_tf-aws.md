# [extern_implementation.w](../../../../../examples/tests/valid/extern_implementation.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $f }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f.call());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $Foo }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $Foo.print("hey there"));
    }
  }
  return $Closure2;
}

```

## inflight.Foo-1.js
```js
module.exports = function({  }) {
  class Foo {
    constructor({  }) {
    }
    static async regexInflight(pattern, text) {
      return (require("<ABSOLUTE_PATH>/external_js.js")["regexInflight"])(pattern, text)
    }
    static async getUuid() {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getUuid"])()
    }
    static async getData() {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getData"])()
    }
    static async print(msg) {
      return (require("<ABSOLUTE_PATH>/external_js.js")["print"])(msg)
    }
    async call() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.regexInflight(\"[a-z]+-\\\\d+\", \"abc-123\")")})((await Foo.regexInflight("[a-z]+-\\d+","abc-123")))};
      const uuid = (await Foo.getUuid());
      {((cond) => {if (!cond) throw new Error("assertion failed: uuid.length == 36")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(uuid.length,36)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Foo.getData() == \"Cool data!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await Foo.getData()),"Cool data!")))};
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
        "architectures": [
          "arm64"
        ],
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
        "architectures": [
          "arm64"
        ],
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static getGreeting(name) {
        return (require("<ABSOLUTE_PATH>/external_js.js")["getGreeting"])(name)
      }
      static v4() {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Foo-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this)};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["regexInflight", "getUuid", "getData", "print", "call", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("call")) {
          Foo._registerBindObject(Foo, host, ["getData", "getUuid", "regexInflight"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $f: ${context._lift(f)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(f, host, ["call"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $Foo: ${context._lift(Foo)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(Foo, host, ["print"]);
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.getGreeting(\"Wingding\") == \"Hello, Wingding!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Foo.getGreeting("Wingding")),"Hello, Wingding!")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Foo.v4().length == 36")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((Foo.v4()).length,36)))};
    const f = new Foo(this,"Foo");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:console",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "extern_implementation", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


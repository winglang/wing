# [extern_implementation.w](../../../../../examples/tests/valid/extern_implementation.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
```js
module.exports = function({ $f }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $f.print("hey there"));
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
    static async regexInflight(pattern, text) {
      return (require("<ABSOLUTE_PATH>/external_js.js")["regexInflight"])(pattern, text)
    }
    static async getUuid() {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getUuid"])()
    }
    static async getData() {
      return (require("<ABSOLUTE_PATH>/external_js.js")["getData"])()
    }
    async print(msg) {
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
      "value": "[[\"root/undefined/Default/test:call\",\"${aws_lambda_function.undefined_testcall_Handler_92B0ACB3.arn}\"],[\"root/undefined/Default/test:console\",\"${aws_lambda_function.undefined_testconsole_Handler_75D0BC2D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testcall_Handler_IamRole_98D71F08": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call/Handler/IamRole",
            "uniqueId": "undefined_testcall_Handler_IamRole_98D71F08"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testconsole_Handler_IamRole_49F16BC5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:console/Handler/IamRole",
            "uniqueId": "undefined_testconsole_Handler_IamRole_49F16BC5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testcall_Handler_IamRolePolicy_0F9254E0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcall_Handler_IamRolePolicy_0F9254E0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcall_Handler_IamRole_98D71F08.name}"
      },
      "undefined_testconsole_Handler_IamRolePolicy_FF8E1C86": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:console/Handler/IamRolePolicy",
            "uniqueId": "undefined_testconsole_Handler_IamRolePolicy_FF8E1C86"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testconsole_Handler_IamRole_49F16BC5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testcall_Handler_IamRolePolicyAttachment_A71991D0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcall_Handler_IamRolePolicyAttachment_A71991D0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcall_Handler_IamRole_98D71F08.name}"
      },
      "undefined_testconsole_Handler_IamRolePolicyAttachment_AF432ECA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:console/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testconsole_Handler_IamRolePolicyAttachment_AF432ECA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testconsole_Handler_IamRole_49F16BC5.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testcall_Handler_92B0ACB3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call/Handler/Default",
            "uniqueId": "undefined_testcall_Handler_92B0ACB3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8cd85ef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cd85ef",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcall_Handler_IamRole_98D71F08.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcall_Handler_S3Object_F9A5E373.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testconsole_Handler_75D0BC2D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:console/Handler/Default",
            "uniqueId": "undefined_testconsole_Handler_75D0BC2D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c812ca6c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c812ca6c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testconsole_Handler_IamRole_49F16BC5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testconsole_Handler_S3Object_CC84D75E.key}",
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
      "undefined_testcall_Handler_S3Object_F9A5E373": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call/Handler/S3Object",
            "uniqueId": "undefined_testcall_Handler_S3Object_F9A5E373"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testconsole_Handler_S3Object_CC84D75E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:console/Handler/S3Object",
            "uniqueId": "undefined_testconsole_Handler_S3Object_CC84D75E"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("regexInflight", "getUuid", "getData", "print", "call", "$inflight_init");
      }
      static getGreeting(name) {
        return (require("<ABSOLUTE_PATH>/external_js.js")["getGreeting"])(name)
      }
      static v4() {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Foo.js")({
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
            $f: ${context._lift(f)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(f, host, ["call"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            $f: ${context._lift(f)},
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
          $Closure2._registerBindObject(f, host, ["print"]);
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


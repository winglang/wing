# [extern_implementation.w](../../../../examples/tests/valid/extern_implementation.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:call\",\"${aws_lambda_function.root_testcall_517ABBF6.arn}\"],[\"root/Default/Default/test:console\",\"${aws_lambda_function.root_testconsole_65723C7E.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcall_IamRole_ACAC0DA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/IamRole",
            "uniqueId": "root_testcall_IamRole_ACAC0DA1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testconsole_IamRole_73B3A70E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/IamRole",
            "uniqueId": "root_testconsole_IamRole_73B3A70E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcall_IamRolePolicy_D0EC9ADF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/IamRolePolicy",
            "uniqueId": "root_testcall_IamRolePolicy_D0EC9ADF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcall_IamRole_ACAC0DA1.name}"
      },
      "root_testconsole_IamRolePolicy_2EC6F84C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/IamRolePolicy",
            "uniqueId": "root_testconsole_IamRolePolicy_2EC6F84C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testconsole_IamRole_73B3A70E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcall_IamRolePolicyAttachment_B0B58D7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/IamRolePolicyAttachment",
            "uniqueId": "root_testcall_IamRolePolicyAttachment_B0B58D7B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcall_IamRole_ACAC0DA1.name}"
      },
      "root_testconsole_IamRolePolicyAttachment_740041DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/IamRolePolicyAttachment",
            "uniqueId": "root_testconsole_IamRolePolicyAttachment_740041DD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testconsole_IamRole_73B3A70E.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcall_517ABBF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/Default",
            "uniqueId": "root_testcall_517ABBF6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-call-c82d98b7"
          }
        },
        "function_name": "test-call-c82d98b7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcall_IamRole_ACAC0DA1.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcall_S3Object_7FFD9CF8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testconsole_65723C7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/Default",
            "uniqueId": "root_testconsole_65723C7E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-console-c86d99aa"
          }
        },
        "function_name": "test-console-c86d99aa",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testconsole_IamRole_73B3A70E.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testconsole_S3Object_DC38E410.key}",
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
      "root_testcall_S3Object_7FFD9CF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call/S3Object",
            "uniqueId": "root_testcall_S3Object_7FFD9CF8"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testconsole_S3Object_DC38E410": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:console/S3Object",
            "uniqueId": "root_testconsole_S3Object_DC38E410"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push("regex_inflight", "get_uuid", "get_data", "print", "call");
      }
      static get_greeting(name)  {
        return (require("<ABSOLUTE_PATH>/external_js.js")["get_greeting"])(name)
      }
      static v4()  {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            class  Foo {
              constructor({ stateful }) {
                this.stateful = stateful;
              }
              static async regex_inflight(pattern, text)  {
                return (require("<ABSOLUTE_PATH>/external_js.js")["regex_inflight"])(pattern, text)
              }
              static async get_uuid()  {
                return (require("<ABSOLUTE_PATH>/external_js.js")["get_uuid"])()
              }
              static async get_data()  {
                return (require("<ABSOLUTE_PATH>/external_js.js")["get_data"])()
              }
              async print(msg)  {
                return (require("<ABSOLUTE_PATH>/external_js.js")["print"])(msg)
              }
              async call()  {
                {
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(await Foo.regex_inflight("[a-z]+-\\\\d+","abc-123"))\'\`)})((await Foo.regex_inflight("[a-z]+-\\\\d+","abc-123")))};
                  const uuid = (await Foo.get_uuid());
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(uuid.length === 36)\'\`)})((uuid.length === 36))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'((await Foo.get_data()) === "Cool data!")\'\`)})(((await Foo.get_data()) === "Cool data!"))};
                }
              }
            }
            const tmp = new Foo({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("call")) {
        }
        if (ops.includes("get_data")) {
        }
        if (ops.includes("get_uuid")) {
        }
        if (ops.includes("print")) {
        }
        if (ops.includes("regex_inflight")) {
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.get_greeting("Wingding")) === "Hello, Wingding!")'`)})(((Foo.get_greeting("Wingding")) === "Hello, Wingding!"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Foo.v4()).length === 36)'`)})(((Foo.v4()).length === 36))};
    const f = new Foo(this,"Foo");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:call",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        f: {
          obj: f,
          ops: ["call","get_data","get_uuid","print","regex_inflight"]
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:console",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        f: {
          obj: f,
          ops: ["call","get_data","get_uuid","print","regex_inflight"]
        },
      }
    })
    );
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

## proc1/index.js
```js
async handle() {
  const { f } = this;
  (await f.call());
}

```

## proc2/index.js
```js
async handle() {
  const { f } = this;
  (await f.print("hey there"));
}

```


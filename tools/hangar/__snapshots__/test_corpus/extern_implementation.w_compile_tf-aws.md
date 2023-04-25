# [extern_implementation.w](../../../../examples/tests/valid/extern_implementation.w) | compile | tf-aws

## clients/Foo.inflight.js
```js
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
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await Foo.regex_inflight("[a-z]+-\\d+","abc-123"))'`)})((await Foo.regex_inflight("[a-z]+-\\d+","abc-123")))};
      const uuid = (await Foo.get_uuid());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(uuid.length === 36)'`)})((uuid.length === 36))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Foo.get_data()) === "Cool data!")'`)})(((await Foo.get_data()) === "Cool data!"))};
    }
  }
}
exports.Foo = Foo;

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
      }
      static get_greeting(name)  {
        return (require("<ABSOLUTE_PATH>/external_js.js")["get_greeting"])(name)
      }
      static v4()  {
        return (require("<ABSOLUTE_PATH>/index.js")["v4"])()
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Foo.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Foo({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    Foo._annotateInflight("$inflight_init", {"this.stateful": { ops: [] }});
    Foo._annotateInflight("call", {});
    Foo._annotateInflight("get_data", {});
    Foo._annotateInflight("get_uuid", {});
    Foo._annotateInflight("print", {});
    Foo._annotateInflight("regex_inflight", {});
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

## tree.json
```json
{
  "version": "tree-0.1",
  "tree": {
    "id": "App",
    "path": "",
    "children": {
      "root": {
        "id": "root",
        "path": "root",
        "children": {
          "Default": {
            "id": "Default",
            "path": "root/Default",
            "children": {
              "aws": {
                "id": "aws",
                "path": "root/Default/aws",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.provider.AwsProvider",
                  "version": "12.0.2"
                }
              },
              "cloud.TestRunner": {
                "id": "cloud.TestRunner",
                "path": "root/Default/cloud.TestRunner",
                "children": {
                  "TestFunctionArns": {
                    "id": "TestFunctionArns",
                    "path": "root/Default/cloud.TestRunner/TestFunctionArns",
                    "constructInfo": {
                      "fqn": "cdktf.TerraformOutput",
                      "version": "0.15.2"
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.cloud.TestRunner",
                  "version": "0.0.0"
                },
                "display": {
                  "title": "TestRunner",
                  "description": "A suite of APIs for running tests and collecting results.",
                  "hidden": true
                }
              },
              "Default": {
                "id": "Default",
                "path": "root/Default/Default",
                "children": {
                  "Foo": {
                    "id": "Foo",
                    "path": "root/Default/Default/Foo",
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": [
                        {
                          "direction": "inbound",
                          "relationship": "call",
                          "resource": "root/Default/Default/test:call",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get_data",
                          "resource": "root/Default/Default/test:call",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get_uuid",
                          "resource": "root/Default/Default/test:call",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "print",
                          "resource": "root/Default/Default/test:call",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "regex_inflight",
                          "resource": "root/Default/Default/test:call",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "call",
                          "resource": "root/Default/Default/test:console",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get_data",
                          "resource": "root/Default/Default/test:console",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get_uuid",
                          "resource": "root/Default/Default/test:console",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "print",
                          "resource": "root/Default/Default/test:console",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "regex_inflight",
                          "resource": "root/Default/Default/test:console",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.std.Resource",
                      "version": "0.0.0"
                    }
                  },
                  "$Inflight1": {
                    "id": "$Inflight1",
                    "path": "root/Default/Default/$Inflight1",
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": []
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.std.Resource",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Inflight",
                      "description": "An inflight resource",
                      "hidden": true
                    }
                  },
                  "test:call": {
                    "id": "test:call",
                    "path": "root/Default/Default/test:call",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:call/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:call/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:call/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:call/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:call/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:call/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.lambdaFunction.LambdaFunction",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": [
                        {
                          "direction": "outbound",
                          "relationship": "call",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get_data",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get_uuid",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "print",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "regex_inflight",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Function",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Function",
                      "description": "A cloud function (FaaS)"
                    }
                  },
                  "$Inflight2": {
                    "id": "$Inflight2",
                    "path": "root/Default/Default/$Inflight2",
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": []
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.std.Resource",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Inflight",
                      "description": "An inflight resource",
                      "hidden": true
                    }
                  },
                  "test:console": {
                    "id": "test:console",
                    "path": "root/Default/Default/test:console",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:console/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:console/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:console/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:console/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:console/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:console/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.lambdaFunction.LambdaFunction",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": [
                        {
                          "direction": "outbound",
                          "relationship": "call",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get_data",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get_uuid",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "print",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "regex_inflight",
                          "resource": "root/Default/Default/Foo",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Function",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Function",
                      "description": "A cloud function (FaaS)"
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.std.Resource",
                  "version": "0.0.0"
                }
              },
              "Code": {
                "id": "Code",
                "path": "root/Default/Code",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                  "version": "12.0.2"
                }
              }
            },
            "constructInfo": {
              "fqn": "@winglang/sdk.core.CdktfApp",
              "version": "0.0.0"
            }
          },
          "backend": {
            "id": "backend",
            "path": "root/backend",
            "constructInfo": {
              "fqn": "cdktf.LocalBackend",
              "version": "0.15.2"
            }
          }
        },
        "constructInfo": {
          "fqn": "cdktf.TerraformStack",
          "version": "0.15.2"
        }
      }
    },
    "constructInfo": {
      "fqn": "cdktf.App",
      "version": "0.15.2"
    }
  }
}
```


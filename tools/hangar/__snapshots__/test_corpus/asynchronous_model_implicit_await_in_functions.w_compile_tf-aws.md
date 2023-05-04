# [asynchronous_model_implicit_await_in_functions.w](../../../../examples/tests/valid/asynchronous_model_implicit_await_in_functions.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function() {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle(s)  {
      {
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ str_to_str }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle(s)  {
      {
        (await str_to_str.invoke("one"));
        {console.log((await str_to_str.invoke("two")))};
      }
    }
  }
  return $Inflight2;
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_func_IamRole_EE572BCE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/IamRole",
            "uniqueId": "root_func_IamRole_EE572BCE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_strtostr_IamRole_305ACAF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/str_to_str/IamRole",
            "uniqueId": "root_strtostr_IamRole_305ACAF8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_func_IamRolePolicy_3AC5101F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/IamRolePolicy",
            "uniqueId": "root_func_IamRolePolicy_3AC5101F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_strtostr_05420EE8.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_func_IamRole_EE572BCE.name}"
      },
      "root_strtostr_IamRolePolicy_B80B33C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/str_to_str/IamRolePolicy",
            "uniqueId": "root_strtostr_IamRolePolicy_B80B33C4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_strtostr_IamRole_305ACAF8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_func_IamRolePolicyAttachment_AD2DD410": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/IamRolePolicyAttachment",
            "uniqueId": "root_func_IamRolePolicyAttachment_AD2DD410"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_func_IamRole_EE572BCE.name}"
      },
      "root_strtostr_IamRolePolicyAttachment_C5B57BBD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/str_to_str/IamRolePolicyAttachment",
            "uniqueId": "root_strtostr_IamRolePolicyAttachment_C5B57BBD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_strtostr_IamRole_305ACAF8.name}"
      }
    },
    "aws_lambda_function": {
      "root_func_0444AFD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/Default",
            "uniqueId": "root_func_0444AFD0"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_8ca853c9": "${aws_lambda_function.root_strtostr_05420EE8.arn}",
            "WING_FUNCTION_NAME": "func-c8cf78f6"
          }
        },
        "function_name": "func-c8cf78f6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_func_IamRole_EE572BCE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_func_S3Object_F6163647.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_strtostr_05420EE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/str_to_str/Default",
            "uniqueId": "root_strtostr_05420EE8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "str_to_str-c8891c85"
          }
        },
        "function_name": "str_to_str-c8891c85",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_strtostr_IamRole_305ACAF8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_strtostr_S3Object_C6E06A09.key}",
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
      "root_func_S3Object_F6163647": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/S3Object",
            "uniqueId": "root_func_S3Object_F6163647"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_strtostr_S3Object_C6E06A09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/str_to_str/S3Object",
            "uniqueId": "root_strtostr_S3Object_C6E06A09"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "root_cloudQueue_E3597F7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "root_cloudQueue_E3597F7A"
          }
        },
        "name": "cloud-Queue-c86e03d8"
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
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const str_to_str = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"str_to_str",(( () =>  {
      {
        class $Inflight1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight1 = require("${self_client_path}")({});
                const client = new $Inflight1({
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
        return new $Inflight1(this,"$Inflight1");
      }
    }
    )()));
    const func = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"func",(( () =>  {
      {
        class $Inflight2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const str_to_str_client = this._lift(str_to_str);
            const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight2 = require("${self_client_path}")({
                  str_to_str: ${str_to_str_client},
                });
                const client = new $Inflight2({
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
              this._registerBindObject(str_to_str, host, ["invoke"]);
            }
            super._registerBind(host, ops);
          }
        }
        return new $Inflight2(this,"$Inflight2");
      }
    }
    )()));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "asynchronous_model_implicit_await_in_functions", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(s) {
  const {  } = this;
}

```

## proc2/index.js
```js
async handle(s) {
  const { str_to_str } = this;
  (await str_to_str.invoke("one"));
  {console.log((await str_to_str.invoke("two")))};
}

```


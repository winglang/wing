# [asynchronous_model_implicit_await_in_functions.w](../../../../examples/tests/valid/asynchronous_model_implicit_await_in_functions.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
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
module.exports = function({ strToStr }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle(s)  {
      {
        (await strToStr.invoke("one"));
        {console.log((await strToStr.invoke("two")))};
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
      "root_strToStr_IamRole_3DB9F718": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/IamRole",
            "uniqueId": "root_strToStr_IamRole_3DB9F718"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_strToStr_D5CC2EE4.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_func_IamRole_EE572BCE.name}"
      },
      "root_strToStr_IamRolePolicy_7CFB4B0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/IamRolePolicy",
            "uniqueId": "root_strToStr_IamRolePolicy_7CFB4B0C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_strToStr_IamRole_3DB9F718.name}"
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
      "root_strToStr_IamRolePolicyAttachment_1346C60A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/IamRolePolicyAttachment",
            "uniqueId": "root_strToStr_IamRolePolicyAttachment_1346C60A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_strToStr_IamRole_3DB9F718.name}"
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
            "FUNCTION_NAME_bc9a3a6d": "${aws_lambda_function.root_strToStr_D5CC2EE4.arn}",
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
      "root_strToStr_D5CC2EE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/Default",
            "uniqueId": "root_strToStr_D5CC2EE4"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "strToStr-c8d5081f"
          }
        },
        "function_name": "strToStr-c8d5081f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_strToStr_IamRole_3DB9F718.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_strToStr_S3Object_C492B63C.key}",
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
      "root_strToStr_S3Object_C492B63C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/S3Object",
            "uniqueId": "root_strToStr_S3Object_C492B63C"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
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
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
        const strToStr_client = context._lift(strToStr);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            strToStr: ${strToStr_client},
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
          this._registerBindObject(strToStr, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const strToStr = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"strToStr",new $Inflight1(this,"$Inflight1"));
    const func = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"func",new $Inflight2(this,"$Inflight2"));
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
  const { strToStr } = this;
  (await strToStr.invoke("one"));
  {console.log((await strToStr.invoke("two")))};
}

```


# [invoke.w](../../../../examples/tests/valid/invoke.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ payload }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        return payload;
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ f, payload }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle()  {
      {
        const x = (await f.invoke(""));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === payload)'`)})((x === payload))};
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
      "value": "[[\"root/Default/Default/test:function invoke\",\"${aws_lambda_function.root_testfunctioninvoke_D0726F40.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_cloudFunction_IamRole_DAEC3578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "root_cloudFunction_IamRole_DAEC3578"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testfunctioninvoke_IamRole_FDF47F89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function invoke/IamRole",
            "uniqueId": "root_testfunctioninvoke_IamRole_FDF47F89"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudFunction_IamRolePolicy_AAE6C0C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "root_cloudFunction_IamRolePolicy_AAE6C0C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_testfunctioninvoke_IamRolePolicy_69A282A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function invoke/IamRolePolicy",
            "uniqueId": "root_testfunctioninvoke_IamRolePolicy_69A282A1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_cloudFunction_6A57BA0A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testfunctioninvoke_IamRole_FDF47F89.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_testfunctioninvoke_IamRolePolicyAttachment_F7AD788F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function invoke/IamRolePolicyAttachment",
            "uniqueId": "root_testfunctioninvoke_IamRolePolicyAttachment_F7AD788F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfunctioninvoke_IamRole_FDF47F89.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudFunction_6A57BA0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "root_cloudFunction_6A57BA0A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudFunction_S3Object_C8435368.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testfunctioninvoke_D0726F40": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function invoke/Default",
            "uniqueId": "root_testfunctioninvoke_D0726F40"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_5bb84dfa": "${aws_lambda_function.root_cloudFunction_6A57BA0A.arn}",
            "WING_FUNCTION_NAME": "test-function-invoke-c865b0cd"
          }
        },
        "function_name": "test-function-invoke-c865b0cd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testfunctioninvoke_IamRole_FDF47F89.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfunctioninvoke_S3Object_19282AA4.key}",
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
      "root_cloudFunction_S3Object_C8435368": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "root_cloudFunction_S3Object_C8435368"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testfunctioninvoke_S3Object_19282AA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function invoke/S3Object",
            "uniqueId": "root_testfunctioninvoke_S3Object_19282AA4"
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
    const payload = "hello";
    const f = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",(( () =>  {
      {
        class $Inflight1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const payload_client = this._lift(payload);
            const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight1 = require("${self_client_path}")({
                  payload: ${payload_client},
                });
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
              this._registerBindObject(payload, host, []);
            }
            super._registerBind(host, ops);
          }
        }
        return new $Inflight1(this,"$Inflight1");
      }
    }
    )()));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:function invoke",(( () =>  {
      {
        class $Inflight2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const f_client = this._lift(f);
            const payload_client = this._lift(payload);
            const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight2 = require("${self_client_path}")({
                  f: ${f_client},
                  payload: ${payload_client},
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
              this._registerBindObject(f, host, ["invoke"]);
              this._registerBindObject(payload, host, []);
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
    super({ outdir: $outdir, name: "invoke", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


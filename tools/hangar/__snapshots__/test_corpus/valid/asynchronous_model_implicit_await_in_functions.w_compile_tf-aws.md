# [asynchronous_model_implicit_await_in_functions.w](../../../../../examples/tests/valid/asynchronous_model_implicit_await_in_functions.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(s) {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $strToStr }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(s) {
      (await $strToStr.invoke("one"));
      {console.log((await $strToStr.invoke("two")))};
    }
  }
  return $Closure2;
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
      "undefined_func_IamRole_7B42C526": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func/IamRole",
            "uniqueId": "undefined_func_IamRole_7B42C526"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_strToStr_IamRole_93A7B727": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/strToStr/IamRole",
            "uniqueId": "undefined_strToStr_IamRole_93A7B727"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_func_IamRolePolicy_9743035A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func/IamRolePolicy",
            "uniqueId": "undefined_func_IamRolePolicy_9743035A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_strToStr_8417B8E1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_func_IamRole_7B42C526.name}"
      },
      "undefined_strToStr_IamRolePolicy_555A2C5F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/strToStr/IamRolePolicy",
            "uniqueId": "undefined_strToStr_IamRolePolicy_555A2C5F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_strToStr_IamRole_93A7B727.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_func_IamRolePolicyAttachment_6ACE0F7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func/IamRolePolicyAttachment",
            "uniqueId": "undefined_func_IamRolePolicyAttachment_6ACE0F7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_func_IamRole_7B42C526.name}"
      },
      "undefined_strToStr_IamRolePolicyAttachment_10786FAA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/strToStr/IamRolePolicyAttachment",
            "uniqueId": "undefined_strToStr_IamRolePolicyAttachment_10786FAA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_strToStr_IamRole_93A7B727.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_func_8709FFCF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func/Default",
            "uniqueId": "undefined_func_8709FFCF"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_abd487ee": "${aws_lambda_function.undefined_strToStr_8417B8E1.arn}",
            "WING_FUNCTION_NAME": "func-c8e6ceb2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "func-c8e6ceb2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_func_IamRole_7B42C526.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_func_S3Object_6C970E06.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_strToStr_8417B8E1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/strToStr/Default",
            "uniqueId": "undefined_strToStr_8417B8E1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "strToStr-c8a785a3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "strToStr-c8a785a3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_strToStr_IamRole_93A7B727.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_strToStr_S3Object_9E50A6B0.key}",
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
      "undefined_func_S3Object_6C970E06": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func/S3Object",
            "uniqueId": "undefined_func_S3Object_6C970E06"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_strToStr_S3Object_9E50A6B0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/strToStr/S3Object",
            "uniqueId": "undefined_strToStr_S3Object_9E50A6B0"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "undefined_cloudQueue_98A56968": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue/Default",
            "uniqueId": "undefined_cloudQueue_98A56968"
          }
        },
        "name": "cloud-Queue-c873ff25"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
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
            $strToStr: ${context._lift(strToStr)},
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
          $Closure2._registerBindObject(strToStr, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const strToStr = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"strToStr",new $Closure1(this,"$Closure1"));
    const func = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"func",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "asynchronous_model_implicit_await_in_functions", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


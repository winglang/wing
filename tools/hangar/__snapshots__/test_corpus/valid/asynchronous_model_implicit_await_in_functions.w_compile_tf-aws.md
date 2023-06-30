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
    async $inflight_init()  {
    }
    async handle(s)  {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ strToStr }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(s)  {
      (await strToStr.invoke("one"));
      {console.log((await strToStr.invoke("two")))};
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
      "func_IamRole_EED2D17C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/IamRole",
            "uniqueId": "func_IamRole_EED2D17C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "strToStr_IamRole_3B9A4F9A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/IamRole",
            "uniqueId": "strToStr_IamRole_3B9A4F9A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "func_IamRolePolicy_2009421D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/IamRolePolicy",
            "uniqueId": "func_IamRolePolicy_2009421D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.strToStr.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.func_IamRole_EED2D17C.name}"
      },
      "strToStr_IamRolePolicy_3A2AE25D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/IamRolePolicy",
            "uniqueId": "strToStr_IamRolePolicy_3A2AE25D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.strToStr_IamRole_3B9A4F9A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "func_IamRolePolicyAttachment_7F64F55B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/IamRolePolicyAttachment",
            "uniqueId": "func_IamRolePolicyAttachment_7F64F55B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.func_IamRole_EED2D17C.name}"
      },
      "strToStr_IamRolePolicyAttachment_9FECADE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/IamRolePolicyAttachment",
            "uniqueId": "strToStr_IamRolePolicyAttachment_9FECADE8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.strToStr_IamRole_3B9A4F9A.name}"
      }
    },
    "aws_lambda_function": {
      "func": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/Default",
            "uniqueId": "func"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_bc9a3a6d": "${aws_lambda_function.strToStr.arn}",
            "WING_FUNCTION_NAME": "func-c8cf78f6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "func-c8cf78f6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.func_IamRole_EED2D17C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.func_S3Object_82AC2651.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "strToStr": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/Default",
            "uniqueId": "strToStr"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "strToStr-c8d5081f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "strToStr-c8d5081f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.strToStr_IamRole_3B9A4F9A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.strToStr_S3Object_1E7679F7.key}",
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
      "func_S3Object_82AC2651": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/S3Object",
            "uniqueId": "func_S3Object_82AC2651"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "strToStr_S3Object_1E7679F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/S3Object",
            "uniqueId": "strToStr_S3Object_1E7679F7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "cloudQueue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "cloudQueue"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
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
          $Closure2._registerBindObject(strToStr, host, []);
        }
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


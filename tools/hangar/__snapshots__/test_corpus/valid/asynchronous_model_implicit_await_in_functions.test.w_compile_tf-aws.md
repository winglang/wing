# [asynchronous_model_implicit_await_in_functions.test.w](../../../../../examples/tests/valid/asynchronous_model_implicit_await_in_functions.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
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

## inflight.$Closure2-1.js
```js
"use strict";
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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "func_CloudwatchLogGroup_A63DB99C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func/CloudwatchLogGroup",
            "uniqueId": "func_CloudwatchLogGroup_A63DB99C"
          }
        },
        "name": "/aws/lambda/func-c8cf78f6",
        "retention_in_days": 30
      },
      "strToStr_CloudwatchLogGroup_41D3ADB9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/strToStr/CloudwatchLogGroup",
            "uniqueId": "strToStr_CloudwatchLogGroup_41D3ADB9"
          }
        },
        "name": "/aws/lambda/strToStr-c8d5081f",
        "retention_in_days": 30
      }
    },
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
        "architectures": [
          "arm64"
        ],
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
        "timeout": 60,
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
        "architectures": [
          "arm64"
        ],
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
        "timeout": 60,
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
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c86e03d8",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $strToStr: ${context._lift(strToStr)},
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
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(strToStr, host, ["invoke"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this, "cloud.Queue");
    const strToStr = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "strToStr", new $Closure1(this, "$Closure1"));
    const func = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this, "func", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "asynchronous_model_implicit_await_in_functions.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


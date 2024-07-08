# [asynchronous_model_implicit_await_in_functions.test.w](../../../../../examples/tests/valid/asynchronous_model_implicit_await_in_functions.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $strToStr }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $strToStr.invoke("one"));
      console.log(((await $strToStr.invoke("two")) ?? "no response"));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=inflight.$Closure2-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {}
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
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "func-c8cf78f6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "func-c8cf78f6",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.func_IamRole_EED2D17C.arn}",
        "runtime": "nodejs20.x",
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
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "strToStr-c8d5081f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "strToStr-c8d5081f",
        "handler": "index.handler",
        "logging_config": {
          "log_format": "JSON"
        },
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.strToStr_IamRole_3B9A4F9A.arn}",
        "runtime": "nodejs20.x",
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
      "Queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Default",
            "uniqueId": "Queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c822c726",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
if (globalThis.$ClassFactory !== undefined) { throw new Error("$ClassFactory already defined"); }
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class $Closure2 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure2-1.cjs")({
            $strToStr: ${$stdlib.core.liftObject(strToStr)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType()};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [strToStr, ["invoke"]],
          ],
          "$inflight_init": [
            [strToStr, []],
          ],
        });
      }
    }
    const q = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
    const strToStr = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "strToStr", new $Closure1(this, "$Closure1"));
    const func = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Function", cloud.Function, this, "func", new $Closure2(this, "$Closure2"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "asynchronous_model_implicit_await_in_functions.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


# [aws-function.test.w](../../../../../../examples/tests/sdk_tests/function/aws-function.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
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
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $functionInfo, $target }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $functionInfo;
        if ($if_let_value != undefined) {
          const lambda = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionArn\").contains(\"arn:aws:lambda:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionArn").includes("arn:aws:lambda:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionArn\").contains(\":function:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionArn").includes(":function:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionArn\").contains(\"aws-wing-function\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionArn").includes("aws-wing-function"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionName\").contains(\"aws-wing-function\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionName").includes("aws-wing-function"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionArn\").contains(\"arn:aws:lambda:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionArn").includes("arn:aws:lambda:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionArn\").contains(\":function:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionArn").includes(":function:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionArn\").contains(\"awswingfunction\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionArn").includes("awswingfunction"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: lambda.get(\"functionName\").contains(\"awswingfunction\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(lambda, "functionName").includes("awswingfunction"))};
          }
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
      }
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "aws-wing-function_CloudwatchLogGroup_2CCFCD44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/CloudwatchLogGroup",
            "uniqueId": "aws-wing-function_CloudwatchLogGroup_2CCFCD44"
          }
        },
        "name": "/aws/lambda/aws-wing-function-c8f4cdef",
        "retention_in_days": 30
      }
    },
    "aws_iam_role": {
      "aws-wing-function_IamRole_705FDD7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/IamRole",
            "uniqueId": "aws-wing-function_IamRole_705FDD7E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "aws-wing-function_IamRolePolicy_CF2194BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/IamRolePolicy",
            "uniqueId": "aws-wing-function_IamRolePolicy_CF2194BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.aws-wing-function_IamRole_705FDD7E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "aws-wing-function_IamRolePolicyAttachment_F788B7D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/IamRolePolicyAttachment",
            "uniqueId": "aws-wing-function_IamRolePolicyAttachment_F788B7D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.aws-wing-function_IamRole_705FDD7E.name}"
      }
    },
    "aws_lambda_function": {
      "aws-wing-function": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/Default",
            "uniqueId": "aws-wing-function"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "aws-wing-function-c8f4cdef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "aws-wing-function-c8f4cdef",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.aws-wing-function_IamRole_705FDD7E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.aws-wing-function_S3Object_9678073C.key}",
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
      "aws-wing-function_S3Object_9678073C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-function/S3Object",
            "uniqueId": "aws-wing-function_S3Object_9678073C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
const cloud = $stdlib.cloud;
const aws = $stdlib.aws;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure2-1.cjs")({
            $functionInfo: ${$stdlib.core.liftObject(functionInfo)},
            $target: ${$stdlib.core.liftObject(target)},
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
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(functionInfo, host, []);
          $Closure2._registerOnLiftObject(target, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const lambda = this.node.root.new("@winglang/sdk.cloud.Function", cloud.Function, this, "aws-wing-function", new $Closure1(this, "$Closure1"));
    const getFunctionInfo = ((f) => {
      {
        const $if_let_value = (aws.Function.from(f));
        if ($if_let_value != undefined) {
          const lambda = $if_let_value;
          return ({"functionName": lambda.functionName, "functionArn": lambda.functionArn});
        }
      }
      return undefined;
    });
    const functionInfo = (getFunctionInfo(lambda));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS Function", new $Closure2(this, "$Closure2"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-function.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


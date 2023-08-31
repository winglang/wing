# [wait-until.w](../../../../../../examples/tests/sdk_tests/util/wait-until.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $JSHelper, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const start = (await $JSHelper.getTime());
      if ((await $util_Util.waitUntil(async () => {
        return true;
      }
      ))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: JSHelper.getTime() - start < 1000")})((((await $JSHelper.getTime()) - start) < 1000))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $JSHelper, $oneSecond, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const start = (await $JSHelper.getTime());
      if ((await $util_Util.waitUntil(async () => {
        return false;
      }
      ,{ timeout: $oneSecond }))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: JSHelper.getTime() - start > 1 * 1000")})((((await $JSHelper.getTime()) - start) > (1 * 1000)))};
      }
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $JSHelper, $invokeCounter, $oneSecond, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const start = (await $JSHelper.getTime());
      const returnTrueAfter3Seconds = async () => {
        (await $invokeCounter.inc());
        return (((await $JSHelper.getTime()) - start) > (3 * 1000));
      }
      ;
      if ((await $util_Util.waitUntil(returnTrueAfter3Seconds,{ interval: $oneSecond }))) {
        const invocations = (await $invokeCounter.peek());
        {((cond) => {if (!cond) throw new Error("assertion failed:  invocations > 1 && invocations < 10 ")})(((invocations > 1) && (invocations < 10)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({ $JSHelper, $fiveSeconds, $invokeCounter, $oneSecond, $util_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const start = (await $JSHelper.getTime());
      const returnFalse = async () => {
        (await $invokeCounter.inc());
        return false;
      }
      ;
      if ((await $util_Util.waitUntil(returnFalse,{ interval: $oneSecond, timeout: $fiveSeconds }))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      else {
        const invokeCount = (await $invokeCounter.peek());
        {((cond) => {if (!cond) throw new Error("assertion failed: invokeCount > 3 && invokeCount < 7")})(((invokeCount > 3) && (invokeCount < 7)))};
      }
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({ $invokeCounter, $util_Util }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      try {
        (await $util_Util.waitUntil(async () => {
          (await $invokeCounter.inc());
          throw new Error("ERROR");
        }
        ));
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
      catch {
        {((cond) => {if (!cond) throw new Error("assertion failed: invokeCounter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $invokeCounter.peek()),1)))};
      }
    }
  }
  return $Closure5;
}

```

## inflight.JSHelper-1.js
```js
module.exports = function({  }) {
  class JSHelper {
    constructor({  }) {
    }
    static async getTime() {
      return (require("<ABSOLUTE_PATH>/sleep-helper.js")["getTime"])()
    }
  }
  return JSHelper;
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
      "value": "[[\"root/Default/Default/test:returns true immediately\",\"${aws_lambda_function.testreturnstrueimmediately_Handler_0210037F.arn}\"],[\"root/Default/Default/test:returns false goes to timeout\",\"${aws_lambda_function.testreturnsfalsegoestotimeout_Handler_A7F9DD9D.arn}\"],[\"root/Default/Default/test:returns after some time waiting\",\"${aws_lambda_function.testreturnsaftersometimewaiting_Handler_436A90C3.arn}\"],[\"root/Default/Default/test:setting props\",\"${aws_lambda_function.testsettingprops_Handler_8BB7DC9B.arn}\"],[\"root/Default/Default/test:throwing exception from predicate should throw immediately\",\"${aws_lambda_function.testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_B4BADFD9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "testreturnsaftersometimewaiting_Handler_IamRole_24ED1A3A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/IamRole",
            "uniqueId": "testreturnsaftersometimewaiting_Handler_IamRole_24ED1A3A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testreturnsfalsegoestotimeout_Handler_IamRole_57890A08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/IamRole",
            "uniqueId": "testreturnsfalsegoestotimeout_Handler_IamRole_57890A08"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testreturnstrueimmediately_Handler_IamRole_62FB5976": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/IamRole",
            "uniqueId": "testreturnstrueimmediately_Handler_IamRole_62FB5976"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testsettingprops_Handler_IamRole_6953F1F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/IamRole",
            "uniqueId": "testsettingprops_Handler_IamRole_6953F1F6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_B0167A3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/IamRole",
            "uniqueId": "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_B0167A3F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testreturnsaftersometimewaiting_Handler_IamRolePolicy_0EE22452": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/IamRolePolicy",
            "uniqueId": "testreturnsaftersometimewaiting_Handler_IamRolePolicy_0EE22452"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testreturnsaftersometimewaiting_Handler_IamRole_24ED1A3A.name}"
      },
      "testreturnsfalsegoestotimeout_Handler_IamRolePolicy_25F86059": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/IamRolePolicy",
            "uniqueId": "testreturnsfalsegoestotimeout_Handler_IamRolePolicy_25F86059"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testreturnsfalsegoestotimeout_Handler_IamRole_57890A08.name}"
      },
      "testreturnstrueimmediately_Handler_IamRolePolicy_870CB70A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/IamRolePolicy",
            "uniqueId": "testreturnstrueimmediately_Handler_IamRolePolicy_870CB70A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testreturnstrueimmediately_Handler_IamRole_62FB5976.name}"
      },
      "testsettingprops_Handler_IamRolePolicy_B2AEA6D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/IamRolePolicy",
            "uniqueId": "testsettingprops_Handler_IamRolePolicy_B2AEA6D4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testsettingprops_Handler_IamRole_6953F1F6.name}"
      },
      "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicy_CEF05D37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/IamRolePolicy",
            "uniqueId": "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicy_CEF05D37"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_B0167A3F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testreturnsaftersometimewaiting_Handler_IamRolePolicyAttachment_2969D994": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/IamRolePolicyAttachment",
            "uniqueId": "testreturnsaftersometimewaiting_Handler_IamRolePolicyAttachment_2969D994"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testreturnsaftersometimewaiting_Handler_IamRole_24ED1A3A.name}"
      },
      "testreturnsfalsegoestotimeout_Handler_IamRolePolicyAttachment_92041F39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/IamRolePolicyAttachment",
            "uniqueId": "testreturnsfalsegoestotimeout_Handler_IamRolePolicyAttachment_92041F39"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testreturnsfalsegoestotimeout_Handler_IamRole_57890A08.name}"
      },
      "testreturnstrueimmediately_Handler_IamRolePolicyAttachment_4674DB18": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/IamRolePolicyAttachment",
            "uniqueId": "testreturnstrueimmediately_Handler_IamRolePolicyAttachment_4674DB18"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testreturnstrueimmediately_Handler_IamRole_62FB5976.name}"
      },
      "testsettingprops_Handler_IamRolePolicyAttachment_EBCE864E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsettingprops_Handler_IamRolePolicyAttachment_EBCE864E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsettingprops_Handler_IamRole_6953F1F6.name}"
      },
      "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicyAttachment_5075162A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/IamRolePolicyAttachment",
            "uniqueId": "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicyAttachment_5075162A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_B0167A3F.name}"
      }
    },
    "aws_lambda_function": {
      "testreturnsaftersometimewaiting_Handler_436A90C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/Default",
            "uniqueId": "testreturnsaftersometimewaiting_Handler_436A90C3"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c825136f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c825136f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testreturnsaftersometimewaiting_Handler_IamRole_24ED1A3A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testreturnsaftersometimewaiting_Handler_S3Object_71DBD4AC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testreturnsfalsegoestotimeout_Handler_A7F9DD9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/Default",
            "uniqueId": "testreturnsfalsegoestotimeout_Handler_A7F9DD9D"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c857ac6d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c857ac6d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testreturnsfalsegoestotimeout_Handler_IamRole_57890A08.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testreturnsfalsegoestotimeout_Handler_S3Object_1B345AEE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testreturnstrueimmediately_Handler_0210037F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/Default",
            "uniqueId": "testreturnstrueimmediately_Handler_0210037F"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85e05f6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85e05f6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testreturnstrueimmediately_Handler_IamRole_62FB5976.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testreturnstrueimmediately_Handler_S3Object_BDE35D32.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testsettingprops_Handler_8BB7DC9B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/Default",
            "uniqueId": "testsettingprops_Handler_8BB7DC9B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8da809f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8da809f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsettingprops_Handler_IamRole_6953F1F6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsettingprops_Handler_S3Object_EBE1EFD3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_B4BADFD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/Default",
            "uniqueId": "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_B4BADFD9"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8a3878e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a3878e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_B0167A3F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_EBADB0B5.key}",
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
      "testreturnsaftersometimewaiting_Handler_S3Object_71DBD4AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/S3Object",
            "uniqueId": "testreturnsaftersometimewaiting_Handler_S3Object_71DBD4AC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testreturnsfalsegoestotimeout_Handler_S3Object_1B345AEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/S3Object",
            "uniqueId": "testreturnsfalsegoestotimeout_Handler_S3Object_1B345AEE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testreturnstrueimmediately_Handler_S3Object_BDE35D32": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/S3Object",
            "uniqueId": "testreturnstrueimmediately_Handler_S3Object_BDE35D32"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testsettingprops_Handler_S3Object_EBE1EFD3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/S3Object",
            "uniqueId": "testsettingprops_Handler_S3Object_EBE1EFD3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_EBADB0B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/S3Object",
            "uniqueId": "testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_EBADB0B5"
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

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.JSHelper-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const JSHelperClient = ${JSHelper._toInflightType(this)};
            const client = new JSHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["getTime", "$inflight_init"];
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $util_Util: ${context._lift(util.Util)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(JSHelper, host, ["getTime"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $oneSecond: ${context._lift(oneSecond)},
            $util_Util: ${context._lift(util.Util)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure2._registerBindObject(oneSecond, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $invokeCounter: ${context._lift(invokeCounter)},
            $oneSecond: ${context._lift(oneSecond)},
            $util_Util: ${context._lift(util.Util)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure3._registerBindObject(invokeCounter, host, ["inc", "peek"]);
          $Closure3._registerBindObject(oneSecond, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $fiveSeconds: ${context._lift(fiveSeconds)},
            $invokeCounter: ${context._lift(invokeCounter)},
            $oneSecond: ${context._lift(oneSecond)},
            $util_Util: ${context._lift(util.Util)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure4._registerBindObject(fiveSeconds, host, []);
          $Closure4._registerBindObject(invokeCounter, host, ["inc", "peek"]);
          $Closure4._registerBindObject(oneSecond, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
            $invokeCounter: ${context._lift(invokeCounter)},
            $util_Util: ${context._lift(util.Util)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(invokeCounter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const invokeCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const oneHundredMiliseconds = (std.Duration.fromSeconds(0.1));
    const oneSecond = (std.Duration.fromSeconds(1));
    const fiveSeconds = (std.Duration.fromSeconds(5));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:returns true immediately",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:returns false goes to timeout",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:returns after some time waiting",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setting props",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:throwing exception from predicate should throw immediately",new $Closure5(this,"$Closure5"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "wait-until", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


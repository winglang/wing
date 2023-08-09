# [wait-until.w](../../../../../../examples/tests/sdk_tests/util/wait-until.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
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

## inflight.$Closure3.js
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

## inflight.$Closure4.js
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

## inflight.$Closure5.js
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
          {((msg) => {throw new Error(msg)})("ERROR")};
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

## inflight.JSHelper.js
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
      "value": "[[\"root/undefined/Default/test:returns true immediately\",\"${aws_lambda_function.undefined_testreturnstrueimmediately_Handler_4AEC14D1.arn}\"],[\"root/undefined/Default/test:returns false goes to timeout\",\"${aws_lambda_function.undefined_testreturnsfalsegoestotimeout_Handler_3B3701C8.arn}\"],[\"root/undefined/Default/test:returns after some time waiting\",\"${aws_lambda_function.undefined_testreturnsaftersometimewaiting_Handler_66D275C9.arn}\"],[\"root/undefined/Default/test:setting props\",\"${aws_lambda_function.undefined_testsettingprops_Handler_5965F2FF.arn}\"],[\"root/undefined/Default/test:throwing exception from predicate should throw immediately\",\"${aws_lambda_function.undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_A99325B8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_cloudCounter_4B4E77ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Counter/Default",
            "uniqueId": "undefined_cloudCounter_4B4E77ED"
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
        "name": "wing-counter-cloud.Counter-c86bae23"
      }
    },
    "aws_iam_role": {
      "undefined_testreturnsaftersometimewaiting_Handler_IamRole_FCFBEC84": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns after some time waiting/Handler/IamRole",
            "uniqueId": "undefined_testreturnsaftersometimewaiting_Handler_IamRole_FCFBEC84"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testreturnsfalsegoestotimeout_Handler_IamRole_32BC910D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns false goes to timeout/Handler/IamRole",
            "uniqueId": "undefined_testreturnsfalsegoestotimeout_Handler_IamRole_32BC910D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testreturnstrueimmediately_Handler_IamRole_FC47958B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns true immediately/Handler/IamRole",
            "uniqueId": "undefined_testreturnstrueimmediately_Handler_IamRole_FC47958B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testsettingprops_Handler_IamRole_0463F11A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setting props/Handler/IamRole",
            "uniqueId": "undefined_testsettingprops_Handler_IamRole_0463F11A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_73E2E21E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:throwing exception from predicate should throw immediately/Handler/IamRole",
            "uniqueId": "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_73E2E21E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testreturnsaftersometimewaiting_Handler_IamRolePolicy_EE9D505F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns after some time waiting/Handler/IamRolePolicy",
            "uniqueId": "undefined_testreturnsaftersometimewaiting_Handler_IamRolePolicy_EE9D505F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testreturnsaftersometimewaiting_Handler_IamRole_FCFBEC84.name}"
      },
      "undefined_testreturnsfalsegoestotimeout_Handler_IamRolePolicy_0C2B73FD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns false goes to timeout/Handler/IamRolePolicy",
            "uniqueId": "undefined_testreturnsfalsegoestotimeout_Handler_IamRolePolicy_0C2B73FD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testreturnsfalsegoestotimeout_Handler_IamRole_32BC910D.name}"
      },
      "undefined_testreturnstrueimmediately_Handler_IamRolePolicy_E46E3ABA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns true immediately/Handler/IamRolePolicy",
            "uniqueId": "undefined_testreturnstrueimmediately_Handler_IamRolePolicy_E46E3ABA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testreturnstrueimmediately_Handler_IamRole_FC47958B.name}"
      },
      "undefined_testsettingprops_Handler_IamRolePolicy_CD3FCDBF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setting props/Handler/IamRolePolicy",
            "uniqueId": "undefined_testsettingprops_Handler_IamRolePolicy_CD3FCDBF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testsettingprops_Handler_IamRole_0463F11A.name}"
      },
      "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicy_83E25A34": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:throwing exception from predicate should throw immediately/Handler/IamRolePolicy",
            "uniqueId": "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicy_83E25A34"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_73E2E21E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testreturnsaftersometimewaiting_Handler_IamRolePolicyAttachment_18CF0D9F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns after some time waiting/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testreturnsaftersometimewaiting_Handler_IamRolePolicyAttachment_18CF0D9F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testreturnsaftersometimewaiting_Handler_IamRole_FCFBEC84.name}"
      },
      "undefined_testreturnsfalsegoestotimeout_Handler_IamRolePolicyAttachment_BFBB3111": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns false goes to timeout/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testreturnsfalsegoestotimeout_Handler_IamRolePolicyAttachment_BFBB3111"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testreturnsfalsegoestotimeout_Handler_IamRole_32BC910D.name}"
      },
      "undefined_testreturnstrueimmediately_Handler_IamRolePolicyAttachment_B7C0B834": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns true immediately/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testreturnstrueimmediately_Handler_IamRolePolicyAttachment_B7C0B834"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testreturnstrueimmediately_Handler_IamRole_FC47958B.name}"
      },
      "undefined_testsettingprops_Handler_IamRolePolicyAttachment_9E62BFAA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setting props/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testsettingprops_Handler_IamRolePolicyAttachment_9E62BFAA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testsettingprops_Handler_IamRole_0463F11A.name}"
      },
      "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicyAttachment_F57DAEBF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:throwing exception from predicate should throw immediately/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicyAttachment_F57DAEBF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_73E2E21E.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testreturnsaftersometimewaiting_Handler_66D275C9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns after some time waiting/Handler/Default",
            "uniqueId": "undefined_testreturnsaftersometimewaiting_Handler_66D275C9"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8549b09",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8549b09",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testreturnsaftersometimewaiting_Handler_IamRole_FCFBEC84.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testreturnsaftersometimewaiting_Handler_S3Object_0708C26C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testreturnsfalsegoestotimeout_Handler_3B3701C8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns false goes to timeout/Handler/Default",
            "uniqueId": "undefined_testreturnsfalsegoestotimeout_Handler_3B3701C8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e9b68f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e9b68f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testreturnsfalsegoestotimeout_Handler_IamRole_32BC910D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testreturnsfalsegoestotimeout_Handler_S3Object_C26E759D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testreturnstrueimmediately_Handler_4AEC14D1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns true immediately/Handler/Default",
            "uniqueId": "undefined_testreturnstrueimmediately_Handler_4AEC14D1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8ddaa58",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ddaa58",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testreturnstrueimmediately_Handler_IamRole_FC47958B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testreturnstrueimmediately_Handler_S3Object_73007067.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testsettingprops_Handler_5965F2FF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setting props/Handler/Default",
            "uniqueId": "undefined_testsettingprops_Handler_5965F2FF"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8c0a1bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c0a1bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testsettingprops_Handler_IamRole_0463F11A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testsettingprops_Handler_S3Object_0C6A8A7C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_A99325B8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:throwing exception from predicate should throw immediately/Handler/Default",
            "uniqueId": "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_A99325B8"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c87f7908",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87f7908",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_73E2E21E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_C14371B2.key}",
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
      "undefined_testreturnsaftersometimewaiting_Handler_S3Object_0708C26C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns after some time waiting/Handler/S3Object",
            "uniqueId": "undefined_testreturnsaftersometimewaiting_Handler_S3Object_0708C26C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testreturnsfalsegoestotimeout_Handler_S3Object_C26E759D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns false goes to timeout/Handler/S3Object",
            "uniqueId": "undefined_testreturnsfalsegoestotimeout_Handler_S3Object_C26E759D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testreturnstrueimmediately_Handler_S3Object_73007067": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:returns true immediately/Handler/S3Object",
            "uniqueId": "undefined_testreturnstrueimmediately_Handler_S3Object_73007067"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testsettingprops_Handler_S3Object_0C6A8A7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setting props/Handler/S3Object",
            "uniqueId": "undefined_testsettingprops_Handler_S3Object_0C6A8A7C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_C14371B2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:throwing exception from predicate should throw immediately/Handler/S3Object",
            "uniqueId": "undefined_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_C14371B2"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("getTime", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.JSHelper.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const JSHelperClient = ${JSHelper._toInflightType(this).text};
            const client = new JSHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $util_Util: ${context._lift(util.Util)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(JSHelper, host, ["getTime"]);
        }
        super._registerBind(host, ops);
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
            $JSHelper: ${context._lift(JSHelper)},
            $oneSecond: ${context._lift(oneSecond)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure2._registerBindObject(JSHelper, host, ["getTime"]);
          $Closure2._registerBindObject(oneSecond, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $invokeCounter: ${context._lift(invokeCounter)},
            $oneSecond: ${context._lift(oneSecond)},
            $util_Util: ${context._lift(util.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({
            $JSHelper: ${context._lift(JSHelper)},
            $fiveSeconds: ${context._lift(fiveSeconds)},
            $invokeCounter: ${context._lift(invokeCounter)},
            $oneSecond: ${context._lift(oneSecond)},
            $util_Util: ${context._lift(util.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure5.js")({
            $invokeCounter: ${context._lift(invokeCounter)},
            $util_Util: ${context._lift(util.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this).text};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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


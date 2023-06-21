# [wait-until.w](../../../../../../examples/tests/sdk_tests/util/wait-until.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ JSHelper, util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const start = (await JSHelper.getTime());
      if ((await util_Util.waitUntil(async () =>  {
        return true;
      }
      ))) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(((await JSHelper.getTime()) - start) < 1000)'`)})((((await JSHelper.getTime()) - start) < 1000))};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ oneSecond, JSHelper, util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const start = (await JSHelper.getTime());
      if ((await util_Util.waitUntil(async () =>  {
        return false;
      }
      ,{ timeout: oneSecond }))) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(((await JSHelper.getTime()) - start) > (1 * 1000))'`)})((((await JSHelper.getTime()) - start) > (1 * 1000)))};
      }
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ invokeCounter, oneSecond, JSHelper, util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const start = (await JSHelper.getTime());
      const returnTrueAfter3Seconds = async () =>  {
        (await invokeCounter.inc());
        return (((await JSHelper.getTime()) - start) > (3 * 1000));
      }
      ;
      if ((await util_Util.waitUntil(returnTrueAfter3Seconds,{ interval: oneSecond }))) {
        const invocations = (await invokeCounter.peek());
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((invocations > 1) && (invocations < 10))'`)})(((invocations > 1) && (invocations < 10)))};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ invokeCounter, oneSecond, fiveSeconds, JSHelper, util_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const start = (await JSHelper.getTime());
      const returnFalse = async () =>  {
        (await invokeCounter.inc());
        return false;
      }
      ;
      if ((await util_Util.waitUntil(returnFalse,{ interval: oneSecond, timeout: fiveSeconds }))) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
      else {
        const invokeCount = (await invokeCounter.peek());
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((invokeCount > 3) && (invokeCount < 7))'`)})(((invokeCount > 3) && (invokeCount < 7)))};
      }
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({ invokeCounter, util_Util }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      try {
        (await util_Util.waitUntil(async () =>  {
          (await invokeCounter.inc());
          {((msg) => {throw new Error(msg)})("ERROR")};
        }
        ));
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
      catch {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await invokeCounter.peek()) === 1)'`)})(((await invokeCounter.peek()) === 1))};
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
    async $inflight_init()  {
    }
    static async getTime()  {
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
      "value": "[[\"root/Default/Default/test:returns true immediately\",\"${aws_lambda_function.root_testreturnstrueimmediately_Handler_962CBEF8.arn}\"],[\"root/Default/Default/test:returns false goes to timeout\",\"${aws_lambda_function.root_testreturnsfalsegoestotimeout_Handler_FAD74A50.arn}\"],[\"root/Default/Default/test:returns after some time waiting\",\"${aws_lambda_function.root_testreturnsaftersometimewaiting_Handler_841F8A7C.arn}\"],[\"root/Default/Default/test:setting props\",\"${aws_lambda_function.root_testsettingprops_Handler_999FF97B.arn}\"],[\"root/Default/Default/test:throwing exception from predicate should throw immediately\",\"${aws_lambda_function.root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_5D10926A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
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
      "root_testreturnsaftersometimewaiting_Handler_IamRole_C8402523": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/IamRole",
            "uniqueId": "root_testreturnsaftersometimewaiting_Handler_IamRole_C8402523"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testreturnsfalsegoestotimeout_Handler_IamRole_B72AF0BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/IamRole",
            "uniqueId": "root_testreturnsfalsegoestotimeout_Handler_IamRole_B72AF0BC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testreturnstrueimmediately_Handler_IamRole_8EB3045D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/IamRole",
            "uniqueId": "root_testreturnstrueimmediately_Handler_IamRole_8EB3045D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testsettingprops_Handler_IamRole_0F23FB18": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/IamRole",
            "uniqueId": "root_testsettingprops_Handler_IamRole_0F23FB18"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_F73F02AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/IamRole",
            "uniqueId": "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_F73F02AC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testreturnsaftersometimewaiting_Handler_IamRolePolicy_7C85A8AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/IamRolePolicy",
            "uniqueId": "root_testreturnsaftersometimewaiting_Handler_IamRolePolicy_7C85A8AA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testreturnsaftersometimewaiting_Handler_IamRole_C8402523.name}"
      },
      "root_testreturnsfalsegoestotimeout_Handler_IamRolePolicy_EB1C9370": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/IamRolePolicy",
            "uniqueId": "root_testreturnsfalsegoestotimeout_Handler_IamRolePolicy_EB1C9370"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testreturnsfalsegoestotimeout_Handler_IamRole_B72AF0BC.name}"
      },
      "root_testreturnstrueimmediately_Handler_IamRolePolicy_F5736D4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/IamRolePolicy",
            "uniqueId": "root_testreturnstrueimmediately_Handler_IamRolePolicy_F5736D4E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testreturnstrueimmediately_Handler_IamRole_8EB3045D.name}"
      },
      "root_testsettingprops_Handler_IamRolePolicy_89F4FB12": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/IamRolePolicy",
            "uniqueId": "root_testsettingprops_Handler_IamRolePolicy_89F4FB12"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testsettingprops_Handler_IamRole_0F23FB18.name}"
      },
      "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicy_839E1CD3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/IamRolePolicy",
            "uniqueId": "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicy_839E1CD3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_F73F02AC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testreturnsaftersometimewaiting_Handler_IamRolePolicyAttachment_4AA5D580": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testreturnsaftersometimewaiting_Handler_IamRolePolicyAttachment_4AA5D580"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testreturnsaftersometimewaiting_Handler_IamRole_C8402523.name}"
      },
      "root_testreturnsfalsegoestotimeout_Handler_IamRolePolicyAttachment_E4CEA709": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testreturnsfalsegoestotimeout_Handler_IamRolePolicyAttachment_E4CEA709"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testreturnsfalsegoestotimeout_Handler_IamRole_B72AF0BC.name}"
      },
      "root_testreturnstrueimmediately_Handler_IamRolePolicyAttachment_B7B4C8AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testreturnstrueimmediately_Handler_IamRolePolicyAttachment_B7B4C8AB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testreturnstrueimmediately_Handler_IamRole_8EB3045D.name}"
      },
      "root_testsettingprops_Handler_IamRolePolicyAttachment_A832C898": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsettingprops_Handler_IamRolePolicyAttachment_A832C898"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsettingprops_Handler_IamRole_0F23FB18.name}"
      },
      "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicyAttachment_199AAD62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRolePolicyAttachment_199AAD62"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_F73F02AC.name}"
      }
    },
    "aws_lambda_function": {
      "root_testreturnsaftersometimewaiting_Handler_841F8A7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/Default",
            "uniqueId": "root_testreturnsaftersometimewaiting_Handler_841F8A7C"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c825136f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c825136f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testreturnsaftersometimewaiting_Handler_IamRole_C8402523.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testreturnsaftersometimewaiting_Handler_S3Object_96239004.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testreturnsfalsegoestotimeout_Handler_FAD74A50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/Default",
            "uniqueId": "root_testreturnsfalsegoestotimeout_Handler_FAD74A50"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c857ac6d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c857ac6d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testreturnsfalsegoestotimeout_Handler_IamRole_B72AF0BC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testreturnsfalsegoestotimeout_Handler_S3Object_B707877F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testreturnstrueimmediately_Handler_962CBEF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/Default",
            "uniqueId": "root_testreturnstrueimmediately_Handler_962CBEF8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85e05f6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85e05f6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testreturnstrueimmediately_Handler_IamRole_8EB3045D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testreturnstrueimmediately_Handler_S3Object_7DC76928.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testsettingprops_Handler_999FF97B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/Default",
            "uniqueId": "root_testsettingprops_Handler_999FF97B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8da809f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8da809f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsettingprops_Handler_IamRole_0F23FB18.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsettingprops_Handler_S3Object_09D35E71.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_5D10926A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/Default",
            "uniqueId": "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_5D10926A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c8a3878e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a3878e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_IamRole_F73F02AC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_7309A47F.key}",
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
      "root_testreturnsaftersometimewaiting_Handler_S3Object_96239004": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns after some time waiting/Handler/S3Object",
            "uniqueId": "root_testreturnsaftersometimewaiting_Handler_S3Object_96239004"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testreturnsfalsegoestotimeout_Handler_S3Object_B707877F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns false goes to timeout/Handler/S3Object",
            "uniqueId": "root_testreturnsfalsegoestotimeout_Handler_S3Object_B707877F"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testreturnstrueimmediately_Handler_S3Object_7DC76928": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:returns true immediately/Handler/S3Object",
            "uniqueId": "root_testreturnstrueimmediately_Handler_S3Object_7DC76928"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testsettingprops_Handler_S3Object_09D35E71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setting props/Handler/S3Object",
            "uniqueId": "root_testsettingprops_Handler_S3Object_09D35E71"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_7309A47F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:throwing exception from predicate should throw immediately/Handler/S3Object",
            "uniqueId": "root_testthrowingexceptionfrompredicateshouldthrowimmediately_Handler_S3Object_7309A47F"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("getTime");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.JSHelper.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("getTime")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const JSHelperClient = JSHelper._toInflightType(context);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            JSHelper: ${JSHelperClient.text},
            util_Util: ${util_UtilClient.text},
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
          $Closure1._registerBindObject(JSHelper, host, ["getTime"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const oneSecond_client = context._lift(oneSecond);
        const JSHelperClient = JSHelper._toInflightType(context);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            oneSecond: ${oneSecond_client},
            JSHelper: ${JSHelperClient.text},
            util_Util: ${util_UtilClient.text},
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
          $Closure2._registerBindObject(oneSecond, host, []);
        }
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const invokeCounter_client = context._lift(invokeCounter);
        const oneSecond_client = context._lift(oneSecond);
        const JSHelperClient = JSHelper._toInflightType(context);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            invokeCounter: ${invokeCounter_client},
            oneSecond: ${oneSecond_client},
            JSHelper: ${JSHelperClient.text},
            util_Util: ${util_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(invokeCounter, host, []);
          $Closure3._registerBindObject(oneSecond, host, []);
        }
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const invokeCounter_client = context._lift(invokeCounter);
        const oneSecond_client = context._lift(oneSecond);
        const fiveSeconds_client = context._lift(fiveSeconds);
        const JSHelperClient = JSHelper._toInflightType(context);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            invokeCounter: ${invokeCounter_client},
            oneSecond: ${oneSecond_client},
            fiveSeconds: ${fiveSeconds_client},
            JSHelper: ${JSHelperClient.text},
            util_Util: ${util_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure4._registerBindObject(fiveSeconds, host, []);
          $Closure4._registerBindObject(invokeCounter, host, []);
          $Closure4._registerBindObject(oneSecond, host, []);
        }
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure5.js";
        const invokeCounter_client = context._lift(invokeCounter);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            invokeCounter: ${invokeCounter_client},
            util_Util: ${util_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure5._registerBindObject(invokeCounter, host, []);
        }
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(invokeCounter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const invokeCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const oneHundredMiliseconds = $stdlib.std.Duration.fromSeconds(0.1);
    const oneSecond = $stdlib.std.Duration.fromSeconds(1);
    const fiveSeconds = $stdlib.std.Duration.fromSeconds(5);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:returns true immediately",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:returns false goes to timeout",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:returns after some time waiting",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setting props",new $Closure4(this,"$Closure4"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:throwing exception from predicate should throw immediately",new $Closure5(this,"$Closure5"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "wait-until", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


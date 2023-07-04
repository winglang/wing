# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | compile | tf-aws

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
    async handle(key)  {
      {console.log(String.raw({ raw: ["deleted ", ""] }, key))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log(String.raw({ raw: ["updated ", ""] }, key))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log(String.raw({ raw: ["created ", ""] }, key))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ other }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key, event)  {
      (await other.put(String.raw({ raw: ["last_", "_key"] }, event),key));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({  }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log("other bucket event called!")};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({ b }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await b.put("a","1"));
      (await b.put("b","1"));
      (await b.put("b","100"));
      (await b.put("c","1"));
      (await b.delete("c"));
    }
  }
  return $Closure6;
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
      "value": "[[\"root/Default/Default/test:putting and deleting from a bucket to trigger bucket events\",\"${aws_lambda_function.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_31F6B48C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "b_b-on_create-OnMessage-5f62bd7c_IamRole_9A76DD16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/IamRole",
            "uniqueId": "b_b-on_create-OnMessage-5f62bd7c_IamRole_9A76DD16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-on_create-OnMessage-aef3f85d_IamRole_15C5A67F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/IamRole",
            "uniqueId": "b_b-on_create-OnMessage-aef3f85d_IamRole_15C5A67F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-on_delete-OnMessage-1c41a2ad_IamRole_9098CC63": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/IamRole",
            "uniqueId": "b_b-on_delete-OnMessage-1c41a2ad_IamRole_9098CC63"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-on_delete-OnMessage-85baa474_IamRole_AF99ADD3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/IamRole",
            "uniqueId": "b_b-on_delete-OnMessage-85baa474_IamRole_AF99ADD3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-on_update-OnMessage-3ed6033f_IamRole_86BF6BCD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/IamRole",
            "uniqueId": "b_b-on_update-OnMessage-3ed6033f_IamRole_86BF6BCD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-on_update-OnMessage-d39e959f_IamRole_B0CC974C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/IamRole",
            "uniqueId": "b_b-on_update-OnMessage-d39e959f_IamRole_B0CC974C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-on_create-OnMessage-0af389c6_IamRole_787C10EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/IamRole",
            "uniqueId": "other_other-on_create-OnMessage-0af389c6_IamRole_787C10EF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-on_delete-OnMessage-5e9bc889_IamRole_E13A811E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/IamRole",
            "uniqueId": "other_other-on_delete-OnMessage-5e9bc889_IamRole_E13A811E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-on_update-OnMessage-5290616b_IamRole_D28EA98B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/IamRole",
            "uniqueId": "other_other-on_update-OnMessage-5290616b_IamRole_D28EA98B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRole",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "b_b-on_create-OnMessage-5f62bd7c_IamRolePolicy_44DF80BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/IamRolePolicy",
            "uniqueId": "b_b-on_create-OnMessage-5f62bd7c_IamRolePolicy_44DF80BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-on_create-OnMessage-5f62bd7c_IamRole_9A76DD16.name}"
      },
      "b_b-on_create-OnMessage-aef3f85d_IamRolePolicy_52F8EA17": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/IamRolePolicy",
            "uniqueId": "b_b-on_create-OnMessage-aef3f85d_IamRolePolicy_52F8EA17"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-on_create-OnMessage-aef3f85d_IamRole_15C5A67F.name}"
      },
      "b_b-on_delete-OnMessage-1c41a2ad_IamRolePolicy_C748BFB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/IamRolePolicy",
            "uniqueId": "b_b-on_delete-OnMessage-1c41a2ad_IamRolePolicy_C748BFB2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-on_delete-OnMessage-1c41a2ad_IamRole_9098CC63.name}"
      },
      "b_b-on_delete-OnMessage-85baa474_IamRolePolicy_B3163C35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/IamRolePolicy",
            "uniqueId": "b_b-on_delete-OnMessage-85baa474_IamRolePolicy_B3163C35"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-on_delete-OnMessage-85baa474_IamRole_AF99ADD3.name}"
      },
      "b_b-on_update-OnMessage-3ed6033f_IamRolePolicy_04C677B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/IamRolePolicy",
            "uniqueId": "b_b-on_update-OnMessage-3ed6033f_IamRolePolicy_04C677B2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-on_update-OnMessage-3ed6033f_IamRole_86BF6BCD.name}"
      },
      "b_b-on_update-OnMessage-d39e959f_IamRolePolicy_63B64DF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/IamRolePolicy",
            "uniqueId": "b_b-on_update-OnMessage-d39e959f_IamRolePolicy_63B64DF3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-on_update-OnMessage-d39e959f_IamRole_B0CC974C.name}"
      },
      "other_other-on_create-OnMessage-0af389c6_IamRolePolicy_921B8561": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/IamRolePolicy",
            "uniqueId": "other_other-on_create-OnMessage-0af389c6_IamRolePolicy_921B8561"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-on_create-OnMessage-0af389c6_IamRole_787C10EF.name}"
      },
      "other_other-on_delete-OnMessage-5e9bc889_IamRolePolicy_FB7E5215": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/IamRolePolicy",
            "uniqueId": "other_other-on_delete-OnMessage-5e9bc889_IamRolePolicy_FB7E5215"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-on_delete-OnMessage-5e9bc889_IamRole_E13A811E.name}"
      },
      "other_other-on_update-OnMessage-5290616b_IamRolePolicy_18513113": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/IamRolePolicy",
            "uniqueId": "other_other-on_update-OnMessage-5290616b_IamRolePolicy_18513113"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-on_update-OnMessage-5290616b_IamRole_D28EA98B.name}"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicy_4BAD9EF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRolePolicy",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicy_4BAD9EF3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.b.arn}\",\"${aws_s3_bucket.b.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "b_b-on_create-OnMessage-5f62bd7c_IamRolePolicyAttachment_5B82D718": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/IamRolePolicyAttachment",
            "uniqueId": "b_b-on_create-OnMessage-5f62bd7c_IamRolePolicyAttachment_5B82D718"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-on_create-OnMessage-5f62bd7c_IamRole_9A76DD16.name}"
      },
      "b_b-on_create-OnMessage-aef3f85d_IamRolePolicyAttachment_61BEF998": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/IamRolePolicyAttachment",
            "uniqueId": "b_b-on_create-OnMessage-aef3f85d_IamRolePolicyAttachment_61BEF998"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-on_create-OnMessage-aef3f85d_IamRole_15C5A67F.name}"
      },
      "b_b-on_delete-OnMessage-1c41a2ad_IamRolePolicyAttachment_CCF0EB05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/IamRolePolicyAttachment",
            "uniqueId": "b_b-on_delete-OnMessage-1c41a2ad_IamRolePolicyAttachment_CCF0EB05"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-on_delete-OnMessage-1c41a2ad_IamRole_9098CC63.name}"
      },
      "b_b-on_delete-OnMessage-85baa474_IamRolePolicyAttachment_1E5E64C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/IamRolePolicyAttachment",
            "uniqueId": "b_b-on_delete-OnMessage-85baa474_IamRolePolicyAttachment_1E5E64C9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-on_delete-OnMessage-85baa474_IamRole_AF99ADD3.name}"
      },
      "b_b-on_update-OnMessage-3ed6033f_IamRolePolicyAttachment_55587500": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/IamRolePolicyAttachment",
            "uniqueId": "b_b-on_update-OnMessage-3ed6033f_IamRolePolicyAttachment_55587500"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-on_update-OnMessage-3ed6033f_IamRole_86BF6BCD.name}"
      },
      "b_b-on_update-OnMessage-d39e959f_IamRolePolicyAttachment_E30D3F3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/IamRolePolicyAttachment",
            "uniqueId": "b_b-on_update-OnMessage-d39e959f_IamRolePolicyAttachment_E30D3F3F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-on_update-OnMessage-d39e959f_IamRole_B0CC974C.name}"
      },
      "other_other-on_create-OnMessage-0af389c6_IamRolePolicyAttachment_AA13AC90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/IamRolePolicyAttachment",
            "uniqueId": "other_other-on_create-OnMessage-0af389c6_IamRolePolicyAttachment_AA13AC90"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-on_create-OnMessage-0af389c6_IamRole_787C10EF.name}"
      },
      "other_other-on_delete-OnMessage-5e9bc889_IamRolePolicyAttachment_6469EDAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/IamRolePolicyAttachment",
            "uniqueId": "other_other-on_delete-OnMessage-5e9bc889_IamRolePolicyAttachment_6469EDAA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-on_delete-OnMessage-5e9bc889_IamRole_E13A811E.name}"
      },
      "other_other-on_update-OnMessage-5290616b_IamRolePolicyAttachment_04E6BC42": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/IamRolePolicyAttachment",
            "uniqueId": "other_other-on_update-OnMessage-5290616b_IamRolePolicyAttachment_04E6BC42"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-on_update-OnMessage-5290616b_IamRole_D28EA98B.name}"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicyAttachment_2DB05AD7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRolePolicyAttachment",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicyAttachment_2DB05AD7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456.name}"
      }
    },
    "aws_lambda_function": {
      "b_b-on_create-OnMessage-5f62bd7c_38F80D99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/Default",
            "uniqueId": "b_b-on_create-OnMessage-5f62bd7c_38F80D99"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-5f62bd7c-c881be6f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_create-OnMessage-5f62bd7c-c881be6f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-on_create-OnMessage-5f62bd7c_IamRole_9A76DD16.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-on_create-OnMessage-5f62bd7c_S3Object_B7DA9DD6.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-on_create-OnMessage-aef3f85d_13DE25F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/Default",
            "uniqueId": "b_b-on_create-OnMessage-aef3f85d_13DE25F3"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-aef3f85d-c8d1e844",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_create-OnMessage-aef3f85d-c8d1e844",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-on_create-OnMessage-aef3f85d_IamRole_15C5A67F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-on_create-OnMessage-aef3f85d_S3Object_000601D1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-on_delete-OnMessage-1c41a2ad_B7B3278B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/Default",
            "uniqueId": "b_b-on_delete-OnMessage-1c41a2ad_B7B3278B"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-1c41a2ad-c87344ee",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_delete-OnMessage-1c41a2ad-c87344ee",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-on_delete-OnMessage-1c41a2ad_IamRole_9098CC63.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-on_delete-OnMessage-1c41a2ad_S3Object_DA3DDE14.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-on_delete-OnMessage-85baa474_BC89847D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/Default",
            "uniqueId": "b_b-on_delete-OnMessage-85baa474_BC89847D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-85baa474-c8dee1ac",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_delete-OnMessage-85baa474-c8dee1ac",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-on_delete-OnMessage-85baa474_IamRole_AF99ADD3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-on_delete-OnMessage-85baa474_S3Object_5998C816.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-on_update-OnMessage-3ed6033f_B0A46994": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/Default",
            "uniqueId": "b_b-on_update-OnMessage-3ed6033f_B0A46994"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-3ed6033f-c8b563a2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_update-OnMessage-3ed6033f-c8b563a2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-on_update-OnMessage-3ed6033f_IamRole_86BF6BCD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-on_update-OnMessage-3ed6033f_S3Object_8784640F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-on_update-OnMessage-d39e959f_6E32DE1C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/Default",
            "uniqueId": "b_b-on_update-OnMessage-d39e959f_6E32DE1C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-d39e959f-c86e3f27",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_update-OnMessage-d39e959f-c86e3f27",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-on_update-OnMessage-d39e959f_IamRole_B0CC974C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-on_update-OnMessage-d39e959f_S3Object_300AC20D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-on_create-OnMessage-0af389c6_1EE78D26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/Default",
            "uniqueId": "other_other-on_create-OnMessage-0af389c6_1EE78D26"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-on_create-OnMessage-0af389c6-c8b7358b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-on_create-OnMessage-0af389c6-c8b7358b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-on_create-OnMessage-0af389c6_IamRole_787C10EF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-on_create-OnMessage-0af389c6_S3Object_63B817AD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-on_delete-OnMessage-5e9bc889_A58EA780": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/Default",
            "uniqueId": "other_other-on_delete-OnMessage-5e9bc889_A58EA780"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-on_delete-OnMessage-5e9bc889-c86905e5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-on_delete-OnMessage-5e9bc889-c86905e5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-on_delete-OnMessage-5e9bc889_IamRole_E13A811E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-on_delete-OnMessage-5e9bc889_S3Object_85E4E05A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-on_update-OnMessage-5290616b_923388A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/Default",
            "uniqueId": "other_other-on_update-OnMessage-5290616b_923388A0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-on_update-OnMessage-5290616b-c8d3d672",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-on_update-OnMessage-5290616b-c8d3d672",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-on_update-OnMessage-5290616b_IamRole_D28EA98B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-on_update-OnMessage-5290616b_S3Object_B889CC50.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_31F6B48C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/Default",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_31F6B48C"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_34279ead": "${aws_s3_bucket.b.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8457446",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8457446",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_B00A26B2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "b_b-on_create-OnMessage-5f62bd7c_InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c_03B3ED59": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c",
            "uniqueId": "b_b-on_create-OnMessage-5f62bd7c_InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c_03B3ED59"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-on_create-OnMessage-5f62bd7c_38F80D99.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-on_create_624B99B5.arn}"
      },
      "b_b-on_create-OnMessage-aef3f85d_InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c_B3442311": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c",
            "uniqueId": "b_b-on_create-OnMessage-aef3f85d_InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c_B3442311"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-on_create-OnMessage-aef3f85d_13DE25F3.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-on_create_624B99B5.arn}"
      },
      "b_b-on_delete-OnMessage-1c41a2ad_InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01_CB1C1BD1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01",
            "uniqueId": "b_b-on_delete-OnMessage-1c41a2ad_InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01_CB1C1BD1"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-on_delete-OnMessage-1c41a2ad_B7B3278B.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}"
      },
      "b_b-on_delete-OnMessage-85baa474_InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01_C1EBC685": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01",
            "uniqueId": "b_b-on_delete-OnMessage-85baa474_InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01_C1EBC685"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-on_delete-OnMessage-85baa474_BC89847D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}"
      },
      "b_b-on_update-OnMessage-3ed6033f_InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f_A0816246": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f",
            "uniqueId": "b_b-on_update-OnMessage-3ed6033f_InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f_A0816246"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-on_update-OnMessage-3ed6033f_B0A46994.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-on_update_D9B22749.arn}"
      },
      "b_b-on_update-OnMessage-d39e959f_InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f_99A7CD64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f",
            "uniqueId": "b_b-on_update-OnMessage-d39e959f_InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f_99A7CD64"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-on_update-OnMessage-d39e959f_6E32DE1C.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-on_update_D9B22749.arn}"
      },
      "other_other-on_create-OnMessage-0af389c6_InvokePermission-c89c79376e17b283a7d691aa1bda7fc8588302362f_9AAA9102": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/InvokePermission-c89c79376e17b283a7d691aa1bda7fc8588302362f",
            "uniqueId": "other_other-on_create-OnMessage-0af389c6_InvokePermission-c89c79376e17b283a7d691aa1bda7fc8588302362f_9AAA9102"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-on_create-OnMessage-0af389c6_1EE78D26.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-on_create_F8EFCB58.arn}"
      },
      "other_other-on_delete-OnMessage-5e9bc889_InvokePermission-c861917e84992c81ed683a3edeae66ebc879e0682a_3F6AFC16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/InvokePermission-c861917e84992c81ed683a3edeae66ebc879e0682a",
            "uniqueId": "other_other-on_delete-OnMessage-5e9bc889_InvokePermission-c861917e84992c81ed683a3edeae66ebc879e0682a_3F6AFC16"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-on_delete-OnMessage-5e9bc889_A58EA780.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-on_delete_BB67CC72.arn}"
      },
      "other_other-on_update-OnMessage-5290616b_InvokePermission-c8f0227611913f709ca5218e4a4dd4cb2475593882_4D60150A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/InvokePermission-c8f0227611913f709ca5218e4a4dd4cb2475593882",
            "uniqueId": "other_other-on_update-OnMessage-5290616b_InvokePermission-c8f0227611913f709ca5218e4a4dd4cb2475593882_4D60150A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-on_update-OnMessage-5290616b_923388A0.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-on_update_389364BA.arn}"
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
      },
      "b": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/Default",
            "uniqueId": "b"
          }
        },
        "bucket_prefix": "b-c81aa40d-",
        "force_destroy": false
      },
      "other": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/Default",
            "uniqueId": "other"
          }
        },
        "bucket_prefix": "other-c87420a2-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "b_S3BucketNotification_B678FA1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/S3BucketNotification",
            "uniqueId": "b_S3BucketNotification_B678FA1E"
          }
        },
        "bucket": "${aws_s3_bucket.b.id}",
        "depends_on": [
          "aws_sns_topic_policy.b_b-on_delete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_9837676E",
          "aws_sns_topic_policy.b_b-on_update_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_1CF3029D",
          "aws_sns_topic_policy.b_b-on_create_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_1B28315C"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.b_b-on_update_D9B22749.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.b_b-on_create_624B99B5.arn}"
          }
        ]
      },
      "other_S3BucketNotification_DA1F0EC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/S3BucketNotification",
            "uniqueId": "other_S3BucketNotification_DA1F0EC0"
          }
        },
        "bucket": "${aws_s3_bucket.other.id}",
        "depends_on": [
          "aws_sns_topic_policy.other_other-on_create_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_32BB81FE",
          "aws_sns_topic_policy.other_other-on_update_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_B3BCF940",
          "aws_sns_topic_policy.other_other-on_delete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_D13943D7"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.other_other-on_create_F8EFCB58.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.other_other-on_update_389364BA.arn}"
          },
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.other_other-on_delete_BB67CC72.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "b_PublicAccessBlock_D351EBD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/PublicAccessBlock",
            "uniqueId": "b_PublicAccessBlock_D351EBD6"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.b.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "other_PublicAccessBlock_6FF8D942": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/PublicAccessBlock",
            "uniqueId": "other_PublicAccessBlock_6FF8D942"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.other.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "b_Encryption_AF1DCBD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/Encryption",
            "uniqueId": "b_Encryption_AF1DCBD9"
          }
        },
        "bucket": "${aws_s3_bucket.b.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "other_Encryption_D901EDA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/Encryption",
            "uniqueId": "other_Encryption_D901EDA1"
          }
        },
        "bucket": "${aws_s3_bucket.other.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "b_b-on_create-OnMessage-5f62bd7c_S3Object_B7DA9DD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/S3Object",
            "uniqueId": "b_b-on_create-OnMessage-5f62bd7c_S3Object_B7DA9DD6"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-on_create-OnMessage-aef3f85d_S3Object_000601D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/S3Object",
            "uniqueId": "b_b-on_create-OnMessage-aef3f85d_S3Object_000601D1"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-on_delete-OnMessage-1c41a2ad_S3Object_DA3DDE14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/S3Object",
            "uniqueId": "b_b-on_delete-OnMessage-1c41a2ad_S3Object_DA3DDE14"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-on_delete-OnMessage-85baa474_S3Object_5998C816": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/S3Object",
            "uniqueId": "b_b-on_delete-OnMessage-85baa474_S3Object_5998C816"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-on_update-OnMessage-3ed6033f_S3Object_8784640F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/S3Object",
            "uniqueId": "b_b-on_update-OnMessage-3ed6033f_S3Object_8784640F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-on_update-OnMessage-d39e959f_S3Object_300AC20D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/S3Object",
            "uniqueId": "b_b-on_update-OnMessage-d39e959f_S3Object_300AC20D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-on_create-OnMessage-0af389c6_S3Object_63B817AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/S3Object",
            "uniqueId": "other_other-on_create-OnMessage-0af389c6_S3Object_63B817AD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-on_delete-OnMessage-5e9bc889_S3Object_85E4E05A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/S3Object",
            "uniqueId": "other_other-on_delete-OnMessage-5e9bc889_S3Object_85E4E05A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-on_update-OnMessage-5290616b_S3Object_B889CC50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/S3Object",
            "uniqueId": "other_other-on_update-OnMessage-5290616b_S3Object_B889CC50"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_B00A26B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/S3Object",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_B00A26B2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "b_b-on_create_624B99B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/Default",
            "uniqueId": "b_b-on_create_624B99B5"
          }
        },
        "name": "b-on_create-c8c7ecaf"
      },
      "b_b-on_delete_6DFE0D85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/Default",
            "uniqueId": "b_b-on_delete_6DFE0D85"
          }
        },
        "name": "b-on_delete-c8f3ce18"
      },
      "b_b-on_update_D9B22749": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/Default",
            "uniqueId": "b_b-on_update_D9B22749"
          }
        },
        "name": "b-on_update-c8d765d0"
      },
      "other_other-on_create_F8EFCB58": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/Default",
            "uniqueId": "other_other-on_create_F8EFCB58"
          }
        },
        "name": "other-on_create-c89c7937"
      },
      "other_other-on_delete_BB67CC72": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/Default",
            "uniqueId": "other_other-on_delete_BB67CC72"
          }
        },
        "name": "other-on_delete-c861917e"
      },
      "other_other-on_update_389364BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/Default",
            "uniqueId": "other_other-on_update_389364BA"
          }
        },
        "name": "other-on_update-c8f02276"
      }
    },
    "aws_sns_topic_policy": {
      "b_b-on_create_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_1B28315C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-on_create_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_1B28315C"
          }
        },
        "arn": "${aws_sns_topic.b_b-on_create_624B99B5.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-on_create_624B99B5.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "b_b-on_delete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_9837676E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-on_delete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_9837676E"
          }
        },
        "arn": "${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "b_b-on_update_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_1CF3029D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-on_update_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_1CF3029D"
          }
        },
        "arn": "${aws_sns_topic.b_b-on_update_D9B22749.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-on_update_D9B22749.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "other_other-on_create_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_32BB81FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-on_create_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_32BB81FE"
          }
        },
        "arn": "${aws_sns_topic.other_other-on_create_F8EFCB58.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-on_create_F8EFCB58.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      },
      "other_other-on_delete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_D13943D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-on_delete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_D13943D7"
          }
        },
        "arn": "${aws_sns_topic.other_other-on_delete_BB67CC72.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-on_delete_BB67CC72.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      },
      "other_other-on_update_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_B3BCF940": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-on_update_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_B3BCF940"
          }
        },
        "arn": "${aws_sns_topic.other_other-on_update_389364BA.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-on_update_389364BA.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "b_b-on_create_b-on_create-TopicSubscription-5f62bd7c_EFBAFF9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/b-on_create-TopicSubscription-5f62bd7c",
            "uniqueId": "b_b-on_create_b-on_create-TopicSubscription-5f62bd7c_EFBAFF9C"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-on_create-OnMessage-5f62bd7c_38F80D99.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-on_create_624B99B5.arn}"
      },
      "b_b-on_create_b-on_create-TopicSubscription-aef3f85d_A9518A51": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/b-on_create-TopicSubscription-aef3f85d",
            "uniqueId": "b_b-on_create_b-on_create-TopicSubscription-aef3f85d_A9518A51"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-on_create-OnMessage-aef3f85d_13DE25F3.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-on_create_624B99B5.arn}"
      },
      "b_b-on_delete_b-on_delete-TopicSubscription-1c41a2ad_5EF27562": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/b-on_delete-TopicSubscription-1c41a2ad",
            "uniqueId": "b_b-on_delete_b-on_delete-TopicSubscription-1c41a2ad_5EF27562"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-on_delete-OnMessage-1c41a2ad_B7B3278B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}"
      },
      "b_b-on_delete_b-on_delete-TopicSubscription-85baa474_63792E15": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/b-on_delete-TopicSubscription-85baa474",
            "uniqueId": "b_b-on_delete_b-on_delete-TopicSubscription-85baa474_63792E15"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-on_delete-OnMessage-85baa474_BC89847D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-on_delete_6DFE0D85.arn}"
      },
      "b_b-on_update_b-on_update-TopicSubscription-3ed6033f_56E1D0F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/b-on_update-TopicSubscription-3ed6033f",
            "uniqueId": "b_b-on_update_b-on_update-TopicSubscription-3ed6033f_56E1D0F8"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-on_update-OnMessage-3ed6033f_B0A46994.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-on_update_D9B22749.arn}"
      },
      "b_b-on_update_b-on_update-TopicSubscription-d39e959f_6066B557": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/b-on_update-TopicSubscription-d39e959f",
            "uniqueId": "b_b-on_update_b-on_update-TopicSubscription-d39e959f_6066B557"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-on_update-OnMessage-d39e959f_6E32DE1C.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-on_update_D9B22749.arn}"
      },
      "other_other-on_create_other-on_create-TopicSubscription-0af389c6_3E1661F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/other-on_create-TopicSubscription-0af389c6",
            "uniqueId": "other_other-on_create_other-on_create-TopicSubscription-0af389c6_3E1661F4"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-on_create-OnMessage-0af389c6_1EE78D26.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-on_create_F8EFCB58.arn}"
      },
      "other_other-on_delete_other-on_delete-TopicSubscription-5e9bc889_C1680968": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/other-on_delete-TopicSubscription-5e9bc889",
            "uniqueId": "other_other-on_delete_other-on_delete-TopicSubscription-5e9bc889_C1680968"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-on_delete-OnMessage-5e9bc889_A58EA780.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-on_delete_BB67CC72.arn}"
      },
      "other_other-on_update_other-on_update-TopicSubscription-5290616b_BF6D8BE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/other-on_update-TopicSubscription-5290616b",
            "uniqueId": "other_other-on_update_other-on_update-TopicSubscription-5290616b_BF6D8BE1"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-on_update-OnMessage-5290616b_923388A0.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-on_update_389364BA.arn}"
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const other_client = context._lift(other);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            other: ${other_client},
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
          $Closure4._registerBindObject(other, host, []);
        }
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(other, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure5.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure6.js";
        const b_client = context._lift(b);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            b: ${b_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this).text};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure6._registerBindObject(b, host, []);
        }
        if (ops.includes("handle")) {
          $Closure6._registerBindObject(b, host, ["delete", "put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const other = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"other");
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b");
    (b.onDelete(new $Closure1(this,"$Closure1")));
    (b.onUpdate(new $Closure2(this,"$Closure2")));
    (b.onCreate(new $Closure3(this,"$Closure3")));
    (b.onEvent(new $Closure4(this,"$Closure4")));
    (other.onEvent(new $Closure5(this,"$Closure5")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:putting and deleting from a bucket to trigger bucket events",new $Closure6(this,"$Closure6"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bucket_events", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


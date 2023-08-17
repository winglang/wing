# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      {console.log(String.raw({ raw: ["deleted ", ""] }, key))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      {console.log(String.raw({ raw: ["updated ", ""] }, key))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      {console.log(String.raw({ raw: ["created ", ""] }, key))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
module.exports = function({ $other }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, event) {
      (await $other.put(String.raw({ raw: ["last_", "_key"] }, event),key));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
module.exports = function({  }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      {console.log("other bucket event called!")};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
module.exports = function({ $b }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("a","1"));
      (await $b.put("b","1"));
      (await $b.put("b","100"));
      (await $b.put("c","1"));
      (await $b.delete("c"));
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
      "b_b-oncreate-OnMessage-1d3b2039_IamRole_BD50D914": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-1d3b2039/IamRole",
            "uniqueId": "b_b-oncreate-OnMessage-1d3b2039_IamRole_BD50D914"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-oncreate-OnMessage-a729fee3_IamRole_C10FE55A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-a729fee3/IamRole",
            "uniqueId": "b_b-oncreate-OnMessage-a729fee3_IamRole_C10FE55A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-ondelete-OnMessage-4b2cd998_IamRole_FCF8E28C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-4b2cd998/IamRole",
            "uniqueId": "b_b-ondelete-OnMessage-4b2cd998_IamRole_FCF8E28C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-ondelete-OnMessage-b83da9f8_IamRole_41A005F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-b83da9f8/IamRole",
            "uniqueId": "b_b-ondelete-OnMessage-b83da9f8_IamRole_41A005F1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-onupdate-OnMessage-2dce4026_IamRole_6035D253": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-2dce4026/IamRole",
            "uniqueId": "b_b-onupdate-OnMessage-2dce4026_IamRole_6035D253"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-onupdate-OnMessage-b03e6c67_IamRole_2771309B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-b03e6c67/IamRole",
            "uniqueId": "b_b-onupdate-OnMessage-b03e6c67_IamRole_2771309B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-oncreate-OnMessage-2b1e14fd_IamRole_E3B1EF60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-2b1e14fd/IamRole",
            "uniqueId": "other_other-oncreate-OnMessage-2b1e14fd_IamRole_E3B1EF60"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-ondelete-OnMessage-9bef38d2_IamRole_005D0A6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-9bef38d2/IamRole",
            "uniqueId": "other_other-ondelete-OnMessage-9bef38d2_IamRole_005D0A6C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-onupdate-OnMessage-bffa2a20_IamRole_EC396E4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-bffa2a20/IamRole",
            "uniqueId": "other_other-onupdate-OnMessage-bffa2a20_IamRole_EC396E4E"
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
      "b_b-oncreate-OnMessage-1d3b2039_IamRolePolicy_F6404795": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-1d3b2039/IamRolePolicy",
            "uniqueId": "b_b-oncreate-OnMessage-1d3b2039_IamRolePolicy_F6404795"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-1d3b2039_IamRole_BD50D914.name}"
      },
      "b_b-oncreate-OnMessage-a729fee3_IamRolePolicy_2ACE3DD8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-a729fee3/IamRolePolicy",
            "uniqueId": "b_b-oncreate-OnMessage-a729fee3_IamRolePolicy_2ACE3DD8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-a729fee3_IamRole_C10FE55A.name}"
      },
      "b_b-ondelete-OnMessage-4b2cd998_IamRolePolicy_D8B37CEC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-4b2cd998/IamRolePolicy",
            "uniqueId": "b_b-ondelete-OnMessage-4b2cd998_IamRolePolicy_D8B37CEC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-4b2cd998_IamRole_FCF8E28C.name}"
      },
      "b_b-ondelete-OnMessage-b83da9f8_IamRolePolicy_98A97C82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-b83da9f8/IamRolePolicy",
            "uniqueId": "b_b-ondelete-OnMessage-b83da9f8_IamRolePolicy_98A97C82"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-b83da9f8_IamRole_41A005F1.name}"
      },
      "b_b-onupdate-OnMessage-2dce4026_IamRolePolicy_DA5B9B83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-2dce4026/IamRolePolicy",
            "uniqueId": "b_b-onupdate-OnMessage-2dce4026_IamRolePolicy_DA5B9B83"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-2dce4026_IamRole_6035D253.name}"
      },
      "b_b-onupdate-OnMessage-b03e6c67_IamRolePolicy_8ADD11AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-b03e6c67/IamRolePolicy",
            "uniqueId": "b_b-onupdate-OnMessage-b03e6c67_IamRolePolicy_8ADD11AA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-b03e6c67_IamRole_2771309B.name}"
      },
      "other_other-oncreate-OnMessage-2b1e14fd_IamRolePolicy_E45A82EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-2b1e14fd/IamRolePolicy",
            "uniqueId": "other_other-oncreate-OnMessage-2b1e14fd_IamRolePolicy_E45A82EE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-oncreate-OnMessage-2b1e14fd_IamRole_E3B1EF60.name}"
      },
      "other_other-ondelete-OnMessage-9bef38d2_IamRolePolicy_C2E2700B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-9bef38d2/IamRolePolicy",
            "uniqueId": "other_other-ondelete-OnMessage-9bef38d2_IamRolePolicy_C2E2700B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-ondelete-OnMessage-9bef38d2_IamRole_005D0A6C.name}"
      },
      "other_other-onupdate-OnMessage-bffa2a20_IamRolePolicy_35B4B8BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-bffa2a20/IamRolePolicy",
            "uniqueId": "other_other-onupdate-OnMessage-bffa2a20_IamRolePolicy_35B4B8BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-onupdate-OnMessage-bffa2a20_IamRole_EC396E4E.name}"
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
      "b_b-oncreate-OnMessage-1d3b2039_IamRolePolicyAttachment_1CF8E9A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-1d3b2039/IamRolePolicyAttachment",
            "uniqueId": "b_b-oncreate-OnMessage-1d3b2039_IamRolePolicyAttachment_1CF8E9A3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-1d3b2039_IamRole_BD50D914.name}"
      },
      "b_b-oncreate-OnMessage-a729fee3_IamRolePolicyAttachment_FC61C56E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-a729fee3/IamRolePolicyAttachment",
            "uniqueId": "b_b-oncreate-OnMessage-a729fee3_IamRolePolicyAttachment_FC61C56E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-a729fee3_IamRole_C10FE55A.name}"
      },
      "b_b-ondelete-OnMessage-4b2cd998_IamRolePolicyAttachment_CA823AE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-4b2cd998/IamRolePolicyAttachment",
            "uniqueId": "b_b-ondelete-OnMessage-4b2cd998_IamRolePolicyAttachment_CA823AE8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-4b2cd998_IamRole_FCF8E28C.name}"
      },
      "b_b-ondelete-OnMessage-b83da9f8_IamRolePolicyAttachment_99BF3D70": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-b83da9f8/IamRolePolicyAttachment",
            "uniqueId": "b_b-ondelete-OnMessage-b83da9f8_IamRolePolicyAttachment_99BF3D70"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-b83da9f8_IamRole_41A005F1.name}"
      },
      "b_b-onupdate-OnMessage-2dce4026_IamRolePolicyAttachment_3B8F25FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-2dce4026/IamRolePolicyAttachment",
            "uniqueId": "b_b-onupdate-OnMessage-2dce4026_IamRolePolicyAttachment_3B8F25FF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-2dce4026_IamRole_6035D253.name}"
      },
      "b_b-onupdate-OnMessage-b03e6c67_IamRolePolicyAttachment_2BC3E3E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-b03e6c67/IamRolePolicyAttachment",
            "uniqueId": "b_b-onupdate-OnMessage-b03e6c67_IamRolePolicyAttachment_2BC3E3E6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-b03e6c67_IamRole_2771309B.name}"
      },
      "other_other-oncreate-OnMessage-2b1e14fd_IamRolePolicyAttachment_99B77F88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-2b1e14fd/IamRolePolicyAttachment",
            "uniqueId": "other_other-oncreate-OnMessage-2b1e14fd_IamRolePolicyAttachment_99B77F88"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-oncreate-OnMessage-2b1e14fd_IamRole_E3B1EF60.name}"
      },
      "other_other-ondelete-OnMessage-9bef38d2_IamRolePolicyAttachment_72892949": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-9bef38d2/IamRolePolicyAttachment",
            "uniqueId": "other_other-ondelete-OnMessage-9bef38d2_IamRolePolicyAttachment_72892949"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-ondelete-OnMessage-9bef38d2_IamRole_005D0A6C.name}"
      },
      "other_other-onupdate-OnMessage-bffa2a20_IamRolePolicyAttachment_CE32868D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-bffa2a20/IamRolePolicyAttachment",
            "uniqueId": "other_other-onupdate-OnMessage-bffa2a20_IamRolePolicyAttachment_CE32868D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-onupdate-OnMessage-bffa2a20_IamRole_EC396E4E.name}"
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
      "b_b-oncreate-OnMessage-1d3b2039_20E46F00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-1d3b2039/Default",
            "uniqueId": "b_b-oncreate-OnMessage-1d3b2039_20E46F00"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-1d3b2039-c8a821e7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-1d3b2039-c8a821e7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-1d3b2039_IamRole_BD50D914.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-oncreate-OnMessage-1d3b2039_S3Object_5BB7AE5C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-oncreate-OnMessage-a729fee3_49378F05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-a729fee3/Default",
            "uniqueId": "b_b-oncreate-OnMessage-a729fee3_49378F05"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-a729fee3-c81091e7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-a729fee3-c81091e7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-a729fee3_IamRole_C10FE55A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-oncreate-OnMessage-a729fee3_S3Object_B8C2B6B3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-ondelete-OnMessage-4b2cd998_0DD64A53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-4b2cd998/Default",
            "uniqueId": "b_b-ondelete-OnMessage-4b2cd998_0DD64A53"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-4b2cd998-c8718454",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-4b2cd998-c8718454",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-4b2cd998_IamRole_FCF8E28C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-ondelete-OnMessage-4b2cd998_S3Object_BCCA868F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-ondelete-OnMessage-b83da9f8_75B42E31": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-b83da9f8/Default",
            "uniqueId": "b_b-ondelete-OnMessage-b83da9f8_75B42E31"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-b83da9f8-c80fdb5a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-b83da9f8-c80fdb5a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-b83da9f8_IamRole_41A005F1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-ondelete-OnMessage-b83da9f8_S3Object_858C307E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-onupdate-OnMessage-2dce4026_5DC58D89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-2dce4026/Default",
            "uniqueId": "b_b-onupdate-OnMessage-2dce4026_5DC58D89"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-2dce4026-c8164eef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-2dce4026-c8164eef",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-2dce4026_IamRole_6035D253.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-onupdate-OnMessage-2dce4026_S3Object_F76307CF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-onupdate-OnMessage-b03e6c67_09F5FCDD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-b03e6c67/Default",
            "uniqueId": "b_b-onupdate-OnMessage-b03e6c67_09F5FCDD"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-b03e6c67-c81eb9cc",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-b03e6c67-c81eb9cc",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-b03e6c67_IamRole_2771309B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-onupdate-OnMessage-b03e6c67_S3Object_F8696A8D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-oncreate-OnMessage-2b1e14fd_9EE2200F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-2b1e14fd/Default",
            "uniqueId": "other_other-oncreate-OnMessage-2b1e14fd_9EE2200F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-oncreate-OnMessage-2b1e14fd-c8a9cff0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-oncreate-OnMessage-2b1e14fd-c8a9cff0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-oncreate-OnMessage-2b1e14fd_IamRole_E3B1EF60.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-oncreate-OnMessage-2b1e14fd_S3Object_493FA326.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-ondelete-OnMessage-9bef38d2_7F9E1372": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-9bef38d2/Default",
            "uniqueId": "other_other-ondelete-OnMessage-9bef38d2_7F9E1372"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-ondelete-OnMessage-9bef38d2-c8c0555a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-ondelete-OnMessage-9bef38d2-c8c0555a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-ondelete-OnMessage-9bef38d2_IamRole_005D0A6C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-ondelete-OnMessage-9bef38d2_S3Object_DE8DCF2D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-onupdate-OnMessage-bffa2a20_0A9CE94D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-bffa2a20/Default",
            "uniqueId": "other_other-onupdate-OnMessage-bffa2a20_0A9CE94D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-onupdate-OnMessage-bffa2a20-c85595aa",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-onupdate-OnMessage-bffa2a20-c85595aa",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-onupdate-OnMessage-bffa2a20_IamRole_EC396E4E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-onupdate-OnMessage-bffa2a20_S3Object_EFC38FB1.key}",
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
      "b_b-oncreate-OnMessage-1d3b2039_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_3F28F98C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-1d3b2039/InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35",
            "uniqueId": "b_b-oncreate-OnMessage-1d3b2039_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_3F28F98C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-oncreate-OnMessage-1d3b2039_20E46F00.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-oncreate-OnMessage-a729fee3_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_EECCE9E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-a729fee3/InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35",
            "uniqueId": "b_b-oncreate-OnMessage-a729fee3_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_EECCE9E0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-oncreate-OnMessage-a729fee3_49378F05.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-ondelete-OnMessage-4b2cd998_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_71FBB2F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-4b2cd998/InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179",
            "uniqueId": "b_b-ondelete-OnMessage-4b2cd998_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_71FBB2F5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-ondelete-OnMessage-4b2cd998_0DD64A53.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-ondelete-OnMessage-b83da9f8_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_131F16E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-b83da9f8/InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179",
            "uniqueId": "b_b-ondelete-OnMessage-b83da9f8_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_131F16E9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-ondelete-OnMessage-b83da9f8_75B42E31.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-onupdate-OnMessage-2dce4026_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_BCC38801": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-2dce4026/InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf",
            "uniqueId": "b_b-onupdate-OnMessage-2dce4026_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_BCC38801"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-onupdate-OnMessage-2dce4026_5DC58D89.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "b_b-onupdate-OnMessage-b03e6c67_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_AAF71A98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-b03e6c67/InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf",
            "uniqueId": "b_b-onupdate-OnMessage-b03e6c67_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_AAF71A98"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-onupdate-OnMessage-b03e6c67_09F5FCDD.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "other_other-oncreate-OnMessage-2b1e14fd_InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a_A422B50A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-2b1e14fd/InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a",
            "uniqueId": "other_other-oncreate-OnMessage-2b1e14fd_InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a_A422B50A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-oncreate-OnMessage-2b1e14fd_9EE2200F.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
      },
      "other_other-ondelete-OnMessage-9bef38d2_InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf_2E61FF0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-9bef38d2/InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf",
            "uniqueId": "other_other-ondelete-OnMessage-9bef38d2_InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf_2E61FF0C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-ondelete-OnMessage-9bef38d2_7F9E1372.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
      },
      "other_other-onupdate-OnMessage-bffa2a20_InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf_E793EA46": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-bffa2a20/InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf",
            "uniqueId": "other_other-onupdate-OnMessage-bffa2a20_InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf_E793EA46"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-onupdate-OnMessage-bffa2a20_0A9CE94D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}"
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
          "aws_sns_topic_policy.b_b-ondelete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_6E0CB482",
          "aws_sns_topic_policy.b_b-onupdate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_F532851B",
          "aws_sns_topic_policy.b_b-oncreate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_038EF323"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
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
          "aws_sns_topic_policy.other_other-oncreate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_0202E6BD",
          "aws_sns_topic_policy.other_other-onupdate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_F59495DD",
          "aws_sns_topic_policy.other_other-ondelete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_CB407B96"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}"
          },
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
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
      "b_b-oncreate-OnMessage-1d3b2039_S3Object_5BB7AE5C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-1d3b2039/S3Object",
            "uniqueId": "b_b-oncreate-OnMessage-1d3b2039_S3Object_5BB7AE5C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-oncreate-OnMessage-a729fee3_S3Object_B8C2B6B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-a729fee3/S3Object",
            "uniqueId": "b_b-oncreate-OnMessage-a729fee3_S3Object_B8C2B6B3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-ondelete-OnMessage-4b2cd998_S3Object_BCCA868F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-4b2cd998/S3Object",
            "uniqueId": "b_b-ondelete-OnMessage-4b2cd998_S3Object_BCCA868F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-ondelete-OnMessage-b83da9f8_S3Object_858C307E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-b83da9f8/S3Object",
            "uniqueId": "b_b-ondelete-OnMessage-b83da9f8_S3Object_858C307E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-onupdate-OnMessage-2dce4026_S3Object_F76307CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-2dce4026/S3Object",
            "uniqueId": "b_b-onupdate-OnMessage-2dce4026_S3Object_F76307CF"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-onupdate-OnMessage-b03e6c67_S3Object_F8696A8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-b03e6c67/S3Object",
            "uniqueId": "b_b-onupdate-OnMessage-b03e6c67_S3Object_F8696A8D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-oncreate-OnMessage-2b1e14fd_S3Object_493FA326": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-2b1e14fd/S3Object",
            "uniqueId": "other_other-oncreate-OnMessage-2b1e14fd_S3Object_493FA326"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-ondelete-OnMessage-9bef38d2_S3Object_DE8DCF2D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-9bef38d2/S3Object",
            "uniqueId": "other_other-ondelete-OnMessage-9bef38d2_S3Object_DE8DCF2D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-onupdate-OnMessage-bffa2a20_S3Object_EFC38FB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-bffa2a20/S3Object",
            "uniqueId": "other_other-onupdate-OnMessage-bffa2a20_S3Object_EFC38FB1"
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
      "b_b-oncreate_886A880E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/Default",
            "uniqueId": "b_b-oncreate_886A880E"
          }
        },
        "name": "b-oncreate-c814afd1"
      },
      "b_b-ondelete_F8924325": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/Default",
            "uniqueId": "b_b-ondelete_F8924325"
          }
        },
        "name": "b-ondelete-c80dbc45"
      },
      "b_b-onupdate_24C2703A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/Default",
            "uniqueId": "b_b-onupdate_24C2703A"
          }
        },
        "name": "b-onupdate-c8b0a714"
      },
      "other_other-oncreate_C00FD9E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/Default",
            "uniqueId": "other_other-oncreate_C00FD9E3"
          }
        },
        "name": "other-oncreate-c872dd37"
      },
      "other_other-ondelete_09111C9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/Default",
            "uniqueId": "other_other-ondelete_09111C9D"
          }
        },
        "name": "other-ondelete-c8267296"
      },
      "other_other-onupdate_1FD7645E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/Default",
            "uniqueId": "other_other-onupdate_1FD7645E"
          }
        },
        "name": "other-onupdate-c872d872"
      }
    },
    "aws_sns_topic_policy": {
      "b_b-oncreate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_038EF323": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-oncreate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_038EF323"
          }
        },
        "arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-oncreate_886A880E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "b_b-ondelete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_6E0CB482": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-ondelete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_6E0CB482"
          }
        },
        "arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-ondelete_F8924325.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "b_b-onupdate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_F532851B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-onupdate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_F532851B"
          }
        },
        "arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-onupdate_24C2703A.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "other_other-oncreate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_0202E6BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-oncreate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_0202E6BD"
          }
        },
        "arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      },
      "other_other-ondelete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_CB407B96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-ondelete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_CB407B96"
          }
        },
        "arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-ondelete_09111C9D.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      },
      "other_other-onupdate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_F59495DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-onupdate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_F59495DD"
          }
        },
        "arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-onupdate_1FD7645E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "b_b-oncreate_b-oncreate-TopicSubscription-1d3b2039_86B72DE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-TopicSubscription-1d3b2039",
            "uniqueId": "b_b-oncreate_b-oncreate-TopicSubscription-1d3b2039_86B72DE9"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-oncreate-OnMessage-1d3b2039_20E46F00.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-oncreate_b-oncreate-TopicSubscription-a729fee3_AF7060F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-TopicSubscription-a729fee3",
            "uniqueId": "b_b-oncreate_b-oncreate-TopicSubscription-a729fee3_AF7060F5"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-oncreate-OnMessage-a729fee3_49378F05.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-ondelete_b-ondelete-TopicSubscription-4b2cd998_DF76CC77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-TopicSubscription-4b2cd998",
            "uniqueId": "b_b-ondelete_b-ondelete-TopicSubscription-4b2cd998_DF76CC77"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-ondelete-OnMessage-4b2cd998_0DD64A53.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-ondelete_b-ondelete-TopicSubscription-b83da9f8_DE8E3B44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-TopicSubscription-b83da9f8",
            "uniqueId": "b_b-ondelete_b-ondelete-TopicSubscription-b83da9f8_DE8E3B44"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-ondelete-OnMessage-b83da9f8_75B42E31.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-onupdate_b-onupdate-TopicSubscription-2dce4026_6798ABF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-TopicSubscription-2dce4026",
            "uniqueId": "b_b-onupdate_b-onupdate-TopicSubscription-2dce4026_6798ABF8"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-onupdate-OnMessage-2dce4026_5DC58D89.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "b_b-onupdate_b-onupdate-TopicSubscription-b03e6c67_C09EF500": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-TopicSubscription-b03e6c67",
            "uniqueId": "b_b-onupdate_b-onupdate-TopicSubscription-b03e6c67_C09EF500"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-onupdate-OnMessage-b03e6c67_09F5FCDD.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "other_other-oncreate_other-oncreate-TopicSubscription-2b1e14fd_C0757EA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-TopicSubscription-2b1e14fd",
            "uniqueId": "other_other-oncreate_other-oncreate-TopicSubscription-2b1e14fd_C0757EA4"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-oncreate-OnMessage-2b1e14fd_9EE2200F.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
      },
      "other_other-ondelete_other-ondelete-TopicSubscription-9bef38d2_04AE6482": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-TopicSubscription-9bef38d2",
            "uniqueId": "other_other-ondelete_other-ondelete-TopicSubscription-9bef38d2_04AE6482"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-ondelete-OnMessage-9bef38d2_7F9E1372.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
      },
      "other_other-onupdate_other-onupdate-TopicSubscription-bffa2a20_7EB503EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-TopicSubscription-bffa2a20",
            "uniqueId": "other_other-onupdate_other-onupdate-TopicSubscription-bffa2a20_7EB503EC"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-onupdate-OnMessage-bffa2a20_0A9CE94D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}"
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
        (std.Display.of(this)).hidden = true;
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
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
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
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
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
            $other: ${context._lift(other)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(other, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
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
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        (std.Display.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
            $b: ${context._lift(b)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _registerBind(host, ops) {
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
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bucket_events", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


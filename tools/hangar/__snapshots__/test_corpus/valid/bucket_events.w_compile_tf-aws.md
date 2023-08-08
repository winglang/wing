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
    async handle(key) {
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
    async handle(key) {
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
    async handle(key) {
      {console.log(String.raw({ raw: ["created ", ""] }, key))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
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

## inflight.$Closure5.js
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

## inflight.$Closure6.js
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
      "b_b-oncreate-OnMessage-cd3f219f_IamRole_ACD86550": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-cd3f219f/IamRole",
            "uniqueId": "b_b-oncreate-OnMessage-cd3f219f_IamRole_ACD86550"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-oncreate-OnMessage-f5efc76a_IamRole_5AB4D411": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-f5efc76a/IamRole",
            "uniqueId": "b_b-oncreate-OnMessage-f5efc76a_IamRole_5AB4D411"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-ondelete-OnMessage-2233a0be_IamRole_2A59A211": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-2233a0be/IamRole",
            "uniqueId": "b_b-ondelete-OnMessage-2233a0be_IamRole_2A59A211"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-ondelete-OnMessage-66f114f1_IamRole_DC21898E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-66f114f1/IamRole",
            "uniqueId": "b_b-ondelete-OnMessage-66f114f1_IamRole_DC21898E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-onupdate-OnMessage-9eb7f7e1_IamRole_7289CFEA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-9eb7f7e1/IamRole",
            "uniqueId": "b_b-onupdate-OnMessage-9eb7f7e1_IamRole_7289CFEA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-onupdate-OnMessage-aac4257e_IamRole_5A0EC266": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-aac4257e/IamRole",
            "uniqueId": "b_b-onupdate-OnMessage-aac4257e_IamRole_5A0EC266"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-oncreate-OnMessage-9951bd6e_IamRole_15B1699D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-9951bd6e/IamRole",
            "uniqueId": "other_other-oncreate-OnMessage-9951bd6e_IamRole_15B1699D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-ondelete-OnMessage-b5867be0_IamRole_FA0F6C59": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-b5867be0/IamRole",
            "uniqueId": "other_other-ondelete-OnMessage-b5867be0_IamRole_FA0F6C59"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-onupdate-OnMessage-d8c5ea34_IamRole_1AF0D2AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-d8c5ea34/IamRole",
            "uniqueId": "other_other-onupdate-OnMessage-d8c5ea34_IamRole_1AF0D2AA"
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
      "b_b-oncreate-OnMessage-cd3f219f_IamRolePolicy_4BD248DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-cd3f219f/IamRolePolicy",
            "uniqueId": "b_b-oncreate-OnMessage-cd3f219f_IamRolePolicy_4BD248DE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-cd3f219f_IamRole_ACD86550.name}"
      },
      "b_b-oncreate-OnMessage-f5efc76a_IamRolePolicy_057C4E0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-f5efc76a/IamRolePolicy",
            "uniqueId": "b_b-oncreate-OnMessage-f5efc76a_IamRolePolicy_057C4E0C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-f5efc76a_IamRole_5AB4D411.name}"
      },
      "b_b-ondelete-OnMessage-2233a0be_IamRolePolicy_4EDE2F19": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-2233a0be/IamRolePolicy",
            "uniqueId": "b_b-ondelete-OnMessage-2233a0be_IamRolePolicy_4EDE2F19"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-2233a0be_IamRole_2A59A211.name}"
      },
      "b_b-ondelete-OnMessage-66f114f1_IamRolePolicy_03496A3F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-66f114f1/IamRolePolicy",
            "uniqueId": "b_b-ondelete-OnMessage-66f114f1_IamRolePolicy_03496A3F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-66f114f1_IamRole_DC21898E.name}"
      },
      "b_b-onupdate-OnMessage-9eb7f7e1_IamRolePolicy_A78BEBB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-9eb7f7e1/IamRolePolicy",
            "uniqueId": "b_b-onupdate-OnMessage-9eb7f7e1_IamRolePolicy_A78BEBB2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-9eb7f7e1_IamRole_7289CFEA.name}"
      },
      "b_b-onupdate-OnMessage-aac4257e_IamRolePolicy_A92955CF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-aac4257e/IamRolePolicy",
            "uniqueId": "b_b-onupdate-OnMessage-aac4257e_IamRolePolicy_A92955CF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-aac4257e_IamRole_5A0EC266.name}"
      },
      "other_other-oncreate-OnMessage-9951bd6e_IamRolePolicy_CB002C00": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-9951bd6e/IamRolePolicy",
            "uniqueId": "other_other-oncreate-OnMessage-9951bd6e_IamRolePolicy_CB002C00"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-oncreate-OnMessage-9951bd6e_IamRole_15B1699D.name}"
      },
      "other_other-ondelete-OnMessage-b5867be0_IamRolePolicy_C1506015": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-b5867be0/IamRolePolicy",
            "uniqueId": "other_other-ondelete-OnMessage-b5867be0_IamRolePolicy_C1506015"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-ondelete-OnMessage-b5867be0_IamRole_FA0F6C59.name}"
      },
      "other_other-onupdate-OnMessage-d8c5ea34_IamRolePolicy_EAAB2779": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-d8c5ea34/IamRolePolicy",
            "uniqueId": "other_other-onupdate-OnMessage-d8c5ea34_IamRolePolicy_EAAB2779"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-onupdate-OnMessage-d8c5ea34_IamRole_1AF0D2AA.name}"
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
      "b_b-oncreate-OnMessage-cd3f219f_IamRolePolicyAttachment_3A438053": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-cd3f219f/IamRolePolicyAttachment",
            "uniqueId": "b_b-oncreate-OnMessage-cd3f219f_IamRolePolicyAttachment_3A438053"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-cd3f219f_IamRole_ACD86550.name}"
      },
      "b_b-oncreate-OnMessage-f5efc76a_IamRolePolicyAttachment_42356E06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-f5efc76a/IamRolePolicyAttachment",
            "uniqueId": "b_b-oncreate-OnMessage-f5efc76a_IamRolePolicyAttachment_42356E06"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-f5efc76a_IamRole_5AB4D411.name}"
      },
      "b_b-ondelete-OnMessage-2233a0be_IamRolePolicyAttachment_BC19A522": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-2233a0be/IamRolePolicyAttachment",
            "uniqueId": "b_b-ondelete-OnMessage-2233a0be_IamRolePolicyAttachment_BC19A522"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-2233a0be_IamRole_2A59A211.name}"
      },
      "b_b-ondelete-OnMessage-66f114f1_IamRolePolicyAttachment_EB309BF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-66f114f1/IamRolePolicyAttachment",
            "uniqueId": "b_b-ondelete-OnMessage-66f114f1_IamRolePolicyAttachment_EB309BF1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-66f114f1_IamRole_DC21898E.name}"
      },
      "b_b-onupdate-OnMessage-9eb7f7e1_IamRolePolicyAttachment_1A1B6979": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-9eb7f7e1/IamRolePolicyAttachment",
            "uniqueId": "b_b-onupdate-OnMessage-9eb7f7e1_IamRolePolicyAttachment_1A1B6979"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-9eb7f7e1_IamRole_7289CFEA.name}"
      },
      "b_b-onupdate-OnMessage-aac4257e_IamRolePolicyAttachment_F6196A8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-aac4257e/IamRolePolicyAttachment",
            "uniqueId": "b_b-onupdate-OnMessage-aac4257e_IamRolePolicyAttachment_F6196A8C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-aac4257e_IamRole_5A0EC266.name}"
      },
      "other_other-oncreate-OnMessage-9951bd6e_IamRolePolicyAttachment_444BE231": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-9951bd6e/IamRolePolicyAttachment",
            "uniqueId": "other_other-oncreate-OnMessage-9951bd6e_IamRolePolicyAttachment_444BE231"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-oncreate-OnMessage-9951bd6e_IamRole_15B1699D.name}"
      },
      "other_other-ondelete-OnMessage-b5867be0_IamRolePolicyAttachment_90003271": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-b5867be0/IamRolePolicyAttachment",
            "uniqueId": "other_other-ondelete-OnMessage-b5867be0_IamRolePolicyAttachment_90003271"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-ondelete-OnMessage-b5867be0_IamRole_FA0F6C59.name}"
      },
      "other_other-onupdate-OnMessage-d8c5ea34_IamRolePolicyAttachment_EE064A67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-d8c5ea34/IamRolePolicyAttachment",
            "uniqueId": "other_other-onupdate-OnMessage-d8c5ea34_IamRolePolicyAttachment_EE064A67"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-onupdate-OnMessage-d8c5ea34_IamRole_1AF0D2AA.name}"
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
      "b_b-oncreate-OnMessage-cd3f219f_C1D94CC1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-cd3f219f/Default",
            "uniqueId": "b_b-oncreate-OnMessage-cd3f219f_C1D94CC1"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-cd3f219f-c8cb695a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-cd3f219f-c8cb695a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-cd3f219f_IamRole_ACD86550.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-oncreate-OnMessage-cd3f219f_S3Object_55D05822.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-oncreate-OnMessage-f5efc76a_7BBB42DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-f5efc76a/Default",
            "uniqueId": "b_b-oncreate-OnMessage-f5efc76a_7BBB42DA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-f5efc76a-c87d122c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-f5efc76a-c87d122c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-oncreate-OnMessage-f5efc76a_IamRole_5AB4D411.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-oncreate-OnMessage-f5efc76a_S3Object_22CFBA18.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-ondelete-OnMessage-2233a0be_DC04BB0D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-2233a0be/Default",
            "uniqueId": "b_b-ondelete-OnMessage-2233a0be_DC04BB0D"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-2233a0be-c879f640",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-2233a0be-c879f640",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-2233a0be_IamRole_2A59A211.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-ondelete-OnMessage-2233a0be_S3Object_AC61B541.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-ondelete-OnMessage-66f114f1_04EF33D5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-66f114f1/Default",
            "uniqueId": "b_b-ondelete-OnMessage-66f114f1_04EF33D5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-66f114f1-c870a67c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-66f114f1-c870a67c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-ondelete-OnMessage-66f114f1_IamRole_DC21898E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-ondelete-OnMessage-66f114f1_S3Object_254CA292.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-onupdate-OnMessage-9eb7f7e1_7A6F5823": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-9eb7f7e1/Default",
            "uniqueId": "b_b-onupdate-OnMessage-9eb7f7e1_7A6F5823"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-9eb7f7e1-c832fa91",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-9eb7f7e1-c832fa91",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-9eb7f7e1_IamRole_7289CFEA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-onupdate-OnMessage-9eb7f7e1_S3Object_AC55E659.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-onupdate-OnMessage-aac4257e_8E63F6C2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-aac4257e/Default",
            "uniqueId": "b_b-onupdate-OnMessage-aac4257e_8E63F6C2"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-aac4257e-c810b9ed",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-aac4257e-c810b9ed",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-onupdate-OnMessage-aac4257e_IamRole_5A0EC266.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-onupdate-OnMessage-aac4257e_S3Object_C3933F23.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-oncreate-OnMessage-9951bd6e_48A13F8C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-9951bd6e/Default",
            "uniqueId": "other_other-oncreate-OnMessage-9951bd6e_48A13F8C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-oncreate-OnMessage-9951bd6e-c84c1446",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-oncreate-OnMessage-9951bd6e-c84c1446",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-oncreate-OnMessage-9951bd6e_IamRole_15B1699D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-oncreate-OnMessage-9951bd6e_S3Object_B4DF8AB2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-ondelete-OnMessage-b5867be0_850D7634": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-b5867be0/Default",
            "uniqueId": "other_other-ondelete-OnMessage-b5867be0_850D7634"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-ondelete-OnMessage-b5867be0-c8e69522",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-ondelete-OnMessage-b5867be0-c8e69522",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-ondelete-OnMessage-b5867be0_IamRole_FA0F6C59.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-ondelete-OnMessage-b5867be0_S3Object_2511D85F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-onupdate-OnMessage-d8c5ea34_2A7219D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-d8c5ea34/Default",
            "uniqueId": "other_other-onupdate-OnMessage-d8c5ea34_2A7219D4"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-onupdate-OnMessage-d8c5ea34-c80b31b5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-onupdate-OnMessage-d8c5ea34-c80b31b5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-onupdate-OnMessage-d8c5ea34_IamRole_1AF0D2AA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-onupdate-OnMessage-d8c5ea34_S3Object_6CC60C7B.key}",
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
      "b_b-oncreate-OnMessage-cd3f219f_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_BEC73D5F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-cd3f219f/InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35",
            "uniqueId": "b_b-oncreate-OnMessage-cd3f219f_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_BEC73D5F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-oncreate-OnMessage-cd3f219f_C1D94CC1.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-oncreate-OnMessage-f5efc76a_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_41D6C8C9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-f5efc76a/InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35",
            "uniqueId": "b_b-oncreate-OnMessage-f5efc76a_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_41D6C8C9"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-oncreate-OnMessage-f5efc76a_7BBB42DA.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-ondelete-OnMessage-2233a0be_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_339D5767": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-2233a0be/InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179",
            "uniqueId": "b_b-ondelete-OnMessage-2233a0be_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_339D5767"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-ondelete-OnMessage-2233a0be_DC04BB0D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-ondelete-OnMessage-66f114f1_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_DFD02AB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-66f114f1/InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179",
            "uniqueId": "b_b-ondelete-OnMessage-66f114f1_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_DFD02AB2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-ondelete-OnMessage-66f114f1_04EF33D5.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-onupdate-OnMessage-9eb7f7e1_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_26759CD0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-9eb7f7e1/InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf",
            "uniqueId": "b_b-onupdate-OnMessage-9eb7f7e1_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_26759CD0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-onupdate-OnMessage-9eb7f7e1_7A6F5823.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "b_b-onupdate-OnMessage-aac4257e_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_F7C82A14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-aac4257e/InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf",
            "uniqueId": "b_b-onupdate-OnMessage-aac4257e_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_F7C82A14"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-onupdate-OnMessage-aac4257e_8E63F6C2.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "other_other-oncreate-OnMessage-9951bd6e_InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a_B9728783": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-9951bd6e/InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a",
            "uniqueId": "other_other-oncreate-OnMessage-9951bd6e_InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a_B9728783"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-oncreate-OnMessage-9951bd6e_48A13F8C.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
      },
      "other_other-ondelete-OnMessage-b5867be0_InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf_FC7534AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-b5867be0/InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf",
            "uniqueId": "other_other-ondelete-OnMessage-b5867be0_InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf_FC7534AF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-ondelete-OnMessage-b5867be0_850D7634.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
      },
      "other_other-onupdate-OnMessage-d8c5ea34_InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf_5DD6499C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-d8c5ea34/InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf",
            "uniqueId": "other_other-onupdate-OnMessage-d8c5ea34_InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf_5DD6499C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-onupdate-OnMessage-d8c5ea34_2A7219D4.function_name}",
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
      "b_b-oncreate-OnMessage-cd3f219f_S3Object_55D05822": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-cd3f219f/S3Object",
            "uniqueId": "b_b-oncreate-OnMessage-cd3f219f_S3Object_55D05822"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-oncreate-OnMessage-f5efc76a_S3Object_22CFBA18": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate-OnMessage-f5efc76a/S3Object",
            "uniqueId": "b_b-oncreate-OnMessage-f5efc76a_S3Object_22CFBA18"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-ondelete-OnMessage-2233a0be_S3Object_AC61B541": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-2233a0be/S3Object",
            "uniqueId": "b_b-ondelete-OnMessage-2233a0be_S3Object_AC61B541"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-ondelete-OnMessage-66f114f1_S3Object_254CA292": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete-OnMessage-66f114f1/S3Object",
            "uniqueId": "b_b-ondelete-OnMessage-66f114f1_S3Object_254CA292"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-onupdate-OnMessage-9eb7f7e1_S3Object_AC55E659": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-9eb7f7e1/S3Object",
            "uniqueId": "b_b-onupdate-OnMessage-9eb7f7e1_S3Object_AC55E659"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-onupdate-OnMessage-aac4257e_S3Object_C3933F23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate-OnMessage-aac4257e/S3Object",
            "uniqueId": "b_b-onupdate-OnMessage-aac4257e_S3Object_C3933F23"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-oncreate-OnMessage-9951bd6e_S3Object_B4DF8AB2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate-OnMessage-9951bd6e/S3Object",
            "uniqueId": "other_other-oncreate-OnMessage-9951bd6e_S3Object_B4DF8AB2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-ondelete-OnMessage-b5867be0_S3Object_2511D85F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete-OnMessage-b5867be0/S3Object",
            "uniqueId": "other_other-ondelete-OnMessage-b5867be0_S3Object_2511D85F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-onupdate-OnMessage-d8c5ea34_S3Object_6CC60C7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate-OnMessage-d8c5ea34/S3Object",
            "uniqueId": "other_other-onupdate-OnMessage-d8c5ea34_S3Object_6CC60C7B"
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
      "b_b-oncreate_b-oncreate-TopicSubscription-cd3f219f_F2B4128D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-TopicSubscription-cd3f219f",
            "uniqueId": "b_b-oncreate_b-oncreate-TopicSubscription-cd3f219f_F2B4128D"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-oncreate-OnMessage-cd3f219f_C1D94CC1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-oncreate_b-oncreate-TopicSubscription-f5efc76a_DBDE737B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-TopicSubscription-f5efc76a",
            "uniqueId": "b_b-oncreate_b-oncreate-TopicSubscription-f5efc76a_DBDE737B"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-oncreate-OnMessage-f5efc76a_7BBB42DA.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-ondelete_b-ondelete-TopicSubscription-2233a0be_2A0DB27E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-TopicSubscription-2233a0be",
            "uniqueId": "b_b-ondelete_b-ondelete-TopicSubscription-2233a0be_2A0DB27E"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-ondelete-OnMessage-2233a0be_DC04BB0D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-ondelete_b-ondelete-TopicSubscription-66f114f1_346BB031": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-TopicSubscription-66f114f1",
            "uniqueId": "b_b-ondelete_b-ondelete-TopicSubscription-66f114f1_346BB031"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-ondelete-OnMessage-66f114f1_04EF33D5.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-onupdate_b-onupdate-TopicSubscription-9eb7f7e1_F38B00E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-TopicSubscription-9eb7f7e1",
            "uniqueId": "b_b-onupdate_b-onupdate-TopicSubscription-9eb7f7e1_F38B00E3"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-onupdate-OnMessage-9eb7f7e1_7A6F5823.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "b_b-onupdate_b-onupdate-TopicSubscription-aac4257e_85271402": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-TopicSubscription-aac4257e",
            "uniqueId": "b_b-onupdate_b-onupdate-TopicSubscription-aac4257e_85271402"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-onupdate-OnMessage-aac4257e_8E63F6C2.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "other_other-oncreate_other-oncreate-TopicSubscription-9951bd6e_BC9867EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-TopicSubscription-9951bd6e",
            "uniqueId": "other_other-oncreate_other-oncreate-TopicSubscription-9951bd6e_BC9867EA"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-oncreate-OnMessage-9951bd6e_48A13F8C.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
      },
      "other_other-ondelete_other-ondelete-TopicSubscription-b5867be0_0424198F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-TopicSubscription-b5867be0",
            "uniqueId": "other_other-ondelete_other-ondelete-TopicSubscription-b5867be0_0424198F"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-ondelete-OnMessage-b5867be0_850D7634.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
      },
      "other_other-onupdate_other-onupdate-TopicSubscription-d8c5ea34_AE1B7614": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-TopicSubscription-d8c5ea34",
            "uniqueId": "other_other-onupdate_other-onupdate-TopicSubscription-d8c5ea34_AE1B7614"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-onupdate-OnMessage-d8c5ea34_2A7219D4.arn}",
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
            $other: ${context._lift(other)},
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
          $Closure4._registerBindObject(other, host, ["put"]);
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
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure6.js")({
            $b: ${context._lift(b)},
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
new $App({ outdir: $outdir, name: "bucket_events", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


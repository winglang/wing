# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | compile | tf-aws

## inflight.$Closure1.js

```js
module.exports = function ({}) {
  class $Closure1 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle(key) {
      {
        console.log(`deleted ${key}`);
      }
    }
  }
  return $Closure1;
};
```

## inflight.$Closure2.js

```js
module.exports = function ({}) {
  class $Closure2 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle(key) {
      {
        console.log(`updated ${key}`);
      }
    }
  }
  return $Closure2;
};
```

## inflight.$Closure3.js

```js
module.exports = function ({}) {
  class $Closure3 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle(key) {
      {
        console.log(`created ${key}`);
      }
    }
  }
  return $Closure3;
};
```

## inflight.$Closure4.js

```js
module.exports = function ({ other, std_Json }) {
  class $Closure4 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle(key) {
      {
        console.log(`last key ${key}`);
      }
      await other.put(
        "last_operation_key",
        ((args) => {
          return JSON.stringify(args[0], null, args[1]);
        })([key])
      );
    }
  }
  return $Closure4;
};
```

## inflight.$Closure5.js

```js
module.exports = function ({}) {
  class $Closure5 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle(key) {
      {
        console.log("other bucket event called!");
      }
    }
  }
  return $Closure5;
};
```

## inflight.$Closure6.js

```js
module.exports = function ({ b }) {
  class $Closure6 {
    constructor({}) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init() {}
    async handle() {
      await b.put("a", "1");
      await b.put("b", "1");
      await b.put("b", "100");
      await b.put("c", "1");
      await b.delete("c");
    }
  }
  return $Closure6;
};
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.root_testtest_Handler_046C3415.arn}\"]]"
    }
  },
  "provider": {
    "aws": [{}]
  },
  "resource": {
    "aws_iam_role": {
      "root_b_boncreateOnMessage5f62bd7c_IamRole_1BEA4B16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/IamRole",
            "uniqueId": "root_b_boncreateOnMessage5f62bd7c_IamRole_1BEA4B16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_boncreateOnMessageaef3f85d_IamRole_475CF5FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/IamRole",
            "uniqueId": "root_b_boncreateOnMessageaef3f85d_IamRole_475CF5FA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bondeleteOnMessage1c41a2ad_IamRole_0213C087": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/IamRole",
            "uniqueId": "root_b_bondeleteOnMessage1c41a2ad_IamRole_0213C087"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bondeleteOnMessage85baa474_IamRole_B2CA0D60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/IamRole",
            "uniqueId": "root_b_bondeleteOnMessage85baa474_IamRole_B2CA0D60"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bonupdateOnMessage3ed6033f_IamRole_C047755B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/IamRole",
            "uniqueId": "root_b_bonupdateOnMessage3ed6033f_IamRole_C047755B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bonupdateOnMessaged39e959f_IamRole_39D34E7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/IamRole",
            "uniqueId": "root_b_bonupdateOnMessaged39e959f_IamRole_39D34E7E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_other_otheroncreateOnMessage0af389c6_IamRole_4D91EDAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/IamRole",
            "uniqueId": "root_other_otheroncreateOnMessage0af389c6_IamRole_4D91EDAA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_other_otherondeleteOnMessage5e9bc889_IamRole_C7DEEFA6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/IamRole",
            "uniqueId": "root_other_otherondeleteOnMessage5e9bc889_IamRole_C7DEEFA6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_other_otheronupdateOnMessage5290616b_IamRole_2068DED5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/IamRole",
            "uniqueId": "root_other_otheronupdateOnMessage5290616b_IamRole_2068DED5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testtest_Handler_IamRole_6C1728D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "root_testtest_Handler_IamRole_6C1728D1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_b_boncreateOnMessage5f62bd7c_IamRolePolicy_23A9CD51": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/IamRolePolicy",
            "uniqueId": "root_b_boncreateOnMessage5f62bd7c_IamRolePolicy_23A9CD51"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_b_boncreateOnMessage5f62bd7c_IamRole_1BEA4B16.name}"
      },
      "root_b_boncreateOnMessageaef3f85d_IamRolePolicy_E0B1CB05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/IamRolePolicy",
            "uniqueId": "root_b_boncreateOnMessageaef3f85d_IamRolePolicy_E0B1CB05"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_other_26932ECB.arn}\",\"${aws_s3_bucket.root_other_26932ECB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_boncreateOnMessageaef3f85d_IamRole_475CF5FA.name}"
      },
      "root_b_bondeleteOnMessage1c41a2ad_IamRolePolicy_23E36057": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/IamRolePolicy",
            "uniqueId": "root_b_bondeleteOnMessage1c41a2ad_IamRolePolicy_23E36057"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_other_26932ECB.arn}\",\"${aws_s3_bucket.root_other_26932ECB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage1c41a2ad_IamRole_0213C087.name}"
      },
      "root_b_bondeleteOnMessage85baa474_IamRolePolicy_AA9F8978": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/IamRolePolicy",
            "uniqueId": "root_b_bondeleteOnMessage85baa474_IamRolePolicy_AA9F8978"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage85baa474_IamRole_B2CA0D60.name}"
      },
      "root_b_bonupdateOnMessage3ed6033f_IamRolePolicy_61875C14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/IamRolePolicy",
            "uniqueId": "root_b_bonupdateOnMessage3ed6033f_IamRolePolicy_61875C14"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_other_26932ECB.arn}\",\"${aws_s3_bucket.root_other_26932ECB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bonupdateOnMessage3ed6033f_IamRole_C047755B.name}"
      },
      "root_b_bonupdateOnMessaged39e959f_IamRolePolicy_05A99D8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/IamRolePolicy",
            "uniqueId": "root_b_bonupdateOnMessaged39e959f_IamRolePolicy_05A99D8E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_b_bonupdateOnMessaged39e959f_IamRole_39D34E7E.name}"
      },
      "root_other_otheroncreateOnMessage0af389c6_IamRolePolicy_F9FA664A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/IamRolePolicy",
            "uniqueId": "root_other_otheroncreateOnMessage0af389c6_IamRolePolicy_F9FA664A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_other_otheroncreateOnMessage0af389c6_IamRole_4D91EDAA.name}"
      },
      "root_other_otherondeleteOnMessage5e9bc889_IamRolePolicy_69E2110F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/IamRolePolicy",
            "uniqueId": "root_other_otherondeleteOnMessage5e9bc889_IamRolePolicy_69E2110F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_other_otherondeleteOnMessage5e9bc889_IamRole_C7DEEFA6.name}"
      },
      "root_other_otheronupdateOnMessage5290616b_IamRolePolicy_218EC9EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/IamRolePolicy",
            "uniqueId": "root_other_otheronupdateOnMessage5290616b_IamRolePolicy_218EC9EF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_other_otheronupdateOnMessage5290616b_IamRole_2068DED5.name}"
      },
      "root_testtest_Handler_IamRolePolicy_65A1D8BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "root_testtest_Handler_IamRolePolicy_65A1D8BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\",\"${aws_s3_bucket.root_b_6D0D1E6D.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\",\"${aws_s3_bucket.root_b_6D0D1E6D.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_b_boncreateOnMessage5f62bd7c_IamRolePolicyAttachment_13AAAAD4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/IamRolePolicyAttachment",
            "uniqueId": "root_b_boncreateOnMessage5f62bd7c_IamRolePolicyAttachment_13AAAAD4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_boncreateOnMessage5f62bd7c_IamRole_1BEA4B16.name}"
      },
      "root_b_boncreateOnMessageaef3f85d_IamRolePolicyAttachment_0F8AA24A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/IamRolePolicyAttachment",
            "uniqueId": "root_b_boncreateOnMessageaef3f85d_IamRolePolicyAttachment_0F8AA24A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_boncreateOnMessageaef3f85d_IamRole_475CF5FA.name}"
      },
      "root_b_bondeleteOnMessage1c41a2ad_IamRolePolicyAttachment_2296C239": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/IamRolePolicyAttachment",
            "uniqueId": "root_b_bondeleteOnMessage1c41a2ad_IamRolePolicyAttachment_2296C239"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage1c41a2ad_IamRole_0213C087.name}"
      },
      "root_b_bondeleteOnMessage85baa474_IamRolePolicyAttachment_D8315661": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/IamRolePolicyAttachment",
            "uniqueId": "root_b_bondeleteOnMessage85baa474_IamRolePolicyAttachment_D8315661"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage85baa474_IamRole_B2CA0D60.name}"
      },
      "root_b_bonupdateOnMessage3ed6033f_IamRolePolicyAttachment_0926ACCB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/IamRolePolicyAttachment",
            "uniqueId": "root_b_bonupdateOnMessage3ed6033f_IamRolePolicyAttachment_0926ACCB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bonupdateOnMessage3ed6033f_IamRole_C047755B.name}"
      },
      "root_b_bonupdateOnMessaged39e959f_IamRolePolicyAttachment_A88C6019": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/IamRolePolicyAttachment",
            "uniqueId": "root_b_bonupdateOnMessaged39e959f_IamRolePolicyAttachment_A88C6019"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bonupdateOnMessaged39e959f_IamRole_39D34E7E.name}"
      },
      "root_other_otheroncreateOnMessage0af389c6_IamRolePolicyAttachment_693FAC8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/IamRolePolicyAttachment",
            "uniqueId": "root_other_otheroncreateOnMessage0af389c6_IamRolePolicyAttachment_693FAC8D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_other_otheroncreateOnMessage0af389c6_IamRole_4D91EDAA.name}"
      },
      "root_other_otherondeleteOnMessage5e9bc889_IamRolePolicyAttachment_4B0CC6D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/IamRolePolicyAttachment",
            "uniqueId": "root_other_otherondeleteOnMessage5e9bc889_IamRolePolicyAttachment_4B0CC6D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_other_otherondeleteOnMessage5e9bc889_IamRole_C7DEEFA6.name}"
      },
      "root_other_otheronupdateOnMessage5290616b_IamRolePolicyAttachment_A1C457A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/IamRolePolicyAttachment",
            "uniqueId": "root_other_otheronupdateOnMessage5290616b_IamRolePolicyAttachment_A1C457A9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_other_otheronupdateOnMessage5290616b_IamRole_2068DED5.name}"
      },
      "root_testtest_Handler_IamRolePolicyAttachment_3716AC26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtest_Handler_IamRolePolicyAttachment_3716AC26"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_lambda_function": {
      "root_b_boncreateOnMessage5f62bd7c_70D99A46": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/Default",
            "uniqueId": "root_b_boncreateOnMessage5f62bd7c_70D99A46"
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
        "role": "${aws_iam_role.root_b_boncreateOnMessage5f62bd7c_IamRole_1BEA4B16.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_boncreateOnMessage5f62bd7c_S3Object_9F997A50.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_boncreateOnMessageaef3f85d_121A4A9F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/Default",
            "uniqueId": "root_b_boncreateOnMessageaef3f85d_121A4A9F"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.root_other_26932ECB.bucket}",
            "BUCKET_NAME_73fd1ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-aef3f85d-c8d1e844",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_create-OnMessage-aef3f85d-c8d1e844",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_boncreateOnMessageaef3f85d_IamRole_475CF5FA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_boncreateOnMessageaef3f85d_S3Object_760FBFBF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bondeleteOnMessage1c41a2ad_1B7EBCDB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/Default",
            "uniqueId": "root_b_bondeleteOnMessage1c41a2ad_1B7EBCDB"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.root_other_26932ECB.bucket}",
            "BUCKET_NAME_73fd1ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-1c41a2ad-c87344ee",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_delete-OnMessage-1c41a2ad-c87344ee",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_bondeleteOnMessage1c41a2ad_IamRole_0213C087.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bondeleteOnMessage1c41a2ad_S3Object_9B5C1849.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bondeleteOnMessage85baa474_75196EBF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/Default",
            "uniqueId": "root_b_bondeleteOnMessage85baa474_75196EBF"
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
        "role": "${aws_iam_role.root_b_bondeleteOnMessage85baa474_IamRole_B2CA0D60.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bondeleteOnMessage85baa474_S3Object_74CAE14A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bonupdateOnMessage3ed6033f_2E58D3F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/Default",
            "uniqueId": "root_b_bonupdateOnMessage3ed6033f_2E58D3F8"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.root_other_26932ECB.bucket}",
            "BUCKET_NAME_73fd1ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-3ed6033f-c8b563a2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_update-OnMessage-3ed6033f-c8b563a2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_bonupdateOnMessage3ed6033f_IamRole_C047755B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bonupdateOnMessage3ed6033f_S3Object_C4211E6D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bonupdateOnMessaged39e959f_0FE63553": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/Default",
            "uniqueId": "root_b_bonupdateOnMessaged39e959f_0FE63553"
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
        "role": "${aws_iam_role.root_b_bonupdateOnMessaged39e959f_IamRole_39D34E7E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bonupdateOnMessaged39e959f_S3Object_BC3A4D1D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_other_otheroncreateOnMessage0af389c6_07661950": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/Default",
            "uniqueId": "root_other_otheroncreateOnMessage0af389c6_07661950"
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
        "role": "${aws_iam_role.root_other_otheroncreateOnMessage0af389c6_IamRole_4D91EDAA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_other_otheroncreateOnMessage0af389c6_S3Object_74D1B706.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_other_otherondeleteOnMessage5e9bc889_8D4E63FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/Default",
            "uniqueId": "root_other_otherondeleteOnMessage5e9bc889_8D4E63FB"
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
        "role": "${aws_iam_role.root_other_otherondeleteOnMessage5e9bc889_IamRole_C7DEEFA6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_other_otherondeleteOnMessage5e9bc889_S3Object_87469733.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_other_otheronupdateOnMessage5290616b_4B9F6C48": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/Default",
            "uniqueId": "root_other_otheronupdateOnMessage5290616b_4B9F6C48"
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
        "role": "${aws_iam_role.root_other_otheronupdateOnMessage5290616b_IamRole_2068DED5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_other_otheronupdateOnMessage5290616b_S3Object_6FBC827C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testtest_Handler_046C3415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "root_testtest_Handler_046C3415"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_34279ead": "${aws_s3_bucket.root_b_6D0D1E6D.bucket}",
            "BUCKET_NAME_34279ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtest_Handler_S3Object_71CD07AC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_b_boncreateOnMessage5f62bd7c_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_73E4FD9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c",
            "uniqueId": "root_b_boncreateOnMessage5f62bd7c_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_73E4FD9E"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_boncreateOnMessage5f62bd7c_70D99A46.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_boncreateOnMessageaef3f85d_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_DE979ACB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c",
            "uniqueId": "root_b_boncreateOnMessageaef3f85d_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_DE979ACB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_boncreateOnMessageaef3f85d_121A4A9F.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_bondeleteOnMessage1c41a2ad_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_C1DD50F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01",
            "uniqueId": "root_b_bondeleteOnMessage1c41a2ad_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_C1DD50F4"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bondeleteOnMessage1c41a2ad_1B7EBCDB.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bondeleteOnMessage85baa474_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_C7B6A1B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01",
            "uniqueId": "root_b_bondeleteOnMessage85baa474_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_C7B6A1B3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bondeleteOnMessage85baa474_75196EBF.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bonupdateOnMessage3ed6033f_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_A7E077BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f",
            "uniqueId": "root_b_bonupdateOnMessage3ed6033f_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_A7E077BC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bonupdateOnMessage3ed6033f_2E58D3F8.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_b_bonupdateOnMessaged39e959f_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_955C6C6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f",
            "uniqueId": "root_b_bonupdateOnMessaged39e959f_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_955C6C6A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bonupdateOnMessaged39e959f_0FE63553.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_other_otheroncreateOnMessage0af389c6_InvokePermissionc89c79376e17b283a7d691aa1bda7fc8588302362f_767F2037": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/InvokePermission-c89c79376e17b283a7d691aa1bda7fc8588302362f",
            "uniqueId": "root_other_otheroncreateOnMessage0af389c6_InvokePermissionc89c79376e17b283a7d691aa1bda7fc8588302362f_767F2037"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_other_otheroncreateOnMessage0af389c6_07661950.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}"
      },
      "root_other_otherondeleteOnMessage5e9bc889_InvokePermissionc861917e84992c81ed683a3edeae66ebc879e0682a_04CAFDAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/InvokePermission-c861917e84992c81ed683a3edeae66ebc879e0682a",
            "uniqueId": "root_other_otherondeleteOnMessage5e9bc889_InvokePermissionc861917e84992c81ed683a3edeae66ebc879e0682a_04CAFDAA"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_other_otherondeleteOnMessage5e9bc889_8D4E63FB.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}"
      },
      "root_other_otheronupdateOnMessage5290616b_InvokePermissionc8f0227611913f709ca5218e4a4dd4cb2475593882_24372803": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/InvokePermission-c8f0227611913f709ca5218e4a4dd4cb2475593882",
            "uniqueId": "root_other_otheronupdateOnMessage5290616b_InvokePermissionc8f0227611913f709ca5218e4a4dd4cb2475593882_24372803"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_other_otheronupdateOnMessage5290616b_4B9F6C48.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_other_otheronupdate_3B763057.arn}"
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
      },
      "root_b_6D0D1E6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/Default",
            "uniqueId": "root_b_6D0D1E6D"
          }
        },
        "bucket_prefix": "b-c81aa40d-",
        "force_destroy": false
      },
      "root_other_26932ECB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/Default",
            "uniqueId": "root_other_26932ECB"
          }
        },
        "bucket_prefix": "other-c87420a2-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "root_b_S3BucketNotification_DA757190": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/S3BucketNotification",
            "uniqueId": "root_b_S3BucketNotification_DA757190"
          }
        },
        "bucket": "${aws_s3_bucket.root_b_6D0D1E6D.id}",
        "depends_on": [
          "aws_sns_topic_policy.root_b_bondelete_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_5700B364",
          "aws_sns_topic_policy.root_b_bonupdate_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_53C55984",
          "aws_sns_topic_policy.root_b_boncreate_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_C218A49E"
        ],
        "topic": [
          {
            "events": ["s3:ObjectRemoved:*"],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
          },
          {
            "events": ["s3:ObjectCreated:Post"],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
          },
          {
            "events": ["s3:ObjectCreated:Put"],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
          }
        ]
      },
      "root_other_S3BucketNotification_C16CA005": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/S3BucketNotification",
            "uniqueId": "root_other_S3BucketNotification_C16CA005"
          }
        },
        "bucket": "${aws_s3_bucket.root_other_26932ECB.id}",
        "depends_on": [
          "aws_sns_topic_policy.root_other_otheroncreate_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_432AF88B",
          "aws_sns_topic_policy.root_other_otheronupdate_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_18B527D9",
          "aws_sns_topic_policy.root_other_otherondelete_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_029C6FE9"
        ],
        "topic": [
          {
            "events": ["s3:ObjectCreated:Put"],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}"
          },
          {
            "events": ["s3:ObjectCreated:Post"],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.root_other_otheronupdate_3B763057.arn}"
          },
          {
            "events": ["s3:ObjectRemoved:*"],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_b_PublicAccessBlock_F66C0464": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/PublicAccessBlock",
            "uniqueId": "root_b_PublicAccessBlock_F66C0464"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_b_6D0D1E6D.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_other_PublicAccessBlock_E919F15F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/PublicAccessBlock",
            "uniqueId": "root_other_PublicAccessBlock_E919F15F"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_other_26932ECB.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_b_Encryption_2316317F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/Encryption",
            "uniqueId": "root_b_Encryption_2316317F"
          }
        },
        "bucket": "${aws_s3_bucket.root_b_6D0D1E6D.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_other_Encryption_9AA7D331": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/Encryption",
            "uniqueId": "root_other_Encryption_9AA7D331"
          }
        },
        "bucket": "${aws_s3_bucket.root_other_26932ECB.bucket}",
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
      "root_b_boncreateOnMessage5f62bd7c_S3Object_9F997A50": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-5f62bd7c/S3Object",
            "uniqueId": "root_b_boncreateOnMessage5f62bd7c_S3Object_9F997A50"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_boncreateOnMessageaef3f85d_S3Object_760FBFBF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-aef3f85d/S3Object",
            "uniqueId": "root_b_boncreateOnMessageaef3f85d_S3Object_760FBFBF"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bondeleteOnMessage1c41a2ad_S3Object_9B5C1849": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-1c41a2ad/S3Object",
            "uniqueId": "root_b_bondeleteOnMessage1c41a2ad_S3Object_9B5C1849"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bondeleteOnMessage85baa474_S3Object_74CAE14A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-85baa474/S3Object",
            "uniqueId": "root_b_bondeleteOnMessage85baa474_S3Object_74CAE14A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bonupdateOnMessage3ed6033f_S3Object_C4211E6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-3ed6033f/S3Object",
            "uniqueId": "root_b_bonupdateOnMessage3ed6033f_S3Object_C4211E6D"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bonupdateOnMessaged39e959f_S3Object_BC3A4D1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-d39e959f/S3Object",
            "uniqueId": "root_b_bonupdateOnMessaged39e959f_S3Object_BC3A4D1D"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_other_otheroncreateOnMessage0af389c6_S3Object_74D1B706": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-0af389c6/S3Object",
            "uniqueId": "root_other_otheroncreateOnMessage0af389c6_S3Object_74D1B706"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_other_otherondeleteOnMessage5e9bc889_S3Object_87469733": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-5e9bc889/S3Object",
            "uniqueId": "root_other_otherondeleteOnMessage5e9bc889_S3Object_87469733"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_other_otheronupdateOnMessage5290616b_S3Object_6FBC827C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-5290616b/S3Object",
            "uniqueId": "root_other_otheronupdateOnMessage5290616b_S3Object_6FBC827C"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testtest_Handler_S3Object_71CD07AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "root_testtest_Handler_S3Object_71CD07AC"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_b_boncreate_9124D168": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/Default",
            "uniqueId": "root_b_boncreate_9124D168"
          }
        },
        "name": "b-on_create-c8c7ecaf"
      },
      "root_b_bondelete_357A37C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/Default",
            "uniqueId": "root_b_bondelete_357A37C8"
          }
        },
        "name": "b-on_delete-c8f3ce18"
      },
      "root_b_bonupdate_F11B4439": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/Default",
            "uniqueId": "root_b_bonupdate_F11B4439"
          }
        },
        "name": "b-on_update-c8d765d0"
      },
      "root_other_otheroncreate_DCA3D2DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/Default",
            "uniqueId": "root_other_otheroncreate_DCA3D2DD"
          }
        },
        "name": "other-on_create-c89c7937"
      },
      "root_other_otherondelete_7CCB8682": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/Default",
            "uniqueId": "root_other_otherondelete_7CCB8682"
          }
        },
        "name": "other-on_delete-c861917e"
      },
      "root_other_otheronupdate_3B763057": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/Default",
            "uniqueId": "root_other_otheronupdate_3B763057"
          }
        },
        "name": "other-on_update-c8f02276"
      }
    },
    "aws_sns_topic_policy": {
      "root_b_boncreate_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_C218A49E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "root_b_boncreate_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_C218A49E"
          }
        },
        "arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_b_boncreate_9124D168.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\"}}}]}"
      },
      "root_b_bondelete_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_5700B364": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "root_b_bondelete_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_5700B364"
          }
        },
        "arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_b_bondelete_357A37C8.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\"}}}]}"
      },
      "root_b_bonupdate_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_53C55984": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "root_b_bonupdate_PublishPermissionc81aa40d099e0812205448708df27e482b34279ead_53C55984"
          }
        },
        "arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_b_bonupdate_F11B4439.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\"}}}]}"
      },
      "root_other_otheroncreate_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_432AF88B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "root_other_otheroncreate_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_432AF88B"
          }
        },
        "arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_other_26932ECB.arn}\"}}}]}"
      },
      "root_other_otherondelete_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_029C6FE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "root_other_otherondelete_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_029C6FE9"
          }
        },
        "arn": "${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_other_26932ECB.arn}\"}}}]}"
      },
      "root_other_otheronupdate_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_18B527D9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "root_other_otheronupdate_PublishPermissionc87420a27eeb4720af7eb13d276c8124ea73fd1ead_18B527D9"
          }
        },
        "arn": "${aws_sns_topic.root_other_otheronupdate_3B763057.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_other_otheronupdate_3B763057.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_other_26932ECB.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "root_b_boncreate_boncreateTopicSubscription5f62bd7c_A3490670": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/b-on_create-TopicSubscription-5f62bd7c",
            "uniqueId": "root_b_boncreate_boncreateTopicSubscription5f62bd7c_A3490670"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_boncreateOnMessage5f62bd7c_70D99A46.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_boncreate_boncreateTopicSubscriptionaef3f85d_4A67ACF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/b-on_create-TopicSubscription-aef3f85d",
            "uniqueId": "root_b_boncreate_boncreateTopicSubscriptionaef3f85d_4A67ACF1"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_boncreateOnMessageaef3f85d_121A4A9F.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_bondelete_bondeleteTopicSubscription1c41a2ad_E59BBAB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/b-on_delete-TopicSubscription-1c41a2ad",
            "uniqueId": "root_b_bondelete_bondeleteTopicSubscription1c41a2ad_E59BBAB4"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bondeleteOnMessage1c41a2ad_1B7EBCDB.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bondelete_bondeleteTopicSubscription85baa474_A6194648": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/b-on_delete-TopicSubscription-85baa474",
            "uniqueId": "root_b_bondelete_bondeleteTopicSubscription85baa474_A6194648"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bondeleteOnMessage85baa474_75196EBF.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bonupdate_bonupdateTopicSubscription3ed6033f_53AFA52A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/b-on_update-TopicSubscription-3ed6033f",
            "uniqueId": "root_b_bonupdate_bonupdateTopicSubscription3ed6033f_53AFA52A"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bonupdateOnMessage3ed6033f_2E58D3F8.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_b_bonupdate_bonupdateTopicSubscriptiond39e959f_840D9024": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/b-on_update-TopicSubscription-d39e959f",
            "uniqueId": "root_b_bonupdate_bonupdateTopicSubscriptiond39e959f_840D9024"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bonupdateOnMessaged39e959f_0FE63553.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_other_otheroncreate_otheroncreateTopicSubscription0af389c6_D9C3CFE7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/other-on_create-TopicSubscription-0af389c6",
            "uniqueId": "root_other_otheroncreate_otheroncreateTopicSubscription0af389c6_D9C3CFE7"
          }
        },
        "endpoint": "${aws_lambda_function.root_other_otheroncreateOnMessage0af389c6_07661950.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}"
      },
      "root_other_otherondelete_otherondeleteTopicSubscription5e9bc889_CB3BCEA2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/other-on_delete-TopicSubscription-5e9bc889",
            "uniqueId": "root_other_otherondelete_otherondeleteTopicSubscription5e9bc889_CB3BCEA2"
          }
        },
        "endpoint": "${aws_lambda_function.root_other_otherondeleteOnMessage5e9bc889_8D4E63FB.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}"
      },
      "root_other_otheronupdate_otheronupdateTopicSubscription5290616b_778053D8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/other-on_update-TopicSubscription-5290616b",
            "uniqueId": "root_other_otheronupdate_otheronupdateTopicSubscription5290616b_778053D8"
          }
        },
        "endpoint": "${aws_lambda_function.root_other_otheronupdateOnMessage5290616b_4B9F6C48.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_other_otheronupdate_3B763057.arn}"
      }
    }
  }
}
```

## preflight.js

```js
const $stdlib = require("@winglang/sdk");
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require("@winglang/sdk").cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
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
      constructor(scope, id) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
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
      constructor(scope, id) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
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
      constructor(scope, id) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const other_client = context._lift(other);
        const std_JsonClient = std.Json._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            other: ${other_client},
            std_Json: ${std_JsonClient.text},
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
      constructor(scope, id) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
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
      constructor(scope, id) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
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
    const other = this.node.root.newAbstract(
      "@winglang/sdk.cloud.Bucket",
      this,
      "other"
    );
    const b = this.node.root.newAbstract(
      "@winglang/sdk.cloud.Bucket",
      this,
      "b"
    );
    b.onDelete(new $Closure1(this, "$Closure1"));
    b.onUpdate(new $Closure2(this, "$Closure2"));
    b.onCreate(new $Closure3(this, "$Closure3"));
    b.onEvent(new $Closure4(this, "$Closure4"));
    other.onEvent(new $Closure5(this, "$Closure5"));
    this.node.root.new(
      "@winglang/sdk.std.Test",
      std.Test,
      this,
      "test:test",
      new $Closure6(this, "$Closure6")
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({
      outdir: $outdir,
      name: "bucket_events",
      plugins: $plugins,
      isTestEnvironment: $wing_is_test,
    });
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

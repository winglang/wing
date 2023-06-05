# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log(`deleted ${key}`)};
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({  }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log(`updated ${key}`)};
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({  }) {
  class $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log(`created ${key}`)};
    }
  }
  return $Inflight3;
}

```

## clients/$Inflight4.inflight.js
```js
module.exports = function({ other, std_Json }) {
  class $Inflight4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      {console.log(`last key ${key}`)};
      (await other.put("last_operation_key",((args) => { return JSON.stringify(args[0], null, args[1]) })([key])));
    }
  }
  return $Inflight4;
}

```

## clients/$Inflight5.inflight.js
```js
module.exports = function({  }) {
  class $Inflight5 {
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
  return $Inflight5;
}

```

## clients/$Inflight6.inflight.js
```js
module.exports = function({ b }) {
  class $Inflight6 {
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
  return $Inflight6;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.root_testtest_Handler_046C3415.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_b_boncreateOnMessage8588493f_IamRole_F4D6A039": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-8588493f/IamRole",
            "uniqueId": "root_b_boncreateOnMessage8588493f_IamRole_F4D6A039"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_boncreateOnMessage88f6f7aa_IamRole_94993205": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/IamRole",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_IamRole_94993205"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bondeleteOnMessage6e8b2f6c_IamRole_935D5999": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/IamRole",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_IamRole_935D5999"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bondeleteOnMessagedece1815_IamRole_0A3F666E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/IamRole",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_IamRole_0A3F666E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bonupdateOnMessage8b441417_IamRole_5980156B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/IamRole",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_IamRole_5980156B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_b_bonupdateOnMessagec7d8cc3e_IamRole_1B0D38A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/IamRole",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_IamRole_1B0D38A4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_other_otheroncreateOnMessage1a259cac_IamRole_B903D23C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-1a259cac/IamRole",
            "uniqueId": "root_other_otheroncreateOnMessage1a259cac_IamRole_B903D23C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_other_otherondeleteOnMessage2e31a750_IamRole_45188816": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-2e31a750/IamRole",
            "uniqueId": "root_other_otherondeleteOnMessage2e31a750_IamRole_45188816"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_other_otheronupdateOnMessage02fb2142_IamRole_9D20DEAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-02fb2142/IamRole",
            "uniqueId": "root_other_otheronupdateOnMessage02fb2142_IamRole_9D20DEAB"
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
      "root_b_boncreateOnMessage8588493f_IamRolePolicy_369E4FFE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-8588493f/IamRolePolicy",
            "uniqueId": "root_b_boncreateOnMessage8588493f_IamRolePolicy_369E4FFE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_other_26932ECB.arn}\",\"${aws_s3_bucket.root_other_26932ECB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_boncreateOnMessage8588493f_IamRole_F4D6A039.name}"
      },
      "root_b_boncreateOnMessage88f6f7aa_IamRolePolicy_78821956": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/IamRolePolicy",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_IamRolePolicy_78821956"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_b_boncreateOnMessage88f6f7aa_IamRole_94993205.name}"
      },
      "root_b_bondeleteOnMessage6e8b2f6c_IamRolePolicy_B77008FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/IamRolePolicy",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_IamRolePolicy_B77008FA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage6e8b2f6c_IamRole_935D5999.name}"
      },
      "root_b_bondeleteOnMessagedece1815_IamRolePolicy_211100A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/IamRolePolicy",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_IamRolePolicy_211100A3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_other_26932ECB.arn}\",\"${aws_s3_bucket.root_other_26932ECB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bondeleteOnMessagedece1815_IamRole_0A3F666E.name}"
      },
      "root_b_bonupdateOnMessage8b441417_IamRolePolicy_BD9C58B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/IamRolePolicy",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_IamRolePolicy_BD9C58B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_b_bonupdateOnMessage8b441417_IamRole_5980156B.name}"
      },
      "root_b_bonupdateOnMessagec7d8cc3e_IamRolePolicy_F62B56EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/IamRolePolicy",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_IamRolePolicy_F62B56EB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_other_26932ECB.arn}\",\"${aws_s3_bucket.root_other_26932ECB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bonupdateOnMessagec7d8cc3e_IamRole_1B0D38A4.name}"
      },
      "root_other_otheroncreateOnMessage1a259cac_IamRolePolicy_09BCADB5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-1a259cac/IamRolePolicy",
            "uniqueId": "root_other_otheroncreateOnMessage1a259cac_IamRolePolicy_09BCADB5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_other_otheroncreateOnMessage1a259cac_IamRole_B903D23C.name}"
      },
      "root_other_otherondeleteOnMessage2e31a750_IamRolePolicy_E49F85EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-2e31a750/IamRolePolicy",
            "uniqueId": "root_other_otherondeleteOnMessage2e31a750_IamRolePolicy_E49F85EF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_other_otherondeleteOnMessage2e31a750_IamRole_45188816.name}"
      },
      "root_other_otheronupdateOnMessage02fb2142_IamRolePolicy_88E0A249": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-02fb2142/IamRolePolicy",
            "uniqueId": "root_other_otheronupdateOnMessage02fb2142_IamRolePolicy_88E0A249"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_other_otheronupdateOnMessage02fb2142_IamRole_9D20DEAB.name}"
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
      "root_b_boncreateOnMessage8588493f_IamRolePolicyAttachment_AB6CFD0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-8588493f/IamRolePolicyAttachment",
            "uniqueId": "root_b_boncreateOnMessage8588493f_IamRolePolicyAttachment_AB6CFD0F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_boncreateOnMessage8588493f_IamRole_F4D6A039.name}"
      },
      "root_b_boncreateOnMessage88f6f7aa_IamRolePolicyAttachment_30B89166": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/IamRolePolicyAttachment",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_IamRolePolicyAttachment_30B89166"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_boncreateOnMessage88f6f7aa_IamRole_94993205.name}"
      },
      "root_b_bondeleteOnMessage6e8b2f6c_IamRolePolicyAttachment_921DE1E1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/IamRolePolicyAttachment",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_IamRolePolicyAttachment_921DE1E1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage6e8b2f6c_IamRole_935D5999.name}"
      },
      "root_b_bondeleteOnMessagedece1815_IamRolePolicyAttachment_CB99281E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/IamRolePolicyAttachment",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_IamRolePolicyAttachment_CB99281E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bondeleteOnMessagedece1815_IamRole_0A3F666E.name}"
      },
      "root_b_bonupdateOnMessage8b441417_IamRolePolicyAttachment_C0FFE64D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/IamRolePolicyAttachment",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_IamRolePolicyAttachment_C0FFE64D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bonupdateOnMessage8b441417_IamRole_5980156B.name}"
      },
      "root_b_bonupdateOnMessagec7d8cc3e_IamRolePolicyAttachment_7397C827": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/IamRolePolicyAttachment",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_IamRolePolicyAttachment_7397C827"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_b_bonupdateOnMessagec7d8cc3e_IamRole_1B0D38A4.name}"
      },
      "root_other_otheroncreateOnMessage1a259cac_IamRolePolicyAttachment_BEB96B79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-1a259cac/IamRolePolicyAttachment",
            "uniqueId": "root_other_otheroncreateOnMessage1a259cac_IamRolePolicyAttachment_BEB96B79"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_other_otheroncreateOnMessage1a259cac_IamRole_B903D23C.name}"
      },
      "root_other_otherondeleteOnMessage2e31a750_IamRolePolicyAttachment_3DF2EE2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-2e31a750/IamRolePolicyAttachment",
            "uniqueId": "root_other_otherondeleteOnMessage2e31a750_IamRolePolicyAttachment_3DF2EE2E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_other_otherondeleteOnMessage2e31a750_IamRole_45188816.name}"
      },
      "root_other_otheronupdateOnMessage02fb2142_IamRolePolicyAttachment_C33C61C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-02fb2142/IamRolePolicyAttachment",
            "uniqueId": "root_other_otheronupdateOnMessage02fb2142_IamRolePolicyAttachment_C33C61C5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_other_otheronupdateOnMessage02fb2142_IamRole_9D20DEAB.name}"
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
      "root_b_boncreateOnMessage8588493f_6AF46AC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-8588493f/Default",
            "uniqueId": "root_b_boncreateOnMessage8588493f_6AF46AC5"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.root_other_26932ECB.bucket}",
            "BUCKET_NAME_73fd1ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-8588493f-c8391419",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_create-OnMessage-8588493f-c8391419",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_boncreateOnMessage8588493f_IamRole_F4D6A039.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_boncreateOnMessage8588493f_S3Object_B05EA5EC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_boncreateOnMessage88f6f7aa_A82C913D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/Default",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_A82C913D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-88f6f7aa-c8cbe4b6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_create-OnMessage-88f6f7aa-c8cbe4b6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_boncreateOnMessage88f6f7aa_IamRole_94993205.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_boncreateOnMessage88f6f7aa_S3Object_27A1B997.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bondeleteOnMessage6e8b2f6c_82C0984B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/Default",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_82C0984B"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-6e8b2f6c-c876a85f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_delete-OnMessage-6e8b2f6c-c876a85f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_bondeleteOnMessage6e8b2f6c_IamRole_935D5999.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bondeleteOnMessage6e8b2f6c_S3Object_AA587BEA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bondeleteOnMessagedece1815_8EEE19F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/Default",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_8EEE19F8"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.root_other_26932ECB.bucket}",
            "BUCKET_NAME_73fd1ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-dece1815-c8cd8f35",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_delete-OnMessage-dece1815-c8cd8f35",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_bondeleteOnMessagedece1815_IamRole_0A3F666E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bondeleteOnMessagedece1815_S3Object_9F2FF12D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bonupdateOnMessage8b441417_03208454": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/Default",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_03208454"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-8b441417-c8f09598",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_update-OnMessage-8b441417-c8f09598",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_bonupdateOnMessage8b441417_IamRole_5980156B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bonupdateOnMessage8b441417_S3Object_E72D02CB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_b_bonupdateOnMessagec7d8cc3e_D4965D04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/Default",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_D4965D04"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.root_other_26932ECB.bucket}",
            "BUCKET_NAME_73fd1ead_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-c7d8cc3e-c8d485f7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-on_update-OnMessage-c7d8cc3e-c8d485f7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_b_bonupdateOnMessagec7d8cc3e_IamRole_1B0D38A4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_b_bonupdateOnMessagec7d8cc3e_S3Object_A082E479.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_other_otheroncreateOnMessage1a259cac_F29A80F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-1a259cac/Default",
            "uniqueId": "root_other_otheroncreateOnMessage1a259cac_F29A80F6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-on_create-OnMessage-1a259cac-c8bfa67e",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-on_create-OnMessage-1a259cac-c8bfa67e",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_other_otheroncreateOnMessage1a259cac_IamRole_B903D23C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_other_otheroncreateOnMessage1a259cac_S3Object_61C37281.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_other_otherondeleteOnMessage2e31a750_AC9B5F07": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-2e31a750/Default",
            "uniqueId": "root_other_otherondeleteOnMessage2e31a750_AC9B5F07"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-on_delete-OnMessage-2e31a750-c8019b47",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-on_delete-OnMessage-2e31a750-c8019b47",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_other_otherondeleteOnMessage2e31a750_IamRole_45188816.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_other_otherondeleteOnMessage2e31a750_S3Object_5A3687E9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_other_otheronupdateOnMessage02fb2142_389A5E43": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-02fb2142/Default",
            "uniqueId": "root_other_otheronupdateOnMessage02fb2142_389A5E43"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-on_update-OnMessage-02fb2142-c8912a6d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-on_update-OnMessage-02fb2142-c8912a6d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_other_otheronupdateOnMessage02fb2142_IamRole_9D20DEAB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_other_otheronupdateOnMessage02fb2142_S3Object_7641A6CE.key}",
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
      "root_b_boncreateOnMessage8588493f_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_697A4844": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-8588493f/InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c",
            "uniqueId": "root_b_boncreateOnMessage8588493f_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_697A4844"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_boncreateOnMessage8588493f_6AF46AC5.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_boncreateOnMessage88f6f7aa_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_04CC6615": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/InvokePermission-c8c7ecaf2af41d192271c693adb3c6463c67766a7c",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_InvokePermissionc8c7ecaf2af41d192271c693adb3c6463c67766a7c_04CC6615"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_boncreateOnMessage88f6f7aa_A82C913D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_bondeleteOnMessage6e8b2f6c_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_63066867": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_63066867"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bondeleteOnMessage6e8b2f6c_82C0984B.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bondeleteOnMessagedece1815_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_43CFBAB3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/InvokePermission-c8f3ce18433e918d0e14bd6cd9c27a768f92348b01",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_InvokePermissionc8f3ce18433e918d0e14bd6cd9c27a768f92348b01_43CFBAB3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bondeleteOnMessagedece1815_8EEE19F8.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bonupdateOnMessage8b441417_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_4524D46D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_4524D46D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bonupdateOnMessage8b441417_03208454.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_b_bonupdateOnMessagec7d8cc3e_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_8C1620C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/InvokePermission-c8d765d031212754dea0aa3cfb7d3227a296fffd4f",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_InvokePermissionc8d765d031212754dea0aa3cfb7d3227a296fffd4f_8C1620C4"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_b_bonupdateOnMessagec7d8cc3e_D4965D04.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_other_otheroncreateOnMessage1a259cac_InvokePermissionc89c79376e17b283a7d691aa1bda7fc8588302362f_55950F7F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-1a259cac/InvokePermission-c89c79376e17b283a7d691aa1bda7fc8588302362f",
            "uniqueId": "root_other_otheroncreateOnMessage1a259cac_InvokePermissionc89c79376e17b283a7d691aa1bda7fc8588302362f_55950F7F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_other_otheroncreateOnMessage1a259cac_F29A80F6.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}"
      },
      "root_other_otherondeleteOnMessage2e31a750_InvokePermissionc861917e84992c81ed683a3edeae66ebc879e0682a_2906F667": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-2e31a750/InvokePermission-c861917e84992c81ed683a3edeae66ebc879e0682a",
            "uniqueId": "root_other_otherondeleteOnMessage2e31a750_InvokePermissionc861917e84992c81ed683a3edeae66ebc879e0682a_2906F667"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_other_otherondeleteOnMessage2e31a750_AC9B5F07.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}"
      },
      "root_other_otheronupdateOnMessage02fb2142_InvokePermissionc8f0227611913f709ca5218e4a4dd4cb2475593882_BA1E9B29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-02fb2142/InvokePermission-c8f0227611913f709ca5218e4a4dd4cb2475593882",
            "uniqueId": "root_other_otheronupdateOnMessage02fb2142_InvokePermissionc8f0227611913f709ca5218e4a4dd4cb2475593882_BA1E9B29"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_other_otheronupdateOnMessage02fb2142_389A5E43.function_name}",
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
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
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
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.root_other_otheronupdate_3B763057.arn}"
          },
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
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
      "root_b_boncreateOnMessage8588493f_S3Object_B05EA5EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-8588493f/S3Object",
            "uniqueId": "root_b_boncreateOnMessage8588493f_S3Object_B05EA5EC"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_boncreateOnMessage88f6f7aa_S3Object_27A1B997": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/S3Object",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_S3Object_27A1B997"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bondeleteOnMessage6e8b2f6c_S3Object_AA587BEA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/S3Object",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_S3Object_AA587BEA"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bondeleteOnMessagedece1815_S3Object_9F2FF12D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/S3Object",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_S3Object_9F2FF12D"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bonupdateOnMessage8b441417_S3Object_E72D02CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/S3Object",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_S3Object_E72D02CB"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_b_bonupdateOnMessagec7d8cc3e_S3Object_A082E479": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/S3Object",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_S3Object_A082E479"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_other_otheroncreateOnMessage1a259cac_S3Object_61C37281": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create-OnMessage-1a259cac/S3Object",
            "uniqueId": "root_other_otheroncreateOnMessage1a259cac_S3Object_61C37281"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_other_otherondeleteOnMessage2e31a750_S3Object_5A3687E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete-OnMessage-2e31a750/S3Object",
            "uniqueId": "root_other_otherondeleteOnMessage2e31a750_S3Object_5A3687E9"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_other_otheronupdateOnMessage02fb2142_S3Object_7641A6CE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update-OnMessage-02fb2142/S3Object",
            "uniqueId": "root_other_otheronupdateOnMessage02fb2142_S3Object_7641A6CE"
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
      "root_b_boncreate_boncreateTopicSubscription8588493f_C085779F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/b-on_create-TopicSubscription-8588493f",
            "uniqueId": "root_b_boncreate_boncreateTopicSubscription8588493f_C085779F"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_boncreateOnMessage8588493f_6AF46AC5.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_boncreate_boncreateTopicSubscription88f6f7aa_DBAF4927": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create/b-on_create-TopicSubscription-88f6f7aa",
            "uniqueId": "root_b_boncreate_boncreateTopicSubscription88f6f7aa_DBAF4927"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_boncreateOnMessage88f6f7aa_A82C913D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_boncreate_9124D168.arn}"
      },
      "root_b_bondelete_bondeleteTopicSubscription6e8b2f6c_298F9511": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/b-on_delete-TopicSubscription-6e8b2f6c",
            "uniqueId": "root_b_bondelete_bondeleteTopicSubscription6e8b2f6c_298F9511"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bondeleteOnMessage6e8b2f6c_82C0984B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bondelete_bondeleteTopicSubscriptiondece1815_43815558": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete/b-on_delete-TopicSubscription-dece1815",
            "uniqueId": "root_b_bondelete_bondeleteTopicSubscriptiondece1815_43815558"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bondeleteOnMessagedece1815_8EEE19F8.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bondelete_357A37C8.arn}"
      },
      "root_b_bonupdate_bonupdateTopicSubscription8b441417_158B25AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/b-on_update-TopicSubscription-8b441417",
            "uniqueId": "root_b_bonupdate_bonupdateTopicSubscription8b441417_158B25AC"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bonupdateOnMessage8b441417_03208454.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_b_bonupdate_bonupdateTopicSubscriptionc7d8cc3e_113BB07E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update/b-on_update-TopicSubscription-c7d8cc3e",
            "uniqueId": "root_b_bonupdate_bonupdateTopicSubscriptionc7d8cc3e_113BB07E"
          }
        },
        "endpoint": "${aws_lambda_function.root_b_bonupdateOnMessagec7d8cc3e_D4965D04.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_b_bonupdate_F11B4439.arn}"
      },
      "root_other_otheroncreate_otheroncreateTopicSubscription1a259cac_194B9C27": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_create/other-on_create-TopicSubscription-1a259cac",
            "uniqueId": "root_other_otheroncreate_otheroncreateTopicSubscription1a259cac_194B9C27"
          }
        },
        "endpoint": "${aws_lambda_function.root_other_otheroncreateOnMessage1a259cac_F29A80F6.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_other_otheroncreate_DCA3D2DD.arn}"
      },
      "root_other_otherondelete_otherondeleteTopicSubscription2e31a750_5FE2D81D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_delete/other-on_delete-TopicSubscription-2e31a750",
            "uniqueId": "root_other_otherondelete_otherondeleteTopicSubscription2e31a750_5FE2D81D"
          }
        },
        "endpoint": "${aws_lambda_function.root_other_otherondeleteOnMessage2e31a750_AC9B5F07.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_other_otherondelete_7CCB8682.arn}"
      },
      "root_other_otheronupdate_otheronupdateTopicSubscription02fb2142_AA407751": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-on_update/other-on_update-TopicSubscription-02fb2142",
            "uniqueId": "root_other_otheronupdate_otheronupdateTopicSubscription02fb2142_AA407751"
          }
        },
        "endpoint": "${aws_lambda_function.root_other_otheronupdateOnMessage02fb2142_389A5E43.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_other_otheronupdate_3B763057.arn}"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
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
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
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
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight3Client = ${$Inflight3._toInflightType(this).text};
            const client = new $Inflight3Client({
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
    class $Inflight4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight4.inflight.js";
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
            const $Inflight4Client = ${$Inflight4._toInflightType(this).text};
            const client = new $Inflight4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight4._registerBindObject(other, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight4._registerBindObject(other, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight5.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight5Client = ${$Inflight5._toInflightType(this).text};
            const client = new $Inflight5Client({
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
    class $Inflight6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight6.inflight.js";
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
            const $Inflight6Client = ${$Inflight6._toInflightType(this).text};
            const client = new $Inflight6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight6._registerBindObject(b, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight6._registerBindObject(b, host, ["delete", "put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const other = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"other");
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b");
    (b.onDelete(new $Inflight1(this,"$Inflight1")));
    (b.onUpdate(new $Inflight2(this,"$Inflight2")));
    (b.onCreate(new $Inflight3(this,"$Inflight3")));
    (b.onEvent(new $Inflight4(this,"$Inflight4")));
    (other.onEvent(new $Inflight5(this,"$Inflight5")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Inflight6(this,"$Inflight6"));
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


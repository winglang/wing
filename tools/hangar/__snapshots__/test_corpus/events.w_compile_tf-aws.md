# [events.w](../../../../examples/tests/valid/events.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight3;
}

```

## clients/$Inflight4.inflight.js
```js
module.exports = function({ counter }) {
  class $Inflight4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key)  {
      (await counter.inc());
    }
  }
  return $Inflight4;
}

```

## clients/$Inflight5.inflight.js
```js
module.exports = function({ counter, b }) {
  class $Inflight5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      class Predicate {
        constructor(counterVal)  {
          this.counterVal = counterVal;
        }
        counterVal;
        static async sleep(ms)  {
          return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(ms)
        }
        async assertion()  {
          return ((await counter.peek()) === this.counterVal);
        }
        async testAssertion()  {
          let i = 0;
          while ((i < 12)) {
            i = (i + 1);
            if ((await this.assertion())) {
              {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.assertion())'`)})((await this.assertion()))};
              return;
            }
            (await Predicate.sleep((1000 * 10)));
          }
          {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.assertion())'`)})((await this.assertion()))};
        }
      }
      (await b.put("a","1"));
      (await b.put("b","1"));
      (await b.put("c","1"));
      (await b.put("b","100"));
      (await b.delete("c"));
      (await new Predicate(10).testAssertion());
    }
  }
  return $Inflight5;
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
      "value": "[[\"root/Default/Default/counter is incremented 10 times\",\"${aws_lambda_function.root_counterisincremented10times_Handler_B5694BAC.arn}\"]]"
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
      "root_counterisincremented10times_Handler_IamRole_0E3BD780": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter is incremented 10 times/Handler/IamRole",
            "uniqueId": "root_counterisincremented10times_Handler_IamRole_0E3BD780"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_boncreateOnMessage8588493f_IamRole_F4D6A039.name}"
      },
      "root_b_boncreateOnMessage88f6f7aa_IamRolePolicy_78821956": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_create-OnMessage-88f6f7aa/IamRolePolicy",
            "uniqueId": "root_b_boncreateOnMessage88f6f7aa_IamRolePolicy_78821956"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_boncreateOnMessage88f6f7aa_IamRole_94993205.name}"
      },
      "root_b_bondeleteOnMessage6e8b2f6c_IamRolePolicy_B77008FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-6e8b2f6c/IamRolePolicy",
            "uniqueId": "root_b_bondeleteOnMessage6e8b2f6c_IamRolePolicy_B77008FA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bondeleteOnMessage6e8b2f6c_IamRole_935D5999.name}"
      },
      "root_b_bondeleteOnMessagedece1815_IamRolePolicy_211100A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_delete-OnMessage-dece1815/IamRolePolicy",
            "uniqueId": "root_b_bondeleteOnMessagedece1815_IamRolePolicy_211100A3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bondeleteOnMessagedece1815_IamRole_0A3F666E.name}"
      },
      "root_b_bonupdateOnMessage8b441417_IamRolePolicy_BD9C58B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-8b441417/IamRolePolicy",
            "uniqueId": "root_b_bonupdateOnMessage8b441417_IamRolePolicy_BD9C58B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bonupdateOnMessage8b441417_IamRole_5980156B.name}"
      },
      "root_b_bonupdateOnMessagec7d8cc3e_IamRolePolicy_F62B56EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-on_update-OnMessage-c7d8cc3e/IamRolePolicy",
            "uniqueId": "root_b_bonupdateOnMessagec7d8cc3e_IamRolePolicy_F62B56EB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_b_bonupdateOnMessagec7d8cc3e_IamRole_1B0D38A4.name}"
      },
      "root_counterisincremented10times_Handler_IamRolePolicy_0BB48888": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter is incremented 10 times/Handler/IamRolePolicy",
            "uniqueId": "root_counterisincremented10times_Handler_IamRolePolicy_0BB48888"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\",\"${aws_s3_bucket.root_b_6D0D1E6D.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_b_6D0D1E6D.arn}\",\"${aws_s3_bucket.root_b_6D0D1E6D.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_counterisincremented10times_Handler_IamRole_0E3BD780.name}"
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
      "root_counterisincremented10times_Handler_IamRolePolicyAttachment_C7BCBB0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter is incremented 10 times/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_counterisincremented10times_Handler_IamRolePolicyAttachment_C7BCBB0A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_counterisincremented10times_Handler_IamRole_0E3BD780.name}"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-8588493f-c8391419"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "b-on_create-OnMessage-88f6f7aa-c8cbe4b6"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-6e8b2f6c-c876a85f"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "b-on_delete-OnMessage-dece1815-c8cd8f35"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-8b441417-c8f09598"
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
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "b-on_update-OnMessage-c7d8cc3e-c8d485f7"
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
      "root_counterisincremented10times_Handler_B5694BAC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter is incremented 10 times/Handler/Default",
            "uniqueId": "root_counterisincremented10times_Handler_B5694BAC"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_34279ead": "${aws_s3_bucket.root_b_6D0D1E6D.bucket}",
            "BUCKET_NAME_34279ead_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "Handler-c81a387c"
          }
        },
        "function_name": "Handler-c81a387c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_counterisincremented10times_Handler_IamRole_0E3BD780.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_counterisincremented10times_Handler_S3Object_4916C35D.key}",
        "timeout": 180,
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
      "root_counterisincremented10times_Handler_S3Object_4916C35D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter is incremented 10 times/Handler/S3Object",
            "uniqueId": "root_counterisincremented10times_Handler_S3Object_4916C35D"
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
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Inflight1._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(counter, host, ["inc"]);
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
        const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Inflight2._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight2._registerBindObject(counter, host, ["inc"]);
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
        const self_client_path = "./clients/$Inflight3.inflight.js".replace(/\\/g, "/");
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Inflight3._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight3._registerBindObject(counter, host, ["inc"]);
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
        const self_client_path = "./clients/$Inflight4.inflight.js".replace(/\\/g, "/");
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Inflight4._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight4._registerBindObject(counter, host, ["inc"]);
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
        const self_client_path = "./clients/$Inflight5.inflight.js".replace(/\\/g, "/");
        const counter_client = context._lift(counter);
        const b_client = context._lift(b);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
            b: ${b_client},
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
          $Inflight5._registerBindObject(b, host, []);
          $Inflight5._registerBindObject(counter, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight5._registerBindObject(b, host, ["delete", "put"]);
          $Inflight5._registerBindObject(counter, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (b.onDelete(new $Inflight1(this,"$Inflight1")));
    (b.onUpdate(new $Inflight2(this,"$Inflight2")));
    (b.onCreate(new $Inflight3(this,"$Inflight3")));
    (b.onEvent(new $Inflight4(this,"$Inflight4")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"counter is incremented 10 times",new $Inflight5(this,"$Inflight5"),{
    "timeout": $stdlib.std.Duration.fromSeconds(180),}
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "events", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


# [events.test.w](../../../../../../examples/tests/sdk_tests/bucket/events.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $idsCounter, $table }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, operation, source) {
      (await $table.insert(String.raw({ raw: ["", ""] }, (await $idsCounter.inc())), ({"key": key, "operation": operation, "source": String.raw({ raw: ["", ""] }, source)})));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $logHistory(key, "onDelete()", $Source.anyEvent));
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.$Closure3-1.cjs
```cjs
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $logHistory(key, "onUpdate()", $Source.anyEvent));
    }
  }
  return $Closure3;
}
//# sourceMappingURL=./inflight.$Closure3-1.cjs.map
```

## inflight.$Closure4-1.cjs
```cjs
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $logHistory(key, "onCreate()", $Source.anyEvent));
    }
  }
  return $Closure4;
}
//# sourceMappingURL=./inflight.$Closure4-1.cjs.map
```

## inflight.$Closure5-1.cjs
```cjs
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, event) {
      (await $logHistory(key, String.raw({ raw: ["", "()"] }, event), $Source.onEvent));
    }
  }
  return $Closure5;
}
//# sourceMappingURL=./inflight.$Closure5-1.cjs.map
```

## inflight.$Closure6-1.cjs
```cjs
"use strict";
module.exports = function({ $std_Duration, $util_Util }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(pred) {
      let i = 0;
      while ((i < 12)) {
        if ((await pred())) {
          return true;
        }
        (await $util_Util.sleep((await $std_Duration.fromSeconds(10))));
        i = (i + 1);
      }
      return false;
    }
  }
  return $Closure6;
}
//# sourceMappingURL=./inflight.$Closure6-1.cjs.map
```

## inflight.$Closure7-1.cjs
```cjs
"use strict";
module.exports = function({ $table }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(opts) {
      return async () => {
        let count = 0;
        for (const u of (await $table.list())) {
          if ((((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(u, "key"),opts.key)) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(u, "operation"),opts.type))) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(u, "source"),String.raw({ raw: ["", ""] }, opts.source))))) {
            count = (count + 1);
          }
        }
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(count,opts.count));
      };
    }
  }
  return $Closure7;
}
//# sourceMappingURL=./inflight.$Closure7-1.cjs.map
```

## inflight.$Closure8-1.cjs
```cjs
"use strict";
module.exports = function({ $Source, $b, $checkHitCount, $util_Util, $wait }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("a", "1"));
      (await $b.put("b", "1"));
      (await $b.put("c", "1"));
      (await $b.put("b", "100"));
      (await $b.delete("c"));
      if ((((a,b) => { try { return require('assert').notDeepStrictEqual(a,b) === undefined; } catch { return false; } })((await $util_Util.env("WING_TARGET")),"tf-aws"))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"a\", type: \"onCreate()\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "a", type: "onCreate()", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"onCreate()\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "onCreate()", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"onCreate()\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "onCreate()", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"a\", type: \"onCreate()\", source: Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "a", type: "onCreate()", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"onCreate()\", source:  Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "onCreate()", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"onCreate()\", source:  Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "onCreate()", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"onUpdate()\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "onUpdate()", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"onDelete()\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "onDelete()", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"onUpdate()\", source: Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "onUpdate()", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"onDelete()\", source: Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "onDelete()", source: $Source.onEvent, count: 1 })))))};
      }
    }
  }
  return $Closure8;
}
//# sourceMappingURL=./inflight.$Closure8-1.cjs.map
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
      "cloudBucket_oncreate-OnMessage0_CloudwatchLogGroup_F81FF873": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_CloudwatchLogGroup_F81FF873"
          }
        },
        "name": "/aws/lambda/oncreate-OnMessage0-c835636b",
        "retention_in_days": 30
      },
      "cloudBucket_oncreate-OnMessage1_CloudwatchLogGroup_FA18C2EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_CloudwatchLogGroup_FA18C2EA"
          }
        },
        "name": "/aws/lambda/oncreate-OnMessage1-c8d72382",
        "retention_in_days": 30
      },
      "cloudBucket_ondelete-OnMessage0_CloudwatchLogGroup_55334E14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_CloudwatchLogGroup_55334E14"
          }
        },
        "name": "/aws/lambda/ondelete-OnMessage0-c8308ba7",
        "retention_in_days": 30
      },
      "cloudBucket_ondelete-OnMessage1_CloudwatchLogGroup_AF50ED5A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_CloudwatchLogGroup_AF50ED5A"
          }
        },
        "name": "/aws/lambda/ondelete-OnMessage1-c8920f94",
        "retention_in_days": 30
      },
      "cloudBucket_onupdate-OnMessage0_CloudwatchLogGroup_98BF6B34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_CloudwatchLogGroup_98BF6B34"
          }
        },
        "name": "/aws/lambda/onupdate-OnMessage0-c8cd54ba",
        "retention_in_days": 30
      },
      "cloudBucket_onupdate-OnMessage1_CloudwatchLogGroup_7D9AC801": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_CloudwatchLogGroup_7D9AC801"
          }
        },
        "name": "/aws/lambda/onupdate-OnMessage1-c8356ea9",
        "retention_in_days": 30
      }
    },
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
      },
      "exTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/Default",
            "uniqueId": "exTable"
          }
        },
        "attribute": [
          {
            "name": "_id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "_id",
        "name": "key-historyex.Table-c840a49c"
      }
    },
    "aws_iam_role": {
      "cloudBucket_oncreate-OnMessage0_IamRole_781D1FBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/IamRole",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_IamRole_781D1FBC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_oncreate-OnMessage1_IamRole_5FEF97DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/IamRole",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_IamRole_5FEF97DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_ondelete-OnMessage0_IamRole_32E9B6B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/IamRole",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_IamRole_32E9B6B6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_ondelete-OnMessage1_IamRole_3A69AD5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/IamRole",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_IamRole_3A69AD5D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_onupdate-OnMessage0_IamRole_A18E1E60": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/IamRole",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_IamRole_A18E1E60"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_onupdate-OnMessage1_IamRole_F9C45633": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/IamRole",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_IamRole_F9C45633"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudBucket_oncreate-OnMessage0_IamRolePolicy_44CBF0C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/IamRolePolicy",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_IamRolePolicy_44CBF0C5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_oncreate-OnMessage0_IamRole_781D1FBC.name}"
      },
      "cloudBucket_oncreate-OnMessage1_IamRolePolicy_EDFB1610": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/IamRolePolicy",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_IamRolePolicy_EDFB1610"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_oncreate-OnMessage1_IamRole_5FEF97DC.name}"
      },
      "cloudBucket_ondelete-OnMessage0_IamRolePolicy_CF363F05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/IamRolePolicy",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_IamRolePolicy_CF363F05"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_ondelete-OnMessage0_IamRole_32E9B6B6.name}"
      },
      "cloudBucket_ondelete-OnMessage1_IamRolePolicy_0867305D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/IamRolePolicy",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_IamRolePolicy_0867305D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_ondelete-OnMessage1_IamRole_3A69AD5D.name}"
      },
      "cloudBucket_onupdate-OnMessage0_IamRolePolicy_1C574D04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/IamRolePolicy",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_IamRolePolicy_1C574D04"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_onupdate-OnMessage0_IamRole_A18E1E60.name}"
      },
      "cloudBucket_onupdate-OnMessage1_IamRolePolicy_AF88DE22": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/IamRolePolicy",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_IamRolePolicy_AF88DE22"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_onupdate-OnMessage1_IamRole_F9C45633.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudBucket_oncreate-OnMessage0_IamRolePolicyAttachment_0014344A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_IamRolePolicyAttachment_0014344A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_oncreate-OnMessage0_IamRole_781D1FBC.name}"
      },
      "cloudBucket_oncreate-OnMessage1_IamRolePolicyAttachment_D98B9654": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_IamRolePolicyAttachment_D98B9654"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_oncreate-OnMessage1_IamRole_5FEF97DC.name}"
      },
      "cloudBucket_ondelete-OnMessage0_IamRolePolicyAttachment_51AD370B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_IamRolePolicyAttachment_51AD370B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_ondelete-OnMessage0_IamRole_32E9B6B6.name}"
      },
      "cloudBucket_ondelete-OnMessage1_IamRolePolicyAttachment_175F98FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_IamRolePolicyAttachment_175F98FB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_ondelete-OnMessage1_IamRole_3A69AD5D.name}"
      },
      "cloudBucket_onupdate-OnMessage0_IamRolePolicyAttachment_8CE952F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_IamRolePolicyAttachment_8CE952F6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_onupdate-OnMessage0_IamRole_A18E1E60.name}"
      },
      "cloudBucket_onupdate-OnMessage1_IamRolePolicyAttachment_558C639E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_IamRolePolicyAttachment_558C639E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_onupdate-OnMessage1_IamRole_F9C45633.name}"
      }
    },
    "aws_lambda_function": {
      "cloudBucket_oncreate-OnMessage0_0B1CA993": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/Default",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_0B1CA993"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "oncreate-OnMessage0-c835636b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "oncreate-OnMessage0-c835636b",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_oncreate-OnMessage0_IamRole_781D1FBC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_oncreate-OnMessage0_S3Object_C2C8A7A9.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_oncreate-OnMessage1_46B1E9AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/Default",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_46B1E9AC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "oncreate-OnMessage1-c8d72382",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "oncreate-OnMessage1-c8d72382",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_oncreate-OnMessage1_IamRole_5FEF97DC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_oncreate-OnMessage1_S3Object_73E1B72B.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_ondelete-OnMessage0_31BC8C5B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/Default",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_31BC8C5B"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "ondelete-OnMessage0-c8308ba7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "ondelete-OnMessage0-c8308ba7",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_ondelete-OnMessage0_IamRole_32E9B6B6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_ondelete-OnMessage0_S3Object_E710FD99.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_ondelete-OnMessage1_97EDDB9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/Default",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_97EDDB9C"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "ondelete-OnMessage1-c8920f94",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "ondelete-OnMessage1-c8920f94",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_ondelete-OnMessage1_IamRole_3A69AD5D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_ondelete-OnMessage1_S3Object_83BF5AC3.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_onupdate-OnMessage0_7E23A21E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/Default",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_7E23A21E"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "onupdate-OnMessage0-c8cd54ba",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "onupdate-OnMessage0-c8cd54ba",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_onupdate-OnMessage0_IamRole_A18E1E60.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_onupdate-OnMessage0_S3Object_1E3DAE34.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_onupdate-OnMessage1_AD4C1239": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/Default",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_AD4C1239"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "onupdate-OnMessage1-c8356ea9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "onupdate-OnMessage1-c8356ea9",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_onupdate-OnMessage1_IamRole_F9C45633.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_onupdate-OnMessage1_S3Object_0756209E.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudBucket_oncreate-OnMessage0_InvokePermission-c8f9c22ef33cda1b8ee1583450fa95d2a469b4ca3b_557C66F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/InvokePermission-c8f9c22ef33cda1b8ee1583450fa95d2a469b4ca3b",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_InvokePermission-c8f9c22ef33cda1b8ee1583450fa95d2a469b4ca3b_557C66F2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_oncreate-OnMessage0_0B1CA993.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}"
      },
      "cloudBucket_oncreate-OnMessage1_InvokePermission-c8f9c22ef33cda1b8ee1583450fa95d2a469b4ca3b_42E7BD52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/InvokePermission-c8f9c22ef33cda1b8ee1583450fa95d2a469b4ca3b",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_InvokePermission-c8f9c22ef33cda1b8ee1583450fa95d2a469b4ca3b_42E7BD52"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_oncreate-OnMessage1_46B1E9AC.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}"
      },
      "cloudBucket_ondelete-OnMessage0_InvokePermission-c82a684284f1978ef059ff478889b7d0422cd30e56_39B5412A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/InvokePermission-c82a684284f1978ef059ff478889b7d0422cd30e56",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_InvokePermission-c82a684284f1978ef059ff478889b7d0422cd30e56_39B5412A"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_ondelete-OnMessage0_31BC8C5B.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}"
      },
      "cloudBucket_ondelete-OnMessage1_InvokePermission-c82a684284f1978ef059ff478889b7d0422cd30e56_55397F0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/InvokePermission-c82a684284f1978ef059ff478889b7d0422cd30e56",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_InvokePermission-c82a684284f1978ef059ff478889b7d0422cd30e56_55397F0C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_ondelete-OnMessage1_97EDDB9C.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}"
      },
      "cloudBucket_onupdate-OnMessage0_InvokePermission-c8223d472543ef1fe5e1f0eacaf63338362fb1a751_3E88DA77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/InvokePermission-c8223d472543ef1fe5e1f0eacaf63338362fb1a751",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_InvokePermission-c8223d472543ef1fe5e1f0eacaf63338362fb1a751_3E88DA77"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_onupdate-OnMessage0_7E23A21E.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}"
      },
      "cloudBucket_onupdate-OnMessage1_InvokePermission-c8223d472543ef1fe5e1f0eacaf63338362fb1a751_F065AB16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/InvokePermission-c8223d472543ef1fe5e1f0eacaf63338362fb1a751",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_InvokePermission-c8223d472543ef1fe5e1f0eacaf63338362fb1a751_F065AB16"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_onupdate-OnMessage1_AD4C1239.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}"
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
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "cloudBucket_S3BucketNotification_7C82677F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3BucketNotification",
            "uniqueId": "cloudBucket_S3BucketNotification_7C82677F"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.id}",
        "depends_on": [
          "aws_sns_topic_policy.cloudBucket_ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_F136B625",
          "aws_sns_topic_policy.cloudBucket_onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_76578151",
          "aws_sns_topic_policy.cloudBucket_oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_C1C190D3"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "cloudBucket_oncreate-OnMessage0_S3Object_C2C8A7A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage0/S3Object",
            "uniqueId": "cloudBucket_oncreate-OnMessage0_S3Object_C2C8A7A9"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_oncreate-OnMessage1_S3Object_73E1B72B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate-OnMessage1/S3Object",
            "uniqueId": "cloudBucket_oncreate-OnMessage1_S3Object_73E1B72B"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_ondelete-OnMessage0_S3Object_E710FD99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage0/S3Object",
            "uniqueId": "cloudBucket_ondelete-OnMessage0_S3Object_E710FD99"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_ondelete-OnMessage1_S3Object_83BF5AC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete-OnMessage1/S3Object",
            "uniqueId": "cloudBucket_ondelete-OnMessage1_S3Object_83BF5AC3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_onupdate-OnMessage0_S3Object_1E3DAE34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage0/S3Object",
            "uniqueId": "cloudBucket_onupdate-OnMessage0_S3Object_1E3DAE34"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_onupdate-OnMessage1_S3Object_0756209E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate-OnMessage1/S3Object",
            "uniqueId": "cloudBucket_onupdate-OnMessage1_S3Object_0756209E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "cloudBucket_oncreate_BF58CCF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate/Default",
            "uniqueId": "cloudBucket_oncreate_BF58CCF3"
          }
        },
        "name": "oncreate-c8f9c22e"
      },
      "cloudBucket_ondelete_5C7719AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete/Default",
            "uniqueId": "cloudBucket_ondelete_5C7719AC"
          }
        },
        "name": "ondelete-c82a6842"
      },
      "cloudBucket_onupdate_34404C29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate/Default",
            "uniqueId": "cloudBucket_onupdate_34404C29"
          }
        },
        "name": "onupdate-c8223d47"
      }
    },
    "aws_sns_topic_policy": {
      "cloudBucket_oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_C1C190D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_C1C190D3"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_F136B625": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_F136B625"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_76578151": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_76578151"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudBucket_oncreate_TopicSubscription0_EFE36EE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate/TopicSubscription0",
            "uniqueId": "cloudBucket_oncreate_TopicSubscription0_EFE36EE4"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_oncreate-OnMessage0_0B1CA993.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}"
      },
      "cloudBucket_oncreate_TopicSubscription1_EF79F340": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/oncreate/TopicSubscription1",
            "uniqueId": "cloudBucket_oncreate_TopicSubscription1_EF79F340"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_oncreate-OnMessage1_46B1E9AC.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_oncreate_BF58CCF3.arn}"
      },
      "cloudBucket_ondelete_TopicSubscription0_F0771109": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete/TopicSubscription0",
            "uniqueId": "cloudBucket_ondelete_TopicSubscription0_F0771109"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_ondelete-OnMessage0_31BC8C5B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}"
      },
      "cloudBucket_ondelete_TopicSubscription1_012F51D5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/ondelete/TopicSubscription1",
            "uniqueId": "cloudBucket_ondelete_TopicSubscription1_012F51D5"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_ondelete-OnMessage1_97EDDB9C.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_ondelete_5C7719AC.arn}"
      },
      "cloudBucket_onupdate_TopicSubscription0_C5A4C94D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate/TopicSubscription0",
            "uniqueId": "cloudBucket_onupdate_TopicSubscription0_C5A4C94D"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_onupdate-OnMessage0_7E23A21E.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}"
      },
      "cloudBucket_onupdate_TopicSubscription1_257D0F81": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/onupdate/TopicSubscription1",
            "uniqueId": "cloudBucket_onupdate_TopicSubscription1_257D0F81"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_onupdate-OnMessage1_AD4C1239.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_onupdate_34404C29.arn}"
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
const ex = $stdlib.ex;
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
            $idsCounter: ${$stdlib.core.liftObject(idsCounter)},
            $table: ${$stdlib.core.liftObject(table)},
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
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(idsCounter, host, ["inc"]);
          $Closure1._registerOnLiftObject(table, host, ["insert"]);
        }
        super._registerOnLift(host, ops);
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
            $Source: ${$stdlib.core.liftObject(Source)},
            $logHistory: ${$stdlib.core.liftObject(logHistory)},
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
          $Closure2._registerOnLiftObject(logHistory, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure3-1.cjs")({
            $Source: ${$stdlib.core.liftObject(Source)},
            $logHistory: ${$stdlib.core.liftObject(logHistory)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(logHistory, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure4-1.cjs")({
            $Source: ${$stdlib.core.liftObject(Source)},
            $logHistory: ${$stdlib.core.liftObject(logHistory)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure4._registerOnLiftObject(logHistory, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure5-1.cjs")({
            $Source: ${$stdlib.core.liftObject(Source)},
            $logHistory: ${$stdlib.core.liftObject(logHistory)},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure5._registerOnLiftObject(logHistory, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure6-1.cjs")({
            $std_Duration: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure7-1.cjs")({
            $table: ${$stdlib.core.liftObject(table)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this)};
            const client = new $Closure7Client({
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
          $Closure7._registerOnLiftObject(table, host, ["list"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure8-1.cjs")({
            $Source: ${$stdlib.core.liftObject(Source)},
            $b: ${$stdlib.core.liftObject(b)},
            $checkHitCount: ${$stdlib.core.liftObject(checkHitCount)},
            $util_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
            $wait: ${$stdlib.core.liftObject(wait)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this)};
            const client = new $Closure8Client({
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
          $Closure8._registerOnLiftObject(b, host, ["delete", "put"]);
          $Closure8._registerOnLiftObject(checkHitCount, host, ["handle"]);
          $Closure8._registerOnLiftObject(wait, host, ["handle"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const Source =
      (function (tmp) {
        tmp[tmp["anyEvent"] = 0] = ",anyEvent";
        tmp[tmp["onEvent"] = 1] = ",onEvent";
        return tmp;
      })({})
    ;
    const b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const idsCounter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
    const table = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "ex.Table", { name: "key-history", primaryKey: "_id", columns: ({["_id"]: ex.ColumnType.STRING, ["key"]: ex.ColumnType.STRING, ["operation"]: ex.ColumnType.STRING, ["source"]: ex.ColumnType.STRING}) });
    const logHistory = new $Closure1(this, "$Closure1");
    (b.onDelete(new $Closure2(this, "$Closure2")));
    (b.onUpdate(new $Closure3(this, "$Closure3")));
    (b.onCreate(new $Closure4(this, "$Closure4")));
    (b.onEvent(new $Closure5(this, "$Closure5")));
    const wait = new $Closure6(this, "$Closure6");
    const checkHitCount = new $Closure7(this, "$Closure7");
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "hitCount is incremented according to the bucket event", new $Closure8(this, "$Closure8"), { timeout: (std.Duration.fromSeconds(480)) });
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "events.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


# [events.test.w](../../../../../../examples/tests/sdk_tests/bucket/events.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({ $idsCounter, $table }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, operation, source) {
      (await $table.insert(String.raw({ raw: ["", ""] }, (await $idsCounter.inc())),({"key": key,"operation": operation,"source": String.raw({ raw: ["", ""] }, source)})));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $logHistory(key,"onDelete()",$Source.anyEvent));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $logHistory(key,"onUpdate()",$Source.anyEvent));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $logHistory(key,"onCreate()",$Source.anyEvent));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
"use strict";
module.exports = function({ $Source, $logHistory }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, event) {
      (await $logHistory(key,String.raw({ raw: ["", "()"] }, event),$Source.onEvent));
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
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

```

## inflight.$Closure7-1.js
```js
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
      }
      ;
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.js
```js
"use strict";
module.exports = function({ $Source, $b, $checkHitCount, $util_Util, $wait }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("a","1"));
      (await $b.put("b","1"));
      (await $b.put("c","1"));
      (await $b.put("b","100"));
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_CloudwatchLogGroup_D99603FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_CloudwatchLogGroup_D99603FC"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage-42558af0-c840cda8",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_CloudwatchLogGroup_7CACB761": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_CloudwatchLogGroup_7CACB761"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-oncreate-OnMessage-47274dc3-c82ffa0f",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_CloudwatchLogGroup_5EAEF4A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_CloudwatchLogGroup_5EAEF4A0"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage-4b0506cb-c82c9ed0",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_CloudwatchLogGroup_BB14579F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_CloudwatchLogGroup_BB14579F"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-ondelete-OnMessage-cd5c55f4-c8549dac",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_CloudwatchLogGroup_19BE1ECB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_CloudwatchLogGroup_19BE1ECB"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage-39d17a37-c8aa477a",
        "retention_in_days": 30
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_CloudwatchLogGroup_C7950F76": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/CloudwatchLogGroup",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_CloudwatchLogGroup_C7950F76"
          }
        },
        "name": "/aws/lambda/cloud-Bucket-onupdate-OnMessage-ff1f5e53-c810f519",
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRole_7604D61E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRole_7604D61E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRole_4CAE6BCA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRole_4CAE6BCA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRole_F7635687": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRole_F7635687"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRole_2E71F2E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRole_2E71F2E0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRole_206A7D5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRole_206A7D5D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRole_0503E83B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRole_0503E83B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRolePolicy_2EFDF857": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRolePolicy_2EFDF857"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRole_7604D61E.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRolePolicy_6124C14B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRolePolicy_6124C14B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRole_4CAE6BCA.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRolePolicy_D64817BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRolePolicy_D64817BC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRole_F7635687.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRolePolicy_8B53AFD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRolePolicy_8B53AFD9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRole_2E71F2E0.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRolePolicy_6E943EC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRolePolicy_6E943EC6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRole_206A7D5D.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRolePolicy_BB41D858": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRolePolicy_BB41D858"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRole_0503E83B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRolePolicyAttachment_1E7AA914": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRolePolicyAttachment_1E7AA914"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRole_7604D61E.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRolePolicyAttachment_D8C7BC23": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRolePolicyAttachment_D8C7BC23"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRole_4CAE6BCA.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRolePolicyAttachment_D8E84790": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRolePolicyAttachment_D8E84790"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRole_F7635687.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRolePolicyAttachment_809B93FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRolePolicyAttachment_809B93FC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRole_2E71F2E0.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRolePolicyAttachment_B9F5A4C6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRolePolicyAttachment_B9F5A4C6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRole_206A7D5D.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRolePolicyAttachment_E8244E75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRolePolicyAttachment_E8244E75"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRole_0503E83B.name}"
      }
    },
    "aws_lambda_function": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_C94BBC24": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_C94BBC24"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-42558af0-c840cda8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-42558af0-c840cda8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_IamRole_7604D61E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_S3Object_141E43E0.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_A5F9D3AA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_A5F9D3AA"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-47274dc3-c82ffa0f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-47274dc3-c82ffa0f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_IamRole_4CAE6BCA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_S3Object_C62492FA.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_9EE796E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_9EE796E8"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-4b0506cb-c82c9ed0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-4b0506cb-c82c9ed0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_IamRole_F7635687.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_S3Object_35F71242.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_57A0B983": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_57A0B983"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-cd5c55f4-c8549dac",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-cd5c55f4-c8549dac",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_IamRole_2E71F2E0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_S3Object_3B255925.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_8E8F6CE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_8E8F6CE8"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-39d17a37-c8aa477a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-39d17a37-c8aa477a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_IamRole_206A7D5D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_S3Object_A660D388.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_791EE56B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_791EE56B"
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
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-ff1f5e53-c810f519",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-ff1f5e53-c810f519",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_IamRole_0503E83B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_S3Object_9C4A1AB4.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_EBD14B12": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_EBD14B12"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_C94BBC24.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_92F4091B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_92F4091B"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_A5F9D3AA.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_819BFBF4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_819BFBF4"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_9EE796E8.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_B5C92F8B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_B5C92F8B"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_57A0B983.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_A8F9EB12": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_A8F9EB12"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_8E8F6CE8.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_1DF11450": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_1DF11450"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_791EE56B.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
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
          "aws_sns_topic_policy.cloudBucket_cloudBucket-ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_63EEA617",
          "aws_sns_topic_policy.cloudBucket_cloudBucket-onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_AACD1271",
          "aws_sns_topic_policy.cloudBucket_cloudBucket-oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_2B35518E"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
          }
        ]
      }
    },
    "aws_s3_object": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_S3Object_141E43E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-42558af0/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_S3Object_141E43E0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_S3Object_C62492FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-47274dc3/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_S3Object_C62492FA"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_S3Object_35F71242": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-4b0506cb/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_S3Object_35F71242"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_S3Object_3B255925": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-cd5c55f4/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_S3Object_3B255925"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_S3Object_A660D388": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-39d17a37/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_S3Object_A660D388"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_S3Object_9C4A1AB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-ff1f5e53/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_S3Object_9C4A1AB4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "cloudBucket_cloudBucket-oncreate_CBC9308E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_CBC9308E"
          }
        },
        "name": "cloud-Bucket-oncreate-c8d5f231"
      },
      "cloudBucket_cloudBucket-ondelete_C031AAEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_C031AAEE"
          }
        },
        "name": "cloud-Bucket-ondelete-c8124745"
      },
      "cloudBucket_cloudBucket-onupdate_27807F64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_27807F64"
          }
        },
        "name": "cloud-Bucket-onupdate-c822c2b6"
      }
    },
    "aws_sns_topic_policy": {
      "cloudBucket_cloudBucket-oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_2B35518E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_2B35518E"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_cloudBucket-ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_63EEA617": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_63EEA617"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_cloudBucket-onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_AACD1271": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_AACD1271"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-42558af0_E8DAE5F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-42558af0",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-42558af0_E8DAE5F1"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-42558af0_C94BBC24.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-47274dc3_CC4DA988": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-47274dc3",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-47274dc3_CC4DA988"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-47274dc3_A5F9D3AA.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-4b0506cb_5F326BC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-4b0506cb",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-4b0506cb_5F326BC5"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-4b0506cb_9EE796E8.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-cd5c55f4_FE0D9FE4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-cd5c55f4",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-cd5c55f4_FE0D9FE4"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-cd5c55f4_57A0B983.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-39d17a37_F4DC00EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-39d17a37",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-39d17a37_F4DC00EC"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-39d17a37_8E8F6CE8.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-ff1f5e53_7C27FE34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-ff1f5e53",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-ff1f5e53_7C27FE34"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-ff1f5e53_791EE56B.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const ex = $stdlib.ex;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $idsCounter: ${context._lift(idsCounter)},
            $table: ${context._lift(table)},
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
          $Closure1._registerBindObject(idsCounter, host, ["inc"]);
          $Closure1._registerBindObject(table, host, ["insert"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure2._registerBindObject(logHistory, host, ["handle"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure3._registerBindObject(logHistory, host, ["handle"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure4._registerBindObject(logHistory, host, ["handle"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure5._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
            $std_Duration: ${context._lift($stdlib.core.toLiftableModuleType(std.Duration, "@winglang/sdk/std", "Duration"))},
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
            $table: ${context._lift(table)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure7._registerBindObject(table, host, ["list"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
            $Source: ${context._lift(Source)},
            $b: ${context._lift(b)},
            $checkHitCount: ${context._lift(checkHitCount)},
            $util_Util: ${context._lift($stdlib.core.toLiftableModuleType(util.Util, "@winglang/sdk/util", "Util"))},
            $wait: ${context._lift(wait)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure8._registerBindObject(b, host, ["delete", "put"]);
          $Closure8._registerBindObject(checkHitCount, host, ["handle"]);
          $Closure8._registerBindObject(wait, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    const Source =
      (function (tmp) {
        tmp[tmp["anyEvent"] = 0] = "anyEvent";
        tmp[tmp["onEvent"] = 1] = "onEvent";
        return tmp;
      })({})
    ;
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const idsCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const table = this.node.root.newAbstract("@winglang/sdk.ex.Table",this,"ex.Table",{ name: "key-history", primaryKey: "_id", columns: ({"_id": ex.ColumnType.STRING,"key": ex.ColumnType.STRING,"operation": ex.ColumnType.STRING,"source": ex.ColumnType.STRING}) });
    const logHistory = new $Closure1(this,"$Closure1");
    (b.onDelete(new $Closure2(this,"$Closure2")));
    (b.onUpdate(new $Closure3(this,"$Closure3")));
    (b.onCreate(new $Closure4(this,"$Closure4")));
    (b.onEvent(new $Closure5(this,"$Closure5")));
    const wait = new $Closure6(this,"$Closure6");
    const checkHitCount = new $Closure7(this,"$Closure7");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"hitCount is incremented according to the bucket event",new $Closure8(this,"$Closure8"),{ timeout: (std.Duration.fromSeconds(480)) });
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "events.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


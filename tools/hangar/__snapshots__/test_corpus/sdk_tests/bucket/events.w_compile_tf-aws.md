# [events.w](../../../../../../examples/tests/sdk_tests/bucket/events.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $idsCounter, $table }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, operation, source) {
      (await $table.insert(String.raw({ raw: ["", ""] }, (await $idsCounter.inc())),Object.freeze({"key":key,"operation":operation,"source":String.raw({ raw: ["", ""] }, source)})));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
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

## inflight.$Closure3.js
```js
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

## inflight.$Closure4.js
```js
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

## inflight.$Closure5.js
```js
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

## inflight.$Closure6.js
```js
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

## inflight.$Closure7.js
```js
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
          if ((((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((u)["key"],opts.key)) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((u)["operation"],opts.type))) && (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((u)["source"],String.raw({ raw: ["", ""] }, opts.source))))) {
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

## inflight.$Closure8.js
```js
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
      if (((await $util_Util.env("WING_TARGET")) !== "tf-aws")) {
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
      "value": "[[\"root/Default/Default/hitCount is incremented according to the bucket event\",\"${aws_lambda_function.hitCountisincrementedaccordingtothebucketevent_Handler_29DEB1F6.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRole_0AE31367": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-985d246b/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRole_0AE31367"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRole_04D5B40F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-dde55e33/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRole_04D5B40F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRole_A726FAF4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-f6d66b87/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRole_A726FAF4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRole_C67645E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fc31ce84/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRole_C67645E8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRole_04D0965F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-9340593a/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRole_04D0965F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRole_8DDCE95B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-f339af8e/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRole_8DDCE95B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_AF1E4A64": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRole",
            "uniqueId": "hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_AF1E4A64"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRolePolicy_6CCCE15D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-985d246b/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRolePolicy_6CCCE15D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRole_0AE31367.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRolePolicy_1F6B3972": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-dde55e33/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRolePolicy_1F6B3972"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRole_04D5B40F.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRolePolicy_660C691A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-f6d66b87/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRolePolicy_660C691A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRole_A726FAF4.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRolePolicy_D947B954": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fc31ce84/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRolePolicy_D947B954"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRole_C67645E8.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRolePolicy_18BDD0C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-9340593a/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRolePolicy_18BDD0C4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRole_04D0965F.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRolePolicy_6A12CAB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-f339af8e/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRolePolicy_6A12CAB4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRole_8DDCE95B.name}"
      },
      "hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_678D6495": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicy",
            "uniqueId": "hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_678D6495"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_AF1E4A64.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRolePolicyAttachment_2C55E8D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-985d246b/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRolePolicyAttachment_2C55E8D1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRole_0AE31367.name}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRolePolicyAttachment_C39CA53A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-dde55e33/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRolePolicyAttachment_C39CA53A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRole_04D5B40F.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRolePolicyAttachment_46C835A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-f6d66b87/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRolePolicyAttachment_46C835A1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRole_A726FAF4.name}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRolePolicyAttachment_5954A557": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fc31ce84/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRolePolicyAttachment_5954A557"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRole_C67645E8.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRolePolicyAttachment_82F91644": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-9340593a/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRolePolicyAttachment_82F91644"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRole_04D0965F.name}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRolePolicyAttachment_595A1B05": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-f339af8e/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRolePolicyAttachment_595A1B05"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRole_8DDCE95B.name}"
      },
      "hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_A3DD9377": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicyAttachment",
            "uniqueId": "hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_A3DD9377"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_AF1E4A64.name}"
      }
    },
    "aws_lambda_function": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_DC7E8D08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-985d246b/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_DC7E8D08"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-985d246b-c8b5336b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-985d246b-c8b5336b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_IamRole_0AE31367.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_S3Object_F63A1A4F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_698186C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-dde55e33/Default",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_698186C3"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-dde55e33-c8f1ed3a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-dde55e33-c8f1ed3a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_IamRole_04D5B40F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_S3Object_58A055C4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_0F807404": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-f6d66b87/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_0F807404"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-f6d66b87-c8eb9d81",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-f6d66b87-c8eb9d81",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_IamRole_A726FAF4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_S3Object_C83BE1EE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_186CE343": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fc31ce84/Default",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_186CE343"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-fc31ce84-c85277b8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-fc31ce84-c85277b8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_IamRole_C67645E8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_S3Object_CA93A6EE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_EA7B0E99": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-9340593a/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_EA7B0E99"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-9340593a-c858bb92",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-9340593a-c858bb92",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_IamRole_04D0965F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_S3Object_94B369EC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_EC49C62D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-f339af8e/Default",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_EC49C62D"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-f339af8e-c8da1a2b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-f339af8e-c8da1a2b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_IamRole_8DDCE95B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_S3Object_909FA90C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "hitCountisincrementedaccordingtothebucketevent_Handler_29DEB1F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/Default",
            "uniqueId": "hitCountisincrementedaccordingtothebucketevent_Handler_29DEB1F6"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "Handler-c88204a7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88204a7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_AF1E4A64.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_B1A3036B.key}",
        "timeout": 480,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_5E0C4B75": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-985d246b/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_5E0C4B75"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_DC7E8D08.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_71C88E79": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-dde55e33/InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_InvokePermission-c8d5f2312edd40bd1e76a2bc8618ecb582e7b4c6d8_71C88E79"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_698186C3.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_033747FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-f6d66b87/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_033747FD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_0F807404.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_0B8771EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fc31ce84/InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_InvokePermission-c81247452a8e791f6f22f8e22adc2d947086ccdb05_0B8771EC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_186CE343.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_5FB6A8D2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-9340593a/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_5FB6A8D2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_EA7B0E99.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_E8018B16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-f339af8e/InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_InvokePermission-c822c2b6078afbaa8f370ee01e4c8e689ebf88b662_E8018B16"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_EC49C62D.function_name}",
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
    "aws_s3_bucket_public_access_block": {
      "cloudBucket_PublicAccessBlock_5946CCE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "cloudBucket_PublicAccessBlock_5946CCE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
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
      "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_S3Object_F63A1A4F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-985d246b/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_S3Object_F63A1A4F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_S3Object_58A055C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-dde55e33/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_S3Object_58A055C4"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_S3Object_C83BE1EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-f6d66b87/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_S3Object_C83BE1EE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_S3Object_CA93A6EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-fc31ce84/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_S3Object_CA93A6EE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_S3Object_94B369EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-9340593a/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_S3Object_94B369EC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_S3Object_909FA90C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-f339af8e/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_S3Object_909FA90C"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_B1A3036B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/S3Object",
            "uniqueId": "hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_B1A3036B"
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
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-985d246b_82904987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-985d246b",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-985d246b_82904987"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-985d246b_DC7E8D08.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-dde55e33_22FEA0D5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-dde55e33",
            "uniqueId": "cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-dde55e33_22FEA0D5"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-oncreate-OnMessage-dde55e33_698186C3.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-oncreate_CBC9308E.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-f6d66b87_62ACE3E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-f6d66b87",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-f6d66b87_62ACE3E4"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-f6d66b87_0F807404.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-fc31ce84_FAC20870": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-fc31ce84",
            "uniqueId": "cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-fc31ce84_FAC20870"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-ondelete-OnMessage-fc31ce84_186CE343.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-ondelete_C031AAEE.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-9340593a_0DCFF956": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-9340593a",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-9340593a_0DCFF956"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-9340593a_EA7B0E99.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
      },
      "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-f339af8e_12FEA3F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-f339af8e",
            "uniqueId": "cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-f339af8e_12FEA3F7"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-onupdate-OnMessage-f339af8e_EC49C62D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-onupdate_27807F64.arn}"
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
const cloud = require('@winglang/sdk').cloud;
const ex = require('@winglang/sdk').ex;
const util = require('@winglang/sdk').util;
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
            $idsCounter: ${context._lift(idsCounter)},
            $table: ${context._lift(table)},
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
          $Closure1._registerBindObject(idsCounter, host, ["inc"]);
          $Closure1._registerBindObject(table, host, ["insert"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure2._registerBindObject(logHistory, host, ["handle"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure3._registerBindObject(logHistory, host, ["handle"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure4._registerBindObject(logHistory, host, ["handle"]);
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
            $Source: ${context._lift(Source)},
            $logHistory: ${context._lift(logHistory)},
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
          $Closure5._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
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
            $std_Duration: ${context._lift(std.Duration)},
            $util_Util: ${context._lift(util.Util)},
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
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure7.js")({
            $table: ${context._lift(table)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this).text};
            const client = new $Closure7Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure8.js")({
            $Source: ${context._lift(Source)},
            $b: ${context._lift(b)},
            $checkHitCount: ${context._lift(checkHitCount)},
            $util_Util: ${context._lift(util.Util)},
            $wait: ${context._lift(wait)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this).text};
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
      Object.freeze((function (tmp) {
        tmp[tmp["anyEvent"] = 0] = "anyEvent";
        tmp[tmp["onEvent"] = 1] = "onEvent";
        return tmp;
      })({}))
    ;
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const idsCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const table = this.node.root.newAbstract("@winglang/sdk.ex.Table",this,"ex.Table",{ name: "key-history", primaryKey: "_id", columns: Object.freeze({"_id":ex.ColumnType.STRING,"key":ex.ColumnType.STRING,"operation":ex.ColumnType.STRING,"source":ex.ColumnType.STRING}) });
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
new $App({ outdir: $outdir, name: "events", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


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
      (await $table.insert(String.raw({ raw: ["", ""] }, (await $idsCounter.inc())),({"key": key,"operation": operation,"source": String.raw({ raw: ["", ""] }, source)})));
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
        "undefined": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/hitCount is incremented according to the bucket event\",\"${aws_lambda_function.undefined_hitCountisincrementedaccordingtothebucketevent_Handler_DA6EAF55.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_cloudCounter_4B4E77ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Counter/Default",
            "uniqueId": "undefined_cloudCounter_4B4E77ED"
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
        "name": "wing-counter-cloud.Counter-c86bae23"
      },
      "undefined_exTable_DEFCFB8E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/ex.Table/Default",
            "uniqueId": "undefined_exTable_DEFCFB8E"
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
        "name": "key-historyex.Table-c8865529"
      }
    },
    "aws_iam_role": {
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRole_C7FE3E9F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-3bf6b532/IamRole",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRole_C7FE3E9F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRole_D06F0350": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-9e6a3d6f/IamRole",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRole_D06F0350"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRole_8DC4C109": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-a9ead87e/IamRole",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRole_8DC4C109"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRole_98CD292E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-b4d6f6b7/IamRole",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRole_98CD292E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRole_5621BBC6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-035588c0/IamRole",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRole_5621BBC6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRole_EC755497": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-cbf12392/IamRole",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRole_EC755497"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_81D33AE8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/hitCount is incremented according to the bucket event/Handler/IamRole",
            "uniqueId": "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_81D33AE8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRolePolicy_D8D8A913": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-3bf6b532/IamRolePolicy",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRolePolicy_D8D8A913"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRole_C7FE3E9F.name}"
      },
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRolePolicy_B44E67B4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-9e6a3d6f/IamRolePolicy",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRolePolicy_B44E67B4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRole_D06F0350.name}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRolePolicy_A9E1FC81": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-a9ead87e/IamRolePolicy",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRolePolicy_A9E1FC81"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRole_8DC4C109.name}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRolePolicy_199CAC82": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-b4d6f6b7/IamRolePolicy",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRolePolicy_199CAC82"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRole_98CD292E.name}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRolePolicy_0A8D21C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-035588c0/IamRolePolicy",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRolePolicy_0A8D21C7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRole_5621BBC6.name}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRolePolicy_1F5D2292": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-cbf12392/IamRolePolicy",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRolePolicy_1F5D2292"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRole_EC755497.name}"
      },
      "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_8A6FE27E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicy",
            "uniqueId": "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_8A6FE27E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.undefined_exTable_DEFCFB8E.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_81D33AE8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRolePolicyAttachment_158AB7C9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-3bf6b532/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRolePolicyAttachment_158AB7C9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRole_C7FE3E9F.name}"
      },
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRolePolicyAttachment_1BA76CC8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-9e6a3d6f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRolePolicyAttachment_1BA76CC8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRole_D06F0350.name}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRolePolicyAttachment_7B881411": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-a9ead87e/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRolePolicyAttachment_7B881411"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRole_8DC4C109.name}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRolePolicyAttachment_01AA6B95": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-b4d6f6b7/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRolePolicyAttachment_01AA6B95"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRole_98CD292E.name}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRolePolicyAttachment_32AB9753": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-035588c0/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRolePolicyAttachment_32AB9753"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRole_5621BBC6.name}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRolePolicyAttachment_1A45CB2C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-cbf12392/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRolePolicyAttachment_1A45CB2C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRole_EC755497.name}"
      },
      "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_DF5F8551": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_DF5F8551"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_81D33AE8.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_58EDB280": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-3bf6b532/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_58EDB280"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-3bf6b532-c8667baf",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-3bf6b532-c8667baf",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_IamRole_C7FE3E9F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_S3Object_6409D90A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_8D2D943D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-9e6a3d6f/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_8D2D943D"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Bucket-oncreate-OnMessage-9e6a3d6f-c8ced196",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-oncreate-OnMessage-9e6a3d6f-c8ced196",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_IamRole_D06F0350.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_S3Object_58541601.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_E383E821": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-a9ead87e/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_E383E821"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-a9ead87e-c8a7fb4d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-a9ead87e-c8a7fb4d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_IamRole_8DC4C109.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_S3Object_F03468F9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_1097D343": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-b4d6f6b7/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_1097D343"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Bucket-ondelete-OnMessage-b4d6f6b7-c8121709",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-ondelete-OnMessage-b4d6f6b7-c8121709",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_IamRole_98CD292E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_S3Object_D8AD4288.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_37FE7A45": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-035588c0/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_37FE7A45"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-035588c0-c89e7ee2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-035588c0-c89e7ee2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_IamRole_5621BBC6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_S3Object_AB71263E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_934C648A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-cbf12392/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_934C648A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Bucket-onupdate-OnMessage-cbf12392-c87bd0dc",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-onupdate-OnMessage-cbf12392-c87bd0dc",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_IamRole_EC755497.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_S3Object_D68A90CC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_DA6EAF55": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/hitCount is incremented according to the bucket event/Handler/Default",
            "uniqueId": "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_DA6EAF55"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "DYNAMODB_TABLE_NAME_49bbcd6d": "${aws_dynamodb_table.undefined_exTable_DEFCFB8E.name}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_49bbcd6d_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "Handler-c8c88cab",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c88cab",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_81D33AE8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_2BC7E032.key}",
        "timeout": 480,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_InvokePermission-c8fb8a223cb88871657e28a14ab3edd4ff04f9922f_00C437BC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-3bf6b532/InvokePermission-c8fb8a223cb88871657e28a14ab3edd4ff04f9922f",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_InvokePermission-c8fb8a223cb88871657e28a14ab3edd4ff04f9922f_00C437BC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_58EDB280.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}"
      },
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_InvokePermission-c8fb8a223cb88871657e28a14ab3edd4ff04f9922f_DF522A50": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-9e6a3d6f/InvokePermission-c8fb8a223cb88871657e28a14ab3edd4ff04f9922f",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_InvokePermission-c8fb8a223cb88871657e28a14ab3edd4ff04f9922f_DF522A50"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_8D2D943D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_InvokePermission-c8d92fa46f6cd7dc45fdb851fe3f3faedb0759a62f_68959895": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-a9ead87e/InvokePermission-c8d92fa46f6cd7dc45fdb851fe3f3faedb0759a62f",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_InvokePermission-c8d92fa46f6cd7dc45fdb851fe3f3faedb0759a62f_68959895"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_E383E821.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_InvokePermission-c8d92fa46f6cd7dc45fdb851fe3f3faedb0759a62f_1E669341": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-b4d6f6b7/InvokePermission-c8d92fa46f6cd7dc45fdb851fe3f3faedb0759a62f",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_InvokePermission-c8d92fa46f6cd7dc45fdb851fe3f3faedb0759a62f_1E669341"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_1097D343.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_InvokePermission-c8978acb75d890878a8446df5b44e9565d994b860a_87A73CC5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-035588c0/InvokePermission-c8978acb75d890878a8446df5b44e9565d994b860a",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_InvokePermission-c8978acb75d890878a8446df5b44e9565d994b860a_87A73CC5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_37FE7A45.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_InvokePermission-c8978acb75d890878a8446df5b44e9565d994b860a_D13BBC19": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-cbf12392/InvokePermission-c8978acb75d890878a8446df5b44e9565d994b860a",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_InvokePermission-c8978acb75d890878a8446df5b44e9565d994b860a_D13BBC19"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_934C648A.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}"
      }
    },
    "aws_s3_bucket": {
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      },
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "undefined_cloudBucket_S3BucketNotification_B20417C1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/S3BucketNotification",
            "uniqueId": "undefined_cloudBucket_S3BucketNotification_B20417C1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.id}",
        "depends_on": [
          "aws_sns_topic_policy.undefined_cloudBucket_cloudBucket-ondelete_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_C6DDDE18",
          "aws_sns_topic_policy.undefined_cloudBucket_cloudBucket-onupdate_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_4AB21C8F",
          "aws_sns_topic_policy.undefined_cloudBucket_cloudBucket-oncreate_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_4933880C"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_S3Object_6409D90A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-3bf6b532/S3Object",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_S3Object_6409D90A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_S3Object_58541601": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate-OnMessage-9e6a3d6f/S3Object",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_S3Object_58541601"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_S3Object_F03468F9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-a9ead87e/S3Object",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_S3Object_F03468F9"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_S3Object_D8AD4288": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete-OnMessage-b4d6f6b7/S3Object",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_S3Object_D8AD4288"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_S3Object_AB71263E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-035588c0/S3Object",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_S3Object_AB71263E"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_S3Object_D68A90CC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate-OnMessage-cbf12392/S3Object",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_S3Object_D68A90CC"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_2BC7E032": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/hitCount is incremented according to the bucket event/Handler/S3Object",
            "uniqueId": "undefined_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_2BC7E032"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2"
          }
        },
        "name": "cloud-Bucket-oncreate-c8fb8a22"
      },
      "undefined_cloudBucket_cloudBucket-ondelete_C8B28033": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete_C8B28033"
          }
        },
        "name": "cloud-Bucket-ondelete-c8d92fa4"
      },
      "undefined_cloudBucket_cloudBucket-onupdate_3B234DA5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate/Default",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate_3B234DA5"
          }
        },
        "name": "cloud-Bucket-onupdate-c8978acb"
      }
    },
    "aws_sns_topic_policy": {
      "undefined_cloudBucket_cloudBucket-oncreate_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_4933880C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate/PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_4933880C"
          }
        },
        "arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\"}}}]}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_C6DDDE18": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete/PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_C6DDDE18"
          }
        },
        "arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\"}}}]}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_4AB21C8F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate/PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate_PublishPermission-c8802ab1be8a462fc15506814a52b5433e7c20b234_4AB21C8F"
          }
        },
        "arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "undefined_cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-3bf6b532_859C979C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-3bf6b532",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-3bf6b532_859C979C"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-3bf6b532_58EDB280.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}"
      },
      "undefined_cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-9e6a3d6f_85F8BD16": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-oncreate/cloud.Bucket-oncreate-TopicSubscription-9e6a3d6f",
            "uniqueId": "undefined_cloudBucket_cloudBucket-oncreate_cloudBucket-oncreate-TopicSubscription-9e6a3d6f_85F8BD16"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-oncreate-OnMessage-9e6a3d6f_8D2D943D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-oncreate_0FC2B6A2.arn}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-a9ead87e_6FB5DEAD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-a9ead87e",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-a9ead87e_6FB5DEAD"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-a9ead87e_E383E821.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}"
      },
      "undefined_cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-b4d6f6b7_CB840D85": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-ondelete/cloud.Bucket-ondelete-TopicSubscription-b4d6f6b7",
            "uniqueId": "undefined_cloudBucket_cloudBucket-ondelete_cloudBucket-ondelete-TopicSubscription-b4d6f6b7_CB840D85"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-ondelete-OnMessage-b4d6f6b7_1097D343.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-ondelete_C8B28033.arn}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-035588c0_1B2F271B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-035588c0",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-035588c0_1B2F271B"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-035588c0_37FE7A45.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}"
      },
      "undefined_cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-cbf12392_AB8DFE1F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/cloud.Bucket-onupdate/cloud.Bucket-onupdate-TopicSubscription-cbf12392",
            "uniqueId": "undefined_cloudBucket_cloudBucket-onupdate_cloudBucket-onupdate-TopicSubscription-cbf12392_AB8DFE1F"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudBucket_cloudBucket-onupdate-OnMessage-cbf12392_934C648A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudBucket_cloudBucket-onupdate_3B234DA5.arn}"
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
const ex = $stdlib.ex;
const util = $stdlib.util;
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
new $App({ outdir: $outdir, name: "events", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


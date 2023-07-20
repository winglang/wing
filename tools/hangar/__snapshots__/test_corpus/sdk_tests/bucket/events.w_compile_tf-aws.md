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
      (await $logHistory(key,"DELETE",$Source.anyEvent));
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
      (await $logHistory(key,"UPDATE",$Source.anyEvent));
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
      (await $logHistory(key,"CREATE",$Source.anyEvent));
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
      (await $logHistory(key,String.raw({ raw: ["", ""] }, event),$Source.onEvent));
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({ $Util }) {
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
        (await $Util.sleep(10000));
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
          if (((((u)["key"] === opts.key) && ((u)["operation"] === opts.type)) && ((u)["source"] === String.raw({ raw: ["", ""] }, opts.source)))) {
            count = (count + 1);
          }
        }
        return (count === opts.count);
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
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"a\", type: \"CREATE\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "a", type: "CREATE", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"CREATE\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "CREATE", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"CREATE\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "CREATE", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"a\", type: \"CREATE\", source: Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "a", type: "CREATE", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"CREATE\", source:  Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "CREATE", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"CREATE\", source:  Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "CREATE", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"UPDATE\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "UPDATE", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"DELETE\", source: Source.anyEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "DELETE", source: $Source.anyEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"b\", type: \"UPDATE\", source: Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "b", type: "UPDATE", source: $Source.onEvent, count: 1 })))))};
        {((cond) => {if (!cond) throw new Error("assertion failed: wait(checkHitCount(key: \"c\", type: \"DELETE\", source: Source.onEvent, count: 1))")})((await $wait((await $checkHitCount({ key: "c", type: "DELETE", source: $Source.onEvent, count: 1 })))))};
      }
    }
  }
  return $Closure8;
}

```

## inflight.Util.js
```js
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
    static async sleep(milli) {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
  }
  return Util;
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
      "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRole_324909ED": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRole_324909ED"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRole_72BADB08": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRole_72BADB08"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRole_40D9C71E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRole_40D9C71E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRole_4554AF84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRole_4554AF84"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRole_FD7BC908": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRole_FD7BC908"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRole_7260B85F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/IamRole",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRole_7260B85F"
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
      "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRolePolicy_45F66540": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRolePolicy_45F66540"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRole_324909ED.name}"
      },
      "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRolePolicy_A41FA737": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRolePolicy_A41FA737"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRole_72BADB08.name}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRolePolicy_34D95A68": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRolePolicy_34D95A68"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRole_40D9C71E.name}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRolePolicy_BD944116": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRolePolicy_BD944116"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRole_4554AF84.name}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRolePolicy_3F8615D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRolePolicy_3F8615D0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRole_FD7BC908.name}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRolePolicy_9C52CDBE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/IamRolePolicy",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRolePolicy_9C52CDBE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.exTable.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRole_7260B85F.name}"
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
      "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRolePolicyAttachment_CCFCC1DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRolePolicyAttachment_CCFCC1DD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRole_324909ED.name}"
      },
      "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRolePolicyAttachment_7363B734": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRolePolicyAttachment_7363B734"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRole_72BADB08.name}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRolePolicyAttachment_6E96AE56": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRolePolicyAttachment_6E96AE56"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRole_40D9C71E.name}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRolePolicyAttachment_C2EED243": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRolePolicyAttachment_C2EED243"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRole_4554AF84.name}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRolePolicyAttachment_ABD4312B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRolePolicyAttachment_ABD4312B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRole_FD7BC908.name}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRolePolicyAttachment_8E09ADAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/IamRolePolicyAttachment",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRolePolicyAttachment_8E09ADAB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRole_7260B85F.name}"
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
      "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_B2A2D2CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_B2A2D2CC"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_create-OnMessage-440eabdf-c86eb675",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_create-OnMessage-440eabdf-c86eb675",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_IamRole_324909ED.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_S3Object_0E9FF293.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_64E70E45": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_64E70E45"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_create-OnMessage-e889c56f-c8509332",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_create-OnMessage-e889c56f-c8509332",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_IamRole_72BADB08.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_S3Object_3560885F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_4842B02D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_4842B02D"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_delete-OnMessage-25075838-c8e76d95",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_delete-OnMessage-25075838-c8e76d95",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_delete-OnMessage-25075838_IamRole_40D9C71E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-on_delete-OnMessage-25075838_S3Object_BE83E70F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_D08B52C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_D08B52C1"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_delete-OnMessage-252b9bf8-c84c16bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_delete-OnMessage-252b9bf8-c84c16bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_IamRole_4554AF84.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_S3Object_DF34F087.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_1152DF11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_1152DF11"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_update-OnMessage-675a2aa1-c80803b8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_update-OnMessage-675a2aa1-c80803b8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_IamRole_FD7BC908.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_S3Object_CD5AB0FC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_9F81CF98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_9F81CF98"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18": "${aws_dynamodb_table.exTable.name}",
            "DYNAMODB_TABLE_NAME_d5d44f18_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_d5d44f18_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_update-OnMessage-ae97bd1d-c84cffd8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_update-OnMessage-ae97bd1d-c84cffd8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_IamRole_7260B85F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_S3Object_F63E681D.key}",
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
      "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782_FBEA3168": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782_FBEA3168"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_B2A2D2CC.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}"
      },
      "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782_914E1412": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782_914E1412"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_64E70E45.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_0BBFD2FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_0BBFD2FD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-on_delete-OnMessage-25075838_4842B02D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_DCE299CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_DCE299CC"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_D08B52C1.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_05622DA2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_05622DA2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_1152DF11.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_16C06870": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_16C06870"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_9F81CF98.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}"
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
          "aws_sns_topic_policy.cloudBucket_cloudBucket-on_delete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_25EB2271",
          "aws_sns_topic_policy.cloudBucket_cloudBucket-on_update_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_C785E6BD",
          "aws_sns_topic_policy.cloudBucket_cloudBucket-on_create_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_38C2E52D"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}"
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
      "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_S3Object_0E9FF293": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_S3Object_0E9FF293"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_S3Object_3560885F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_S3Object_3560885F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_S3Object_BE83E70F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-25075838_S3Object_BE83E70F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_S3Object_DF34F087": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_S3Object_DF34F087"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_S3Object_CD5AB0FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_S3Object_CD5AB0FC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_S3Object_F63E681D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/S3Object",
            "uniqueId": "cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_S3Object_F63E681D"
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
      "cloudBucket_cloudBucket-on_create_FD378B04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_create_FD378B04"
          }
        },
        "name": "cloud-Bucket-on_create-c89fd668"
      },
      "cloudBucket_cloudBucket-on_delete_D72FF170": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_delete_D72FF170"
          }
        },
        "name": "cloud-Bucket-on_delete-c8f63fc3"
      },
      "cloudBucket_cloudBucket-on_update_C26CC5D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/Default",
            "uniqueId": "cloudBucket_cloudBucket-on_update_C26CC5D4"
          }
        },
        "name": "cloud-Bucket-on_update-c8cecab7"
      }
    },
    "aws_sns_topic_policy": {
      "cloudBucket_cloudBucket-on_create_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_38C2E52D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-on_create_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_38C2E52D"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_cloudBucket-on_delete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_25EB2271": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-on_delete_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_25EB2271"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      },
      "cloudBucket_cloudBucket-on_update_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_C785E6BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "cloudBucket_cloudBucket-on_update_PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447_C785E6BD"
          }
        },
        "arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.cloudBucket.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudBucket_cloudBucket-on_create_cloudBucket-on_create-TopicSubscription-440eabdf_4F6969EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/cloud.Bucket-on_create-TopicSubscription-440eabdf",
            "uniqueId": "cloudBucket_cloudBucket-on_create_cloudBucket-on_create-TopicSubscription-440eabdf_4F6969EE"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-on_create-OnMessage-440eabdf_B2A2D2CC.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}"
      },
      "cloudBucket_cloudBucket-on_create_cloudBucket-on_create-TopicSubscription-e889c56f_E43BF0AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/cloud.Bucket-on_create-TopicSubscription-e889c56f",
            "uniqueId": "cloudBucket_cloudBucket-on_create_cloudBucket-on_create-TopicSubscription-e889c56f_E43BF0AD"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-on_create-OnMessage-e889c56f_64E70E45.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_create_FD378B04.arn}"
      },
      "cloudBucket_cloudBucket-on_delete_cloudBucket-on_delete-TopicSubscription-25075838_7133D129": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/cloud.Bucket-on_delete-TopicSubscription-25075838",
            "uniqueId": "cloudBucket_cloudBucket-on_delete_cloudBucket-on_delete-TopicSubscription-25075838_7133D129"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-on_delete-OnMessage-25075838_4842B02D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}"
      },
      "cloudBucket_cloudBucket-on_delete_cloudBucket-on_delete-TopicSubscription-252b9bf8_D8800E63": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/cloud.Bucket-on_delete-TopicSubscription-252b9bf8",
            "uniqueId": "cloudBucket_cloudBucket-on_delete_cloudBucket-on_delete-TopicSubscription-252b9bf8_D8800E63"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-on_delete-OnMessage-252b9bf8_D08B52C1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_delete_D72FF170.arn}"
      },
      "cloudBucket_cloudBucket-on_update_cloudBucket-on_update-TopicSubscription-675a2aa1_1E9BC18A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/cloud.Bucket-on_update-TopicSubscription-675a2aa1",
            "uniqueId": "cloudBucket_cloudBucket-on_update_cloudBucket-on_update-TopicSubscription-675a2aa1_1E9BC18A"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-on_update-OnMessage-675a2aa1_1152DF11.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}"
      },
      "cloudBucket_cloudBucket-on_update_cloudBucket-on_update-TopicSubscription-ae97bd1d_7580CB94": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/cloud.Bucket-on_update-TopicSubscription-ae97bd1d",
            "uniqueId": "cloudBucket_cloudBucket-on_update_cloudBucket-on_update-TopicSubscription-ae97bd1d_7580CB94"
          }
        },
        "endpoint": "${aws_lambda_function.cloudBucket_cloudBucket-on_update-OnMessage-ae97bd1d_9F81CF98.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudBucket_cloudBucket-on_update_C26CC5D4.arn}"
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
const ex = require('@winglang/sdk').ex;
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Util.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const UtilClient = ${Util._toInflightType(this).text};
            const client = new UtilClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure6.js")({
            $Util: ${context._lift(Util)},
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
          $Closure6._registerBindObject(Util, host, ["sleep"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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


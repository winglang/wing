# [events.w](../../../../../../examples/tests/sdk_tests/bucket/events.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ table, idsCounter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key, operation, source)  {
      (await table.insert(`${(await idsCounter.inc())}`,Object.freeze({"key":key,"operation":operation,"source":`${source}`})));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ logHistory, Source }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      (await logHistory(key,"DELETE",Source.anyEvent));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ logHistory, Source }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      (await logHistory(key,"UPDATE",Source.anyEvent));
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ logHistory, Source }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      (await logHistory(key,"CREATE",Source.anyEvent));
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({ logHistory, Source }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key, event)  {
      (await logHistory(key,`${event}`,Source.onEvent));
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({ Util }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(pred)  {
      let i = 0;
      while ((i < 12)) {
        if ((await pred())) {
          return true;
        }
        (await Util.sleep(10000));
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
module.exports = function({ table }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(opts)  {
      return async () =>  {
        let count = 0;
        for (const u of (await table.list())) {
          if (((((u)["key"] === opts.key) && ((u)["operation"] === opts.type)) && ((u)["source"] === `${opts.source}`))) {
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
module.exports = function({ b, wait, checkHitCount, Source }) {
  class $Closure8 {
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
      (await b.put("c","1"));
      (await b.put("b","100"));
      (await b.delete("c"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "a", type: "CREATE", source: Source.anyEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "a", type: "CREATE", source: Source.anyEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "b", type: "CREATE", source: Source.anyEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "b", type: "CREATE", source: Source.anyEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "c", type: "CREATE", source: Source.anyEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "c", type: "CREATE", source: Source.anyEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "a", type: "CREATE", source: Source.onEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "a", type: "CREATE", source: Source.onEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "b", type: "CREATE", source: Source.onEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "b", type: "CREATE", source: Source.onEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "c", type: "CREATE", source: Source.onEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "c", type: "CREATE", source: Source.onEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "b", type: "UPDATE", source: Source.anyEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "b", type: "UPDATE", source: Source.anyEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "c", type: "DELETE", source: Source.anyEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "c", type: "DELETE", source: Source.anyEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "b", type: "UPDATE", source: Source.onEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "b", type: "UPDATE", source: Source.onEvent, count: 1 })))))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await wait((await checkHitCount({ key: "c", type: "DELETE", source: Source.onEvent, count: 1 }))))'`)})((await wait((await checkHitCount({ key: "c", type: "DELETE", source: Source.onEvent, count: 1 })))))};
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
    async $inflight_init()  {
      const __parent_this = this;
    }
    static async sleep(milli)  {
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
      "value": "[[\"root/Default/Default/hitCount is incremented according to the bucket event\",\"${aws_lambda_function.root_hitCountisincrementedaccordingtothebucketevent_Handler_EC2858A2.arn}\"]]"
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
      },
      "root_cloudTable_323D7643": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Table/Default",
            "uniqueId": "root_cloudTable_323D7643"
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
        "name": "key-historycloud.Table-c83b78a7"
      }
    },
    "aws_iam_role": {
      "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRole_30706CBE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRole_30706CBE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRole_705DC888": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRole_705DC888"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRole_1BE6C1CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRole_1BE6C1CC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRole_E1C544E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRole_E1C544E0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRole_74B414C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRole_74B414C4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRole_CECD9E96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/IamRole",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRole_CECD9E96"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRole",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRolePolicy_675C6DEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRolePolicy_675C6DEE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRole_30706CBE.name}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRolePolicy_648290E9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRolePolicy_648290E9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRole_705DC888.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRolePolicy_F5FB115F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRolePolicy_F5FB115F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRole_1BE6C1CC.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRolePolicy_9BF85531": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRolePolicy_9BF85531"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRole_E1C544E0.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRolePolicy_6638F7CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRolePolicy_6638F7CC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRole_74B414C4.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRolePolicy_E98946EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/IamRolePolicy",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRolePolicy_E98946EC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:PutItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRole_CECD9E96.name}"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_3CBCB600": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicy",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicy_3CBCB600"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:Scan\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudTable_323D7643.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRolePolicyAttachment_E470AE90": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRolePolicyAttachment_E470AE90"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRole_30706CBE.name}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRolePolicyAttachment_72371D31": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRolePolicyAttachment_72371D31"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRole_705DC888.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRolePolicyAttachment_7EEE4C45": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRolePolicyAttachment_7EEE4C45"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRole_1BE6C1CC.name}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRolePolicyAttachment_A563DE5A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRolePolicyAttachment_A563DE5A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRole_E1C544E0.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRolePolicyAttachment_D4377AF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRolePolicyAttachment_D4377AF6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRole_74B414C4.name}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRolePolicyAttachment_CB5A6C7B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/IamRolePolicyAttachment",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRolePolicyAttachment_CB5A6C7B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRole_CECD9E96.name}"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_CDE69A9E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRolePolicyAttachment_CDE69A9E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_4D163F97": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/Default",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_4D163F97"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_create-OnMessage-440eabdf-c86eb675",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_create-OnMessage-440eabdf-c86eb675",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_IamRole_30706CBE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_S3Object_1E18A415.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_66380BD2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/Default",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_66380BD2"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_create-OnMessage-e889c56f-c8509332",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_create-OnMessage-e889c56f-c8509332",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_IamRole_705DC888.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_S3Object_C9D20E7E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage25075838_CF454119": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/Default",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage25075838_CF454119"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_delete-OnMessage-25075838-c8e76d95",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_delete-OnMessage-25075838-c8e76d95",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage25075838_IamRole_1BE6C1CC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketondeleteOnMessage25075838_S3Object_ACFABC82.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_0CCF73AF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/Default",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_0CCF73AF"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_delete-OnMessage-252b9bf8-c84c16bd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_delete-OnMessage-252b9bf8-c84c16bd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_IamRole_E1C544E0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_S3Object_77113C3A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_A7113894": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/Default",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_A7113894"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_update-OnMessage-675a2aa1-c80803b8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_update-OnMessage-675a2aa1-c80803b8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_IamRole_74B414C4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_S3Object_3B01AE1D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_0F43322A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/Default",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_0F43322A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "cloud-Bucket-on_update-OnMessage-ae97bd1d-c84cffd8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Bucket-on_update-OnMessage-ae97bd1d-c84cffd8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_IamRole_CECD9E96.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_S3Object_6992D9FE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_EC2858A2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/Default",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_EC2858A2"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_e8a1ff2c": "${aws_dynamodb_table.root_cloudTable_323D7643.name}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_COLUMNS": "{\"_id\":0,\"key\":0,\"operation\":0,\"source\":0}",
            "DYNAMODB_TABLE_NAME_e8a1ff2c_PRIMARY_KEY": "_id",
            "WING_FUNCTION_NAME": "Handler-c88204a7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88204a7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_hitCountisincrementedaccordingtothebucketevent_Handler_IamRole_1E308580.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_24D57850.key}",
        "timeout": 480,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_02314CA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_02314CA7"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_4D163F97.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_DC947A98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/InvokePermission-c89fd66889f1b8842d3aee252263214e2b098b9782",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_InvokePermissionc89fd66889f1b8842d3aee252263214e2b098b9782_DC947A98"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_66380BD2.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage25075838_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_05B0EBA3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage25075838_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_05B0EBA3"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessage25075838_CF454119.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_2789DAAE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/InvokePermission-c8f63fc3fb14f6c3afb9709525bdfe56f930b0f062",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_InvokePermissionc8f63fc3fb14f6c3afb9709525bdfe56f930b0f062_2789DAAE"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_0CCF73AF.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_AF7F8B1C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_AF7F8B1C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_A7113894.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_6B9543BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/InvokePermission-c8cecab74248f68ee1fd2ffd8c17841f84e2c5d672",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_InvokePermissionc8cecab74248f68ee1fd2ffd8c17841f84e2c5d672_6B9543BB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_0F43322A.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
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
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "root_cloudBucket_S3BucketNotification_2AEE506E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/S3BucketNotification",
            "uniqueId": "root_cloudBucket_S3BucketNotification_2AEE506E"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.id}",
        "depends_on": [
          "aws_sns_topic_policy.root_cloudBucket_cloudBucketondelete_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B4C9C45B",
          "aws_sns_topic_policy.root_cloudBucket_cloudBucketonupdate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B73EA539",
          "aws_sns_topic_policy.root_cloudBucket_cloudBucketoncreate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_3717A939"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-delete-notification",
            "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-update-notification",
            "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-create-notification",
            "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
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
      "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_S3Object_1E18A415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-440eabdf/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_S3Object_1E18A415"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_S3Object_C9D20E7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create-OnMessage-e889c56f/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_S3Object_C9D20E7E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage25075838_S3Object_ACFABC82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-25075838/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage25075838_S3Object_ACFABC82"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_S3Object_77113C3A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete-OnMessage-252b9bf8/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_S3Object_77113C3A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_S3Object_3B01AE1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-675a2aa1/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_S3Object_3B01AE1D"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_S3Object_6992D9FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update-OnMessage-ae97bd1d/S3Object",
            "uniqueId": "root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_S3Object_6992D9FE"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_24D57850": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/hitCount is incremented according to the bucket event/Handler/S3Object",
            "uniqueId": "root_hitCountisincrementedaccordingtothebucketevent_Handler_S3Object_24D57850"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_cloudBucket_cloudBucketoncreate_B562FEB8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/Default",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_B562FEB8"
          }
        },
        "name": "cloud-Bucket-on_create-c89fd668"
      },
      "root_cloudBucket_cloudBucketondelete_34EA6151": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/Default",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_34EA6151"
          }
        },
        "name": "cloud-Bucket-on_delete-c8f63fc3"
      },
      "root_cloudBucket_cloudBucketonupdate_AAD81D71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/Default",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_AAD81D71"
          }
        },
        "name": "cloud-Bucket-on_update-c8cecab7"
      }
    },
    "aws_sns_topic_policy": {
      "root_cloudBucket_cloudBucketoncreate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_3717A939": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_3717A939"
          }
        },
        "arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\"}}}]}"
      },
      "root_cloudBucket_cloudBucketondelete_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B4C9C45B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B4C9C45B"
          }
        },
        "arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\"}}}]}"
      },
      "root_cloudBucket_cloudBucketonupdate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B73EA539": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/PublishPermission-c87175e7bebeddc2b07a15f76241cf54a4d755b447",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_PublishPermissionc87175e7bebeddc2b07a15f76241cf54a4d755b447_B73EA539"
          }
        },
        "arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscription440eabdf_AD5273BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/cloud.Bucket-on_create-TopicSubscription-440eabdf",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscription440eabdf_AD5273BD"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessage440eabdf_4D163F97.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscriptione889c56f_90B98F68": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_create/cloud.Bucket-on_create-TopicSubscription-e889c56f",
            "uniqueId": "root_cloudBucket_cloudBucketoncreate_cloudBucketoncreateTopicSubscriptione889c56f_90B98F68"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketoncreateOnMessagee889c56f_66380BD2.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketoncreate_B562FEB8.arn}"
      },
      "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscription25075838_A2E3D54A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/cloud.Bucket-on_delete-TopicSubscription-25075838",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscription25075838_A2E3D54A"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessage25075838_CF454119.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscription252b9bf8_1A356A26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_delete/cloud.Bucket-on_delete-TopicSubscription-252b9bf8",
            "uniqueId": "root_cloudBucket_cloudBucketondelete_cloudBucketondeleteTopicSubscription252b9bf8_1A356A26"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketondeleteOnMessage252b9bf8_0CCF73AF.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketondelete_34EA6151.arn}"
      },
      "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscription675a2aa1_8AFF4DFD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/cloud.Bucket-on_update-TopicSubscription-675a2aa1",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscription675a2aa1_8AFF4DFD"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessage675a2aa1_A7113894.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
      },
      "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscriptionae97bd1d_ED0C01F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/cloud.Bucket-on_update/cloud.Bucket-on_update-TopicSubscription-ae97bd1d",
            "uniqueId": "root_cloudBucket_cloudBucketonupdate_cloudBucketonupdateTopicSubscriptionae97bd1d_ED0C01F8"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudBucket_cloudBucketonupdateOnMessageae97bd1d_0F43322A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudBucket_cloudBucketonupdate_AAD81D71.arn}"
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
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Util.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("sleep")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const table_client = context._lift(table);
        const idsCounter_client = context._lift(idsCounter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            table: ${table_client},
            idsCounter: ${idsCounter_client},
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
          $Closure1._registerBindObject(idsCounter, host, []);
          $Closure1._registerBindObject(table, host, []);
        }
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const logHistory_client = context._lift(logHistory);
        const SourceClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["anyEvent"] = 0] = "anyEvent";
            tmp[tmp["onEvent"] = 1] = "onEvent";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
            Source: ${SourceClient.text},
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
          $Closure2._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const logHistory_client = context._lift(logHistory);
        const SourceClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["anyEvent"] = 0] = "anyEvent";
            tmp[tmp["onEvent"] = 1] = "onEvent";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
            Source: ${SourceClient.text},
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
          $Closure3._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        const logHistory_client = context._lift(logHistory);
        const SourceClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["anyEvent"] = 0] = "anyEvent";
            tmp[tmp["onEvent"] = 1] = "onEvent";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
            Source: ${SourceClient.text},
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
          $Closure4._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Closure4._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure5.js";
        const logHistory_client = context._lift(logHistory);
        const SourceClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["anyEvent"] = 0] = "anyEvent";
            tmp[tmp["onEvent"] = 1] = "onEvent";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            logHistory: ${logHistory_client},
            Source: ${SourceClient.text},
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
          $Closure5._registerBindObject(logHistory, host, []);
        }
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(logHistory, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure6.js";
        const UtilClient = Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Util: ${UtilClient.text},
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
        }
        if (ops.includes("handle")) {
          $Closure6._registerBindObject(Util, host, ["sleep"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure7.js";
        const table_client = context._lift(table);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            table: ${table_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure7._registerBindObject(table, host, []);
        }
        if (ops.includes("handle")) {
          $Closure7._registerBindObject(table, host, ["list"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure8.js";
        const b_client = context._lift(b);
        const wait_client = context._lift(wait);
        const checkHitCount_client = context._lift(checkHitCount);
        const SourceClient = $stdlib.core.NodeJsCode.fromInline(`
          Object.freeze((function (tmp) {
            tmp[tmp["anyEvent"] = 0] = "anyEvent";
            tmp[tmp["onEvent"] = 1] = "onEvent";
            return tmp;
          })({}))
        `);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            b: ${b_client},
            wait: ${wait_client},
            checkHitCount: ${checkHitCount_client},
            Source: ${SourceClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure8._registerBindObject(b, host, []);
          $Closure8._registerBindObject(checkHitCount, host, []);
          $Closure8._registerBindObject(wait, host, []);
        }
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
    const table = this.node.root.newAbstract("@winglang/sdk.cloud.Table",this,"cloud.Table",{ name: "key-history", primaryKey: "_id", columns: Object.freeze({"_id":cloud.ColumnType.STRING,"key":cloud.ColumnType.STRING,"operation":cloud.ColumnType.STRING,"source":cloud.ColumnType.STRING}) });
    const logHistory = new $Closure1(this,"$Closure1");
    (b.onDelete(new $Closure2(this,"$Closure2")));
    (b.onUpdate(new $Closure3(this,"$Closure3")));
    (b.onCreate(new $Closure4(this,"$Closure4")));
    (b.onEvent(new $Closure5(this,"$Closure5")));
    const wait = new $Closure6(this,"$Closure6");
    const checkHitCount = new $Closure7(this,"$Closure7");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"hitCount is incremented according to the bucket event",new $Closure8(this,"$Closure8"),{
    "timeout": (std.Duration.fromSeconds(480)),}
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


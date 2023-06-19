# [array.w](../../../../../../examples/tests/sdk_tests/std/array.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.freeze(["hello"]).length === 1)'`)})((Object.freeze(["hello"]).length === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(["hello"].length === 1)'`)})((["hello"].length === 1))};
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
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await Object.freeze(["hello"]).at(0)) === "hello")'`)})(((await Object.freeze(["hello"]).at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await ["hello", "world"].at(1)) === "world")'`)})(((await ["hello", "world"].at(1)) === "world"))};
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
    async $inflight_init()  {
    }
    async handle()  {
      const a = ["hello"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
      (await a.push("world"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 2)'`)})((a.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(0)) === "hello")'`)})(((await a.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(1)) === "world")'`)})(((await a.at(1)) === "world"))};
      (await a.pop());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await a.at(0)) === "hello")'`)})(((await a.at(0)) === "hello"))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const b = ["hello"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(b.length === 1)'`)})((b.length === 1))};
      const c = ["wing"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(c.length === 1)'`)})((c.length === 1))};
      const d = (await b.concat(c));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(d.length === 2)'`)})((d.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await d.at(0)) === "hello")'`)})(((await d.at(0)) === "hello"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await d.at(1)) === "wing")'`)})(((await d.at(1)) === "wing"))};
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
    async $inflight_init()  {
    }
    async handle()  {
      const e = ["hello", "wing"];
      const f = "wing";
      const contains = e.includes(f);
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'contains'`)})(contains)};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({  }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const g = ["hello", "wing"];
      const h = "wing";
      const index = g.indexOf(h);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(index === 1)'`)})((index === 1))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7.js
```js
module.exports = function({  }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const i = ["hello", "wing"];
      const j = "wing";
      const delimeter = ";";
      const joinedString = (await i.join(delimeter));
      const expectedString = (((await i.at(0)) + delimeter) + (await i.at(1)));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(joinedString === expectedString)'`)})((joinedString === expectedString))};
    }
  }
  return $Closure7;
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
      "value": "[[\"root/Default/Default/test:length\",\"${aws_lambda_function.root_testlength_Handler_7245E498.arn}\"],[\"root/Default/Default/test:at()\",\"${aws_lambda_function.root_testat_Handler_39FB3FA1.arn}\"],[\"root/Default/Default/test:pushAndPop()\",\"${aws_lambda_function.root_testpushAndPop_Handler_20B4DAAB.arn}\"],[\"root/Default/Default/test:concat()\",\"${aws_lambda_function.root_testconcat_Handler_2B9B5654.arn}\"],[\"root/Default/Default/test:contains()\",\"${aws_lambda_function.root_testcontains_Handler_9F29A18C.arn}\"],[\"root/Default/Default/test:indexOf()\",\"${aws_lambda_function.root_testindexOf_Handler_6F5475B9.arn}\"],[\"root/Default/Default/test:join()\",\"${aws_lambda_function.root_testjoin_Handler_CB9050B7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testat_Handler_IamRole_EA5BD403": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRole",
            "uniqueId": "root_testat_Handler_IamRole_EA5BD403"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testconcat_Handler_IamRole_D3565082": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRole",
            "uniqueId": "root_testconcat_Handler_IamRole_D3565082"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcontains_Handler_IamRole_D838F461": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRole",
            "uniqueId": "root_testcontains_Handler_IamRole_D838F461"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testindexOf_Handler_IamRole_7B64B0A4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRole",
            "uniqueId": "root_testindexOf_Handler_IamRole_7B64B0A4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testjoin_Handler_IamRole_51CF02B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRole",
            "uniqueId": "root_testjoin_Handler_IamRole_51CF02B8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlength_Handler_IamRole_A8384051": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRole",
            "uniqueId": "root_testlength_Handler_IamRole_A8384051"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testpushAndPop_Handler_IamRole_EC6118B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRole",
            "uniqueId": "root_testpushAndPop_Handler_IamRole_EC6118B7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testat_Handler_IamRolePolicy_F5E3D10E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicy",
            "uniqueId": "root_testat_Handler_IamRolePolicy_F5E3D10E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.name}"
      },
      "root_testconcat_Handler_IamRolePolicy_9FC6C8CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRolePolicy",
            "uniqueId": "root_testconcat_Handler_IamRolePolicy_9FC6C8CB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testconcat_Handler_IamRole_D3565082.name}"
      },
      "root_testcontains_Handler_IamRolePolicy_98FEE2B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRolePolicy",
            "uniqueId": "root_testcontains_Handler_IamRolePolicy_98FEE2B9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcontains_Handler_IamRole_D838F461.name}"
      },
      "root_testindexOf_Handler_IamRolePolicy_8E7A6391": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRolePolicy",
            "uniqueId": "root_testindexOf_Handler_IamRolePolicy_8E7A6391"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testindexOf_Handler_IamRole_7B64B0A4.name}"
      },
      "root_testjoin_Handler_IamRolePolicy_A86111B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRolePolicy",
            "uniqueId": "root_testjoin_Handler_IamRolePolicy_A86111B4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testjoin_Handler_IamRole_51CF02B8.name}"
      },
      "root_testlength_Handler_IamRolePolicy_9DE70A2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicy",
            "uniqueId": "root_testlength_Handler_IamRolePolicy_9DE70A2C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      },
      "root_testpushAndPop_Handler_IamRolePolicy_38557369": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRolePolicy",
            "uniqueId": "root_testpushAndPop_Handler_IamRolePolicy_38557369"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testpushAndPop_Handler_IamRole_EC6118B7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testat_Handler_IamRolePolicyAttachment_13C52D1D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testat_Handler_IamRolePolicyAttachment_13C52D1D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.name}"
      },
      "root_testconcat_Handler_IamRolePolicyAttachment_3ECF4EC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testconcat_Handler_IamRolePolicyAttachment_3ECF4EC6"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testconcat_Handler_IamRole_D3565082.name}"
      },
      "root_testcontains_Handler_IamRolePolicyAttachment_2B74BA53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcontains_Handler_IamRolePolicyAttachment_2B74BA53"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcontains_Handler_IamRole_D838F461.name}"
      },
      "root_testindexOf_Handler_IamRolePolicyAttachment_44945C33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testindexOf_Handler_IamRolePolicyAttachment_44945C33"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testindexOf_Handler_IamRole_7B64B0A4.name}"
      },
      "root_testjoin_Handler_IamRolePolicyAttachment_24627D71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testjoin_Handler_IamRolePolicyAttachment_24627D71"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testjoin_Handler_IamRole_51CF02B8.name}"
      },
      "root_testlength_Handler_IamRolePolicyAttachment_75515754": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlength_Handler_IamRolePolicyAttachment_75515754"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.name}"
      },
      "root_testpushAndPop_Handler_IamRolePolicyAttachment_F2C28810": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testpushAndPop_Handler_IamRolePolicyAttachment_F2C28810"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testpushAndPop_Handler_IamRole_EC6118B7.name}"
      }
    },
    "aws_lambda_function": {
      "root_testat_Handler_39FB3FA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/Default",
            "uniqueId": "root_testat_Handler_39FB3FA1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c858faac",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c858faac",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testat_Handler_IamRole_EA5BD403.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testat_Handler_S3Object_C90B92D0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testconcat_Handler_2B9B5654": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/Default",
            "uniqueId": "root_testconcat_Handler_2B9B5654"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c869963c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c869963c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testconcat_Handler_IamRole_D3565082.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testconcat_Handler_S3Object_883D8A97.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcontains_Handler_9F29A18C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/Default",
            "uniqueId": "root_testcontains_Handler_9F29A18C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e953a0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e953a0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcontains_Handler_IamRole_D838F461.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcontains_Handler_S3Object_65C920EB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testindexOf_Handler_6F5475B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/Default",
            "uniqueId": "root_testindexOf_Handler_6F5475B9"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80be453",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80be453",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testindexOf_Handler_IamRole_7B64B0A4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testindexOf_Handler_S3Object_4F451E5A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testjoin_Handler_CB9050B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/Default",
            "uniqueId": "root_testjoin_Handler_CB9050B7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a46f15",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a46f15",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testjoin_Handler_IamRole_51CF02B8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testjoin_Handler_S3Object_72E20B44.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testlength_Handler_7245E498": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/Default",
            "uniqueId": "root_testlength_Handler_7245E498"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e0ccbd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e0ccbd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlength_Handler_IamRole_A8384051.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlength_Handler_S3Object_22B052A5.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testpushAndPop_Handler_20B4DAAB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/Default",
            "uniqueId": "root_testpushAndPop_Handler_20B4DAAB"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8b6e896",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b6e896",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testpushAndPop_Handler_IamRole_EC6118B7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testpushAndPop_Handler_S3Object_E9F1EBBB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      }
    },
    "aws_s3_object": {
      "root_testat_Handler_S3Object_C90B92D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:at()/Handler/S3Object",
            "uniqueId": "root_testat_Handler_S3Object_C90B92D0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testconcat_Handler_S3Object_883D8A97": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:concat()/Handler/S3Object",
            "uniqueId": "root_testconcat_Handler_S3Object_883D8A97"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcontains_Handler_S3Object_65C920EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:contains()/Handler/S3Object",
            "uniqueId": "root_testcontains_Handler_S3Object_65C920EB"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testindexOf_Handler_S3Object_4F451E5A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:indexOf()/Handler/S3Object",
            "uniqueId": "root_testindexOf_Handler_S3Object_4F451E5A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testjoin_Handler_S3Object_72E20B44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:join()/Handler/S3Object",
            "uniqueId": "root_testjoin_Handler_S3Object_72E20B44"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testlength_Handler_S3Object_22B052A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:length/Handler/S3Object",
            "uniqueId": "root_testlength_Handler_S3Object_22B052A5"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testpushAndPop_Handler_S3Object_E9F1EBBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:pushAndPop()/Handler/S3Object",
            "uniqueId": "root_testpushAndPop_Handler_S3Object_E9F1EBBB"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
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
      constructor(scope, id, ) {
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
      constructor(scope, id, ) {
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
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure4.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
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
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure6.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.freeze([1, 2, 3]).length === 3)'`)})((Object.freeze([1, 2, 3]).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '([1, 2, 3].length === 3)'`)})(([1, 2, 3].length === 3))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:length",new $Closure1(this,"$Closure1"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.freeze(["hello"]).at(0)) === "hello")'`)})(((Object.freeze(["hello"]).at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((["hello", "world"].at(1)) === "world")'`)})(((["hello", "world"].at(1)) === "world"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:at()",new $Closure2(this,"$Closure2"));
    const a = ["hello"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
    (a.push("world"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 2)'`)})((a.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(0)) === "hello")'`)})(((a.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(1)) === "world")'`)})(((a.at(1)) === "world"))};
    (a.pop());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(a.length === 1)'`)})((a.length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((a.at(0)) === "hello")'`)})(((a.at(0)) === "hello"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:pushAndPop()",new $Closure3(this,"$Closure3"));
    const b = ["hello"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(b.length === 1)'`)})((b.length === 1))};
    const c = ["wing"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(c.length === 1)'`)})((c.length === 1))};
    const d = (b.concat(c));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(d.length === 2)'`)})((d.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((d.at(0)) === "hello")'`)})(((d.at(0)) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((d.at(1)) === "wing")'`)})(((d.at(1)) === "wing"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:concat()",new $Closure4(this,"$Closure4"));
    const e = ["hello", "wing"];
    const f = "wing";
    const contains = e.includes(f);
    {((cond) => {if (!cond) throw new Error(`assertion failed: 'contains'`)})(contains)};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:contains()",new $Closure5(this,"$Closure5"));
    const g = ["hello", "wing"];
    const h = "wing";
    const index = g.indexOf(h);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(index === 1)'`)})((index === 1))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:indexOf()",new $Closure6(this,"$Closure6"));
    const i = ["hello", "wing"];
    const j = "wing";
    const delimeter = ";";
    const joinedString = (i.join(delimeter));
    const expectedString = (((i.at(0)) + delimeter) + (i.at(1)));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(joinedString === expectedString)'`)})((joinedString === expectedString))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:join()",new $Closure7(this,"$Closure7"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "array", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


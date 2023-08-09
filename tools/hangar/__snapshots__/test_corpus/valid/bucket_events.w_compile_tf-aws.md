# [bucket_events.w](../../../../../examples/tests/valid/bucket_events.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      {console.log(String.raw({ raw: ["deleted ", ""] }, key))};
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
    async handle(key) {
      {console.log(String.raw({ raw: ["updated ", ""] }, key))};
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
    async handle(key) {
      {console.log(String.raw({ raw: ["created ", ""] }, key))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ $other }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key, event) {
      (await $other.put(String.raw({ raw: ["last_", "_key"] }, event),key));
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
    async handle(key) {
      {console.log("other bucket event called!")};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6.js
```js
module.exports = function({ $b }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $b.put("a","1"));
      (await $b.put("b","1"));
      (await $b.put("b","100"));
      (await $b.put("c","1"));
      (await $b.delete("c"));
    }
  }
  return $Closure6;
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
      "value": "[[\"root/undefined/Default/test:putting and deleting from a bucket to trigger bucket events\",\"${aws_lambda_function.undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_4D5D01F5.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_b_b-oncreate-OnMessage-0072604d_IamRole_55617422": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-0072604d/IamRole",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-0072604d_IamRole_55617422"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_b_b-oncreate-OnMessage-1274a289_IamRole_FE4B77B0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-1274a289/IamRole",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-1274a289_IamRole_FE4B77B0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_b_b-ondelete-OnMessage-0c509e92_IamRole_F24348A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-0c509e92/IamRole",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-0c509e92_IamRole_F24348A9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_b_b-ondelete-OnMessage-fbb01d67_IamRole_EE39D64B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-fbb01d67/IamRole",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-fbb01d67_IamRole_EE39D64B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_b_b-onupdate-OnMessage-b140cbd5_IamRole_59C530BB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-b140cbd5/IamRole",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-b140cbd5_IamRole_59C530BB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRole_CD5A2A34": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-d35e1e8a/IamRole",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRole_CD5A2A34"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_other_other-oncreate-OnMessage-6451ee4d_IamRole_E45758D9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate-OnMessage-6451ee4d/IamRole",
            "uniqueId": "undefined_other_other-oncreate-OnMessage-6451ee4d_IamRole_E45758D9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_other_other-ondelete-OnMessage-9348e776_IamRole_5E37E1BB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete-OnMessage-9348e776/IamRole",
            "uniqueId": "undefined_other_other-ondelete-OnMessage-9348e776_IamRole_5E37E1BB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_other_other-onupdate-OnMessage-a5fda934_IamRole_10C1F35B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate-OnMessage-a5fda934/IamRole",
            "uniqueId": "undefined_other_other-onupdate-OnMessage-a5fda934_IamRole_10C1F35B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_47993EBF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRole",
            "uniqueId": "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_47993EBF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_b_b-oncreate-OnMessage-0072604d_IamRolePolicy_8BEF19E7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-0072604d/IamRolePolicy",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-0072604d_IamRolePolicy_8BEF19E7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_b_b-oncreate-OnMessage-0072604d_IamRole_55617422.name}"
      },
      "undefined_b_b-oncreate-OnMessage-1274a289_IamRolePolicy_0106B025": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-1274a289/IamRolePolicy",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-1274a289_IamRolePolicy_0106B025"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}\",\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_b_b-oncreate-OnMessage-1274a289_IamRole_FE4B77B0.name}"
      },
      "undefined_b_b-ondelete-OnMessage-0c509e92_IamRolePolicy_9436358C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-0c509e92/IamRolePolicy",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-0c509e92_IamRolePolicy_9436358C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_b_b-ondelete-OnMessage-0c509e92_IamRole_F24348A9.name}"
      },
      "undefined_b_b-ondelete-OnMessage-fbb01d67_IamRolePolicy_A4ED5B14": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-fbb01d67/IamRolePolicy",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-fbb01d67_IamRolePolicy_A4ED5B14"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}\",\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_b_b-ondelete-OnMessage-fbb01d67_IamRole_EE39D64B.name}"
      },
      "undefined_b_b-onupdate-OnMessage-b140cbd5_IamRolePolicy_67AA6187": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-b140cbd5/IamRolePolicy",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-b140cbd5_IamRolePolicy_67AA6187"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_b_b-onupdate-OnMessage-b140cbd5_IamRole_59C530BB.name}"
      },
      "undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRolePolicy_BBBC279C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-d35e1e8a/IamRolePolicy",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRolePolicy_BBBC279C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}\",\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRole_CD5A2A34.name}"
      },
      "undefined_other_other-oncreate-OnMessage-6451ee4d_IamRolePolicy_D139217B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate-OnMessage-6451ee4d/IamRolePolicy",
            "uniqueId": "undefined_other_other-oncreate-OnMessage-6451ee4d_IamRolePolicy_D139217B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_other_other-oncreate-OnMessage-6451ee4d_IamRole_E45758D9.name}"
      },
      "undefined_other_other-ondelete-OnMessage-9348e776_IamRolePolicy_7E8F8751": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete-OnMessage-9348e776/IamRolePolicy",
            "uniqueId": "undefined_other_other-ondelete-OnMessage-9348e776_IamRolePolicy_7E8F8751"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_other_other-ondelete-OnMessage-9348e776_IamRole_5E37E1BB.name}"
      },
      "undefined_other_other-onupdate-OnMessage-a5fda934_IamRolePolicy_D152E7E3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate-OnMessage-a5fda934/IamRolePolicy",
            "uniqueId": "undefined_other_other-onupdate-OnMessage-a5fda934_IamRolePolicy_D152E7E3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_other_other-onupdate-OnMessage-a5fda934_IamRole_10C1F35B.name}"
      },
      "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicy_E6F3FA8F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRolePolicy",
            "uniqueId": "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicy_E6F3FA8F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.undefined_b_6C9E0847.arn}\",\"${aws_s3_bucket.undefined_b_6C9E0847.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_47993EBF.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_b_b-oncreate-OnMessage-0072604d_IamRolePolicyAttachment_C3593C14": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-0072604d/IamRolePolicyAttachment",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-0072604d_IamRolePolicyAttachment_C3593C14"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_b_b-oncreate-OnMessage-0072604d_IamRole_55617422.name}"
      },
      "undefined_b_b-oncreate-OnMessage-1274a289_IamRolePolicyAttachment_63CC93AD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-1274a289/IamRolePolicyAttachment",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-1274a289_IamRolePolicyAttachment_63CC93AD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_b_b-oncreate-OnMessage-1274a289_IamRole_FE4B77B0.name}"
      },
      "undefined_b_b-ondelete-OnMessage-0c509e92_IamRolePolicyAttachment_358FA3AE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-0c509e92/IamRolePolicyAttachment",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-0c509e92_IamRolePolicyAttachment_358FA3AE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_b_b-ondelete-OnMessage-0c509e92_IamRole_F24348A9.name}"
      },
      "undefined_b_b-ondelete-OnMessage-fbb01d67_IamRolePolicyAttachment_8A230C92": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-fbb01d67/IamRolePolicyAttachment",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-fbb01d67_IamRolePolicyAttachment_8A230C92"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_b_b-ondelete-OnMessage-fbb01d67_IamRole_EE39D64B.name}"
      },
      "undefined_b_b-onupdate-OnMessage-b140cbd5_IamRolePolicyAttachment_82B641C5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-b140cbd5/IamRolePolicyAttachment",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-b140cbd5_IamRolePolicyAttachment_82B641C5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_b_b-onupdate-OnMessage-b140cbd5_IamRole_59C530BB.name}"
      },
      "undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRolePolicyAttachment_D015BA51": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-d35e1e8a/IamRolePolicyAttachment",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRolePolicyAttachment_D015BA51"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRole_CD5A2A34.name}"
      },
      "undefined_other_other-oncreate-OnMessage-6451ee4d_IamRolePolicyAttachment_5AC9ADAF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate-OnMessage-6451ee4d/IamRolePolicyAttachment",
            "uniqueId": "undefined_other_other-oncreate-OnMessage-6451ee4d_IamRolePolicyAttachment_5AC9ADAF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_other_other-oncreate-OnMessage-6451ee4d_IamRole_E45758D9.name}"
      },
      "undefined_other_other-ondelete-OnMessage-9348e776_IamRolePolicyAttachment_2C6E2311": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete-OnMessage-9348e776/IamRolePolicyAttachment",
            "uniqueId": "undefined_other_other-ondelete-OnMessage-9348e776_IamRolePolicyAttachment_2C6E2311"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_other_other-ondelete-OnMessage-9348e776_IamRole_5E37E1BB.name}"
      },
      "undefined_other_other-onupdate-OnMessage-a5fda934_IamRolePolicyAttachment_06EA09F8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate-OnMessage-a5fda934/IamRolePolicyAttachment",
            "uniqueId": "undefined_other_other-onupdate-OnMessage-a5fda934_IamRolePolicyAttachment_06EA09F8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_other_other-onupdate-OnMessage-a5fda934_IamRole_10C1F35B.name}"
      },
      "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicyAttachment_A311E263": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicyAttachment_A311E263"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_47993EBF.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_b_b-oncreate-OnMessage-0072604d_A3E89EF5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-0072604d/Default",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-0072604d_A3E89EF5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-0072604d-c8446e61",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-0072604d-c8446e61",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_b_b-oncreate-OnMessage-0072604d_IamRole_55617422.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_b_b-oncreate-OnMessage-0072604d_S3Object_C1F6F3BF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_b_b-oncreate-OnMessage-1274a289_C4C353B7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-1274a289/Default",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-1274a289_C4C353B7"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_f063842a": "${aws_s3_bucket.undefined_other_E7BE6FD6.bucket}",
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-1274a289-c8ba7544",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-1274a289-c8ba7544",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_b_b-oncreate-OnMessage-1274a289_IamRole_FE4B77B0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_b_b-oncreate-OnMessage-1274a289_S3Object_68FCD9F5.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_b_b-ondelete-OnMessage-0c509e92_997F177F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-0c509e92/Default",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-0c509e92_997F177F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-0c509e92-c87f2f7d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-0c509e92-c87f2f7d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_b_b-ondelete-OnMessage-0c509e92_IamRole_F24348A9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_b_b-ondelete-OnMessage-0c509e92_S3Object_BBBC8F63.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_b_b-ondelete-OnMessage-fbb01d67_D98AAB85": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-fbb01d67/Default",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-fbb01d67_D98AAB85"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_f063842a": "${aws_s3_bucket.undefined_other_E7BE6FD6.bucket}",
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-fbb01d67-c89d6792",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-fbb01d67-c89d6792",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_b_b-ondelete-OnMessage-fbb01d67_IamRole_EE39D64B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_b_b-ondelete-OnMessage-fbb01d67_S3Object_8E5C6618.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_b_b-onupdate-OnMessage-b140cbd5_9F9E4264": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-b140cbd5/Default",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-b140cbd5_9F9E4264"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-b140cbd5-c8c95e8a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-b140cbd5-c8c95e8a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_b_b-onupdate-OnMessage-b140cbd5_IamRole_59C530BB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_b_b-onupdate-OnMessage-b140cbd5_S3Object_C8865B20.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_b_b-onupdate-OnMessage-d35e1e8a_045E72F1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-d35e1e8a/Default",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-d35e1e8a_045E72F1"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_f063842a": "${aws_s3_bucket.undefined_other_E7BE6FD6.bucket}",
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-d35e1e8a-c84693ef",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-d35e1e8a-c84693ef",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_b_b-onupdate-OnMessage-d35e1e8a_IamRole_CD5A2A34.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_b_b-onupdate-OnMessage-d35e1e8a_S3Object_CEDE2694.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_other_other-oncreate-OnMessage-6451ee4d_E13DE7D2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate-OnMessage-6451ee4d/Default",
            "uniqueId": "undefined_other_other-oncreate-OnMessage-6451ee4d_E13DE7D2"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-oncreate-OnMessage-6451ee4d-c89d1766",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-oncreate-OnMessage-6451ee4d-c89d1766",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_other_other-oncreate-OnMessage-6451ee4d_IamRole_E45758D9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_other_other-oncreate-OnMessage-6451ee4d_S3Object_97864BB8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_other_other-ondelete-OnMessage-9348e776_E8CE3E31": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete-OnMessage-9348e776/Default",
            "uniqueId": "undefined_other_other-ondelete-OnMessage-9348e776_E8CE3E31"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-ondelete-OnMessage-9348e776-c8046b05",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-ondelete-OnMessage-9348e776-c8046b05",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_other_other-ondelete-OnMessage-9348e776_IamRole_5E37E1BB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_other_other-ondelete-OnMessage-9348e776_S3Object_AF402260.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_other_other-onupdate-OnMessage-a5fda934_8E459878": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate-OnMessage-a5fda934/Default",
            "uniqueId": "undefined_other_other-onupdate-OnMessage-a5fda934_8E459878"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-onupdate-OnMessage-a5fda934-c82c187c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-onupdate-OnMessage-a5fda934-c82c187c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_other_other-onupdate-OnMessage-a5fda934_IamRole_10C1F35B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_other_other-onupdate-OnMessage-a5fda934_S3Object_69B96BC0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_4D5D01F5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/Default",
            "uniqueId": "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_4D5D01F5"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_1173f5d1": "${aws_s3_bucket.undefined_b_6C9E0847.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8672dc2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8672dc2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_47993EBF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_3A678042.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_b_b-oncreate-OnMessage-0072604d_InvokePermission-c84d069b319fe98f0bcfc5620d031787fce0fd7d95_682F2635": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-0072604d/InvokePermission-c84d069b319fe98f0bcfc5620d031787fce0fd7d95",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-0072604d_InvokePermission-c84d069b319fe98f0bcfc5620d031787fce0fd7d95_682F2635"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_b_b-oncreate-OnMessage-0072604d_A3E89EF5.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}"
      },
      "undefined_b_b-oncreate-OnMessage-1274a289_InvokePermission-c84d069b319fe98f0bcfc5620d031787fce0fd7d95_15F399A5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-1274a289/InvokePermission-c84d069b319fe98f0bcfc5620d031787fce0fd7d95",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-1274a289_InvokePermission-c84d069b319fe98f0bcfc5620d031787fce0fd7d95_15F399A5"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_b_b-oncreate-OnMessage-1274a289_C4C353B7.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}"
      },
      "undefined_b_b-ondelete-OnMessage-0c509e92_InvokePermission-c802f5d799740736b947464e8e345387526e9cec86_27F9FF59": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-0c509e92/InvokePermission-c802f5d799740736b947464e8e345387526e9cec86",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-0c509e92_InvokePermission-c802f5d799740736b947464e8e345387526e9cec86_27F9FF59"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_b_b-ondelete-OnMessage-0c509e92_997F177F.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}"
      },
      "undefined_b_b-ondelete-OnMessage-fbb01d67_InvokePermission-c802f5d799740736b947464e8e345387526e9cec86_F1B90CDF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-fbb01d67/InvokePermission-c802f5d799740736b947464e8e345387526e9cec86",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-fbb01d67_InvokePermission-c802f5d799740736b947464e8e345387526e9cec86_F1B90CDF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_b_b-ondelete-OnMessage-fbb01d67_D98AAB85.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}"
      },
      "undefined_b_b-onupdate-OnMessage-b140cbd5_InvokePermission-c88bef67e58d796e865b892c9075819b073f0ff7d5_4395B955": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-b140cbd5/InvokePermission-c88bef67e58d796e865b892c9075819b073f0ff7d5",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-b140cbd5_InvokePermission-c88bef67e58d796e865b892c9075819b073f0ff7d5_4395B955"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_b_b-onupdate-OnMessage-b140cbd5_9F9E4264.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}"
      },
      "undefined_b_b-onupdate-OnMessage-d35e1e8a_InvokePermission-c88bef67e58d796e865b892c9075819b073f0ff7d5_B300C9DD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-d35e1e8a/InvokePermission-c88bef67e58d796e865b892c9075819b073f0ff7d5",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-d35e1e8a_InvokePermission-c88bef67e58d796e865b892c9075819b073f0ff7d5_B300C9DD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_b_b-onupdate-OnMessage-d35e1e8a_045E72F1.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}"
      },
      "undefined_other_other-oncreate-OnMessage-6451ee4d_InvokePermission-c8936495488bd898ef36ef90cd8b9dfcc7fdbd9795_13A7BACD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate-OnMessage-6451ee4d/InvokePermission-c8936495488bd898ef36ef90cd8b9dfcc7fdbd9795",
            "uniqueId": "undefined_other_other-oncreate-OnMessage-6451ee4d_InvokePermission-c8936495488bd898ef36ef90cd8b9dfcc7fdbd9795_13A7BACD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_other_other-oncreate-OnMessage-6451ee4d_E13DE7D2.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_other_other-oncreate_2B64EB24.arn}"
      },
      "undefined_other_other-ondelete-OnMessage-9348e776_InvokePermission-c889a5e38fe28e5506051756de591afcd6f586af7c_6A4AB043": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete-OnMessage-9348e776/InvokePermission-c889a5e38fe28e5506051756de591afcd6f586af7c",
            "uniqueId": "undefined_other_other-ondelete-OnMessage-9348e776_InvokePermission-c889a5e38fe28e5506051756de591afcd6f586af7c_6A4AB043"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_other_other-ondelete-OnMessage-9348e776_E8CE3E31.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_other_other-ondelete_E7CD2F25.arn}"
      },
      "undefined_other_other-onupdate-OnMessage-a5fda934_InvokePermission-c8db54d7964b000af8e43079b83f52aecb87e449eb_FF10AD08": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate-OnMessage-a5fda934/InvokePermission-c8db54d7964b000af8e43079b83f52aecb87e449eb",
            "uniqueId": "undefined_other_other-onupdate-OnMessage-a5fda934_InvokePermission-c8db54d7964b000af8e43079b83f52aecb87e449eb_FF10AD08"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_other_other-onupdate-OnMessage-a5fda934_8E459878.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_other_other-onupdate_786FC913.arn}"
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
      "undefined_b_6C9E0847": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/Default",
            "uniqueId": "undefined_b_6C9E0847"
          }
        },
        "bucket_prefix": "b-c8834351-",
        "force_destroy": false
      },
      "undefined_other_E7BE6FD6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/Default",
            "uniqueId": "undefined_other_E7BE6FD6"
          }
        },
        "bucket_prefix": "other-c8ddd126-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "undefined_b_S3BucketNotification_EA401183": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/S3BucketNotification",
            "uniqueId": "undefined_b_S3BucketNotification_EA401183"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_b_6C9E0847.id}",
        "depends_on": [
          "aws_sns_topic_policy.undefined_b_b-ondelete_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_053E542D",
          "aws_sns_topic_policy.undefined_b_b-onupdate_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_E3A4831C",
          "aws_sns_topic_policy.undefined_b_b-oncreate_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_E4419F93"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}"
          }
        ]
      },
      "undefined_other_S3BucketNotification_37BA4F43": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/S3BucketNotification",
            "uniqueId": "undefined_other_S3BucketNotification_37BA4F43"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_other_E7BE6FD6.id}",
        "depends_on": [
          "aws_sns_topic_policy.undefined_other_other-oncreate_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_B5BA1533",
          "aws_sns_topic_policy.undefined_other_other-onupdate_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_43785E5C",
          "aws_sns_topic_policy.undefined_other_other-ondelete_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_3DEF1895"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.undefined_other_other-oncreate_2B64EB24.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.undefined_other_other-onupdate_786FC913.arn}"
          },
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.undefined_other_other-ondelete_E7CD2F25.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_b_PublicAccessBlock_ECD9A2FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/PublicAccessBlock",
            "uniqueId": "undefined_b_PublicAccessBlock_ECD9A2FB"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_b_6C9E0847.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_other_PublicAccessBlock_1C6A9F6D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/PublicAccessBlock",
            "uniqueId": "undefined_other_PublicAccessBlock_1C6A9F6D"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_other_E7BE6FD6.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_b_Encryption_1F4BEB7C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/Encryption",
            "uniqueId": "undefined_b_Encryption_1F4BEB7C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_b_6C9E0847.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_other_Encryption_65DB1237": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/Encryption",
            "uniqueId": "undefined_other_Encryption_65DB1237"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_other_E7BE6FD6.bucket}",
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
      "undefined_b_b-oncreate-OnMessage-0072604d_S3Object_C1F6F3BF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-0072604d/S3Object",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-0072604d_S3Object_C1F6F3BF"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_b_b-oncreate-OnMessage-1274a289_S3Object_68FCD9F5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate-OnMessage-1274a289/S3Object",
            "uniqueId": "undefined_b_b-oncreate-OnMessage-1274a289_S3Object_68FCD9F5"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_b_b-ondelete-OnMessage-0c509e92_S3Object_BBBC8F63": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-0c509e92/S3Object",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-0c509e92_S3Object_BBBC8F63"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_b_b-ondelete-OnMessage-fbb01d67_S3Object_8E5C6618": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete-OnMessage-fbb01d67/S3Object",
            "uniqueId": "undefined_b_b-ondelete-OnMessage-fbb01d67_S3Object_8E5C6618"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_b_b-onupdate-OnMessage-b140cbd5_S3Object_C8865B20": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-b140cbd5/S3Object",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-b140cbd5_S3Object_C8865B20"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_b_b-onupdate-OnMessage-d35e1e8a_S3Object_CEDE2694": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate-OnMessage-d35e1e8a/S3Object",
            "uniqueId": "undefined_b_b-onupdate-OnMessage-d35e1e8a_S3Object_CEDE2694"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_other_other-oncreate-OnMessage-6451ee4d_S3Object_97864BB8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate-OnMessage-6451ee4d/S3Object",
            "uniqueId": "undefined_other_other-oncreate-OnMessage-6451ee4d_S3Object_97864BB8"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_other_other-ondelete-OnMessage-9348e776_S3Object_AF402260": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete-OnMessage-9348e776/S3Object",
            "uniqueId": "undefined_other_other-ondelete-OnMessage-9348e776_S3Object_AF402260"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_other_other-onupdate-OnMessage-a5fda934_S3Object_69B96BC0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate-OnMessage-a5fda934/S3Object",
            "uniqueId": "undefined_other_other-onupdate-OnMessage-a5fda934_S3Object_69B96BC0"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_3A678042": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/S3Object",
            "uniqueId": "undefined_testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_3A678042"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "undefined_b_b-oncreate_48FCFB7F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate/Default",
            "uniqueId": "undefined_b_b-oncreate_48FCFB7F"
          }
        },
        "name": "b-oncreate-c84d069b"
      },
      "undefined_b_b-ondelete_30A619D0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete/Default",
            "uniqueId": "undefined_b_b-ondelete_30A619D0"
          }
        },
        "name": "b-ondelete-c802f5d7"
      },
      "undefined_b_b-onupdate_64F4BCEF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate/Default",
            "uniqueId": "undefined_b_b-onupdate_64F4BCEF"
          }
        },
        "name": "b-onupdate-c88bef67"
      },
      "undefined_other_other-oncreate_2B64EB24": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate/Default",
            "uniqueId": "undefined_other_other-oncreate_2B64EB24"
          }
        },
        "name": "other-oncreate-c8936495"
      },
      "undefined_other_other-ondelete_E7CD2F25": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete/Default",
            "uniqueId": "undefined_other_other-ondelete_E7CD2F25"
          }
        },
        "name": "other-ondelete-c889a5e3"
      },
      "undefined_other_other-onupdate_786FC913": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate/Default",
            "uniqueId": "undefined_other_other-onupdate_786FC913"
          }
        },
        "name": "other-onupdate-c8db54d7"
      }
    },
    "aws_sns_topic_policy": {
      "undefined_b_b-oncreate_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_E4419F93": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate/PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1",
            "uniqueId": "undefined_b_b-oncreate_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_E4419F93"
          }
        },
        "arn": "${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_b_6C9E0847.arn}\"}}}]}"
      },
      "undefined_b_b-ondelete_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_053E542D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete/PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1",
            "uniqueId": "undefined_b_b-ondelete_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_053E542D"
          }
        },
        "arn": "${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_b_6C9E0847.arn}\"}}}]}"
      },
      "undefined_b_b-onupdate_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_E3A4831C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate/PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1",
            "uniqueId": "undefined_b_b-onupdate_PublishPermission-c8834351f4bc8456ee80179cee6ff7fcc01173f5d1_E3A4831C"
          }
        },
        "arn": "${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_b_6C9E0847.arn}\"}}}]}"
      },
      "undefined_other_other-oncreate_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_B5BA1533": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate/PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a",
            "uniqueId": "undefined_other_other-oncreate_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_B5BA1533"
          }
        },
        "arn": "${aws_sns_topic.undefined_other_other-oncreate_2B64EB24.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_other_other-oncreate_2B64EB24.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}\"}}}]}"
      },
      "undefined_other_other-ondelete_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_3DEF1895": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete/PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a",
            "uniqueId": "undefined_other_other-ondelete_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_3DEF1895"
          }
        },
        "arn": "${aws_sns_topic.undefined_other_other-ondelete_E7CD2F25.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_other_other-ondelete_E7CD2F25.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}\"}}}]}"
      },
      "undefined_other_other-onupdate_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_43785E5C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate/PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a",
            "uniqueId": "undefined_other_other-onupdate_PublishPermission-c8ddd1264dc07c2d1279a70f0a5c5dccabf063842a_43785E5C"
          }
        },
        "arn": "${aws_sns_topic.undefined_other_other-onupdate_786FC913.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.undefined_other_other-onupdate_786FC913.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.undefined_other_E7BE6FD6.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "undefined_b_b-oncreate_b-oncreate-TopicSubscription-0072604d_320EE0B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate/b-oncreate-TopicSubscription-0072604d",
            "uniqueId": "undefined_b_b-oncreate_b-oncreate-TopicSubscription-0072604d_320EE0B6"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_b_b-oncreate-OnMessage-0072604d_A3E89EF5.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}"
      },
      "undefined_b_b-oncreate_b-oncreate-TopicSubscription-1274a289_620AF32E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-oncreate/b-oncreate-TopicSubscription-1274a289",
            "uniqueId": "undefined_b_b-oncreate_b-oncreate-TopicSubscription-1274a289_620AF32E"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_b_b-oncreate-OnMessage-1274a289_C4C353B7.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_b_b-oncreate_48FCFB7F.arn}"
      },
      "undefined_b_b-ondelete_b-ondelete-TopicSubscription-0c509e92_BE0E841F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete/b-ondelete-TopicSubscription-0c509e92",
            "uniqueId": "undefined_b_b-ondelete_b-ondelete-TopicSubscription-0c509e92_BE0E841F"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_b_b-ondelete-OnMessage-0c509e92_997F177F.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}"
      },
      "undefined_b_b-ondelete_b-ondelete-TopicSubscription-fbb01d67_E77C2CEA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-ondelete/b-ondelete-TopicSubscription-fbb01d67",
            "uniqueId": "undefined_b_b-ondelete_b-ondelete-TopicSubscription-fbb01d67_E77C2CEA"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_b_b-ondelete-OnMessage-fbb01d67_D98AAB85.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_b_b-ondelete_30A619D0.arn}"
      },
      "undefined_b_b-onupdate_b-onupdate-TopicSubscription-b140cbd5_0DB7ABFB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate/b-onupdate-TopicSubscription-b140cbd5",
            "uniqueId": "undefined_b_b-onupdate_b-onupdate-TopicSubscription-b140cbd5_0DB7ABFB"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_b_b-onupdate-OnMessage-b140cbd5_9F9E4264.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}"
      },
      "undefined_b_b-onupdate_b-onupdate-TopicSubscription-d35e1e8a_BD0E43A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/b/b-onupdate/b-onupdate-TopicSubscription-d35e1e8a",
            "uniqueId": "undefined_b_b-onupdate_b-onupdate-TopicSubscription-d35e1e8a_BD0E43A9"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_b_b-onupdate-OnMessage-d35e1e8a_045E72F1.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_b_b-onupdate_64F4BCEF.arn}"
      },
      "undefined_other_other-oncreate_other-oncreate-TopicSubscription-6451ee4d_A9B887B7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-oncreate/other-oncreate-TopicSubscription-6451ee4d",
            "uniqueId": "undefined_other_other-oncreate_other-oncreate-TopicSubscription-6451ee4d_A9B887B7"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_other_other-oncreate-OnMessage-6451ee4d_E13DE7D2.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_other_other-oncreate_2B64EB24.arn}"
      },
      "undefined_other_other-ondelete_other-ondelete-TopicSubscription-9348e776_9A864487": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-ondelete/other-ondelete-TopicSubscription-9348e776",
            "uniqueId": "undefined_other_other-ondelete_other-ondelete-TopicSubscription-9348e776_9A864487"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_other_other-ondelete-OnMessage-9348e776_E8CE3E31.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_other_other-ondelete_E7CD2F25.arn}"
      },
      "undefined_other_other-onupdate_other-onupdate-TopicSubscription-a5fda934_5DC7180F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/other/other-onupdate/other-onupdate-TopicSubscription-a5fda934",
            "uniqueId": "undefined_other_other-onupdate_other-onupdate-TopicSubscription-a5fda934_5DC7180F"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_other_other-onupdate-OnMessage-a5fda934_8E459878.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_other_other-onupdate_786FC913.arn}"
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
            $other: ${context._lift(other)},
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
          $Closure4._registerBindObject(other, host, ["put"]);
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
            $b: ${context._lift(b)},
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
          $Closure6._registerBindObject(b, host, ["delete", "put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const other = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"other");
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b");
    (b.onDelete(new $Closure1(this,"$Closure1")));
    (b.onUpdate(new $Closure2(this,"$Closure2")));
    (b.onCreate(new $Closure3(this,"$Closure3")));
    (b.onEvent(new $Closure4(this,"$Closure4")));
    (other.onEvent(new $Closure5(this,"$Closure5")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:putting and deleting from a bucket to trigger bucket events",new $Closure6(this,"$Closure6"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "bucket_events", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


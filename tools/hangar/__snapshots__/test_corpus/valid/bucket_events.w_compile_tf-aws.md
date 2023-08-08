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
      "value": "[[\"root/Default/Default/test:putting and deleting from a bucket to trigger bucket events\",\"${aws_lambda_function.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_31F6B48C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRole_B0453FD3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-1d3b2039/IamRole",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRole_B0453FD3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRole_6676A259": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-a729fee3/IamRole",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRole_6676A259"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRole_A11BE539": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-4b2cd998/IamRole",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRole_A11BE539"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRole_105F93F0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-b83da9f8/IamRole",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRole_105F93F0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRole_270AA31A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-2dce4026/IamRole",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRole_270AA31A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRole_CA43FD8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-b03e6c67/IamRole",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRole_CA43FD8E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRole_F8976A89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-OnMessage-2b1e14fd/IamRole",
            "uniqueId": "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRole_F8976A89"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRole_10E8D1C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-OnMessage-9bef38d2/IamRole",
            "uniqueId": "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRole_10E8D1C5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRole_D7984D45": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-OnMessage-bffa2a20/IamRole",
            "uniqueId": "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRole_D7984D45"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRole",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRolePolicy_80037358": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-1d3b2039/IamRolePolicy",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRolePolicy_80037358"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRole_B0453FD3.name}"
      },
      "b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRolePolicy_00C222C1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-a729fee3/IamRolePolicy",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRolePolicy_00C222C1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRole_6676A259.name}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRolePolicy_3181E5A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-4b2cd998/IamRolePolicy",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRolePolicy_3181E5A9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRole_A11BE539.name}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRolePolicy_84407C91": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-b83da9f8/IamRolePolicy",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRolePolicy_84407C91"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRole_105F93F0.name}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRolePolicy_CA5528FC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-2dce4026/IamRolePolicy",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRolePolicy_CA5528FC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRole_270AA31A.name}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRolePolicy_D74F364D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-b03e6c67/IamRolePolicy",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRolePolicy_D74F364D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.other.arn}\",\"${aws_s3_bucket.other.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRole_CA43FD8E.name}"
      },
      "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRolePolicy_B8D1CD04": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-OnMessage-2b1e14fd/IamRolePolicy",
            "uniqueId": "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRolePolicy_B8D1CD04"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRole_F8976A89.name}"
      },
      "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRolePolicy_DA0BCC76": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-OnMessage-9bef38d2/IamRolePolicy",
            "uniqueId": "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRolePolicy_DA0BCC76"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRole_10E8D1C5.name}"
      },
      "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRolePolicy_0378A556": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-OnMessage-bffa2a20/IamRolePolicy",
            "uniqueId": "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRolePolicy_0378A556"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRole_D7984D45.name}"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicy_4BAD9EF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRolePolicy",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicy_4BAD9EF3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.b.arn}\",\"${aws_s3_bucket.b.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRolePolicyAttachment_D8FC0C09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-1d3b2039/IamRolePolicyAttachment",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRolePolicyAttachment_D8FC0C09"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRole_B0453FD3.name}"
      },
      "b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRolePolicyAttachment_37B22BFF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-a729fee3/IamRolePolicyAttachment",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRolePolicyAttachment_37B22BFF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRole_6676A259.name}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRolePolicyAttachment_DBE41F46": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-4b2cd998/IamRolePolicyAttachment",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRolePolicyAttachment_DBE41F46"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRole_A11BE539.name}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRolePolicyAttachment_D292DA30": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-b83da9f8/IamRolePolicyAttachment",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRolePolicyAttachment_D292DA30"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRole_105F93F0.name}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRolePolicyAttachment_3D56FAD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-2dce4026/IamRolePolicyAttachment",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRolePolicyAttachment_3D56FAD9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRole_270AA31A.name}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRolePolicyAttachment_75C7D23F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-b03e6c67/IamRolePolicyAttachment",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRolePolicyAttachment_75C7D23F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRole_CA43FD8E.name}"
      },
      "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRolePolicyAttachment_35F6FFD2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-OnMessage-2b1e14fd/IamRolePolicyAttachment",
            "uniqueId": "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRolePolicyAttachment_35F6FFD2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRole_F8976A89.name}"
      },
      "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRolePolicyAttachment_7BA36DBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-OnMessage-9bef38d2/IamRolePolicyAttachment",
            "uniqueId": "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRolePolicyAttachment_7BA36DBC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRole_10E8D1C5.name}"
      },
      "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRolePolicyAttachment_95E9675A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-OnMessage-bffa2a20/IamRolePolicyAttachment",
            "uniqueId": "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRolePolicyAttachment_95E9675A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRole_D7984D45.name}"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicyAttachment_2DB05AD7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/IamRolePolicyAttachment",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRolePolicyAttachment_2DB05AD7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456.name}"
      }
    },
    "aws_lambda_function": {
      "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_577B8E73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-1d3b2039/Default",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_577B8E73"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-1d3b2039-c8356eff",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-1d3b2039-c8356eff",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-oncreate_b-oncreate-OnMessage-1d3b2039_IamRole_B0453FD3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-oncreate_b-oncreate-OnMessage-1d3b2039_S3Object_8AEA8ECD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-oncreate_b-oncreate-OnMessage-a729fee3_2C559C73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-a729fee3/Default",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-a729fee3_2C559C73"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-oncreate-OnMessage-a729fee3-c8155ed7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-oncreate-OnMessage-a729fee3-c8155ed7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-oncreate_b-oncreate-OnMessage-a729fee3_IamRole_6676A259.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-oncreate_b-oncreate-OnMessage-a729fee3_S3Object_C9C40025.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_AA208278": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-4b2cd998/Default",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_AA208278"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-4b2cd998-c8b764d5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-4b2cd998-c8b764d5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-ondelete_b-ondelete-OnMessage-4b2cd998_IamRole_A11BE539.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-ondelete_b-ondelete-OnMessage-4b2cd998_S3Object_B88863B8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_A0853686": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-b83da9f8/Default",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_A0853686"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-ondelete-OnMessage-b83da9f8-c8a17651",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-ondelete-OnMessage-b83da9f8-c8a17651",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-ondelete_b-ondelete-OnMessage-b83da9f8_IamRole_105F93F0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-ondelete_b-ondelete-OnMessage-b83da9f8_S3Object_E2DF2856.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-onupdate_b-onupdate-OnMessage-2dce4026_67E26AA7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-2dce4026/Default",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-2dce4026_67E26AA7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-2dce4026-c8cb2faf",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-2dce4026-c8cb2faf",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-onupdate_b-onupdate-OnMessage-2dce4026_IamRole_270AA31A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-onupdate_b-onupdate-OnMessage-2dce4026_S3Object_7667EAFE.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_CEA7D325": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-b03e6c67/Default",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_CEA7D325"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_73fd1ead": "${aws_s3_bucket.other.bucket}",
            "WING_FUNCTION_NAME": "b-onupdate-OnMessage-b03e6c67-c80709a9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "b-onupdate-OnMessage-b03e6c67-c80709a9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.b_b-onupdate_b-onupdate-OnMessage-b03e6c67_IamRole_CA43FD8E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.b_b-onupdate_b-onupdate-OnMessage-b03e6c67_S3Object_3995B77A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_F82C221E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-OnMessage-2b1e14fd/Default",
            "uniqueId": "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_F82C221E"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-oncreate-OnMessage-2b1e14fd-c8a78a0c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-oncreate-OnMessage-2b1e14fd-c8a78a0c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_IamRole_F8976A89.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_S3Object_32B1D566.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_63842368": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-OnMessage-9bef38d2/Default",
            "uniqueId": "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_63842368"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-ondelete-OnMessage-9bef38d2-c8ebc485",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-ondelete-OnMessage-9bef38d2-c8ebc485",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-ondelete_other-ondelete-OnMessage-9bef38d2_IamRole_10E8D1C5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-ondelete_other-ondelete-OnMessage-9bef38d2_S3Object_F884F8D6.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_CA82D4F7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-OnMessage-bffa2a20/Default",
            "uniqueId": "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_CA82D4F7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "other-onupdate-OnMessage-bffa2a20-c82e51c6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "other-onupdate-OnMessage-bffa2a20-c82e51c6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.other_other-onupdate_other-onupdate-OnMessage-bffa2a20_IamRole_D7984D45.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.other_other-onupdate_other-onupdate-OnMessage-bffa2a20_S3Object_7C54FF0F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_31F6B48C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/Default",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_31F6B48C"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_34279ead": "${aws_s3_bucket.b.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8457446",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8457446",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_IamRole_C2098456.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_B00A26B2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_636E9D6C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-1d3b2039/InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_636E9D6C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-oncreate_b-oncreate-OnMessage-1d3b2039_577B8E73.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-oncreate_b-oncreate-OnMessage-a729fee3_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_A03C51A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-a729fee3/InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-a729fee3_InvokePermission-c814afd1122e649c2834d87cee56b8699f275ddf35_A03C51A6"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-oncreate_b-oncreate-OnMessage-a729fee3_2C559C73.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_99941902": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-4b2cd998/InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_99941902"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-ondelete_b-ondelete-OnMessage-4b2cd998_AA208278.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_ABB3BACF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-b83da9f8/InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_InvokePermission-c80dbc457de33e91b3d3e0e8ae58596a3c9d1ea179_ABB3BACF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-ondelete_b-ondelete-OnMessage-b83da9f8_A0853686.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-2dce4026_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_C49D4D5F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-2dce4026/InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-2dce4026_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_C49D4D5F"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-onupdate_b-onupdate-OnMessage-2dce4026_67E26AA7.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_76A5198D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-b03e6c67/InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_InvokePermission-c8b0a71441163a384430ad60383dc9448e6b9c12cf_76A5198D"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.b_b-onupdate_b-onupdate-OnMessage-b03e6c67_CEA7D325.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a_2B925A11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-OnMessage-2b1e14fd/InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a",
            "uniqueId": "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_InvokePermission-c872dd37414ad02be3eec128d76edbd53b0f97733a_2B925A11"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_F82C221E.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
      },
      "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf_6B34E6F6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-OnMessage-9bef38d2/InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf",
            "uniqueId": "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_InvokePermission-c82672963fbfec0e38f60c66d2e80c173285b45fcf_6B34E6F6"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-ondelete_other-ondelete-OnMessage-9bef38d2_63842368.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
      },
      "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf_260546FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-OnMessage-bffa2a20/InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf",
            "uniqueId": "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_InvokePermission-c872d872befb12eff50d186abd6f573b7c47f4e9cf_260546FB"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.other_other-onupdate_other-onupdate-OnMessage-bffa2a20_CA82D4F7.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}"
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
      "b": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/Default",
            "uniqueId": "b"
          }
        },
        "bucket_prefix": "b-c81aa40d-",
        "force_destroy": false
      },
      "other": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/Default",
            "uniqueId": "other"
          }
        },
        "bucket_prefix": "other-c87420a2-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_notification": {
      "b_S3BucketNotification_B678FA1E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/S3BucketNotification",
            "uniqueId": "b_S3BucketNotification_B678FA1E"
          }
        },
        "bucket": "${aws_s3_bucket.b.id}",
        "depends_on": [
          "aws_sns_topic_policy.b_b-ondelete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_6E0CB482",
          "aws_sns_topic_policy.b_b-onupdate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_F532851B",
          "aws_sns_topic_policy.b_b-oncreate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_038EF323"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
          }
        ]
      },
      "other_S3BucketNotification_DA1F0EC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/S3BucketNotification",
            "uniqueId": "other_S3BucketNotification_DA1F0EC0"
          }
        },
        "bucket": "${aws_s3_bucket.other.id}",
        "depends_on": [
          "aws_sns_topic_policy.other_other-oncreate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_0202E6BD",
          "aws_sns_topic_policy.other_other-onupdate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_F59495DD",
          "aws_sns_topic_policy.other_other-ondelete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_CB407B96"
        ],
        "topic": [
          {
            "events": [
              "s3:ObjectCreated:Put"
            ],
            "id": "on-oncreate-notification",
            "topic_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
          },
          {
            "events": [
              "s3:ObjectCreated:Post"
            ],
            "id": "on-onupdate-notification",
            "topic_arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}"
          },
          {
            "events": [
              "s3:ObjectRemoved:*"
            ],
            "id": "on-ondelete-notification",
            "topic_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
          }
        ]
      }
    },
    "aws_s3_bucket_public_access_block": {
      "b_PublicAccessBlock_D351EBD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/PublicAccessBlock",
            "uniqueId": "b_PublicAccessBlock_D351EBD6"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.b.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "other_PublicAccessBlock_6FF8D942": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/PublicAccessBlock",
            "uniqueId": "other_PublicAccessBlock_6FF8D942"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.other.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "b_Encryption_AF1DCBD9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/Encryption",
            "uniqueId": "b_Encryption_AF1DCBD9"
          }
        },
        "bucket": "${aws_s3_bucket.b.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "other_Encryption_D901EDA1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/Encryption",
            "uniqueId": "other_Encryption_D901EDA1"
          }
        },
        "bucket": "${aws_s3_bucket.other.bucket}",
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
      "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_S3Object_8AEA8ECD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-1d3b2039/S3Object",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-1d3b2039_S3Object_8AEA8ECD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-oncreate_b-oncreate-OnMessage-a729fee3_S3Object_C9C40025": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-OnMessage-a729fee3/S3Object",
            "uniqueId": "b_b-oncreate_b-oncreate-OnMessage-a729fee3_S3Object_C9C40025"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_S3Object_B88863B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-4b2cd998/S3Object",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-4b2cd998_S3Object_B88863B8"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_S3Object_E2DF2856": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-OnMessage-b83da9f8/S3Object",
            "uniqueId": "b_b-ondelete_b-ondelete-OnMessage-b83da9f8_S3Object_E2DF2856"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-onupdate_b-onupdate-OnMessage-2dce4026_S3Object_7667EAFE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-2dce4026/S3Object",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-2dce4026_S3Object_7667EAFE"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_S3Object_3995B77A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-OnMessage-b03e6c67/S3Object",
            "uniqueId": "b_b-onupdate_b-onupdate-OnMessage-b03e6c67_S3Object_3995B77A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_S3Object_32B1D566": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-OnMessage-2b1e14fd/S3Object",
            "uniqueId": "other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_S3Object_32B1D566"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_S3Object_F884F8D6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-OnMessage-9bef38d2/S3Object",
            "uniqueId": "other_other-ondelete_other-ondelete-OnMessage-9bef38d2_S3Object_F884F8D6"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_S3Object_7C54FF0F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-OnMessage-bffa2a20/S3Object",
            "uniqueId": "other_other-onupdate_other-onupdate-OnMessage-bffa2a20_S3Object_7C54FF0F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_B00A26B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putting and deleting from a bucket to trigger bucket events/Handler/S3Object",
            "uniqueId": "testputtinganddeletingfromabuckettotriggerbucketevents_Handler_S3Object_B00A26B2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "b_b-oncreate_886A880E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/Default",
            "uniqueId": "b_b-oncreate_886A880E"
          }
        },
        "name": "b-oncreate-c814afd1"
      },
      "b_b-ondelete_F8924325": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/Default",
            "uniqueId": "b_b-ondelete_F8924325"
          }
        },
        "name": "b-ondelete-c80dbc45"
      },
      "b_b-onupdate_24C2703A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/Default",
            "uniqueId": "b_b-onupdate_24C2703A"
          }
        },
        "name": "b-onupdate-c8b0a714"
      },
      "other_other-oncreate_C00FD9E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/Default",
            "uniqueId": "other_other-oncreate_C00FD9E3"
          }
        },
        "name": "other-oncreate-c872dd37"
      },
      "other_other-ondelete_09111C9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/Default",
            "uniqueId": "other_other-ondelete_09111C9D"
          }
        },
        "name": "other-ondelete-c8267296"
      },
      "other_other-onupdate_1FD7645E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/Default",
            "uniqueId": "other_other-onupdate_1FD7645E"
          }
        },
        "name": "other-onupdate-c872d872"
      }
    },
    "aws_sns_topic_policy": {
      "b_b-oncreate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_038EF323": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-oncreate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_038EF323"
          }
        },
        "arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-oncreate_886A880E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "b_b-ondelete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_6E0CB482": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-ondelete_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_6E0CB482"
          }
        },
        "arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-ondelete_F8924325.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "b_b-onupdate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_F532851B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/PublishPermission-c81aa40d099e0812205448708df27e482b34279ead",
            "uniqueId": "b_b-onupdate_PublishPermission-c81aa40d099e0812205448708df27e482b34279ead_F532851B"
          }
        },
        "arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.b_b-onupdate_24C2703A.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.b.arn}\"}}}]}"
      },
      "other_other-oncreate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_0202E6BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-oncreate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_0202E6BD"
          }
        },
        "arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      },
      "other_other-ondelete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_CB407B96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-ondelete_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_CB407B96"
          }
        },
        "arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-ondelete_09111C9D.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      },
      "other_other-onupdate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_F59495DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead",
            "uniqueId": "other_other-onupdate_PublishPermission-c87420a27eeb4720af7eb13d276c8124ea73fd1ead_F59495DD"
          }
        },
        "arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}",
        "policy": "{\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"s3.amazonaws.com\"},\"Action\":\"sns:Publish\",\"Resource\":\"${aws_sns_topic.other_other-onupdate_1FD7645E.arn}\",\"Condition\":{\"ArnEquals\":{\"aws:SourceArn\":\"${aws_s3_bucket.other.arn}\"}}}]}"
      }
    },
    "aws_sns_topic_subscription": {
      "b_b-oncreate_b-oncreate-TopicSubscription-1d3b2039_86B72DE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-TopicSubscription-1d3b2039",
            "uniqueId": "b_b-oncreate_b-oncreate-TopicSubscription-1d3b2039_86B72DE9"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-oncreate_b-oncreate-OnMessage-1d3b2039_577B8E73.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-oncreate_b-oncreate-TopicSubscription-a729fee3_AF7060F5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-oncreate/b-oncreate-TopicSubscription-a729fee3",
            "uniqueId": "b_b-oncreate_b-oncreate-TopicSubscription-a729fee3_AF7060F5"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-oncreate_b-oncreate-OnMessage-a729fee3_2C559C73.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-oncreate_886A880E.arn}"
      },
      "b_b-ondelete_b-ondelete-TopicSubscription-4b2cd998_DF76CC77": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-TopicSubscription-4b2cd998",
            "uniqueId": "b_b-ondelete_b-ondelete-TopicSubscription-4b2cd998_DF76CC77"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-ondelete_b-ondelete-OnMessage-4b2cd998_AA208278.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-ondelete_b-ondelete-TopicSubscription-b83da9f8_DE8E3B44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-ondelete/b-ondelete-TopicSubscription-b83da9f8",
            "uniqueId": "b_b-ondelete_b-ondelete-TopicSubscription-b83da9f8_DE8E3B44"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-ondelete_b-ondelete-OnMessage-b83da9f8_A0853686.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-ondelete_F8924325.arn}"
      },
      "b_b-onupdate_b-onupdate-TopicSubscription-2dce4026_6798ABF8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-TopicSubscription-2dce4026",
            "uniqueId": "b_b-onupdate_b-onupdate-TopicSubscription-2dce4026_6798ABF8"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-onupdate_b-onupdate-OnMessage-2dce4026_67E26AA7.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "b_b-onupdate_b-onupdate-TopicSubscription-b03e6c67_C09EF500": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b/b-onupdate/b-onupdate-TopicSubscription-b03e6c67",
            "uniqueId": "b_b-onupdate_b-onupdate-TopicSubscription-b03e6c67_C09EF500"
          }
        },
        "endpoint": "${aws_lambda_function.b_b-onupdate_b-onupdate-OnMessage-b03e6c67_CEA7D325.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.b_b-onupdate_24C2703A.arn}"
      },
      "other_other-oncreate_other-oncreate-TopicSubscription-2b1e14fd_C0757EA4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-oncreate/other-oncreate-TopicSubscription-2b1e14fd",
            "uniqueId": "other_other-oncreate_other-oncreate-TopicSubscription-2b1e14fd_C0757EA4"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-oncreate_other-oncreate-OnMessage-2b1e14fd_F82C221E.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-oncreate_C00FD9E3.arn}"
      },
      "other_other-ondelete_other-ondelete-TopicSubscription-9bef38d2_04AE6482": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-ondelete/other-ondelete-TopicSubscription-9bef38d2",
            "uniqueId": "other_other-ondelete_other-ondelete-TopicSubscription-9bef38d2_04AE6482"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-ondelete_other-ondelete-OnMessage-9bef38d2_63842368.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-ondelete_09111C9D.arn}"
      },
      "other_other-onupdate_other-onupdate-TopicSubscription-bffa2a20_7EB503EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/other/other-onupdate/other-onupdate-TopicSubscription-bffa2a20",
            "uniqueId": "other_other-onupdate_other-onupdate-TopicSubscription-bffa2a20_7EB503EC"
          }
        },
        "endpoint": "${aws_lambda_function.other_other-onupdate_other-onupdate-OnMessage-bffa2a20_CA82D4F7.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.other_other-onupdate_1FD7645E.arn}"
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
new $App({ outdir: $outdir, name: "bucket_events", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


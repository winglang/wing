# [print.w](../../../../examples/tests/valid/print.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:log1\",\"${aws_lambda_function.root_testlog1_F98C8031.arn}\"],[\"root/Default/Default/test:log2\",\"${aws_lambda_function.root_testlog2_B951F90D.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testlog1_IamRole_3D62ABEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/IamRole",
            "uniqueId": "root_testlog1_IamRole_3D62ABEB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlog2_IamRole_7773EE80": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/IamRole",
            "uniqueId": "root_testlog2_IamRole_7773EE80"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testlog1_IamRolePolicy_E3942901": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/IamRolePolicy",
            "uniqueId": "root_testlog1_IamRolePolicy_E3942901"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlog1_IamRole_3D62ABEB.name}"
      },
      "root_testlog2_IamRolePolicy_F59DDE76": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/IamRolePolicy",
            "uniqueId": "root_testlog2_IamRolePolicy_F59DDE76"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlog2_IamRole_7773EE80.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testlog1_IamRolePolicyAttachment_EA81CDB3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/IamRolePolicyAttachment",
            "uniqueId": "root_testlog1_IamRolePolicyAttachment_EA81CDB3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlog1_IamRole_3D62ABEB.name}"
      },
      "root_testlog2_IamRolePolicyAttachment_D424C0BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/IamRolePolicyAttachment",
            "uniqueId": "root_testlog2_IamRolePolicyAttachment_D424C0BD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlog2_IamRole_7773EE80.name}"
      }
    },
    "aws_lambda_function": {
      "root_testlog1_F98C8031": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Default",
            "uniqueId": "root_testlog1_F98C8031"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-log1-c8333bd5"
          }
        },
        "function_name": "test-log1-c8333bd5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlog1_IamRole_3D62ABEB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlog1_S3Object_95AE7AEC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testlog2_B951F90D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Default",
            "uniqueId": "root_testlog2_B951F90D"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-log2-c89ee849"
          }
        },
        "function_name": "test-log2-c89ee849",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlog2_IamRole_7773EE80.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlog2_S3Object_93F5CD8E.key}",
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
      "root_testlog1_S3Object_95AE7AEC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/S3Object",
            "uniqueId": "root_testlog1_S3Object_95AE7AEC"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testlog2_S3Object_93F5CD8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/S3Object",
            "uniqueId": "root_testlog2_S3Object_93F5CD8E"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    {console.log("preflight log")};
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:log1",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:log2",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "print", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle() {
  const {  } = this;
  {console.log("inflight log 1.1")};
  {console.log("inflight log 1.2")};
}

```

## proc2/index.js
```js
async handle() {
  const {  } = this;
  {console.log("inflight log 2.1")};
  {console.log("inflight log 2.2")};
}

```


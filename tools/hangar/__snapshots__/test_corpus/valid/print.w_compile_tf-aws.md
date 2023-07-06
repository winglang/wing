# [print.w](../../../../../examples/tests/valid/print.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("inflight log 1.1")};
      {console.log("inflight log 1.2")};
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
    async handle() {
      {console.log("inflight log 2.1")};
      {console.log("inflight log 2.2")};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/Default/Default/test:log1\",\"${aws_lambda_function.testlog1_Handler_EDBEC34F.arn}\"],[\"root/Default/Default/test:log2\",\"${aws_lambda_function.testlog2_Handler_C5C192A7.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testlog1_Handler_IamRole_CE69AC85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/IamRole",
            "uniqueId": "testlog1_Handler_IamRole_CE69AC85"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testlog2_Handler_IamRole_6FE521B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/IamRole",
            "uniqueId": "testlog2_Handler_IamRole_6FE521B8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testlog1_Handler_IamRolePolicy_2880E1B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/IamRolePolicy",
            "uniqueId": "testlog1_Handler_IamRolePolicy_2880E1B2"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testlog1_Handler_IamRole_CE69AC85.name}"
      },
      "testlog2_Handler_IamRolePolicy_DAC2FD7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/IamRolePolicy",
            "uniqueId": "testlog2_Handler_IamRolePolicy_DAC2FD7E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testlog2_Handler_IamRole_6FE521B8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testlog1_Handler_IamRolePolicyAttachment_41E9A840": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlog1_Handler_IamRolePolicyAttachment_41E9A840"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlog1_Handler_IamRole_CE69AC85.name}"
      },
      "testlog2_Handler_IamRolePolicyAttachment_9531650E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/IamRolePolicyAttachment",
            "uniqueId": "testlog2_Handler_IamRolePolicyAttachment_9531650E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testlog2_Handler_IamRole_6FE521B8.name}"
      }
    },
    "aws_lambda_function": {
      "testlog1_Handler_EDBEC34F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/Default",
            "uniqueId": "testlog1_Handler_EDBEC34F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82c13b7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82c13b7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testlog1_Handler_IamRole_CE69AC85.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlog1_Handler_S3Object_65FEFB6D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testlog2_Handler_C5C192A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/Default",
            "uniqueId": "testlog2_Handler_C5C192A7"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c87c0241",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87c0241",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testlog2_Handler_IamRole_6FE521B8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testlog2_Handler_S3Object_E10F24B2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      }
    },
    "aws_s3_object": {
      "testlog1_Handler_S3Object_65FEFB6D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/S3Object",
            "uniqueId": "testlog1_Handler_S3Object_65FEFB6D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testlog2_Handler_S3Object_E10F24B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/S3Object",
            "uniqueId": "testlog2_Handler_S3Object_E10F24B2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
    {console.log("preflight log")};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:log1",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:log2",new $Closure2(this,"$Closure2"));
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


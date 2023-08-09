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
      "value": "[[\"root/undefined/Default/test:log1\",\"${aws_lambda_function.undefined_testlog1_Handler_35E1FFD1.arn}\"],[\"root/undefined/Default/test:log2\",\"${aws_lambda_function.undefined_testlog2_Handler_49FA21D0.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testlog1_Handler_IamRole_269E1672": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log1/Handler/IamRole",
            "uniqueId": "undefined_testlog1_Handler_IamRole_269E1672"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testlog2_Handler_IamRole_0554ECD2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log2/Handler/IamRole",
            "uniqueId": "undefined_testlog2_Handler_IamRole_0554ECD2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testlog1_Handler_IamRolePolicy_F9C5B6A9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log1/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlog1_Handler_IamRolePolicy_F9C5B6A9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testlog1_Handler_IamRole_269E1672.name}"
      },
      "undefined_testlog2_Handler_IamRolePolicy_4D20ABAB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log2/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlog2_Handler_IamRolePolicy_4D20ABAB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testlog2_Handler_IamRole_0554ECD2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testlog1_Handler_IamRolePolicyAttachment_436468CA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log1/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlog1_Handler_IamRolePolicyAttachment_436468CA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlog1_Handler_IamRole_269E1672.name}"
      },
      "undefined_testlog2_Handler_IamRolePolicyAttachment_E176E5DD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log2/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlog2_Handler_IamRolePolicyAttachment_E176E5DD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlog2_Handler_IamRole_0554ECD2.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testlog1_Handler_35E1FFD1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log1/Handler/Default",
            "uniqueId": "undefined_testlog1_Handler_35E1FFD1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82bac13",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82bac13",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlog1_Handler_IamRole_269E1672.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlog1_Handler_S3Object_3AB69A3B.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testlog2_Handler_49FA21D0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log2/Handler/Default",
            "uniqueId": "undefined_testlog2_Handler_49FA21D0"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8f1201b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f1201b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlog2_Handler_IamRole_0554ECD2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlog2_Handler_S3Object_013D63C8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      }
    },
    "aws_s3_object": {
      "undefined_testlog1_Handler_S3Object_3AB69A3B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log1/Handler/S3Object",
            "uniqueId": "undefined_testlog1_Handler_S3Object_3AB69A3B"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testlog2_Handler_S3Object_013D63C8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:log2/Handler/S3Object",
            "uniqueId": "undefined_testlog2_Handler_S3Object_013D63C8"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
    {console.log("preflight log")};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:log1",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:log2",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "print", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


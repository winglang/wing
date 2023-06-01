# [print.w](../../../../examples/tests/valid/print.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({  }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {console.log("inflight log 1.1")};
      {console.log("inflight log 1.2")};
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({  }) {
  class $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {console.log("inflight log 2.1")};
      {console.log("inflight log 2.2")};
    }
  }
  return $Inflight2;
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
      "value": "[[\"root/Default/Default/test:log1\",\"${aws_lambda_function.root_testlog1_Handler_9DCA5058.arn}\"],[\"root/Default/Default/test:log2\",\"${aws_lambda_function.root_testlog2_Handler_4FE3A48A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testlog1_Handler_IamRole_0E00D57B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/IamRole",
            "uniqueId": "root_testlog1_Handler_IamRole_0E00D57B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testlog2_Handler_IamRole_A8D749F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/IamRole",
            "uniqueId": "root_testlog2_Handler_IamRole_A8D749F4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testlog1_Handler_IamRolePolicy_E7899494": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/IamRolePolicy",
            "uniqueId": "root_testlog1_Handler_IamRolePolicy_E7899494"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlog1_Handler_IamRole_0E00D57B.name}"
      },
      "root_testlog2_Handler_IamRolePolicy_41BEAB33": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/IamRolePolicy",
            "uniqueId": "root_testlog2_Handler_IamRolePolicy_41BEAB33"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testlog2_Handler_IamRole_A8D749F4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testlog1_Handler_IamRolePolicyAttachment_C7D710C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlog1_Handler_IamRolePolicyAttachment_C7D710C8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlog1_Handler_IamRole_0E00D57B.name}"
      },
      "root_testlog2_Handler_IamRolePolicyAttachment_94CA4F88": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testlog2_Handler_IamRolePolicyAttachment_94CA4F88"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testlog2_Handler_IamRole_A8D749F4.name}"
      }
    },
    "aws_lambda_function": {
      "root_testlog1_Handler_9DCA5058": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/Default",
            "uniqueId": "root_testlog1_Handler_9DCA5058"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82c13b7"
          }
        },
        "function_name": "Handler-c82c13b7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlog1_Handler_IamRole_0E00D57B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlog1_Handler_S3Object_27A6C559.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testlog2_Handler_4FE3A48A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/Default",
            "uniqueId": "root_testlog2_Handler_4FE3A48A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c87c0241"
          }
        },
        "function_name": "Handler-c87c0241",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testlog2_Handler_IamRole_A8D749F4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testlog2_Handler_S3Object_479A5B52.key}",
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
      "root_testlog1_Handler_S3Object_27A6C559": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log1/Handler/S3Object",
            "uniqueId": "root_testlog1_Handler_S3Object_27A6C559"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testlog2_Handler_S3Object_479A5B52": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:log2/Handler/S3Object",
            "uniqueId": "root_testlog2_Handler_S3Object_479A5B52"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
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
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
            const client = new $Inflight2Client({
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
    {console.log("preflight log")};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:log1",new $Inflight1(this,"$Inflight1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:log2",new $Inflight2(this,"$Inflight2"));
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


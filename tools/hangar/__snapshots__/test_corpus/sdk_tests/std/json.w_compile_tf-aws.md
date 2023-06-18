# [json.w](../../../../../../examples/tests/sdk_tests/std/json.w) | compile | tf-aws

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
      const x = {"a":1};
      ((obj, args) => { obj[args[0]] = args[1]; })(x, ["b",2]);
      const y = (x)["b"];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 2)'`)})((y === 2))};
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
      const x = {"a":1};
      const a = {"c":3};
      ((obj, args) => { obj[args[0]] = args[1]; })(x, [2,a]);
      const d = (x)[2];
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((d)["c"] === 3)'`)})(((d)["c"] === 3))};
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
      "value": "[[\"root/Default/Default/test:set()\",\"${aws_lambda_function.root_testset_Handler_AA2D91EA.arn}\"],[\"root/Default/Default/test:setAt()\",\"${aws_lambda_function.root_testsetAt_Handler_F8A3A3EA.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testsetAt_Handler_IamRole_EF970D95": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRole",
            "uniqueId": "root_testsetAt_Handler_IamRole_EF970D95"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testset_Handler_IamRole_F0B7EE73": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRole",
            "uniqueId": "root_testset_Handler_IamRole_F0B7EE73"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testsetAt_Handler_IamRolePolicy_0982C8B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRolePolicy",
            "uniqueId": "root_testsetAt_Handler_IamRolePolicy_0982C8B1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testsetAt_Handler_IamRole_EF970D95.name}"
      },
      "root_testset_Handler_IamRolePolicy_F9A31912": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicy",
            "uniqueId": "root_testset_Handler_IamRolePolicy_F9A31912"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testset_Handler_IamRole_F0B7EE73.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testsetAt_Handler_IamRolePolicyAttachment_250DD04A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testsetAt_Handler_IamRolePolicyAttachment_250DD04A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testsetAt_Handler_IamRole_EF970D95.name}"
      },
      "root_testset_Handler_IamRolePolicyAttachment_F9449B3C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testset_Handler_IamRolePolicyAttachment_F9449B3C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testset_Handler_IamRole_F0B7EE73.name}"
      }
    },
    "aws_lambda_function": {
      "root_testsetAt_Handler_F8A3A3EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/Default",
            "uniqueId": "root_testsetAt_Handler_F8A3A3EA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c841d86c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c841d86c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testsetAt_Handler_IamRole_EF970D95.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testsetAt_Handler_S3Object_3E7056D0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testset_Handler_AA2D91EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/Default",
            "uniqueId": "root_testset_Handler_AA2D91EA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8240bc7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8240bc7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testset_Handler_IamRole_F0B7EE73.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testset_Handler_S3Object_78DDEFF3.key}",
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
      "root_testsetAt_Handler_S3Object_3E7056D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/S3Object",
            "uniqueId": "root_testsetAt_Handler_S3Object_3E7056D0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testset_Handler_S3Object_78DDEFF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/S3Object",
            "uniqueId": "root_testset_Handler_S3Object_78DDEFF3"
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
    const a = {"a":1};
    const b = {"b":2};
    ((obj, args) => { obj[args[0]] = args[1]; })(a, ["c",b]);
    const c = (a)["c"];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((c)["b"] === 2)'`)})(((c)["b"] === 2))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set()",new $Closure1(this,"$Closure1"));
    const d = {"d":3};
    ((obj, args) => { obj[args[0]] = args[1]; })(a, [2,d]);
    const e = (a)[2];
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((e)["d"] === 3)'`)})(((e)["d"] === 3))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setAt()",new $Closure2(this,"$Closure2"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "json", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


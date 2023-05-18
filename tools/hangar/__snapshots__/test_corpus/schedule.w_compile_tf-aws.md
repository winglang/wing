# [schedule.w](../../../../examples/tests/valid/schedule.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ handler }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle()  {
      {
        (typeof handler === "function" ? await handler() : await handler.handle());
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({  }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle()  {
      {
        return "foo";
      }
    }
  }
  return $Inflight2;
}

```

## clients/Schedule.inflight.js
```js
module.exports = function({  }) {
  class  Schedule {
    constructor({  }) {
    }
  }
  return Schedule;
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_Schedule_cloudFunction_IamRole_F94CC350": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Schedule/cloud.Function/IamRole",
            "uniqueId": "root_Schedule_cloudFunction_IamRole_F94CC350"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_Schedule_cloudFunction_IamRolePolicy_D96586EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Schedule/cloud.Function/IamRolePolicy",
            "uniqueId": "root_Schedule_cloudFunction_IamRolePolicy_D96586EC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_Schedule_cloudFunction_IamRole_F94CC350.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_Schedule_cloudFunction_IamRolePolicyAttachment_1F83AF14": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Schedule/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_Schedule_cloudFunction_IamRolePolicyAttachment_1F83AF14"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_Schedule_cloudFunction_IamRole_F94CC350.name}"
      }
    },
    "aws_lambda_function": {
      "root_Schedule_cloudFunction_283575EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Schedule/cloud.Function/Default",
            "uniqueId": "root_Schedule_cloudFunction_283575EC"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "cloud-Function-c80ded5a"
          }
        },
        "function_name": "cloud-Function-c80ded5a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_Schedule_cloudFunction_IamRole_F94CC350.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_Schedule_cloudFunction_S3Object_D04A7C11.key}",
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
      "root_Schedule_cloudFunction_S3Object_D04A7C11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Schedule/cloud.Function/S3Object",
            "uniqueId": "root_Schedule_cloudFunction_S3Object_D04A7C11"
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
    class Schedule extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
      }
       onTick(handler)  {
        {
          const __parent_this = this;
          class $Inflight1 extends $stdlib.std.Resource {
            constructor(scope, id, ) {
              super(scope, id);
              this._addInflightOps("handle");
            }
            static _toInflightType(context) {
              const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
              const handler_client = context._lift(handler);
              return $stdlib.core.NodeJsCode.fromInline(`
                require("${self_client_path}")({
                  handler: ${handler_client},
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
                this._registerBindObject(handler, host, ["handle"]);
              }
              super._registerBind(host, ops);
            }
          }
          this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $Inflight1(this,"$Inflight1"));
        }
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Schedule.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const ScheduleClient = ${Schedule._toInflightType(this).text};
            const client = new ScheduleClient({
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
    }
    class $Inflight2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
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
    const s = new Schedule(this,"Schedule");
    (s.onTick(new $Inflight2(this,"$Inflight2")));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "schedule", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


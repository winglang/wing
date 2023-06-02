# [inflight_class_structural_interace_handler.w](../../../../examples/tests/valid/inflight_class_structural_interace_handler.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ NotGoo }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const YesGoo = require("./YesGoo.inflight.js")({});
      const y = new YesGoo();
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await y.handle()) === 456)'`)})(((await y.handle()) === 456))};
      const x = new NotGoo();
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await x.handle()) === 123)'`)})(((await x.handle()) === 123))};
    }
  }
  return $Inflight1;
}

```

## clients/NotGoo.inflight.js
```js
module.exports = function({  }) {
  class NotGoo {
     constructor()  {
      const __parent_this = this;
    }
    async handle()  {
      const __parent_this = this;
      return 123;
    }
  }
  return NotGoo;
}

```

## clients/YesGoo.inflight.js
```js
module.exports = function({  }) {
  class YesGoo {
     constructor()  {
    }
    async handle()  {
      return 456;
    }
    async anotherMethod()  {
      {console.log("also fine")};
    }
  }
  return YesGoo;
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
      "value": "[[\"root/Default/Default/test:structure interface types for 'handle'\",\"${aws_lambda_function.root_teststructureinterfacetypesforhandle_Handler_D0AD9EBB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_teststructureinterfacetypesforhandle_Handler_IamRole_AB74813A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/IamRole",
            "uniqueId": "root_teststructureinterfacetypesforhandle_Handler_IamRole_AB74813A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_teststructureinterfacetypesforhandle_Handler_IamRolePolicy_726FC11F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/IamRolePolicy",
            "uniqueId": "root_teststructureinterfacetypesforhandle_Handler_IamRolePolicy_726FC11F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_teststructureinterfacetypesforhandle_Handler_IamRole_AB74813A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_teststructureinterfacetypesforhandle_Handler_IamRolePolicyAttachment_31DB7A71": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_teststructureinterfacetypesforhandle_Handler_IamRolePolicyAttachment_31DB7A71"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_teststructureinterfacetypesforhandle_Handler_IamRole_AB74813A.name}"
      }
    },
    "aws_lambda_function": {
      "root_teststructureinterfacetypesforhandle_Handler_D0AD9EBB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/Default",
            "uniqueId": "root_teststructureinterfacetypesforhandle_Handler_D0AD9EBB"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83718d0"
          }
        },
        "function_name": "Handler-c83718d0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_teststructureinterfacetypesforhandle_Handler_IamRole_AB74813A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_teststructureinterfacetypesforhandle_Handler_S3Object_9DFAC484.key}",
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
      "root_teststructureinterfacetypesforhandle_Handler_S3Object_9DFAC484": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/S3Object",
            "uniqueId": "root_teststructureinterfacetypesforhandle_Handler_S3Object_9DFAC484"
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
    class NotGoo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/NotGoo.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const NotGooClient = ${NotGoo._toInflightType(this).text};
            const client = new NotGooClient({
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const NotGooClient = NotGoo._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            NotGoo: ${NotGooClient.text},
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:structure interface types for 'handle'",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_structural_interace_handler", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


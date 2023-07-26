# [inflight_class_structural_interace_handler.w](../../../../../examples/tests/valid/inflight_class_structural_interace_handler.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $NotGoo }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class YesGoo {
        async handle() {
          return 456;
        }
        async anotherMethod() {
          {console.log("inflight" === 'inflight' && process.env.WING_TARGET !== 'sim' ? 'winglogstart:' + ("also fine") + ':winglogend': ("also fine"))};
        }
      }
      const y = new YesGoo();
      {((cond) => {if (!cond) throw new Error("assertion failed: y.handle() == 456")})(((await y.handle()) === 456))};
      const x = new $NotGoo();
      {((cond) => {if (!cond) throw new Error("assertion failed: x.handle() == 123")})(((await x.handle()) === 123))};
    }
  }
  return $Closure1;
}

```

## inflight.NotGoo.js
```js
module.exports = function({  }) {
  class NotGoo {
    async handle() {
      return 123;
    }
  }
  return NotGoo;
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
      "value": "[[\"root/Default/Default/test:structure interface types for 'handle'\",\"${aws_lambda_function.teststructureinterfacetypesforhandle_Handler_2DA6D9F8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "teststructureinterfacetypesforhandle_Handler_IamRole_12602AE7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/IamRole",
            "uniqueId": "teststructureinterfacetypesforhandle_Handler_IamRole_12602AE7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "teststructureinterfacetypesforhandle_Handler_IamRolePolicy_AD8B964E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/IamRolePolicy",
            "uniqueId": "teststructureinterfacetypesforhandle_Handler_IamRolePolicy_AD8B964E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.teststructureinterfacetypesforhandle_Handler_IamRole_12602AE7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "teststructureinterfacetypesforhandle_Handler_IamRolePolicyAttachment_B1D53B86": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/IamRolePolicyAttachment",
            "uniqueId": "teststructureinterfacetypesforhandle_Handler_IamRolePolicyAttachment_B1D53B86"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.teststructureinterfacetypesforhandle_Handler_IamRole_12602AE7.name}"
      }
    },
    "aws_lambda_function": {
      "teststructureinterfacetypesforhandle_Handler_2DA6D9F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/Default",
            "uniqueId": "teststructureinterfacetypesforhandle_Handler_2DA6D9F8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83718d0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83718d0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.teststructureinterfacetypesforhandle_Handler_IamRole_12602AE7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.teststructureinterfacetypesforhandle_Handler_S3Object_9308866C.key}",
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
      "teststructureinterfacetypesforhandle_Handler_S3Object_9308866C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:structure interface types for 'handle'/Handler/S3Object",
            "uniqueId": "teststructureinterfacetypesforhandle_Handler_S3Object_9308866C"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class NotGoo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.NotGoo.js")({
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
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $NotGoo: ${context._lift(NotGoo)},
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
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:structure interface types for 'handle'",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_class_structural_interace_handler", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


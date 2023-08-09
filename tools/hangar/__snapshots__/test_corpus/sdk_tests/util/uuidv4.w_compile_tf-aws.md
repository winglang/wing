# [uuidv4.w](../../../../../../examples/tests/sdk_tests/util/uuidv4.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $JSHelperInflight, $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const data = (await $util_Util.uuidv4());
      {((cond) => {if (!cond) throw new Error("assertion failed: JSHelperInflight.validateUUIDv4(data) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $JSHelperInflight.validateUUIDv4(data)),true)))};
    }
  }
  return $Closure1;
}

```

## inflight.JSHelper.js
```js
module.exports = function({  }) {
  class JSHelper {
    constructor({  }) {
    }
  }
  return JSHelper;
}

```

## inflight.JSHelperInflight.js
```js
module.exports = function({  }) {
  class JSHelperInflight {
    constructor({  }) {
    }
    static async validateUUIDv4(uuidv4) {
      return (require("<ABSOLUTE_PATH>/uuidv4-helper.js")["validateUUIDv4"])(uuidv4)
    }
  }
  return JSHelperInflight;
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
      "value": "[[\"root/undefined/Default/test:inflight uuidv4\",\"${aws_lambda_function.undefined_testinflightuuidv4_Handler_EE5FD911.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testinflightuuidv4_Handler_IamRole_EC058A23": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight uuidv4/Handler/IamRole",
            "uniqueId": "undefined_testinflightuuidv4_Handler_IamRole_EC058A23"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinflightuuidv4_Handler_IamRolePolicy_5891CD86": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight uuidv4/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightuuidv4_Handler_IamRolePolicy_5891CD86"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightuuidv4_Handler_IamRole_EC058A23.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinflightuuidv4_Handler_IamRolePolicyAttachment_7F122EE3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight uuidv4/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightuuidv4_Handler_IamRolePolicyAttachment_7F122EE3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightuuidv4_Handler_IamRole_EC058A23.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinflightuuidv4_Handler_EE5FD911": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight uuidv4/Handler/Default",
            "uniqueId": "undefined_testinflightuuidv4_Handler_EE5FD911"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8eb1250",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8eb1250",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightuuidv4_Handler_IamRole_EC058A23.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightuuidv4_Handler_S3Object_5A8F4489.key}",
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
      "undefined_testinflightuuidv4_Handler_S3Object_5A8F4489": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight uuidv4/Handler/S3Object",
            "uniqueId": "undefined_testinflightuuidv4_Handler_S3Object_5A8F4489"
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class JSHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
      }
      static validateUUIDv4(uuidv4) {
        return (require("<ABSOLUTE_PATH>/uuidv4-helper.js")["validateUUIDv4"])(uuidv4)
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.JSHelper.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const JSHelperClient = ${JSHelper._toInflightType(this).text};
            const client = new JSHelperClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class JSHelperInflight extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("validateUUIDv4", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.JSHelperInflight.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const JSHelperInflightClient = ${JSHelperInflight._toInflightType(this).text};
            const client = new JSHelperInflightClient({
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $JSHelperInflight: ${context._lift(JSHelperInflight)},
            $util_Util: ${context._lift(util.Util)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(JSHelperInflight, host, ["validateUUIDv4"]);
        }
        super._registerBind(host, ops);
      }
    }
    const data = (util.Util.uuidv4());
    {((cond) => {if (!cond) throw new Error("assertion failed: JSHelper.validateUUIDv4(data) == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((JSHelper.validateUUIDv4(data)),true)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight uuidv4",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "uuidv4", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


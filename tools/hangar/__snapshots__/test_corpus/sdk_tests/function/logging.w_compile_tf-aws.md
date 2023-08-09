# [logging.w](../../../../../../examples/tests/sdk_tests/function/logging.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(input) {
      {console.log("log inside f1")};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $f1 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(input) {
      (await $f1.invoke(""));
      {console.log("log inside f2")};
      (await $f1.invoke(""));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $Util, $f2 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $Util.logging());
      (await $f2.invoke(""));
      (await $Util.logging());
      (await $f2.invoke(""));
    }
  }
  return $Closure3;
}

```

## inflight.Util.js
```js
module.exports = function({  }) {
  class Util {
    constructor({  }) {
    }
    static async logging() {
      return (require("<ABSOLUTE_PATH>/logging.js")["logging"])()
    }
  }
  return Util;
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
      "value": "[[\"root/undefined/Default/test:logging\",\"${aws_lambda_function.undefined_testlogging_Handler_C54E971B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_f1_IamRole_E940F56F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f1/IamRole",
            "uniqueId": "undefined_f1_IamRole_E940F56F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_f2_IamRole_699C430B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f2/IamRole",
            "uniqueId": "undefined_f2_IamRole_699C430B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testlogging_Handler_IamRole_7DB45F93": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:logging/Handler/IamRole",
            "uniqueId": "undefined_testlogging_Handler_IamRole_7DB45F93"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_f1_IamRolePolicy_4F7EFEB1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f1/IamRolePolicy",
            "uniqueId": "undefined_f1_IamRolePolicy_4F7EFEB1"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_f1_IamRole_E940F56F.name}"
      },
      "undefined_f2_IamRolePolicy_F16D84CF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f2/IamRolePolicy",
            "uniqueId": "undefined_f2_IamRolePolicy_F16D84CF"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_f1_8F81365A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_f2_IamRole_699C430B.name}"
      },
      "undefined_testlogging_Handler_IamRolePolicy_A1F3AD08": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:logging/Handler/IamRolePolicy",
            "uniqueId": "undefined_testlogging_Handler_IamRolePolicy_A1F3AD08"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_f2_E7812542.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testlogging_Handler_IamRole_7DB45F93.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_f1_IamRolePolicyAttachment_AF7B0D81": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f1/IamRolePolicyAttachment",
            "uniqueId": "undefined_f1_IamRolePolicyAttachment_AF7B0D81"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_f1_IamRole_E940F56F.name}"
      },
      "undefined_f2_IamRolePolicyAttachment_331EB369": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f2/IamRolePolicyAttachment",
            "uniqueId": "undefined_f2_IamRolePolicyAttachment_331EB369"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_f2_IamRole_699C430B.name}"
      },
      "undefined_testlogging_Handler_IamRolePolicyAttachment_81F92BCA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:logging/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testlogging_Handler_IamRolePolicyAttachment_81F92BCA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testlogging_Handler_IamRole_7DB45F93.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_f1_8F81365A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f1/Default",
            "uniqueId": "undefined_f1_8F81365A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "f1-c8809bb4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f1-c8809bb4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_f1_IamRole_E940F56F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_f1_S3Object_FBAB74ED.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_f2_E7812542": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f2/Default",
            "uniqueId": "undefined_f2_E7812542"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_84b647cf": "${aws_lambda_function.undefined_f1_8F81365A.arn}",
            "WING_FUNCTION_NAME": "f2-c888ee7a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "f2-c888ee7a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_f2_IamRole_699C430B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_f2_S3Object_A3F3A9E4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testlogging_Handler_C54E971B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:logging/Handler/Default",
            "uniqueId": "undefined_testlogging_Handler_C54E971B"
          }
        },
        "environment": {
          "variables": {
            "FUNCTION_NAME_2f2c2df7": "${aws_lambda_function.undefined_f2_E7812542.arn}",
            "WING_FUNCTION_NAME": "Handler-c8353d13",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8353d13",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testlogging_Handler_IamRole_7DB45F93.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testlogging_Handler_S3Object_4C02C303.key}",
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
      "undefined_f1_S3Object_FBAB74ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f1/S3Object",
            "uniqueId": "undefined_f1_S3Object_FBAB74ED"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_f2_S3Object_A3F3A9E4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/f2/S3Object",
            "uniqueId": "undefined_f2_S3Object_A3F3A9E4"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testlogging_Handler_S3Object_4C02C303": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:logging/Handler/S3Object",
            "uniqueId": "undefined_testlogging_Handler_S3Object_4C02C303"
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
    class Util extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("logging", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Util.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const UtilClient = ${Util._toInflightType(this).text};
            const client = new UtilClient({
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
            $f1: ${context._lift(f1)},
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
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(f1, host, ["invoke"]);
        }
        super._registerBind(host, ops);
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
            $Util: ${context._lift(Util)},
            $f2: ${context._lift(f2)},
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
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(Util, host, ["logging"]);
          $Closure3._registerBindObject(f2, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const f1 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"f1",new $Closure1(this,"$Closure1"));
    const f2 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"f2",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:logging",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "logging", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


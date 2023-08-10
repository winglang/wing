# [inflight_capture_static.w](../../../../../examples/tests/valid/inflight_capture_static.w) | compile | tf-aws

## inflight.$Closure1-b839fbec.js
```js
module.exports = function({ $Preflight }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Preflight.staticMethod(123) == \"foo-123\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Preflight.staticMethod(123)),"foo-123")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-b839fbec.js
```js
module.exports = function({ $OuterInflight }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: OuterInflight.staticMethod(\"hello\") == 5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $OuterInflight.staticMethod("hello")),5)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-b839fbec.js
```js
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      class InnerInflight {
        static async staticMethod() {
          return "hello";
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: InnerInflight.staticMethod() == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await InnerInflight.staticMethod()),"hello")))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-b839fbec.js
```js
module.exports = function({ $util_Util }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $IF_LET_VALUE = (await $util_Util.tryEnv("WING_TARGET"));
        if ($IF_LET_VALUE != undefined) {
          const target = $IF_LET_VALUE;
          {console.log(String.raw({ raw: ["WING_TARGET=", ""] }, target))};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false /* target not defined*/")})(false)};
        }
      }
    }
  }
  return $Closure4;
}

```

## inflight.OuterInflight-b839fbec.js
```js
module.exports = function({  }) {
  class OuterInflight {
    static async staticMethod(b) {
      return b.length;
    }
  }
  return OuterInflight;
}

```

## inflight.Preflight-b839fbec.js
```js
module.exports = function({  }) {
  class Preflight {
    constructor({  }) {
    }
    static async staticMethod(a) {
      return String.raw({ raw: ["foo-", ""] }, a);
    }
  }
  return Preflight;
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
      "value": "[[\"root/Default/Default/test:call static method of preflight\",\"${aws_lambda_function.testcallstaticmethodofpreflight_Handler_8B40B9DA.arn}\"],[\"root/Default/Default/test:call static method of an outer inflight class\",\"${aws_lambda_function.testcallstaticmethodofanouterinflightclass_Handler_2DD5B79F.arn}\"],[\"root/Default/Default/test:call static method of an inner inflight class\",\"${aws_lambda_function.testcallstaticmethodofaninnerinflightclass_Handler_2C5AF32C.arn}\"],[\"root/Default/Default/test:call static method of a namespaced type\",\"${aws_lambda_function.testcallstaticmethodofanamespacedtype_Handler_482915F1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcallstaticmethodofanamespacedtype_Handler_IamRole_25705033": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/IamRole",
            "uniqueId": "testcallstaticmethodofanamespacedtype_Handler_IamRole_25705033"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcallstaticmethodofaninnerinflightclass_Handler_IamRole_CDAA9C7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/IamRole",
            "uniqueId": "testcallstaticmethodofaninnerinflightclass_Handler_IamRole_CDAA9C7A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcallstaticmethodofanouterinflightclass_Handler_IamRole_0FC1D765": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/IamRole",
            "uniqueId": "testcallstaticmethodofanouterinflightclass_Handler_IamRole_0FC1D765"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcallstaticmethodofpreflight_Handler_IamRole_E8EA54F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/IamRole",
            "uniqueId": "testcallstaticmethodofpreflight_Handler_IamRole_E8EA54F9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcallstaticmethodofanamespacedtype_Handler_IamRolePolicy_12949151": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/IamRolePolicy",
            "uniqueId": "testcallstaticmethodofanamespacedtype_Handler_IamRolePolicy_12949151"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcallstaticmethodofanamespacedtype_Handler_IamRole_25705033.name}"
      },
      "testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicy_C6A53FA8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/IamRolePolicy",
            "uniqueId": "testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicy_C6A53FA8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcallstaticmethodofaninnerinflightclass_Handler_IamRole_CDAA9C7A.name}"
      },
      "testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicy_38ABBE2B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/IamRolePolicy",
            "uniqueId": "testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicy_38ABBE2B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcallstaticmethodofanouterinflightclass_Handler_IamRole_0FC1D765.name}"
      },
      "testcallstaticmethodofpreflight_Handler_IamRolePolicy_D3497043": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/IamRolePolicy",
            "uniqueId": "testcallstaticmethodofpreflight_Handler_IamRolePolicy_D3497043"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testcallstaticmethodofpreflight_Handler_IamRole_E8EA54F9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcallstaticmethodofanamespacedtype_Handler_IamRolePolicyAttachment_ECE71D89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallstaticmethodofanamespacedtype_Handler_IamRolePolicyAttachment_ECE71D89"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallstaticmethodofanamespacedtype_Handler_IamRole_25705033.name}"
      },
      "testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicyAttachment_41BCA0B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicyAttachment_41BCA0B2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallstaticmethodofaninnerinflightclass_Handler_IamRole_CDAA9C7A.name}"
      },
      "testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicyAttachment_8D3E1518": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicyAttachment_8D3E1518"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallstaticmethodofanouterinflightclass_Handler_IamRole_0FC1D765.name}"
      },
      "testcallstaticmethodofpreflight_Handler_IamRolePolicyAttachment_65F94B62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallstaticmethodofpreflight_Handler_IamRolePolicyAttachment_65F94B62"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallstaticmethodofpreflight_Handler_IamRole_E8EA54F9.name}"
      }
    },
    "aws_lambda_function": {
      "testcallstaticmethodofanamespacedtype_Handler_482915F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/Default",
            "uniqueId": "testcallstaticmethodofanamespacedtype_Handler_482915F1"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c808c556",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c808c556",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallstaticmethodofanamespacedtype_Handler_IamRole_25705033.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallstaticmethodofanamespacedtype_Handler_S3Object_F7E5940D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcallstaticmethodofaninnerinflightclass_Handler_2C5AF32C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/Default",
            "uniqueId": "testcallstaticmethodofaninnerinflightclass_Handler_2C5AF32C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d913d8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d913d8",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallstaticmethodofaninnerinflightclass_Handler_IamRole_CDAA9C7A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallstaticmethodofaninnerinflightclass_Handler_S3Object_054F3843.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcallstaticmethodofanouterinflightclass_Handler_2DD5B79F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/Default",
            "uniqueId": "testcallstaticmethodofanouterinflightclass_Handler_2DD5B79F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8dbdf1b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8dbdf1b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallstaticmethodofanouterinflightclass_Handler_IamRole_0FC1D765.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallstaticmethodofanouterinflightclass_Handler_S3Object_1DB15ACB.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcallstaticmethodofpreflight_Handler_8B40B9DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/Default",
            "uniqueId": "testcallstaticmethodofpreflight_Handler_8B40B9DA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8e286c0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e286c0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallstaticmethodofpreflight_Handler_IamRole_E8EA54F9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallstaticmethodofpreflight_Handler_S3Object_4DFBB09F.key}",
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
      "testcallstaticmethodofanamespacedtype_Handler_S3Object_F7E5940D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/S3Object",
            "uniqueId": "testcallstaticmethodofanamespacedtype_Handler_S3Object_F7E5940D"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcallstaticmethodofaninnerinflightclass_Handler_S3Object_054F3843": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/S3Object",
            "uniqueId": "testcallstaticmethodofaninnerinflightclass_Handler_S3Object_054F3843"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcallstaticmethodofanouterinflightclass_Handler_S3Object_1DB15ACB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/S3Object",
            "uniqueId": "testcallstaticmethodofanouterinflightclass_Handler_S3Object_1DB15ACB"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcallstaticmethodofpreflight_Handler_S3Object_4DFBB09F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/S3Object",
            "uniqueId": "testcallstaticmethodofpreflight_Handler_S3Object_4DFBB09F"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Preflight extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("staticMethod", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Preflight-b839fbec.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PreflightClient = ${Preflight._toInflightType(this).text};
            const client = new PreflightClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class OuterInflight extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("staticMethod", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.OuterInflight-b839fbec.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const OuterInflightClient = ${OuterInflight._toInflightType(this).text};
            const client = new OuterInflightClient({
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
          require("./inflight.$Closure1-b839fbec.js")({
            $Preflight: ${context._lift(Preflight)},
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
          $Closure1._registerBindObject(Preflight, host, ["staticMethod"]);
        }
        super._registerBind(host, ops);
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
          require("./inflight.$Closure2-b839fbec.js")({
            $OuterInflight: ${context._lift(OuterInflight)},
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
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3-b839fbec.js")({
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
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4-b839fbec.js")({
            $util_Util: ${context._lift(util.Util)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call static method of preflight",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call static method of an outer inflight class",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call static method of an inner inflight class",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call static method of a namespaced type",new $Closure4(this,"$Closure4"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflight_capture_static", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


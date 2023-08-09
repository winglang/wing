# [inflight_capture_static.w](../../../../../examples/tests/valid/inflight_capture_static.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
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

## inflight.$Closure3.js
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

## inflight.$Closure4.js
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

## inflight.OuterInflight.js
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

## inflight.Preflight.js
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
      "value": "[[\"root/undefined/Default/test:call static method of preflight\",\"${aws_lambda_function.undefined_testcallstaticmethodofpreflight_Handler_FD0B44AD.arn}\"],[\"root/undefined/Default/test:call static method of an outer inflight class\",\"${aws_lambda_function.undefined_testcallstaticmethodofanouterinflightclass_Handler_853558A6.arn}\"],[\"root/undefined/Default/test:call static method of an inner inflight class\",\"${aws_lambda_function.undefined_testcallstaticmethodofaninnerinflightclass_Handler_B6BEAD68.arn}\"],[\"root/undefined/Default/test:call static method of a namespaced type\",\"${aws_lambda_function.undefined_testcallstaticmethodofanamespacedtype_Handler_6AEFBBB8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testcallstaticmethodofanamespacedtype_Handler_IamRole_E974973B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of a namespaced type/Handler/IamRole",
            "uniqueId": "undefined_testcallstaticmethodofanamespacedtype_Handler_IamRole_E974973B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_92ACAC7F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an inner inflight class/Handler/IamRole",
            "uniqueId": "undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_92ACAC7F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRole_82C65D95": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an outer inflight class/Handler/IamRole",
            "uniqueId": "undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRole_82C65D95"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcallstaticmethodofpreflight_Handler_IamRole_1F52DE4E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of preflight/Handler/IamRole",
            "uniqueId": "undefined_testcallstaticmethodofpreflight_Handler_IamRole_1F52DE4E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicy_05AB1AFA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of a namespaced type/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicy_05AB1AFA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofanamespacedtype_Handler_IamRole_E974973B.name}"
      },
      "undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicy_A343CD57": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an inner inflight class/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicy_A343CD57"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_92ACAC7F.name}"
      },
      "undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicy_6D09C520": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an outer inflight class/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicy_6D09C520"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRole_82C65D95.name}"
      },
      "undefined_testcallstaticmethodofpreflight_Handler_IamRolePolicy_FCD94227": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of preflight/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcallstaticmethodofpreflight_Handler_IamRolePolicy_FCD94227"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofpreflight_Handler_IamRole_1F52DE4E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicyAttachment_731C9554": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of a namespaced type/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicyAttachment_731C9554"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofanamespacedtype_Handler_IamRole_E974973B.name}"
      },
      "undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicyAttachment_227AC91C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an inner inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicyAttachment_227AC91C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_92ACAC7F.name}"
      },
      "undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicyAttachment_9AB5BA2A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an outer inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicyAttachment_9AB5BA2A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRole_82C65D95.name}"
      },
      "undefined_testcallstaticmethodofpreflight_Handler_IamRolePolicyAttachment_A1157B55": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of preflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcallstaticmethodofpreflight_Handler_IamRolePolicyAttachment_A1157B55"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcallstaticmethodofpreflight_Handler_IamRole_1F52DE4E.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testcallstaticmethodofanamespacedtype_Handler_6AEFBBB8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of a namespaced type/Handler/Default",
            "uniqueId": "undefined_testcallstaticmethodofanamespacedtype_Handler_6AEFBBB8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c80bcca7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c80bcca7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcallstaticmethodofanamespacedtype_Handler_IamRole_E974973B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcallstaticmethodofanamespacedtype_Handler_S3Object_C3D07F33.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcallstaticmethodofaninnerinflightclass_Handler_B6BEAD68": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an inner inflight class/Handler/Default",
            "uniqueId": "undefined_testcallstaticmethodofaninnerinflightclass_Handler_B6BEAD68"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c839a79f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c839a79f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_92ACAC7F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcallstaticmethodofaninnerinflightclass_Handler_S3Object_32E3BCAA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcallstaticmethodofanouterinflightclass_Handler_853558A6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an outer inflight class/Handler/Default",
            "uniqueId": "undefined_testcallstaticmethodofanouterinflightclass_Handler_853558A6"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8414218",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8414218",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcallstaticmethodofanouterinflightclass_Handler_IamRole_82C65D95.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcallstaticmethodofanouterinflightclass_Handler_S3Object_547A0B69.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcallstaticmethodofpreflight_Handler_FD0B44AD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of preflight/Handler/Default",
            "uniqueId": "undefined_testcallstaticmethodofpreflight_Handler_FD0B44AD"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c896b1c7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c896b1c7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcallstaticmethodofpreflight_Handler_IamRole_1F52DE4E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcallstaticmethodofpreflight_Handler_S3Object_BE6A8F45.key}",
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
      "undefined_testcallstaticmethodofanamespacedtype_Handler_S3Object_C3D07F33": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of a namespaced type/Handler/S3Object",
            "uniqueId": "undefined_testcallstaticmethodofanamespacedtype_Handler_S3Object_C3D07F33"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcallstaticmethodofaninnerinflightclass_Handler_S3Object_32E3BCAA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an inner inflight class/Handler/S3Object",
            "uniqueId": "undefined_testcallstaticmethodofaninnerinflightclass_Handler_S3Object_32E3BCAA"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcallstaticmethodofanouterinflightclass_Handler_S3Object_547A0B69": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of an outer inflight class/Handler/S3Object",
            "uniqueId": "undefined_testcallstaticmethodofanouterinflightclass_Handler_S3Object_547A0B69"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcallstaticmethodofpreflight_Handler_S3Object_BE6A8F45": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call static method of preflight/Handler/S3Object",
            "uniqueId": "undefined_testcallstaticmethodofpreflight_Handler_S3Object_BE6A8F45"
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
    class Preflight extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("staticMethod", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Preflight.js")({
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
          require("./inflight.OuterInflight.js")({
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
          require("./inflight.$Closure1.js")({
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
          require("./inflight.$Closure2.js")({
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
          require("./inflight.$Closure3.js")({
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
          require("./inflight.$Closure4.js")({
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


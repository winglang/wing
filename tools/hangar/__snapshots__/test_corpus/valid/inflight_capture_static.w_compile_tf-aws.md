# [inflight_capture_static.w](../../../../../examples/tests/valid/inflight_capture_static.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ Preflight }) {
  class $Closure1 {
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: Preflight.staticMethod(123) == \"foo-123\"")})(((await Preflight.staticMethod(123)) === "foo-123"))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ OuterInflight }) {
  class $Closure2 {
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: OuterInflight.staticMethod(\"hello\") == 5")})(((await OuterInflight.staticMethod("hello")) === 5))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({  }) {
  class $Closure3 {
    async handle()  {
      const InnerInflight = require("./inflight.InnerInflight.js")({});
      {((cond) => {if (!cond) throw new Error("assertion failed: InnerInflight.staticMethod() == \"hello\"")})(((await InnerInflight.staticMethod()) === "hello"))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ util_Util }) {
  const util = {
    Util: util_Util,
  };
  class $Closure4 {
    async handle()  {
      {
        const $IF_LET_VALUE = (await util.Util.tryEnv("WING_TARGET"));
        if ($IF_LET_VALUE != undefined) {
          const target = $IF_LET_VALUE;
          {console.log(String.raw({ raw: ["WING_TARGET=", ""] }, target))};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false /* target not defined*/")})(false)};
        }
      }
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure4;
}

```

## inflight.InnerInflight.js
```js
module.exports = function({  }) {
  class InnerInflight {
    static async staticMethod()  {
      return "hello";
    }
  }
  return InnerInflight;
}

```

## inflight.OuterInflight.js
```js
module.exports = function({  }) {
  class OuterInflight {
    static async staticMethod(b)  {
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
    static async staticMethod(a)  {
      return String.raw({ raw: ["foo-", ""] }, a);
    }
    constructor({  }) {
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
      "value": "[[\"root/Default/Default/test:call static method of preflight\",\"${aws_lambda_function.root_testcallstaticmethodofpreflight_Handler_5B448807.arn}\"],[\"root/Default/Default/test:call static method of an outer inflight class\",\"${aws_lambda_function.root_testcallstaticmethodofanouterinflightclass_Handler_1A423447.arn}\"],[\"root/Default/Default/test:call static method of an inner inflight class\",\"${aws_lambda_function.root_testcallstaticmethodofaninnerinflightclass_Handler_E8B7C24A.arn}\"],[\"root/Default/Default/test:call static method of a namespaced type\",\"${aws_lambda_function.root_testcallstaticmethodofanamespacedtype_Handler_AEBE56F1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcallstaticmethodofanamespacedtype_Handler_IamRole_0A29293B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/IamRole",
            "uniqueId": "root_testcallstaticmethodofanamespacedtype_Handler_IamRole_0A29293B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_440C387C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/IamRole",
            "uniqueId": "root_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_440C387C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcallstaticmethodofanouterinflightclass_Handler_IamRole_D329D2D2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/IamRole",
            "uniqueId": "root_testcallstaticmethodofanouterinflightclass_Handler_IamRole_D329D2D2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testcallstaticmethodofpreflight_Handler_IamRole_22C5CECD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/IamRole",
            "uniqueId": "root_testcallstaticmethodofpreflight_Handler_IamRole_22C5CECD"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicy_50C4E57F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/IamRolePolicy",
            "uniqueId": "root_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicy_50C4E57F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcallstaticmethodofanamespacedtype_Handler_IamRole_0A29293B.name}"
      },
      "root_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicy_FE01820C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/IamRolePolicy",
            "uniqueId": "root_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicy_FE01820C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_440C387C.name}"
      },
      "root_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicy_D50A44BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/IamRolePolicy",
            "uniqueId": "root_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicy_D50A44BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcallstaticmethodofanouterinflightclass_Handler_IamRole_D329D2D2.name}"
      },
      "root_testcallstaticmethodofpreflight_Handler_IamRolePolicy_9DD7990E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/IamRolePolicy",
            "uniqueId": "root_testcallstaticmethodofpreflight_Handler_IamRolePolicy_9DD7990E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcallstaticmethodofpreflight_Handler_IamRole_22C5CECD.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicyAttachment_37AD44B3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcallstaticmethodofanamespacedtype_Handler_IamRolePolicyAttachment_37AD44B3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcallstaticmethodofanamespacedtype_Handler_IamRole_0A29293B.name}"
      },
      "root_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicyAttachment_13C700AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcallstaticmethodofaninnerinflightclass_Handler_IamRolePolicyAttachment_13C700AD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_440C387C.name}"
      },
      "root_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicyAttachment_8F3C3D3E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcallstaticmethodofanouterinflightclass_Handler_IamRolePolicyAttachment_8F3C3D3E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcallstaticmethodofanouterinflightclass_Handler_IamRole_D329D2D2.name}"
      },
      "root_testcallstaticmethodofpreflight_Handler_IamRolePolicyAttachment_CCA0F261": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcallstaticmethodofpreflight_Handler_IamRolePolicyAttachment_CCA0F261"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcallstaticmethodofpreflight_Handler_IamRole_22C5CECD.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcallstaticmethodofanamespacedtype_Handler_AEBE56F1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/Default",
            "uniqueId": "root_testcallstaticmethodofanamespacedtype_Handler_AEBE56F1"
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
        "role": "${aws_iam_role.root_testcallstaticmethodofanamespacedtype_Handler_IamRole_0A29293B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcallstaticmethodofanamespacedtype_Handler_S3Object_996E2B82.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcallstaticmethodofaninnerinflightclass_Handler_E8B7C24A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/Default",
            "uniqueId": "root_testcallstaticmethodofaninnerinflightclass_Handler_E8B7C24A"
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
        "role": "${aws_iam_role.root_testcallstaticmethodofaninnerinflightclass_Handler_IamRole_440C387C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcallstaticmethodofaninnerinflightclass_Handler_S3Object_A3ED9F15.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcallstaticmethodofanouterinflightclass_Handler_1A423447": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/Default",
            "uniqueId": "root_testcallstaticmethodofanouterinflightclass_Handler_1A423447"
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
        "role": "${aws_iam_role.root_testcallstaticmethodofanouterinflightclass_Handler_IamRole_D329D2D2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcallstaticmethodofanouterinflightclass_Handler_S3Object_074F10E0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testcallstaticmethodofpreflight_Handler_5B448807": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/Default",
            "uniqueId": "root_testcallstaticmethodofpreflight_Handler_5B448807"
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
        "role": "${aws_iam_role.root_testcallstaticmethodofpreflight_Handler_IamRole_22C5CECD.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcallstaticmethodofpreflight_Handler_S3Object_74E016B5.key}",
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
      "root_testcallstaticmethodofanamespacedtype_Handler_S3Object_996E2B82": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of a namespaced type/Handler/S3Object",
            "uniqueId": "root_testcallstaticmethodofanamespacedtype_Handler_S3Object_996E2B82"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcallstaticmethodofaninnerinflightclass_Handler_S3Object_A3ED9F15": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an inner inflight class/Handler/S3Object",
            "uniqueId": "root_testcallstaticmethodofaninnerinflightclass_Handler_S3Object_A3ED9F15"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcallstaticmethodofanouterinflightclass_Handler_S3Object_074F10E0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of an outer inflight class/Handler/S3Object",
            "uniqueId": "root_testcallstaticmethodofanouterinflightclass_Handler_S3Object_074F10E0"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testcallstaticmethodofpreflight_Handler_S3Object_74E016B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call static method of preflight/Handler/S3Object",
            "uniqueId": "root_testcallstaticmethodofpreflight_Handler_S3Object_74E016B5"
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
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Preflight extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("staticMethod");
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
            const client = new (${Preflight._toInflightType(this).text})({
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
        this._addInflightOps("staticMethod");
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
            const client = new (${OuterInflight._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const lifted_Preflight = Preflight._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({ 
            Preflight: ${lifted_Preflight},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure1._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const lifted_OuterInflight = OuterInflight._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({ 
            OuterInflight: ${lifted_OuterInflight},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure2._toInflightType(this).text})({
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
        this._addInflightOps("handle");
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
            const client = new (${$Closure3._toInflightType(this).text})({
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const lifted_util_Util = util.Util._toInflightType(context).text;
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({ 
            util_Util: ${lifted_util_Util},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const client = new (${$Closure4._toInflightType(this).text})({
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
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_capture_static", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


# [initial.w](../../../../../../examples/tests/sdk_tests/counter/initial.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $counterA }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counterA.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counterA.peek()),0)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counterB }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counterB.peek() == 500")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counterB.peek()),500)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $counterC }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counterC.peek() == -198")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counterC.peek()),(-198))))};
    }
  }
  return $Closure3;
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
      "value": "[[\"root/undefined/Default/test:initial:default\",\"${aws_lambda_function.undefined_testinitialdefault_Handler_E8A2D25F.arn}\"],[\"root/undefined/Default/test:initial:positive-value\",\"${aws_lambda_function.undefined_testinitialpositive-value_Handler_8AE0EC2F.arn}\"],[\"root/undefined/Default/test:initial:negative-value\",\"${aws_lambda_function.undefined_testinitialnegative-value_Handler_29C6F14A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_counterA_78593FA9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/counterA/Default",
            "uniqueId": "undefined_counterA_78593FA9"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-counterA-c8212d2e"
      },
      "undefined_counterB_40B61750": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/counterB/Default",
            "uniqueId": "undefined_counterB_40B61750"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-counterB-c8038b3b"
      },
      "undefined_counterC_EA484374": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/counterC/Default",
            "uniqueId": "undefined_counterC_EA484374"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-counterC-c89012c5"
      }
    },
    "aws_iam_role": {
      "undefined_testinitialdefault_Handler_IamRole_4EA839D4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:default/Handler/IamRole",
            "uniqueId": "undefined_testinitialdefault_Handler_IamRole_4EA839D4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinitialnegative-value_Handler_IamRole_98554E37": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:negative-value/Handler/IamRole",
            "uniqueId": "undefined_testinitialnegative-value_Handler_IamRole_98554E37"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinitialpositive-value_Handler_IamRole_52BA546F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:positive-value/Handler/IamRole",
            "uniqueId": "undefined_testinitialpositive-value_Handler_IamRole_52BA546F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testinitialdefault_Handler_IamRolePolicy_27A39B9F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:default/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinitialdefault_Handler_IamRolePolicy_27A39B9F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_counterA_78593FA9.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testinitialdefault_Handler_IamRole_4EA839D4.name}"
      },
      "undefined_testinitialnegative-value_Handler_IamRolePolicy_00434431": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:negative-value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinitialnegative-value_Handler_IamRolePolicy_00434431"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_counterC_EA484374.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testinitialnegative-value_Handler_IamRole_98554E37.name}"
      },
      "undefined_testinitialpositive-value_Handler_IamRolePolicy_A4C98819": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:positive-value/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinitialpositive-value_Handler_IamRolePolicy_A4C98819"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_counterB_40B61750.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testinitialpositive-value_Handler_IamRole_52BA546F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testinitialdefault_Handler_IamRolePolicyAttachment_B983A943": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:default/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinitialdefault_Handler_IamRolePolicyAttachment_B983A943"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinitialdefault_Handler_IamRole_4EA839D4.name}"
      },
      "undefined_testinitialnegative-value_Handler_IamRolePolicyAttachment_1250A84B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:negative-value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinitialnegative-value_Handler_IamRolePolicyAttachment_1250A84B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinitialnegative-value_Handler_IamRole_98554E37.name}"
      },
      "undefined_testinitialpositive-value_Handler_IamRolePolicyAttachment_530F3019": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:positive-value/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinitialpositive-value_Handler_IamRolePolicyAttachment_530F3019"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinitialpositive-value_Handler_IamRole_52BA546F.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testinitialdefault_Handler_E8A2D25F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:default/Handler/Default",
            "uniqueId": "undefined_testinitialdefault_Handler_E8A2D25F"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_47fd205f": "${aws_dynamodb_table.undefined_counterA_78593FA9.name}",
            "WING_FUNCTION_NAME": "Handler-c874ff80",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c874ff80",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinitialdefault_Handler_IamRole_4EA839D4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinitialdefault_Handler_S3Object_D85954E1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinitialnegative-value_Handler_29C6F14A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:negative-value/Handler/Default",
            "uniqueId": "undefined_testinitialnegative-value_Handler_29C6F14A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_c127ab2c": "${aws_dynamodb_table.undefined_counterC_EA484374.name}",
            "WING_FUNCTION_NAME": "Handler-c899bb6d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c899bb6d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinitialnegative-value_Handler_IamRole_98554E37.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinitialnegative-value_Handler_S3Object_8057A4F0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinitialpositive-value_Handler_8AE0EC2F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:positive-value/Handler/Default",
            "uniqueId": "undefined_testinitialpositive-value_Handler_8AE0EC2F"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_dd1a02e9": "${aws_dynamodb_table.undefined_counterB_40B61750.name}",
            "WING_FUNCTION_NAME": "Handler-c8daf308",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8daf308",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinitialpositive-value_Handler_IamRole_52BA546F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinitialpositive-value_Handler_S3Object_2E5D9C4C.key}",
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
      "undefined_testinitialdefault_Handler_S3Object_D85954E1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:default/Handler/S3Object",
            "uniqueId": "undefined_testinitialdefault_Handler_S3Object_D85954E1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinitialnegative-value_Handler_S3Object_8057A4F0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:negative-value/Handler/S3Object",
            "uniqueId": "undefined_testinitialnegative-value_Handler_S3Object_8057A4F0"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinitialpositive-value_Handler_S3Object_2E5D9C4C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:initial:positive-value/Handler/S3Object",
            "uniqueId": "undefined_testinitialpositive-value_Handler_S3Object_2E5D9C4C"
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
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $counterA: ${context._lift(counterA)},
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
          $Closure1._registerBindObject(counterA, host, ["peek"]);
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
            $counterB: ${context._lift(counterB)},
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
          $Closure2._registerBindObject(counterB, host, ["peek"]);
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
            $counterC: ${context._lift(counterC)},
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
          $Closure3._registerBindObject(counterC, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counterA = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterA");
    const counterB = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterB",{ initial: 500 });
    const counterC = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"counterC",{ initial: (-198) });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:initial:default",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:initial:positive-value",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:initial:negative-value",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "initial", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


# [initial.w](../../../../../../examples/tests/sdk_tests/counter/initial.w) | compile | tf-aws

## inflight.$Closure1-a6fe00ef.js
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

## inflight.$Closure2-a6fe00ef.js
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

## inflight.$Closure3-a6fe00ef.js
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
      "value": "[[\"root/Default/Default/test:initial:default\",\"${aws_lambda_function.testinitialdefault_Handler_CE963B96.arn}\"],[\"root/Default/Default/test:initial:positive-value\",\"${aws_lambda_function.testinitialpositive-value_Handler_473ACDB1.arn}\"],[\"root/Default/Default/test:initial:negative-value\",\"${aws_lambda_function.testinitialnegative-value_Handler_C5E9E480.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "counterA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counterA/Default",
            "uniqueId": "counterA"
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
        "name": "wing-counter-counterA-c8aa8342"
      },
      "counterB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counterB/Default",
            "uniqueId": "counterB"
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
        "name": "wing-counter-counterB-c8c89cd9"
      },
      "counterC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counterC/Default",
            "uniqueId": "counterC"
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
        "name": "wing-counter-counterC-c83ab8ef"
      }
    },
    "aws_iam_role": {
      "testinitialdefault_Handler_IamRole_17A8E87E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/IamRole",
            "uniqueId": "testinitialdefault_Handler_IamRole_17A8E87E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinitialnegative-value_Handler_IamRole_ABB74877": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/IamRole",
            "uniqueId": "testinitialnegative-value_Handler_IamRole_ABB74877"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinitialpositive-value_Handler_IamRole_C4B67BEC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/IamRole",
            "uniqueId": "testinitialpositive-value_Handler_IamRole_C4B67BEC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinitialdefault_Handler_IamRolePolicy_D5C46C98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/IamRolePolicy",
            "uniqueId": "testinitialdefault_Handler_IamRolePolicy_D5C46C98"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.counterA.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testinitialdefault_Handler_IamRole_17A8E87E.name}"
      },
      "testinitialnegative-value_Handler_IamRolePolicy_18C99321": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/IamRolePolicy",
            "uniqueId": "testinitialnegative-value_Handler_IamRolePolicy_18C99321"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.counterC.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testinitialnegative-value_Handler_IamRole_ABB74877.name}"
      },
      "testinitialpositive-value_Handler_IamRolePolicy_B8E28D3D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/IamRolePolicy",
            "uniqueId": "testinitialpositive-value_Handler_IamRolePolicy_B8E28D3D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.counterB.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testinitialpositive-value_Handler_IamRole_C4B67BEC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinitialdefault_Handler_IamRolePolicyAttachment_2901029D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinitialdefault_Handler_IamRolePolicyAttachment_2901029D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinitialdefault_Handler_IamRole_17A8E87E.name}"
      },
      "testinitialnegative-value_Handler_IamRolePolicyAttachment_11314DB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinitialnegative-value_Handler_IamRolePolicyAttachment_11314DB1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinitialnegative-value_Handler_IamRole_ABB74877.name}"
      },
      "testinitialpositive-value_Handler_IamRolePolicyAttachment_5834A2E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinitialpositive-value_Handler_IamRolePolicyAttachment_5834A2E4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinitialpositive-value_Handler_IamRole_C4B67BEC.name}"
      }
    },
    "aws_lambda_function": {
      "testinitialdefault_Handler_CE963B96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/Default",
            "uniqueId": "testinitialdefault_Handler_CE963B96"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_220d28dd": "${aws_dynamodb_table.counterA.name}",
            "WING_FUNCTION_NAME": "Handler-c88a038b",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88a038b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinitialdefault_Handler_IamRole_17A8E87E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinitialdefault_Handler_S3Object_905C4002.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinitialnegative-value_Handler_C5E9E480": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/Default",
            "uniqueId": "testinitialnegative-value_Handler_C5E9E480"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_4795370d": "${aws_dynamodb_table.counterC.name}",
            "WING_FUNCTION_NAME": "Handler-c88178b6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88178b6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinitialnegative-value_Handler_IamRole_ABB74877.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinitialnegative-value_Handler_S3Object_02526CAC.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinitialpositive-value_Handler_473ACDB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/Default",
            "uniqueId": "testinitialpositive-value_Handler_473ACDB1"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_96df6c3c": "${aws_dynamodb_table.counterB.name}",
            "WING_FUNCTION_NAME": "Handler-c835d39a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c835d39a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinitialpositive-value_Handler_IamRole_C4B67BEC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinitialpositive-value_Handler_S3Object_B6747816.key}",
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
      "testinitialdefault_Handler_S3Object_905C4002": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:default/Handler/S3Object",
            "uniqueId": "testinitialdefault_Handler_S3Object_905C4002"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinitialnegative-value_Handler_S3Object_02526CAC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:negative-value/Handler/S3Object",
            "uniqueId": "testinitialnegative-value_Handler_S3Object_02526CAC"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinitialpositive-value_Handler_S3Object_B6747816": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:initial:positive-value/Handler/S3Object",
            "uniqueId": "testinitialpositive-value_Handler_S3Object_B6747816"
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
          require("./inflight.$Closure1-a6fe00ef.js")({
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
          require("./inflight.$Closure2-a6fe00ef.js")({
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
          require("./inflight.$Closure3-a6fe00ef.js")({
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


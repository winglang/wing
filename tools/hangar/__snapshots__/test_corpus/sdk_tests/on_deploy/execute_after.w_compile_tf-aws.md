# [execute_after.w](../../../../../../examples/tests/sdk_tests/on_deploy/execute_after.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $counter.set(10));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $counter.inc());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $counter }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),11)))};
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
  "data": {
    "aws_lambda_invocation": {
      "undefined_init1_Invocation_94D71566": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init1/Invocation",
            "uniqueId": "undefined_init1_Invocation_94D71566"
          }
        },
        "depends_on": [],
        "function_name": "${aws_lambda_function.undefined_init1_Function_AD9F9050.function_name}",
        "input": "{}"
      },
      "undefined_init2_Invocation_7A5B3053": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init2/Invocation",
            "uniqueId": "undefined_init2_Invocation_7A5B3053"
          }
        },
        "depends_on": [
          "aws_s3_object.undefined_init1_Function_S3Object_2708BC24",
          "aws_iam_role.undefined_init1_Function_IamRole_01E3E163",
          "aws_iam_role_policy.undefined_init1_Function_IamRolePolicy_F5FFBC7E",
          "aws_iam_role_policy_attachment.undefined_init1_Function_IamRolePolicyAttachment_1793DB30",
          "aws_lambda_function.undefined_init1_Function_AD9F9050",
          "data.aws_lambda_invocation.undefined_init1_Invocation_94D71566"
        ],
        "function_name": "${aws_lambda_function.undefined_init2_Function_D11FD0F8.function_name}",
        "input": "{}"
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/undefined/Default/test:counter\",\"${aws_lambda_function.undefined_testcounter_Handler_BAB660C8.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_cloudCounter_4B4E77ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Counter/Default",
            "uniqueId": "undefined_cloudCounter_4B4E77ED"
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
        "name": "wing-counter-cloud.Counter-c86bae23"
      }
    },
    "aws_iam_role": {
      "undefined_init1_Function_IamRole_01E3E163": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init1/Function/IamRole",
            "uniqueId": "undefined_init1_Function_IamRole_01E3E163"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_init2_Function_IamRole_27B4EA31": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init2/Function/IamRole",
            "uniqueId": "undefined_init2_Function_IamRole_27B4EA31"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcounter_Handler_IamRole_D0799838": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:counter/Handler/IamRole",
            "uniqueId": "undefined_testcounter_Handler_IamRole_D0799838"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_init1_Function_IamRolePolicy_F5FFBC7E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init1/Function/IamRolePolicy",
            "uniqueId": "undefined_init1_Function_IamRolePolicy_F5FFBC7E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_init1_Function_IamRole_01E3E163.name}"
      },
      "undefined_init2_Function_IamRolePolicy_AE63A574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init2/Function/IamRolePolicy",
            "uniqueId": "undefined_init2_Function_IamRolePolicy_AE63A574"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_init2_Function_IamRole_27B4EA31.name}"
      },
      "undefined_testcounter_Handler_IamRolePolicy_E0C39F83": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:counter/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcounter_Handler_IamRolePolicy_E0C39F83"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testcounter_Handler_IamRole_D0799838.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_init1_Function_IamRolePolicyAttachment_1793DB30": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init1/Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_init1_Function_IamRolePolicyAttachment_1793DB30"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_init1_Function_IamRole_01E3E163.name}"
      },
      "undefined_init2_Function_IamRolePolicyAttachment_62A8E917": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init2/Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_init2_Function_IamRolePolicyAttachment_62A8E917"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_init2_Function_IamRole_27B4EA31.name}"
      },
      "undefined_testcounter_Handler_IamRolePolicyAttachment_068A72A8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:counter/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcounter_Handler_IamRolePolicyAttachment_068A72A8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcounter_Handler_IamRole_D0799838.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_init1_Function_AD9F9050": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init1/Function/Default",
            "uniqueId": "undefined_init1_Function_AD9F9050"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Function-c89c2260",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c89c2260",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_init1_Function_IamRole_01E3E163.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_init1_Function_S3Object_2708BC24.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_init2_Function_D11FD0F8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init2/Function/Default",
            "uniqueId": "undefined_init2_Function_D11FD0F8"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Function-c84584e2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c84584e2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_init2_Function_IamRole_27B4EA31.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_init2_Function_S3Object_CBD3D0AD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcounter_Handler_BAB660C8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:counter/Handler/Default",
            "uniqueId": "undefined_testcounter_Handler_BAB660C8"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8d77267",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d77267",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcounter_Handler_IamRole_D0799838.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcounter_Handler_S3Object_A9D34CAE.key}",
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
      "undefined_init1_Function_S3Object_2708BC24": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init1/Function/S3Object",
            "uniqueId": "undefined_init1_Function_S3Object_2708BC24"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_init2_Function_S3Object_CBD3D0AD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/init2/Function/S3Object",
            "uniqueId": "undefined_init2_Function_S3Object_CBD3D0AD"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcounter_Handler_S3Object_A9D34CAE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:counter/Handler/S3Object",
            "uniqueId": "undefined_testcounter_Handler_S3Object_A9D34CAE"
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
            $counter: ${context._lift(counter)},
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
          $Closure1._registerBindObject(counter, host, ["set"]);
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
            $counter: ${context._lift(counter)},
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
          $Closure2._registerBindObject(counter, host, ["inc"]);
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
            $counter: ${context._lift(counter)},
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
          $Closure3._registerBindObject(counter, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const init1 = this.node.root.newAbstract("@winglang/sdk.cloud.OnDeploy",this,"init1",new $Closure1(this,"$Closure1"));
    const init2 = this.node.root.newAbstract("@winglang/sdk.cloud.OnDeploy",this,"init2",new $Closure2(this,"$Closure2"),{ executeAfter: [init1] });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:counter",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "execute_after", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


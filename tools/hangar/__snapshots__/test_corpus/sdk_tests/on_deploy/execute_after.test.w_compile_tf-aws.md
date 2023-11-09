# [execute_after.test.w](../../../../../../examples/tests/sdk_tests/on_deploy/execute_after.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
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

## inflight.$Closure2-1.cjs
```cjs
"use strict";
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

## inflight.$Closure3-1.cjs
```cjs
"use strict";
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
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "data": {
    "aws_lambda_invocation": {
      "init1_Invocation_64AF0CEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Invocation",
            "uniqueId": "init1_Invocation_64AF0CEF"
          }
        },
        "depends_on": [],
        "function_name": "${aws_lambda_function.init1_Function_9744E65A.function_name}",
        "input": "{}"
      },
      "init2_Invocation_41E0F70A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Invocation",
            "uniqueId": "init2_Invocation_41E0F70A"
          }
        },
        "depends_on": [
          "aws_s3_object.init1_Function_S3Object_EFA6F99F",
          "aws_iam_role.init1_Function_IamRole_3B884CB0",
          "aws_iam_role_policy.init1_Function_IamRolePolicy_19694F39",
          "aws_iam_role_policy_attachment.init1_Function_IamRolePolicyAttachment_96AFCA54",
          "aws_cloudwatch_log_group.init1_Function_CloudwatchLogGroup_8ECB5A4E",
          "aws_lambda_function.init1_Function_9744E65A",
          "data.aws_lambda_invocation.init1_Invocation_64AF0CEF"
        ],
        "function_name": "${aws_lambda_function.init2_Function_C6177D5D.function_name}",
        "input": "{}"
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "init1_Function_CloudwatchLogGroup_8ECB5A4E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/CloudwatchLogGroup",
            "uniqueId": "init1_Function_CloudwatchLogGroup_8ECB5A4E"
          }
        },
        "name": "/aws/lambda/Function-c899c2a8",
        "retention_in_days": 30
      },
      "init2_Function_CloudwatchLogGroup_7C2853C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/CloudwatchLogGroup",
            "uniqueId": "init2_Function_CloudwatchLogGroup_7C2853C0"
          }
        },
        "name": "/aws/lambda/Function-c86c3d88",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "cloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "cloudCounter"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "init1_Function_IamRole_3B884CB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/IamRole",
            "uniqueId": "init1_Function_IamRole_3B884CB0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "init2_Function_IamRole_A05B341B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/IamRole",
            "uniqueId": "init2_Function_IamRole_A05B341B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "init1_Function_IamRolePolicy_19694F39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/IamRolePolicy",
            "uniqueId": "init1_Function_IamRolePolicy_19694F39"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.init1_Function_IamRole_3B884CB0.name}"
      },
      "init2_Function_IamRolePolicy_BC283A7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/IamRolePolicy",
            "uniqueId": "init2_Function_IamRolePolicy_BC283A7E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.init2_Function_IamRole_A05B341B.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "init1_Function_IamRolePolicyAttachment_96AFCA54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/IamRolePolicyAttachment",
            "uniqueId": "init1_Function_IamRolePolicyAttachment_96AFCA54"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.init1_Function_IamRole_3B884CB0.name}"
      },
      "init2_Function_IamRolePolicyAttachment_7FD747D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/IamRolePolicyAttachment",
            "uniqueId": "init2_Function_IamRolePolicyAttachment_7FD747D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.init2_Function_IamRole_A05B341B.name}"
      }
    },
    "aws_lambda_function": {
      "init1_Function_9744E65A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/Default",
            "uniqueId": "init1_Function_9744E65A"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Function-c899c2a8",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c899c2a8",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.init1_Function_IamRole_3B884CB0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.init1_Function_S3Object_EFA6F99F.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "init2_Function_C6177D5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/Default",
            "uniqueId": "init2_Function_C6177D5D"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Function-c86c3d88",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Function-c86c3d88",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.init2_Function_IamRole_A05B341B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.init2_Function_S3Object_8A53C74F.key}",
        "timeout": 60,
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
      "init1_Function_S3Object_EFA6F99F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init1/Function/S3Object",
            "uniqueId": "init1_Function_S3Object_EFA6F99F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "init2_Function_S3Object_8A53C74F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/init2/Function/S3Object",
            "uniqueId": "init2_Function_S3Object_8A53C74F"
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

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
            $counter: ${context._lift(counter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(counter, host, ["set"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.cjs")({
            $counter: ${context._lift(counter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerOnLiftObject(counter, host, ["inc"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.cjs")({
            $counter: ${context._lift(counter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerOnLiftObject(counter, host, ["peek"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this, "cloud.Counter");
    const init1 = this.node.root.newAbstract("@winglang/sdk.cloud.OnDeploy",this, "init1", new $Closure1(this, "$Closure1"));
    const init2 = this.node.root.newAbstract("@winglang/sdk.cloud.OnDeploy",this, "init2", new $Closure2(this, "$Closure2"), { executeAfter: [init1] });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:counter", new $Closure3(this, "$Closure3"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "execute_after.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


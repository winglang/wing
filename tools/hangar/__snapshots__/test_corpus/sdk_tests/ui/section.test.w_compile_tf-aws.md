# [section.test.w](../../../../../../examples/tests/sdk_tests/ui/section.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $__parent_this_1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $__parent_this_1.addWidget());
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## inflight.$Closure2-1.cjs
```cjs
"use strict";
module.exports = function({ $__parent_this_2 }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      return (await $__parent_this_2.countWidgets());
    }
  }
  return $Closure2;
}
//# sourceMappingURL=./inflight.$Closure2-1.cjs.map
```

## inflight.WidgetService-1.cjs
```cjs
"use strict";
module.exports = function({  }) {
  class WidgetService {
    constructor({ $this_counter, $this_data }) {
      this.$this_counter = $this_counter;
      this.$this_data = $this_data;
    }
    async addWidget() {
      const id = (await this.$this_counter.inc());
      (await this.$this_data.put(String.raw({ raw: ["widget-", ""] }, id), "my data"));
    }
    async countWidgets() {
      return String.raw({ raw: ["", ""] }, (await this.$this_data.list()).length);
    }
  }
  return WidgetService;
}
//# sourceMappingURL=./inflight.WidgetService-1.cjs.map
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
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_cloudwatch_log_group": {
      "WidgetService_uiButton_Handler_CloudwatchLogGroup_181B65EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Button/Handler/CloudwatchLogGroup",
            "uniqueId": "WidgetService_uiButton_Handler_CloudwatchLogGroup_181B65EF"
          }
        },
        "name": "/aws/lambda/Handler-c82f982f",
        "retention_in_days": 30
      },
      "WidgetService_uiField_Handler_CloudwatchLogGroup_82BCED02": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Field/Handler/CloudwatchLogGroup",
            "uniqueId": "WidgetService_uiField_Handler_CloudwatchLogGroup_82BCED02"
          }
        },
        "name": "/aws/lambda/Handler-c876ab08",
        "retention_in_days": 30
      }
    },
    "aws_dynamodb_table": {
      "WidgetService_cloudCounter_5741B0CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/cloud.Counter/Default",
            "uniqueId": "WidgetService_cloudCounter_5741B0CD"
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
        "name": "wing-counter-cloud.Counter-c8a16ecd"
      }
    },
    "aws_iam_role": {
      "WidgetService_uiButton_Handler_IamRole_6B3512D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Button/Handler/IamRole",
            "uniqueId": "WidgetService_uiButton_Handler_IamRole_6B3512D4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "WidgetService_uiField_Handler_IamRole_F0F1B44A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Field/Handler/IamRole",
            "uniqueId": "WidgetService_uiField_Handler_IamRole_F0F1B44A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "WidgetService_uiButton_Handler_IamRolePolicy_E258A8AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Button/Handler/IamRolePolicy",
            "uniqueId": "WidgetService_uiButton_Handler_IamRolePolicy_E258A8AD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.WidgetService_cloudBucket_4055DD59.arn}\",\"${aws_s3_bucket.WidgetService_cloudBucket_4055DD59.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.WidgetService_cloudCounter_5741B0CD.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.WidgetService_uiButton_Handler_IamRole_6B3512D4.name}"
      },
      "WidgetService_uiField_Handler_IamRolePolicy_5A8ECF8B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Field/Handler/IamRolePolicy",
            "uniqueId": "WidgetService_uiField_Handler_IamRolePolicy_5A8ECF8B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.WidgetService_cloudBucket_4055DD59.arn}\",\"${aws_s3_bucket.WidgetService_cloudBucket_4055DD59.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.WidgetService_uiField_Handler_IamRole_F0F1B44A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "WidgetService_uiButton_Handler_IamRolePolicyAttachment_B7C6F2E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Button/Handler/IamRolePolicyAttachment",
            "uniqueId": "WidgetService_uiButton_Handler_IamRolePolicyAttachment_B7C6F2E8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.WidgetService_uiButton_Handler_IamRole_6B3512D4.name}"
      },
      "WidgetService_uiField_Handler_IamRolePolicyAttachment_7E7212B5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Field/Handler/IamRolePolicyAttachment",
            "uniqueId": "WidgetService_uiField_Handler_IamRolePolicyAttachment_7E7212B5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.WidgetService_uiField_Handler_IamRole_F0F1B44A.name}"
      }
    },
    "aws_lambda_function": {
      "WidgetService_uiButton_Handler_B4965FCF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Button/Handler/Default",
            "uniqueId": "WidgetService_uiButton_Handler_B4965FCF"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_c70730ce": "${aws_s3_bucket.WidgetService_cloudBucket_4055DD59.bucket}",
            "DYNAMODB_TABLE_NAME_fa6d1fc4": "${aws_dynamodb_table.WidgetService_cloudCounter_5741B0CD.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c82f982f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82f982f",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.WidgetService_uiButton_Handler_IamRole_6B3512D4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.WidgetService_uiButton_Handler_S3Object_EB849EC3.key}",
        "timeout": 60,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "WidgetService_uiField_Handler_A0505032": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Field/Handler/Default",
            "uniqueId": "WidgetService_uiField_Handler_A0505032"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_c70730ce": "${aws_s3_bucket.WidgetService_cloudBucket_4055DD59.bucket}",
            "DYNAMODB_TABLE_NAME_fa6d1fc4": "${aws_dynamodb_table.WidgetService_cloudCounter_5741B0CD.name}",
            "NODE_OPTIONS": "--enable-source-maps",
            "WING_FUNCTION_NAME": "Handler-c876ab08",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c876ab08",
        "handler": "index.handler",
        "memory_size": 1024,
        "publish": true,
        "role": "${aws_iam_role.WidgetService_uiField_Handler_IamRole_F0F1B44A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.WidgetService_uiField_Handler_S3Object_86A8EAFA.key}",
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
      },
      "WidgetService_cloudBucket_4055DD59": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/cloud.Bucket/Default",
            "uniqueId": "WidgetService_cloudBucket_4055DD59"
          }
        },
        "bucket_prefix": "cloud-bucket-c801fba9-",
        "force_destroy": false
      }
    },
    "aws_s3_object": {
      "WidgetService_uiButton_Handler_S3Object_EB849EC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Button/Handler/S3Object",
            "uniqueId": "WidgetService_uiButton_Handler_S3Object_EB849EC3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "WidgetService_uiField_Handler_S3Object_86A8EAFA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/WidgetService/ui.Field/Handler/S3Object",
            "uniqueId": "WidgetService_uiField_Handler_S3Object_86A8EAFA"
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
const ui = $stdlib.ui;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class WidgetService extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.data = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
        this.counter = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType() {
            return `
              require("././inflight.$Closure1-1.cjs")({
                $__parent_this_1: ${$stdlib.core.liftObject(__parent_this_1)},
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
            return [...super._supportedOps(), "handle", "$inflight_init"];
          }
          _registerOnLift(host, ops) {
            if (ops.includes("handle")) {
              $Closure1._registerOnLiftObject(__parent_this_1, host, ["addWidget"]);
            }
            super._registerOnLift(host, ops);
          }
        }
        const button = this.node.root.new("@winglang/sdk.ui.Button", ui.Button, this, "ui.Button", "Add widget", new $Closure1(this, "$Closure1"));
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
          constructor($scope, $id, ) {
            super($scope, $id);
            (std.Node.of(this)).hidden = true;
          }
          static _toInflightType() {
            return `
              require("././inflight.$Closure2-1.cjs")({
                $__parent_this_2: ${$stdlib.core.liftObject(__parent_this_2)},
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
            return [...super._supportedOps(), "handle", "$inflight_init"];
          }
          _registerOnLift(host, ops) {
            if (ops.includes("handle")) {
              $Closure2._registerOnLiftObject(__parent_this_2, host, ["countWidgets"]);
            }
            super._registerOnLift(host, ops);
          }
        }
        const field = this.node.root.new("@winglang/sdk.ui.Field", ui.Field, this, "ui.Field", "Total widgets", new $Closure2(this, "$Closure2"), { refreshRate: (std.Duration.fromSeconds(5)) });
        const section = this.node.root.new("@winglang/sdk.ui.Section", ui.Section, this, "ui.Section", { label: "Widget helpers" });
        (section.add(button, field));
      }
      static _toInflightType() {
        return `
          require("././inflight.WidgetService-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const WidgetServiceClient = ${WidgetService._toInflightType(this)};
            const client = new WidgetServiceClient({
              $this_counter: ${$stdlib.core.liftObject(this.counter)},
              $this_data: ${$stdlib.core.liftObject(this.data)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "addWidget", "countWidgets", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          WidgetService._registerOnLiftObject(this.counter, host, []);
          WidgetService._registerOnLiftObject(this.data, host, []);
        }
        if (ops.includes("addWidget")) {
          WidgetService._registerOnLiftObject(this.counter, host, ["inc"]);
          WidgetService._registerOnLiftObject(this.data, host, ["put"]);
        }
        if (ops.includes("countWidgets")) {
          WidgetService._registerOnLiftObject(this.data, host, ["list"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    new WidgetService(this, "WidgetService");
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "section.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


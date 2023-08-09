# [on_message.w](../../../../../../examples/tests/sdk_tests/topic/on_message.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $c }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c.inc());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $predicate, $std_Duration, $t, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,5,false)) {
        (await $t.publish("msg"));
      }
      let i = 0;
      while ((i < 600)) {
        i = (i + 1);
        if ((await $predicate.test())) {
          {((cond) => {if (!cond) throw new Error("assertion failed: predicate.test()")})((await $predicate.test()))};
          return;
        }
        (await $util_Util.sleep((await $std_Duration.fromSeconds(1))));
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: predicate.test()")})((await $predicate.test()))};
    }
  }
  return $Closure3;
}

```

## inflight.Predicate.js
```js
module.exports = function({  }) {
  class Predicate {
    constructor({ $this_c }) {
      this.$this_c = $this_c;
    }
    async test() {
      return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_c.peek()),10));
    }
  }
  return Predicate;
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
      "value": "[[\"root/undefined/Default/test:onMessage\",\"${aws_lambda_function.undefined_testonMessage_Handler_67B7987E.arn}\"]]"
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
      "undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/IamRole",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudTopic-OnMessage-b378226f_IamRole_D4B31B9B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-b378226f/IamRole",
            "uniqueId": "undefined_cloudTopic-OnMessage-b378226f_IamRole_D4B31B9B"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testonMessage_Handler_IamRole_56F78167": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:onMessage/Handler/IamRole",
            "uniqueId": "undefined_testonMessage_Handler_IamRole_56F78167"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicy_2FBA1C31": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicy_2FBA1C31"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4.name}"
      },
      "undefined_cloudTopic-OnMessage-b378226f_IamRolePolicy_DCF5619F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-b378226f/IamRolePolicy",
            "uniqueId": "undefined_cloudTopic-OnMessage-b378226f_IamRolePolicy_DCF5619F"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-b378226f_IamRole_D4B31B9B.name}"
      },
      "undefined_testonMessage_Handler_IamRolePolicy_A5C2B309": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:onMessage/Handler/IamRolePolicy",
            "uniqueId": "undefined_testonMessage_Handler_IamRolePolicy_A5C2B309"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testonMessage_Handler_IamRole_56F78167.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicyAttachment_FFF98ED7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_IamRolePolicyAttachment_FFF98ED7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4.name}"
      },
      "undefined_cloudTopic-OnMessage-b378226f_IamRolePolicyAttachment_83D4040B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-b378226f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudTopic-OnMessage-b378226f_IamRolePolicyAttachment_83D4040B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-b378226f_IamRole_D4B31B9B.name}"
      },
      "undefined_testonMessage_Handler_IamRolePolicyAttachment_F5DC0CA7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:onMessage/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testonMessage_Handler_IamRolePolicyAttachment_F5DC0CA7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testonMessage_Handler_IamRole_56F78167.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudTopic-OnMessage-83b2983f_FD502E3A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/Default",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_FD502E3A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-83b2983f-c8d1bea0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-83b2983f-c8d1bea0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-83b2983f_IamRole_3F286DA4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudTopic-OnMessage-83b2983f_S3Object_E9FDE9DA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudTopic-OnMessage-b378226f_1C57A02F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-b378226f/Default",
            "uniqueId": "undefined_cloudTopic-OnMessage-b378226f_1C57A02F"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-b378226f-c865f4a9",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-b378226f-c865f4a9",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudTopic-OnMessage-b378226f_IamRole_D4B31B9B.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudTopic-OnMessage-b378226f_S3Object_4F58E0A3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testonMessage_Handler_67B7987E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:onMessage/Handler/Default",
            "uniqueId": "undefined_testonMessage_Handler_67B7987E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "TOPIC_ARN_ac12d635": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}",
            "WING_FUNCTION_NAME": "Handler-c8990ef7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8990ef7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testonMessage_Handler_IamRole_56F78167.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testonMessage_Handler_S3Object_CB2EF551.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_cloudTopic-OnMessage-83b2983f_InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635_B77BC1F0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635_B77BC1F0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudTopic-OnMessage-83b2983f_FD502E3A.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}"
      },
      "undefined_cloudTopic-OnMessage-b378226f_InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635_8F02C155": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-b378226f/InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635",
            "uniqueId": "undefined_cloudTopic-OnMessage-b378226f_InvokePermission-c8704b0beccd6200f26cd162c2589d941aac12d635_8F02C155"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_cloudTopic-OnMessage-b378226f_1C57A02F.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}"
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
      "undefined_cloudTopic-OnMessage-83b2983f_S3Object_E9FDE9DA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-83b2983f/S3Object",
            "uniqueId": "undefined_cloudTopic-OnMessage-83b2983f_S3Object_E9FDE9DA"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudTopic-OnMessage-b378226f_S3Object_4F58E0A3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic-OnMessage-b378226f/S3Object",
            "uniqueId": "undefined_cloudTopic-OnMessage-b378226f_S3Object_4F58E0A3"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testonMessage_Handler_S3Object_CB2EF551": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:onMessage/Handler/S3Object",
            "uniqueId": "undefined_testonMessage_Handler_S3Object_CB2EF551"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "undefined_cloudTopic_DAC7C38E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic/Default",
            "uniqueId": "undefined_cloudTopic_DAC7C38E"
          }
        },
        "name": "cloud-Topic-c8704b0b"
      }
    },
    "aws_sns_topic_subscription": {
      "undefined_cloudTopic_cloudTopic-TopicSubscription-83b2983f_1436557A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic/cloud.Topic-TopicSubscription-83b2983f",
            "uniqueId": "undefined_cloudTopic_cloudTopic-TopicSubscription-83b2983f_1436557A"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudTopic-OnMessage-83b2983f_FD502E3A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}"
      },
      "undefined_cloudTopic_cloudTopic-TopicSubscription-b378226f_52856F78": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Topic/cloud.Topic-TopicSubscription-b378226f",
            "uniqueId": "undefined_cloudTopic_cloudTopic-TopicSubscription-b378226f_52856F78"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_cloudTopic-OnMessage-b378226f_1C57A02F.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_cloudTopic_DAC7C38E.arn}"
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Predicate extends $stdlib.std.Resource {
      constructor(scope, id, c) {
        super(scope, id);
        this._addInflightOps("test", "$inflight_init");
        this.c = c;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Predicate.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const PredicateClient = ${Predicate._toInflightType(this).text};
            const client = new PredicateClient({
              $this_c: ${this._lift(this.c)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Predicate._registerBindObject(this.c, host, []);
        }
        if (ops.includes("test")) {
          Predicate._registerBindObject(this.c, host, ["peek"]);
        }
        super._registerBind(host, ops);
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
            $c: ${context._lift(c)},
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
          $Closure1._registerBindObject(c, host, ["inc"]);
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
            $c: ${context._lift(c)},
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
          $Closure2._registerBindObject(c, host, ["inc"]);
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
            $predicate: ${context._lift(predicate)},
            $std_Duration: ${context._lift(std.Duration)},
            $t: ${context._lift(t)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure3._registerBindObject(predicate, host, ["test"]);
          $Closure3._registerBindObject(t, host, ["publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    const t = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (t.onMessage(new $Closure1(this,"$Closure1")));
    (t.onMessage(new $Closure2(this,"$Closure2")));
    const predicate = new Predicate(this,"Predicate",c);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:onMessage",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "on_message", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


# [set_consumer.w](../../../../../../examples/tests/sdk_tests/queue/set_consumer.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(msg) {
      (await $c.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $predicate, $q, $std_Duration, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $q.push("hello"));
      (await $q.push("world"));
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
  return $Closure2;
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
      return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_c.peek()),2));
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
      "value": "[[\"root/undefined/Default/test:setConsumer\",\"${aws_lambda_function.undefined_testsetConsumer_Handler_491C0B0E.arn}\"]]"
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
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRole",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testsetConsumer_Handler_IamRole_C4013CD2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setConsumer/Handler/IamRole",
            "uniqueId": "undefined_testsetConsumer_Handler_IamRole_C4013CD2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicy_F90973A3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicy_F90973A3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.name}"
      },
      "undefined_testsetConsumer_Handler_IamRolePolicy_902BA06D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setConsumer/Handler/IamRolePolicy",
            "uniqueId": "undefined_testsetConsumer_Handler_IamRolePolicy_902BA06D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testsetConsumer_Handler_IamRole_C4013CD2.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicyAttachment_ED335108": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicyAttachment_ED335108"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.name}"
      },
      "undefined_testsetConsumer_Handler_IamRolePolicyAttachment_33151824": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setConsumer/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testsetConsumer_Handler_IamRolePolicyAttachment_33151824"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testsetConsumer_Handler_IamRole_C4013CD2.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "undefined_cloudQueue_EventSourceMapping_6330B504": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "undefined_cloudQueue_EventSourceMapping_6330B504"
          }
        },
        "batch_size": 1,
        "event_source_arn": "${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}",
        "function_name": "${aws_lambda_function.undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B.function_name}"
      }
    },
    "aws_lambda_function": {
      "undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/Default",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "cloud-Queue-SetConsumer-83b2983f-c829c27f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-SetConsumer-83b2983f-c829c27f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudQueue-SetConsumer-83b2983f_S3Object_231F4D38.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testsetConsumer_Handler_491C0B0E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setConsumer/Handler/Default",
            "uniqueId": "undefined_testsetConsumer_Handler_491C0B0E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "QUEUE_URL_47c1312d": "${aws_sqs_queue.undefined_cloudQueue_98A56968.url}",
            "WING_FUNCTION_NAME": "Handler-c8dbaa08",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8dbaa08",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testsetConsumer_Handler_IamRole_C4013CD2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testsetConsumer_Handler_S3Object_9AE74050.key}",
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
      "undefined_cloudQueue-SetConsumer-83b2983f_S3Object_231F4D38": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/S3Object",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_S3Object_231F4D38"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testsetConsumer_Handler_S3Object_9AE74050": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setConsumer/Handler/S3Object",
            "uniqueId": "undefined_testsetConsumer_Handler_S3Object_9AE74050"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "undefined_cloudQueue_98A56968": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue/Default",
            "uniqueId": "undefined_cloudQueue_98A56968"
          }
        },
        "name": "cloud-Queue-c873ff25"
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
            $predicate: ${context._lift(predicate)},
            $q: ${context._lift(q)},
            $std_Duration: ${context._lift(std.Duration)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure2._registerBindObject(predicate, host, ["test"]);
          $Closure2._registerBindObject(q, host, ["push"]);
        }
        super._registerBind(host, ops);
      }
    }
    const q = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    (q.setConsumer(new $Closure1(this,"$Closure1")));
    const predicate = new Predicate(this,"Predicate",c);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setConsumer",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "set_consumer", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


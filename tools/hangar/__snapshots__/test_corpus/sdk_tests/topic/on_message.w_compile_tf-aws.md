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
module.exports = function({ $TestHelper, $predicate, $t }) {
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
        (await $TestHelper.sleep(100));
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
      return ((await this.$this_c.peek()) === 10);
    }
  }
  return Predicate;
}

```

## inflight.TestHelper.js
```js
module.exports = function({  }) {
  class TestHelper {
    constructor({  }) {
    }
    static async sleep(milli) {
      return (require("<ABSOLUTE_PATH>/sleep.js")["sleep"])(milli)
    }
  }
  return TestHelper;
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
      "value": "[[\"root/Default/Default/test:onMessage\",\"${aws_lambda_function.testonMessage_Handler_1EC8F213.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
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
      "cloudTopic-OnMessage-86898773_IamRole_DFD96A7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/IamRole",
            "uniqueId": "cloudTopic-OnMessage-86898773_IamRole_DFD96A7E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRole",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testonMessage_Handler_IamRole_194597D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/IamRole",
            "uniqueId": "testonMessage_Handler_IamRole_194597D0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "cloudTopic-OnMessage-86898773_IamRolePolicy_28DDDC8E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-86898773_IamRolePolicy_28DDDC8E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-86898773_IamRole_DFD96A7E.name}"
      },
      "cloudTopic-OnMessage-cdafee6e_IamRolePolicy_986CF80A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicy",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_IamRolePolicy_986CF80A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A.name}"
      },
      "testonMessage_Handler_IamRolePolicy_B409EF1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/IamRolePolicy",
            "uniqueId": "testonMessage_Handler_IamRolePolicy_B409EF1A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.cloudTopic.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testonMessage_Handler_IamRole_194597D0.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "cloudTopic-OnMessage-86898773_IamRolePolicyAttachment_72F8DDD8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-86898773_IamRolePolicyAttachment_72F8DDD8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-86898773_IamRole_DFD96A7E.name}"
      },
      "cloudTopic-OnMessage-cdafee6e_IamRolePolicyAttachment_32D59DC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_IamRolePolicyAttachment_32D59DC5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A.name}"
      },
      "testonMessage_Handler_IamRolePolicyAttachment_01BECFE0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/IamRolePolicyAttachment",
            "uniqueId": "testonMessage_Handler_IamRolePolicyAttachment_01BECFE0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testonMessage_Handler_IamRole_194597D0.name}"
      }
    },
    "aws_lambda_function": {
      "cloudTopic-OnMessage-86898773": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/Default",
            "uniqueId": "cloudTopic-OnMessage-86898773"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-86898773-c82dc92d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-86898773-c82dc92d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-86898773_IamRole_DFD96A7E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-86898773_S3Object_7D6100A3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "cloudTopic-OnMessage-cdafee6e": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/Default",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.cloudTopic-OnMessage-cdafee6e_IamRole_54B0303A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.cloudTopic-OnMessage-cdafee6e_S3Object_59ED9245.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testonMessage_Handler_1EC8F213": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/Default",
            "uniqueId": "testonMessage_Handler_1EC8F213"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "TOPIC_ARN_f61df91b": "${aws_sns_topic.cloudTopic.arn}",
            "WING_FUNCTION_NAME": "Handler-c8e9f8cd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e9f8cd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testonMessage_Handler_IamRole_194597D0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testonMessage_Handler_S3Object_0253F81F.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "cloudTopic-OnMessage-86898773_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_8E6FF007": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-86898773_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_8E6FF007"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-86898773.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic-OnMessage-cdafee6e_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D167648C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b_D167648C"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.cloudTopic-OnMessage-cdafee6e.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.cloudTopic.arn}"
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
      "cloudTopic-OnMessage-86898773_S3Object_7D6100A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/S3Object",
            "uniqueId": "cloudTopic-OnMessage-86898773_S3Object_7D6100A3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "cloudTopic-OnMessage-cdafee6e_S3Object_59ED9245": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/S3Object",
            "uniqueId": "cloudTopic-OnMessage-cdafee6e_S3Object_59ED9245"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testonMessage_Handler_S3Object_0253F81F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/S3Object",
            "uniqueId": "testonMessage_Handler_S3Object_0253F81F"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "cloudTopic": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/Default",
            "uniqueId": "cloudTopic"
          }
        },
        "name": "cloud-Topic-c82b57aa"
      }
    },
    "aws_sns_topic_subscription": {
      "cloudTopic_cloudTopic-TopicSubscription-86898773_6DC96C29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-86898773",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-86898773_6DC96C29"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-86898773.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
      },
      "cloudTopic_cloudTopic-TopicSubscription-cdafee6e_A58E0350": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-cdafee6e",
            "uniqueId": "cloudTopic_cloudTopic-TopicSubscription-cdafee6e_A58E0350"
          }
        },
        "endpoint": "${aws_lambda_function.cloudTopic-OnMessage-cdafee6e.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.cloudTopic.arn}"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Predicate extends $stdlib.std.Resource {
      constructor(scope, id, c) {
        super(scope, id);
        this.c = c;
        this._addInflightOps("test", "$inflight_init");
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
    class TestHelper extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("sleep", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.TestHelper.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const TestHelperClient = ${TestHelper._toInflightType(this).text};
            const client = new TestHelperClient({
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            $TestHelper: ${context._lift(TestHelper)},
            $predicate: ${context._lift(predicate)},
            $t: ${context._lift(t)},
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
          $Closure3._registerBindObject(TestHelper, host, ["sleep"]);
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
    const js = new TestHelper(this,"TestHelper");
    const predicate = new Predicate(this,"Predicate",c);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:onMessage",new $Closure3(this,"$Closure3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "on_message", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


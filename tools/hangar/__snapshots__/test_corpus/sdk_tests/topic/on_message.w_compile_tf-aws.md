# [on_message.w](../../../../../../examples/tests/sdk_tests/topic/on_message.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await c.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ c }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await c.inc());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ t, predicate, TestHelper }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,5,false)) {
        (await t.publish("msg"));
      }
      let i = 0;
      while ((i < 600)) {
        i = (i + 1);
        if ((await predicate.test())) {
          {((cond) => {if (!cond) throw new Error(`assertion failed: '(await predicate.test())'`)})((await predicate.test()))};
          return;
        }
        (await TestHelper.sleep(100));
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await predicate.test())'`)})((await predicate.test()))};
    }
  }
  return $Closure3;
}

```

## inflight.Predicate.js
```js
module.exports = function({  }) {
  class Predicate {
    constructor({ c }) {
      this.c = c;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async test()  {
      const __parent_this = this;
      return ((await this.c.peek()) === 10);
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
    async $inflight_init()  {
      const __parent_this = this;
    }
    static async sleep(milli)  {
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
      "value": "[[\"root/Default/Default/test:onMessage\",\"${aws_lambda_function.root_testonMessage_Handler_547E76E3.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
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
      "root_cloudTopicOnMessage86898773_IamRole_19074818": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/IamRole",
            "uniqueId": "root_cloudTopicOnMessage86898773_IamRole_19074818"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRole",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testonMessage_Handler_IamRole_9DA82976": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/IamRole",
            "uniqueId": "root_testonMessage_Handler_IamRole_9DA82976"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudTopicOnMessage86898773_IamRolePolicy_64F83BDD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/IamRolePolicy",
            "uniqueId": "root_cloudTopicOnMessage86898773_IamRolePolicy_64F83BDD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudTopicOnMessage86898773_IamRole_19074818.name}"
      },
      "root_cloudTopicOnMessagecdafee6e_IamRolePolicy_CA04DBA9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicy",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_IamRolePolicy_CA04DBA9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB.name}"
      },
      "root_testonMessage_Handler_IamRolePolicy_F81E9097": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/IamRolePolicy",
            "uniqueId": "root_testonMessage_Handler_IamRolePolicy_F81E9097"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_cloudTopic_6057BD0C.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testonMessage_Handler_IamRole_9DA82976.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_cloudTopicOnMessage86898773_IamRolePolicyAttachment_FE0E371D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/IamRolePolicyAttachment",
            "uniqueId": "root_cloudTopicOnMessage86898773_IamRolePolicyAttachment_FE0E371D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudTopicOnMessage86898773_IamRole_19074818.name}"
      },
      "root_cloudTopicOnMessagecdafee6e_IamRolePolicyAttachment_1F650C7D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/IamRolePolicyAttachment",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_IamRolePolicyAttachment_1F650C7D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB.name}"
      },
      "root_testonMessage_Handler_IamRolePolicyAttachment_C53622D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testonMessage_Handler_IamRolePolicyAttachment_C53622D7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testonMessage_Handler_IamRole_9DA82976.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudTopicOnMessage86898773_9844E87A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/Default",
            "uniqueId": "root_cloudTopicOnMessage86898773_9844E87A"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-86898773-c82dc92d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-86898773-c82dc92d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudTopicOnMessage86898773_IamRole_19074818.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudTopicOnMessage86898773_S3Object_D776BD83.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudTopicOnMessagecdafee6e_370CBD55": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/Default",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_370CBD55"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-cdafee6e-c814de3f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudTopicOnMessagecdafee6e_IamRole_029E78CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudTopicOnMessagecdafee6e_S3Object_9CFEA94C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testonMessage_Handler_547E76E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/Default",
            "uniqueId": "root_testonMessage_Handler_547E76E3"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "TOPIC_ARN_f61df91b": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}",
            "WING_FUNCTION_NAME": "Handler-c8e9f8cd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8e9f8cd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testonMessage_Handler_IamRole_9DA82976.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testonMessage_Handler_S3Object_9DD4CEB7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_cloudTopicOnMessage86898773_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_6FEE6CB0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "root_cloudTopicOnMessage86898773_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_6FEE6CB0"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudTopicOnMessage86898773_9844E87A.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
      },
      "root_cloudTopicOnMessagecdafee6e_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_52D09BDF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/InvokePermission-c82b57aa3e58b626b884e8374e59ec192cf61df91b",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_InvokePermissionc82b57aa3e58b626b884e8374e59ec192cf61df91b_52D09BDF"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_cloudTopicOnMessagecdafee6e_370CBD55.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
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
      "root_cloudTopicOnMessage86898773_S3Object_D776BD83": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-86898773/S3Object",
            "uniqueId": "root_cloudTopicOnMessage86898773_S3Object_D776BD83"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudTopicOnMessagecdafee6e_S3Object_9CFEA94C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic-OnMessage-cdafee6e/S3Object",
            "uniqueId": "root_cloudTopicOnMessagecdafee6e_S3Object_9CFEA94C"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testonMessage_Handler_S3Object_9DD4CEB7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:onMessage/Handler/S3Object",
            "uniqueId": "root_testonMessage_Handler_S3Object_9DD4CEB7"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_cloudTopic_6057BD0C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/Default",
            "uniqueId": "root_cloudTopic_6057BD0C"
          }
        },
        "name": "cloud-Topic-c82b57aa"
      }
    },
    "aws_sns_topic_subscription": {
      "root_cloudTopic_cloudTopicTopicSubscription86898773_CFDA9A1F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-86898773",
            "uniqueId": "root_cloudTopic_cloudTopicTopicSubscription86898773_CFDA9A1F"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudTopicOnMessage86898773_9844E87A.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
      },
      "root_cloudTopic_cloudTopicTopicSubscriptioncdafee6e_B9CB1B70": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Topic/cloud.Topic-TopicSubscription-cdafee6e",
            "uniqueId": "root_cloudTopic_cloudTopicTopicSubscriptioncdafee6e_B9CB1B70"
          }
        },
        "endpoint": "${aws_lambda_function.root_cloudTopicOnMessagecdafee6e_370CBD55.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_cloudTopic_6057BD0C.arn}"
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
        this._addInflightOps("test");
        const __parent_this = this;
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
              c: ${this._lift(this.c, ["peek"])},
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
        this._addInflightOps("sleep");
        const __parent_this = this;
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("sleep")) {
        }
        super._registerTypeBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            c: ${context._lift(c, ["inc"])},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure2.js")({
            c: ${context._lift(c, ["inc"])},
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
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const TestHelperClient = TestHelper._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            t: ${context._lift(t, ["publish"])},
            predicate: ${context._lift(predicate, ["test"])},
            TestHelper: ${TestHelperClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(predicate, host, []);
          $Closure3._registerBindObject(t, host, []);
        }
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


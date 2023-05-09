# [resource_captures_globals.w](../../../../examples/tests/valid/resource_captures_globals.w) | compile | tf-aws

## clients/Another.inflight.js
```js
module.exports = function({ global_counter }) {
  class  Another {
    constructor({ first, my_field }) {
      this.first = first;
      this.my_field = my_field;
    }
    async $inflight_init()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await global_counter.peek()) === 0)'`)})(((await global_counter.peek()) === 0))};
      }
    }
    async my_method()  {
      {
        (await global_counter.inc());
        return (await global_counter.peek());
      }
    }
    static async my_static_method()  {
      {
        return (await global_counter.peek());
      }
    }
  }
  return Another;
}

```

## clients/First.inflight.js
```js
module.exports = function({  }) {
  class  First {
    constructor({ my_resource }) {
      this.my_resource = my_resource;
    }
  }
  return First;
}

```

## clients/MyResource.inflight.js
```js
module.exports = function({ global_bucket, global_str, global_bool, global_num, global_array_of_str, global_map_of_num, global_set_of_str, global_another }) {
  class  MyResource {
    constructor({ local_counter, local_topic }) {
      this.local_counter = local_counter;
      this.local_topic = local_topic;
    }
    async my_put()  {
      {
        (await this.local_topic.publish("hello"));
        (await global_bucket.put("key","value"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(global_str === "hello")'`)})((global_str === "hello"))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(global_bool === true)'`)})((global_bool === true))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(global_num === 42)'`)})((global_num === 42))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await global_array_of_str.at(0)) === "hello")'`)})(((await global_array_of_str.at(0)) === "hello"))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((global_map_of_num)["a"] === (-5))'`)})(((global_map_of_num)["a"] === (-5)))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(await global_set_of_str.has("a"))'`)})((await global_set_of_str.has("a")))};
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(global_another.my_field === "hello!")'`)})((global_another.my_field === "hello!"))};
        (await global_another.first.my_resource.put("key","value"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await global_another.my_method()) > 0)'`)})(((await global_another.my_method()) > 0))};
      }
    }
  }
  return MyResource;
}

```

## clients/R.inflight.js
```js
module.exports = function({ global_counter, $parent_this }) {
  class  R {
    constructor({  }) {
    }
    async handle()  {
      {
        (await global_counter.inc());
        (await $parent_this.local_counter.inc());
      }
    }
  }
  return R;
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
      "value": "[[\"root/Default/Default/test\",\"${aws_lambda_function.root_test_AAE85061.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_MyResource_cloudCounter_B6FF7B6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "root_MyResource_cloudCounter_B6FF7B6A"
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
        "name": "wing-counter-cloud.Counter-c87187fa"
      },
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
      "root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRole",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_test_IamRole_6CDC2D16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRole",
            "uniqueId": "root_test_IamRole_6CDC2D16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicy_389E9A62": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRolePolicy",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicy_389E9A62"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54.name}"
      },
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}\",\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicyAttachment_B9171011": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRolePolicyAttachment",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_IamRolePolicyAttachment_B9171011"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54.name}"
      },
      "root_test_IamRolePolicyAttachment_1102A28A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicyAttachment",
            "uniqueId": "root_test_IamRolePolicyAttachment_1102A28A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_lambda_function": {
      "root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/Default",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-f10eb240-c8df2c86"
          }
        },
        "function_name": "cloud-Topic-OnMessage-f10eb240-c8df2c86",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_MyResource_cloudTopicOnMessagef10eb240_IamRole_4BDB9A54.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_MyResource_cloudTopicOnMessagef10eb240_S3Object_7458F840.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_test_AAE85061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/Default",
            "uniqueId": "root_test_AAE85061"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_ae5b06c6": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
            "BUCKET_NAME_ae5b06c6_IS_PUBLIC": "false",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.name}",
            "TOPIC_ARN_53de52bf": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "root_MyResource_cloudTopicOnMessagef10eb240_InvokePermissionc8f2c43e88c72aa87b4192974983c81bf653de52bf_BEBFCC54": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_InvokePermissionc8f2c43e88c72aa87b4192974983c81bf653de52bf_BEBFCC54"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}"
      }
    },
    "aws_s3_bucket": {
      "root_Another_First_cloudBucket_B4A67079": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Default",
            "uniqueId": "root_Another_First_cloudBucket_B4A67079"
          }
        },
        "bucket_prefix": "cloud-bucket-c84d72a1-",
        "force_destroy": false
      },
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_Another_First_cloudBucket_PublicAccessBlock_E03A84DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_Another_First_cloudBucket_PublicAccessBlock_E03A84DE"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_Another_First_cloudBucket_Encryption_1049825A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "root_Another_First_cloudBucket_Encryption_1049825A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "root_MyResource_cloudTopicOnMessagef10eb240_S3Object_7458F840": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/S3Object",
            "uniqueId": "root_MyResource_cloudTopicOnMessagef10eb240_S3Object_7458F840"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_test_S3Object_A16CD789": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/S3Object",
            "uniqueId": "root_test_S3Object_A16CD789"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "root_MyResource_cloudTopic_F71B23B1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/Default",
            "uniqueId": "root_MyResource_cloudTopic_F71B23B1"
          }
        },
        "name": "cloud-Topic-c8f2c43e"
      }
    },
    "aws_sns_topic_subscription": {
      "root_MyResource_cloudTopic_cloudTopicTopicSubscriptionf10eb240_334AAAEE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/cloud.Topic-TopicSubscription-f10eb240",
            "uniqueId": "root_MyResource_cloudTopic_cloudTopicTopicSubscriptionf10eb240_334AAAEE"
          }
        },
        "endpoint": "${aws_lambda_function.root_MyResource_cloudTopicOnMessagef10eb240_AE4B2541.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.root_MyResource_cloudTopic_F71B23B1.arn}"
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.my_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/First.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const my_resource_client = this._lift(this.my_resource);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FirstClient = ${First._toInflightType(this).text};
            const client = new FirstClient({
              my_resource: ${my_resource_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.my_resource, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("my_method", "my_static_method");
        this.my_field = "hello!";
        this.first = new First(this,"First");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Another.inflight.js".replace(/\\/g, "/");
        const global_counter_client = context._lift(global_counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            global_counter: ${global_counter_client},
          })
        `);
      }
      _toInflight() {
        const first_client = this._lift(this.first);
        const my_field_client = this._lift(this.my_field);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
              first: ${first_client},
              my_field: ${my_field_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(global_counter, host, ["peek"]);
          this._registerBindObject(this.first, host, []);
          this._registerBindObject(this.my_field, host, []);
        }
        if (ops.includes("my_method")) {
          this._registerBindObject(global_counter, host, ["inc", "peek"]);
        }
        if (ops.includes("my_static_method")) {
          this._registerBindObject(global_counter, host, ["peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("my_put");
        this.local_topic = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        this.local_counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
        const $parent_this = this;
        class R extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "./clients/R.inflight.js".replace(/\\/g, "/");
            const global_counter_client = context._lift(global_counter);
            const $parent_this_client = context._lift($parent_this);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                global_counter: ${global_counter_client},
                $parent_this: ${$parent_this_client},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const RClient = ${R._toInflightType(this).text};
                const client = new RClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
            }
            if (ops.includes("handle")) {
              this._registerBindObject($parent_this.local_counter, host, ["inc"]);
              this._registerBindObject(global_counter, host, ["inc"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.local_topic.onMessage(new R(this,"R")));
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/MyResource.inflight.js".replace(/\\/g, "/");
        const global_bucket_client = context._lift(global_bucket);
        const global_str_client = context._lift(global_str);
        const global_bool_client = context._lift(global_bool);
        const global_num_client = context._lift(global_num);
        const global_array_of_str_client = context._lift(global_array_of_str);
        const global_map_of_num_client = context._lift(global_map_of_num);
        const global_set_of_str_client = context._lift(global_set_of_str);
        const global_another_client = context._lift(global_another);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            global_bucket: ${global_bucket_client},
            global_str: ${global_str_client},
            global_bool: ${global_bool_client},
            global_num: ${global_num_client},
            global_array_of_str: ${global_array_of_str_client},
            global_map_of_num: ${global_map_of_num_client},
            global_set_of_str: ${global_set_of_str_client},
            global_another: ${global_another_client},
          })
        `);
      }
      _toInflight() {
        const local_counter_client = this._lift(this.local_counter);
        const local_topic_client = this._lift(this.local_topic);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              local_counter: ${local_counter_client},
              local_topic: ${local_topic_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.local_counter, host, []);
          this._registerBindObject(this.local_topic, host, []);
        }
        if (ops.includes("my_put")) {
          this._registerBindObject(global_another, host, ["my_method"]);
          this._registerBindObject(global_another.first.my_resource, host, ["put"]);
          this._registerBindObject(global_another.my_field, host, []);
          this._registerBindObject(global_array_of_str, host, ["at"]);
          this._registerBindObject(global_bool, host, []);
          this._registerBindObject(global_bucket, host, ["put"]);
          this._registerBindObject(global_map_of_num, host, ["get"]);
          this._registerBindObject(global_num, host, []);
          this._registerBindObject(global_set_of_str, host, ["has"]);
          this._registerBindObject(global_str, host, []);
          this._registerBindObject(this.local_topic, host, ["publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    const global_bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const global_counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const global_str = "hello";
    const global_bool = true;
    const global_num = 42;
    const global_array_of_str = Object.freeze(["hello", "world"]);
    const global_map_of_num = Object.freeze({"a":(-5),"b":2});
    const global_set_of_str = Object.freeze(new Set(["a", "b"]));
    const global_another = new Another(this,"Another");
    const res = new MyResource(this,"MyResource");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        res: {
          obj: res,
          ops: ["my_put"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource_captures_globals", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle() {
  const { res } = this;
  (await res.my_put());
}

```


# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $res }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $res.myPut());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $Another }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Another.myStaticMethod() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $Another.myStaticMethod()),0)))};
    }
  }
  return $Closure2;
}

```

## inflight.Another-1.js
```js
module.exports = function({ $globalCounter }) {
  class Another {
    constructor({  }) {
    }
    async myMethod() {
      (await $globalCounter.inc());
      return (await $globalCounter.peek());
    }
    static async myStaticMethod() {
      return (await $globalCounter.peek());
    }
    async $inflight_init() {
      {((cond) => {if (!cond) throw new Error("assertion failed: globalCounter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $globalCounter.peek()),0)))};
    }
  }
  return Another;
}

```

## inflight.First-1.js
```js
module.exports = function({  }) {
  class First {
    constructor({  }) {
    }
  }
  return First;
}

```

## inflight.MyResource-1.js
```js
module.exports = function({ $Another, $_globalArrayOfStr_at_0__, $_globalMapOfNum___a__, $_globalSetOfStr_has__a___, $globalAnother, $globalAnother_first_myResource, $globalAnother_myField, $globalBool, $globalBucket, $globalNum, $globalStr }) {
  class MyResource {
    constructor({ $this_localTopic }) {
      this.$this_localTopic = $this_localTopic;
    }
    async myPut() {
      (await this.$this_localTopic.publish("hello"));
      (await $globalBucket.put("key","value"));
      {((cond) => {if (!cond) throw new Error("assertion failed: globalStr == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($globalStr,"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalBool == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($globalBool,true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalNum == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($globalNum,42)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalArrayOfStr.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_globalArrayOfStr_at_0__,"hello")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalMapOfNum.get(\"a\") == -5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_globalMapOfNum___a__,(-5))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalSetOfStr.has(\"a\")")})($_globalSetOfStr_has__a___)};
      {((cond) => {if (!cond) throw new Error("assertion failed: globalAnother.myField == \"hello!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($globalAnother_myField,"hello!")))};
      (await $globalAnother_first_myResource.put("key","value"));
      {((cond) => {if (!cond) throw new Error("assertion failed: globalAnother.myMethod() > 0")})(((await $globalAnother.myMethod()) > 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Another.myStaticMethod() > 0")})(((await $Another.myStaticMethod()) > 0))};
    }
  }
  return MyResource;
}

```

## inflight.R-1.js
```js
module.exports = function({ $_parentThis_localCounter, $globalCounter }) {
  class R {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $globalCounter.inc());
      (await $_parentThis_localCounter.inc());
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.testtest_Handler_295107CC.arn}\"],[\"root/Default/Default/test:access cloud resource through static methods only\",\"${aws_lambda_function.testaccesscloudresourcethroughstaticmethodsonly_Handler_BC0E7705.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "MyResource_cloudCounter_0782991D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "MyResource_cloudCounter_0782991D"
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
      "MyResource_cloudTopic-OnMessage-f10eb240_IamRole_C06EFF5D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRole",
            "uniqueId": "MyResource_cloudTopic-OnMessage-f10eb240_IamRole_C06EFF5D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_1B04D5D0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRole",
            "uniqueId": "testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_1B04D5D0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testtest_Handler_IamRole_15693C93": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "testtest_Handler_IamRole_15693C93"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "MyResource_cloudTopic-OnMessage-f10eb240_IamRolePolicy_3BEB9061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRolePolicy",
            "uniqueId": "MyResource_cloudTopic-OnMessage-f10eb240_IamRolePolicy_3BEB9061"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.MyResource_cloudCounter_0782991D.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.MyResource_cloudTopic-OnMessage-f10eb240_IamRole_C06EFF5D.name}"
      },
      "testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_A6861688": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRolePolicy",
            "uniqueId": "testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_A6861688"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_1B04D5D0.name}"
      },
      "testtest_Handler_IamRolePolicy_AF0279BD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "testtest_Handler_IamRolePolicy_AF0279BD"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.Another_First_cloudBucket_DB822B7C.arn}\",\"${aws_s3_bucket.Another_First_cloudBucket_DB822B7C.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.MyResource_cloudTopic_1F3310C3.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "MyResource_cloudTopic-OnMessage-f10eb240_IamRolePolicyAttachment_B5D99AB1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/IamRolePolicyAttachment",
            "uniqueId": "MyResource_cloudTopic-OnMessage-f10eb240_IamRolePolicyAttachment_B5D99AB1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.MyResource_cloudTopic-OnMessage-f10eb240_IamRole_C06EFF5D.name}"
      },
      "testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_842C871D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/IamRolePolicyAttachment",
            "uniqueId": "testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_842C871D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_1B04D5D0.name}"
      },
      "testtest_Handler_IamRolePolicyAttachment_ADF4752D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "testtest_Handler_IamRolePolicyAttachment_ADF4752D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.name}"
      }
    },
    "aws_lambda_function": {
      "MyResource_cloudTopic-OnMessage-f10eb240_23BCEE41": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/Default",
            "uniqueId": "MyResource_cloudTopic-OnMessage-f10eb240_23BCEE41"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.MyResource_cloudCounter_0782991D.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-f10eb240-c8df2c86",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-f10eb240-c8df2c86",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.MyResource_cloudTopic-OnMessage-f10eb240_IamRole_C06EFF5D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.MyResource_cloudTopic-OnMessage-f10eb240_S3Object_B244E1DD.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testaccesscloudresourcethroughstaticmethodsonly_Handler_BC0E7705": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/Default",
            "uniqueId": "testaccesscloudresourcethroughstaticmethodsonly_Handler_BC0E7705"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8de1ef1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8de1ef1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_1B04D5D0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_57D98226.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testtest_Handler_295107CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "testtest_Handler_295107CC"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "BUCKET_NAME_ae5b06c6": "${aws_s3_bucket.Another_First_cloudBucket_DB822B7C.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "TOPIC_ARN_53de52bf": "${aws_sns_topic.MyResource_cloudTopic_1F3310C3.arn}",
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testtest_Handler_IamRole_15693C93.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testtest_Handler_S3Object_9F4E28A7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "MyResource_cloudTopic-OnMessage-f10eb240_InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf_CFD3D6F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf",
            "uniqueId": "MyResource_cloudTopic-OnMessage-f10eb240_InvokePermission-c8f2c43e88c72aa87b4192974983c81bf653de52bf_CFD3D6F2"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.MyResource_cloudTopic-OnMessage-f10eb240_23BCEE41.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.MyResource_cloudTopic_1F3310C3.arn}"
      }
    },
    "aws_s3_bucket": {
      "Another_First_cloudBucket_DB822B7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Default",
            "uniqueId": "Another_First_cloudBucket_DB822B7C"
          }
        },
        "bucket_prefix": "cloud-bucket-c84d72a1-",
        "force_destroy": false
      },
      "Code": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "Code"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "Another_First_cloudBucket_Encryption_C22274BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "Another_First_cloudBucket_Encryption_C22274BF"
          }
        },
        "bucket": "${aws_s3_bucket.Another_First_cloudBucket_DB822B7C.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
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
      "MyResource_cloudTopic-OnMessage-f10eb240_S3Object_B244E1DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic-OnMessage-f10eb240/S3Object",
            "uniqueId": "MyResource_cloudTopic-OnMessage-f10eb240_S3Object_B244E1DD"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_57D98226": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:access cloud resource through static methods only/Handler/S3Object",
            "uniqueId": "testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_57D98226"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testtest_Handler_S3Object_9F4E28A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "testtest_Handler_S3Object_9F4E28A7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "MyResource_cloudTopic_1F3310C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/Default",
            "uniqueId": "MyResource_cloudTopic_1F3310C3"
          }
        },
        "name": "cloud-Topic-c8f2c43e"
      }
    },
    "aws_sns_topic_subscription": {
      "MyResource_cloudTopic_cloudTopic-TopicSubscription-f10eb240_5B88092E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Topic/cloud.Topic-TopicSubscription-f10eb240",
            "uniqueId": "MyResource_cloudTopic_cloudTopic-TopicSubscription-f10eb240_5B88092E"
          }
        },
        "endpoint": "${aws_lambda_function.MyResource_cloudTopic-OnMessage-f10eb240_23BCEE41.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.MyResource_cloudTopic_1F3310C3.arn}"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.First-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FirstClient = ${First._toInflightType(this)};
            const client = new FirstClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["$inflight_init"];
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.myField = "hello!";
        this.first = new First(this,"First");
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Another-1.js")({
            $globalCounter: ${context._lift(globalCounter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this)};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["myMethod", "myStaticMethod", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Another._registerBindObject(globalCounter, host, ["peek"]);
        }
        if (ops.includes("myMethod")) {
          Another._registerBindObject(globalCounter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
      static _registerTypeBind(host, ops) {
        if (ops.includes("myStaticMethod")) {
          Another._registerBindObject(globalCounter, host, ["peek"]);
        }
        super._registerTypeBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.localTopic = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        this.localCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
        const $parentThis = this;
        class R extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
          }
          static _toInflightType(context) {
            return `
              require("./inflight.R-1.js")({
                $_parentThis_localCounter: ${context._lift($parentThis.localCounter)},
                $globalCounter: ${context._lift(globalCounter)},
              })
            `;
          }
          _toInflight() {
            return `
              (await (async () => {
                const RClient = ${R._toInflightType(this)};
                const client = new RClient({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `;
          }
          _getInflightOps() {
            return ["handle", "$inflight_init"];
          }
          _registerBind(host, ops) {
            if (ops.includes("handle")) {
              R._registerBindObject($parentThis.localCounter, host, ["inc"]);
              R._registerBindObject(globalCounter, host, ["inc"]);
            }
            super._registerBind(host, ops);
          }
        }
        (this.localTopic.onMessage(new R(this,"R")));
      }
      static _toInflightType(context) {
        return `
          require("./inflight.MyResource-1.js")({
            $Another: ${context._lift(Another)},
            $_globalArrayOfStr_at_0__: ${context._lift((globalArrayOfStr.at(0)))},
            $_globalMapOfNum___a__: ${context._lift((globalMapOfNum)["a"])},
            $_globalSetOfStr_has__a___: ${context._lift((globalSetOfStr.has("a")))},
            $globalAnother: ${context._lift(globalAnother)},
            $globalAnother_first_myResource: ${context._lift(globalAnother.first.myResource)},
            $globalAnother_myField: ${context._lift(globalAnother.myField)},
            $globalBool: ${context._lift(globalBool)},
            $globalBucket: ${context._lift(globalBucket)},
            $globalNum: ${context._lift(globalNum)},
            $globalStr: ${context._lift(globalStr)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this)};
            const client = new MyResourceClient({
              $this_localTopic: ${this._lift(this.localTopic)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["myPut", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.localTopic, host, []);
        }
        if (ops.includes("myPut")) {
          MyResource._registerBindObject((globalArrayOfStr.at(0)), host, []);
          MyResource._registerBindObject((globalMapOfNum)["a"], host, []);
          MyResource._registerBindObject((globalSetOfStr.has("a")), host, []);
          MyResource._registerBindObject(Another, host, ["myStaticMethod"]);
          MyResource._registerBindObject(globalAnother, host, ["myMethod"]);
          MyResource._registerBindObject(globalAnother.first.myResource, host, ["put"]);
          MyResource._registerBindObject(globalAnother.myField, host, []);
          MyResource._registerBindObject(globalBool, host, []);
          MyResource._registerBindObject(globalBucket, host, ["put"]);
          MyResource._registerBindObject(globalNum, host, []);
          MyResource._registerBindObject(globalStr, host, []);
          MyResource._registerBindObject(this.localTopic, host, ["publish"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $res: ${context._lift(res)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(res, host, ["myPut"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $Another: ${context._lift(Another)},
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(Another, host, ["myStaticMethod"]);
        }
        super._registerBind(host, ops);
      }
    }
    const globalBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const globalCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const globalStr = "hello";
    const globalBool = true;
    const globalNum = 42;
    const globalArrayOfStr = ["hello", "world"];
    const globalMapOfNum = ({"a": (-5),"b": 2});
    const globalSetOfStr = new Set(["a", "b"]);
    const globalAnother = new Another(this,"Another");
    const res = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:access cloud resource through static methods only",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "resource_captures_globals", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


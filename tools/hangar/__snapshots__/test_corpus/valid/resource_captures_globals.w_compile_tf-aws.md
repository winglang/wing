# [resource_captures_globals.w](../../../../../examples/tests/valid/resource_captures_globals.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
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

## inflight.Another.js
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

## inflight.First.js
```js
module.exports = function({  }) {
  class First {
    constructor({  }) {
    }
  }
  return First;
}

```

## inflight.MyResource.js
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

## inflight.R.js
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
      "value": "[[\"root/undefined/Default/test:test\",\"${aws_lambda_function.undefined_testtest_Handler_A295E574.arn}\"],[\"root/undefined/Default/test:access cloud resource through static methods only\",\"${aws_lambda_function.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_9962AA1B.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_MyResource_cloudCounter_6CFC5035": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "undefined_MyResource_cloudCounter_6CFC5035"
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
        "name": "wing-counter-cloud.Counter-c89c4847"
      },
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
      "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRole_A4696925": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic-OnMessage-afaa9b88/IamRole",
            "uniqueId": "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRole_A4696925"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/IamRole",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testtest_Handler_IamRole_50D3D3C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRole",
            "uniqueId": "undefined_testtest_Handler_IamRole_50D3D3C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRolePolicy_0D80168A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic-OnMessage-afaa9b88/IamRolePolicy",
            "uniqueId": "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRolePolicy_0D80168A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_MyResource_cloudCounter_6CFC5035.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRole_A4696925.name}"
      },
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_D454F747": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/IamRolePolicy",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicy_D454F747"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC.name}"
      },
      "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_Another_First_cloudBucket_DB029981.arn}\",\"${aws_s3_bucket.undefined_Another_First_cloudBucket_DB029981.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sns:Publish\"],\"Resource\":[\"${aws_sns_topic.undefined_MyResource_cloudTopic_D316B0DE.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRolePolicyAttachment_376A2BD3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic-OnMessage-afaa9b88/IamRolePolicyAttachment",
            "uniqueId": "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRolePolicyAttachment_376A2BD3"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRole_A4696925.name}"
      },
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B4C3C44B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRolePolicyAttachment_B4C3C44B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC.name}"
      },
      "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_90E2209D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic-OnMessage-afaa9b88/Default",
            "uniqueId": "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_90E2209D"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "DYNAMODB_TABLE_NAME_ba091a3a": "${aws_dynamodb_table.undefined_MyResource_cloudCounter_6CFC5035.name}",
            "WING_FUNCTION_NAME": "cloud-Topic-OnMessage-afaa9b88-c8d412f6",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Topic-OnMessage-afaa9b88-c8d412f6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_MyResource_cloudTopic-OnMessage-afaa9b88_IamRole_A4696925.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_MyResource_cloudTopic-OnMessage-afaa9b88_S3Object_C975C3DF.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_9962AA1B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/Default",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_9962AA1B"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8879a05",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8879a05",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_IamRole_7F3F0BFC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_D05B9F96.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testtest_Handler_A295E574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/Default",
            "uniqueId": "undefined_testtest_Handler_A295E574"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "BUCKET_NAME_95724e19": "${aws_s3_bucket.undefined_Another_First_cloudBucket_DB029981.bucket}",
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "TOPIC_ARN_a81993ae": "${aws_sns_topic.undefined_MyResource_cloudTopic_D316B0DE.arn}",
            "WING_FUNCTION_NAME": "Handler-c831cefb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c831cefb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtest_Handler_S3Object_96D88A6C.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_lambda_permission": {
      "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_InvokePermission-c8baf1cd4493bde95f385636a64886f278a81993ae_56AAB5CD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic-OnMessage-afaa9b88/InvokePermission-c8baf1cd4493bde95f385636a64886f278a81993ae",
            "uniqueId": "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_InvokePermission-c8baf1cd4493bde95f385636a64886f278a81993ae_56AAB5CD"
          }
        },
        "action": "lambda:InvokeFunction",
        "function_name": "${aws_lambda_function.undefined_MyResource_cloudTopic-OnMessage-afaa9b88_90E2209D.function_name}",
        "principal": "sns.amazonaws.com",
        "source_arn": "${aws_sns_topic.undefined_MyResource_cloudTopic_D316B0DE.arn}"
      }
    },
    "aws_s3_bucket": {
      "undefined_Another_First_cloudBucket_DB029981": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Another/First/cloud.Bucket/Default",
            "uniqueId": "undefined_Another_First_cloudBucket_DB029981"
          }
        },
        "bucket_prefix": "cloud-bucket-c84e57a3-",
        "force_destroy": false
      },
      "undefined_Code_6226BB4A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Code",
            "uniqueId": "undefined_Code_6226BB4A"
          }
        },
        "bucket_prefix": "code-c818e3de-"
      },
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_Another_First_cloudBucket_PublicAccessBlock_D4ED3258": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Another/First/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_Another_First_cloudBucket_PublicAccessBlock_D4ED3258"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_Another_First_cloudBucket_DB029981.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_Another_First_cloudBucket_Encryption_E1C1EEB4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "undefined_Another_First_cloudBucket_Encryption_E1C1EEB4"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Another_First_cloudBucket_DB029981.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_S3Object_C975C3DF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic-OnMessage-afaa9b88/S3Object",
            "uniqueId": "undefined_MyResource_cloudTopic-OnMessage-afaa9b88_S3Object_C975C3DF"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_D05B9F96": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:access cloud resource through static methods only/Handler/S3Object",
            "uniqueId": "undefined_testaccesscloudresourcethroughstaticmethodsonly_Handler_S3Object_D05B9F96"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testtest_Handler_S3Object_96D88A6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/S3Object",
            "uniqueId": "undefined_testtest_Handler_S3Object_96D88A6C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sns_topic": {
      "undefined_MyResource_cloudTopic_D316B0DE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic/Default",
            "uniqueId": "undefined_MyResource_cloudTopic_D316B0DE"
          }
        },
        "name": "cloud-Topic-c8baf1cd"
      }
    },
    "aws_sns_topic_subscription": {
      "undefined_MyResource_cloudTopic_cloudTopic-TopicSubscription-afaa9b88_CCAFAA0B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Topic/cloud.Topic-TopicSubscription-afaa9b88",
            "uniqueId": "undefined_MyResource_cloudTopic_cloudTopic-TopicSubscription-afaa9b88_CCAFAA0B"
          }
        },
        "endpoint": "${aws_lambda_function.undefined_MyResource_cloudTopic-OnMessage-afaa9b88_90E2209D.arn}",
        "protocol": "lambda",
        "topic_arn": "${aws_sns_topic.undefined_MyResource_cloudTopic_D316B0DE.arn}"
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
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.First.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FirstClient = ${First._toInflightType(this).text};
            const client = new FirstClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("myMethod", "myStaticMethod", "$inflight_init");
        this.myField = "hello!";
        this.first = new First(this,"First");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Another.js")({
            $globalCounter: ${context._lift(globalCounter)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
        this._addInflightOps("myPut", "$inflight_init");
        this.localTopic = this.node.root.newAbstract("@winglang/sdk.cloud.Topic",this,"cloud.Topic");
        this.localCounter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
        const $parentThis = this;
        class R extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.R.js")({
                $_parentThis_localCounter: ${context._lift($parentThis.localCounter)},
                $globalCounter: ${context._lift(globalCounter)},
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
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyResource.js")({
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
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              $this_localTopic: ${this._lift(this.localTopic)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.localTopic, host, []);
        }
        if (ops.includes("myPut")) {
          MyResource._registerBindObject(Another, host, ["myStaticMethod"]);
          MyResource._registerBindObject((globalArrayOfStr.at(0)), host, []);
          MyResource._registerBindObject((globalMapOfNum)["a"], host, []);
          MyResource._registerBindObject((globalSetOfStr.has("a")), host, []);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $res: ${context._lift(res)},
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
          $Closure1._registerBindObject(res, host, ["myPut"]);
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
            $Another: ${context._lift(Another)},
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


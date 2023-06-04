# [captures.w](../../../../examples/tests/valid/captures.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ bucket1, bucket2, bucket3 }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(event)  {
      (await bucket1.put("file.txt","data"));
      (await bucket2.get("file.txt"));
      (await bucket2.get("file2.txt"));
      (await bucket3.get("file3.txt"));
      for (const stuff of (await bucket1.list())) {
        {console.log(stuff)};
      }
      {console.log((await bucket2.publicUrl("file.txt")))};
      try {
        (await bucket1.publicUrl("file.txt"));
      }
      catch ($error_error) {
        const error = $error_error.message;
        {console.log(error)};
      }
    }
  }
  return $Inflight1;
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
      "value": "[]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_AnotherFunction_IamRole_09A4D8EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/IamRole",
            "uniqueId": "root_AnotherFunction_IamRole_09A4D8EF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudFunction_IamRole_DAEC3578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "root_cloudFunction_IamRole_DAEC3578"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRole",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_AnotherFunction_IamRolePolicy_5B37F663": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/IamRolePolicy",
            "uniqueId": "root_AnotherFunction_IamRolePolicy_5B37F663"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}\",\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_PrivateBucket_82B4DCC5.arn}\",\"${aws_s3_bucket.root_PrivateBucket_82B4DCC5.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_AnotherFunction_IamRole_09A4D8EF.name}"
      },
      "root_cloudFunction_IamRolePolicy_AAE6C0C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "root_cloudFunction_IamRolePolicy_AAE6C0C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}\",\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_PrivateBucket_82B4DCC5.arn}\",\"${aws_s3_bucket.root_PrivateBucket_82B4DCC5.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_cloudQueueAddConsumere46e5cb7_IamRolePolicy_756548A7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRolePolicy",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRolePolicy_756548A7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}\",\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_PrivateBucket_82B4DCC5.arn}\",\"${aws_s3_bucket.root_PrivateBucket_82B4DCC5.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_AnotherFunction_IamRolePolicyAttachment_8AF040CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/IamRolePolicyAttachment",
            "uniqueId": "root_AnotherFunction_IamRolePolicyAttachment_8AF040CB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_AnotherFunction_IamRole_09A4D8EF.name}"
      },
      "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "root_cloudFunction_IamRolePolicyAttachment_FC3D9E7C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_cloudQueueAddConsumere46e5cb7_IamRolePolicyAttachment_3625F5B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/IamRolePolicyAttachment",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_IamRolePolicyAttachment_3625F5B7"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.name}"
      }
    },
    "aws_lambda_event_source_mapping": {
      "root_cloudQueue_EventSourceMapping_A2041279": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/EventSourceMapping",
            "uniqueId": "root_cloudQueue_EventSourceMapping_A2041279"
          }
        },
        "batch_size": 5,
        "event_source_arn": "${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}",
        "function_name": "${aws_lambda_function.root_cloudQueueAddConsumere46e5cb7_83E71EC8.function_name}"
      }
    },
    "aws_lambda_function": {
      "root_AnotherFunction_1D5A4455": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/Default",
            "uniqueId": "root_AnotherFunction_1D5A4455"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_0c557d45": "${aws_s3_bucket.root_PrivateBucket_82B4DCC5.bucket}",
            "BUCKET_NAME_0c557d45_IS_PUBLIC": "false",
            "BUCKET_NAME_21bd2572": "${aws_s3_bucket.root_PublicBucket_73AE6C59.bucket}",
            "BUCKET_NAME_21bd2572_IS_PUBLIC": "true",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "AnotherFunction-c88d2a81",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "AnotherFunction-c88d2a81",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_AnotherFunction_IamRole_09A4D8EF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_AnotherFunction_S3Object_5AD7E879.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudFunction_6A57BA0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "root_cloudFunction_6A57BA0A"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_0c557d45": "${aws_s3_bucket.root_PrivateBucket_82B4DCC5.bucket}",
            "BUCKET_NAME_0c557d45_IS_PUBLIC": "false",
            "BUCKET_NAME_21bd2572": "${aws_s3_bucket.root_PublicBucket_73AE6C59.bucket}",
            "BUCKET_NAME_21bd2572_IS_PUBLIC": "true",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudFunction_S3Object_C8435368.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_cloudQueueAddConsumere46e5cb7_83E71EC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/Default",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_83E71EC8"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_0c557d45": "${aws_s3_bucket.root_PrivateBucket_82B4DCC5.bucket}",
            "BUCKET_NAME_0c557d45_IS_PUBLIC": "false",
            "BUCKET_NAME_21bd2572": "${aws_s3_bucket.root_PublicBucket_73AE6C59.bucket}",
            "BUCKET_NAME_21bd2572_IS_PUBLIC": "true",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "cloud-Queue-AddConsumer-e46e5cb7-c85740a2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Queue-AddConsumer-e46e5cb7-c85740a2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudQueueAddConsumere46e5cb7_IamRole_AE43C8FE.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
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
      },
      "root_PrivateBucket_82B4DCC5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PrivateBucket/Default",
            "uniqueId": "root_PrivateBucket_82B4DCC5"
          }
        },
        "bucket_prefix": "privatebucket-c8a9b08c-",
        "force_destroy": false
      },
      "root_PublicBucket_73AE6C59": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/Default",
            "uniqueId": "root_PublicBucket_73AE6C59"
          }
        },
        "bucket_prefix": "publicbucket-c8fea5d9-",
        "force_destroy": false
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
    "aws_s3_bucket_policy": {
      "root_PublicBucket_PublicPolicy_98DDAE96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/PublicPolicy",
            "uniqueId": "root_PublicBucket_PublicPolicy_98DDAE96"
          }
        },
        "bucket": "${aws_s3_bucket.root_PublicBucket_73AE6C59.bucket}",
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.root_PublicBucket_73AE6C59.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_PrivateBucket_PublicAccessBlock_DB813250": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PrivateBucket/PublicAccessBlock",
            "uniqueId": "root_PrivateBucket_PublicAccessBlock_DB813250"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_PrivateBucket_82B4DCC5.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_PublicBucket_PublicAccessBlock_A244D6BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/PublicAccessBlock",
            "uniqueId": "root_PublicBucket_PublicAccessBlock_A244D6BC"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.root_PublicBucket_73AE6C59.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
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
      "root_PrivateBucket_Encryption_F9F2144A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PrivateBucket/Encryption",
            "uniqueId": "root_PrivateBucket_Encryption_F9F2144A"
          }
        },
        "bucket": "${aws_s3_bucket.root_PrivateBucket_82B4DCC5.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_PublicBucket_Encryption_FB9A8400": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/PublicBucket/Encryption",
            "uniqueId": "root_PublicBucket_Encryption_FB9A8400"
          }
        },
        "bucket": "${aws_s3_bucket.root_PublicBucket_73AE6C59.bucket}",
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
      "root_AnotherFunction_S3Object_5AD7E879": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/AnotherFunction/S3Object",
            "uniqueId": "root_AnotherFunction_S3Object_5AD7E879"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudFunction_S3Object_C8435368": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/S3Object",
            "uniqueId": "root_cloudFunction_S3Object_C8435368"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue-AddConsumer-e46e5cb7/S3Object",
            "uniqueId": "root_cloudQueueAddConsumere46e5cb7_S3Object_343EB2E4"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "root_cloudQueue_E3597F7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "root_cloudQueue_E3597F7A"
          }
        },
        "name": "cloud-Queue-c86e03d8"
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
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const bucket1_client = context._lift(bucket1);
        const bucket2_client = context._lift(bucket2);
        const bucket3_client = context._lift(bucket3);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            bucket1: ${bucket1_client},
            bucket2: ${bucket2_client},
            bucket3: ${bucket3_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
            const client = new $Inflight1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight1._registerBindObject(bucket1, host, []);
          $Inflight1._registerBindObject(bucket2, host, []);
          $Inflight1._registerBindObject(bucket3, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(bucket1, host, ["list", "publicUrl", "put"]);
          $Inflight1._registerBindObject(bucket2, host, ["get", "publicUrl"]);
          $Inflight1._registerBindObject(bucket3, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PublicBucket",{
    "public": true,}
    );
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PrivateBucket",{ public: false });
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $Inflight1(this,"$Inflight1");
    (queue.addConsumer(handler,{ batchSize: 5 }));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",handler,{ env: Object.freeze({}) });
    const emptyEnv = Object.freeze({});
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"AnotherFunction",handler,{ env: emptyEnv });
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "captures", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


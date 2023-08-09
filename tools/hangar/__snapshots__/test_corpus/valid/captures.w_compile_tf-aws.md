# [captures.w](../../../../../examples/tests/valid/captures.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $bucket1, $bucket2, $bucket3 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      (await $bucket1.put("file.txt","data"));
      (await $bucket2.get("file.txt"));
      (await $bucket2.get("file2.txt"));
      (await $bucket3.get("file3.txt"));
      for (const stuff of (await $bucket1.list())) {
        {console.log(stuff)};
      }
      {console.log((await $bucket2.publicUrl("file.txt")))};
      try {
        (await $bucket1.publicUrl("file.txt"));
      }
      catch ($error_error) {
        const error = $error_error.message;
        {console.log(error)};
      }
    }
  }
  return $Closure1;
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
      "undefined_AnotherFunction_IamRole_E4CF72AA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/AnotherFunction/IamRole",
            "uniqueId": "undefined_AnotherFunction_IamRole_E4CF72AA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudFunction_IamRole_092E88B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRole",
            "uniqueId": "undefined_cloudFunction_IamRole_092E88B6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRole",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_AnotherFunction_IamRolePolicy_67778B10": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/AnotherFunction/IamRolePolicy",
            "uniqueId": "undefined_AnotherFunction_IamRolePolicy_67778B10"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}\",\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.arn}\",\"${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_AnotherFunction_IamRole_E4CF72AA.name}"
      },
      "undefined_cloudFunction_IamRolePolicy_F10C459A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "undefined_cloudFunction_IamRolePolicy_F10C459A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}\",\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.arn}\",\"${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.name}"
      },
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicy_F90973A3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRolePolicy",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicy_F90973A3"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"sqs:ReceiveMessage\",\"sqs:ChangeMessageVisibility\",\"sqs:GetQueueUrl\",\"sqs:DeleteMessage\",\"sqs:GetQueueAttributes\"],\"Resource\":[\"${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:GetBucketPublicAccessBlock\"],\"Resource\":[\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}\",\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.arn}\",\"${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_AnotherFunction_IamRolePolicyAttachment_5821EF41": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/AnotherFunction/IamRolePolicyAttachment",
            "uniqueId": "undefined_AnotherFunction_IamRolePolicyAttachment_5821EF41"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_AnotherFunction_IamRole_E4CF72AA.name}"
      },
      "undefined_cloudFunction_IamRolePolicyAttachment_00616B66": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudFunction_IamRolePolicyAttachment_00616B66"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.name}"
      },
      "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicyAttachment_ED335108": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/IamRolePolicyAttachment",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_IamRolePolicyAttachment_ED335108"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_cloudQueue-SetConsumer-83b2983f_IamRole_F2D4B35E.name}"
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
        "batch_size": 5,
        "event_source_arn": "${aws_sqs_queue.undefined_cloudQueue_98A56968.arn}",
        "function_name": "${aws_lambda_function.undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B.function_name}"
      }
    },
    "aws_lambda_function": {
      "undefined_AnotherFunction_6906D6FD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/AnotherFunction/Default",
            "uniqueId": "undefined_AnotherFunction_6906D6FD"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_2076222a": "${aws_s3_bucket.undefined_PublicBucket_C2287B73.bucket}",
            "BUCKET_NAME_4e823dee": "${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.bucket}",
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "AnotherFunction-c8a7eaa2",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "AnotherFunction-c8a7eaa2",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_AnotherFunction_IamRole_E4CF72AA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_AnotherFunction_S3Object_87C73063.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudFunction_D952FD36": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/Default",
            "uniqueId": "undefined_cloudFunction_D952FD36"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_2076222a": "${aws_s3_bucket.undefined_PublicBucket_C2287B73.bucket}",
            "BUCKET_NAME_4e823dee": "${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.bucket}",
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "cloud-Function-c82dc107",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "cloud-Function-c82dc107",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_cloudFunction_IamRole_092E88B6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_cloudFunction_S3Object_8BF8149A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Queue-SetConsumer-83b2983f/Default",
            "uniqueId": "undefined_cloudQueue-SetConsumer-83b2983f_6DA5FC0B"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_2076222a": "${aws_s3_bucket.undefined_PublicBucket_C2287B73.bucket}",
            "BUCKET_NAME_4e823dee": "${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.bucket}",
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      },
      "undefined_PrivateBucket_4F5692D1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PrivateBucket/Default",
            "uniqueId": "undefined_PrivateBucket_4F5692D1"
          }
        },
        "bucket_prefix": "privatebucket-c8dee07a-",
        "force_destroy": false
      },
      "undefined_PublicBucket_C2287B73": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PublicBucket/Default",
            "uniqueId": "undefined_PublicBucket_C2287B73"
          }
        },
        "bucket_prefix": "publicbucket-c803058c-",
        "force_destroy": false
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
    "aws_s3_bucket_policy": {
      "undefined_PublicBucket_PublicPolicy_99B36C79": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PublicBucket/PublicPolicy",
            "uniqueId": "undefined_PublicBucket_PublicPolicy_99B36C79"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_PublicBucket_C2287B73.bucket}",
        "depends_on": [
          "aws_s3_bucket_public_access_block.undefined_PublicBucket_PublicAccessBlock_EAB402CB"
        ],
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Principal\":\"*\",\"Action\":[\"s3:GetObject\"],\"Resource\":[\"${aws_s3_bucket.undefined_PublicBucket_C2287B73.arn}/*\"]}]}"
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_PrivateBucket_PublicAccessBlock_FC0ABE65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PrivateBucket/PublicAccessBlock",
            "uniqueId": "undefined_PrivateBucket_PublicAccessBlock_FC0ABE65"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_PublicBucket_PublicAccessBlock_EAB402CB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PublicBucket/PublicAccessBlock",
            "uniqueId": "undefined_PublicBucket_PublicAccessBlock_EAB402CB"
          }
        },
        "block_public_acls": false,
        "block_public_policy": false,
        "bucket": "${aws_s3_bucket.undefined_PublicBucket_C2287B73.bucket}",
        "ignore_public_acls": false,
        "restrict_public_buckets": false
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
      "undefined_PrivateBucket_Encryption_9A5C04CE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PrivateBucket/Encryption",
            "uniqueId": "undefined_PrivateBucket_Encryption_9A5C04CE"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_PrivateBucket_4F5692D1.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_PublicBucket_Encryption_E9DBBCAC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/PublicBucket/Encryption",
            "uniqueId": "undefined_PublicBucket_Encryption_E9DBBCAC"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_PublicBucket_C2287B73.bucket}",
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
      "undefined_AnotherFunction_S3Object_87C73063": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/AnotherFunction/S3Object",
            "uniqueId": "undefined_AnotherFunction_S3Object_87C73063"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_cloudFunction_S3Object_8BF8149A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Function/S3Object",
            "uniqueId": "undefined_cloudFunction_S3Object_8BF8149A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            $bucket1: ${context._lift(bucket1)},
            $bucket2: ${context._lift(bucket2)},
            $bucket3: ${context._lift(bucket3)},
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
          $Closure1._registerBindObject(bucket1, host, ["list", "publicUrl", "put"]);
          $Closure1._registerBindObject(bucket2, host, ["get", "publicUrl"]);
          $Closure1._registerBindObject(bucket3, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PublicBucket",({"public": true}));
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"PrivateBucket",{ public: false });
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    const handler = new $Closure1(this,"$Closure1");
    (queue.setConsumer(handler,{ batchSize: 5 }));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",handler,{ env: ({}) });
    const emptyEnv = ({});
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"AnotherFunction",handler,{ env: emptyEnv });
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "captures", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


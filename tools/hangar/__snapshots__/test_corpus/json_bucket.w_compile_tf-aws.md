# [json_bucket.w](../../../../examples/tests/valid/json_bucket.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:put\",\"${aws_lambda_function.root_testput_449428F9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_cloudFunction_IamRole_DAEC3578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "root_cloudFunction_IamRole_DAEC3578"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testput_IamRole_1BBF32A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/IamRole",
            "uniqueId": "root_testput_IamRole_1BBF32A6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_cloudFunction_IamRolePolicy_AAE6C0C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRolePolicy",
            "uniqueId": "root_cloudFunction_IamRolePolicy_AAE6C0C0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
      },
      "root_testput_IamRolePolicy_98659F09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/IamRolePolicy",
            "uniqueId": "root_testput_IamRolePolicy_98659F09"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_cloudFunction_6A57BA0A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testput_IamRole_1BBF32A6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
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
      "root_testput_IamRolePolicyAttachment_E73FB6BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/IamRolePolicyAttachment",
            "uniqueId": "root_testput_IamRolePolicyAttachment_E73FB6BB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testput_IamRole_1BBF32A6.name}"
      }
    },
    "aws_lambda_function": {
      "root_cloudFunction_6A57BA0A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/Default",
            "uniqueId": "root_cloudFunction_6A57BA0A"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "cloud-Function-c8d2eca1"
          }
        },
        "function_name": "cloud-Function-c8d2eca1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_cloudFunction_S3Object_C8435368.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testput_449428F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Default",
            "uniqueId": "root_testput_449428F9"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "FUNCTION_NAME_5bb84dfa": "${aws_lambda_function.root_cloudFunction_6A57BA0A.arn}",
            "WING_FUNCTION_NAME": "test-put-c899ce9b"
          }
        },
        "function_name": "test-put-c899ce9b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testput_IamRole_1BBF32A6.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testput_S3Object_30BF1DDD.key}",
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
      "root_testput_S3Object_30BF1DDD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/S3Object",
            "uniqueId": "root_testput_S3Object_30BF1DDD"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
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
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const file_name = "file.json";
    const j = Object.freeze({"persons":[{"age":30,"name":"hasan","fears":["heights", "failure"]}]});
    const get_json = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        b: {
          obj: b,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        file_name: {
          obj: file_name,
          ops: []
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:put",new $stdlib.core.Inflight(this, "$Inflight2", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
      bindings: {
        b: {
          obj: b,
          ops: ["delete","get","get_json","list","public_url","put","put_json"]
        },
        file_name: {
          obj: file_name,
          ops: []
        },
        get_json: {
          obj: get_json,
          ops: ["invoke"]
        },
        j: {
          obj: j,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "json_bucket", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(msg) {
  const { b, file_name } = this;
  const x = (await b.getJson(file_name));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(((((x)["persons"])[0])["fears"])[1] === "failure")'`)})((((((x)["persons"])[0])["fears"])[1] === "failure"))};
}

```

## proc2/index.js
```js
async handle(msg) {
  const { b, file_name, get_json, j } = this;
  (await b.putJson(file_name,j));
  (await get_json.invoke(msg));
}

```

## tree.json
```json
{
  "version": "tree-0.1",
  "tree": {
    "id": "App",
    "path": "",
    "children": {
      "root": {
        "id": "root",
        "path": "root",
        "children": {
          "Default": {
            "id": "Default",
            "path": "root/Default",
            "children": {
              "aws": {
                "id": "aws",
                "path": "root/Default/aws",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.provider.AwsProvider",
                  "version": "12.0.2"
                }
              },
              "cloud.TestRunner": {
                "id": "cloud.TestRunner",
                "path": "root/Default/cloud.TestRunner",
                "children": {
                  "TestFunctionArns": {
                    "id": "TestFunctionArns",
                    "path": "root/Default/cloud.TestRunner/TestFunctionArns",
                    "constructInfo": {
                      "fqn": "cdktf.TerraformOutput",
                      "version": "0.15.2"
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.cloud.TestRunner",
                  "version": "0.0.0"
                },
                "display": {
                  "title": "TestRunner",
                  "description": "A suite of APIs for running tests and collecting results.",
                  "hidden": true
                }
              },
              "Default": {
                "id": "Default",
                "path": "root/Default/Default",
                "children": {
                  "cloud.Bucket": {
                    "id": "cloud.Bucket",
                    "path": "root/Default/Default/cloud.Bucket",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/cloud.Bucket/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                          "version": "12.0.2"
                        }
                      },
                      "Encryption": {
                        "id": "Encryption",
                        "path": "root/Default/Default/cloud.Bucket/Encryption",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketServerSideEncryptionConfiguration.S3BucketServerSideEncryptionConfigurationA",
                          "version": "12.0.2"
                        }
                      },
                      "PublicAccessBlock": {
                        "id": "PublicAccessBlock",
                        "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketPublicAccessBlock.S3BucketPublicAccessBlock",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": true,
                      "wing:resource:connections": [
                        {
                          "direction": "inbound",
                          "relationship": "delete",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get_json",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "list",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "public_url",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "put",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "put_json",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "delete",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "get_json",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "list",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "public_url",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "put",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "put_json",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Bucket",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Bucket",
                      "description": "A cloud object store"
                    }
                  },
                  "$Inflight1": {
                    "id": "$Inflight1",
                    "path": "root/Default/Default/$Inflight1",
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": []
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.std.Resource",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Inflight",
                      "description": "An inflight resource",
                      "hidden": true
                    }
                  },
                  "cloud.Function": {
                    "id": "cloud.Function",
                    "path": "root/Default/Default/cloud.Function",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/cloud.Function/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/cloud.Function/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/cloud.Function/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/cloud.Function/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/cloud.Function/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/cloud.Function/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.lambdaFunction.LambdaFunction",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": [
                        {
                          "direction": "outbound",
                          "relationship": "delete",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get_json",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "list",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "public_url",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "put",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "put_json",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "inbound",
                          "relationship": "invoke",
                          "resource": "root/Default/Default/test:put",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Function",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Function",
                      "description": "A cloud function (FaaS)"
                    }
                  },
                  "$Inflight2": {
                    "id": "$Inflight2",
                    "path": "root/Default/Default/$Inflight2",
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": []
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.std.Resource",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Inflight",
                      "description": "An inflight resource",
                      "hidden": true
                    }
                  },
                  "test:put": {
                    "id": "test:put",
                    "path": "root/Default/Default/test:put",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:put/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:put/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:put/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:put/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:put/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:put/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.lambdaFunction.LambdaFunction",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": [
                        {
                          "direction": "outbound",
                          "relationship": "delete",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "get_json",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "list",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "public_url",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "put",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "put_json",
                          "resource": "root/Default/Default/cloud.Bucket",
                          "implicit": false
                        },
                        {
                          "direction": "outbound",
                          "relationship": "invoke",
                          "resource": "root/Default/Default/cloud.Function",
                          "implicit": false
                        }
                      ]
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Function",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Function",
                      "description": "A cloud function (FaaS)"
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.std.Resource",
                  "version": "0.0.0"
                }
              },
              "Code": {
                "id": "Code",
                "path": "root/Default/Code",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                  "version": "12.0.2"
                }
              }
            },
            "constructInfo": {
              "fqn": "@winglang/sdk.core.CdktfApp",
              "version": "0.0.0"
            }
          },
          "backend": {
            "id": "backend",
            "path": "root/backend",
            "constructInfo": {
              "fqn": "cdktf.LocalBackend",
              "version": "0.15.2"
            }
          }
        },
        "constructInfo": {
          "fqn": "cdktf.TerraformStack",
          "version": "0.15.2"
        }
      }
    },
    "constructInfo": {
      "fqn": "cdktf.App",
      "version": "0.15.2"
    }
  }
}
```


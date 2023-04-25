# [capture_containers_of_resources.w](../../../../examples/tests/valid/capture_containers_of_resources.w) | compile | tf-aws

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
    "aws_iam_role": {
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
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
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
      "root_test_AAE85061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/Default",
            "uniqueId": "root_test_AAE85061"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_12a95bb8": "${aws_s3_bucket.root_b1_A5C8D4B7.bucket}",
            "BUCKET_NAME_12a95bb8_IS_PUBLIC": "false",
            "BUCKET_NAME_fa6445bb": "${aws_s3_bucket.root_b2_26383A0E.bucket}",
            "BUCKET_NAME_fa6445bb_IS_PUBLIC": "false",
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.root_cloudQueue_E3597F7A.url}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
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
      "root_b1_A5C8D4B7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/Default",
            "uniqueId": "root_b1_A5C8D4B7"
          }
        },
        "bucket_prefix": "b1-c88fb896-",
        "force_destroy": false
      },
      "root_b2_26383A0E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/Default",
            "uniqueId": "root_b2_26383A0E"
          }
        },
        "bucket_prefix": "b2-c844cd88-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_b1_PublicAccessBlock_8B468FE2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/PublicAccessBlock",
            "uniqueId": "root_b1_PublicAccessBlock_8B468FE2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_b1_A5C8D4B7.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_b2_PublicAccessBlock_665E72FF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/PublicAccessBlock",
            "uniqueId": "root_b2_PublicAccessBlock_665E72FF"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_b2_26383A0E.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_b1_Encryption_98BA3084": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b1/Encryption",
            "uniqueId": "root_b1_Encryption_98BA3084"
          }
        },
        "bucket": "${aws_s3_bucket.root_b1_A5C8D4B7.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_b2_Encryption_096FF85A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/b2/Encryption",
            "uniqueId": "root_b2_Encryption_096FF85A"
          }
        },
        "bucket": "${aws_s3_bucket.root_b2_26383A0E.bucket}",
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const arr = Object.freeze([this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b1"), this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"b2")]);
    const map = Object.freeze({"my_queue":this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue")});
    const set = Object.freeze(new Set(["foo", "foo", "bar"]));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        arr: {
          obj: arr,
          ops: []
        },
        map: {
          obj: map,
          ops: []
        },
        set: {
          obj: set,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_containers_of_resources", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(s) {
  const { arr, map, set } = this;
  const b1 = (await arr.at(0));
  const b2 = (await arr.at(1));
  const q = (map)["my_queue"];
  (await b1.put("file1.txt","boom"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b2.list()).length === 0)'`)})(((await b2.list()).length === 0))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b1.get("file1.txt")) === "boom")'`)})(((await b1.get("file1.txt")) === "boom"))};
  (await q.push("hello"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(await set.has("foo"))'`)})((await set.has("foo")))};
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(set.size === 2)'`)})((set.size === 2))};
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
                  "b1": {
                    "id": "b1",
                    "path": "root/Default/Default/b1",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/b1/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                          "version": "12.0.2"
                        }
                      },
                      "Encryption": {
                        "id": "Encryption",
                        "path": "root/Default/Default/b1/Encryption",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketServerSideEncryptionConfiguration.S3BucketServerSideEncryptionConfigurationA",
                          "version": "12.0.2"
                        }
                      },
                      "PublicAccessBlock": {
                        "id": "PublicAccessBlock",
                        "path": "root/Default/Default/b1/PublicAccessBlock",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketPublicAccessBlock.S3BucketPublicAccessBlock",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": true,
                      "wing:resource:connections": []
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
                  "b2": {
                    "id": "b2",
                    "path": "root/Default/Default/b2",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/b2/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                          "version": "12.0.2"
                        }
                      },
                      "Encryption": {
                        "id": "Encryption",
                        "path": "root/Default/Default/b2/Encryption",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketServerSideEncryptionConfiguration.S3BucketServerSideEncryptionConfigurationA",
                          "version": "12.0.2"
                        }
                      },
                      "PublicAccessBlock": {
                        "id": "PublicAccessBlock",
                        "path": "root/Default/Default/b2/PublicAccessBlock",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketPublicAccessBlock.S3BucketPublicAccessBlock",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": true,
                      "wing:resource:connections": []
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
                  "cloud.Queue": {
                    "id": "cloud.Queue",
                    "path": "root/Default/Default/cloud.Queue",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/cloud.Queue/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.sqsQueue.SqsQueue",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": true,
                      "wing:resource:connections": []
                    },
                    "constructInfo": {
                      "fqn": "@winglang/sdk.cloud.Queue",
                      "version": "0.0.0"
                    },
                    "display": {
                      "title": "Queue",
                      "description": "A distributed message queue"
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
                  "test": {
                    "id": "test",
                    "path": "root/Default/Default/test",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.lambdaFunction.LambdaFunction",
                          "version": "12.0.2"
                        }
                      }
                    },
                    "attributes": {
                      "wing:resource:stateful": false,
                      "wing:resource:connections": []
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


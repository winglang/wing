# [mut_container_types.w](../../../../examples/tests/valid/mut_container_types.w) | compile | tf-aws

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
    "aws_s3_bucket": {
      "root_bucket1_3A77B9B4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Default",
            "uniqueId": "root_bucket1_3A77B9B4"
          }
        },
        "bucket_prefix": "bucket1-c81ed215-",
        "force_destroy": false
      },
      "root_bucket2_E39F70EE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Default",
            "uniqueId": "root_bucket2_E39F70EE"
          }
        },
        "bucket_prefix": "bucket2-c83a0be6-",
        "force_destroy": false
      },
      "root_bucket3_A0C568EA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Default",
            "uniqueId": "root_bucket3_A0C568EA"
          }
        },
        "bucket_prefix": "bucket3-c8b6c706-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_bucket1_PublicAccessBlock_6C5071C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/PublicAccessBlock",
            "uniqueId": "root_bucket1_PublicAccessBlock_6C5071C0"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_bucket1_3A77B9B4.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_bucket2_PublicAccessBlock_BC328E84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/PublicAccessBlock",
            "uniqueId": "root_bucket2_PublicAccessBlock_BC328E84"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_bucket2_E39F70EE.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_bucket3_PublicAccessBlock_CF2593D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/PublicAccessBlock",
            "uniqueId": "root_bucket3_PublicAccessBlock_CF2593D4"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_bucket3_A0C568EA.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_bucket1_Encryption_33CABC1A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket1/Encryption",
            "uniqueId": "root_bucket1_Encryption_33CABC1A"
          }
        },
        "bucket": "${aws_s3_bucket.root_bucket1_3A77B9B4.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_bucket2_Encryption_A83E82F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket2/Encryption",
            "uniqueId": "root_bucket2_Encryption_A83E82F9"
          }
        },
        "bucket": "${aws_s3_bucket.root_bucket2_E39F70EE.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_bucket3_Encryption_A2A51E22": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/bucket3/Encryption",
            "uniqueId": "root_bucket3_Encryption_A2A51E22"
          }
        },
        "bucket": "${aws_s3_bucket.root_bucket3_A0C568EA.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
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
    const bucket1 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket1");
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket2");
    const bucket3 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"bucket3");
    const arr1 = ["a", "b", "c"];
    const arr2 = [1, 2, 3];
    const arr3 = [bucket1, bucket2];
    const arr4 = arr1;
    (arr1.push("a"));
    (arr2.push(4));
    (arr3.push(bucket3));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr2.pop()) === 4)'`)})(((arr2.pop()) === 4))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr1.length === 4)'`)})((arr1.length === 4))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((arr4.at(0)) === "a")'`)})(((arr4.at(0)) === "a"))};
    const s1 = new Set([1, 2, 3, 3]);
    const s2 = new Set(["hello", "world", "hello"]);
    const s3 = new Set([bucket1, bucket2, bucket2]);
    (s1.add(5));
    (s2.add("bye"));
    (s3.add(bucket3));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s2.has("bye"))'`)})((s2.has("bye")))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s2.has("hello"))'`)})((s2.has("hello")))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s3.has(bucket2))'`)})((s3.has(bucket2)))};
    const m1 = {"hello":"world"};
    const m2 = {"hello":123};
    const m3 = {"b1":bucket1,"b2":bucket2};
    const m4 = m1;
    const m5 = {"goodbye":"world"};
    const m6 = {"a":m1,"b":m5};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("hello" in (m1))'`)})(("hello" in (m1)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m2).length === 1)'`)})((Object.keys(m2).length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m3)["b1"] === bucket1)'`)})(((m3)["b1"] === bucket1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m4).length === 1)'`)})((Object.keys(m4).length === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((m6)["a"])["hello"] === "world")'`)})((((m6)["a"])["hello"] === "world"))};
    ((obj, args) => { obj[args[0]] = args[1]; })(m1, ["hello","goodbye"]);
    ((obj, args) => { obj[args[0]] = args[1]; })(m6, ["a",{"foo":"bar"}]);
    ((map) => { for(const k in map){delete map[k]}; })(m2);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(m2).length === 0)'`)})((Object.keys(m2).length === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m1)["hello"] === "goodbye")'`)})(((m1)["hello"] === "goodbye"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((m6)["a"])["foo"] === "bar")'`)})((((m6)["a"])["foo"] === "bar"))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "mut_container_types", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
                  "bucket1": {
                    "id": "bucket1",
                    "path": "root/Default/Default/bucket1",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/bucket1/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                          "version": "12.0.2"
                        }
                      },
                      "Encryption": {
                        "id": "Encryption",
                        "path": "root/Default/Default/bucket1/Encryption",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketServerSideEncryptionConfiguration.S3BucketServerSideEncryptionConfigurationA",
                          "version": "12.0.2"
                        }
                      },
                      "PublicAccessBlock": {
                        "id": "PublicAccessBlock",
                        "path": "root/Default/Default/bucket1/PublicAccessBlock",
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
                  "bucket2": {
                    "id": "bucket2",
                    "path": "root/Default/Default/bucket2",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/bucket2/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                          "version": "12.0.2"
                        }
                      },
                      "Encryption": {
                        "id": "Encryption",
                        "path": "root/Default/Default/bucket2/Encryption",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketServerSideEncryptionConfiguration.S3BucketServerSideEncryptionConfigurationA",
                          "version": "12.0.2"
                        }
                      },
                      "PublicAccessBlock": {
                        "id": "PublicAccessBlock",
                        "path": "root/Default/Default/bucket2/PublicAccessBlock",
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
                  "bucket3": {
                    "id": "bucket3",
                    "path": "root/Default/Default/bucket3",
                    "children": {
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/bucket3/Default",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Bucket.S3Bucket",
                          "version": "12.0.2"
                        }
                      },
                      "Encryption": {
                        "id": "Encryption",
                        "path": "root/Default/Default/bucket3/Encryption",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3BucketServerSideEncryptionConfiguration.S3BucketServerSideEncryptionConfigurationA",
                          "version": "12.0.2"
                        }
                      },
                      "PublicAccessBlock": {
                        "id": "PublicAccessBlock",
                        "path": "root/Default/Default/bucket3/PublicAccessBlock",
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


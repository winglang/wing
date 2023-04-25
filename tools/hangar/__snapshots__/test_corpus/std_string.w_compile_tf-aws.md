# [std_string.w](../../../../examples/tests/valid/std_string.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test:string\",\"${aws_lambda_function.root_teststring_0FD8A9C3.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_teststring_IamRole_A23B11BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/IamRole",
            "uniqueId": "root_teststring_IamRole_A23B11BC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_teststring_IamRolePolicy_E68C254E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/IamRolePolicy",
            "uniqueId": "root_teststring_IamRolePolicy_E68C254E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_teststring_IamRole_A23B11BC.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_teststring_IamRolePolicyAttachment_CF9D26FE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/IamRolePolicyAttachment",
            "uniqueId": "root_teststring_IamRolePolicyAttachment_CF9D26FE"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_teststring_IamRole_A23B11BC.name}"
      }
    },
    "aws_lambda_function": {
      "root_teststring_0FD8A9C3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/Default",
            "uniqueId": "root_teststring_0FD8A9C3"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-string-c8b12930"
          }
        },
        "function_name": "test-string-c8b12930",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_teststring_IamRole_A23B11BC.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_teststring_S3Object_9049C921.key}",
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
      }
    },
    "aws_s3_object": {
      "root_teststring_S3Object_9049C921": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:string/S3Object",
            "uniqueId": "root_teststring_S3Object_9049C921"
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
    const s1 = "some string";
    const s2 = "s are immutable";
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s1.length === 11)'`)})((s1.length === 11))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.at(7)) === "r")'`)})(((s1.at(7)) === "r"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.concat(s2)) === "some strings are immutable")'`)})(((s1.concat(s2)) === "some strings are immutable"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.includes("some")'`)})(s1.includes("some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!"some".includes(s1))'`)})((!"some".includes(s1)))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.endsWith("string")'`)})(s1.endsWith("string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s1.indexOf("s") === 0)'`)})((s1.indexOf("s") === 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("Some String".toLocaleLowerCase() === "some string")'`)})(("Some String".toLocaleLowerCase() === "some string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((s1.split(" ")).at(0)) === "some")'`)})((((s1.split(" ")).at(0)) === "some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 's1.startsWith("some")'`)})(s1.startsWith("some"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.substring(5)) === "string")'`)})(((s1.substring(5)) === "string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s1.substring(5,7)) === "st")'`)})(((s1.substring(5,7)) === "st"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(("   some string   ".trim()) === "some string")'`)})((("   some string   ".trim()) === "some string"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '("Some String".toLocaleUpperCase() === "SOME STRING")'`)})(("Some String".toLocaleUpperCase() === "SOME STRING"))};
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:string",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        s1: {
          obj: s1,
          ops: []
        },
        s2: {
          obj: s2,
          ops: []
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "std_string", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
  const { s1, s2 } = this;
  {console.log(`index of \"s\" in s1 is ${s1.indexOf("s")}`)};
  {console.log((await (await s1.split(" ")).at(1)))};
  {console.log((await s1.concat(s2)))};
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
                  "test:string": {
                    "id": "test:string",
                    "path": "root/Default/Default/test:string",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:string/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:string/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:string/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:string/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:string/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:string/Default",
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


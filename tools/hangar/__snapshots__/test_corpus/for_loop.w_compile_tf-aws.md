# [for_loop.w](../../../../examples/tests/valid/for_loop.w) | compile | tf-aws

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
      "root_cloudFunction_IamRole_DAEC3578": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Function/IamRole",
            "uniqueId": "root_cloudFunction_IamRole_DAEC3578"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_cloudFunction_IamRole_DAEC3578.name}"
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
    const words = Object.freeze(["wing", "lang", "dang"]);
    const unique_numbers = Object.freeze(new Set([1, 2, 3]));
    for (const word of words) {
      for (const number of unique_numbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
      }
    }
    let i = 0;
    for (const word of words) {
      i = (i + 1);
      let pre_break_hits = 0;
      let post_break_hits = 0;
      for (const number of unique_numbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
        pre_break_hits = (pre_break_hits + 1);
        if ((number === 2)) {
          break;
        }
        post_break_hits = (post_break_hits + 1);
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(pre_break_hits === 2)'`)})((pre_break_hits === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(post_break_hits === 1)'`)})((post_break_hits === 1))};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(i === 3)'`)})((i === 3))};
    let j = 0;
    for (const word of words) {
      j = (j + 1);
      let pre_continue_hits = 0;
      let post_continue_hits = 0;
      for (const number of unique_numbers) {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(number > 0)'`)})((number > 0))};
        {console.log(`${word}: ${number}`)};
        pre_continue_hits = (pre_continue_hits + 1);
        if ((number > 0)) {
          continue;
        }
        post_continue_hits = (post_continue_hits + 1);
      }
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(pre_continue_hits === 3)'`)})((pre_continue_hits === 3))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(post_continue_hits === 0)'`)})((post_continue_hits === 0))};
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(j === 3)'`)})((j === 3))};
    {console.log("---\nfor x in 0..0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
    }
    {console.log("there's no value to iterate")};
    {console.log("---\nfor x in 0..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x === 0)'`)})((x === 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 2)'`)})((x < 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, 2, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 2..0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of(2, 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > (-2))'`)})((x > (-2)))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=-2 { ... }")};
    for (const x of $stdlib.std.Range.of(0, (-2), true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > (-3))'`)})((x > (-3)))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in -2..0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= (-2))'`)})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 0)'`)})((x < 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in -2..=0 { ... }")};
    for (const x of $stdlib.std.Range.of((-2), 0, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= (-2))'`)})((x >= (-2)))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
      {console.log(`${x}`)};
    }
    const z = 2;
    {console.log("---\nfor x in 0..z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 2)'`)})((x < 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=z { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, z, true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in z..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(z, 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 2)'`)})((x <= 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x < 4)'`)})((x < 4))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in 0..=(z*2) { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of(0, (z * 2), true)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x >= 0)'`)})((x >= 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 4)'`)})((x <= 4))};
      {console.log(`${x}`)};
    }
    {console.log("---\nfor x in (z*2)..0 { ... } <=> x = 2")};
    for (const x of $stdlib.std.Range.of((z * 2), 0, false)) {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 4)'`)})((x <= 4))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 0)'`)})((x > 0))};
      {console.log(`${x}`)};
    }
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"cloud.Function",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "for_loop", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle(event) {
  const {  } = this;
  for (const x of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,10,false)) {
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x <= 0)'`)})((x <= 0))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(x > 10)'`)})((x > 10))};
    {console.log(`${x}`)};
  }
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


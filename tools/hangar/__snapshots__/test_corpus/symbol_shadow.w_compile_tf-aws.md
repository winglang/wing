# [symbol_shadow.w](../../../../examples/tests/valid/symbol_shadow.w) | compile | tf-aws

## clients/A.inflight.js
```js
class  A {
  constructor({ stateful }) {
    this.stateful = stateful;
  }
}
exports.A = A;

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
      "value": "[[\"root/Default/Default/test:inflight nested should not capture the shadowed var\",\"${aws_lambda_function.root_testinflightnestedshouldnotcapturetheshadowedvar_9382E411.arn}\"],[\"root/Default/Default/A/test:inflight in resource should capture the right scoped var\",\"${aws_lambda_function.root_A_testinflightinresourceshouldcapturetherightscopedvar_551605A5.arn}\"],[\"root/Default/Default/test:inflight on top should capture top\",\"${aws_lambda_function.root_testinflightontopshouldcapturetop_A36CE723.arn}\"],[\"root/Default/Default/test:inside_inflight should capture the right scope\",\"${aws_lambda_function.root_testinsideinflightshouldcapturetherightscope_AB987B89.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRole_5FB68186": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/IamRole",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRole_5FB68186"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_IamRole_5890FA19": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/IamRole",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_IamRole_5890FA19"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightontopshouldcapturetop_IamRole_E3EDF4E3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/IamRole",
            "uniqueId": "root_testinflightontopshouldcapturetop_IamRole_E3EDF4E3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinsideinflightshouldcapturetherightscope_IamRole_AC6104A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inside_inflight should capture the right scope/IamRole",
            "uniqueId": "root_testinsideinflightshouldcapturetherightscope_IamRole_AC6104A8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRolePolicy_43F27DF0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/IamRolePolicy",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRolePolicy_43F27DF0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRole_5FB68186.name}"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_IamRolePolicy_D9C95177": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/IamRolePolicy",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_IamRolePolicy_D9C95177"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightnestedshouldnotcapturetheshadowedvar_IamRole_5890FA19.name}"
      },
      "root_testinflightontopshouldcapturetop_IamRolePolicy_4145692C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/IamRolePolicy",
            "uniqueId": "root_testinflightontopshouldcapturetop_IamRolePolicy_4145692C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightontopshouldcapturetop_IamRole_E3EDF4E3.name}"
      },
      "root_testinsideinflightshouldcapturetherightscope_IamRolePolicy_52C3186D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inside_inflight should capture the right scope/IamRolePolicy",
            "uniqueId": "root_testinsideinflightshouldcapturetherightscope_IamRolePolicy_52C3186D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinsideinflightshouldcapturetherightscope_IamRole_AC6104A8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRolePolicyAttachment_4D1FD5DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/IamRolePolicyAttachment",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRolePolicyAttachment_4D1FD5DC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRole_5FB68186.name}"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_IamRolePolicyAttachment_A01EC35E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_IamRolePolicyAttachment_A01EC35E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightnestedshouldnotcapturetheshadowedvar_IamRole_5890FA19.name}"
      },
      "root_testinflightontopshouldcapturetop_IamRolePolicyAttachment_326E1BAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightontopshouldcapturetop_IamRolePolicyAttachment_326E1BAD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightontopshouldcapturetop_IamRole_E3EDF4E3.name}"
      },
      "root_testinsideinflightshouldcapturetherightscope_IamRolePolicyAttachment_8B30CF95": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inside_inflight should capture the right scope/IamRolePolicyAttachment",
            "uniqueId": "root_testinsideinflightshouldcapturetherightscope_IamRolePolicyAttachment_8B30CF95"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinsideinflightshouldcapturetherightscope_IamRole_AC6104A8.name}"
      }
    },
    "aws_lambda_function": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_551605A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Default",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_551605A5"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-inflight-in-resource-should-capture-the-right-scop-c87c54a6"
          }
        },
        "function_name": "test-inflight-in-resource-should-capture-the-right-scop-c87c54a6",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_A_testinflightinresourceshouldcapturetherightscopedvar_IamRole_5FB68186.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_A_testinflightinresourceshouldcapturetherightscopedvar_S3Object_4C07FA3E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_9382E411": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Default",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_9382E411"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-inflight-nested-should-not-capture-the-shadowed-va-c84a4ee4"
          }
        },
        "function_name": "test-inflight-nested-should-not-capture-the-shadowed-va-c84a4ee4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightnestedshouldnotcapturetheshadowedvar_IamRole_5890FA19.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightnestedshouldnotcapturetheshadowedvar_S3Object_C99A3326.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightontopshouldcapturetop_A36CE723": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Default",
            "uniqueId": "root_testinflightontopshouldcapturetop_A36CE723"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-inflight-on-top-should-capture-top-c86d2e46"
          }
        },
        "function_name": "test-inflight-on-top-should-capture-top-c86d2e46",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightontopshouldcapturetop_IamRole_E3EDF4E3.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightontopshouldcapturetop_S3Object_75B26800.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinsideinflightshouldcapturetherightscope_AB987B89": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inside_inflight should capture the right scope/Default",
            "uniqueId": "root_testinsideinflightshouldcapturetherightscope_AB987B89"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "test-inside_inflight-should-capture-the-right-scope-c8bf488d"
          }
        },
        "function_name": "test-inside_inflight-should-capture-the-right-scope-c8bf488d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinsideinflightshouldcapturetherightscope_IamRole_AC6104A8.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinsideinflightshouldcapturetherightscope_S3Object_33BC24EC.key}",
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
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_S3Object_4C07FA3E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/S3Object",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_S3Object_4C07FA3E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_S3Object_C99A3326": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/S3Object",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_S3Object_C99A3326"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightontopshouldcapturetop_S3Object_75B26800": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/S3Object",
            "uniqueId": "root_testinflightontopshouldcapturetop_S3Object_75B26800"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinsideinflightshouldcapturetherightscope_S3Object_33BC24EC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inside_inflight should capture the right scope/S3Object",
            "uniqueId": "root_testinsideinflightshouldcapturetherightscope_S3Object_33BC24EC"
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
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const s = "in_resource";
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "in_resource")'`)})((s === "in_resource"))};
        this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight in resource should capture the right scoped var",new $stdlib.core.Inflight(this, "$Inflight1", {
          code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
          bindings: {
            s: {
              obj: s,
              ops: []
            },
          }
        })
        );
      }
      _toInflight() {
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).A({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
    }
    A._annotateInflight("$inflight_init", {"this.stateful": { ops: [] }});
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
      this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight nested should not capture the shadowed var",new $stdlib.core.Inflight(this, "$Inflight2", {
        code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc2/index.js".replace(/\\/g, "/"))),
        bindings: {
          s: {
            obj: s,
            ops: []
          },
        }
      })
      );
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "top")'`)})((s === "top"))};
    new A(this,"A");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inflight on top should capture top",new $stdlib.core.Inflight(this, "$Inflight3", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc3/index.js".replace(/\\/g, "/"))),
      bindings: {
        s: {
          obj: s,
          ops: []
        },
      }
    })
    );
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:inside_inflight should capture the right scope",new $stdlib.core.Inflight(this, "$Inflight4", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc4/index.js".replace(/\\/g, "/"))),
      bindings: {
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "symbol_shadow", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
  const { s } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "in_resource")'`)})((s === "in_resource"))};
}

```

## proc2/index.js
```js
async handle() {
  const { s } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
}

```

## proc3/index.js
```js
async handle() {
  const { s } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "top")'`)})((s === "top"))};
}

```

## proc4/index.js
```js
async handle() {
  const {  } = this;
  const s = "inside_inflight";
  {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inside_inflight")'`)})((s === "inside_inflight"))};
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
                  "test:inflight nested should not capture the shadowed var": {
                    "id": "test:inflight nested should not capture the shadowed var",
                    "path": "root/Default/Default/test:inflight nested should not capture the shadowed var",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Default",
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
                  },
                  "A": {
                    "id": "A",
                    "path": "root/Default/Default/A",
                    "children": {
                      "$Inflight1": {
                        "id": "$Inflight1",
                        "path": "root/Default/Default/A/$Inflight1",
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
                      "test:inflight in resource should capture the right scoped var": {
                        "id": "test:inflight in resource should capture the right scoped var",
                        "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var",
                        "children": {
                          "Asset": {
                            "id": "Asset",
                            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Asset",
                            "constructInfo": {
                              "fqn": "cdktf.TerraformAsset",
                              "version": "0.15.2"
                            }
                          },
                          "S3Object": {
                            "id": "S3Object",
                            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/S3Object",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                              "version": "12.0.2"
                            }
                          },
                          "IamRole": {
                            "id": "IamRole",
                            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/IamRole",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                              "version": "12.0.2"
                            }
                          },
                          "IamRolePolicy": {
                            "id": "IamRolePolicy",
                            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/IamRolePolicy",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                              "version": "12.0.2"
                            }
                          },
                          "IamRolePolicyAttachment": {
                            "id": "IamRolePolicyAttachment",
                            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/IamRolePolicyAttachment",
                            "constructInfo": {
                              "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                              "version": "12.0.2"
                            }
                          },
                          "Default": {
                            "id": "Default",
                            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Default",
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
                  "$Inflight3": {
                    "id": "$Inflight3",
                    "path": "root/Default/Default/$Inflight3",
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
                  "test:inflight on top should capture top": {
                    "id": "test:inflight on top should capture top",
                    "path": "root/Default/Default/test:inflight on top should capture top",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:inflight on top should capture top/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:inflight on top should capture top/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:inflight on top should capture top/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:inflight on top should capture top/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:inflight on top should capture top/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:inflight on top should capture top/Default",
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
                  },
                  "$Inflight4": {
                    "id": "$Inflight4",
                    "path": "root/Default/Default/$Inflight4",
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
                  "test:inside_inflight should capture the right scope": {
                    "id": "test:inside_inflight should capture the right scope",
                    "path": "root/Default/Default/test:inside_inflight should capture the right scope",
                    "children": {
                      "Asset": {
                        "id": "Asset",
                        "path": "root/Default/Default/test:inside_inflight should capture the right scope/Asset",
                        "constructInfo": {
                          "fqn": "cdktf.TerraformAsset",
                          "version": "0.15.2"
                        }
                      },
                      "S3Object": {
                        "id": "S3Object",
                        "path": "root/Default/Default/test:inside_inflight should capture the right scope/S3Object",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.s3Object.S3Object",
                          "version": "12.0.2"
                        }
                      },
                      "IamRole": {
                        "id": "IamRole",
                        "path": "root/Default/Default/test:inside_inflight should capture the right scope/IamRole",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRole.IamRole",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicy": {
                        "id": "IamRolePolicy",
                        "path": "root/Default/Default/test:inside_inflight should capture the right scope/IamRolePolicy",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicy.IamRolePolicy",
                          "version": "12.0.2"
                        }
                      },
                      "IamRolePolicyAttachment": {
                        "id": "IamRolePolicyAttachment",
                        "path": "root/Default/Default/test:inside_inflight should capture the right scope/IamRolePolicyAttachment",
                        "constructInfo": {
                          "fqn": "@cdktf/provider-aws.iamRolePolicyAttachment.IamRolePolicyAttachment",
                          "version": "12.0.2"
                        }
                      },
                      "Default": {
                        "id": "Default",
                        "path": "root/Default/Default/test:inside_inflight should capture the right scope/Default",
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


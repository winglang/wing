# [memory_and_env.w](../../../../../../examples/tests/sdk_tests/function/memory_and_env.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $c, $util_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $c.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: util.env(\"catName\") == \"Tion\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $util_Util.env("catName")),"Tion")))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $c, $f1, $f2 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),0)))};
      (await $f1.invoke(""));
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),1)))};
      (await $f2.invoke(""));
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $c.peek()),2)))};
    }
  }
  return $Closure3;
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
      "value": "[[\"root/Default/Default/test:function with memory and function with env can be invoked\",\"${aws_lambda_function.testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_BE0A518F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
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
      "envfn_IamRole_88E952E6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRole",
            "uniqueId": "envfn_IamRole_88E952E6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "memoryfn_IamRole_87751238": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRole",
            "uniqueId": "memoryfn_IamRole_87751238"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8471F020": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/IamRole",
            "uniqueId": "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8471F020"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "envfn_IamRolePolicy_63955289": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRolePolicy",
            "uniqueId": "envfn_IamRolePolicy_63955289"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.envfn_IamRole_88E952E6.name}"
      },
      "memoryfn_IamRolePolicy_5DA20EF5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRolePolicy",
            "uniqueId": "memoryfn_IamRolePolicy_5DA20EF5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.memoryfn_IamRole_87751238.name}"
      },
      "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicy_8C973050": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/IamRolePolicy",
            "uniqueId": "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicy_8C973050"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.memoryfn.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.envfn.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8471F020.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "envfn_IamRolePolicyAttachment_FF624FBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRolePolicyAttachment",
            "uniqueId": "envfn_IamRolePolicyAttachment_FF624FBC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.envfn_IamRole_88E952E6.name}"
      },
      "memoryfn_IamRolePolicyAttachment_97CAD739": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRolePolicyAttachment",
            "uniqueId": "memoryfn_IamRolePolicyAttachment_97CAD739"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.memoryfn_IamRole_87751238.name}"
      },
      "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicyAttachment_82EEF7BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/IamRolePolicyAttachment",
            "uniqueId": "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicyAttachment_82EEF7BB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8471F020.name}"
      }
    },
    "aws_lambda_function": {
      "envfn": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/Default",
            "uniqueId": "envfn"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "env-fn-c8a226dd",
            "WING_TARGET": "tf-aws",
            "catAge": "2",
            "catName": "Tion"
          }
        },
        "function_name": "env-fn-c8a226dd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.envfn_IamRole_88E952E6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.envfn_S3Object_0080F00E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "memoryfn": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/Default",
            "uniqueId": "memoryfn"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "memory-fn-c844bdf7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "memory-fn-c844bdf7",
        "handler": "index.handler",
        "memory_size": 128,
        "publish": true,
        "role": "${aws_iam_role.memoryfn_IamRole_87751238.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.memoryfn_S3Object_3B51C445.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_BE0A518F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/Default",
            "uniqueId": "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_BE0A518F"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "FUNCTION_NAME_2d5b932f": "${aws_lambda_function.memoryfn.arn}",
            "FUNCTION_NAME_d7a1b8c8": "${aws_lambda_function.envfn.arn}",
            "WING_FUNCTION_NAME": "Handler-c8bf8232",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8bf8232",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8471F020.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_8A751E03.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
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
    "aws_s3_bucket_public_access_block": {
      "cloudBucket_PublicAccessBlock_5946CCE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "cloudBucket_PublicAccessBlock_5946CCE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
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
      "envfn_S3Object_0080F00E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/S3Object",
            "uniqueId": "envfn_S3Object_0080F00E"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "memoryfn_S3Object_3B51C445": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/S3Object",
            "uniqueId": "memoryfn_S3Object_3B51C445"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_8A751E03": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/S3Object",
            "uniqueId": "testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_8A751E03"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const cloud = require('@winglang/sdk').cloud;
const util = require('@winglang/sdk').util;
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
            $c: ${context._lift(c)},
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
          $Closure1._registerBindObject(c, host, ["inc"]);
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
            $c: ${context._lift(c)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure2._registerBindObject(c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure3.js")({
            $c: ${context._lift(c)},
            $f1: ${context._lift(f1)},
            $f2: ${context._lift(f2)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(c, host, ["peek"]);
          $Closure3._registerBindObject(f1, host, ["invoke"]);
          $Closure3._registerBindObject(f2, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const f1 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"memory fn",new $Closure1(this,"$Closure1"),{
    "memory": 128,}
    );
    const f2 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"env fn",new $Closure2(this,"$Closure2"),{ env: Object.freeze({"catName":"Tion"}) });
    (f2.addEnvironment("catAge","2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: f2.env.get(\"catAge\") == \"2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((f2.env)["catAge"],"2")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: f2.env.get(\"catName\") == \"Tion\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((f2.env)["catName"],"Tion")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:function with memory and function with env can be invoked",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "memory_and_env", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


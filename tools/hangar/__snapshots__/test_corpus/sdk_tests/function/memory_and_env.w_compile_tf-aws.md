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
      "value": "[[\"root/undefined/Default/test:function with memory and function with env can be invoked\",\"${aws_lambda_function.undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_A3F5B048.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
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
      "undefined_envfn_IamRole_BF6C310C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/env fn/IamRole",
            "uniqueId": "undefined_envfn_IamRole_BF6C310C"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_memoryfn_IamRole_D62273AC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/memory fn/IamRole",
            "uniqueId": "undefined_memoryfn_IamRole_D62273AC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8E633184": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:function with memory and function with env can be invoked/Handler/IamRole",
            "uniqueId": "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8E633184"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_envfn_IamRolePolicy_9DFCBADE": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/env fn/IamRolePolicy",
            "uniqueId": "undefined_envfn_IamRolePolicy_9DFCBADE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_envfn_IamRole_BF6C310C.name}"
      },
      "undefined_memoryfn_IamRolePolicy_E4B1B8E4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/memory fn/IamRolePolicy",
            "uniqueId": "undefined_memoryfn_IamRolePolicy_E4B1B8E4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_memoryfn_IamRole_D62273AC.name}"
      },
      "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicy_ADD8C256": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:function with memory and function with env can be invoked/Handler/IamRolePolicy",
            "uniqueId": "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicy_ADD8C256"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_memoryfn_9BE38592.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_envfn_066EBDD3.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8E633184.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_envfn_IamRolePolicyAttachment_6DAF4B75": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/env fn/IamRolePolicyAttachment",
            "uniqueId": "undefined_envfn_IamRolePolicyAttachment_6DAF4B75"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_envfn_IamRole_BF6C310C.name}"
      },
      "undefined_memoryfn_IamRolePolicyAttachment_F2C37D62": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/memory fn/IamRolePolicyAttachment",
            "uniqueId": "undefined_memoryfn_IamRolePolicyAttachment_F2C37D62"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_memoryfn_IamRole_D62273AC.name}"
      },
      "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicyAttachment_53C2028B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:function with memory and function with env can be invoked/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicyAttachment_53C2028B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8E633184.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_envfn_066EBDD3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/env fn/Default",
            "uniqueId": "undefined_envfn_066EBDD3"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "env-fn-c871296a",
            "WING_TARGET": "tf-aws",
            "catAge": "2",
            "catName": "Tion"
          }
        },
        "function_name": "env-fn-c871296a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_envfn_IamRole_BF6C310C.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_envfn_S3Object_8BF73F43.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_memoryfn_9BE38592": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/memory fn/Default",
            "uniqueId": "undefined_memoryfn_9BE38592"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "memory-fn-c864a6ec",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "memory-fn-c864a6ec",
        "handler": "index.handler",
        "memory_size": 128,
        "publish": true,
        "role": "${aws_iam_role.undefined_memoryfn_IamRole_D62273AC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_memoryfn_S3Object_AE713371.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_A3F5B048": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:function with memory and function with env can be invoked/Handler/Default",
            "uniqueId": "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_A3F5B048"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "FUNCTION_NAME_2c924b41": "${aws_lambda_function.undefined_envfn_066EBDD3.arn}",
            "FUNCTION_NAME_5f73ba98": "${aws_lambda_function.undefined_memoryfn_9BE38592.arn}",
            "WING_FUNCTION_NAME": "Handler-c8d2a1b3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d2a1b3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_8E633184.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_882026ED.key}",
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
      "undefined_envfn_S3Object_8BF73F43": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/env fn/S3Object",
            "uniqueId": "undefined_envfn_S3Object_8BF73F43"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_memoryfn_S3Object_AE713371": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/memory fn/S3Object",
            "uniqueId": "undefined_memoryfn_S3Object_AE713371"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_882026ED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:function with memory and function with env can be invoked/Handler/S3Object",
            "uniqueId": "undefined_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_882026ED"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
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
const std = $stdlib.std;
const cloud = $stdlib.cloud;
const util = $stdlib.util;
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
    const f1 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"memory fn",new $Closure1(this,"$Closure1"),({"memory": 128}));
    const f2 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"env fn",new $Closure2(this,"$Closure2"),{ env: ({"catName": "Tion"}) });
    (f2.addEnvironment("catAge","2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: f2.env.get(\"catAge\") == \"2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((f2.env)["catAge"],"2")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: f2.env.get(\"catName\") == \"Tion\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((f2.env)["catName"],"Tion")))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:function with memory and function with env can be invoked",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "memory_and_env", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


# [dec.w](../../../../../../examples/tests/sdk_tests/counter/dec.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),1)))};
      const dec1 = (await $counter.dec());
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(dec1,1)))};
      const dec2 = (await $counter.dec(2));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == -2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),(-2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec2 == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(dec2,0)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const key = "my-key";
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),1)))};
      const dec1 = (await $counter.dec(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(dec1,1)))};
      const dec2 = (await $counter.dec(2,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == -2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),(-2))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: dec2 == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(dec2,0)))};
    }
  }
  return $Closure2;
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
      "value": "[[\"root/undefined/Default/test:dec\",\"${aws_lambda_function.undefined_testdec_Handler_F569C51E.arn}\"],[\"root/undefined/Default/test:key dec\",\"${aws_lambda_function.undefined_testkeydec_Handler_BB16AA06.arn}\"]]"
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
      "undefined_testdec_Handler_IamRole_FED85BC0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dec/Handler/IamRole",
            "uniqueId": "undefined_testdec_Handler_IamRole_FED85BC0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testkeydec_Handler_IamRole_0EC631DB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key dec/Handler/IamRole",
            "uniqueId": "undefined_testkeydec_Handler_IamRole_0EC631DB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testdec_Handler_IamRolePolicy_2FA78CF7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dec/Handler/IamRolePolicy",
            "uniqueId": "undefined_testdec_Handler_IamRolePolicy_2FA78CF7"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testdec_Handler_IamRole_FED85BC0.name}"
      },
      "undefined_testkeydec_Handler_IamRolePolicy_F7313099": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key dec/Handler/IamRolePolicy",
            "uniqueId": "undefined_testkeydec_Handler_IamRolePolicy_F7313099"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testkeydec_Handler_IamRole_0EC631DB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testdec_Handler_IamRolePolicyAttachment_FD868258": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testdec_Handler_IamRolePolicyAttachment_FD868258"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testdec_Handler_IamRole_FED85BC0.name}"
      },
      "undefined_testkeydec_Handler_IamRolePolicyAttachment_100B6296": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key dec/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testkeydec_Handler_IamRolePolicyAttachment_100B6296"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testkeydec_Handler_IamRole_0EC631DB.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testdec_Handler_F569C51E": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dec/Handler/Default",
            "uniqueId": "undefined_testdec_Handler_F569C51E"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c8f43b3c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f43b3c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testdec_Handler_IamRole_FED85BC0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testdec_Handler_S3Object_04C970C9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testkeydec_Handler_BB16AA06": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key dec/Handler/Default",
            "uniqueId": "undefined_testkeydec_Handler_BB16AA06"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_9b52e7ab": "${aws_dynamodb_table.undefined_cloudCounter_4B4E77ED.name}",
            "WING_FUNCTION_NAME": "Handler-c887547f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c887547f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testkeydec_Handler_IamRole_0EC631DB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testkeydec_Handler_S3Object_FC26E1B5.key}",
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
      }
    },
    "aws_s3_object": {
      "undefined_testdec_Handler_S3Object_04C970C9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:dec/Handler/S3Object",
            "uniqueId": "undefined_testdec_Handler_S3Object_04C970C9"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testkeydec_Handler_S3Object_FC26E1B5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:key dec/Handler/S3Object",
            "uniqueId": "undefined_testkeydec_Handler_S3Object_FC26E1B5"
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
            $counter: ${context._lift(counter)},
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
          $Closure1._registerBindObject(counter, host, ["dec", "peek"]);
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
            $counter: ${context._lift(counter)},
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
          $Closure2._registerBindObject(counter, host, ["dec", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 1 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:dec",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key dec",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "dec", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


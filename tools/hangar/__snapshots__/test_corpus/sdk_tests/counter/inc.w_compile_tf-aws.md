# [inc.w](../../../../../../examples/tests/sdk_tests/counter/inc.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $counter }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),0)))};
      const r0 = (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: r0 == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r0,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),1)))};
      const r1 = (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: r1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r1,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),2)))};
      const r2 = (await $counter.inc(10));
      {((cond) => {if (!cond) throw new Error("assertion failed: r2 == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r2,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek() == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek()),12)))};
      const r3 = (await $counter.inc());
      {((cond) => {if (!cond) throw new Error("assertion failed: r3 == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r3,12)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
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
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),0)))};
      const r0 = (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r0 == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r0,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),1)))};
      const r1 = (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r1 == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r1,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),2)))};
      const r2 = (await $counter.inc(10,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r2 == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r2,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: counter.peek(key) == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek(key)),12)))};
      const r3 = (await $counter.inc(undefined,key));
      {((cond) => {if (!cond) throw new Error("assertion failed: r3 == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(r3,12)))};
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
      "version": "0.18.0"
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
      "value": "[[\"root/Default/Default/test:inc\",\"${aws_lambda_function.testinc_Handler_5C48B863.arn}\"],[\"root/Default/Default/test:key inc\",\"${aws_lambda_function.testkeyinc_Handler_15600574.arn}\"]]"
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
      "testinc_Handler_IamRole_3AAB9B32": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/IamRole",
            "uniqueId": "testinc_Handler_IamRole_3AAB9B32"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testkeyinc_Handler_IamRole_13A4B666": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/IamRole",
            "uniqueId": "testkeyinc_Handler_IamRole_13A4B666"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinc_Handler_IamRolePolicy_8B469F7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/IamRolePolicy",
            "uniqueId": "testinc_Handler_IamRolePolicy_8B469F7E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testinc_Handler_IamRole_3AAB9B32.name}"
      },
      "testkeyinc_Handler_IamRolePolicy_FC9413B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/IamRolePolicy",
            "uniqueId": "testkeyinc_Handler_IamRolePolicy_FC9413B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.cloudCounter.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testkeyinc_Handler_IamRole_13A4B666.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinc_Handler_IamRolePolicyAttachment_0B0CDAE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinc_Handler_IamRolePolicyAttachment_0B0CDAE1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinc_Handler_IamRole_3AAB9B32.name}"
      },
      "testkeyinc_Handler_IamRolePolicyAttachment_7E0AFF36": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/IamRolePolicyAttachment",
            "uniqueId": "testkeyinc_Handler_IamRolePolicyAttachment_7E0AFF36"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testkeyinc_Handler_IamRole_13A4B666.name}"
      }
    },
    "aws_lambda_function": {
      "testinc_Handler_5C48B863": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/Default",
            "uniqueId": "testinc_Handler_5C48B863"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c8ddbb5a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ddbb5a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinc_Handler_IamRole_3AAB9B32.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinc_Handler_S3Object_111FAB39.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testkeyinc_Handler_15600574": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/Default",
            "uniqueId": "testkeyinc_Handler_15600574"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.cloudCounter.name}",
            "WING_FUNCTION_NAME": "Handler-c87f92b5",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c87f92b5",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testkeyinc_Handler_IamRole_13A4B666.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testkeyinc_Handler_S3Object_A4437850.key}",
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
      }
    },
    "aws_s3_object": {
      "testinc_Handler_S3Object_111FAB39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inc/Handler/S3Object",
            "uniqueId": "testinc_Handler_S3Object_111FAB39"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testkeyinc_Handler_S3Object_A4437850": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:key inc/Handler/S3Object",
            "uniqueId": "testkeyinc_Handler_S3Object_A4437850"
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
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
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
            $counter: ${context._lift(counter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(counter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
            $counter: ${context._lift(counter)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(counter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter",{ initial: 0 });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inc",new $Closure1(this,"$Closure1"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:key inc",new $Closure2(this,"$Closure2"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inc", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


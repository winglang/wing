# [json.w](../../../../../../examples/tests/sdk_tests/std/json.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = ({"a": 1});
      ((obj, args) => { obj[args[0]] = args[1]; })(x, ["b",2]);
      const y = (x)["b"];
      {((cond) => {if (!cond) throw new Error("assertion failed: y == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(y,2)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const x = ({"a": 1});
      const a = ({"c": 3});
      ((obj, args) => { obj[args[0]] = args[1]; })(x, [2,a]);
      const d = (x)[2];
      {((cond) => {if (!cond) throw new Error("assertion failed: d.get(\"c\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((d)["c"],3)))};
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
      "value": "[[\"root/undefined/Default/test:set()\",\"${aws_lambda_function.undefined_testset_Handler_E11F20B2.arn}\"],[\"root/undefined/Default/test:setAt()\",\"${aws_lambda_function.undefined_testsetAt_Handler_969D3F2F.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testsetAt_Handler_IamRole_FE0B52BF": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setAt()/Handler/IamRole",
            "uniqueId": "undefined_testsetAt_Handler_IamRole_FE0B52BF"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testset_Handler_IamRole_C1DAD5A8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set()/Handler/IamRole",
            "uniqueId": "undefined_testset_Handler_IamRole_C1DAD5A8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testsetAt_Handler_IamRolePolicy_D2147B45": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setAt()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testsetAt_Handler_IamRolePolicy_D2147B45"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testsetAt_Handler_IamRole_FE0B52BF.name}"
      },
      "undefined_testset_Handler_IamRolePolicy_A63DCF08": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set()/Handler/IamRolePolicy",
            "uniqueId": "undefined_testset_Handler_IamRolePolicy_A63DCF08"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testset_Handler_IamRole_C1DAD5A8.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testsetAt_Handler_IamRolePolicyAttachment_16822DD1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setAt()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testsetAt_Handler_IamRolePolicyAttachment_16822DD1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testsetAt_Handler_IamRole_FE0B52BF.name}"
      },
      "undefined_testset_Handler_IamRolePolicyAttachment_989F839B": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set()/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testset_Handler_IamRolePolicyAttachment_989F839B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testset_Handler_IamRole_C1DAD5A8.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testsetAt_Handler_969D3F2F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setAt()/Handler/Default",
            "uniqueId": "undefined_testsetAt_Handler_969D3F2F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8996408",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8996408",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testsetAt_Handler_IamRole_FE0B52BF.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testsetAt_Handler_S3Object_411249A2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testset_Handler_E11F20B2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set()/Handler/Default",
            "uniqueId": "undefined_testset_Handler_E11F20B2"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c805e688",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c805e688",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testset_Handler_IamRole_C1DAD5A8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testset_Handler_S3Object_3398FA91.key}",
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
      "undefined_testsetAt_Handler_S3Object_411249A2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:setAt()/Handler/S3Object",
            "uniqueId": "undefined_testsetAt_Handler_S3Object_411249A2"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testset_Handler_S3Object_3398FA91": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:set()/Handler/S3Object",
            "uniqueId": "undefined_testset_Handler_S3Object_3398FA91"
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
    }
    const a = ({"a": 1});
    const b = ({"b": 2});
    ((obj, args) => { obj[args[0]] = args[1]; })(a, ["c",b]);
    const c = (a)["c"];
    {((cond) => {if (!cond) throw new Error("assertion failed: c.get(\"b\") == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((c)["b"],2)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set()",new $Closure1(this,"$Closure1"));
    const d = ({"d": 3});
    ((obj, args) => { obj[args[0]] = args[1]; })(a, [2,d]);
    const e = (a)[2];
    {((cond) => {if (!cond) throw new Error("assertion failed: e.get(\"d\") == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((e)["d"],3)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setAt()",new $Closure2(this,"$Closure2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(nil) == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(undefined),undefined)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"boom\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("boom"),undefined)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(""),undefined)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


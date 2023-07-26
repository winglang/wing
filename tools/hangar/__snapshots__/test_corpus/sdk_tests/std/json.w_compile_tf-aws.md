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
      const x = {"a":1};
      ((obj, args) => { obj[args[0]] = args[1]; })(x, ["b",2]);
      const y = (x)["b"];
      {((cond) => {if (!cond) throw new Error("assertion failed: y == 2")})((y === 2))};
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
      const x = {"a":1};
      const a = {"c":3};
      ((obj, args) => { obj[args[0]] = args[1]; })(x, [2,a]);
      const d = (x)[2];
      {((cond) => {if (!cond) throw new Error("assertion failed: d.get(\"c\") == 3")})(((d)["c"] === 3))};
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
      "value": "[[\"root/Default/Default/test:set()\",\"${aws_lambda_function.testset_Handler_ADDF1A01.arn}\"],[\"root/Default/Default/test:setAt()\",\"${aws_lambda_function.testsetAt_Handler_51015029.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testsetAt_Handler_IamRole_C36C780A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRole",
            "uniqueId": "testsetAt_Handler_IamRole_C36C780A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testset_Handler_IamRole_B9B79227": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRole",
            "uniqueId": "testset_Handler_IamRole_B9B79227"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testsetAt_Handler_IamRolePolicy_24EE9CC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRolePolicy",
            "uniqueId": "testsetAt_Handler_IamRolePolicy_24EE9CC0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testsetAt_Handler_IamRole_C36C780A.name}"
      },
      "testset_Handler_IamRolePolicy_ADE48415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicy",
            "uniqueId": "testset_Handler_IamRolePolicy_ADE48415"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testsetAt_Handler_IamRolePolicyAttachment_764BF14B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testsetAt_Handler_IamRolePolicyAttachment_764BF14B"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testsetAt_Handler_IamRole_C36C780A.name}"
      },
      "testset_Handler_IamRolePolicyAttachment_58805670": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/IamRolePolicyAttachment",
            "uniqueId": "testset_Handler_IamRolePolicyAttachment_58805670"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.name}"
      }
    },
    "aws_lambda_function": {
      "testsetAt_Handler_51015029": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/Default",
            "uniqueId": "testsetAt_Handler_51015029"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c841d86c",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c841d86c",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testsetAt_Handler_IamRole_C36C780A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testsetAt_Handler_S3Object_FE28177A.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testset_Handler_ADDF1A01": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/Default",
            "uniqueId": "testset_Handler_ADDF1A01"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8240bc7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8240bc7",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testset_Handler_IamRole_B9B79227.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testset_Handler_S3Object_A8FBF518.key}",
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
      "testsetAt_Handler_S3Object_FE28177A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:setAt()/Handler/S3Object",
            "uniqueId": "testsetAt_Handler_S3Object_FE28177A"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testset_Handler_S3Object_A8FBF518": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:set()/Handler/S3Object",
            "uniqueId": "testset_Handler_S3Object_A8FBF518"
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
    const a = {"a":1};
    const b = {"b":2};
    ((obj, args) => { obj[args[0]] = args[1]; })(a, ["c",b]);
    const c = (a)["c"];
    {((cond) => {if (!cond) throw new Error("assertion failed: c.get(\"b\") == 2")})(((c)["b"] === 2))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:set()",new $Closure1(this,"$Closure1"));
    const d = {"d":3};
    ((obj, args) => { obj[args[0]] = args[1]; })(a, [2,d]);
    const e = (a)[2];
    {((cond) => {if (!cond) throw new Error("assertion failed: e.get(\"d\") == 3")})(((e)["d"] === 3))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:setAt()",new $Closure2(this,"$Closure2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(nil) == nil")})((((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })(undefined) === undefined))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"boom\") == nil")})((((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("boom") === undefined))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Json.tryParse(\"\") == nil")})((((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })("") === undefined))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "json", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


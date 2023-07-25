# [nanoid.w](../../../../../../examples/tests/sdk_tests/util/nanoid.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $util_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const standard_id = (await $util_Util.nanoid());
      {((cond) => {if (!cond) throw new Error("assertion failed: standard_id.length == 21")})((standard_id.length === 21))};
      const id_size10 = (await $util_Util.nanoid({ size: 10 }));
      {((cond) => {if (!cond) throw new Error("assertion failed: id_size10.length == 10")})((id_size10.length === 10))};
      const id_custom = (await $util_Util.nanoid({ alphabet: "01*/ab" }));
      {((cond) => {if (!cond) throw new Error("assertion failed: id_custom.length == 21")})((id_custom.length === 21))};
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,id_custom.length,false)) {
        if (((((((((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "0") || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "1")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "*")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "/")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "a")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "b"))) {
          {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
        }
        else {
          {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
        }
      }
    }
  }
  return $Closure1;
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
      "value": "[[\"root/Default/Default/test:inflight nanoid\",\"${aws_lambda_function.testinflightnanoid_Handler_154ED1B9.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightnanoid_Handler_IamRole_150CF122": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nanoid/Handler/IamRole",
            "uniqueId": "testinflightnanoid_Handler_IamRole_150CF122"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightnanoid_Handler_IamRolePolicy_8D2559C4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nanoid/Handler/IamRolePolicy",
            "uniqueId": "testinflightnanoid_Handler_IamRolePolicy_8D2559C4"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightnanoid_Handler_IamRole_150CF122.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightnanoid_Handler_IamRolePolicyAttachment_C418852A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nanoid/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightnanoid_Handler_IamRolePolicyAttachment_C418852A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightnanoid_Handler_IamRole_150CF122.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightnanoid_Handler_154ED1B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nanoid/Handler/Default",
            "uniqueId": "testinflightnanoid_Handler_154ED1B9"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c864f292",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c864f292",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightnanoid_Handler_IamRole_150CF122.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightnanoid_Handler_S3Object_F7A4E7DD.key}",
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
      "testinflightnanoid_Handler_S3Object_F7A4E7DD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nanoid/Handler/S3Object",
            "uniqueId": "testinflightnanoid_Handler_S3Object_F7A4E7DD"
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
            $util_Util: ${context._lift(util.Util)},
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
    const standard_id = (util.Util.nanoid());
    {((cond) => {if (!cond) throw new Error("assertion failed: standard_id.length == 21")})((standard_id.length === 21))};
    const id_size10 = (util.Util.nanoid({ size: 10 }));
    {((cond) => {if (!cond) throw new Error("assertion failed: id_size10.length == 10")})((id_size10.length === 10))};
    const id_custom = (util.Util.nanoid({ alphabet: "01*/ab" }));
    {((cond) => {if (!cond) throw new Error("assertion failed: id_custom.length == 21")})((id_custom.length === 21))};
    for (const i of $stdlib.std.Range.of(0, id_custom.length, false)) {
      if (((((((((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "0") || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "1")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "*")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "/")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "a")) || (((args) => { if (i >= id_custom.length || i + id_custom.length < 0) {throw new Error("index out of bounds")}; return id_custom.at(i) })(i) === "b"))) {
        {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
      }
      else {
        {((cond) => {if (!cond) throw new Error("assertion failed: false")})(false)};
      }
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight nanoid",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "nanoid", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


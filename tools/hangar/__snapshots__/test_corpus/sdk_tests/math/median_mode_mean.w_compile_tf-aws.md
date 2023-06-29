# [median_mode_mean.w](../../../../../../examples/tests/sdk_tests/math/median_mode_mean.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ odd_arr, even_arr, math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.median(odd_arr) == 6")})(((await math_Util.median(odd_arr)) === 6))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.median(even_arr) == 4.5")})(((await math_Util.median(even_arr)) === 4.5))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ modal_arr, bimodal, multimodal, math_Util }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})(((await (await math_Util.mode(modal_arr)).at(0)) === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})(((await bimodal.at(0)) === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})(((await bimodal.at(1)) === 7))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})(((await multimodal.at(0)) === 2))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})(((await multimodal.at(1)) === 7))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})(((await multimodal.at(2)) === 9))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ mean_arr, math_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})(((await math_Util.arithmeticMean(mean_arr)) === 42))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})(((await math_Util.geometricMean(mean_arr)) === 30))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})(((await math_Util.harmonicMean(mean_arr)) === 15))};
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
      "value": "[[\"root/Default/Default/test:inflight median\",\"${aws_lambda_function.root_testinflightmedian_Handler_15967B87.arn}\"],[\"root/Default/Default/test:inflight mode\",\"${aws_lambda_function.root_testinflightmode_Handler_AEAA7263.arn}\"],[\"root/Default/Default/test:inflight mean\",\"${aws_lambda_function.root_testinflightmean_Handler_4F320506.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightmean_Handler_IamRole_895A9FC3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/IamRole",
            "uniqueId": "root_testinflightmean_Handler_IamRole_895A9FC3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightmedian_Handler_IamRole_E9544EA2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/IamRole",
            "uniqueId": "root_testinflightmedian_Handler_IamRole_E9544EA2"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightmode_Handler_IamRole_5CAE07A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/IamRole",
            "uniqueId": "root_testinflightmode_Handler_IamRole_5CAE07A0"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightmean_Handler_IamRolePolicy_E56C67A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightmean_Handler_IamRolePolicy_E56C67A8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightmean_Handler_IamRole_895A9FC3.name}"
      },
      "root_testinflightmedian_Handler_IamRolePolicy_735CFB20": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightmedian_Handler_IamRolePolicy_735CFB20"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightmedian_Handler_IamRole_E9544EA2.name}"
      },
      "root_testinflightmode_Handler_IamRolePolicy_C096AFF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightmode_Handler_IamRolePolicy_C096AFF9"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightmode_Handler_IamRole_5CAE07A0.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightmean_Handler_IamRolePolicyAttachment_49287AF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightmean_Handler_IamRolePolicyAttachment_49287AF1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightmean_Handler_IamRole_895A9FC3.name}"
      },
      "root_testinflightmedian_Handler_IamRolePolicyAttachment_21472737": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightmedian_Handler_IamRolePolicyAttachment_21472737"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightmedian_Handler_IamRole_E9544EA2.name}"
      },
      "root_testinflightmode_Handler_IamRolePolicyAttachment_2F401533": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightmode_Handler_IamRolePolicyAttachment_2F401533"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightmode_Handler_IamRole_5CAE07A0.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightmean_Handler_4F320506": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/Default",
            "uniqueId": "root_testinflightmean_Handler_4F320506"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81bc5c0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81bc5c0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightmean_Handler_IamRole_895A9FC3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightmean_Handler_S3Object_2478609D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightmedian_Handler_15967B87": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/Default",
            "uniqueId": "root_testinflightmedian_Handler_15967B87"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d95514",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d95514",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightmedian_Handler_IamRole_E9544EA2.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightmedian_Handler_S3Object_FB5CCD67.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightmode_Handler_AEAA7263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/Default",
            "uniqueId": "root_testinflightmode_Handler_AEAA7263"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c7e996",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c7e996",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightmode_Handler_IamRole_5CAE07A0.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightmode_Handler_S3Object_3F496665.key}",
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
      "root_testinflightmean_Handler_S3Object_2478609D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/S3Object",
            "uniqueId": "root_testinflightmean_Handler_S3Object_2478609D"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightmedian_Handler_S3Object_FB5CCD67": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/S3Object",
            "uniqueId": "root_testinflightmedian_Handler_S3Object_FB5CCD67"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightmode_Handler_S3Object_3F496665": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/S3Object",
            "uniqueId": "root_testinflightmode_Handler_S3Object_3F496665"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const math = require('@winglang/sdk').math;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const odd_arr_client = context._lift(odd_arr);
        const even_arr_client = context._lift(even_arr);
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            odd_arr: ${odd_arr_client},
            even_arr: ${even_arr_client},
            math_Util: ${math_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure1._registerBindObject(even_arr, host, []);
          $Closure1._registerBindObject(odd_arr, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(even_arr, host, []);
          $Closure1._registerBindObject(odd_arr, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const modal_arr_client = context._lift(modal_arr);
        const bimodal_client = context._lift(bimodal);
        const multimodal_client = context._lift(multimodal);
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            modal_arr: ${modal_arr_client},
            bimodal: ${bimodal_client},
            multimodal: ${multimodal_client},
            math_Util: ${math_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(bimodal, host, []);
          $Closure2._registerBindObject(modal_arr, host, []);
          $Closure2._registerBindObject(multimodal, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(bimodal, host, ["at"]);
          $Closure2._registerBindObject(modal_arr, host, []);
          $Closure2._registerBindObject(multimodal, host, ["at"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const mean_arr_client = context._lift(mean_arr);
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            mean_arr: ${mean_arr_client},
            math_Util: ${math_UtilClient.text},
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
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(mean_arr, host, []);
        }
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(mean_arr, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const odd_arr = Object.freeze([1, 3, 3, 6, 7, 8, 9]);
    {((cond) => {if (!cond) throw new Error("assertion failed: math.median(odd_arr) == 6")})(((math.Util.median(odd_arr)) === 6))};
    const even_arr = Object.freeze([1, 2, 3, 4, 5, 6, 8, 9]);
    {((cond) => {if (!cond) throw new Error("assertion failed: math.median(even_arr) == 4.5")})(((math.Util.median(even_arr)) === 4.5))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight median",new $Closure1(this,"$Closure1"));
    const modal_arr = Object.freeze([1, 2, 2, 3, 4, 7, 9]);
    {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((math.Util.mode(modal_arr)).at(0)) === 2))};
    const bimodal_arr = Object.freeze([1, 2, 2, 3, 4, 7, 7, 9, 7, 2]);
    const bimodal = (math.Util.mode(bimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})(((bimodal.at(0)) === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})(((bimodal.at(1)) === 7))};
    const multimodal_arr = Object.freeze([1, 3, 4, 7, 7, 9, 9, 2, 2]);
    const multimodal = (math.Util.mode(multimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})(((multimodal.at(0)) === 2))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})(((multimodal.at(1)) === 7))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})(((multimodal.at(2)) === 9))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight mode",new $Closure2(this,"$Closure2"));
    const mean_arr = Object.freeze([4, 36, 45, 50, 75]);
    {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})(((math.Util.arithmeticMean(mean_arr)) === 42))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})(((math.Util.geometricMean(mean_arr)) === 30))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})(((math.Util.harmonicMean(mean_arr)) === 15))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight mean",new $Closure3(this,"$Closure3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "median_mode_mean", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


# [median_mode_mean.w](../../../../../../examples/tests/sdk_tests/math/median_mode_mean.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $even_arr, $math_Util, $odd_arr }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.median(odd_arr) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.median($odd_arr)),6)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.median(even_arr) == 4.5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.median($even_arr)),4.5)))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-1.js
```js
module.exports = function({ $_bimodal_at_0__, $_bimodal_at_1__, $_multimodal_at_0__, $_multimodal_at_1__, $_multimodal_at_2__, $math_Util, $modal_arr }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await (await $math_Util.mode($modal_arr)).at(0)),2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_bimodal_at_0__,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_bimodal_at_1__,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_multimodal_at_0__,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_multimodal_at_1__,7)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($_multimodal_at_2__,9)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
module.exports = function({ $math_Util, $mean_arr }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.arithmeticMean($mean_arr)),42)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.geometricMean($mean_arr)),30)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $math_Util.harmonicMean($mean_arr)),15)))};
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
      "value": "[[\"root/Default/Default/test:inflight median\",\"${aws_lambda_function.testinflightmedian_Handler_B978E173.arn}\"],[\"root/Default/Default/test:inflight mode\",\"${aws_lambda_function.testinflightmode_Handler_72A19270.arn}\"],[\"root/Default/Default/test:inflight mean\",\"${aws_lambda_function.testinflightmean_Handler_8EC47095.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testinflightmean_Handler_IamRole_FBB742BC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/IamRole",
            "uniqueId": "testinflightmean_Handler_IamRole_FBB742BC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightmedian_Handler_IamRole_3B7DA0C5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/IamRole",
            "uniqueId": "testinflightmedian_Handler_IamRole_3B7DA0C5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightmode_Handler_IamRole_06517FF6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/IamRole",
            "uniqueId": "testinflightmode_Handler_IamRole_06517FF6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testinflightmean_Handler_IamRolePolicy_67540022": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/IamRolePolicy",
            "uniqueId": "testinflightmean_Handler_IamRolePolicy_67540022"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightmean_Handler_IamRole_FBB742BC.name}"
      },
      "testinflightmedian_Handler_IamRolePolicy_FF81B1E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/IamRolePolicy",
            "uniqueId": "testinflightmedian_Handler_IamRolePolicy_FF81B1E5"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightmedian_Handler_IamRole_3B7DA0C5.name}"
      },
      "testinflightmode_Handler_IamRolePolicy_CB816C3B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/IamRolePolicy",
            "uniqueId": "testinflightmode_Handler_IamRolePolicy_CB816C3B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightmode_Handler_IamRole_06517FF6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testinflightmean_Handler_IamRolePolicyAttachment_ED6C9099": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightmean_Handler_IamRolePolicyAttachment_ED6C9099"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightmean_Handler_IamRole_FBB742BC.name}"
      },
      "testinflightmedian_Handler_IamRolePolicyAttachment_48BFB0EF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightmedian_Handler_IamRolePolicyAttachment_48BFB0EF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightmedian_Handler_IamRole_3B7DA0C5.name}"
      },
      "testinflightmode_Handler_IamRolePolicyAttachment_FB3CC1BF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightmode_Handler_IamRolePolicyAttachment_FB3CC1BF"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightmode_Handler_IamRole_06517FF6.name}"
      }
    },
    "aws_lambda_function": {
      "testinflightmean_Handler_8EC47095": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/Default",
            "uniqueId": "testinflightmean_Handler_8EC47095"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c81bc5c0",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c81bc5c0",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightmean_Handler_IamRole_FBB742BC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightmean_Handler_S3Object_B038C877.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightmedian_Handler_B978E173": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/Default",
            "uniqueId": "testinflightmedian_Handler_B978E173"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8d95514",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d95514",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightmedian_Handler_IamRole_3B7DA0C5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightmedian_Handler_S3Object_24DB22D7.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightmode_Handler_72A19270": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/Default",
            "uniqueId": "testinflightmode_Handler_72A19270"
          }
        },
        "architectures": [
          "arm64"
        ],
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8c7e996",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8c7e996",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightmode_Handler_IamRole_06517FF6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightmode_Handler_S3Object_48CE9E2C.key}",
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
      "testinflightmean_Handler_S3Object_B038C877": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mean/Handler/S3Object",
            "uniqueId": "testinflightmean_Handler_S3Object_B038C877"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightmedian_Handler_S3Object_24DB22D7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight median/Handler/S3Object",
            "uniqueId": "testinflightmedian_Handler_S3Object_24DB22D7"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightmode_Handler_S3Object_48CE9E2C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight mode/Handler/S3Object",
            "uniqueId": "testinflightmode_Handler_S3Object_48CE9E2C"
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
const math = $stdlib.math;
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
            $even_arr: ${context._lift(even_arr)},
            $math_Util: ${context._lift(math.Util)},
            $odd_arr: ${context._lift(odd_arr)},
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
          $Closure1._registerBindObject(even_arr, host, []);
          $Closure1._registerBindObject(odd_arr, host, []);
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
            $_bimodal_at_0__: ${context._lift((bimodal.at(0)))},
            $_bimodal_at_1__: ${context._lift((bimodal.at(1)))},
            $_multimodal_at_0__: ${context._lift((multimodal.at(0)))},
            $_multimodal_at_1__: ${context._lift((multimodal.at(1)))},
            $_multimodal_at_2__: ${context._lift((multimodal.at(2)))},
            $math_Util: ${context._lift(math.Util)},
            $modal_arr: ${context._lift(modal_arr)},
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
          $Closure2._registerBindObject((bimodal.at(0)), host, []);
          $Closure2._registerBindObject((bimodal.at(1)), host, []);
          $Closure2._registerBindObject((multimodal.at(0)), host, []);
          $Closure2._registerBindObject((multimodal.at(1)), host, []);
          $Closure2._registerBindObject((multimodal.at(2)), host, []);
          $Closure2._registerBindObject(modal_arr, host, ["at"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
            $math_Util: ${context._lift(math.Util)},
            $mean_arr: ${context._lift(mean_arr)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
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
          $Closure3._registerBindObject(mean_arr, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const odd_arr = [1, 3, 3, 6, 7, 8, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.median(odd_arr) == 6")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.median(odd_arr)),6)))};
    const even_arr = [1, 2, 3, 4, 5, 6, 8, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.median(even_arr) == 4.5")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.median(even_arr)),4.5)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight median",new $Closure1(this,"$Closure1"));
    const modal_arr = [1, 2, 2, 3, 4, 7, 9];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.mode(modal_arr).at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((math.Util.mode(modal_arr)).at(0)),2)))};
    const bimodal_arr = [1, 2, 2, 3, 4, 7, 7, 9, 7, 2];
    const bimodal = (math.Util.mode(bimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((bimodal.at(0)),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: bimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((bimodal.at(1)),7)))};
    const multimodal_arr = [1, 3, 4, 7, 7, 9, 9, 2, 2];
    const multimodal = (math.Util.mode(multimodal_arr));
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(0) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((multimodal.at(0)),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(1) == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((multimodal.at(1)),7)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: multimodal.at(2) == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((multimodal.at(2)),9)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight mode",new $Closure2(this,"$Closure2"));
    const mean_arr = [4, 36, 45, 50, 75];
    {((cond) => {if (!cond) throw new Error("assertion failed: math.arithmeticMean(mean_arr) == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.arithmeticMean(mean_arr)),42)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.geometricMean(mean_arr) == 30")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.geometricMean(mean_arr)),30)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.harmonicMean(mean_arr) == 15")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((math.Util.harmonicMean(mean_arr)),15)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight mean",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "median_mode_mean", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


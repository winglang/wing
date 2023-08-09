# [symbol_shadow.w](../../../../../examples/tests/valid/symbol_shadow.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $s }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inner\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s,"inner")))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $s }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inResource\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s,"inResource")))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $s }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"top\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($s,"top")))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const s = "insideInflight";
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"insideInflight\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"insideInflight")))};
    }
  }
  return $Closure4;
}

```

## inflight.A.js
```js
module.exports = function({  }) {
  class A {
    constructor({  }) {
    }
  }
  return A;
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
      "value": "[[\"root/undefined/Default/test:inflight nested should not capture the shadowed var\",\"${aws_lambda_function.undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_74A220C8.arn}\"],[\"root/undefined/Default/A/test:inflight in resource should capture the right scoped var\",\"${aws_lambda_function.undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_0BD6632A.arn}\"],[\"root/undefined/Default/test:inflight on top should capture top\",\"${aws_lambda_function.undefined_testinflightontopshouldcapturetop_Handler_F377C00C.arn}\"],[\"root/undefined/Default/test:insideInflight should capture the right scope\",\"${aws_lambda_function.undefined_testinsideInflightshouldcapturetherightscope_Handler_D935AC19.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_DFC14280": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRole",
            "uniqueId": "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_DFC14280"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_216E7FF8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight nested should not capture the shadowed var/Handler/IamRole",
            "uniqueId": "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_216E7FF8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinflightontopshouldcapturetop_Handler_IamRole_1B6C1256": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight on top should capture top/Handler/IamRole",
            "uniqueId": "undefined_testinflightontopshouldcapturetop_Handler_IamRole_1B6C1256"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRole_30B4EC8F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:insideInflight should capture the right scope/Handler/IamRole",
            "uniqueId": "undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRole_30B4EC8F"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicy_A75F3EBC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRolePolicy",
            "uniqueId": "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicy_A75F3EBC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_DFC14280.name}"
      },
      "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicy_84DA136A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight nested should not capture the shadowed var/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicy_84DA136A"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_216E7FF8.name}"
      },
      "undefined_testinflightontopshouldcapturetop_Handler_IamRolePolicy_46052027": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight on top should capture top/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightontopshouldcapturetop_Handler_IamRolePolicy_46052027"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinflightontopshouldcapturetop_Handler_IamRole_1B6C1256.name}"
      },
      "undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicy_FC59C4BC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:insideInflight should capture the right scope/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicy_FC59C4BC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRole_30B4EC8F.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicyAttachment_7E22F4E2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicyAttachment_7E22F4E2"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_DFC14280.name}"
      },
      "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicyAttachment_EDC20D3F": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight nested should not capture the shadowed var/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicyAttachment_EDC20D3F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_216E7FF8.name}"
      },
      "undefined_testinflightontopshouldcapturetop_Handler_IamRolePolicyAttachment_AF057782": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight on top should capture top/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightontopshouldcapturetop_Handler_IamRolePolicyAttachment_AF057782"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightontopshouldcapturetop_Handler_IamRole_1B6C1256.name}"
      },
      "undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicyAttachment_B53CD3F8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:insideInflight should capture the right scope/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicyAttachment_B53CD3F8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRole_30B4EC8F.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_0BD6632A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/test:inflight in resource should capture the right scoped var/Handler/Default",
            "uniqueId": "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_0BD6632A"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8a67d98",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8a67d98",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_DFC14280.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_9D91AA04.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_74A220C8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight nested should not capture the shadowed var/Handler/Default",
            "uniqueId": "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_74A220C8"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8576ffd",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8576ffd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_216E7FF8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_B703941D.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinflightontopshouldcapturetop_Handler_F377C00C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight on top should capture top/Handler/Default",
            "uniqueId": "undefined_testinflightontopshouldcapturetop_Handler_F377C00C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c82d306a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c82d306a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightontopshouldcapturetop_Handler_IamRole_1B6C1256.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightontopshouldcapturetop_Handler_S3Object_D06FBAA3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinsideInflightshouldcapturetherightscope_Handler_D935AC19": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:insideInflight should capture the right scope/Handler/Default",
            "uniqueId": "undefined_testinsideInflightshouldcapturetherightscope_Handler_D935AC19"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8132fd4",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8132fd4",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinsideInflightshouldcapturetherightscope_Handler_IamRole_30B4EC8F.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinsideInflightshouldcapturetherightscope_Handler_S3Object_19313F90.key}",
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
      "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_9D91AA04": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/A/test:inflight in resource should capture the right scoped var/Handler/S3Object",
            "uniqueId": "undefined_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_9D91AA04"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_B703941D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight nested should not capture the shadowed var/Handler/S3Object",
            "uniqueId": "undefined_testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_B703941D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinflightontopshouldcapturetop_Handler_S3Object_D06FBAA3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflight on top should capture top/Handler/S3Object",
            "uniqueId": "undefined_testinflightontopshouldcapturetop_Handler_S3Object_D06FBAA3"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinsideInflightshouldcapturetherightscope_Handler_S3Object_19313F90": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:insideInflight should capture the right scope/Handler/S3Object",
            "uniqueId": "undefined_testinsideInflightshouldcapturetherightscope_Handler_S3Object_19313F90"
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
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        const s = "inResource";
        {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inResource\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"inResource")))};
        const __parent_this_2 = this;
        class $Closure2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure2.js")({
                $s: ${context._lift(s)},
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
              $Closure2._registerBindObject(s, host, []);
            }
            super._registerBind(host, ops);
          }
        }
        this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight in resource should capture the right scoped var",new $Closure2(this,"$Closure2"));
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.A.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AClient = ${A._toInflightType(this).text};
            const client = new AClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
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
            $s: ${context._lift(s)},
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
          $Closure3._registerBindObject(s, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure4.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this).text};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error("assertion failed: s == \"inner\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"inner")))};
      class $Closure1 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this._addInflightOps("handle", "$inflight_init");
          this.display.hidden = true;
        }
        static _toInflightType(context) {
          return $stdlib.core.NodeJsCode.fromInline(`
            require("./inflight.$Closure1.js")({
              $s: ${context._lift(s)},
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
            $Closure1._registerBindObject(s, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight nested should not capture the shadowed var",new $Closure1(this,"$Closure1"));
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: s == \"top\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"top")))};
    new A(this,"A");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight on top should capture top",new $Closure3(this,"$Closure3"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:insideInflight should capture the right scope",new $Closure4(this,"$Closure4"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "symbol_shadow", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


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
      "value": "[[\"root/Default/Default/test:inflight nested should not capture the shadowed var\",\"${aws_lambda_function.testinflightnestedshouldnotcapturetheshadowedvar_Handler_B6B64A92.arn}\"],[\"root/Default/Default/A/test:inflight in resource should capture the right scoped var\",\"${aws_lambda_function.A_testinflightinresourceshouldcapturetherightscopedvar_Handler_B24941AC.arn}\"],[\"root/Default/Default/test:inflight on top should capture top\",\"${aws_lambda_function.testinflightontopshouldcapturetop_Handler_2FA69946.arn}\"],[\"root/Default/Default/test:insideInflight should capture the right scope\",\"${aws_lambda_function.testinsideInflightshouldcapturetherightscope_Handler_B6CD7A27.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_1B8C5D92": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRole",
            "uniqueId": "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_1B8C5D92"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_4E805AD6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/IamRole",
            "uniqueId": "testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_4E805AD6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightontopshouldcapturetop_Handler_IamRole_3F6ED89E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/IamRole",
            "uniqueId": "testinflightontopshouldcapturetop_Handler_IamRole_3F6ED89E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinsideInflightshouldcapturetherightscope_Handler_IamRole_68806A2A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/IamRole",
            "uniqueId": "testinsideInflightshouldcapturetherightscope_Handler_IamRole_68806A2A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicy_7ED77FBA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRolePolicy",
            "uniqueId": "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicy_7ED77FBA"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_1B8C5D92.name}"
      },
      "testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicy_D1F0410E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/IamRolePolicy",
            "uniqueId": "testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicy_D1F0410E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_4E805AD6.name}"
      },
      "testinflightontopshouldcapturetop_Handler_IamRolePolicy_CE46FF27": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/IamRolePolicy",
            "uniqueId": "testinflightontopshouldcapturetop_Handler_IamRolePolicy_CE46FF27"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinflightontopshouldcapturetop_Handler_IamRole_3F6ED89E.name}"
      },
      "testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicy_8063B708": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/IamRolePolicy",
            "uniqueId": "testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicy_8063B708"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.testinsideInflightshouldcapturetherightscope_Handler_IamRole_68806A2A.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicyAttachment_88515E85": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRolePolicyAttachment",
            "uniqueId": "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicyAttachment_88515E85"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_1B8C5D92.name}"
      },
      "testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicyAttachment_275CF4CA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicyAttachment_275CF4CA"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_4E805AD6.name}"
      },
      "testinflightontopshouldcapturetop_Handler_IamRolePolicyAttachment_06A23599": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightontopshouldcapturetop_Handler_IamRolePolicyAttachment_06A23599"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightontopshouldcapturetop_Handler_IamRole_3F6ED89E.name}"
      },
      "testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicyAttachment_BC3E6BBC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicyAttachment_BC3E6BBC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinsideInflightshouldcapturetherightscope_Handler_IamRole_68806A2A.name}"
      }
    },
    "aws_lambda_function": {
      "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_B24941AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/Default",
            "uniqueId": "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_B24941AC"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83cf74f",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83cf74f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_1B8C5D92.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_4A934D35.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightnestedshouldnotcapturetheshadowedvar_Handler_B6B64A92": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/Default",
            "uniqueId": "testinflightnestedshouldnotcapturetheshadowedvar_Handler_B6B64A92"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85de384",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c85de384",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_4E805AD6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_0B718409.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightontopshouldcapturetop_Handler_2FA69946": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/Default",
            "uniqueId": "testinflightontopshouldcapturetop_Handler_2FA69946"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c859340a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c859340a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightontopshouldcapturetop_Handler_IamRole_3F6ED89E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightontopshouldcapturetop_Handler_S3Object_BEFBAAC0.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinsideInflightshouldcapturetherightscope_Handler_B6CD7A27": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/Default",
            "uniqueId": "testinsideInflightshouldcapturetherightscope_Handler_B6CD7A27"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83ad462",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c83ad462",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinsideInflightshouldcapturetherightscope_Handler_IamRole_68806A2A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinsideInflightshouldcapturetherightscope_Handler_S3Object_C92529CD.key}",
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
      "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_4A934D35": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/S3Object",
            "uniqueId": "A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_4A934D35"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_0B718409": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/S3Object",
            "uniqueId": "testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_0B718409"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightontopshouldcapturetop_Handler_S3Object_BEFBAAC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/S3Object",
            "uniqueId": "testinflightontopshouldcapturetop_Handler_S3Object_BEFBAAC0"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinsideInflightshouldcapturetherightscope_Handler_S3Object_C92529CD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/S3Object",
            "uniqueId": "testinsideInflightshouldcapturetherightscope_Handler_S3Object_C92529CD"
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
new $App({ outdir: $outdir, name: "symbol_shadow", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```


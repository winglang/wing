# [symbol_shadow.w](../../../../examples/tests/valid/symbol_shadow.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ s }) {
  class  $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ s }) {
  class  $Inflight2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inResource")'`)})((s === "inResource"))};
      }
    }
  }
  return $Inflight2;
}

```

## clients/$Inflight3.inflight.js
```js
module.exports = function({ s }) {
  class  $Inflight3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "top")'`)})((s === "top"))};
      }
    }
  }
  return $Inflight3;
}

```

## clients/$Inflight4.inflight.js
```js
module.exports = function({  }) {
  class  $Inflight4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {
        const s = "insideInflight";
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "insideInflight")'`)})((s === "insideInflight"))};
      }
    }
  }
  return $Inflight4;
}

```

## clients/A.inflight.js
```js
module.exports = function({  }) {
  class  A {
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
      "value": "[[\"root/Default/Default/test:inflight nested should not capture the shadowed var\",\"${aws_lambda_function.root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_2C79484F.arn}\"],[\"root/Default/Default/A/test:inflight in resource should capture the right scoped var\",\"${aws_lambda_function.root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_2930F157.arn}\"],[\"root/Default/Default/test:inflight on top should capture top\",\"${aws_lambda_function.root_testinflightontopshouldcapturetop_Handler_873D3B44.arn}\"],[\"root/Default/Default/test:insideInflight should capture the right scope\",\"${aws_lambda_function.root_testinsideInflightshouldcapturetherightscope_Handler_545DD24C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_D7DE3B7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRole",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_D7DE3B7A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_5B6FFB06": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/IamRole",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_5B6FFB06"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightontopshouldcapturetop_Handler_IamRole_E03A05A3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/IamRole",
            "uniqueId": "root_testinflightontopshouldcapturetop_Handler_IamRole_E03A05A3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinsideInflightshouldcapturetherightscope_Handler_IamRole_A68B21D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/IamRole",
            "uniqueId": "root_testinsideInflightshouldcapturetherightscope_Handler_IamRole_A68B21D4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicy_3007FE65": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRolePolicy",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicy_3007FE65"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_D7DE3B7A.name}"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicy_FC48F6E8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicy_FC48F6E8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_5B6FFB06.name}"
      },
      "root_testinflightontopshouldcapturetop_Handler_IamRolePolicy_43EAFC9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightontopshouldcapturetop_Handler_IamRolePolicy_43EAFC9C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightontopshouldcapturetop_Handler_IamRole_E03A05A3.name}"
      },
      "root_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicy_B5DC5F07": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/IamRolePolicy",
            "uniqueId": "root_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicy_B5DC5F07"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinsideInflightshouldcapturetherightscope_Handler_IamRole_A68B21D4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicyAttachment_C898816D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRolePolicyAttachment_C898816D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_D7DE3B7A.name}"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicyAttachment_22C793F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRolePolicyAttachment_22C793F4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_5B6FFB06.name}"
      },
      "root_testinflightontopshouldcapturetop_Handler_IamRolePolicyAttachment_28E2F460": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightontopshouldcapturetop_Handler_IamRolePolicyAttachment_28E2F460"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightontopshouldcapturetop_Handler_IamRole_E03A05A3.name}"
      },
      "root_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicyAttachment_99838FF4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinsideInflightshouldcapturetherightscope_Handler_IamRolePolicyAttachment_99838FF4"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinsideInflightshouldcapturetherightscope_Handler_IamRole_A68B21D4.name}"
      }
    },
    "aws_lambda_function": {
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_2930F157": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/Default",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_2930F157"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83cf74f"
          }
        },
        "function_name": "Handler-c83cf74f",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_IamRole_D7DE3B7A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_4E0622FA.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_2C79484F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/Default",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_2C79484F"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c85de384"
          }
        },
        "function_name": "Handler-c85de384",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_IamRole_5B6FFB06.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_A14E3811.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightontopshouldcapturetop_Handler_873D3B44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/Default",
            "uniqueId": "root_testinflightontopshouldcapturetop_Handler_873D3B44"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c859340a"
          }
        },
        "function_name": "Handler-c859340a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightontopshouldcapturetop_Handler_IamRole_E03A05A3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightontopshouldcapturetop_Handler_S3Object_FC7D5692.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinsideInflightshouldcapturetherightscope_Handler_545DD24C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/Default",
            "uniqueId": "root_testinsideInflightshouldcapturetherightscope_Handler_545DD24C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c83ad462"
          }
        },
        "function_name": "Handler-c83ad462",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinsideInflightshouldcapturetherightscope_Handler_IamRole_A68B21D4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinsideInflightshouldcapturetherightscope_Handler_S3Object_3F86975E.key}",
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
      "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_4E0622FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/A/test:inflight in resource should capture the right scoped var/Handler/S3Object",
            "uniqueId": "root_A_testinflightinresourceshouldcapturetherightscopedvar_Handler_S3Object_4E0622FA"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_A14E3811": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight nested should not capture the shadowed var/Handler/S3Object",
            "uniqueId": "root_testinflightnestedshouldnotcapturetheshadowedvar_Handler_S3Object_A14E3811"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightontopshouldcapturetop_Handler_S3Object_FC7D5692": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight on top should capture top/Handler/S3Object",
            "uniqueId": "root_testinflightontopshouldcapturetop_Handler_S3Object_FC7D5692"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinsideInflightshouldcapturetherightscope_Handler_S3Object_3F86975E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:insideInflight should capture the right scope/Handler/S3Object",
            "uniqueId": "root_testinsideInflightshouldcapturetherightscope_Handler_S3Object_3F86975E"
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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class A extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        const s = "inResource";
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inResource")'`)})((s === "inResource"))};
        class $Inflight2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
            const s_client = context._lift(s);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                s: ${s_client},
              })
            `);
          }
          _toInflight() {
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight2Client = ${$Inflight2._toInflightType(this).text};
                const client = new $Inflight2Client({
                });
                if (client.$inflight_init) { await client.$inflight_init(); }
                return client;
              })())
            `);
          }
          _registerBind(host, ops) {
            if (ops.includes("$inflight_init")) {
              $Inflight2._registerBindObject(s, host, []);
            }
            if (ops.includes("handle")) {
              $Inflight2._registerBindObject(s, host, []);
            }
            super._registerBind(host, ops);
          }
        }
        this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:inflight in resource should capture the right scoped var",new $Inflight2(this,"$Inflight2"));
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/A.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
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
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight3.inflight.js".replace(/\\/g, "/");
        const s_client = context._lift(s);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            s: ${s_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight3Client = ${$Inflight3._toInflightType(this).text};
            const client = new $Inflight3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Inflight3._registerBindObject(s, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight3._registerBindObject(s, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight4.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Inflight4Client = ${$Inflight4._toInflightType(this).text};
            const client = new $Inflight4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    const s = "top";
    if (true) {
      const s = "inner";
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "inner")'`)})((s === "inner"))};
      class $Inflight1 extends $stdlib.std.Resource {
        constructor(scope, id, ) {
          super(scope, id);
          this._addInflightOps("handle");
          this.display.hidden = true;
        }
        static _toInflightType(context) {
          const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
          const s_client = context._lift(s);
          return $stdlib.core.NodeJsCode.fromInline(`
            require("${self_client_path}")({
              s: ${s_client},
            })
          `);
        }
        _toInflight() {
          return $stdlib.core.NodeJsCode.fromInline(`
            (await (async () => {
              const $Inflight1Client = ${$Inflight1._toInflightType(this).text};
              const client = new $Inflight1Client({
              });
              if (client.$inflight_init) { await client.$inflight_init(); }
              return client;
            })())
          `);
        }
        _registerBind(host, ops) {
          if (ops.includes("$inflight_init")) {
            $Inflight1._registerBindObject(s, host, []);
          }
          if (ops.includes("handle")) {
            $Inflight1._registerBindObject(s, host, []);
          }
          super._registerBind(host, ops);
        }
      }
      this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:inflight nested should not capture the shadowed var",new $Inflight1(this,"$Inflight1"));
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "top")'`)})((s === "top"))};
    new A(this,"A");
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:inflight on top should capture top",new $Inflight3(this,"$Inflight3"));
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:insideInflight should capture the right scope",new $Inflight4(this,"$Inflight4"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "symbol_shadow", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


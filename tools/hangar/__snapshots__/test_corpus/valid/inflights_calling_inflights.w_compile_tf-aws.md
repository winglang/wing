# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | compile | tf-aws

## inflight.$Closure1-4496f831.js
```js
module.exports = function({ $globalBucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event, file) {
      (await $globalBucket.put(file,event));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2-4496f831.js
```js
module.exports = function({ $storeInBucket }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(event) {
      (await $storeInBucket(event,"file1"));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-4496f831.js
```js
module.exports = function({ $func1, $globalBucket }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $func1.invoke("hi1"));
      {((cond) => {if (!cond) throw new Error("assertion failed: globalBucket.get(\"file1\") == \"hi1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $globalBucket.get("file1")),"hi1")))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-4496f831.js
```js
module.exports = function({ $globalBucket }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(s) {
      (await $globalBucket.list());
      return "hello";
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-4496f831.js
```js
module.exports = function({ $x }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const val = (await $x.foo());
      {((cond) => {if (!cond) throw new Error("assertion failed: val == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(val,"hello")))};
    }
  }
  return $Closure5;
}

```

## inflight.MyResource-4496f831.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ $this_closure }) {
      this.$this_closure = $this_closure;
    }
    async foo() {
      return (await this.$this_closure("anything"));
    }
  }
  return MyResource;
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
      "value": "[[\"root/Default/Default/test:inflights can call other inflights\",\"${aws_lambda_function.testinflightscancallotherinflights_Handler_90705AE1.arn}\"],[\"root/Default/Default/test:variable can be an inflight closure\",\"${aws_lambda_function.testvariablecanbeaninflightclosure_Handler_E55D136A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "func1_IamRole_31EC29DC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRole",
            "uniqueId": "func1_IamRole_31EC29DC"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testinflightscancallotherinflights_Handler_IamRole_30D96E98": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/IamRole",
            "uniqueId": "testinflightscancallotherinflights_Handler_IamRole_30D96E98"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testvariablecanbeaninflightclosure_Handler_IamRole_12408457": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/IamRole",
            "uniqueId": "testvariablecanbeaninflightclosure_Handler_IamRole_12408457"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "func1_IamRolePolicy_B533BD74": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRolePolicy",
            "uniqueId": "func1_IamRolePolicy_B533BD74"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.func1_IamRole_31EC29DC.name}"
      },
      "testinflightscancallotherinflights_Handler_IamRolePolicy_1E6CC29C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/IamRolePolicy",
            "uniqueId": "testinflightscancallotherinflights_Handler_IamRolePolicy_1E6CC29C"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.func1.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testinflightscancallotherinflights_Handler_IamRole_30D96E98.name}"
      },
      "testvariablecanbeaninflightclosure_Handler_IamRolePolicy_B1660864": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/IamRolePolicy",
            "uniqueId": "testvariablecanbeaninflightclosure_Handler_IamRolePolicy_B1660864"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testvariablecanbeaninflightclosure_Handler_IamRole_12408457.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "func1_IamRolePolicyAttachment_347CFCA0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRolePolicyAttachment",
            "uniqueId": "func1_IamRolePolicyAttachment_347CFCA0"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.func1_IamRole_31EC29DC.name}"
      },
      "testinflightscancallotherinflights_Handler_IamRolePolicyAttachment_C2809755": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/IamRolePolicyAttachment",
            "uniqueId": "testinflightscancallotherinflights_Handler_IamRolePolicyAttachment_C2809755"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testinflightscancallotherinflights_Handler_IamRole_30D96E98.name}"
      },
      "testvariablecanbeaninflightclosure_Handler_IamRolePolicyAttachment_3CD3586A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "testvariablecanbeaninflightclosure_Handler_IamRolePolicyAttachment_3CD3586A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testvariablecanbeaninflightclosure_Handler_IamRole_12408457.name}"
      }
    },
    "aws_lambda_function": {
      "func1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/Default",
            "uniqueId": "func1"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "func1-c899062d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "func1-c899062d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.func1_IamRole_31EC29DC.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.func1_S3Object_33D0CBF3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testinflightscancallotherinflights_Handler_90705AE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/Default",
            "uniqueId": "testinflightscancallotherinflights_Handler_90705AE1"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "FUNCTION_NAME_c79d5cd4": "${aws_lambda_function.func1.arn}",
            "WING_FUNCTION_NAME": "Handler-c8ad4c02",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ad4c02",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testinflightscancallotherinflights_Handler_IamRole_30D96E98.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testinflightscancallotherinflights_Handler_S3Object_D58857F2.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testvariablecanbeaninflightclosure_Handler_E55D136A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/Default",
            "uniqueId": "testvariablecanbeaninflightclosure_Handler_E55D136A"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8210662",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8210662",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testvariablecanbeaninflightclosure_Handler_IamRole_12408457.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testvariablecanbeaninflightclosure_Handler_S3Object_11B4C449.key}",
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
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "cloudBucket_PublicAccessBlock_5946CCE8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "cloudBucket_PublicAccessBlock_5946CCE8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "cloudBucket_Encryption_77B6AEEF": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "cloudBucket_Encryption_77B6AEEF"
          }
        },
        "bucket": "${aws_s3_bucket.cloudBucket.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "func1_S3Object_33D0CBF3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/S3Object",
            "uniqueId": "func1_S3Object_33D0CBF3"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testinflightscancallotherinflights_Handler_S3Object_D58857F2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/S3Object",
            "uniqueId": "testinflightscancallotherinflights_Handler_S3Object_D58857F2"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testvariablecanbeaninflightclosure_Handler_S3Object_11B4C449": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/S3Object",
            "uniqueId": "testvariablecanbeaninflightclosure_Handler_S3Object_11B4C449"
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
          require("./inflight.$Closure1-4496f831.js")({
            $globalBucket: ${context._lift(globalBucket)},
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
          $Closure1._registerBindObject(globalBucket, host, ["put"]);
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
          require("./inflight.$Closure2-4496f831.js")({
            $storeInBucket: ${context._lift(storeInBucket)},
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
          $Closure2._registerBindObject(storeInBucket, host, ["handle"]);
        }
        super._registerBind(host, ops);
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
          require("./inflight.$Closure3-4496f831.js")({
            $func1: ${context._lift(func1)},
            $globalBucket: ${context._lift(globalBucket)},
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
          $Closure3._registerBindObject(func1, host, ["invoke"]);
          $Closure3._registerBindObject(globalBucket, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("foo", "$inflight_init");
        const __parent_this_4 = this;
        class $Closure4 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure4-4496f831.js")({
                $globalBucket: ${context._lift(globalBucket)},
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
          _registerBind(host, ops) {
            if (ops.includes("handle")) {
              $Closure4._registerBindObject(globalBucket, host, ["list"]);
            }
            super._registerBind(host, ops);
          }
        }
        this.closure = new $Closure4(this,"$Closure4");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyResource-4496f831.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              $this_closure: ${this._lift(this.closure)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.closure, host, []);
        }
        if (ops.includes("foo")) {
          MyResource._registerBindObject(this.closure, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure5-4496f831.js")({
            $x: ${context._lift(x)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this).text};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure5._registerBindObject(x, host, ["foo"]);
        }
        super._registerBind(host, ops);
      }
    }
    const globalBucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const storeInBucket = new $Closure1(this,"$Closure1");
    const handler1 = new $Closure2(this,"$Closure2");
    const func1 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"func1",handler1);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflights can call other inflights",new $Closure3(this,"$Closure3"));
    const x = new MyResource(this,"MyResource");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:variable can be an inflight closure",new $Closure5(this,"$Closure5"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "inflights_calling_inflights", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


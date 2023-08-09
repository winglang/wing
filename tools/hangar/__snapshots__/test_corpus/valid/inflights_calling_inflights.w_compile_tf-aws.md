# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | compile | tf-aws

## inflight.$Closure1.js
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

## inflight.$Closure2.js
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

## inflight.$Closure3.js
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

## inflight.$Closure4.js
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

## inflight.$Closure5.js
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

## inflight.MyResource.js
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
      "value": "[[\"root/undefined/Default/test:inflights can call other inflights\",\"${aws_lambda_function.undefined_testinflightscancallotherinflights_Handler_DD41DE00.arn}\"],[\"root/undefined/Default/test:variable can be an inflight closure\",\"${aws_lambda_function.undefined_testvariablecanbeaninflightclosure_Handler_F33CF321.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_func1_IamRole_508B1D80": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func1/IamRole",
            "uniqueId": "undefined_func1_IamRole_508B1D80"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testinflightscancallotherinflights_Handler_IamRole_D8351A8A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflights can call other inflights/Handler/IamRole",
            "uniqueId": "undefined_testinflightscancallotherinflights_Handler_IamRole_D8351A8A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testvariablecanbeaninflightclosure_Handler_IamRole_65F54BB7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:variable can be an inflight closure/Handler/IamRole",
            "uniqueId": "undefined_testvariablecanbeaninflightclosure_Handler_IamRole_65F54BB7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_func1_IamRolePolicy_58A05A31": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func1/IamRolePolicy",
            "uniqueId": "undefined_func1_IamRolePolicy_58A05A31"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_func1_IamRole_508B1D80.name}"
      },
      "undefined_testinflightscancallotherinflights_Handler_IamRolePolicy_30079AD0": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflights can call other inflights/Handler/IamRolePolicy",
            "uniqueId": "undefined_testinflightscancallotherinflights_Handler_IamRolePolicy_30079AD0"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.undefined_func1_5748CEB8.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testinflightscancallotherinflights_Handler_IamRole_D8351A8A.name}"
      },
      "undefined_testvariablecanbeaninflightclosure_Handler_IamRolePolicy_3C27F4B6": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:variable can be an inflight closure/Handler/IamRolePolicy",
            "uniqueId": "undefined_testvariablecanbeaninflightclosure_Handler_IamRolePolicy_3C27F4B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testvariablecanbeaninflightclosure_Handler_IamRole_65F54BB7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_func1_IamRolePolicyAttachment_CDE70B06": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func1/IamRolePolicyAttachment",
            "uniqueId": "undefined_func1_IamRolePolicyAttachment_CDE70B06"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_func1_IamRole_508B1D80.name}"
      },
      "undefined_testinflightscancallotherinflights_Handler_IamRolePolicyAttachment_D7ADD7A1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflights can call other inflights/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testinflightscancallotherinflights_Handler_IamRolePolicyAttachment_D7ADD7A1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testinflightscancallotherinflights_Handler_IamRole_D8351A8A.name}"
      },
      "undefined_testvariablecanbeaninflightclosure_Handler_IamRolePolicyAttachment_8514DE79": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:variable can be an inflight closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testvariablecanbeaninflightclosure_Handler_IamRolePolicyAttachment_8514DE79"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testvariablecanbeaninflightclosure_Handler_IamRole_65F54BB7.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_func1_5748CEB8": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func1/Default",
            "uniqueId": "undefined_func1_5748CEB8"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "func1-c80cc4dc",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "func1-c80cc4dc",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_func1_IamRole_508B1D80.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_func1_S3Object_828A33E1.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testinflightscancallotherinflights_Handler_DD41DE00": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflights can call other inflights/Handler/Default",
            "uniqueId": "undefined_testinflightscancallotherinflights_Handler_DD41DE00"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "FUNCTION_NAME_889ac0f2": "${aws_lambda_function.undefined_func1_5748CEB8.arn}",
            "WING_FUNCTION_NAME": "Handler-c8f1edc3",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f1edc3",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testinflightscancallotherinflights_Handler_IamRole_D8351A8A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testinflightscancallotherinflights_Handler_S3Object_A2569F78.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testvariablecanbeaninflightclosure_Handler_F33CF321": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:variable can be an inflight closure/Handler/Default",
            "uniqueId": "undefined_testvariablecanbeaninflightclosure_Handler_F33CF321"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8f6af9d",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8f6af9d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testvariablecanbeaninflightclosure_Handler_IamRole_65F54BB7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testvariablecanbeaninflightclosure_Handler_S3Object_EFAD0EED.key}",
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
      },
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      "undefined_func1_S3Object_828A33E1": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/func1/S3Object",
            "uniqueId": "undefined_func1_S3Object_828A33E1"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testinflightscancallotherinflights_Handler_S3Object_A2569F78": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:inflights can call other inflights/Handler/S3Object",
            "uniqueId": "undefined_testinflightscancallotherinflights_Handler_S3Object_A2569F78"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testvariablecanbeaninflightclosure_Handler_S3Object_EFAD0EED": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:variable can be an inflight closure/Handler/S3Object",
            "uniqueId": "undefined_testvariablecanbeaninflightclosure_Handler_S3Object_EFAD0EED"
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
          require("./inflight.$Closure2.js")({
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
          require("./inflight.$Closure3.js")({
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
              require("./inflight.$Closure4.js")({
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
          require("./inflight.MyResource.js")({
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
          require("./inflight.$Closure5.js")({
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


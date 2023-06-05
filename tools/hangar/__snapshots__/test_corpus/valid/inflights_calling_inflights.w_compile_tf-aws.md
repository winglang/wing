# [inflights_calling_inflights.w](../../../../../examples/tests/valid/inflights_calling_inflights.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ globalBucket }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(event, file)  {
      (await globalBucket.put(file,event));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ storeInBucket }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(event)  {
      (await storeInBucket(event,"file1"));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ func1, globalBucket }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await func1.invoke("hi1"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await globalBucket.get("file1")) === "hi1")'`)})(((await globalBucket.get("file1")) === "hi1"))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4.js
```js
module.exports = function({ globalBucket }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(s)  {
      (await globalBucket.list());
      return "hello";
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5.js
```js
module.exports = function({ x }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const val = (await x.foo());
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(val === "hello")'`)})((val === "hello"))};
    }
  }
  return $Closure5;
}

```

## inflight.MyResource.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ closure }) {
      this.closure = closure;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async foo()  {
      const __parent_this = this;
      return (await this.closure("anything"));
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
      "value": "[[\"root/Default/Default/test:inflights can call other inflights\",\"${aws_lambda_function.root_testinflightscancallotherinflights_Handler_2A3BE1A9.arn}\"],[\"root/Default/Default/test:variable can be an inflight closure\",\"${aws_lambda_function.root_testvariablecanbeaninflightclosure_Handler_2A5E84C6.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_func1_IamRole_D5C6999E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRole",
            "uniqueId": "root_func1_IamRole_D5C6999E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testinflightscancallotherinflights_Handler_IamRole_BB2EB09E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/IamRole",
            "uniqueId": "root_testinflightscancallotherinflights_Handler_IamRole_BB2EB09E"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testvariablecanbeaninflightclosure_Handler_IamRole_507C37DB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/IamRole",
            "uniqueId": "root_testvariablecanbeaninflightclosure_Handler_IamRole_507C37DB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_func1_IamRolePolicy_85554F29": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRolePolicy",
            "uniqueId": "root_func1_IamRolePolicy_85554F29"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_func1_IamRole_D5C6999E.name}"
      },
      "root_testinflightscancallotherinflights_Handler_IamRolePolicy_9ADCA787": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightscancallotherinflights_Handler_IamRolePolicy_9ADCA787"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_func1_52D4D9D4.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testinflightscancallotherinflights_Handler_IamRole_BB2EB09E.name}"
      },
      "root_testvariablecanbeaninflightclosure_Handler_IamRolePolicy_1E567808": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/IamRolePolicy",
            "uniqueId": "root_testvariablecanbeaninflightclosure_Handler_IamRolePolicy_1E567808"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testvariablecanbeaninflightclosure_Handler_IamRole_507C37DB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_func1_IamRolePolicyAttachment_894DB94D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/IamRolePolicyAttachment",
            "uniqueId": "root_func1_IamRolePolicyAttachment_894DB94D"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_func1_IamRole_D5C6999E.name}"
      },
      "root_testinflightscancallotherinflights_Handler_IamRolePolicyAttachment_285E46D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightscancallotherinflights_Handler_IamRolePolicyAttachment_285E46D1"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightscancallotherinflights_Handler_IamRole_BB2EB09E.name}"
      },
      "root_testvariablecanbeaninflightclosure_Handler_IamRolePolicyAttachment_0C3F1435": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testvariablecanbeaninflightclosure_Handler_IamRolePolicyAttachment_0C3F1435"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testvariablecanbeaninflightclosure_Handler_IamRole_507C37DB.name}"
      }
    },
    "aws_lambda_function": {
      "root_func1_52D4D9D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/Default",
            "uniqueId": "root_func1_52D4D9D4"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "func1-c899062d"
          }
        },
        "function_name": "func1-c899062d",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_func1_IamRole_D5C6999E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_func1_S3Object_777BC7A8.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testinflightscancallotherinflights_Handler_2A3BE1A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/Default",
            "uniqueId": "root_testinflightscancallotherinflights_Handler_2A3BE1A9"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "FUNCTION_NAME_c79d5cd4": "${aws_lambda_function.root_func1_52D4D9D4.arn}",
            "WING_FUNCTION_NAME": "Handler-c8ad4c02"
          }
        },
        "function_name": "Handler-c8ad4c02",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightscancallotherinflights_Handler_IamRole_BB2EB09E.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightscancallotherinflights_Handler_S3Object_25828B2E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testvariablecanbeaninflightclosure_Handler_2A5E84C6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/Default",
            "uniqueId": "root_testvariablecanbeaninflightclosure_Handler_2A5E84C6"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c8210662"
          }
        },
        "function_name": "Handler-c8210662",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testvariablecanbeaninflightclosure_Handler_IamRole_507C37DB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testvariablecanbeaninflightclosure_Handler_S3Object_32C2C862.key}",
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
      },
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
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
      "root_func1_S3Object_777BC7A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/func1/S3Object",
            "uniqueId": "root_func1_S3Object_777BC7A8"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testinflightscancallotherinflights_Handler_S3Object_25828B2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflights can call other inflights/Handler/S3Object",
            "uniqueId": "root_testinflightscancallotherinflights_Handler_S3Object_25828B2E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testvariablecanbeaninflightclosure_Handler_S3Object_32C2C862": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:variable can be an inflight closure/Handler/S3Object",
            "uniqueId": "root_testvariablecanbeaninflightclosure_Handler_S3Object_32C2C862"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const globalBucket_client = context._lift(globalBucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            globalBucket: ${globalBucket_client},
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
          $Closure1._registerBindObject(globalBucket, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(globalBucket, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const storeInBucket_client = context._lift(storeInBucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            storeInBucket: ${storeInBucket_client},
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
          $Closure2._registerBindObject(storeInBucket, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(storeInBucket, host, ["handle"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const func1_client = context._lift(func1);
        const globalBucket_client = context._lift(globalBucket);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            func1: ${func1_client},
            globalBucket: ${globalBucket_client},
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
          $Closure3._registerBindObject(func1, host, []);
          $Closure3._registerBindObject(globalBucket, host, []);
        }
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
        this._addInflightOps("foo");
        const __parent_this = this;
        class $Closure4 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
            this.display.hidden = true;
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure4.js";
            const globalBucket_client = context._lift(globalBucket);
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
                globalBucket: ${globalBucket_client},
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
            if (ops.includes("$inflight_init")) {
              $Closure4._registerBindObject(globalBucket, host, []);
            }
            if (ops.includes("handle")) {
              $Closure4._registerBindObject(globalBucket, host, ["list"]);
            }
            super._registerBind(host, ops);
          }
        }
        this.closure = new $Closure4(this,"$Closure4");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.MyResource.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const closure_client = this._lift(this.closure);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              closure: ${closure_client},
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
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure5.js";
        const x_client = context._lift(x);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            x: ${x_client},
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
        if (ops.includes("$inflight_init")) {
          $Closure5._registerBindObject(x, host, []);
        }
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
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflights_calling_inflights", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


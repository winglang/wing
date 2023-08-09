# [lift_via_closure.w](../../../../../examples/tests/valid/lift_via_closure.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $bucket2 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $bucket2.put("hello","world"));
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $fn }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $bucket2, $fn2, $fn2_bucket }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $fn2());
      {((cond) => {if (!cond) throw new Error("assertion failed: fn2.bucket.get(\"hello\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fn2_bucket.get("hello")),"world")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fn2.listFiles().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $fn2.listFiles()).length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bucket2.get(\"b2\") == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $bucket2.get("b2")),"world")))};
    }
  }
  return $Closure3;
}

```

## inflight.MyClosure.js
```js
module.exports = function({ $bucket2 }) {
  class MyClosure {
    constructor({ $this_bucket }) {
      this.$this_bucket = $this_bucket;
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {console.log("handle called")};
      (await this.putFile());
    }
    async putFile() {
      {console.log("putFile called")};
      (await this.$this_bucket.put("hello","world"));
    }
    async listFiles() {
      (await $bucket2.put("b2","world"));
      return (await this.$this_bucket.list());
    }
  }
  return MyClosure;
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
      "value": "[[\"root/undefined/Default/test:call synthetic closure class as a function\",\"${aws_lambda_function.undefined_testcallsyntheticclosureclassasafunction_Handler_1F84B3EB.arn}\"],[\"root/undefined/Default/test:call non-synthetic closure as a function\",\"${aws_lambda_function.undefined_testcallnon-syntheticclosureasafunction_Handler_EAAE088A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "undefined_testcallnon-syntheticclosureasafunction_Handler_IamRole_EB3BFEA4": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call non-synthetic closure as a function/Handler/IamRole",
            "uniqueId": "undefined_testcallnon-syntheticclosureasafunction_Handler_IamRole_EB3BFEA4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "undefined_testcallsyntheticclosureclassasafunction_Handler_IamRole_840FECDA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call synthetic closure class as a function/Handler/IamRole",
            "uniqueId": "undefined_testcallsyntheticclosureclassasafunction_Handler_IamRole_840FECDA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testcallnon-syntheticclosureasafunction_Handler_IamRolePolicy_3E0391FC": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call non-synthetic closure as a function/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcallnon-syntheticclosureasafunction_Handler_IamRolePolicy_3E0391FC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_MyClosure_cloudBucket_1019DBF7.arn}\",\"${aws_s3_bucket.undefined_MyClosure_cloudBucket_1019DBF7.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testcallnon-syntheticclosureasafunction_Handler_IamRole_EB3BFEA4.name}"
      },
      "undefined_testcallsyntheticclosureclassasafunction_Handler_IamRolePolicy_406EB937": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call synthetic closure class as a function/Handler/IamRolePolicy",
            "uniqueId": "undefined_testcallsyntheticclosureclassasafunction_Handler_IamRolePolicy_406EB937"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testcallsyntheticclosureclassasafunction_Handler_IamRole_840FECDA.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testcallnon-syntheticclosureasafunction_Handler_IamRolePolicyAttachment_2D2AF866": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call non-synthetic closure as a function/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcallnon-syntheticclosureasafunction_Handler_IamRolePolicyAttachment_2D2AF866"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcallnon-syntheticclosureasafunction_Handler_IamRole_EB3BFEA4.name}"
      },
      "undefined_testcallsyntheticclosureclassasafunction_Handler_IamRolePolicyAttachment_40315363": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call synthetic closure class as a function/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testcallsyntheticclosureclassasafunction_Handler_IamRolePolicyAttachment_40315363"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testcallsyntheticclosureclassasafunction_Handler_IamRole_840FECDA.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testcallnon-syntheticclosureasafunction_Handler_EAAE088A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call non-synthetic closure as a function/Handler/Default",
            "uniqueId": "undefined_testcallnon-syntheticclosureasafunction_Handler_EAAE088A"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_44ad1d6b": "${aws_s3_bucket.undefined_MyClosure_cloudBucket_1019DBF7.bucket}",
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8aebd70",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8aebd70",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcallnon-syntheticclosureasafunction_Handler_IamRole_EB3BFEA4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcallnon-syntheticclosureasafunction_Handler_S3Object_71E18504.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "undefined_testcallsyntheticclosureclassasafunction_Handler_1F84B3EB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call synthetic closure class as a function/Handler/Default",
            "uniqueId": "undefined_testcallsyntheticclosureclassasafunction_Handler_1F84B3EB"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8ee5726",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8ee5726",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testcallsyntheticclosureclassasafunction_Handler_IamRole_840FECDA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testcallsyntheticclosureclassasafunction_Handler_S3Object_074793C2.key}",
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
      "undefined_MyClosure_cloudBucket_1019DBF7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyClosure/cloud.Bucket/Default",
            "uniqueId": "undefined_MyClosure_cloudBucket_1019DBF7"
          }
        },
        "bucket_prefix": "cloud-bucket-c8a8a7f1-",
        "force_destroy": false
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
      "undefined_MyClosure_cloudBucket_PublicAccessBlock_6094EAF3": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyClosure/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_MyClosure_cloudBucket_PublicAccessBlock_6094EAF3"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_MyClosure_cloudBucket_1019DBF7.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
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
      "undefined_MyClosure_cloudBucket_Encryption_5249B435": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyClosure/cloud.Bucket/Encryption",
            "uniqueId": "undefined_MyClosure_cloudBucket_Encryption_5249B435"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_MyClosure_cloudBucket_1019DBF7.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
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
      "undefined_testcallnon-syntheticclosureasafunction_Handler_S3Object_71E18504": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call non-synthetic closure as a function/Handler/S3Object",
            "uniqueId": "undefined_testcallnon-syntheticclosureasafunction_Handler_S3Object_71E18504"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "undefined_testcallsyntheticclosureclassasafunction_Handler_S3Object_074793C2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:call synthetic closure class as a function/Handler/S3Object",
            "uniqueId": "undefined_testcallsyntheticclosureclassasafunction_Handler_S3Object_074793C2"
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
            $bucket2: ${context._lift(bucket2)},
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
          $Closure1._registerBindObject(bucket2, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class MyClosure extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "putFile", "listFiles", "$inflight_init");
        this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyClosure.js")({
            $bucket2: ${context._lift(bucket2)},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyClosureClient = ${MyClosure._toInflightType(this).text};
            const client = new MyClosureClient({
              $this_bucket: ${this._lift(this.bucket)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyClosure._registerBindObject(this.bucket, host, []);
        }
        if (ops.includes("handle")) {
          MyClosure._registerBindObject(this, host, ["putFile"]);
        }
        if (ops.includes("listFiles")) {
          MyClosure._registerBindObject(bucket2, host, ["put"]);
          MyClosure._registerBindObject(this.bucket, host, ["list"]);
        }
        if (ops.includes("putFile")) {
          MyClosure._registerBindObject(this.bucket, host, ["put"]);
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
            $fn: ${context._lift(fn)},
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
          $Closure2._registerBindObject(fn, host, ["handle"]);
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
            $bucket2: ${context._lift(bucket2)},
            $fn2: ${context._lift(fn2)},
            $fn2_bucket: ${context._lift(fn2.bucket)},
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
          $Closure3._registerBindObject(bucket2, host, ["get"]);
          $Closure3._registerBindObject(fn2, host, ["handle", "listFiles"]);
          $Closure3._registerBindObject(fn2.bucket, host, ["get"]);
        }
        super._registerBind(host, ops);
      }
    }
    const bucket2 = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const fn = new $Closure1(this,"$Closure1");
    const fn2 = new MyClosure(this,"MyClosure");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call synthetic closure class as a function",new $Closure2(this,"$Closure2"));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:call non-synthetic closure as a function",new $Closure3(this,"$Closure3"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "lift_via_closure", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


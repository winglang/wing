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
      {((cond) => {if (!cond) throw new Error("assertion failed: fn2.bucket.get(\"hello\") == \"world\"")})(((await $fn2_bucket.get("hello")) === "world"))};
      {((cond) => {if (!cond) throw new Error("assertion failed: fn2.listFiles().length == 1")})(((await $fn2.listFiles()).length === 1))};
      {((cond) => {if (!cond) throw new Error("assertion failed: bucket2.get(\"b2\") == \"world\"")})(((await $bucket2.get("b2")) === "world"))};
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
      "value": "[[\"root/Default/Default/test:call synthetic closure class as a function\",\"${aws_lambda_function.testcallsyntheticclosureclassasafunction_Handler_577F53A9.arn}\"],[\"root/Default/Default/test:call non-synthetic closure as a function\",\"${aws_lambda_function.testcallnon-syntheticclosureasafunction_Handler_8C8F5E97.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "testcallnon-syntheticclosureasafunction_Handler_IamRole_A06F3749": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call non-synthetic closure as a function/Handler/IamRole",
            "uniqueId": "testcallnon-syntheticclosureasafunction_Handler_IamRole_A06F3749"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "testcallsyntheticclosureclassasafunction_Handler_IamRole_75DB8DE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call synthetic closure class as a function/Handler/IamRole",
            "uniqueId": "testcallsyntheticclosureclassasafunction_Handler_IamRole_75DB8DE1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testcallnon-syntheticclosureasafunction_Handler_IamRolePolicy_3CCA75F8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call non-synthetic closure as a function/Handler/IamRolePolicy",
            "uniqueId": "testcallnon-syntheticclosureasafunction_Handler_IamRolePolicy_3CCA75F8"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.MyClosure_cloudBucket_4DAD12C0.arn}\",\"${aws_s3_bucket.MyClosure_cloudBucket_4DAD12C0.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testcallnon-syntheticclosureasafunction_Handler_IamRole_A06F3749.name}"
      },
      "testcallsyntheticclosureclassasafunction_Handler_IamRolePolicy_64E9CC96": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call synthetic closure class as a function/Handler/IamRolePolicy",
            "uniqueId": "testcallsyntheticclosureclassasafunction_Handler_IamRolePolicy_64E9CC96"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.cloudBucket.arn}\",\"${aws_s3_bucket.cloudBucket.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testcallsyntheticclosureclassasafunction_Handler_IamRole_75DB8DE1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testcallnon-syntheticclosureasafunction_Handler_IamRolePolicyAttachment_228ED90F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call non-synthetic closure as a function/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallnon-syntheticclosureasafunction_Handler_IamRolePolicyAttachment_228ED90F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallnon-syntheticclosureasafunction_Handler_IamRole_A06F3749.name}"
      },
      "testcallsyntheticclosureclassasafunction_Handler_IamRolePolicyAttachment_8F878B5F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call synthetic closure class as a function/Handler/IamRolePolicyAttachment",
            "uniqueId": "testcallsyntheticclosureclassasafunction_Handler_IamRolePolicyAttachment_8F878B5F"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testcallsyntheticclosureclassasafunction_Handler_IamRole_75DB8DE1.name}"
      }
    },
    "aws_lambda_function": {
      "testcallnon-syntheticclosureasafunction_Handler_8C8F5E97": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call non-synthetic closure as a function/Handler/Default",
            "uniqueId": "testcallnon-syntheticclosureasafunction_Handler_8C8F5E97"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_bbe94f63": "${aws_s3_bucket.MyClosure_cloudBucket_4DAD12C0.bucket}",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c88b1fea",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c88b1fea",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallnon-syntheticclosureasafunction_Handler_IamRole_A06F3749.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallnon-syntheticclosureasafunction_Handler_S3Object_F2F52456.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "testcallsyntheticclosureclassasafunction_Handler_577F53A9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call synthetic closure class as a function/Handler/Default",
            "uniqueId": "testcallsyntheticclosureclassasafunction_Handler_577F53A9"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.cloudBucket.bucket}",
            "WING_FUNCTION_NAME": "Handler-c822e354",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c822e354",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testcallsyntheticclosureclassasafunction_Handler_IamRole_75DB8DE1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testcallsyntheticclosureclassasafunction_Handler_S3Object_CBB724B2.key}",
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
      "MyClosure_cloudBucket_4DAD12C0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClosure/cloud.Bucket/Default",
            "uniqueId": "MyClosure_cloudBucket_4DAD12C0"
          }
        },
        "bucket_prefix": "cloud-bucket-c8b87a6b-",
        "force_destroy": false
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
      "MyClosure_cloudBucket_PublicAccessBlock_EFF6E688": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClosure/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "MyClosure_cloudBucket_PublicAccessBlock_EFF6E688"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.MyClosure_cloudBucket_4DAD12C0.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
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
      "MyClosure_cloudBucket_Encryption_31C1B5A0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClosure/cloud.Bucket/Encryption",
            "uniqueId": "MyClosure_cloudBucket_Encryption_31C1B5A0"
          }
        },
        "bucket": "${aws_s3_bucket.MyClosure_cloudBucket_4DAD12C0.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
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
      "testcallnon-syntheticclosureasafunction_Handler_S3Object_F2F52456": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call non-synthetic closure as a function/Handler/S3Object",
            "uniqueId": "testcallnon-syntheticclosureasafunction_Handler_S3Object_F2F52456"
          }
        },
        "bucket": "${aws_s3_bucket.Code.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "testcallsyntheticclosureclassasafunction_Handler_S3Object_CBB724B2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:call synthetic closure class as a function/Handler/S3Object",
            "uniqueId": "testcallsyntheticclosureclassasafunction_Handler_S3Object_CBB724B2"
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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this._addInflightOps("handle", "putFile", "listFiles", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
        this.display.hidden = true;
        this._addInflightOps("handle", "$inflight_init");
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
new $App({ outdir: $outdir, name: "lift_via_closure", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test }).synth();

```


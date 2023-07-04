# [capture_reassigable_class_field.w](../../../../../examples/tests/valid/capture_reassigable_class_field.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    async handle(k) {
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counter }) {
  class $Closure2 {
    async handle(key) {
      (await $counter.inc(1,key));
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $counter, $kv, $util_Util }) {
  class $Closure3 {
    async handle() {
      (await $kv.set("k",Object.freeze({"value":"v"})));
      (await $kv.set("k2",Object.freeze({"value":"v"})));
      (await $kv.get("k"));
      (await $kv.get("k"));
      (await $kv.get("k2"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k\") == 2;\n  })")})((await $util_Util.waitUntil(async () => {
        return ((await $counter.peek("k")) === 2);
      }
      )))};
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k2\") == 1;\n  })")})((await $util_Util.waitUntil(async () => {
        return ((await $counter.peek("k2")) === 1);
      }
      )))};
    }
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
  }
  return $Closure3;
}

```

## inflight.KeyValueStore.js
```js
module.exports = function({  }) {
  class KeyValueStore {
    async get(key) {
      (await this.$this_onUpdateCallback(key));
      return (await this.$this_bucket.getJson(key));
    }
    async set(key, value) {
      (await this.$this_bucket.putJson(key,value));
    }
    constructor({ $this_bucket, $this_onUpdateCallback }) {
      this.$this_bucket = $this_bucket;
      this.$this_onUpdateCallback = $this_onUpdateCallback;
    }
  }
  return KeyValueStore;
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
      "value": "[[\"root/Default/Default/test:main\",\"${aws_lambda_function.root_testmain_Handler_4ADAC335.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_sasa_B91F09DA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/sasa/Default",
            "uniqueId": "root_sasa_B91F09DA"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-sasa-c8fc4cc8"
      }
    },
    "aws_iam_role": {
      "root_testmain_Handler_IamRole_0300CAA5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRole",
            "uniqueId": "root_testmain_Handler_IamRole_0300CAA5"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testmain_Handler_IamRolePolicy_184F2A46": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRolePolicy",
            "uniqueId": "root_testmain_Handler_IamRolePolicy_184F2A46"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.arn}\",\"${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.arn}\",\"${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_sasa_B91F09DA.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testmain_Handler_IamRole_0300CAA5.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testmain_Handler_IamRolePolicyAttachment_F254CEF9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testmain_Handler_IamRolePolicyAttachment_F254CEF9"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testmain_Handler_IamRole_0300CAA5.name}"
      }
    },
    "aws_lambda_function": {
      "root_testmain_Handler_4ADAC335": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/Default",
            "uniqueId": "root_testmain_Handler_4ADAC335"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_ce72b88b": "${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.bucket}",
            "BUCKET_NAME_ce72b88b_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_5a275103": "${aws_dynamodb_table.root_sasa_B91F09DA.name}",
            "WING_FUNCTION_NAME": "Handler-c8d10438",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d10438",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testmain_Handler_IamRole_0300CAA5.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testmain_Handler_S3Object_2601AAE9.key}",
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
      "root_KeyValueStore_cloudBucket_B6A49C6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/Default",
            "uniqueId": "root_KeyValueStore_cloudBucket_B6A49C6A"
          }
        },
        "bucket_prefix": "cloud-bucket-c8a9ef69-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_KeyValueStore_cloudBucket_PublicAccessBlock_742F6520": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_KeyValueStore_cloudBucket_PublicAccessBlock_742F6520"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_KeyValueStore_cloudBucket_Encryption_FDD09906": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/Encryption",
            "uniqueId": "root_KeyValueStore_cloudBucket_Encryption_FDD09906"
          }
        },
        "bucket": "${aws_s3_bucket.root_KeyValueStore_cloudBucket_B6A49C6A.bucket}",
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
      "root_testmain_Handler_S3Object_2601AAE9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/S3Object",
            "uniqueId": "root_testmain_Handler_S3Object_2601AAE9"
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
const util = require('@winglang/sdk').util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class KeyValueStore extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this.display.hidden = true;
            this._addInflightOps("handle", "$inflight_init");
          }
          static _toInflightType(context) {
            return $stdlib.core.NodeJsCode.fromInline(`
              require("./inflight.$Closure1.js")({
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
        }
        this.onUpdateCallback = new $Closure1(this,"$Closure1");
        this._addInflightOps("get", "set", "$inflight_init");
      }
      onUpdate(fn) {
        this.onUpdateCallback = fn;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.KeyValueStore.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const KeyValueStoreClient = ${KeyValueStore._toInflightType(this).text};
            const client = new KeyValueStoreClient({
              $this_bucket: ${this._lift(this.bucket)},
              $this_onUpdateCallback: ${this._lift(this.onUpdateCallback)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("get")) {
          KeyValueStore._registerBindObject(this.bucket, host, ["getJson"]);
          KeyValueStore._registerBindObject(this.onUpdateCallback, host, []);
        }
        if (ops.includes("set")) {
          KeyValueStore._registerBindObject(this.bucket, host, ["putJson"]);
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
            $counter: ${context._lift(counter)},
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
          $Closure2._registerBindObject(counter, host, ["inc"]);
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
            $counter: ${context._lift(counter)},
            $kv: ${context._lift(kv)},
            $util_Util: ${context._lift(util.Util)},
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
          $Closure3._registerBindObject(counter, host, ["peek"]);
          $Closure3._registerBindObject(kv, host, ["get", "set"]);
        }
        super._registerBind(host, ops);
      }
    }
    const kv = new KeyValueStore(this,"KeyValueStore");
    const counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"sasa");
    (kv.onUpdate(new $Closure2(this,"$Closure2")));
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:main",new $Closure3(this,"$Closure3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_reassigable_class_field", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


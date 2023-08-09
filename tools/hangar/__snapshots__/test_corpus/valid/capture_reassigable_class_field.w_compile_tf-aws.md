# [capture_reassigable_class_field.w](../../../../../examples/tests/valid/capture_reassigable_class_field.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(k) {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ $counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle(key) {
      (await $counter.inc(1,key));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ $counter, $kv, $util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $kv.set("k",({"value": "v"})));
      (await $kv.set("k2",({"value": "v"})));
      (await $kv.get("k"));
      (await $kv.get("k"));
      (await $kv.get("k2"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k\") == 2;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek("k")),2));
      }
      )))};
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k2\") == 1;\n  })")})((await $util_Util.waitUntil(async () => {
        return (((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await $counter.peek("k2")),1));
      }
      )))};
    }
  }
  return $Closure3;
}

```

## inflight.KeyValueStore.js
```js
module.exports = function({  }) {
  class KeyValueStore {
    constructor({ $this_bucket, $this_onUpdateCallback }) {
      this.$this_bucket = $this_bucket;
      this.$this_onUpdateCallback = $this_onUpdateCallback;
    }
    async get(key) {
      (await this.$this_onUpdateCallback(key));
      return (await this.$this_bucket.getJson(key));
    }
    async set(key, value) {
      (await this.$this_bucket.putJson(key,value));
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
      "value": "[[\"root/undefined/Default/test:main\",\"${aws_lambda_function.undefined_testmain_Handler_B9C0F50A.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_sasa_2C86DB8D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/sasa/Default",
            "uniqueId": "undefined_sasa_2C86DB8D"
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
        "name": "wing-counter-sasa-c87399c5"
      }
    },
    "aws_iam_role": {
      "undefined_testmain_Handler_IamRole_D6898AB9": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:main/Handler/IamRole",
            "uniqueId": "undefined_testmain_Handler_IamRole_D6898AB9"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testmain_Handler_IamRolePolicy_6134617D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:main/Handler/IamRolePolicy",
            "uniqueId": "undefined_testmain_Handler_IamRolePolicy_6134617D"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_KeyValueStore_cloudBucket_7286C865.arn}\",\"${aws_s3_bucket.undefined_KeyValueStore_cloudBucket_7286C865.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_sasa_2C86DB8D.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.undefined_sasa_2C86DB8D.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testmain_Handler_IamRole_D6898AB9.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testmain_Handler_IamRolePolicyAttachment_C23319CD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:main/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testmain_Handler_IamRolePolicyAttachment_C23319CD"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testmain_Handler_IamRole_D6898AB9.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testmain_Handler_B9C0F50A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:main/Handler/Default",
            "uniqueId": "undefined_testmain_Handler_B9C0F50A"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_850231bb": "${aws_s3_bucket.undefined_KeyValueStore_cloudBucket_7286C865.bucket}",
            "DYNAMODB_TABLE_NAME_af251fa7": "${aws_dynamodb_table.undefined_sasa_2C86DB8D.name}",
            "WING_FUNCTION_NAME": "Handler-c8b18029",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8b18029",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testmain_Handler_IamRole_D6898AB9.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testmain_Handler_S3Object_BFCFB553.key}",
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
      "undefined_KeyValueStore_cloudBucket_7286C865": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/KeyValueStore/cloud.Bucket/Default",
            "uniqueId": "undefined_KeyValueStore_cloudBucket_7286C865"
          }
        },
        "bucket_prefix": "cloud-bucket-c89519da-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_KeyValueStore_cloudBucket_PublicAccessBlock_CD8D9805": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/KeyValueStore/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_KeyValueStore_cloudBucket_PublicAccessBlock_CD8D9805"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_KeyValueStore_cloudBucket_7286C865.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_KeyValueStore_cloudBucket_Encryption_D770D14A": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/KeyValueStore/cloud.Bucket/Encryption",
            "uniqueId": "undefined_KeyValueStore_cloudBucket_Encryption_D770D14A"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_KeyValueStore_cloudBucket_7286C865.bucket}",
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
      "undefined_testmain_Handler_S3Object_BFCFB553": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:main/Handler/S3Object",
            "uniqueId": "undefined_testmain_Handler_S3Object_BFCFB553"
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
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class KeyValueStore extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("get", "set", "$inflight_init");
        this.bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        const __parent_this_1 = this;
        class $Closure1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle", "$inflight_init");
            this.display.hidden = true;
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
        if (ops.includes("$inflight_init")) {
          KeyValueStore._registerBindObject(this.bucket, host, []);
          KeyValueStore._registerBindObject(this.onUpdateCallback, host, []);
        }
        if (ops.includes("get")) {
          KeyValueStore._registerBindObject(this.bucket, host, ["getJson"]);
          KeyValueStore._registerBindObject(this.onUpdateCallback, host, ["handle"]);
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
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
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
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
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "capture_reassigable_class_field", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


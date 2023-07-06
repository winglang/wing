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
    async $inflight_init()  {
    }
    async handle(k)  {
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ counter }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle(key)  {
      (await counter.inc(1,key));
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ kv, counter, util_Util }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await kv.set("k",Object.freeze({"value":"v"})));
      (await kv.set("k2",Object.freeze({"value":"v"})));
      (await kv.get("k"));
      (await kv.get("k"));
      (await kv.get("k2"));
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k\") == 2;\n  })")})((await util_Util.waitUntil(async () =>  {
        return ((await counter.peek("k")) === 2);
      }
      )))};
      {((cond) => {if (!cond) throw new Error("assertion failed: util.waitUntil((): bool => {\n    return counter.peek(\"k2\") == 1;\n  })")})((await util_Util.waitUntil(async () =>  {
        return ((await counter.peek("k2")) === 1);
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
    constructor({ bucket, onUpdateCallback }) {
      this.bucket = bucket;
      this.onUpdateCallback = onUpdateCallback;
    }
    async $inflight_init()  {
    }
    async get(key)  {
      (await this.onUpdateCallback(key));
      return (await this.bucket.getJson(key));
    }
    async set(key, value)  {
      (await this.bucket.putJson(key,value));
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
      "value": "[[\"root/Default/Default/test:main\",\"${aws_lambda_function.testmain_Handler_242B2607.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "sasa": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/sasa/Default",
            "uniqueId": "sasa"
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
      "testmain_Handler_IamRole_0E2C4B8D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRole",
            "uniqueId": "testmain_Handler_IamRole_0E2C4B8D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "testmain_Handler_IamRolePolicy_A91080AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRolePolicy",
            "uniqueId": "testmain_Handler_IamRolePolicy_A91080AC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.KeyValueStore_cloudBucket_D9D365FD.arn}\",\"${aws_s3_bucket.KeyValueStore_cloudBucket_D9D365FD.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.sasa.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.sasa.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.testmain_Handler_IamRole_0E2C4B8D.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "testmain_Handler_IamRolePolicyAttachment_4B878377": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/IamRolePolicyAttachment",
            "uniqueId": "testmain_Handler_IamRolePolicyAttachment_4B878377"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.testmain_Handler_IamRole_0E2C4B8D.name}"
      }
    },
    "aws_lambda_function": {
      "testmain_Handler_242B2607": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/Default",
            "uniqueId": "testmain_Handler_242B2607"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_ce72b88b": "${aws_s3_bucket.KeyValueStore_cloudBucket_D9D365FD.bucket}",
            "DYNAMODB_TABLE_NAME_5a275103": "${aws_dynamodb_table.sasa.name}",
            "WING_FUNCTION_NAME": "Handler-c8d10438",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8d10438",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.testmain_Handler_IamRole_0E2C4B8D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.Code.bucket}",
        "s3_key": "${aws_s3_object.testmain_Handler_S3Object_3FA67F7E.key}",
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
      "KeyValueStore_cloudBucket_D9D365FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/Default",
            "uniqueId": "KeyValueStore_cloudBucket_D9D365FD"
          }
        },
        "bucket_prefix": "cloud-bucket-c8a9ef69-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "KeyValueStore_cloudBucket_PublicAccessBlock_A373F90E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "KeyValueStore_cloudBucket_PublicAccessBlock_A373F90E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.KeyValueStore_cloudBucket_D9D365FD.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "KeyValueStore_cloudBucket_Encryption_D3F8A987": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/KeyValueStore/cloud.Bucket/Encryption",
            "uniqueId": "KeyValueStore_cloudBucket_Encryption_D3F8A987"
          }
        },
        "bucket": "${aws_s3_bucket.KeyValueStore_cloudBucket_D9D365FD.bucket}",
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
      "testmain_Handler_S3Object_3FA67F7E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:main/Handler/S3Object",
            "uniqueId": "testmain_Handler_S3Object_3FA67F7E"
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
            this._addInflightOps("handle");
          }
          static _toInflightType(context) {
            const self_client_path = "././inflight.$Closure1.js";
            return $stdlib.core.NodeJsCode.fromInline(`
              require("${self_client_path}")({
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
            }
            if (ops.includes("handle")) {
            }
            super._registerBind(host, ops);
          }
        }
        this.onUpdateCallback = new $Closure1(this,"$Closure1");
        this._addInflightOps("get", "set");
      }
       onUpdate(fn)  {
        this.onUpdateCallback = fn;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.KeyValueStore.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const bucket_client = this._lift(this.bucket);
        const onUpdateCallback_client = this._lift(this.onUpdateCallback);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const KeyValueStoreClient = ${KeyValueStore._toInflightType(this).text};
            const client = new KeyValueStoreClient({
              bucket: ${bucket_client},
              onUpdateCallback: ${onUpdateCallback_client},
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
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const counter_client = context._lift(counter);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            counter: ${counter_client},
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
          $Closure2._registerBindObject(counter, host, []);
        }
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
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const kv_client = context._lift(kv);
        const counter_client = context._lift(counter);
        const util_UtilClient = util.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            kv: ${kv_client},
            counter: ${counter_client},
            util_Util: ${util_UtilClient.text},
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
          $Closure3._registerBindObject(counter, host, []);
          $Closure3._registerBindObject(kv, host, []);
        }
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


# [inflight_class_capture_preflight_resource.w](../../../../examples/tests/valid/inflight_class_capture_preflight_resource.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ Foo }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const f = new Foo();
      (await f.uploadToBucket("hello.txt","world"));
    }
  }
  return $Inflight1;
}

```

## clients/Foo.inflight.js
```js
module.exports = function({ b }) {
  class Foo {
     constructor()  {
      const __parent_this = this;
    }
    async uploadToBucket(k, value)  {
      const __parent_this = this;
      (await b.put(k,value));
    }
  }
  return Foo;
}

```

## clients/PreflightClass.inflight.js
```js
module.exports = function({ Foo }) {
  class  PreflightClass {
    constructor({  }) {
    }
    async $inflight_init()  {
      {
        const __parent_this = this;
      }
    }
    async goo()  {
      {
        const __parent_this = this;
        const foo = new Foo();
        (typeof foo.uploadToBucket === "function" ? await foo.uploadToBucket("hello.txt","world") : await foo.uploadToBucket.handle("hello.txt","world"));
      }
    }
  }
  return PreflightClass;
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
      "value": "[[\"root/Default/Default/test:inflight class captures preflight resource\",\"${aws_lambda_function.root_testinflightclasscapturespreflightresource_Handler_32058266.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightclasscapturespreflightresource_Handler_IamRole_706075D3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures preflight resource/Handler/IamRole",
            "uniqueId": "root_testinflightclasscapturespreflightresource_Handler_IamRole_706075D3"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightclasscapturespreflightresource_Handler_IamRolePolicy_1DDF44CC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures preflight resource/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightclasscapturespreflightresource_Handler_IamRolePolicy_1DDF44CC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightclasscapturespreflightresource_Handler_IamRole_706075D3.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightclasscapturespreflightresource_Handler_IamRolePolicyAttachment_3787A52C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures preflight resource/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightclasscapturespreflightresource_Handler_IamRolePolicyAttachment_3787A52C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightclasscapturespreflightresource_Handler_IamRole_706075D3.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightclasscapturespreflightresource_Handler_32058266": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures preflight resource/Handler/Default",
            "uniqueId": "root_testinflightclasscapturespreflightresource_Handler_32058266"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c890c3e1"
          }
        },
        "function_name": "Handler-c890c3e1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightclasscapturespreflightresource_Handler_IamRole_706075D3.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightclasscapturespreflightresource_Handler_S3Object_676FC9EB.key}",
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
      "root_testinflightclasscapturespreflightresource_Handler_S3Object_676FC9EB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight class captures preflight resource/Handler/S3Object",
            "uniqueId": "root_testinflightclasscapturespreflightresource_Handler_S3Object_676FC9EB"
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
    class Foo extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("uploadToBucket");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Foo.inflight.js";
        const b_client = context._lift(b);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            b: ${b_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FooClient = ${Foo._toInflightType(this).text};
            const client = new FooClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Foo._registerBindObject(b, host, []);
        }
        if (ops.includes("uploadToBucket")) {
          Foo._registerBindObject(b, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Inflight1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/$Inflight1.inflight.js";
        const FooClient = Foo._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            Foo: ${FooClient.text},
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
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const myConst = "bang bang";
    this.node.root.new("@winglang/sdk.cloud.Test",cloud.Test,this,"test:inflight class captures preflight resource",new $Inflight1(this,"$Inflight1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "inflight_class_capture_preflight_resource", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


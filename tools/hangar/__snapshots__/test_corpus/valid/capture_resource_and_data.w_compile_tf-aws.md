# [capture_resource_and_data.w](../../../../../examples/tests/valid/capture_resource_and_data.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ foo, hello }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await foo.baz.at(1)) === 2)'`)})(((await foo.baz.at(1)) === 2))};
      (await hello.bang());
    }
    async $inflight_init()  {
    }
  }
  return $Closure1;
}

```

## inflight.Hello.js
```js
module.exports = function({ Static, std_Json, std_String }) {
  class Hello {
    constructor({ b, x }) {
      this.b = b;
      this.x = x;
    }
    async hello()  {
      const __parent_this = this;
      (await this.b.put("hello","world"));
    }
    async bang()  {
      const __parent_this = this;
      const localArray = Object.freeze([123, "Hello", "World"]);
      {console.log(((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((await localArray.at(1))))};
      const local = "hi";
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(local === "hi")'`)})((local === "hi"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(local.length === 2)'`)})((local.length === 2))};
      {console.log(this.x.bar)};
      {console.log((await Static.hello()))};
      {console.log(((args) => { return JSON.stringify(args[0], null, args[1]) })([123]))};
      (await this.hello());
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return Hello;
}

```

## inflight.Static.js
```js
module.exports = function({  }) {
  class Static {
    constructor({  }) {
    }
    static async hello()  {
      return "hello";
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return Static;
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
      "value": "[[\"root/Default/Default/test:resource and data\",\"${aws_lambda_function.root_testresourceanddata_Handler_5C5A99FB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testresourceanddata_Handler_IamRole_4C2C3DAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/IamRole",
            "uniqueId": "root_testresourceanddata_Handler_IamRole_4C2C3DAA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testresourceanddata_Handler_IamRolePolicy_6768C3B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/IamRolePolicy",
            "uniqueId": "root_testresourceanddata_Handler_IamRolePolicy_6768C3B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_Hello_cloudBucket_A1CD7BFB.arn}\",\"${aws_s3_bucket.root_Hello_cloudBucket_A1CD7BFB.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testresourceanddata_Handler_IamRole_4C2C3DAA.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testresourceanddata_Handler_IamRolePolicyAttachment_B4EB837E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testresourceanddata_Handler_IamRolePolicyAttachment_B4EB837E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testresourceanddata_Handler_IamRole_4C2C3DAA.name}"
      }
    },
    "aws_lambda_function": {
      "root_testresourceanddata_Handler_5C5A99FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/Default",
            "uniqueId": "root_testresourceanddata_Handler_5C5A99FB"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_a8082453": "${aws_s3_bucket.root_Hello_cloudBucket_A1CD7BFB.bucket}",
            "BUCKET_NAME_a8082453_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "Handler-c8872ad1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8872ad1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testresourceanddata_Handler_IamRole_4C2C3DAA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testresourceanddata_Handler_S3Object_EE48D4E2.key}",
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
      "root_Hello_cloudBucket_A1CD7BFB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Hello/cloud.Bucket/Default",
            "uniqueId": "root_Hello_cloudBucket_A1CD7BFB"
          }
        },
        "bucket_prefix": "cloud-bucket-c8eed6b9-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_Hello_cloudBucket_PublicAccessBlock_A68A6B68": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Hello/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_Hello_cloudBucket_PublicAccessBlock_A68A6B68"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_Hello_cloudBucket_A1CD7BFB.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_Hello_cloudBucket_Encryption_36E842FA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Hello/cloud.Bucket/Encryption",
            "uniqueId": "root_Hello_cloudBucket_Encryption_36E842FA"
          }
        },
        "bucket": "${aws_s3_bucket.root_Hello_cloudBucket_A1CD7BFB.bucket}",
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
      "root_testresourceanddata_Handler_S3Object_EE48D4E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/S3Object",
            "uniqueId": "root_testresourceanddata_Handler_S3Object_EE48D4E2"
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
    class Static extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("hello", "$inflight_init");
        const __parent_this = this;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Static.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const StaticClient = ${Static._toInflightType(this).text};
            const client = new StaticClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Hello extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("hello", "bang", "$inflight_init");
        const __parent_this = this;
        this.x = {
        "bar": "aa",
        "baz": Object.freeze([1]),}
        ;
        this.b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        const StaticClient = Static._toInflightType(context);
        const std_JsonClient = std.Json._toInflightType(context);
        const std_StringClient = std.String._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Hello.js")({
            Static: ${StaticClient.text},
            std_Json: ${std_JsonClient.text},
            std_String: ${std_StringClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const HelloClient = ${Hello._toInflightType(this).text};
            const client = new HelloClient({
              b: ${this._lift(this.b, ["put"])},
              x: ${this._lift(this.x, ["bar"])},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Hello._registerBindObject(this.b, host, ["put"]);
          Hello._registerBindObject(this.x, host, ["bar"]);
        }
        if (ops.includes("bang")) {
          Hello._registerBindObject(this.x, host, ["bar"]);
        }
        if (ops.includes("hello")) {
          Hello._registerBindObject(this.b, host, ["put"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("handle", "$inflight_init");
        this.display.hidden = true;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.$Closure1.js")({
            foo: ${context._lift(foo, ["baz"])},
            hello: ${context._lift(hello, ["bang"])},
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
          $Closure1._registerBindObject(foo, host, ["baz"]);
          $Closure1._registerBindObject(hello, host, ["bang"]);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(foo, host, ["baz"]);
          $Closure1._registerBindObject(hello, host, ["bang"]);
        }
        super._registerBind(host, ops);
      }
    }
    const foo = {
    "bar": "hello",
    "baz": Object.freeze([1, 2, 3]),}
    ;
    const hello = new Hello(this,"Hello");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:resource and data",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_resource_and_data", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


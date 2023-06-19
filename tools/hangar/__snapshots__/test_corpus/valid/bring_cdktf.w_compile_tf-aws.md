# [bring_cdktf.w](../../../../../examples/tests/valid/bring_cdktf.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ b, c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle()  {
      const x1 = b.arn;
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'x1.startsWith("arn:aws:s3")'`)})(x1.startsWith("arn:aws:s3"))};
      {console.log(`b.arn=${x1}`)};
      const x2 = b.bucketDomainName;
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'x2.endsWith("s3.amazonaws.com")'`)})(x2.endsWith("s3.amazonaws.com"))};
      {console.log(`b.bucketDomainName=${x2}`)};
      const x3 = (await c.getBucketArn());
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'x3.startsWith("arn:aws:s3")'`)})(x3.startsWith("arn:aws:s3"))};
      {console.log(`c.getBucketArn=${x3}`)};
    }
    async $inflight_init()  {
    }
  }
  return $Closure1;
}

```

## inflight.MyClass.js
```js
module.exports = function({  }) {
  class MyClass {
    constructor({ b2 }) {
      this.b2 = b2;
    }
    async getBucketArn()  {
      const __parent_this = this;
      return this.b2.arn;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return MyClass;
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
      "value": "[[\"root/Default/Default/test:capture from inflight\",\"${aws_lambda_function.root_testcapturefrominflight_Handler_C2A55AFA.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testcapturefrominflight_Handler_IamRole_54B170CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture from inflight/Handler/IamRole",
            "uniqueId": "root_testcapturefrominflight_Handler_IamRole_54B170CB"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testcapturefrominflight_Handler_IamRolePolicy_20A1959E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture from inflight/Handler/IamRolePolicy",
            "uniqueId": "root_testcapturefrominflight_Handler_IamRolePolicy_20A1959E"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testcapturefrominflight_Handler_IamRole_54B170CB.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testcapturefrominflight_Handler_IamRolePolicyAttachment_D08F5CFC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture from inflight/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testcapturefrominflight_Handler_IamRolePolicyAttachment_D08F5CFC"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testcapturefrominflight_Handler_IamRole_54B170CB.name}"
      }
    },
    "aws_lambda_function": {
      "root_testcapturefrominflight_Handler_C2A55AFA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture from inflight/Handler/Default",
            "uniqueId": "root_testcapturefrominflight_Handler_C2A55AFA"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c89cba64",
            "WING_TARGET": "tf-aws",
            "WING_TOKEN_AWS_S3_BUCKET_ROOT_AWSS3BUCKETS3BUCKET_8213AA37_ARN": "${jsonencode(aws_s3_bucket.root_awss3BucketS3Bucket_8213AA37.arn)}",
            "WING_TOKEN_AWS_S3_BUCKET_ROOT_AWSS3BUCKETS3BUCKET_8213AA37_BUCKET_DOMAIN_NAME": "${jsonencode(aws_s3_bucket.root_awss3BucketS3Bucket_8213AA37.bucket_domain_name)}",
            "WING_TOKEN_AWS_S3_BUCKET_ROOT_MYCLASS_AWSS3BUCKETS3BUCKET_3EE7B188_ARN": "${jsonencode(aws_s3_bucket.root_MyClass_awss3BucketS3Bucket_3EE7B188.arn)}"
          }
        },
        "function_name": "Handler-c89cba64",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testcapturefrominflight_Handler_IamRole_54B170CB.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testcapturefrominflight_Handler_S3Object_D2691BFE.key}",
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
      "root_MyClass_awss3BucketS3Bucket_3EE7B188": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyClass/aws.s3Bucket.S3Bucket",
            "uniqueId": "root_MyClass_awss3BucketS3Bucket_3EE7B188"
          }
        }
      },
      "root_awss3BucketS3Bucket_8213AA37": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws.s3Bucket.S3Bucket",
            "uniqueId": "root_awss3BucketS3Bucket_8213AA37"
          }
        },
        "acl": "private",
        "bucket_prefix": "hello"
      }
    },
    "aws_s3_object": {
      "root_testcapturefrominflight_Handler_S3Object_D2691BFE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:capture from inflight/Handler/S3Object",
            "uniqueId": "root_testcapturefrominflight_Handler_S3Object_D2691BFE"
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
const aws = require("@cdktf/provider-aws");
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class MyClass extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("getBucketArn", "$inflight_init");
        const __parent_this = this;
        this.b2 = this.node.root.new("@cdktf/provider-aws.s3Bucket.S3Bucket",aws.s3Bucket.S3Bucket,this,"aws.s3Bucket.S3Bucket");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyClass.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyClassClient = ${MyClass._toInflightType(this).text};
            const client = new MyClassClient({
              b2: ${this._lift(this.b2, ["arn"])},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyClass._registerBindObject(this.b2, host, ["arn"]);
        }
        if (ops.includes("getBucketArn")) {
          MyClass._registerBindObject(this.b2, host, ["arn"]);
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
            b: ${context._lift(b, ["arn", "bucketDomainName"])},
            c: ${context._lift(c, ["getBucketArn"])},
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
          $Closure1._registerBindObject(b, host, ["arn", "bucketDomainName"]);
          $Closure1._registerBindObject(c, host, ["getBucketArn"]);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(b, host, ["arn", "bucketDomainName"]);
          $Closure1._registerBindObject(c, host, ["getBucketArn"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.new("@cdktf/provider-aws.s3Bucket.S3Bucket",aws.s3Bucket.S3Bucket,this,"aws.s3Bucket.S3Bucket",{ bucketPrefix: "hello", acl: "private" });
    const c = new MyClass(this,"MyClass");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:capture from inflight",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "bring_cdktf", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


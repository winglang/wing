# [test_bucket.w](../../../../examples/tests/valid/test_bucket.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ b }) {
  class  $Inflight1 {
    constructor({  }) {
    }
    async handle(_)  {
      {
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 0)'`)})(((await b.list()).length === 0))};
        (await b.put("hello.txt","world"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 1)'`)})(((await b.list()).length === 1))};
      }
    }
  }
  return $Inflight1;
}

```

## clients/$Inflight2.inflight.js
```js
module.exports = function({ b }) {
  class  $Inflight2 {
    constructor({  }) {
    }
    async handle(_)  {
      {
        (await b.put("hello.txt","world"));
        {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.get("hello.txt")) === "world")'`)})(((await b.get("hello.txt")) === "world"))};
      }
    }
  }
  return $Inflight2;
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
      "value": "[[\"root/Default/Default/test:put\",\"${aws_lambda_function.root_testput_449428F9.arn}\"],[\"root/Default/Default/test:get\",\"${aws_lambda_function.root_testget_D2443E25.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testget_IamRole_DD77F38A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/IamRole",
            "uniqueId": "root_testget_IamRole_DD77F38A"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testput_IamRole_1BBF32A6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/IamRole",
            "uniqueId": "root_testput_IamRole_1BBF32A6"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testget_IamRolePolicy_2CFB696B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/IamRolePolicy",
            "uniqueId": "root_testget_IamRolePolicy_2CFB696B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testget_IamRole_DD77F38A.name}"
      },
      "root_testput_IamRolePolicy_98659F09": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/IamRolePolicy",
            "uniqueId": "root_testput_IamRolePolicy_98659F09"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testput_IamRole_1BBF32A6.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testget_IamRolePolicyAttachment_1BD905A8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/IamRolePolicyAttachment",
            "uniqueId": "root_testget_IamRolePolicyAttachment_1BD905A8"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testget_IamRole_DD77F38A.name}"
      },
      "root_testput_IamRolePolicyAttachment_E73FB6BB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/IamRolePolicyAttachment",
            "uniqueId": "root_testput_IamRolePolicyAttachment_E73FB6BB"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testput_IamRole_1BBF32A6.name}"
      }
    },
    "aws_lambda_function": {
      "root_testget_D2443E25": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/Default",
            "uniqueId": "root_testget_D2443E25"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "test-get-c8e58069"
          }
        },
        "function_name": "test-get-c8e58069",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testget_IamRole_DD77F38A.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testget_S3Object_071392B9.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testput_449428F9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/Default",
            "uniqueId": "root_testput_449428F9"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "WING_FUNCTION_NAME": "test-put-c899ce9b"
          }
        },
        "function_name": "test-put-c899ce9b",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testput_IamRole_1BBF32A6.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testput_S3Object_30BF1DDD.key}",
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
      "root_testget_S3Object_071392B9": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:get/S3Object",
            "uniqueId": "root_testget_S3Object_071392B9"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testput_S3Object_30BF1DDD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:put/S3Object",
            "uniqueId": "root_testput_S3Object_30BF1DDD"
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
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:put",(( () =>  {
      {
        class $Inflight1 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const b_client = this._lift(b);
            const self_client_path = "./clients/$Inflight1.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight1 = require("${self_client_path}")({
                  b: ${b_client},
                });
                const client = new $Inflight1({
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
              this._registerBindObject(b, host, ["list", "put"]);
            }
            super._registerBind(host, ops);
          }
        }
        return new $Inflight1(this,"$Inflight1");
      }
    }
    )()));
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test:get",(( () =>  {
      {
        class $Inflight2 extends $stdlib.std.Resource {
          constructor(scope, id, ) {
            super(scope, id);
            this._addInflightOps("handle");
          }
          _toInflight() {
            const b_client = this._lift(b);
            const self_client_path = "./clients/$Inflight2.inflight.js".replace(/\\/g, "/");
            return $stdlib.core.NodeJsCode.fromInline(`
              (await (async () => {
                const $Inflight2 = require("${self_client_path}")({
                  b: ${b_client},
                });
                const client = new $Inflight2({
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
              this._registerBindObject(b, host, ["get", "put"]);
            }
            super._registerBind(host, ops);
          }
        }
        return new $Inflight2(this,"$Inflight2");
      }
    }
    )()));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "test_bucket", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## proc1/index.js
```js
async handle(_) {
  const { b } = this;
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 0)'`)})(((await b.list()).length === 0))};
  (await b.put("hello.txt","world"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.list()).length === 1)'`)})(((await b.list()).length === 1))};
}

```

## proc2/index.js
```js
async handle(_) {
  const { b } = this;
  (await b.put("hello.txt","world"));
  {((cond) => {if (!cond) throw new Error(`assertion failed: '((await b.get("hello.txt")) === "world")'`)})(((await b.get("hello.txt")) === "world"))};
}

```


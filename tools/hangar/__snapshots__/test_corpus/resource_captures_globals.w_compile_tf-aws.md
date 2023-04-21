# [resource_captures_globals.w](../../../../examples/tests/valid/resource_captures_globals.w) | compile | tf-aws

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
      "value": "[[\"root/Default/Default/test\",\"${aws_lambda_function.root_test_AAE85061.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
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
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "root_test_IamRole_6CDC2D16": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRole",
            "uniqueId": "root_test_IamRole_6CDC2D16"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_test_IamRolePolicy_474A6820": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicy",
            "uniqueId": "root_test_IamRolePolicy_474A6820"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}\",\"${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_test_IamRolePolicyAttachment_1102A28A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/IamRolePolicyAttachment",
            "uniqueId": "root_test_IamRolePolicyAttachment_1102A28A"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.name}"
      }
    },
    "aws_lambda_function": {
      "root_test_AAE85061": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/Default",
            "uniqueId": "root_test_AAE85061"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_ae5b06c6": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
            "BUCKET_NAME_ae5b06c6_IS_PUBLIC": "false",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs16.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_test_S3Object_A16CD789.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Another_First_cloudBucket_B4A67079": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Default",
            "uniqueId": "root_Another_First_cloudBucket_B4A67079"
          }
        },
        "bucket_prefix": "cloud-bucket-c84d72a1-",
        "force_destroy": false
      },
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
      "root_Another_First_cloudBucket_PublicAccessBlock_E03A84DE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_Another_First_cloudBucket_PublicAccessBlock_E03A84DE"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
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
      "root_Another_First_cloudBucket_Encryption_1049825A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "root_Another_First_cloudBucket_Encryption_1049825A"
          }
        },
        "bucket": "${aws_s3_bucket.root_Another_First_cloudBucket_B4A67079.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
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
      "root_test_S3Object_A16CD789": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test/S3Object",
            "uniqueId": "root_test_S3Object_A16CD789"
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
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push();
        this.my_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      _toInflight() {
        const my_resource_client = this._lift(this.my_resource);
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            class  First {
              constructor({ my_resource, stateful }) {
                this.my_resource = my_resource;
                this.stateful = stateful;
              }
            }
            const tmp = new First({
              my_resource: ${my_resource_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.my_resource, host, []);
          this._registerBindObject(this.stateful, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push("my_method");
        this.my_field = "hello!";
        this.first = new First(this,"First");
      }
      _toInflight() {
        const __global_counter_client = this._lift(global_counter);
        const first_client = this._lift(this.first);
        const my_field_client = this._lift(this.my_field);
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const global_counter = ${__global_counter_client};
            class  Another {
              constructor({ first, my_field, stateful }) {
                this.first = first;
                this.my_field = my_field;
                this.stateful = stateful;
              }
              async \$inflight_init()  {
                {
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'((await global_counter.peek()) === 0)\'\`)})(((await global_counter.peek()) === 0))};
                }
              }
              async my_method()  {
                {
                  (await global_counter.inc());
                  return (await global_counter.peek());
                }
              }
            }
            const tmp = new Another({
              first: ${first_client},
              my_field: ${my_field_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(global_counter, host, ["peek"]);
          this._registerBindObject(this.first, host, []);
          this._registerBindObject(this.my_field, host, []);
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("my_method")) {
          this._registerBindObject(global_counter, host, ["inc", "peek"]);
        }
        super._registerBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._inflightOps.push("my_put");
      }
      _toInflight() {
        const __global_another_client = this._lift(global_another);
        const __global_bool_client = this._lift(global_bool);
        const __global_map_of_num_client = this._lift(global_map_of_num);
        const __global_bucket_client = this._lift(global_bucket);
        const __global_num_client = this._lift(global_num);
        const __global_str_client = this._lift(global_str);
        const __global_array_of_str_client = this._lift(global_array_of_str);
        const __global_set_of_str_client = this._lift(global_set_of_str);
        const stateful_client = this._lift(this.stateful);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const global_another = ${__global_another_client};
            const global_bool = ${__global_bool_client};
            const global_map_of_num = ${__global_map_of_num_client};
            const global_bucket = ${__global_bucket_client};
            const global_num = ${__global_num_client};
            const global_str = ${__global_str_client};
            const global_array_of_str = ${__global_array_of_str_client};
            const global_set_of_str = ${__global_set_of_str_client};
            class  MyResource {
              constructor({ stateful }) {
                this.stateful = stateful;
              }
              async my_put()  {
                {
                  (await global_bucket.put("key","value"));
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(global_str === "hello")\'\`)})((global_str === "hello"))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(global_bool === true)\'\`)})((global_bool === true))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(global_num === 42)\'\`)})((global_num === 42))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'((await global_array_of_str.at(0)) === "hello")\'\`)})(((await global_array_of_str.at(0)) === "hello"))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'((global_map_of_num)["a"] === (-5))\'\`)})(((global_map_of_num)["a"] === (-5)))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(await global_set_of_str.has("a"))\'\`)})((await global_set_of_str.has("a")))};
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'(global_another.my_field === "hello!")\'\`)})((global_another.my_field === "hello!"))};
                  (await global_another.first.my_resource.put("key","value"));
                  {((cond) => {if (!cond) throw new Error(\`assertion failed: \'((await global_another.my_method()) > 0)\'\`)})(((await global_another.my_method()) > 0))};
                }
              }
            }
            const tmp = new MyResource({
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("my_put")) {
          this._registerBindObject(global_another, host, ["my_method"]);
          this._registerBindObject(global_another.first.my_resource, host, ["put"]);
          this._registerBindObject(global_another.my_field, host, []);
          this._registerBindObject(global_array_of_str, host, ["at"]);
          this._registerBindObject(global_bool, host, []);
          this._registerBindObject(global_bucket, host, ["put"]);
          this._registerBindObject(global_map_of_num, host, ["get"]);
          this._registerBindObject(global_num, host, []);
          this._registerBindObject(global_set_of_str, host, ["has"]);
          this._registerBindObject(global_str, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const global_bucket = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const global_counter = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const global_str = "hello";
    const global_bool = true;
    const global_num = 42;
    const global_array_of_str = Object.freeze(["hello", "world"]);
    const global_map_of_num = Object.freeze({"a":(-5),"b":2});
    const global_set_of_str = Object.freeze(new Set(["a", "b"]));
    const global_another = new Another(this,"Another");
    const res = new MyResource(this,"MyResource");
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        res: {
          obj: res,
          ops: ["my_put"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource_captures_globals", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
async handle() {
  const { res } = this;
  (await res.my_put());
}

```


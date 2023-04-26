# [resource_captures.w](../../../../examples/tests/valid/resource_captures.w) | compile | tf-aws

## clients/Another.inflight.js
```js
class  Another {
  constructor({ first, my_field, stateful }) {
    this.first = first;
    this.my_field = my_field;
    this.stateful = stateful;
  }
  async meaning_of_life()  {
    {
      return 42;
    }
  }
  async another_func()  {
    {
      return "42";
    }
  }
}
exports.Another = Another;

```

## clients/First.inflight.js
```js
class  First {
  constructor({ my_resource, stateful }) {
    this.my_resource = my_resource;
    this.stateful = stateful;
  }
}
exports.First = First;

```

## clients/MyResource.inflight.js
```js
class  MyResource {
  constructor({ another, array_of_str, ext_bucket, ext_num, map_of_num, my_bool, my_num, my_opt_str, my_queue, my_resource, my_str, set_of_str, unused_resource, stateful }) {
    this.another = another;
    this.array_of_str = array_of_str;
    this.ext_bucket = ext_bucket;
    this.ext_num = ext_num;
    this.map_of_num = map_of_num;
    this.my_bool = my_bool;
    this.my_num = my_num;
    this.my_opt_str = my_opt_str;
    this.my_queue = my_queue;
    this.my_resource = my_resource;
    this.my_str = my_str;
    this.set_of_str = set_of_str;
    this.unused_resource = unused_resource;
    this.stateful = stateful;
  }
  async test_no_capture()  {
    {
      const arr = Object.freeze([1, 2, 3]);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr.length === 3)'`)})((arr.length === 3))};
      {console.log(`array.len=${arr.length}`)};
    }
  }
  async test_capture_collections_of_data()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.array_of_str.length === 2)'`)})((this.array_of_str.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.array_of_str.at(0)) === "s1")'`)})(((await this.array_of_str.at(0)) === "s1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.array_of_str.at(1)) === "s2")'`)})(((await this.array_of_str.at(1)) === "s2"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.map_of_num)["k1"] === 11)'`)})(((this.map_of_num)["k1"] === 11))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.map_of_num)["k2"] === 22)'`)})(((this.map_of_num)["k2"] === 22))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.set_of_str.has("s1"))'`)})((await this.set_of_str.has("s1")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.set_of_str.has("s2"))'`)})((await this.set_of_str.has("s2")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(await this.set_of_str.has("s3")))'`)})((!(await this.set_of_str.has("s3"))))};
    }
  }
  async test_capture_primitives()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.my_str === "my_string")'`)})((this.my_str === "my_string"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.my_num === 42)'`)})((this.my_num === 42))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.my_bool === true)'`)})((this.my_bool === true))};
    }
  }
  async test_capture_optional()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.my_opt_str ?? "") === "my_opt_string")'`)})(((this.my_opt_str ?? "") === "my_opt_string"))};
    }
  }
  async test_capture_resource()  {
    {
      (await this.my_resource.put("f1.txt","f1"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.my_resource.get("f1.txt")) === "f1")'`)})(((await this.my_resource.get("f1.txt")) === "f1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.my_resource.list()).length === 1)'`)})(((await this.my_resource.list()).length === 1))};
    }
  }
  async test_nested_preflight_field()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.another.my_field === "hello!")'`)})((this.another.my_field === "hello!"))};
      {console.log(`field=${this.another.my_field}`)};
    }
  }
  async test_nested_resource()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.first.my_resource.list()).length === 0)'`)})(((await this.another.first.my_resource.list()).length === 0))};
      (await this.another.first.my_resource.put("hello",this.my_str));
      {console.log(`this.another.first.my_resource:${(await this.another.first.my_resource.get("hello"))}`)};
    }
  }
  async test_expression_recursive()  {
    {
      (await this.my_queue.push(this.my_str));
    }
  }
  async test_external()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.ext_bucket.list()).length === 0)'`)})(((await this.ext_bucket.list()).length === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.ext_num === 12)'`)})((this.ext_num === 12))};
    }
  }
  async test_user_defined_resource()  {
    {
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.meaning_of_life()) === 42)'`)})(((await this.another.meaning_of_life()) === 42))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.another_func()) === "42")'`)})(((await this.another.another_func()) === "42"))};
    }
  }
  async test_inflight_field()  {
    {
      this.inflight_field = 123;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.inflight_field === 123)'`)})((this.inflight_field === 123))};
    }
  }
}
exports.MyResource = MyResource;

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
      "root_MyResource_cloudCounter_B6FF7B6A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "root_MyResource_cloudCounter_B6FF7B6A"
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
        "name": "wing-counter-cloud.Counter-c87187fa"
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
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}\",\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}\",\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}\",\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}\",\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_MyResource_cloudQueue_156CFA11.arn}\"],\"Effect\":\"Allow\"}]}",
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
            "BUCKET_NAME_51ee81c0": "${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.bucket}",
            "BUCKET_NAME_51ee81c0_IS_PUBLIC": "false",
            "BUCKET_NAME_830bf023": "${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.bucket}",
            "BUCKET_NAME_830bf023_IS_PUBLIC": "false",
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "BUCKET_NAME_d755b447_IS_PUBLIC": "false",
            "DYNAMODB_TABLE_NAME_5afed199": "${aws_dynamodb_table.root_MyResource_cloudCounter_B6FF7B6A.name}",
            "QUEUE_URL_ea9f63d6": "${aws_sqs_queue.root_MyResource_cloudQueue_156CFA11.url}",
            "WING_FUNCTION_NAME": "test-c8b6eece"
          }
        },
        "function_name": "test-c8b6eece",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_test_IamRole_6CDC2D16.arn}",
        "runtime": "nodejs18.x",
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
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      },
      "root_MyResource_Another_First_cloudBucket_5E92C18E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Another/First/cloud.Bucket/Default",
            "uniqueId": "root_MyResource_Another_First_cloudBucket_5E92C18E"
          }
        },
        "bucket_prefix": "cloud-bucket-c8e81a49-",
        "force_destroy": false
      },
      "root_MyResource_cloudBucket_AF30D75E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Bucket/Default",
            "uniqueId": "root_MyResource_cloudBucket_AF30D75E"
          }
        },
        "bucket_prefix": "cloud-bucket-c8f3d54f-",
        "force_destroy": false
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
      "root_MyResource_Another_First_cloudBucket_PublicAccessBlock_7FF0A7C8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Another/First/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_MyResource_Another_First_cloudBucket_PublicAccessBlock_7FF0A7C8"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "root_MyResource_cloudBucket_PublicAccessBlock_953F0137": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_MyResource_cloudBucket_PublicAccessBlock_953F0137"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.bucket}",
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
      "root_MyResource_Another_First_cloudBucket_Encryption_6E2F8C12": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "root_MyResource_Another_First_cloudBucket_Encryption_6E2F8C12"
          }
        },
        "bucket": "${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "root_MyResource_cloudBucket_Encryption_1E1FD60D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Bucket/Encryption",
            "uniqueId": "root_MyResource_cloudBucket_Encryption_1E1FD60D"
          }
        },
        "bucket": "${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.bucket}",
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
    },
    "aws_sqs_queue": {
      "root_MyResource_cloudQueue_156CFA11": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Queue/Default",
            "uniqueId": "root_MyResource_cloudQueue_156CFA11"
          }
        },
        "name": "cloud-Queue-c8185458"
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
        this.my_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      _toInflight() {
        const my_resource_client = this._lift(this.my_resource);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/First.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).First({
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
        this._addInflightOps("meaning_of_life", "another_func");
        this.my_field = "hello!";
        this.first = new First(this,"First");
      }
      _toInflight() {
        const first_client = this._lift(this.first);
        const my_field_client = this._lift(this.my_field);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/Another.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).Another({
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
          this._registerBindObject(this.first, host, []);
          this._registerBindObject(this.my_field, host, []);
          this._registerBindObject(this.stateful, host, []);
        }
        if (ops.includes("another_func")) {
        }
        if (ops.includes("meaning_of_life")) {
        }
        super._registerBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, external_bucket, external_num) {
        super(scope, id);
        this._addInflightOps("test_no_capture", "test_capture_collections_of_data", "test_capture_primitives", "test_capture_optional", "test_capture_resource", "test_nested_preflight_field", "test_nested_resource", "test_expression_recursive", "test_external", "test_user_defined_resource", "test_inflight_field");
        this.my_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.my_str = "my_string";
        this.my_num = 42;
        this.my_bool = true;
        this.my_opt_str = "my_opt_string";
        this.array_of_str = Object.freeze(["s1", "s2"]);
        this.map_of_num = Object.freeze({"k1":11,"k2":22});
        this.set_of_str = Object.freeze(new Set(["s1", "s2", "s1"]));
        this.another = new Another(this,"Another");
        this.my_queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.ext_bucket = external_bucket;
        this.ext_num = external_num;
        this.unused_resource = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
       hello_preflight()  {
        {
          return this.another;
        }
      }
      _toInflight() {
        const another_client = this._lift(this.another);
        const array_of_str_client = this._lift(this.array_of_str);
        const ext_bucket_client = this._lift(this.ext_bucket);
        const ext_num_client = this._lift(this.ext_num);
        const map_of_num_client = this._lift(this.map_of_num);
        const my_bool_client = this._lift(this.my_bool);
        const my_num_client = this._lift(this.my_num);
        const my_opt_str_client = this._lift(this.my_opt_str);
        const my_queue_client = this._lift(this.my_queue);
        const my_resource_client = this._lift(this.my_resource);
        const my_str_client = this._lift(this.my_str);
        const set_of_str_client = this._lift(this.set_of_str);
        const unused_resource_client = this._lift(this.unused_resource);
        const stateful_client = this._lift(this.stateful);
        const self_client_path = "./clients/MyResource.inflight.js".replace(/\\/g, "/");
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const tmp = new (require("${self_client_path}")).MyResource({
              another: ${another_client},
              array_of_str: ${array_of_str_client},
              ext_bucket: ${ext_bucket_client},
              ext_num: ${ext_num_client},
              map_of_num: ${map_of_num_client},
              my_bool: ${my_bool_client},
              my_num: ${my_num_client},
              my_opt_str: ${my_opt_str_client},
              my_queue: ${my_queue_client},
              my_resource: ${my_resource_client},
              my_str: ${my_str_client},
              set_of_str: ${set_of_str_client},
              unused_resource: ${unused_resource_client},
              stateful: ${stateful_client},
            });
            if (tmp.$inflight_init) { await tmp.$inflight_init(); }
            return tmp;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          this._registerBindObject(this.another, host, []);
          this._registerBindObject(this.array_of_str, host, []);
          this._registerBindObject(this.ext_bucket, host, []);
          this._registerBindObject(this.ext_num, host, []);
          this._registerBindObject(this.map_of_num, host, []);
          this._registerBindObject(this.my_bool, host, []);
          this._registerBindObject(this.my_num, host, []);
          this._registerBindObject(this.my_opt_str, host, []);
          this._registerBindObject(this.my_queue, host, []);
          this._registerBindObject(this.my_resource, host, []);
          this._registerBindObject(this.my_str, host, []);
          this._registerBindObject(this.set_of_str, host, []);
          this._registerBindObject(this.stateful, host, []);
          this._registerBindObject(this.unused_resource, host, []);
        }
        if (ops.includes("test_capture_collections_of_data")) {
          this._registerBindObject(this.array_of_str, host, ["at", "length"]);
          this._registerBindObject(this.map_of_num, host, ["get"]);
          this._registerBindObject(this.set_of_str, host, ["has"]);
        }
        if (ops.includes("test_capture_optional")) {
          this._registerBindObject(this.my_opt_str, host, []);
        }
        if (ops.includes("test_capture_primitives")) {
          this._registerBindObject(this.my_bool, host, []);
          this._registerBindObject(this.my_num, host, []);
          this._registerBindObject(this.my_str, host, []);
        }
        if (ops.includes("test_capture_resource")) {
          this._registerBindObject(this.my_resource, host, ["get", "list", "put"]);
        }
        if (ops.includes("test_expression_recursive")) {
          this._registerBindObject(this.my_queue, host, ["push"]);
          this._registerBindObject(this.my_str, host, []);
        }
        if (ops.includes("test_external")) {
          this._registerBindObject(this.ext_bucket, host, ["list"]);
          this._registerBindObject(this.ext_num, host, []);
        }
        if (ops.includes("test_inflight_field")) {
        }
        if (ops.includes("test_nested_preflight_field")) {
          this._registerBindObject(this.another.my_field, host, []);
        }
        if (ops.includes("test_nested_resource")) {
          this._registerBindObject(this.another.first.my_resource, host, ["get", "list", "put"]);
          this._registerBindObject(this.my_str, host, []);
        }
        if (ops.includes("test_no_capture")) {
        }
        if (ops.includes("test_user_defined_resource")) {
          this._registerBindObject(this.another, host, ["another_func", "meaning_of_life"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const r = new MyResource(this,"MyResource",b,12);
    this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"test",new $stdlib.core.Inflight(this, "$Inflight1", {
      code: $stdlib.core.NodeJsCode.fromFile(require.resolve("./proc1/index.js".replace(/\\/g, "/"))),
      bindings: {
        r: {
          obj: r,
          ops: ["test_capture_collections_of_data","test_capture_optional","test_capture_primitives","test_capture_resource","test_expression_recursive","test_external","test_inflight_field","test_nested_preflight_field","test_nested_resource","test_no_capture","test_user_defined_resource"]
        },
      }
    })
    );
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "resource_captures", plugins: $plugins, isTestEnvironment: $wing_is_test });
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
  const { r } = this;
  (await r.test_no_capture());
  (await r.test_capture_collections_of_data());
  (await r.test_capture_primitives());
  (await r.test_capture_optional());
  (await r.test_capture_resource());
  (await r.test_nested_preflight_field());
  (await r.test_nested_resource());
  (await r.test_expression_recursive());
  (await r.test_external());
  (await r.test_user_defined_resource());
  (await r.test_inflight_field());
}

```


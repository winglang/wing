# [resource_captures.w](../../../../examples/tests/valid/resource_captures.w) | compile | tf-aws

## clients/$Inflight1.inflight.js
```js
module.exports = function({ r }) {
  class $Inflight1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await r.testNoCapture());
      (await r.testCaptureCollectionsOfData());
      (await r.testCapturePrimitives());
      (await r.testCaptureOptional());
      (await r.testCaptureResource());
      (await r.testNestedInflightField());
      (await r.testNestedResource());
      (await r.testExpressionRecursive());
      (await r.testExternal());
      (await r.testUserDefinedResource());
      (await r.testInflightField());
    }
  }
  return $Inflight1;
}

```

## clients/Another.inflight.js
```js
module.exports = function({  }) {
  class Another {
    constructor({ first, myField }) {
      this.first = first;
      this.myField = myField;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
    async meaningOfLife()  {
      const __parent_this = this;
      return 42;
    }
    async anotherFunc()  {
      const __parent_this = this;
      return "42";
    }
  }
  return Another;
}

```

## clients/First.inflight.js
```js
module.exports = function({  }) {
  class First {
    constructor({ myResource }) {
      this.myResource = myResource;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return First;
}

```

## clients/MyResource.inflight.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ another, arrayOfStr, extBucket, extNum, mapOfNum, myBool, myNum, myOptStr, myQueue, myResource, myStr, setOfStr, unusedResource }) {
      this.another = another;
      this.arrayOfStr = arrayOfStr;
      this.extBucket = extBucket;
      this.extNum = extNum;
      this.mapOfNum = mapOfNum;
      this.myBool = myBool;
      this.myNum = myNum;
      this.myOptStr = myOptStr;
      this.myQueue = myQueue;
      this.myResource = myResource;
      this.myStr = myStr;
      this.setOfStr = setOfStr;
      this.unusedResource = unusedResource;
    }
    async $inflight_init()  {
      const __parent_this = this;
      this.inflightField = 123;
    }
    async testNoCapture()  {
      const __parent_this = this;
      const arr = Object.freeze([1, 2, 3]);
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(arr.length === 3)'`)})((arr.length === 3))};
      {console.log(`array.len=${arr.length}`)};
    }
    async testCaptureCollectionsOfData()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.arrayOfStr.length === 2)'`)})((this.arrayOfStr.length === 2))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.arrayOfStr.at(0)) === "s1")'`)})(((await this.arrayOfStr.at(0)) === "s1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.arrayOfStr.at(1)) === "s2")'`)})(((await this.arrayOfStr.at(1)) === "s2"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.mapOfNum)["k1"] === 11)'`)})(((this.mapOfNum)["k1"] === 11))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.mapOfNum)["k2"] === 22)'`)})(((this.mapOfNum)["k2"] === 22))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.setOfStr.has("s1"))'`)})((await this.setOfStr.has("s1")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(await this.setOfStr.has("s2"))'`)})((await this.setOfStr.has("s2")))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(!(await this.setOfStr.has("s3")))'`)})((!(await this.setOfStr.has("s3"))))};
    }
    async testCapturePrimitives()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.myStr === "myString")'`)})((this.myStr === "myString"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.myNum === 42)'`)})((this.myNum === 42))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.myBool === true)'`)})((this.myBool === true))};
    }
    async testCaptureOptional()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((this.myOptStr ?? "") === "myOptString")'`)})(((this.myOptStr ?? "") === "myOptString"))};
    }
    async testCaptureResource()  {
      const __parent_this = this;
      (await this.myResource.put("f1.txt","f1"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.myResource.get("f1.txt")) === "f1")'`)})(((await this.myResource.get("f1.txt")) === "f1"))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.myResource.list()).length === 1)'`)})(((await this.myResource.list()).length === 1))};
    }
    async testNestedInflightField()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.another.myField === "hello!")'`)})((this.another.myField === "hello!"))};
      {console.log(`field=${this.another.myField}`)};
    }
    async testNestedResource()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.first.myResource.list()).length === 0)'`)})(((await this.another.first.myResource.list()).length === 0))};
      (await this.another.first.myResource.put("hello",this.myStr));
      {console.log(`this.another.first.myResource:${(await this.another.first.myResource.get("hello"))}`)};
    }
    async testExpressionRecursive()  {
      const __parent_this = this;
      (await this.myQueue.push(this.myStr));
    }
    async testExternal()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.extBucket.list()).length === 0)'`)})(((await this.extBucket.list()).length === 0))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.extNum === 12)'`)})((this.extNum === 12))};
    }
    async testUserDefinedResource()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.meaningOfLife()) === 42)'`)})(((await this.another.meaningOfLife()) === 42))};
      {((cond) => {if (!cond) throw new Error(`assertion failed: '((await this.another.anotherFunc()) === "42")'`)})(((await this.another.anotherFunc()) === "42"))};
    }
    async testInflightField()  {
      const __parent_this = this;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(this.inflightField === 123)'`)})((this.inflightField === 123))};
    }
  }
  return MyResource;
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
      "value": "[[\"root/Default/Default/test:test\",\"${aws_lambda_function.root_testtest_Handler_046C3415.arn}\"]]"
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
      "root_testtest_Handler_IamRole_6C1728D1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRole",
            "uniqueId": "root_testtest_Handler_IamRole_6C1728D1"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testtest_Handler_IamRolePolicy_65A1D8BE": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "root_testtest_Handler_IamRolePolicy_65A1D8BE"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}\",\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}\",\"${aws_s3_bucket.root_MyResource_cloudBucket_AF30D75E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}\",\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:List*\"],\"Resource\":[\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}\",\"${aws_s3_bucket.root_MyResource_Another_First_cloudBucket_5E92C18E.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_MyResource_cloudQueue_156CFA11.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testtest_Handler_IamRolePolicyAttachment_3716AC26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testtest_Handler_IamRolePolicyAttachment_3716AC26"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.name}"
      }
    },
    "aws_lambda_function": {
      "root_testtest_Handler_046C3415": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/Default",
            "uniqueId": "root_testtest_Handler_046C3415"
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
            "WING_FUNCTION_NAME": "Handler-c8f4f2a1"
          }
        },
        "function_name": "Handler-c8f4f2a1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testtest_Handler_IamRole_6C1728D1.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testtest_Handler_S3Object_71CD07AC.key}",
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
      "root_testtest_Handler_S3Object_71CD07AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:test/Handler/S3Object",
            "uniqueId": "root_testtest_Handler_S3Object_71CD07AC"
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
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/First.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const myResource_client = this._lift(this.myResource);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FirstClient = ${First._toInflightType(this).text};
            const client = new FirstClient({
              myResource: ${myResource_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          First._registerBindObject(this.myResource, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("meaningOfLife", "anotherFunc");
        const __parent_this = this;
        this.myField = "hello!";
        this.first = new First(this,"First");
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/Another.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const first_client = this._lift(this.first);
        const myField_client = this._lift(this.myField);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
              first: ${first_client},
              myField: ${myField_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Another._registerBindObject(this.first, host, []);
          Another._registerBindObject(this.myField, host, []);
        }
        if (ops.includes("anotherFunc")) {
        }
        if (ops.includes("meaningOfLife")) {
        }
        super._registerBind(host, ops);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, externalBucket, externalNum) {
        super(scope, id);
        this._addInflightOps("testNoCapture", "testCaptureCollectionsOfData", "testCapturePrimitives", "testCaptureOptional", "testCaptureResource", "testNestedInflightField", "testNestedResource", "testExpressionRecursive", "testExternal", "testUserDefinedResource", "testInflightField", "inflightField");
        const __parent_this = this;
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.myStr = "myString";
        this.myNum = 42;
        this.myBool = true;
        this.myOptStr = "myOptString";
        this.arrayOfStr = Object.freeze(["s1", "s2"]);
        this.mapOfNum = Object.freeze({"k1":11,"k2":22});
        this.setOfStr = Object.freeze(new Set(["s1", "s2", "s1"]));
        this.another = new Another(this,"Another");
        this.myQueue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.extBucket = externalBucket;
        this.extNum = externalNum;
        this.unusedResource = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
       helloPreflight()  {
        const __parent_this = this;
        return this.another;
      }
      static _toInflightType(context) {
        const self_client_path = "./clients/MyResource.inflight.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const another_client = this._lift(this.another);
        const arrayOfStr_client = this._lift(this.arrayOfStr);
        const extBucket_client = this._lift(this.extBucket);
        const extNum_client = this._lift(this.extNum);
        const mapOfNum_client = this._lift(this.mapOfNum);
        const myBool_client = this._lift(this.myBool);
        const myNum_client = this._lift(this.myNum);
        const myOptStr_client = this._lift(this.myOptStr);
        const myQueue_client = this._lift(this.myQueue);
        const myResource_client = this._lift(this.myResource);
        const myStr_client = this._lift(this.myStr);
        const setOfStr_client = this._lift(this.setOfStr);
        const unusedResource_client = this._lift(this.unusedResource);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              another: ${another_client},
              arrayOfStr: ${arrayOfStr_client},
              extBucket: ${extBucket_client},
              extNum: ${extNum_client},
              mapOfNum: ${mapOfNum_client},
              myBool: ${myBool_client},
              myNum: ${myNum_client},
              myOptStr: ${myOptStr_client},
              myQueue: ${myQueue_client},
              myResource: ${myResource_client},
              myStr: ${myStr_client},
              setOfStr: ${setOfStr_client},
              unusedResource: ${unusedResource_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject(this.another, host, []);
          MyResource._registerBindObject(this.arrayOfStr, host, []);
          MyResource._registerBindObject(this.extBucket, host, []);
          MyResource._registerBindObject(this.extNum, host, []);
          MyResource._registerBindObject(this.mapOfNum, host, []);
          MyResource._registerBindObject(this.myBool, host, []);
          MyResource._registerBindObject(this.myNum, host, []);
          MyResource._registerBindObject(this.myOptStr, host, []);
          MyResource._registerBindObject(this.myQueue, host, []);
          MyResource._registerBindObject(this.myResource, host, []);
          MyResource._registerBindObject(this.myStr, host, []);
          MyResource._registerBindObject(this.setOfStr, host, []);
          MyResource._registerBindObject(this.unusedResource, host, []);
        }
        if (ops.includes("testCaptureCollectionsOfData")) {
          MyResource._registerBindObject(this.arrayOfStr, host, ["at", "length"]);
          MyResource._registerBindObject(this.mapOfNum, host, ["get"]);
          MyResource._registerBindObject(this.setOfStr, host, ["has"]);
        }
        if (ops.includes("testCaptureOptional")) {
          MyResource._registerBindObject(this.myOptStr, host, []);
        }
        if (ops.includes("testCapturePrimitives")) {
          MyResource._registerBindObject(this.myBool, host, []);
          MyResource._registerBindObject(this.myNum, host, []);
          MyResource._registerBindObject(this.myStr, host, []);
        }
        if (ops.includes("testCaptureResource")) {
          MyResource._registerBindObject(this.myResource, host, ["get", "list", "put"]);
        }
        if (ops.includes("testExpressionRecursive")) {
          MyResource._registerBindObject(this.myQueue, host, ["push"]);
          MyResource._registerBindObject(this.myStr, host, []);
        }
        if (ops.includes("testExternal")) {
          MyResource._registerBindObject(this.extBucket, host, ["list"]);
          MyResource._registerBindObject(this.extNum, host, []);
        }
        if (ops.includes("testInflightField")) {
        }
        if (ops.includes("testNestedInflightField")) {
          MyResource._registerBindObject(this.another.myField, host, []);
        }
        if (ops.includes("testNestedResource")) {
          MyResource._registerBindObject(this.another.first.myResource, host, ["get", "list", "put"]);
          MyResource._registerBindObject(this.myStr, host, []);
        }
        if (ops.includes("testNoCapture")) {
        }
        if (ops.includes("testUserDefinedResource")) {
          MyResource._registerBindObject(this.another, host, ["anotherFunc", "meaningOfLife"]);
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
        const r_client = context._lift(r);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            r: ${r_client},
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
          $Inflight1._registerBindObject(r, host, []);
        }
        if (ops.includes("handle")) {
          $Inflight1._registerBindObject(r, host, ["testCaptureCollectionsOfData", "testCaptureOptional", "testCapturePrimitives", "testCaptureResource", "testExpressionRecursive", "testExternal", "testInflightField", "testNestedInflightField", "testNestedResource", "testNoCapture", "testUserDefinedResource"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const r = new MyResource(this,"MyResource",b,12);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Inflight1(this,"$Inflight1"));
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


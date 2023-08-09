# [resource_captures.w](../../../../../examples/tests/valid/resource_captures.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ $r }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $r.testNoCapture());
      (await $r.testCaptureCollectionsOfData());
      (await $r.testCapturePrimitives());
      (await $r.testCaptureOptional());
      (await $r.testCaptureResource());
      (await $r.testNestedInflightField());
      (await $r.testNestedResource());
      (await $r.testExpressionRecursive());
      (await $r.testExternal());
      (await $r.testUserDefinedResource());
      (await $r.testInflightField());
    }
  }
  return $Closure1;
}

```

## inflight.Another.js
```js
module.exports = function({  }) {
  class Another {
    constructor({  }) {
    }
    async meaningOfLife() {
      return 42;
    }
    async anotherFunc() {
      return "42";
    }
  }
  return Another;
}

```

## inflight.First.js
```js
module.exports = function({  }) {
  class First {
    constructor({  }) {
    }
  }
  return First;
}

```

## inflight.MyResource.js
```js
module.exports = function({  }) {
  class MyResource {
    constructor({ $___this_setOfStr_has__s3____, $_this_arrayOfStr_at_0__, $_this_arrayOfStr_at_1__, $_this_mapOfNum___k1__, $_this_mapOfNum___k2__, $_this_myOptStr_______, $_this_setOfStr_has__s1___, $_this_setOfStr_has__s2___, $this_another, $this_another_first_myResource, $this_another_myField, $this_arrayOfStr_length, $this_extBucket, $this_extNum, $this_myBool, $this_myNum, $this_myQueue, $this_myResource, $this_myStr }) {
      this.$___this_setOfStr_has__s3____ = $___this_setOfStr_has__s3____;
      this.$_this_arrayOfStr_at_0__ = $_this_arrayOfStr_at_0__;
      this.$_this_arrayOfStr_at_1__ = $_this_arrayOfStr_at_1__;
      this.$_this_mapOfNum___k1__ = $_this_mapOfNum___k1__;
      this.$_this_mapOfNum___k2__ = $_this_mapOfNum___k2__;
      this.$_this_myOptStr_______ = $_this_myOptStr_______;
      this.$_this_setOfStr_has__s1___ = $_this_setOfStr_has__s1___;
      this.$_this_setOfStr_has__s2___ = $_this_setOfStr_has__s2___;
      this.$this_another = $this_another;
      this.$this_another_first_myResource = $this_another_first_myResource;
      this.$this_another_myField = $this_another_myField;
      this.$this_arrayOfStr_length = $this_arrayOfStr_length;
      this.$this_extBucket = $this_extBucket;
      this.$this_extNum = $this_extNum;
      this.$this_myBool = $this_myBool;
      this.$this_myNum = $this_myNum;
      this.$this_myQueue = $this_myQueue;
      this.$this_myResource = $this_myResource;
      this.$this_myStr = $this_myStr;
    }
    async testNoCapture() {
      const arr = [1, 2, 3];
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr.length,3)))};
      {console.log(String.raw({ raw: ["array.len=", ""] }, arr.length))};
    }
    async testCaptureCollectionsOfData() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.arrayOfStr.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_arrayOfStr_length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.arrayOfStr.at(0) == \"s1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$_this_arrayOfStr_at_0__,"s1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.arrayOfStr.at(1) == \"s2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$_this_arrayOfStr_at_1__,"s2")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.mapOfNum.get(\"k1\") == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$_this_mapOfNum___k1__,11)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.mapOfNum.get(\"k2\") == 22")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$_this_mapOfNum___k2__,22)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.setOfStr.has(\"s1\")")})(this.$_this_setOfStr_has__s1___)};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.setOfStr.has(\"s2\")")})(this.$_this_setOfStr_has__s2___)};
      {((cond) => {if (!cond) throw new Error("assertion failed: !this.setOfStr.has(\"s3\")")})(this.$___this_setOfStr_has__s3____)};
    }
    async testCapturePrimitives() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myStr == \"myString\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_myStr,"myString")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myNum == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_myNum,42)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myBool == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_myBool,true)))};
    }
    async testCaptureOptional() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myOptStr ?? \"\" == \"myOptString\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$_this_myOptStr_______,"myOptString")))};
    }
    async testCaptureResource() {
      (await this.$this_myResource.put("f1.txt","f1"));
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myResource.get(\"f1.txt\") == \"f1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_myResource.get("f1.txt")),"f1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myResource.list().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_myResource.list()).length,1)))};
    }
    async testNestedInflightField() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.another.myField == \"hello!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_another_myField,"hello!")))};
      {console.log(String.raw({ raw: ["field=", ""] }, this.$this_another_myField))};
    }
    async testNestedResource() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.another.first.myResource.list().length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_another_first_myResource.list()).length,0)))};
      (await this.$this_another_first_myResource.put("hello",this.$this_myStr));
      {console.log(String.raw({ raw: ["this.another.first.myResource:", ""] }, (await this.$this_another_first_myResource.get("hello"))))};
    }
    async testExpressionRecursive() {
      (await this.$this_myQueue.push(this.$this_myStr));
    }
    async testExternal() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.extBucket.list().length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_extBucket.list()).length,0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.extNum == 12")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_extNum,12)))};
    }
    async testUserDefinedResource() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.another.meaningOfLife() == 42")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_another.meaningOfLife()),42)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.another.anotherFunc() == \"42\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_another.anotherFunc()),"42")))};
    }
    async testInflightField() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.inflightField == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.inflightField,123)))};
    }
    async $inflight_init() {
      this.inflightField = 123;
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
      "value": "[[\"root/undefined/Default/test:test\",\"${aws_lambda_function.undefined_testtest_Handler_A295E574.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "undefined_MyResource_cloudCounter_6CFC5035": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "undefined_MyResource_cloudCounter_6CFC5035"
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
        "name": "wing-counter-cloud.Counter-c89c4847"
      }
    },
    "aws_iam_role": {
      "undefined_testtest_Handler_IamRole_50D3D3C7": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRole",
            "uniqueId": "undefined_testtest_Handler_IamRole_50D3D3C7"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicy",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicy_CC9DE4FB"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}\",\"${aws_s3_bucket.undefined_cloudBucket_7A0DE585.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_MyResource_cloudBucket_48577223.arn}\",\"${aws_s3_bucket.undefined_MyResource_cloudBucket_48577223.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.undefined_MyResource_Another_First_cloudBucket_0C2BC349.arn}\",\"${aws_s3_bucket.undefined_MyResource_Another_First_cloudBucket_0C2BC349.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.undefined_MyResource_cloudQueue_97BE92DA.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/IamRolePolicyAttachment",
            "uniqueId": "undefined_testtest_Handler_IamRolePolicyAttachment_E8519A65"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.name}"
      }
    },
    "aws_lambda_function": {
      "undefined_testtest_Handler_A295E574": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/Default",
            "uniqueId": "undefined_testtest_Handler_A295E574"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_7c20b234": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
            "BUCKET_NAME_879fe2c8": "${aws_s3_bucket.undefined_MyResource_cloudBucket_48577223.bucket}",
            "BUCKET_NAME_925ce61f": "${aws_s3_bucket.undefined_MyResource_Another_First_cloudBucket_0C2BC349.bucket}",
            "QUEUE_URL_cd84ce6c": "${aws_sqs_queue.undefined_MyResource_cloudQueue_97BE92DA.url}",
            "WING_FUNCTION_NAME": "Handler-c831cefb",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c831cefb",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.undefined_testtest_Handler_IamRole_50D3D3C7.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "s3_key": "${aws_s3_object.undefined_testtest_Handler_S3Object_96D88A6C.key}",
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
      "undefined_MyResource_Another_First_cloudBucket_0C2BC349": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/Another/First/cloud.Bucket/Default",
            "uniqueId": "undefined_MyResource_Another_First_cloudBucket_0C2BC349"
          }
        },
        "bucket_prefix": "cloud-bucket-c8d0ab8f-",
        "force_destroy": false
      },
      "undefined_MyResource_cloudBucket_48577223": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Bucket/Default",
            "uniqueId": "undefined_MyResource_cloudBucket_48577223"
          }
        },
        "bucket_prefix": "cloud-bucket-c8c20618-",
        "force_destroy": false
      },
      "undefined_cloudBucket_7A0DE585": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Default",
            "uniqueId": "undefined_cloudBucket_7A0DE585"
          }
        },
        "bucket_prefix": "cloud-bucket-c8802ab1-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "undefined_MyResource_Another_First_cloudBucket_PublicAccessBlock_25351ADD": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/Another/First/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_MyResource_Another_First_cloudBucket_PublicAccessBlock_25351ADD"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_MyResource_Another_First_cloudBucket_0C2BC349.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_MyResource_cloudBucket_PublicAccessBlock_5B43EA39": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_MyResource_cloudBucket_PublicAccessBlock_5B43EA39"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_MyResource_cloudBucket_48577223.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      },
      "undefined_cloudBucket_PublicAccessBlock_A3FBADF2": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "undefined_cloudBucket_PublicAccessBlock_A3FBADF2"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "undefined_MyResource_Another_First_cloudBucket_Encryption_FE2B2334": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/Another/First/cloud.Bucket/Encryption",
            "uniqueId": "undefined_MyResource_Another_First_cloudBucket_Encryption_FE2B2334"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_MyResource_Another_First_cloudBucket_0C2BC349.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_MyResource_cloudBucket_Encryption_FBE384E5": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Bucket/Encryption",
            "uniqueId": "undefined_MyResource_cloudBucket_Encryption_FBE384E5"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_MyResource_cloudBucket_48577223.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      },
      "undefined_cloudBucket_Encryption_80E33E4D": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/cloud.Bucket/Encryption",
            "uniqueId": "undefined_cloudBucket_Encryption_80E33E4D"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_cloudBucket_7A0DE585.bucket}",
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
      "undefined_testtest_Handler_S3Object_96D88A6C": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/test:test/Handler/S3Object",
            "uniqueId": "undefined_testtest_Handler_S3Object_96D88A6C"
          }
        },
        "bucket": "${aws_s3_bucket.undefined_Code_6226BB4A.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "undefined_MyResource_cloudQueue_97BE92DA": {
        "//": {
          "metadata": {
            "path": "root/undefined/Default/MyResource/cloud.Queue/Default",
            "uniqueId": "undefined_MyResource_cloudQueue_97BE92DA"
          }
        },
        "name": "cloud-Queue-c84fbb00"
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
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class First extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("$inflight_init");
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.First.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const FirstClient = ${First._toInflightType(this).text};
            const client = new FirstClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this._addInflightOps("meaningOfLife", "anotherFunc", "$inflight_init");
        this.myField = "hello!";
        this.first = new First(this,"First");
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.Another.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this).text};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor(scope, id, externalBucket, externalNum) {
        super(scope, id);
        this._addInflightOps("testNoCapture", "testCaptureCollectionsOfData", "testCapturePrimitives", "testCaptureOptional", "testCaptureResource", "testNestedInflightField", "testNestedResource", "testExpressionRecursive", "testExternal", "testUserDefinedResource", "testInflightField", "$inflight_init", "inflightField");
        this.myResource = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
        this.myStr = "myString";
        this.myNum = 42;
        this.myBool = true;
        this.myOptStr = "myOptString";
        this.arrayOfStr = ["s1", "s2"];
        this.mapOfNum = ({"k1": 11,"k2": 22});
        this.setOfStr = new Set(["s1", "s2", "s1"]);
        this.another = new Another(this,"Another");
        this.myQueue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
        this.extBucket = externalBucket;
        this.extNum = externalNum;
        this.unusedResource = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
      }
      helloPreflight() {
        return this.another;
      }
      static _toInflightType(context) {
        return $stdlib.core.NodeJsCode.fromInline(`
          require("./inflight.MyResource.js")({
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this).text};
            const client = new MyResourceClient({
              $___this_setOfStr_has__s3____: ${this._lift((!(this.setOfStr.has("s3"))))},
              $_this_arrayOfStr_at_0__: ${this._lift((this.arrayOfStr.at(0)))},
              $_this_arrayOfStr_at_1__: ${this._lift((this.arrayOfStr.at(1)))},
              $_this_mapOfNum___k1__: ${this._lift((this.mapOfNum)["k1"])},
              $_this_mapOfNum___k2__: ${this._lift((this.mapOfNum)["k2"])},
              $_this_myOptStr_______: ${this._lift((this.myOptStr ?? ""))},
              $_this_setOfStr_has__s1___: ${this._lift((this.setOfStr.has("s1")))},
              $_this_setOfStr_has__s2___: ${this._lift((this.setOfStr.has("s2")))},
              $this_another: ${this._lift(this.another)},
              $this_another_first_myResource: ${this._lift(this.another.first.myResource)},
              $this_another_myField: ${this._lift(this.another.myField)},
              $this_arrayOfStr_length: ${this._lift(this.arrayOfStr.length)},
              $this_extBucket: ${this._lift(this.extBucket)},
              $this_extNum: ${this._lift(this.extNum)},
              $this_myBool: ${this._lift(this.myBool)},
              $this_myNum: ${this._lift(this.myNum)},
              $this_myQueue: ${this._lift(this.myQueue)},
              $this_myResource: ${this._lift(this.myResource)},
              $this_myStr: ${this._lift(this.myStr)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerBindObject((!(this.setOfStr.has("s3"))), host, []);
          MyResource._registerBindObject((this.arrayOfStr.at(0)), host, []);
          MyResource._registerBindObject((this.arrayOfStr.at(1)), host, []);
          MyResource._registerBindObject((this.mapOfNum)["k1"], host, []);
          MyResource._registerBindObject((this.mapOfNum)["k2"], host, []);
          MyResource._registerBindObject((this.myOptStr ?? ""), host, []);
          MyResource._registerBindObject((this.setOfStr.has("s1")), host, []);
          MyResource._registerBindObject((this.setOfStr.has("s2")), host, []);
          MyResource._registerBindObject(this.another, host, []);
          MyResource._registerBindObject(this.another.first.myResource, host, []);
          MyResource._registerBindObject(this.another.myField, host, []);
          MyResource._registerBindObject(this.arrayOfStr.length, host, []);
          MyResource._registerBindObject(this.extBucket, host, []);
          MyResource._registerBindObject(this.extNum, host, []);
          MyResource._registerBindObject(this.myBool, host, []);
          MyResource._registerBindObject(this.myNum, host, []);
          MyResource._registerBindObject(this.myQueue, host, []);
          MyResource._registerBindObject(this.myResource, host, []);
          MyResource._registerBindObject(this.myStr, host, []);
        }
        if (ops.includes("testCaptureCollectionsOfData")) {
          MyResource._registerBindObject((!(this.setOfStr.has("s3"))), host, []);
          MyResource._registerBindObject((this.arrayOfStr.at(0)), host, []);
          MyResource._registerBindObject((this.arrayOfStr.at(1)), host, []);
          MyResource._registerBindObject((this.mapOfNum)["k1"], host, []);
          MyResource._registerBindObject((this.mapOfNum)["k2"], host, []);
          MyResource._registerBindObject((this.setOfStr.has("s1")), host, []);
          MyResource._registerBindObject((this.setOfStr.has("s2")), host, []);
          MyResource._registerBindObject(this.arrayOfStr.length, host, []);
        }
        if (ops.includes("testCaptureOptional")) {
          MyResource._registerBindObject((this.myOptStr ?? ""), host, []);
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
        if (ops.includes("testNestedInflightField")) {
          MyResource._registerBindObject(this.another.myField, host, []);
        }
        if (ops.includes("testNestedResource")) {
          MyResource._registerBindObject(this.another.first.myResource, host, ["get", "list", "put"]);
          MyResource._registerBindObject(this.myStr, host, []);
        }
        if (ops.includes("testUserDefinedResource")) {
          MyResource._registerBindObject(this.another, host, ["anotherFunc", "meaningOfLife"]);
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
            $r: ${context._lift(r)},
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
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(r, host, ["testCaptureCollectionsOfData", "testCaptureOptional", "testCapturePrimitives", "testCaptureResource", "testExpressionRecursive", "testExternal", "testInflightField", "testNestedInflightField", "testNestedResource", "testNoCapture", "testUserDefinedResource"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const r = new MyResource(this,"MyResource",b,12);
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:test",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "resource_captures", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


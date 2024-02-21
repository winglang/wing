# [resource_captures.test.w](../../../../../examples/tests/valid/resource_captures.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.$Closure1-1.js.map
```

## inflight.Another-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
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
//# sourceMappingURL=inflight.Another-1.js.map
```

## inflight.First-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class First {
    constructor({  }) {
    }
  }
  return First;
}
//# sourceMappingURL=inflight.First-1.js.map
```

## inflight.MyResource-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class MyResource {
    constructor({ $___this_setOfStr_has__s3____, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__0_, $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__1_, $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k1__, $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k2__, $_this_setOfStr_has__s1___, $_this_setOfStr_has__s2___, $this_another, $this_another_first_myResource, $this_another_myField, $this_arrayOfStr_length, $this_extBucket, $this_extNum, $this_myBool, $this_myNum, $this_myOptStr, $this_myQueue, $this_myResource, $this_myStr }) {
      this.$___this_setOfStr_has__s3____ = $___this_setOfStr_has__s3____;
      this.$__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__0_ = $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__0_;
      this.$__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__1_ = $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__1_;
      this.$__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k1__ = $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k1__;
      this.$__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k2__ = $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k2__;
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
      this.$this_myOptStr = $this_myOptStr;
      this.$this_myQueue = $this_myQueue;
      this.$this_myResource = $this_myResource;
      this.$this_myStr = $this_myStr;
    }
    async testNoCapture() {
      const arr = [1, 2, 3];
      $helpers.assert($helpers.eq(arr.length, 3), "arr.length == 3");
      console.log(String.raw({ raw: ["array.len=", ""] }, arr.length));
    }
    async testCaptureCollectionsOfData() {
      $helpers.assert($helpers.eq(this.$this_arrayOfStr_length, 2), "this.arrayOfStr.length == 2");
      $helpers.assert($helpers.eq(this.$__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__0_, "s1"), "this.arrayOfStr.at(0) == \"s1\"");
      $helpers.assert($helpers.eq(this.$__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__1_, "s2"), "this.arrayOfStr.at(1) == \"s2\"");
      $helpers.assert($helpers.eq(this.$__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k1__, 11), "this.mapOfNum.get(\"k1\") == 11");
      $helpers.assert($helpers.eq(this.$__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k2__, 22), "this.mapOfNum.get(\"k2\") == 22");
      $helpers.assert(this.$_this_setOfStr_has__s1___, "this.setOfStr.has(\"s1\")");
      $helpers.assert(this.$_this_setOfStr_has__s2___, "this.setOfStr.has(\"s2\")");
      $helpers.assert(this.$___this_setOfStr_has__s3____, "!this.setOfStr.has(\"s3\")");
    }
    async testCapturePrimitives() {
      $helpers.assert($helpers.eq(this.$this_myStr, "myString"), "this.myStr == \"myString\"");
      $helpers.assert($helpers.eq(this.$this_myNum, 42), "this.myNum == 42");
      $helpers.assert($helpers.eq(this.$this_myBool, true), "this.myBool == true");
    }
    async testCaptureOptional() {
      $helpers.assert($helpers.eq((this.$this_myOptStr ?? ""), "myOptString"), "this.myOptStr ?? \"\" == \"myOptString\"");
    }
    async testCaptureResource() {
      (await this.$this_myResource.put("f1.txt", "f1"));
      $helpers.assert($helpers.eq((await this.$this_myResource.get("f1.txt")), "f1"), "this.myResource.get(\"f1.txt\") == \"f1\"");
      $helpers.assert($helpers.eq((await this.$this_myResource.list()).length, 1), "this.myResource.list().length == 1");
    }
    async testNestedInflightField() {
      $helpers.assert($helpers.eq(this.$this_another_myField, "hello!"), "this.another.myField == \"hello!\"");
      console.log(String.raw({ raw: ["field=", ""] }, this.$this_another_myField));
    }
    async testNestedResource() {
      $helpers.assert($helpers.eq((await this.$this_another_first_myResource.list()).length, 0), "this.another.first.myResource.list().length == 0");
      (await this.$this_another_first_myResource.put("hello", this.$this_myStr));
      console.log(String.raw({ raw: ["this.another.first.myResource:", ""] }, (await this.$this_another_first_myResource.get("hello"))));
    }
    async testExpressionRecursive() {
      (await this.$this_myQueue.push(this.$this_myStr));
    }
    async testExternal() {
      $helpers.assert($helpers.eq((await this.$this_extBucket.list()).length, 0), "this.extBucket.list().length == 0");
      $helpers.assert($helpers.eq(this.$this_extNum, 12), "this.extNum == 12");
    }
    async testUserDefinedResource() {
      $helpers.assert($helpers.eq((await this.$this_another.meaningOfLife()), 42), "this.another.meaningOfLife() == 42");
      $helpers.assert($helpers.eq((await this.$this_another.anotherFunc()), "42"), "this.another.anotherFunc() == \"42\"");
    }
    async testInflightField() {
      $helpers.assert($helpers.eq(this.inflightField, 123), "this.inflightField == 123");
    }
    async $inflight_init() {
      this.inflightField = 123;
    }
  }
  return MyResource;
}
//# sourceMappingURL=inflight.MyResource-1.js.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "MyResource_cloudCounter_0782991D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Counter/Default",
            "uniqueId": "MyResource_cloudCounter_0782991D"
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
    "aws_s3_bucket": {
      "MyResource_Another_First_cloudBucket_5C44A510": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Another/First/cloud.Bucket/Default",
            "uniqueId": "MyResource_Another_First_cloudBucket_5C44A510"
          }
        },
        "bucket_prefix": "cloud-bucket-c8e81a49-",
        "force_destroy": false
      },
      "MyResource_cloudBucket_B5E6C951": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Bucket/Default",
            "uniqueId": "MyResource_cloudBucket_B5E6C951"
          }
        },
        "bucket_prefix": "cloud-bucket-c8f3d54f-",
        "force_destroy": false
      },
      "cloudBucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "cloudBucket"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "MyResource_cloudQueue_E7A2C0F4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/cloud.Queue/Default",
            "uniqueId": "MyResource_cloudQueue_E7A2C0F4"
          }
        },
        "message_retention_seconds": 3600,
        "name": "cloud-Queue-c8185458",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class First extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.myResource = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.First-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FirstClient = ${First._toInflightType()};
            const client = new FirstClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "$inflight_init": [
          ],
        });
      }
    }
    class Another extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.myField = "hello!";
        this.first = new First(this, "First");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.Another-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AnotherClient = ${Another._toInflightType()};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "meaningOfLife": [
          ],
          "anotherFunc": [
          ],
          "$inflight_init": [
          ],
        });
      }
    }
    class MyResource extends $stdlib.std.Resource {
      constructor($scope, $id, externalBucket, externalNum) {
        super($scope, $id);
        this.myResource = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
        this.myStr = "myString";
        this.myNum = 42;
        this.myBool = true;
        this.myOptStr = "myOptString";
        this.arrayOfStr = ["s1", "s2"];
        this.mapOfNum = ({["k1"]: 11, ["k2"]: 22});
        this.setOfStr = new Set(["s1", "s2", "s1"]);
        this.another = new Another(this, "Another");
        this.myQueue = this.node.root.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "cloud.Queue");
        this.extBucket = externalBucket;
        this.extNum = externalNum;
        this.unusedResource = this.node.root.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "cloud.Counter");
      }
      helloPreflight() {
        return this.another;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType()};
            const client = new MyResourceClient({
              $___this_setOfStr_has__s3____: ${$stdlib.core.liftObject((!(this.setOfStr.has("s3"))))},
              $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__0_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.arrayOfStr, 0))},
              $__arr__index_______if__index___0____index____arr_length__throw_new_Error__Index_out_of_bounds____return_arr_index______this_arrayOfStr__1_: ${$stdlib.core.liftObject(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.arrayOfStr, 1))},
              $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k1__: ${$stdlib.core.liftObject(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.mapOfNum, "k1"))},
              $__obj__key_______if____key_in_obj___throw_new_Error__Map_does_not_contain_key_____key______return_obj_key______this_mapOfNum___k2__: ${$stdlib.core.liftObject(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.mapOfNum, "k2"))},
              $_this_setOfStr_has__s1___: ${$stdlib.core.liftObject((this.setOfStr.has("s1")))},
              $_this_setOfStr_has__s2___: ${$stdlib.core.liftObject((this.setOfStr.has("s2")))},
              $this_another: ${$stdlib.core.liftObject(this.another)},
              $this_another_first_myResource: ${$stdlib.core.liftObject(this.another.first.myResource)},
              $this_another_myField: ${$stdlib.core.liftObject(this.another.myField)},
              $this_arrayOfStr_length: ${$stdlib.core.liftObject(this.arrayOfStr.length)},
              $this_extBucket: ${$stdlib.core.liftObject(this.extBucket)},
              $this_extNum: ${$stdlib.core.liftObject(this.extNum)},
              $this_myBool: ${$stdlib.core.liftObject(this.myBool)},
              $this_myNum: ${$stdlib.core.liftObject(this.myNum)},
              $this_myOptStr: ${$stdlib.core.liftObject(this.myOptStr)},
              $this_myQueue: ${$stdlib.core.liftObject(this.myQueue)},
              $this_myResource: ${$stdlib.core.liftObject(this.myResource)},
              $this_myStr: ${$stdlib.core.liftObject(this.myStr)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "testNoCapture": [
          ],
          "testCaptureCollectionsOfData": [
            [(!(this.setOfStr.has("s3"))), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.arrayOfStr, 0), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.arrayOfStr, 1), []],
            [((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.mapOfNum, "k1"), []],
            [((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.mapOfNum, "k2"), []],
            [(this.setOfStr.has("s1")), []],
            [(this.setOfStr.has("s2")), []],
            [this.arrayOfStr.length, []],
          ],
          "testCapturePrimitives": [
            [this.myBool, []],
            [this.myNum, []],
            [this.myStr, []],
          ],
          "testCaptureOptional": [
            [this.myOptStr, []],
          ],
          "testCaptureResource": [
            [this.myResource, ["get", "list", "put"]],
          ],
          "testNestedInflightField": [
            [this.another.myField, []],
          ],
          "testNestedResource": [
            [this.another.first.myResource, ["get", "list", "put"]],
            [this.myStr, []],
          ],
          "testExpressionRecursive": [
            [this.myQueue, ["push"]],
            [this.myStr, []],
          ],
          "testExternal": [
            [this.extBucket, ["list"]],
            [this.extNum, []],
          ],
          "testUserDefinedResource": [
            [this.another, ["anotherFunc", "meaningOfLife"]],
          ],
          "testInflightField": [
          ],
          "$inflight_init": [
            [(!(this.setOfStr.has("s3"))), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.arrayOfStr, 0), []],
            [((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.arrayOfStr, 1), []],
            [((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.mapOfNum, "k1"), []],
            [((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.mapOfNum, "k2"), []],
            [(this.setOfStr.has("s1")), []],
            [(this.setOfStr.has("s2")), []],
            [this.another, []],
            [this.another.first.myResource, []],
            [this.another.myField, []],
            [this.arrayOfStr.length, []],
            [this.extBucket, []],
            [this.extNum, []],
            [this.myBool, []],
            [this.myNum, []],
            [this.myOptStr, []],
            [this.myQueue, []],
            [this.myResource, []],
            [this.myStr, []],
          ],
          "inflightField": [
          ],
        });
      }
    }
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $r: ${$stdlib.core.liftObject(r)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType()};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      get _liftMap() {
        return ({
          "handle": [
            [r, ["testCaptureCollectionsOfData", "testCaptureOptional", "testCapturePrimitives", "testCaptureResource", "testExpressionRecursive", "testExternal", "testInflightField", "testNestedInflightField", "testNestedResource", "testNoCapture", "testUserDefinedResource"]],
          ],
          "$inflight_init": [
            [r, []],
          ],
        });
      }
    }
    const b = this.node.root.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "cloud.Bucket");
    const r = new MyResource(this, "MyResource", b, 12);
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "resource_captures.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


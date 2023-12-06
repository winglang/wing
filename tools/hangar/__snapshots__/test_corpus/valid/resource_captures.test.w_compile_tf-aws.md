# [resource_captures.test.w](../../../../../examples/tests/valid/resource_captures.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
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
module.exports = function({  }) {
  class MyResource {
    constructor({ $_this_myOptStr_______, $this_another, $this_another_first_myResource, $this_another_myField, $this_arrayOfStr, $this_extBucket, $this_extNum, $this_mapOfNum, $this_myBool, $this_myNum, $this_myQueue, $this_myResource, $this_myStr, $this_setOfStr }) {
      this.$_this_myOptStr_______ = $_this_myOptStr_______;
      this.$this_another = $this_another;
      this.$this_another_first_myResource = $this_another_first_myResource;
      this.$this_another_myField = $this_another_myField;
      this.$this_arrayOfStr = $this_arrayOfStr;
      this.$this_extBucket = $this_extBucket;
      this.$this_extNum = $this_extNum;
      this.$this_mapOfNum = $this_mapOfNum;
      this.$this_myBool = $this_myBool;
      this.$this_myNum = $this_myNum;
      this.$this_myQueue = $this_myQueue;
      this.$this_myResource = $this_myResource;
      this.$this_myStr = $this_myStr;
      this.$this_setOfStr = $this_setOfStr;
    }
    async testNoCapture() {
      const arr = [1, 2, 3];
      {((cond) => {if (!cond) throw new Error("assertion failed: arr.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(arr.length,3)))};
      {console.log(String.raw({ raw: ["array.len=", ""] }, arr.length))};
    }
    async testCaptureCollectionsOfData() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.arrayOfStr.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_arrayOfStr.length,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.arrayOfStr.at(0) == \"s1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.$this_arrayOfStr, 0),"s1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.arrayOfStr.at(1) == \"s2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(this.$this_arrayOfStr, 1),"s2")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.mapOfNum.get(\"k1\") == 11")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.$this_mapOfNum, "k1"),11)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.mapOfNum.get(\"k2\") == 22")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(this.$this_mapOfNum, "k2"),22)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.setOfStr.has(\"s1\")")})((await this.$this_setOfStr.has("s1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.setOfStr.has(\"s2\")")})((await this.$this_setOfStr.has("s2")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: !this.setOfStr.has(\"s3\")")})((!(await this.$this_setOfStr.has("s3"))))};
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
      (await this.$this_myResource.put("f1.txt", "f1"));
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myResource.get(\"f1.txt\") == \"f1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_myResource.get("f1.txt")),"f1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: this.myResource.list().length == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_myResource.list()).length,1)))};
    }
    async testNestedInflightField() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.another.myField == \"hello!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(this.$this_another_myField,"hello!")))};
      {console.log(String.raw({ raw: ["field=", ""] }, this.$this_another_myField))};
    }
    async testNestedResource() {
      {((cond) => {if (!cond) throw new Error("assertion failed: this.another.first.myResource.list().length == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await this.$this_another_first_myResource.list()).length,0)))};
      (await this.$this_another_first_myResource.put("hello", this.$this_myStr));
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
//# sourceMappingURL=inflight.MyResource-1.js.map
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
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
          require("./inflight.First-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const FirstClient = ${First._toInflightType(this)};
            const client = new FirstClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "$inflight_init"];
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
          require("./inflight.Another-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AnotherClient = ${Another._toInflightType(this)};
            const client = new AnotherClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "meaningOfLife", "anotherFunc", "$inflight_init"];
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
          require("./inflight.MyResource-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType(this)};
            const client = new MyResourceClient({
              $_this_myOptStr_______: ${$stdlib.core.liftObject((this.myOptStr ?? ""))},
              $this_another: ${$stdlib.core.liftObject(this.another)},
              $this_another_first_myResource: ${$stdlib.core.liftObject(this.another.first.myResource)},
              $this_another_myField: ${$stdlib.core.liftObject(this.another.myField)},
              $this_arrayOfStr: ${$stdlib.core.liftObject(this.arrayOfStr)},
              $this_extBucket: ${$stdlib.core.liftObject(this.extBucket)},
              $this_extNum: ${$stdlib.core.liftObject(this.extNum)},
              $this_mapOfNum: ${$stdlib.core.liftObject(this.mapOfNum)},
              $this_myBool: ${$stdlib.core.liftObject(this.myBool)},
              $this_myNum: ${$stdlib.core.liftObject(this.myNum)},
              $this_myQueue: ${$stdlib.core.liftObject(this.myQueue)},
              $this_myResource: ${$stdlib.core.liftObject(this.myResource)},
              $this_myStr: ${$stdlib.core.liftObject(this.myStr)},
              $this_setOfStr: ${$stdlib.core.liftObject(this.setOfStr)},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "inflightField", "testNoCapture", "testCaptureCollectionsOfData", "testCapturePrimitives", "testCaptureOptional", "testCaptureResource", "testNestedInflightField", "testNestedResource", "testExpressionRecursive", "testExternal", "testUserDefinedResource", "testInflightField", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("$inflight_init")) {
          MyResource._registerOnLiftObject((this.myOptStr ?? ""), host, []);
          MyResource._registerOnLiftObject(this.another, host, []);
          MyResource._registerOnLiftObject(this.another.first.myResource, host, []);
          MyResource._registerOnLiftObject(this.another.myField, host, []);
          MyResource._registerOnLiftObject(this.arrayOfStr, host, []);
          MyResource._registerOnLiftObject(this.extBucket, host, []);
          MyResource._registerOnLiftObject(this.extNum, host, []);
          MyResource._registerOnLiftObject(this.mapOfNum, host, []);
          MyResource._registerOnLiftObject(this.myBool, host, []);
          MyResource._registerOnLiftObject(this.myNum, host, []);
          MyResource._registerOnLiftObject(this.myQueue, host, []);
          MyResource._registerOnLiftObject(this.myResource, host, []);
          MyResource._registerOnLiftObject(this.myStr, host, []);
          MyResource._registerOnLiftObject(this.setOfStr, host, []);
        }
        if (ops.includes("testCaptureCollectionsOfData")) {
          MyResource._registerOnLiftObject(this.arrayOfStr, host, ["at", "length"]);
          MyResource._registerOnLiftObject(this.mapOfNum, host, ["get"]);
          MyResource._registerOnLiftObject(this.setOfStr, host, ["has"]);
        }
        if (ops.includes("testCaptureOptional")) {
          MyResource._registerOnLiftObject((this.myOptStr ?? ""), host, []);
        }
        if (ops.includes("testCapturePrimitives")) {
          MyResource._registerOnLiftObject(this.myBool, host, []);
          MyResource._registerOnLiftObject(this.myNum, host, []);
          MyResource._registerOnLiftObject(this.myStr, host, []);
        }
        if (ops.includes("testCaptureResource")) {
          MyResource._registerOnLiftObject(this.myResource, host, ["get", "list", "put"]);
        }
        if (ops.includes("testExpressionRecursive")) {
          MyResource._registerOnLiftObject(this.myQueue, host, ["push"]);
          MyResource._registerOnLiftObject(this.myStr, host, []);
        }
        if (ops.includes("testExternal")) {
          MyResource._registerOnLiftObject(this.extBucket, host, ["list"]);
          MyResource._registerOnLiftObject(this.extNum, host, []);
        }
        if (ops.includes("testNestedInflightField")) {
          MyResource._registerOnLiftObject(this.another.myField, host, []);
        }
        if (ops.includes("testNestedResource")) {
          MyResource._registerOnLiftObject(this.another.first.myResource, host, ["get", "list", "put"]);
          MyResource._registerOnLiftObject(this.myStr, host, []);
        }
        if (ops.includes("testUserDefinedResource")) {
          MyResource._registerOnLiftObject(this.another, host, ["anotherFunc", "meaningOfLife"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("./inflight.$Closure1-1.js")({
            $r: ${$stdlib.core.liftObject(r)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(r, host, ["testCaptureCollectionsOfData", "testCaptureOptional", "testCapturePrimitives", "testCaptureResource", "testExpressionRecursive", "testExternal", "testInflightField", "testNestedInflightField", "testNestedResource", "testNoCapture", "testUserDefinedResource"]);
        }
        super._registerOnLift(host, ops);
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


# [resource_captures.test.w](../../../../../examples/tests/valid/resource_captures.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.Another-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
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
//# sourceMappingURL=inflight.Another-1.cjs.map
```

## inflight.First-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class First {
    constructor({  }) {
    }
  }
  return First;
}
//# sourceMappingURL=inflight.First-1.cjs.map
```

## inflight.MyResource-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
const $macros = require("@winglang/sdk/lib/macros");
module.exports = function({  }) {
  class MyResource {
    constructor({ $this_another, $this_another_first_myResource, $this_another_myField, $this_arrayOfStr, $this_extBucket, $this_extNum, $this_mapOfNum, $this_myBool, $this_myNum, $this_myOptStr, $this_myQueue, $this_myResource, $this_myStr, $this_setOfStr }) {
      this.$this_another = $this_another;
      this.$this_another_first_myResource = $this_another_first_myResource;
      this.$this_another_myField = $this_another_myField;
      this.$this_arrayOfStr = $this_arrayOfStr;
      this.$this_extBucket = $this_extBucket;
      this.$this_extNum = $this_extNum;
      this.$this_mapOfNum = $this_mapOfNum;
      this.$this_myBool = $this_myBool;
      this.$this_myNum = $this_myNum;
      this.$this_myOptStr = $this_myOptStr;
      this.$this_myQueue = $this_myQueue;
      this.$this_myResource = $this_myResource;
      this.$this_myStr = $this_myStr;
      this.$this_setOfStr = $this_setOfStr;
    }
    async testNoCapture() {
      const arr = [1, 2, 3];
      $helpers.assert($helpers.eq(arr.length, 3), "arr.length == 3");
      console.log(String.raw({ raw: ["array.len=", ""] }, arr.length));
    }
    async testCaptureCollectionsOfData() {
      $helpers.assert($helpers.eq(this.$this_arrayOfStr.length, 2), "this.arrayOfStr.length == 2");
      $helpers.assert($helpers.eq($macros.__Array_at(false, this.$this_arrayOfStr, 0), "s1"), "this.arrayOfStr.at(0) == \"s1\"");
      $helpers.assert($helpers.eq($macros.__Array_at(false, this.$this_arrayOfStr, 1), "s2"), "this.arrayOfStr.at(1) == \"s2\"");
      $helpers.assert($helpers.eq($macros.__Map_get(false, this.$this_mapOfNum, "k1"), 11), "this.mapOfNum.get(\"k1\") == 11");
      $helpers.assert($helpers.eq($macros.__Map_get(false, this.$this_mapOfNum, "k2"), 22), "this.mapOfNum.get(\"k2\") == 22");
      $helpers.assert((await this.$this_setOfStr.has("s1")), "this.setOfStr.has(\"s1\")");
      $helpers.assert((await this.$this_setOfStr.has("s2")), "this.setOfStr.has(\"s2\")");
      $helpers.assert((!(await this.$this_setOfStr.has("s3"))), "!this.setOfStr.has(\"s3\")");
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
//# sourceMappingURL=inflight.MyResource-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
      "MyResource_Counter_D9D84476": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Counter/Default",
            "uniqueId": "MyResource_Counter_D9D84476"
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
        "name": "wing-counter-Counter-c8736322"
      }
    },
    "aws_s3_bucket": {
      "Bucket": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Bucket/Default",
            "uniqueId": "Bucket"
          }
        },
        "bucket_prefix": "bucket-c88fdc5f-",
        "force_destroy": false
      },
      "MyResource_Another_First_Bucket_1DA21BC0": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Another/First/Bucket/Default",
            "uniqueId": "MyResource_Another_First_Bucket_1DA21BC0"
          }
        },
        "bucket_prefix": "bucket-c859322f-",
        "force_destroy": false
      },
      "MyResource_Bucket_0DE6FCB5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Bucket/Default",
            "uniqueId": "MyResource_Bucket_0DE6FCB5"
          }
        },
        "bucket_prefix": "bucket-c87b43ba-",
        "force_destroy": false
      }
    },
    "aws_sqs_queue": {
      "MyResource_Queue_C2F2FBE5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/MyResource/Queue/Default",
            "uniqueId": "MyResource_Queue_C2F2FBE5"
          }
        },
        "message_retention_seconds": 3600,
        "name": "Queue-c84748c7",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $macros = require("@winglang/sdk/lib/macros");
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class First extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        this.myResource = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.First-1.cjs")({
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
          require("${$helpers.normalPath(__dirname)}/inflight.Another-1.cjs")({
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
        this.myResource = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
        this.myStr = "myString";
        this.myNum = 42;
        this.myBool = true;
        this.myOptStr = "myOptString";
        this.arrayOfStr = ["s1", "s2"];
        this.mapOfNum = ({["k1"]: 11, ["k2"]: 22});
        this.setOfStr = new Set(["s1", "s2", "s1"]);
        this.another = new Another(this, "Another");
        this.myQueue = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Queue", cloud.Queue, this, "Queue");
        this.extBucket = externalBucket;
        this.extNum = externalNum;
        this.unusedResource = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Counter", cloud.Counter, this, "Counter");
      }
      helloPreflight() {
        return this.another;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.MyResource-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const MyResourceClient = ${MyResource._toInflightType()};
            const client = new MyResourceClient({
              $this_another: ${$stdlib.core.liftObject(this.another)},
              $this_another_first_myResource: ${$stdlib.core.liftObject(this.another.first.myResource)},
              $this_another_myField: ${$stdlib.core.liftObject(this.another.myField)},
              $this_arrayOfStr: ${$stdlib.core.liftObject(this.arrayOfStr)},
              $this_extBucket: ${$stdlib.core.liftObject(this.extBucket)},
              $this_extNum: ${$stdlib.core.liftObject(this.extNum)},
              $this_mapOfNum: ${$stdlib.core.liftObject(this.mapOfNum)},
              $this_myBool: ${$stdlib.core.liftObject(this.myBool)},
              $this_myNum: ${$stdlib.core.liftObject(this.myNum)},
              $this_myOptStr: ${$stdlib.core.liftObject(this.myOptStr)},
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
      get _liftMap() {
        return ({
          "testNoCapture": [
          ],
          "testCaptureCollectionsOfData": [
            [this.arrayOfStr, [].concat(["length"], ["at"])],
            [this.mapOfNum, ["get"]],
            [this.setOfStr, ["has"]],
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
            [this.myResource, [].concat(["put"], ["get"], ["list"])],
          ],
          "testNestedInflightField": [
            [this.another.myField, []],
          ],
          "testNestedResource": [
            [this.another.first.myResource, [].concat(["list"], ["put"], ["get"])],
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
            [this.another, [].concat(["meaningOfLife"], ["anotherFunc"])],
          ],
          "testInflightField": [
          ],
          "$inflight_init": [
            [this.another, []],
            [this.another.first.myResource, []],
            [this.another.myField, []],
            [this.arrayOfStr, []],
            [this.extBucket, []],
            [this.extNum, []],
            [this.mapOfNum, []],
            [this.myBool, []],
            [this.myNum, []],
            [this.myOptStr, []],
            [this.myQueue, []],
            [this.myResource, []],
            [this.myStr, []],
            [this.setOfStr, []],
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
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
            [r, [].concat(["testNoCapture"], ["testCaptureCollectionsOfData"], ["testCapturePrimitives"], ["testCaptureOptional"], ["testCaptureResource"], ["testNestedInflightField"], ["testNestedResource"], ["testExpressionRecursive"], ["testExternal"], ["testUserDefinedResource"], ["testInflightField"])],
          ],
          "$inflight_init": [
            [r, []],
          ],
        });
      }
    }
    const b = globalThis.$ClassFactory.new("@winglang/sdk.cloud.Bucket", cloud.Bucket, this, "Bucket");
    const r = new MyResource(this, "MyResource", b, 12);
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:test", new $Closure1(this, "$Closure1"));
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "resource_captures.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


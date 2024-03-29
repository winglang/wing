# [bring_jsii.test.w](../../../../../examples/tests/valid/bring_jsii.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $greeting, $stuff_HelloWorld }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      $helpers.assert($helpers.eq($greeting, "Hello, wingnuts"), "greeting == \"Hello, wingnuts\"");
      const helloInflight = new $stuff_HelloWorld();
      $helpers.assert($helpers.eq((await helloInflight.sayHello("wingnuts")), $greeting), "helloInflight.sayHello(\"wingnuts\") == greeting");
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.js.map
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
  }
}
```

## preflight.js
```js
"use strict";
const $stdlib = require('@winglang/sdk');
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const cloud = $stdlib.cloud;
const stuff = require("jsii-code-samples");
const jsii_fixture = require("jsii-fixture");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.js")({
            $greeting: ${$stdlib.core.liftObject(greeting)},
            $stuff_HelloWorld: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(stuff.HelloWorld, "jsii-code-samples", "HelloWorld"))},
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
            [greeting, []],
          ],
          "$inflight_init": [
            [greeting, []],
          ],
        });
      }
    }
    const hello = new stuff.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:sayHello", new $Closure1(this, "$Closure1"));
    const jsiiClass = new jsii_fixture.JsiiClass(10);
    $helpers.assert($helpers.eq((jsiiClass.applyClosure(5, ((x) => {
      return (x * 2);
    }))), 10), "jsiiClass.applyClosure(5, (x) => { return x * 2; }) == 10");
    const jsiiStruct = ({"field": "struct field"});
    $helpers.assert($helpers.eq((jsiiClass.methodWithStructParam(jsiiStruct)), "struct field"), "jsiiClass.methodWithStructParam(jsiiStruct) == \"struct field\"");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


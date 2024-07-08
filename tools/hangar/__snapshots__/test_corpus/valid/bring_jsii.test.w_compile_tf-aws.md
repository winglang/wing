# [bring_jsii.test.w](../../../../../examples/tests/valid/bring_jsii.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
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
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
```

## inflight.X-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({  }) {
  class X {
    constructor({  }) {
    }
  }
  return X;
}
//# sourceMappingURL=inflight.X-1.cjs.map
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
  }
}
```

## preflight.cjs
```cjs
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
const $extern = $helpers.createExternRequire(__dirname);
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
globalThis.$ClassFactory = $PlatformManager.createClassFactory();
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.nodeof(this).root.$preflightTypesMap = { };
    let $preflightTypesMap = {};
    const cloud = $stdlib.cloud;
    const stuff = require("jsii-code-samples");
    const jsii_fixture = require("jsii-fixture");
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    class $Closure1 extends $stdlib.std.AutoIdResource {
      _id = $stdlib.core.closureId();
      constructor($scope, $id, ) {
        super($scope, $id);
        $helpers.nodeof(this).hidden = true;
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
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
            [$stdlib.core.toLiftableModuleType(stuff.HelloWorld, "jsii-code-samples", "HelloWorld"), []],
            [greeting, []],
          ],
          "$inflight_init": [
            [$stdlib.core.toLiftableModuleType(stuff.HelloWorld, "jsii-code-samples", "HelloWorld"), []],
            [greeting, []],
          ],
        });
      }
    }
    class X extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      method() {
      }
      static _toInflightType() {
        return `
          require("${$helpers.normalPath(__dirname)}/inflight.X-1.cjs")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const XClient = ${X._toInflightType()};
            const client = new XClient({
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
    const hello = new stuff.HelloWorld();
    const greeting = (hello.sayHello("wingnuts"));
    globalThis.$ClassFactory.new("@winglang/sdk.std.Test", std.Test, this, "test:sayHello", new $Closure1(this, "$Closure1"));
    const jsiiClass = new jsii_fixture.JsiiClass(10);
    $helpers.assert($helpers.eq((jsiiClass.applyClosure(5, ((x) => {
      return (x * 2);
    }))), 10), "jsiiClass.applyClosure(5, (x) => { return x * 2; }) == 10");
    $helpers.assert($helpers.eq((jsiiClass.methodWithStructParam(({"field": "struct field"}))), "struct field"), "jsiiClass.methodWithStructParam({ field: \"struct field\" }) == \"struct field\"");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "bring_jsii.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'], classFactory: globalThis.$ClassFactory });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


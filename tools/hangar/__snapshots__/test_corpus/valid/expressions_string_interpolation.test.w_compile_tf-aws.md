# [expressions_string_interpolation.test.w](../../../../../examples/tests/valid/expressions_string_interpolation.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
const $helpers = require("@winglang/sdk/lib/helpers");
module.exports = function({ $expect_Util, $number }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const i = 1336;
      const s = String.raw({ raw: ["leet: ", ""] }, (i + $number));
      (await $expect_Util.equal(s, "leet: 1337"));
      (await $expect_Util.equal("leet: {i+number}", "leet: {i+number\}"));
      (await $expect_Util.equal("", ""));
      (await $expect_Util.equal("{}".length, 2));
    }
  }
  return $Closure1;
}
//# sourceMappingURL=inflight.$Closure1-1.cjs.map
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
const expect = $stdlib.expect;
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
          require("${$helpers.normalPath(__dirname)}/inflight.$Closure1-1.cjs")({
            $expect_Util: ${$stdlib.core.liftObject($stdlib.core.toLiftableModuleType(expect.Util, "@winglang/sdk/expect", "Util"))},
            $number: ${$stdlib.core.liftObject(number)},
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
            [number, []],
          ],
          "$inflight_init": [
            [number, []],
          ],
        });
      }
    }
    const regularString = "str\n\"";
    const emptyString = "";
    const number = 1;
    const coolString = String.raw({ raw: ["cool \"{", "}\" test"] }, regularString);
    const reallyCoolString = String.raw({ raw: ["", "", "\n", "\n{empty_string}", "!"] }, number, emptyString, coolString, "string-in-string");
    const beginingWithCoolStrings = String.raw({ raw: ["", " ", " <- cool"] }, regularString, number);
    const endingWithCoolStrings = String.raw({ raw: ["cool -> ", " ", ""] }, regularString, number);
    const nonInterpolated = "a non { { {interpolated } } } strin{ g }";
    const nonInterpolatedJson = ({"a": nonInterpolated, "b": "this {one} too"});
    (expect.Util.equal(String.raw({ raw: ["", ""] }, (1 + 1)), "2"));
    (expect.Util.equal("{1+1}", "{1+1}"));
    (expect.Util.notEqual("{1+1}", "2"));
    (expect.Util.notEqual("{1+1}", "{2}"));
    console.log(String.raw({ raw: ["{1+1\} ", ""] }, number));
    console.log(nonInterpolated);
    console.log(String.raw({ raw: ["this is '", "'"] }, nonInterpolated));
    (expect.Util.equal("{number}", "{number\}"));
    (expect.Util.equal("{1 + 1}", "{1 + 1\}"));
    (expect.Util.equal("", ""));
    (expect.Util.equal("{}", "{\}"));
    (expect.Util.equal("a\nb\nc", "a\nb\nc"));
    (expect.Util.equal("\{\}".length, 2));
    (expect.Util.equal("{}".length, 2));
    (expect.Util.equal("\\{".length, 2));
    (expect.Util.equal("a\nb\nc".length, 5));
    (expect.Util.equal(String.raw({ raw: ["", " {number}"] }, number), "1 {number}"));
    const ml1 = "this\nis\nmultiline";
    const ml2 = "this\nis\nmultiline";
    const ml3 = "this\n\is\n\multiline";
    (expect.Util.equal(ml1, ml2));
    (expect.Util.equal(ml2, ml3));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:str interpolation with lifted expr", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "expressions_string_interpolation.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


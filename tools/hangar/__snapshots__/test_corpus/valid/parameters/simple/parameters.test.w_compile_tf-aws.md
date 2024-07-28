# [parameters.test.w](../../../../../../../examples/tests/valid/parameters/simple/parameters.test.w) | compile | tf-aws

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
    const MyParams = $stdlib.std.Struct._createJsonSchema({
      $id: "/MyParams",
      type: "object",
      description: "",
      properties: {
        foo: {  type: "string" , "description": "```wing\nfoo: str?\n```" },
        meaningOfLife: {  type: "number" , "description": "```wing\nmeaningOfLife: num\n```" },
      },
      required: [
        "meaningOfLife",
      ]
    });
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const app = $helpers.nodeof(this).app;
    const myParams = $macros.__Struct_fromJson(false, MyParams, (app.parameters.read({ schema: $macros.__Struct_schema(false, MyParams, ) })));
    {
      const $if_let_value = myParams.foo;
      if ($if_let_value != undefined) {
        const foo = $if_let_value;
        $helpers.assert(false, "false");
      }
      else {
        $helpers.assert(true, "true");
      }
    }
    const meaningOfLife = myParams.meaningOfLife;
    $helpers.assert($helpers.eq(meaningOfLife, 42), "meaningOfLife == 42");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "parameters.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


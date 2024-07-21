# [parameters.test.w](../../../../../../../examples/tests/valid/parameters/nested/parameters.test.w) | compile | tf-aws

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
    const MyParams = $stdlib.std.Struct._createJsonSchema({$id:"/MyParams",type:"object",properties:{houses:{type:"array",items:{type:"object",properties:{address:{type:"string"},residents:{type:"array",items:{type:"object",properties:{age:{type:"number"},name:{type:"string"},},required:["age","name",]}},},required:["address","residents",]}},},required:["houses",]});
    $helpers.nodeof(this).root.$preflightTypesMap = $preflightTypesMap;
    const app = $helpers.nodeof(this).app;
    const myParams = $macros.__Struct_fromJson(false, MyParams, (app.parameters.read({ schema: $macros.__Struct_schema(false, MyParams, ) })));
    $helpers.assert($helpers.eq(myParams.houses.length, 2), "myParams.houses.length == 2");
    $helpers.assert($helpers.eq($macros.__Array_at(false, myParams.houses, 0).address, "123 Main St"), "myParams.houses.at(0).address == \"123 Main St\"");
    $helpers.assert($helpers.eq($macros.__Array_at(false, myParams.houses, 0).residents.length, 2), "myParams.houses.at(0).residents.length == 2");
  }
}
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "parameters.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


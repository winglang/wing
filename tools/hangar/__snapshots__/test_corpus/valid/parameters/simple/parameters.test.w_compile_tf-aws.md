# [parameters.test.w](../../../../../../../examples/tests/valid/parameters/simple/parameters.test.w) | compile | tf-aws

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
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const MyParams = $stdlib.std.Struct._createJsonSchema({$id:"/MyParams",type:"object",properties:{foo:{type:"string"},meaningOfLife:{type:"number"},},required:["meaningOfLife",]});
    const app = $helpers.nodeof(this).app;
    (app.parameters.addSchema(MyParams));
    const myParams = MyParams._fromJson((app.parameters.json()));
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
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "parameters.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


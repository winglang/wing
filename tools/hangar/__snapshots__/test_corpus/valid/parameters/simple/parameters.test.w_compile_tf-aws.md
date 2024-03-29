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
const { initializePlatform } = require('./core.platform.js');
const std = $stdlib.std;
const $helpers = $stdlib.helpers;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const MyParams = $stdlib.std.Struct._createJsonSchema({$id:"/MyParams",type:"object",properties:{foo:{type:"string"},meaningOfLife:{type:"number"},},required:["meaningOfLife",]});
    const app = $helpers.nodeof(this).app;
    const myParams = MyParams._fromJson((app.parameters.read({ schema: MyParams })));
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
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


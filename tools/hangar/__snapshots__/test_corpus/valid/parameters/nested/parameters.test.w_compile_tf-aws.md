# [parameters.test.w](../../../../../../../examples/tests/valid/parameters/nested/parameters.test.w) | compile | tf-aws

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
    const MyParams = $stdlib.std.Struct._createJsonSchema({$id:"/MyParams",type:"object",properties:{houses:{type:"array",items:{type:"object",properties:{address:{type:"string"},residents:{type:"array",items:{type:"object",properties:{age:{type:"number"},name:{type:"string"},},required:["age","name",]}},},required:["address","residents",]}},},required:["houses",]});
    const app = $helpers.nodeof(this).app;
    const myParams = MyParams._fromJson((app.parameters.read({ schema: MyParams })));
    $helpers.assert($helpers.eq(myParams.houses.length, 2), "myParams.houses.length == 2");
    $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(myParams.houses, 0).address, "123 Main St"), "myParams.houses.at(0).address == \"123 Main St\"");
    $helpers.assert($helpers.eq(((arr, index) => { if (index < 0 || index >= arr.length) throw new Error("Index out of bounds"); return arr[index]; })(myParams.houses, 0).residents.length, 2), "myParams.houses.at(0).residents.length == 2");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


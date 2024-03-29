# [bring_alias.test.w](../../../../../examples/tests/valid/bring_alias.test.w) | compile | tf-aws

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
const stdFs = $stdlib.fs;
const stdFs2 = $stdlib.fs;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    $helpers.assert($helpers.eq((stdFs.Util.dirname("/")), "/"), "stdFs.dirname(\"/\") == \"/\"");
    $helpers.assert($helpers.eq((stdFs2.Util.dirname("/")), "/"), "stdFs2.dirname(\"/\") == \"/\"");
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


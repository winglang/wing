# [bring_cdk8s.test.w](../../../../../examples/tests/valid/bring_cdk8s.test.w) | compile | tf-aws

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
const cdk8s = require("cdk8s");
const kplus = require("cdk8s-plus-27");
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const app = this.node.root.new("cdk8s.App", cdk8s.App, );
    const chart = this.node.root.new("cdk8s.Chart", cdk8s.Chart, this, "Chart");
    const deploy = ($scope => $scope.node.root.new("cdk8s-plus-27.Deployment", kplus.Deployment, $scope, "Deployment"))(chart);
    (deploy.addContainer(({"image": "hashicorp/http-echo", "args": ["-text", "text"], "portNumber": 5678})));
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


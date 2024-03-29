# [table.test.w](../../../../../examples/tests/valid/table.test.w) | compile | tf-aws

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
  },
  "resource": {
    "aws_dynamodb_table": {
      "Table": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/Default",
            "uniqueId": "Table"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "simple-tableTable-c89b2d37",
        "point_in_time_recovery": {
          "enabled": true
        }
      }
    }
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
const ex = $stdlib.ex;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    const t = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "Table", { name: "simple-table", primaryKey: "id", columns: ({["id"]: ex.ColumnType.STRING, ["name"]: ex.ColumnType.STRING, ["age"]: ex.ColumnType.NUMBER}) });
  }
}
const { $APP } = initializePlatform($Root);
$APP.synth();
//# sourceMappingURL=preflight.js.map
```


# [aws-table.test.w](../../../../../../examples/tests/sdk_tests/table/aws-table.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $tableInfo, $target }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {
        const $if_let_value = $tableInfo;
        if ($if_let_value != undefined) {
          const table = $if_let_value;
          if ((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })($target,"tf-aws"))) {
            {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"dynamoTableArn\").contains(\"arn:aws:dynamodb:\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(table, "dynamoTableArn").includes("arn:aws:dynamodb:"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"dynamoTableArn\").contains(\"aws-wing-table\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(table, "dynamoTableArn").includes("aws-wing-table"))};
            {((cond) => {if (!cond) throw new Error("assertion failed: table.get(\"dynamoTableName\").contains(\"aws-wing-table\")")})(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(table, "dynamoTableName").includes("aws-wing-table"))};
          }
        }
      }
      {((cond) => {if (!cond) throw new Error("assertion failed: true")})(true)};
    }
  }
  return $Closure1;
}
//# sourceMappingURL=./inflight.$Closure1-1.cjs.map
```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
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
      "aws-wing-table": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-table/Default",
            "uniqueId": "aws-wing-table"
          }
        },
        "attribute": [
          {
            "name": "name",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "name",
        "name": "usersaws-wing-table-c82a4d4a"
      }
    }
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
const ex = $stdlib.ex;
const aws = $stdlib.aws;
const util = $stdlib.util;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      _hash = require('crypto').createHash('md5').update(this._toInflight()).digest('hex');
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType() {
        return `
          require("././inflight.$Closure1-1.cjs")({
            $tableInfo: ${$stdlib.core.liftObject(tableInfo)},
            $target: ${$stdlib.core.liftObject(target)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this)};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return [...super._supportedOps(), "handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(tableInfo, host, []);
          $Closure1._registerOnLiftObject(target, host, []);
        }
        super._registerOnLift(host, ops);
      }
    }
    const target = (util.Util.env("WING_TARGET"));
    const table = this.node.root.new("@winglang/sdk.ex.Table", ex.Table, this, "aws-wing-table", { name: "users", primaryKey: "name", columns: ({["gender"]: ex.ColumnType.STRING}) });
    const getTableInfo = ((t) => {
      {
        const $if_let_value = (aws.Table.from(t));
        if ($if_let_value != undefined) {
          const table = $if_let_value;
          return ({"dynamoTableName": table.dynamoTableName, "dynamoTableArn": table.dynamoTableArn});
        }
      }
      return undefined;
    });
    const tableInfo = (getTableInfo(table));
    this.node.root.new("@winglang/sdk.std.Test", std.Test, this, "test:validates the AWS topic name", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "aws-table.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();
//# sourceMappingURL=preflight.cjs.map
```


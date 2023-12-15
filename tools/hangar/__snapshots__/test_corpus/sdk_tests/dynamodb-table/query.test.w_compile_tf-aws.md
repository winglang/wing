# [query.test.w](../../../../../../examples/tests/sdk_tests/dynamodb-table/query.test.w) | compile | tf-aws

## inflight.$Closure1-1.cjs
```cjs
"use strict";
module.exports = function({ $t1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $t1.putItem(({"item": ({"k1": "key1","k2": "value1","k3": "other-value1"})})));
      (await $t1.putItem(({"item": ({"k1": "key1","k2": "value2","k3": "other-value2"})})));
      const result = (await $t1.query({ keyConditionExpression: "k1 = :k1", expressionAttributeValues: ({":k1": "key1"}) }));
      {((cond) => {if (!cond) throw new Error("assertion failed: result.count == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(result.count,2)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.items.at(0).get(\"k1\") == \"key1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((await result.items.at(0)), "k1"),"key1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.items.at(0).get(\"k2\") == \"value1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((await result.items.at(0)), "k2"),"value1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.items.at(0).get(\"k3\") == \"other-value1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((await result.items.at(0)), "k3"),"other-value1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.items.at(1).get(\"k1\") == \"key1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((await result.items.at(1)), "k1"),"key1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.items.at(1).get(\"k2\") == \"value2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((await result.items.at(1)), "k2"),"value2")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: result.items.at(1).get(\"k3\") == \"other-value2\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })((await result.items.at(1)), "k3"),"other-value2")))};
    }
  }
  return $Closure1;
}

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
      "exDynamodbTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.DynamodbTable/Default",
            "uniqueId": "exDynamodbTable"
          }
        },
        "attribute": [
          {
            "name": "k1",
            "type": "S"
          },
          {
            "name": "k2",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "k1",
        "name": "test1ex.DynamodbTable-c8d9b5e7",
        "range_key": "k2"
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
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.cjs")({
            $t1: ${context._lift(t1)},
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
        return ["handle", "$inflight_init"];
      }
      _registerOnLift(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerOnLiftObject(t1, host, ["putItem", "query"]);
        }
        super._registerOnLift(host, ops);
      }
    }
    const t1 = this.node.root.newAbstract("@winglang/sdk.ex.DynamodbTable",this, "ex.DynamodbTable", { name: "test1", attributeDefinitions: ({"k1": "S","k2": "S"}), hashKey: "k1", rangeKey: "k2" });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:query", new $Closure1(this, "$Closure1"));
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "query.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


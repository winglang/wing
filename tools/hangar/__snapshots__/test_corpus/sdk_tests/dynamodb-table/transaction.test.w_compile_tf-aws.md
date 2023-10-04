# [transaction.test.w](../../../../../../examples/tests/sdk_tests/dynamodb-table/transaction.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
module.exports = function({ $t1 }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      (await $t1.putItem(({"k1": "key1","k2": "value1","k3": "other-value1"})));
      (await $t1.putItem(({"k1": "key2","k2": "value2","k3": "other-value2"})));
      (await $t1.transactWriteItems({ transactItems: [({"put": ({"item": ({"k1": "key3","k2": "value3","k3": "other-value3"})})}), ({"delete": ({"key": ({"k1": "key2","k2": "value2"})})}), ({"update": ({"key": ({"k1": "key1","k2": "value1"}),"updateExpression": "set k3 = :k3","expressionAttributeValues": ({":k3": "not-other-value1"})})})] }));
      let r = (await $t1.getItem(({"k1": "key1","k2": "value1"})));
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k1\").asStr() == \"key1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k1")),"key1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k2\").asStr() == \"value1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k2")),"value1")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k3\").asStr() == \"not-other-value1\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k3")),"not-other-value1")))};
      r = (await $t1.getItem(({"k1": "key2","k2": "value2"})));
      {((cond) => {if (!cond) throw new Error("assertion failed: r.tryGet(\"k1\") == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((r)?.["k1"],undefined)))};
      r = (await $t1.getItem(({"k1": "key3","k2": "value3"})));
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k1\").asStr() == \"key3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k1")),"key3")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k2\").asStr() == \"value3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k2")),"value3")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: r.get(\"k3\").asStr() == \"other-value3\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(r, "k3")),"other-value3")))};
    }
    async $inflight_init() {
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
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[]"
    }
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

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
const ex = $stdlib.ex;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure1-1.js")({
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
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
      _registerBind(host, ops) {
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(t1, host, ["getItem", "putItem", "transactWriteItems"]);
        }
        super._registerBind(host, ops);
      }
    }
    const t1 = this.node.root.newAbstract("@winglang/sdk.ex.DynamodbTable",this,"ex.DynamodbTable",{ name: "test1", attributeDefinitions: ({"k1": "S","k2": "S"}), hashKey: "k1", rangeKey: "k2" });
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:transactWriteItems",new $Closure1(this,"$Closure1"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "transaction.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


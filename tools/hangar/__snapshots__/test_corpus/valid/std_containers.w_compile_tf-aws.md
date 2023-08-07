# [std_containers.w](../../../../../examples/tests/valid/std_containers.w) | compile | tf-aws

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
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    const sArray = Object.freeze(["one", "two"]);
    const mutArray = [...(sArray)];
    (mutArray.push("three"));
    const immutArray = Object.freeze([...(mutArray)]);
    const s = (sArray.at(1));
    {((cond) => {if (!cond) throw new Error("assertion failed: s == \"two\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"two")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sArray.at(1) == \"two\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((sArray.at(1)),"two")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sArray.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(sArray.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: immutArray.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(immutArray.length,3)))};
    const sArray2 = Object.freeze(["if", "you", "build", "it"]);
    const sArray3 = Object.freeze(["he", "will", "come", "for", "you"]);
    const mergedArray = (sArray2.concat(sArray3));
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.length == 9")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedArray.length,9)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.at(5) == \"will\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedArray.at(5)),"will")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.contains(\"build\")")})(mergedArray.includes("build"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: !mergedArray.contains(\"bring\")")})((!mergedArray.includes("bring")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.indexOf(\"you\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedArray.indexOf("you"),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.join(\" \") == \"if you build it he will come for you\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedArray.join(" ")),"if you build it he will come for you")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.join() == \"if,you,build,it,he,will,come,for,you\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedArray.join()),"if,you,build,it,he,will,come,for,you")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedArray.lastIndexOf(\"you\") == 8")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedArray.lastIndexOf("you"),8)))};
    const mutArray2 = ["how", "does", "that", "look"];
    const mergedMutArray = (mutArray.concat(mutArray2));
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedMutArray.length == 7")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mergedMutArray.length,7)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mergedMutArray.at(5) == \"that\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mergedMutArray.at(5)),"that")))};
    const sSet = Object.freeze(new Set(["one", "two"]));
    const mutSet = new Set(sSet);
    (mutSet.add("three"));
    const immutSet = Object.freeze(new Set(mutSet));
    {((cond) => {if (!cond) throw new Error("assertion failed: sSet.has(\"one\")")})((sSet.has("one")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sSet.size == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(sSet.size,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: immutSet.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(immutSet.size,3)))};
    const sMap = Object.freeze({"one":1,"two":2});
    const nestedMap = Object.freeze({"a":Object.freeze({"b":Object.freeze({"c":"hello"})})});
    const mutMap = {...(sMap)};
    ((obj, args) => { obj[args[0]] = args[1]; })(mutMap, ["five",5]);
    const immutMap = Object.freeze({...(mutMap)});
    {((cond) => {if (!cond) throw new Error("assertion failed: sMap.get(\"one\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((sMap)["one"],1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sMap.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(sMap).length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: immutMap.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(immutMap).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: nestedMap.get(\"a\").get(\"b\").get(\"c\") == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((nestedMap)["a"])["b"])["c"],"hello")))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "std_containers", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, sourceDir: process.env['WING_SOURCE_DIR'] }).synth();

```


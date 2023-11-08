# [std_containers.test.w](../../../../../examples/tests/valid/std_containers.test.w) | compile | tf-aws

## inflight.Animal-1.js
```js
"use strict";
module.exports = function({  }) {
  class Animal {
    constructor({  }) {
    }
  }
  return Animal;
}

```

## inflight.Cat-1.js
```js
"use strict";
module.exports = function({ $Animal }) {
  class Cat extends $Animal {
    constructor({  }) {
      super({  });
    }
  }
  return Cat;
}

```

## inflight.Dog-1.js
```js
"use strict";
module.exports = function({ $Animal }) {
  class Dog extends $Animal {
    constructor({  }) {
      super({  });
    }
  }
  return Dog;
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
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
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
"use strict";
const $stdlib = require('@winglang/sdk');
const $platforms = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLATFORMS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
class $Root extends $stdlib.std.Resource {
  constructor($scope, $id) {
    super($scope, $id);
    class Animal extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Animal-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const AnimalClient = ${Animal._toInflightType(this)};
            const client = new AnimalClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class Cat extends Animal {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Cat-1.js")({
            $Animal: ${context._lift(Animal)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const CatClient = ${Cat._toInflightType(this)};
            const client = new CatClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    class Dog extends Animal {
      constructor($scope, $id, ) {
        super($scope, $id);
      }
      static _toInflightType(context) {
        return `
          require("./inflight.Dog-1.js")({
            $Animal: ${context._lift(Animal)},
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const DogClient = ${Dog._toInflightType(this)};
            const client = new DogClient({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _supportedOps() {
        return ["$inflight_init"];
      }
    }
    const sArray = ["one", "two"];
    const mutArray = [...(sArray)];
    (mutArray.push("three"));
    const immutArray = [...(mutArray)];
    const s = (sArray.at(1));
    {((cond) => {if (!cond) throw new Error("assertion failed: s == \"two\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(s,"two")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sArray.at(1) == \"two\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((sArray.at(1)),"two")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sArray.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(sArray.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: immutArray.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(immutArray.length,3)))};
    const sArray2 = ["if", "you", "build", "it"];
    const sArray3 = ["he", "will", "come", "for", "you"];
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
    const sSet = new Set(["one", "two"]);
    const mutSet = new Set(sSet);
    (mutSet.add("three"));
    const immutSet = new Set(mutSet);
    {((cond) => {if (!cond) throw new Error("assertion failed: sSet.has(\"one\")")})((sSet.has("one")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sSet.size == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(sSet.size,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: immutSet.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(immutSet.size,3)))};
    const sMap = ({"one": 1,"two": 2});
    const nestedMap = ({"a": ({"b": ({"c": "hello"})})});
    const mutMap = {...(sMap)};
    ((obj, args) => { obj[args[0]] = args[1]; })(mutMap, ["five", 5]);
    const immutMap = ({...(mutMap)});
    {((cond) => {if (!cond) throw new Error("assertion failed: sMap.get(\"one\") == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(sMap, "one"),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: sMap.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(sMap).length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: immutMap.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(immutMap).length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: nestedMap.get(\"a\").get(\"b\").get(\"c\") == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, args) => { if (obj[args] === undefined) throw new Error(`Json property "${args}" does not exist`); return obj[args] })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(nestedMap, "a"), "b"), "c"),"hello")))};
    const heterogeneousArray = [new Cat(this, "C1"), new Dog(this, "D1")];
    const heterogeneousDoubleArray = [[new Cat(this, "C2")], [new Cat(this, "C3"), new Dog(this, "D2")], [new Animal(this, "A1")]];
    const heterogeneousSet = new Set([new Cat(this, "C4"), new Dog(this, "D3")]);
    const heterogeneousMap = ({"cat": new Cat(this, "C5"),"dog": new Dog(this, "D4")});
  }
}
const $PlatformManager = new $stdlib.platform.PlatformManager({platformPaths: $platforms});
const $APP = $PlatformManager.createApp({ outdir: $outdir, name: "std_containers.test", rootConstruct: $Root, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] });
$APP.synth();

```


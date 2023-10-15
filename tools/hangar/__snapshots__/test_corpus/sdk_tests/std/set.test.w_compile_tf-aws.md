# [set.test.w](../../../../../../examples/tests/sdk_tests/std/set.test.w) | compile | tf-aws

## inflight.$Closure1-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      {((cond) => {if (!cond) throw new Error("assertion failed: Set<num>{1, 2} == MutSet<num>{1, 2}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set([1, 2]),new Set([1, 2]))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: Set<bool>{true, false} == MutSet<bool>{false, true}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set([true, false]),new Set([false, true]))))};
    }
  }
  return $Closure1;
}

```

## inflight.$Closure10-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure10 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const acronyms = new Set([({"SEL": "Serial Experiments Lain","NGE": "Neon Genesis Evangelion"})]);
      const copyAcronyms = new Set(acronyms);
      {((cond) => {if (!cond) throw new Error("assertion failed: copyAcronyms == {{\"SEL\" => \"Serial Experiments Lain\", \"NGE\" => \"Neon Genesis Evangelion\"}}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copyAcronyms,new Set([({"SEL": "Serial Experiments Lain","NGE": "Neon Genesis Evangelion"})]))))};
      (await acronyms.add(({"DomeKano": "Domestic na Kanojo"})));
      const copyAcronymsNew = new Set(new Set(acronyms));
      {((cond) => {if (!cond) throw new Error("assertion failed: copyAcronymsNew == acronyms")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copyAcronymsNew,acronyms)))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure2-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const openings = new Set(["A Cruel Angel's Thesis", "Lilium", "Unravel", "TOP"]);
      const immutOpenings = new Set(openings);
      {((cond) => {if (!cond) throw new Error("assertion failed: immutOpenings.copyMut() == openings")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set(immutOpenings),openings)))};
      (await openings.add("Abnormalize"));
      {((cond) => {if (!cond) throw new Error("assertion failed: openings.has(\"Abnormalize\")")})((await openings.has("Abnormalize")))};
      (await openings.delete("TOP"));
      {((cond) => {if (!cond) throw new Error("assertion failed: openings.has(\"TOP\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await openings.has("TOP")),false)))};
      (await openings.clear());
      {((cond) => {if (!cond) throw new Error("assertion failed: openings.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(openings.size,0)))};
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const maleVA = new Set(["Kenjiro Tsuda", "Akira Ishida", "Yoshitsugu Matsuoka"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: maleVA.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(maleVA.size,3)))};
      const femaleVA = new Set(["Saori Hayami", "Miyuki Sawashiro"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: femaleVA.size == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(femaleVA.size,2)))};
      (await femaleVA.add("Maaya Sakamoto"));
      {((cond) => {if (!cond) throw new Error("assertion failed: femaleVA.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(femaleVA.size,3)))};
      (await femaleVA.clear());
      {((cond) => {if (!cond) throw new Error("assertion failed: femaleVA.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(femaleVA.size,0)))};
    }
  }
  return $Closure3;
}

```

## inflight.$Closure4-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure4 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const genre = new Set(["isekai", "mecha", "cyberpunk"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: genre.has(\"drama\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await genre.has("drama")),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: genre.has(\"mecha\")")})((await genre.has("mecha")))};
      const mutGenre = new Set(["rom-com", "sports", "sci-fi"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"psychological\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutGenre.has("psychological")),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"rom-com\")")})((await mutGenre.has("rom-com")))};
      (await mutGenre.delete("rom-com"));
      (await mutGenre.add("psychological"));
      {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"psychological\")")})((await mutGenre.has("psychological")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"rom-com\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mutGenre.has("rom-com")),false)))};
    }
  }
  return $Closure4;
}

```

## inflight.$Closure5-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure5 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const endings = new Set([]);
      {((cond) => {if (!cond) throw new Error("assertion failed: endings.toArray() == Array<bool>[]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(endings)],[])))};
      const strEndings = new Set(["Somewhere, Faraway, Everyone is Listening to a Ballad"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: strEndings.toArray() == [\"Somewhere, Faraway, Everyone is Listening to a Ballad\"]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(strEndings)],["Somewhere, Faraway, Everyone is Listening to a Ballad"])))};
      const copyEndings = new Set(endings);
      {((cond) => {if (!cond) throw new Error("assertion failed: copyEndings.toArray() == endings.toArray()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(copyEndings)],[...(endings)])))};
      const mutEndings = new Set([["Fly Me To The Moon", "Slump"], ["Heikousen"]]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutEndings.toArray() == [[\"Fly Me To The Moon\", \"Slump\"], [\"Heikousen\"]]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(mutEndings)],[["Fly Me To The Moon", "Slump"], ["Heikousen"]])))};
      (await mutEndings.add(["Wagamama"]));
      {((cond) => {if (!cond) throw new Error("assertion failed: mutEndings.toArray() == [[\"Fly Me To The Moon\", \"Slump\"], [\"Heikousen\"], [\"Wagamama\"]]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(mutEndings)],[["Fly Me To The Moon", "Slump"], ["Heikousen"], ["Wagamama"]])))};
      const immutEndings = new Set(mutEndings);
      {((cond) => {if (!cond) throw new Error("assertion failed: immutEndings.toArray() == mutEndings.toArray()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(immutEndings)],[...(mutEndings)])))};
    }
  }
  return $Closure5;
}

```

## inflight.$Closure6-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure6 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const talkingQuirks = new Set(["dattebane", "battebayo", "dattebasa"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: talkingQuirks.copyMut() == MutSet<str> {\"dattebane\", \"battebayo\", \"dattebasa\"}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set(talkingQuirks),new Set(["dattebane", "battebayo", "dattebasa"]))))};
    }
  }
  return $Closure6;
}

```

## inflight.$Closure7-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure7 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const evaRebuild = new Set([1.11, 2.22, 3.33]);
      (await evaRebuild.add((3 + 1)));
      {((cond) => {if (!cond) throw new Error("assertion failed: evaRebuild.has(3.0+1.0)")})((await evaRebuild.has((3 + 1))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: evaRebuild == MutSet<num>{1.11, 2.22, 3.33, 3.0+1.0}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(evaRebuild,new Set([1.11, 2.22, 3.33, (3 + 1)]))))};
    }
  }
  return $Closure7;
}

```

## inflight.$Closure8-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure8 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const studios = new Set(["Gainax", "Ghibli", "Production I.G.", "Shaft"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: studios.delete(\"Gainax\")")})((await studios.delete("Gainax")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studios.has(\"Gainax\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await studios.has("Gainax")),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studios.delete(\"Sunrise\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await studios.delete("Sunrise")),false)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: studios.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studios.size,3)))};
    }
  }
  return $Closure8;
}

```

## inflight.$Closure9-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure9 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const demographics = new Set(["shounen", "shoujo", "josei", "seinen"]);
      (await demographics.clear());
      {((cond) => {if (!cond) throw new Error("assertion failed: demographics.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(demographics.size,0)))};
      (await demographics.add("kodomo"));
      (await demographics.clear());
      {((cond) => {if (!cond) throw new Error("assertion failed: demographics.has(\"kodomo\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await demographics.has("kodomo")),false)))};
    }
  }
  return $Closure9;
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
const $plugins = ((s) => !s ? [] : s.split(';'))(process.env.WING_PLUGIN_PATHS);
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const $wing_is_test = process.env.WING_IS_TEST === "true";
const std = $stdlib.std;
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
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure2-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this)};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure3-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this)};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure4 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure4-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure4Client = ${$Closure4._toInflightType(this)};
            const client = new $Closure4Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure5 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure5-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure5Client = ${$Closure5._toInflightType(this)};
            const client = new $Closure5Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure6 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure6-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure6Client = ${$Closure6._toInflightType(this)};
            const client = new $Closure6Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure7 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure7-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure7Client = ${$Closure7._toInflightType(this)};
            const client = new $Closure7Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure8 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure8-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure8Client = ${$Closure8._toInflightType(this)};
            const client = new $Closure8Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure9 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure9-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure9Client = ${$Closure9._toInflightType(this)};
            const client = new $Closure9Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    class $Closure10 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure10-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure10Client = ${$Closure10._toInflightType(this)};
            const client = new $Closure10Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `;
      }
      _getInflightOps() {
        return ["handle", "$inflight_init"];
      }
    }
    const mySet = new Set([1, 2, 3]);
    const myArrayFromSet = [...(mySet)];
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromSet.at(0) == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((myArrayFromSet.at(0)),1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromSet.at(1) == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((myArrayFromSet.at(1)),2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromSet.at(2) == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((myArrayFromSet.at(2)),3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromSet.length == mySet.size")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myArrayFromSet.length,mySet.size)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromSet.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myArrayFromSet.length,3)))};
    const myMutSet = new Set(["a", "b", "c"]);
    const myArrayFromMutSet = [...(myMutSet)];
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromMutSet.at(0) == \"a\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((myArrayFromMutSet.at(0)),"a")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromMutSet.at(1) == \"b\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((myArrayFromMutSet.at(1)),"b")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromMutSet.at(2) == \"c\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((myArrayFromMutSet.at(2)),"c")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromMutSet.length == myMutSet.size")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myArrayFromMutSet.length,myMutSet.size)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: myArrayFromMutSet.length == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(myArrayFromMutSet.length,3)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Set<num>{1, 2} == MutSet<num>{1, 2}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set([1, 2]),new Set([1, 2]))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Set<bool>{true, false} == MutSet<bool>{false, true}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set([true, false]),new Set([false, true]))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:equality",new $Closure1(this,"$Closure1"));
    const openings = new Set(["A Cruel Angel's Thesis", "Lilium", "Unravel", "TOP"]);
    const immutOpenings = new Set(openings);
    {((cond) => {if (!cond) throw new Error("assertion failed: immutOpenings.copyMut() == openings")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set(immutOpenings),openings)))};
    (openings.add("Abnormalize"));
    {((cond) => {if (!cond) throw new Error("assertion failed: openings.has(\"Abnormalize\")")})((openings.has("Abnormalize")))};
    (openings.delete("TOP"));
    {((cond) => {if (!cond) throw new Error("assertion failed: openings.has(\"TOP\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((openings.has("TOP")),false)))};
    (openings.clear());
    {((cond) => {if (!cond) throw new Error("assertion failed: openings.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(openings.size,0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:mutability",new $Closure2(this,"$Closure2"));
    const maleVA = new Set(["Kenjiro Tsuda", "Akira Ishida", "Yoshitsugu Matsuoka"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: maleVA.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(maleVA.size,3)))};
    const femaleVA = new Set(["Saori Hayami", "Miyuki Sawashiro"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: femaleVA.size == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(femaleVA.size,2)))};
    (femaleVA.add("Maaya Sakamoto"));
    {((cond) => {if (!cond) throw new Error("assertion failed: femaleVA.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(femaleVA.size,3)))};
    (femaleVA.clear());
    {((cond) => {if (!cond) throw new Error("assertion failed: femaleVA.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(femaleVA.size,0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:size()",new $Closure3(this,"$Closure3"));
    const genre = new Set(["isekai", "mecha", "cyberpunk"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: genre.has(\"drama\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((genre.has("drama")),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: genre.has(\"mecha\")")})((genre.has("mecha")))};
    const mutGenre = new Set(["rom-com", "sports", "sci-fi"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"psychological\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mutGenre.has("psychological")),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"rom-com\")")})((mutGenre.has("rom-com")))};
    (mutGenre.delete("rom-com"));
    (mutGenre.add("psychological"));
    {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"psychological\")")})((mutGenre.has("psychological")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mutGenre.has(\"rom-com\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mutGenre.has("rom-com")),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:has()",new $Closure4(this,"$Closure4"));
    const endings = new Set([]);
    {((cond) => {if (!cond) throw new Error("assertion failed: endings.toArray() == Array<bool>[]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(endings)],[])))};
    const strEndings = new Set(["Somewhere, Faraway, Everyone is Listening to a Ballad"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: strEndings.toArray() == [\"Somewhere, Faraway, Everyone is Listening to a Ballad\"]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(strEndings)],["Somewhere, Faraway, Everyone is Listening to a Ballad"])))};
    const copyEndings = new Set(endings);
    {((cond) => {if (!cond) throw new Error("assertion failed: copyEndings.toArray() == endings.toArray()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(copyEndings)],[...(endings)])))};
    const mutEndings = new Set([["Fly Me To The Moon", "Slump"], ["Heikousen"]]);
    {((cond) => {if (!cond) throw new Error("assertion failed: mutEndings.toArray() == [[\"Fly Me To The Moon\", \"Slump\"], [\"Heikousen\"]]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(mutEndings)],[["Fly Me To The Moon", "Slump"], ["Heikousen"]])))};
    (mutEndings.add(["Wagamama"]));
    {((cond) => {if (!cond) throw new Error("assertion failed: mutEndings.toArray() == [[\"Fly Me To The Moon\", \"Slump\"], [\"Heikousen\"], [\"Wagamama\"]]")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(mutEndings)],[["Fly Me To The Moon", "Slump"], ["Heikousen"], ["Wagamama"]])))};
    const immutEndings = new Set(mutEndings);
    {((cond) => {if (!cond) throw new Error("assertion failed: immutEndings.toArray() == mutEndings.toArray()")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })([...(immutEndings)],[...(mutEndings)])))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:toArray()",new $Closure5(this,"$Closure5"));
    const talkingQuirks = new Set(["dattebane", "battebayo", "dattebasa"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: talkingQuirks.copyMut() == MutSet<str> {\"dattebane\", \"battebayo\", \"dattebasa\"}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(new Set(talkingQuirks),new Set(["dattebane", "battebayo", "dattebasa"]))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copyMut()",new $Closure6(this,"$Closure6"));
    const evaRebuild = new Set([1.11, 2.22, 3.33]);
    (evaRebuild.add((3 + 1)));
    {((cond) => {if (!cond) throw new Error("assertion failed: evaRebuild.has(3.0+1.0)")})((evaRebuild.has((3 + 1))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: evaRebuild == MutSet<num>{1.11, 2.22, 3.33, 3.0+1.0}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(evaRebuild,new Set([1.11, 2.22, 3.33, (3 + 1)]))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:add()",new $Closure7(this,"$Closure7"));
    const studios = new Set(["Gainax", "Ghibli", "Production I.G.", "Shaft"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: studios.delete(\"Gainax\")")})((studios.delete("Gainax")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: studios.has(\"Gainax\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((studios.has("Gainax")),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: studios.delete(\"Sunrise\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((studios.delete("Sunrise")),false)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: studios.size == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(studios.size,3)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:delete()",new $Closure8(this,"$Closure8"));
    const demographics = new Set(["shounen", "shoujo", "josei", "seinen"]);
    (demographics.clear());
    {((cond) => {if (!cond) throw new Error("assertion failed: demographics.size == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(demographics.size,0)))};
    (demographics.add("kodomo"));
    (demographics.clear());
    {((cond) => {if (!cond) throw new Error("assertion failed: demographics.has(\"kodomo\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((demographics.has("kodomo")),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:clear()",new $Closure9(this,"$Closure9"));
    const acronyms = new Set([({"SEL": "Serial Experiments Lain","NGE": "Neon Genesis Evangelion"})]);
    const copyAcronyms = new Set(acronyms);
    {((cond) => {if (!cond) throw new Error("assertion failed: copyAcronyms == {{\"SEL\" => \"Serial Experiments Lain\", \"NGE\" => \"Neon Genesis Evangelion\"}}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copyAcronyms,new Set([({"SEL": "Serial Experiments Lain","NGE": "Neon Genesis Evangelion"})]))))};
    (acronyms.add(({"DomeKano": "Domestic na Kanojo"})));
    const copyAcronymsNew = new Set(new Set(acronyms));
    {((cond) => {if (!cond) throw new Error("assertion failed: copyAcronymsNew == acronyms")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(copyAcronymsNew,acronyms)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:copy()",new $Closure10(this,"$Closure10"));
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "set.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


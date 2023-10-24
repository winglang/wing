# [map.test.w](../../../../../../examples/tests/sdk_tests/std/map.test.w) | compile | tf-aws

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
      {((cond) => {if (!cond) throw new Error("assertion failed: Map<str>{} == MutMap<str>{}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(({}),({}))))};
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
      const senate = ({"chancellor": "palpatine"});
      ((obj, args) => { obj[args[0]] = args[1]; })(senate, ["senator", "organa"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: senate.get(\"senator\") == \"organa\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(senate, "senator"),"organa")))};
      {((cond) => {if (!cond) throw new Error("assertion failed: senate.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(senate).length,2)))};
    }
  }
  return $Closure10;
}

```

## inflight.$Closure11-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure11 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const position = ({"librarian": "jocasta"});
      ((map) => { for(const k in map){delete map[k]}; })(position);
      {((cond) => {if (!cond) throw new Error("assertion failed: position.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(position).length,0)))};
    }
  }
  return $Closure11;
}

```

## inflight.$Closure12-1.js
```js
"use strict";
module.exports = function({  }) {
  class $Closure12 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async handle() {
      const sithTriumvirate = ({"traya": "lord of betrayal","nihilus": "lord of hunger","sion": "lord of pain"});
      (delete (sithTriumvirate)["nihilus"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: sithTriumvirate.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(sithTriumvirate).length,2)))};
      (delete (sithTriumvirate)["sion"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: sithTriumvirate == MutMap<str> { \"traya\" => \"lord of betrayal\" }")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(sithTriumvirate,({"traya": "lord of betrayal"}))))};
    }
  }
  return $Closure12;
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
      const apprentices = ({"plagueis": "sidious","dooku": "ventress"});
      (delete (apprentices)["plagueis"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.size() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(apprentices).length,1)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.copy() == Map<str> {\"dooku\" => \"ventress\"}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(({...(apprentices)}),({"dooku": "ventress"}))))};
      ((obj, args) => { obj[args[0]] = args[1]; })(apprentices, ["sidious", "dooku"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.get(\"sidious\")  == \"dooku\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(apprentices, "sidious"),"dooku")))};
      ((obj, args) => { obj[args[0]] = args[1]; })(apprentices, ["sidious", "maul"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.get(\"sidious\") == \"maul\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(apprentices, "sidious"),"maul")))};
      ((map) => { for(const k in map){delete map[k]}; })(apprentices);
      {((cond) => {if (!cond) throw new Error("assertion failed: apprentices == MutMap<str>{}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(apprentices,({}))))};
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
      const trilogies = ({"PT": 2,"OT": 1,"ST": 3});
      {((cond) => {if (!cond) throw new Error("assertion failed: trilogies.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(trilogies).length,3)))};
      const mutTrilogies = ({"PT": 2,"OT": 1,"ST": 3});
      {((cond) => {if (!cond) throw new Error("assertion failed: mutTrilogies.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(mutTrilogies).length,3)))};
      (delete (mutTrilogies)["ST"]);
      {((cond) => {if (!cond) throw new Error("assertion failed: mutTrilogies.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(mutTrilogies).length,2)))};
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
      const greeting = ({"hello": "there!"});
      {((cond) => {if (!cond) throw new Error("assertion failed: greeting.get(\"hello\") == \"there!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(greeting, "hello"),"there!")))};
      try {
        ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(greeting, "bye");
      }
      catch ($error_err) {
        const err = $error_err.message;
        {((cond) => {if (!cond) throw new Error("assertion failed: err.contains(\"does not contain key: \\\"bye\\\"\")")})(err.includes("does not contain key: \"bye\""))};
      }
      const general = (greeting)["grievous"];
      {((cond) => {if (!cond) throw new Error("assertion failed: general == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(general,undefined)))};
      const mutGreeting = ({"general": "kenobi"});
      {((cond) => {if (!cond) throw new Error("assertion failed: mutGreeting.get(\"general\") == \"kenobi\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(mutGreeting, "general"),"kenobi")))};
      const Viceroy = (mutGreeting)["gunray"];
      {((cond) => {if (!cond) throw new Error("assertion failed: Viceroy == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Viceroy,undefined)))};
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
      const legion501 = ({"fives": "CT-5555","rex": "CT-7567","appo": "CC-1119","jesse": "CT-5597"});
      {((cond) => {if (!cond) throw new Error("assertion failed: legion501.has(\"fives\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("fives" in (legion501)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: legion501.has(\"rex\") == legion501.has(\"jesse\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("rex" in (legion501)),("jesse" in (legion501)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: legion501.has(\"cody\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("cody" in (legion501)),false)))};
      const padawans = ({"ahsoka": "anakin","anakin": "kenobi","kenobi": "qui gon","qui gon": "dooku","dooku": "yoda"});
      {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"anakin\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("anakin" in (padawans)),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"qui gon\") == padawans.has(\"dooku\") == padawans.has(\"anakin\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("qui gon" in (padawans)),("dooku" in (padawans)))),("anakin" in (padawans)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"windu\") == padawans.has(\"sifo dyas\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("windu" in (padawans)),("sifo dyas" in (padawans)))))};
      {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"revan\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("revan" in (padawans)),false)))};
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
      const forceUsers = ({"sith": ["malak", "vader", "bane"],"jedi": ["sunrider", "bastila", "bindo"]});
      const userKeys = Object.values(forceUsers);
      const valArr = [["malak", "vader", "bane"], ["sunrider", "bastila", "bindo"]];
      {((cond) => {if (!cond) throw new Error("assertion failed: userKeys.length == valArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(userKeys.length,valArr.length)))};
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,userKeys.length,false)) {
        {((cond) => {if (!cond) throw new Error("assertion failed: userKeys.at(i) == valArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await userKeys.at(i)),(await valArr.at(i)))))};
      }
      const saberforms = ({"1st": "shii-cho","2nd": "makashi","3rd": "soresu","4th": "ataru","5th": "shien","6th": "niman","7th": "juyo"});
      const saberformNames = Object.values(saberforms);
      const nameArr = ["shii-cho", "makashi", "soresu", "ataru", "shien", "niman", "juyo"];
      {((cond) => {if (!cond) throw new Error("assertion failed: saberformNames.length == nameArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(saberformNames.length,nameArr.length)))};
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,saberformNames.length,false)) {
        {((cond) => {if (!cond) throw new Error("assertion failed: saberformNames.at(i) == nameArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await saberformNames.at(i)),(await nameArr.at(i)))))};
      }
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
      const lightsaberColorMap = ({"red": "sith","blue": "jedi"});
      const lightsaberColors = Object.keys(lightsaberColorMap);
      const colorArr = ["red", "blue"];
      {((cond) => {if (!cond) throw new Error("assertion failed: lightsaberColors.length == colorArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(lightsaberColors.length,colorArr.length)))};
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,lightsaberColors.length,false)) {
        {((cond) => {if (!cond) throw new Error("assertion failed: lightsaberColors.at(i) == colorArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await lightsaberColors.at(i)),(await colorArr.at(i)))))};
      }
      const isMandalorianWarrior = ({"bo katan": true,"jango": true,"satine": false,"boba": true});
      const mandalorianKeys = Object.keys(isMandalorianWarrior);
      const keysArr = ["bo katan", "jango", "satine", "boba"];
      {((cond) => {if (!cond) throw new Error("assertion failed: mandalorianKeys.length == keysArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mandalorianKeys.length,keysArr.length)))};
      for (const i of ((s,e,i) => { function* iterator(start,end,inclusive) { let i = start; let limit = inclusive ? ((end < start) ? end - 1 : end + 1) : end; while (i < limit) yield i++; while (i > limit) yield i--; }; return iterator(s,e,i); })(0,mandalorianKeys.length,false)) {
        {((cond) => {if (!cond) throw new Error("assertion failed: mandalorianKeys.at(i) == keysArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((await mandalorianKeys.at(i)),(await keysArr.at(i)))))};
      }
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
      const ruleOfTwo = ({"master": "apprentice"});
      const mutRuleOfTwo = {...(ruleOfTwo)};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutRuleOfTwo.copy() == ruleOfTwo")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(({...(mutRuleOfTwo)}),ruleOfTwo)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutRuleOfTwo.delete(\"master\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((delete (mutRuleOfTwo)["master"]),true)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: mutRuleOfTwo.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(mutRuleOfTwo).length,0)))};
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
      const authority = ({"republic": "senate","empire": "emperor"});
      const immutAuthority = ({...(authority)});
      {((cond) => {if (!cond) throw new Error("assertion failed: immutAuthority.copyMut() == authority")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })({...(immutAuthority)},authority)))};
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
  constructor($scope, $id) {
    super($scope, $id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
      constructor($scope, $id, ) {
        super($scope, $id);
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
    class $Closure11 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure11-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure11Client = ${$Closure11._toInflightType(this)};
            const client = new $Closure11Client({
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
    class $Closure12 extends $stdlib.std.Resource {
      constructor($scope, $id, ) {
        super($scope, $id);
        (std.Node.of(this)).hidden = true;
      }
      static _toInflightType(context) {
        return `
          require("./inflight.$Closure12-1.js")({
          })
        `;
      }
      _toInflight() {
        return `
          (await (async () => {
            const $Closure12Client = ${$Closure12._toInflightType(this)};
            const client = new $Closure12Client({
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
    const m = ({"hello": 123,"world": 99});
    const mkeys = Object.keys(m);
    {((cond) => {if (!cond) throw new Error("assertion failed: mkeys.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mkeys.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mkeys.at(0) == \"hello\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mkeys.at(0)),"hello")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mkeys.at(1) == \"world\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mkeys.at(1)),"world")))};
    const mvalues = Object.values(m);
    {((cond) => {if (!cond) throw new Error("assertion failed: mvalues.length == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mvalues.length,2)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mvalues.at(0) == 123")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mvalues.at(0)),123)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mvalues.at(1) == 99")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mvalues.at(1)),99)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: Map<str>{} == MutMap<str>{}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(({}),({}))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:equality", new $Closure1(this, "$Closure1"));
    const apprentices = ({"plagueis": "sidious","dooku": "ventress"});
    (delete (apprentices)["plagueis"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.size() == 1")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(apprentices).length,1)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.copy() == Map<str> {\"dooku\" => \"ventress\"}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(({...(apprentices)}),({"dooku": "ventress"}))))};
    ((obj, args) => { obj[args[0]] = args[1]; })(apprentices, ["sidious", "dooku"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.get(\"sidious\")  == \"dooku\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(apprentices, "sidious"),"dooku")))};
    ((obj, args) => { obj[args[0]] = args[1]; })(apprentices, ["sidious", "maul"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: apprentices.get(\"sidious\") == \"maul\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(apprentices, "sidious"),"maul")))};
    ((map) => { for(const k in map){delete map[k]}; })(apprentices);
    {((cond) => {if (!cond) throw new Error("assertion failed: apprentices == MutMap<str>{}")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(apprentices,({}))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:mutability", new $Closure2(this, "$Closure2"));
    const trilogies = ({"PT": 2,"OT": 1,"ST": 3});
    {((cond) => {if (!cond) throw new Error("assertion failed: trilogies.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(trilogies).length,3)))};
    const mutTrilogies = ({"PT": 2,"OT": 1,"ST": 3});
    {((cond) => {if (!cond) throw new Error("assertion failed: mutTrilogies.size() == 3")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(mutTrilogies).length,3)))};
    (delete (mutTrilogies)["ST"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: mutTrilogies.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(mutTrilogies).length,2)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:size()", new $Closure3(this, "$Closure3"));
    const greeting = ({"hello": "there!"});
    {((cond) => {if (!cond) throw new Error("assertion failed: greeting.get(\"hello\") == \"there!\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(greeting, "hello"),"there!")))};
    try {
      ((obj, key) => { if (!(key in obj)) throw new Error(`Map does not contain key: "${key}"`); return obj[key]; })(greeting, "bye");
    }
    catch ($error_err) {
      const err = $error_err.message;
      {((cond) => {if (!cond) throw new Error("assertion failed: err.contains(\"does not contain key: \\\"bye\\\"\")")})(err.includes("does not contain key: \"bye\""))};
    }
    const general = (greeting)["grievous"];
    {((cond) => {if (!cond) throw new Error("assertion failed: general == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(general,undefined)))};
    const mutGreeting = ({"general": "kenobi"});
    {((cond) => {if (!cond) throw new Error("assertion failed: mutGreeting.get(\"general\") == \"kenobi\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(mutGreeting, "general"),"kenobi")))};
    const Viceroy = (mutGreeting)["gunray"];
    {((cond) => {if (!cond) throw new Error("assertion failed: Viceroy == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Viceroy,undefined)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:get()", new $Closure4(this, "$Closure4"));
    const legion501 = ({"fives": "CT-5555","rex": "CT-7567","appo": "CC-1119","jesse": "CT-5597"});
    {((cond) => {if (!cond) throw new Error("assertion failed: legion501.has(\"fives\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("fives" in (legion501)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: legion501.has(\"rex\") == legion501.has(\"jesse\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("rex" in (legion501)),("jesse" in (legion501)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: legion501.has(\"cody\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("cody" in (legion501)),false)))};
    const padawans = ({"ahsoka": "anakin","anakin": "kenobi","kenobi": "qui gon","qui gon": "dooku","dooku": "yoda"});
    {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"anakin\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("anakin" in (padawans)),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"qui gon\") == padawans.has(\"dooku\") == padawans.has(\"anakin\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("qui gon" in (padawans)),("dooku" in (padawans)))),("anakin" in (padawans)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"windu\") == padawans.has(\"sifo dyas\")")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("windu" in (padawans)),("sifo dyas" in (padawans)))))};
    {((cond) => {if (!cond) throw new Error("assertion failed: padawans.has(\"revan\") == false")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(("revan" in (padawans)),false)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:has()", new $Closure5(this, "$Closure5"));
    const forceUsers = ({"sith": ["malak", "vader", "bane"],"jedi": ["sunrider", "bastila", "bindo"]});
    const userKeys = Object.values(forceUsers);
    const valArr = [["malak", "vader", "bane"], ["sunrider", "bastila", "bindo"]];
    {((cond) => {if (!cond) throw new Error("assertion failed: userKeys.length == valArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(userKeys.length,valArr.length)))};
    for (const i of $stdlib.std.Range.of(0, userKeys.length, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: userKeys.at(i) == valArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((userKeys.at(i)),(valArr.at(i)))))};
    }
    const saberforms = ({"1st": "shii-cho","2nd": "makashi","3rd": "soresu","4th": "ataru","5th": "shien","6th": "niman","7th": "juyo"});
    const saberformNames = Object.values(saberforms);
    const nameArr = ["shii-cho", "makashi", "soresu", "ataru", "shien", "niman", "juyo"];
    {((cond) => {if (!cond) throw new Error("assertion failed: saberformNames.length == nameArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(saberformNames.length,nameArr.length)))};
    for (const i of $stdlib.std.Range.of(0, saberformNames.length, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: saberformNames.at(i) == nameArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((saberformNames.at(i)),(nameArr.at(i)))))};
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:values()", new $Closure6(this, "$Closure6"));
    const lightsaberColorMap = ({"red": "sith","blue": "jedi"});
    const lightsaberColors = Object.keys(lightsaberColorMap);
    const colorArr = ["red", "blue"];
    {((cond) => {if (!cond) throw new Error("assertion failed: lightsaberColors.length == colorArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(lightsaberColors.length,colorArr.length)))};
    for (const i of $stdlib.std.Range.of(0, lightsaberColors.length, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: lightsaberColors.at(i) == colorArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((lightsaberColors.at(i)),(colorArr.at(i)))))};
    }
    const isMandalorianWarrior = ({"bo katan": true,"jango": true,"satine": false,"boba": true});
    const mandalorianKeys = Object.keys(isMandalorianWarrior);
    const keysArr = ["bo katan", "jango", "satine", "boba"];
    {((cond) => {if (!cond) throw new Error("assertion failed: mandalorianKeys.length == keysArr.length")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(mandalorianKeys.length,keysArr.length)))};
    for (const i of $stdlib.std.Range.of(0, mandalorianKeys.length, false)) {
      {((cond) => {if (!cond) throw new Error("assertion failed: mandalorianKeys.at(i) == keysArr.at(i)")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((mandalorianKeys.at(i)),(keysArr.at(i)))))};
    }
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:keys()", new $Closure7(this, "$Closure7"));
    const ruleOfTwo = ({"master": "apprentice"});
    const mutRuleOfTwo = {...(ruleOfTwo)};
    {((cond) => {if (!cond) throw new Error("assertion failed: mutRuleOfTwo.copy() == ruleOfTwo")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(({...(mutRuleOfTwo)}),ruleOfTwo)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mutRuleOfTwo.delete(\"master\") == true")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })((delete (mutRuleOfTwo)["master"]),true)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: mutRuleOfTwo.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(mutRuleOfTwo).length,0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:copyMut()", new $Closure8(this, "$Closure8"));
    const authority = ({"republic": "senate","empire": "emperor"});
    const immutAuthority = ({...(authority)});
    {((cond) => {if (!cond) throw new Error("assertion failed: immutAuthority.copyMut() == authority")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })({...(immutAuthority)},authority)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:copy()", new $Closure9(this, "$Closure9"));
    const senate = ({"chancellor": "palpatine"});
    ((obj, args) => { obj[args[0]] = args[1]; })(senate, ["senator", "organa"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: senate.get(\"senator\") == \"organa\"")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(senate, "senator"),"organa")))};
    {((cond) => {if (!cond) throw new Error("assertion failed: senate.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(senate).length,2)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:set()", new $Closure10(this, "$Closure10"));
    const position = ({"librarian": "jocasta"});
    ((map) => { for(const k in map){delete map[k]}; })(position);
    {((cond) => {if (!cond) throw new Error("assertion failed: position.size() == 0")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(position).length,0)))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:clear()", new $Closure11(this, "$Closure11"));
    const sithTriumvirate = ({"traya": "lord of betrayal","nihilus": "lord of hunger","sion": "lord of pain"});
    (delete (sithTriumvirate)["nihilus"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: sithTriumvirate.size() == 2")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(Object.keys(sithTriumvirate).length,2)))};
    (delete (sithTriumvirate)["sion"]);
    {((cond) => {if (!cond) throw new Error("assertion failed: sithTriumvirate == MutMap<str> { \"traya\" => \"lord of betrayal\" }")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(sithTriumvirate,({"traya": "lord of betrayal"}))))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this, "test:delete()", new $Closure12(this, "$Closure12"));
    const mapOfOptionalString = ({});
    ((obj, args) => { obj[args[0]] = args[1]; })(mapOfOptionalString, ["a", undefined]);
    const b = ((obj, key) => { if (!(key in obj)) throw new Error(`MutMap does not contain key: "${key}"`); return obj[key]; })(mapOfOptionalString, "a");
    {((cond) => {if (!cond) throw new Error("assertion failed: b == nil")})((((a,b) => { try { return require('assert').deepStrictEqual(a,b) === undefined; } catch { return false; } })(b,undefined)))};
  }
}
const $App = $stdlib.core.App.for(process.env.WING_TARGET);
new $App({ outdir: $outdir, name: "map.test", rootConstruct: $Root, plugins: $plugins, isTestEnvironment: $wing_is_test, entrypointDir: process.env['WING_SOURCE_DIR'], rootId: process.env['WING_ROOT_ID'] }).synth();

```


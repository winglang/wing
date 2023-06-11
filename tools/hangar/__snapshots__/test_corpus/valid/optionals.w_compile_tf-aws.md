# [optionals.w](../../../../../examples/tests/valid/optionals.w) | compile | tf-aws

## inflight.Node.js
```js
module.exports = function({  }) {
  class Node {
    constructor({ left, right, value }) {
      this.left = left;
      this.right = right;
      this.value = value;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return Node;
}

```

## inflight.Sub.js
```js
module.exports = function({  }) {
  class Sub extends Super {
    constructor({ name }) {
      super(name);
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return Sub;
}

```

## inflight.Sub1.js
```js
module.exports = function({  }) {
  class Sub1 extends Super {
    constructor({ name }) {
      super(name);
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return Sub1;
}

```

## inflight.Super.js
```js
module.exports = function({  }) {
  class Super {
    constructor({ name }) {
      this.name = name;
    }
    async $inflight_init()  {
      const __parent_this = this;
    }
  }
  return Super;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
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
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Super extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        const __parent_this = this;
        this.name = "Super";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Super.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SuperClient = ${Super._toInflightType(this).text};
            const client = new SuperClient({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Super._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Sub extends Super {
      constructor(scope, id, ) {
        const __parent_this = this;
        this.name = "Sub";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Sub.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const SubClient = ${Sub._toInflightType(this).text};
            const client = new SubClient({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Sub._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Sub1 extends Super {
      constructor(scope, id, ) {
        const __parent_this = this;
        this.name = "Sub";
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Sub1.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const name_client = this._lift(this.name);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const Sub1Client = ${Sub1._toInflightType(this).text};
            const client = new Sub1Client({
              name: ${name_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Sub1._registerBindObject(this.name, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    class Node extends $stdlib.std.Resource {
      constructor(scope, id, value, left, right) {
        super(scope, id);
        const __parent_this = this;
        this.value = value;
        this.left = left;
        this.right = right;
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.Node.js";
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
          })
        `);
      }
      _toInflight() {
        const left_client = this._lift(this.left);
        const right_client = this._lift(this.right);
        const value_client = this._lift(this.value);
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const NodeClient = ${Node._toInflightType(this).text};
            const client = new NodeClient({
              left: ${left_client},
              right: ${right_client},
              value: ${value_client},
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          Node._registerBindObject(this.left, host, []);
          Node._registerBindObject(this.right, host, []);
          Node._registerBindObject(this.value, host, []);
        }
        super._registerBind(host, ops);
      }
    }
    const x = 4;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((x) != null) === true)'`)})((((x) != null) === true))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((!((x) != null)) === false)'`)})(((!((x) != null)) === false))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((x ?? 5) === 4)'`)})(((x ?? 5) === 4))};
    const y = (x ?? 5);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 4)'`)})((y === 4))};
    const optionalSup = new Super(this,"Super");
    const s = (optionalSup ?? new Sub(this,"Sub"));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s.name === "Super")'`)})((s.name === "Super"))};
    let name = {
    "first": "John",
    "last": "Doe",}
    ;
    {
      const $IF_LET_VALUE = name;
      if ($IF_LET_VALUE != undefined) {
        const n = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(n.first === "John")'`)})((n.first === "John"))};
      }
    }
    name = undefined;
    {
      const $IF_LET_VALUE = name;
      if ($IF_LET_VALUE != undefined) {
        const n = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'true'`)})(true)};
      }
    }
    const tryParseName =  (fullName) =>  {
      const parts = (fullName.split(" "));
      if ((parts.length < 1)) {
        return undefined;
      }
      return {
      "first": (parts.at(0)),
      "last": (parts.at(1)),}
      ;
    }
    ;
    {
      const $IF_LET_VALUE = (tryParseName("Good Name"));
      if ($IF_LET_VALUE != undefined) {
        const parsedName = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(parsedName.first === "Good")'`)})((parsedName.first === "Good"))};
        {
          const $IF_LET_VALUE = parsedName.last;
          if ($IF_LET_VALUE != undefined) {
            const lastName = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error(`assertion failed: '(lastName === "Name")'`)})((lastName === "Name"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
          }
        }
      }
    }
    {
      const $IF_LET_VALUE = (tryParseName("BadName"));
      if ($IF_LET_VALUE != undefined) {
        const parsedName = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(parsedName.first === "BadName")'`)})((parsedName.first === "BadName"))};
        {
          const $IF_LET_VALUE = parsedName.last;
          if ($IF_LET_VALUE != undefined) {
            const lastName = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
          }
        }
      }
    }
    const falsy = false;
    {
      const $IF_LET_VALUE = falsy;
      if ($IF_LET_VALUE != undefined) {
        const f = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(f === false)'`)})((f === false))};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
    const shadow = "root";
    {
      const $IF_LET_VALUE = shadow;
      if ($IF_LET_VALUE != undefined) {
        const shadow = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(shadow === "root")'`)})((shadow === "root"))};
        const shadow1 = "nested";
        {
          const $IF_LET_VALUE = shadow1;
          if ($IF_LET_VALUE != undefined) {
            const shadow1 = $IF_LET_VALUE;
            {((cond) => {if (!cond) throw new Error(`assertion failed: '(shadow1 === "nested")'`)})((shadow1 === "nested"))};
          }
          else {
            {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
          }
        }
      }
    }
    const fun =  (a) =>  {
      {
        const $IF_LET_VALUE = a;
        if ($IF_LET_VALUE != undefined) {
          const y = $IF_LET_VALUE;
          return y;
        }
        else {
          return "default";
        }
      }
    }
    ;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((fun("hello")) === "hello")'`)})(((fun("hello")) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((fun(undefined)) === "default")'`)})(((fun(undefined)) === "default"))};
    const tree = new Node(this,"eight",8,new Node(this,"three",3,new Node(this,"one",1,undefined,undefined),new Node(this,"six",6,undefined,undefined)),new Node(this,"ten",10,undefined,new Node(this,"fourteen",14,new Node(this,"thirteen",13,undefined,undefined),undefined)));
    const thirteen = tree.right.right.left.value;
    const notThere = tree.right.right.right;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(thirteen === 13)'`)})((thirteen === 13))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(notThere === undefined)'`)})((notThere === undefined))};
    {
      const $IF_LET_VALUE = tree.left.left;
      if ($IF_LET_VALUE != undefined) {
        const o = $IF_LET_VALUE;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(o.value === 1)'`)})((o.value === 1))};
      }
    }
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "optionals", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```


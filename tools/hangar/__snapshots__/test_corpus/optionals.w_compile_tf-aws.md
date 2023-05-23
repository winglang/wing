# [optionals.w](../../../../examples/tests/valid/optionals.w) | compile | tf-aws

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
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class Super {
      constructor()  {
        const __parent_this = this;
        this.name = "Super";
      }
      name;
    }
    class Sub extends Super {
      constructor()  {
        const __parent_this = this;
        this.name = "Sub";
      }
    }
    class Sub1 extends Super {
      constructor()  {
        const __parent_this = this;
        this.name = "Sub";
      }
    }
    const x = 4;
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((x) != null) === true)'`)})((((x) != null) === true))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((!((x) != null)) === false)'`)})(((!((x) != null)) === false))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((x ?? 5) === 4)'`)})(((x ?? 5) === 4))};
    const y = (x ?? 5);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(y === 4)'`)})((y === 4))};
    const optionalSup = new Super();
    const s = (optionalSup ?? new Sub());
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s.name === "Super")'`)})((s.name === "Super"))};
    let name = {
    "first": "John",
    "last": "Doe",}
    ;
    if (name) {
      const n = name;
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(n.first === "John")'`)})((n.first === "John"))};
    }
    name = undefined;
    if (name) {
      const n = name;
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
    }
    else {
      {((cond) => {if (!cond) throw new Error(`assertion failed: 'true'`)})(true)};
    }
    const tryParseName =  (fullName) =>  {
      {
        const parts = (fullName.split(" "));
        if ((parts.length < 1)) {
          return undefined;
        }
        return {
        "first": (parts.at(0)),
        "last": (parts.at(1)),}
        ;
      }
    }
    ;
    if ((tryParseName("Good Name"))) {
      const parsedName = (tryParseName("Good Name"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(parsedName.first === "Good")'`)})((parsedName.first === "Good"))};
      if (parsedName.last) {
        const lastName = parsedName.last;
        {((cond) => {if (!cond) throw new Error(`assertion failed: '(lastName === "Name")'`)})((lastName === "Name"))};
      }
      else {
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
      }
    }
    if ((tryParseName("BadName"))) {
      const parsedName = (tryParseName("BadName"));
      {((cond) => {if (!cond) throw new Error(`assertion failed: '(parsedName.first === "BadName")'`)})((parsedName.first === "BadName"))};
      if (parsedName.last) {
        const lastName = parsedName.last;
        {((cond) => {if (!cond) throw new Error(`assertion failed: 'false'`)})(false)};
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


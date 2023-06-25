# [init.w](../../../../examples/tests/valid/init.w) | compile | tf-aws

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
const cloud = require('@winglang/sdk').cloud;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    let error = "";
    try {
      this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"s1",{ rate: undefined, cron: undefined });
    }
    catch ($error_e) {
      const e = $error_e.message;
      error = e;
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "rate or cron need to be filled.")'`)})((error === "rate or cron need to be filled."))};
    try {
      this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"s2",{ rate: $stdlib.std.Duration.fromSeconds(120), cron: "* * * * *" });
    }
    catch ($error_e) {
      const e = $error_e.message;
      error = e;
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "rate and cron cannot be configured simultaneously.")'`)})((error === "rate and cron cannot be configured simultaneously."))};
    try {
      this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"s3",{ rate: $stdlib.std.Duration.fromSeconds(1) });
    }
    catch ($error_e) {
      const e = $error_e.message;
      error = e;
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "rate can not be set to less than 1 minute.")'`)})((error === "rate can not be set to less than 1 minute."))};
    try {
      this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"s4",{ cron: "* * * * * *" });
    }
    catch ($error_e) {
      const e = $error_e.message;
      error = e;
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]")'`)})((error === "cron string must be UNIX cron format [minute] [hour] [day of month] [month] [day of week]"))};
    try {
      this.node.root.newAbstract("@winglang/sdk.cloud.Schedule",this,"s5",{ cron: "* * * * *" });
    }
    catch ($error_e) {
      const e = $error_e.message;
      error = e;
    }
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(error === "cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other")'`)})((error === "cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other"))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "init", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


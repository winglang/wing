# [json_static.w](../../../../examples/tests/valid/json_static.w) | compile | tf-aws

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
    const x = Object.freeze({"a":123,"b":{"c":456,"d":789}});
    const k = (Object.keys(x));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(k.length === 2)'`)})((k.length === 2))};
    const v = (Object.values(x));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((v.at(0)) === 123)'`)})(((v.at(0)) === 123))};
    const m = (JSON.parse(JSON.stringify(x)));
    ((obj, args) => { obj[args[0]] = args[1]; })(m, ["a",321]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((m)["a"] === 321)'`)})(((m)["a"] === 321))};
    let k2 = (Object.keys(m));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(k2.length === 2)'`)})((k2.length === 2))};
    ((args) => { delete (args[0])[args[1]]; })([m,"b"]);
    k2 = (Object.keys(m));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(k2.length === 1)'`)})((k2.length === 1))};
    const s = "{\"a\": 123, \"b\": {\"c\": 456, \"d\": 789}}";
    const j = (JSON.parse(s));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((Object.keys(j)).length === 2)'`)})(((Object.keys(j)).length === 2))};
    const invalid_json = "invalid";
    const try_parsed = (((args) => { try { return JSON.parse(args); } catch (err) { return undefined; } })(invalid_json) ?? Object.freeze({"key":"value"}));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((try_parsed)["key"] === "value")'`)})(((try_parsed)["key"] === "value"))};
    const jj = Object.freeze({"a":123,"b":{"c":456,"d":789}});
    const ss = ((args) => { return JSON.stringify(args[0], null, args[1]) })([jj]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(ss === "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}")'`)})((ss === "{\"a\":123,\"b\":{\"c\":456,\"d\":789}}"))};
    const ss2 = ((args) => { return JSON.stringify(args[0], null, args[1]) })([jj,2]);
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(ss2 === "{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}")'`)})((ss2 === "{\n  \"a\": 123,\n  \"b\": {\n    \"c\": 456,\n    \"d\": 789\n  }\n}"))};
    const json_of_many = Object.freeze({"a":123,"b":"hello","c":true});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((json_of_many)["b"]) === "hello")'`)})((((args) => { if (typeof args !== "string") {throw new Error("unable to parse " + typeof args + " " + args + " as a string")}; return JSON.parse(JSON.stringify(args)) })((json_of_many)["b"]) === "hello"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })((json_of_many)["a"]) === 123)'`)})((((args) => { if (typeof args !== "number") {throw new Error("unable to parse " + typeof args + " " + args + " as a number")}; return JSON.parse(JSON.stringify(args)) })((json_of_many)["a"]) === 123))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((args) => { if (typeof args !== "boolean") {throw new Error("unable to parse " + typeof args + " " + args + " as a boolean")}; return JSON.parse(JSON.stringify(args)) })((json_of_many)["c"])'`)})(((args) => { if (typeof args !== "boolean") {throw new Error("unable to parse " + typeof args + " " + args + " as a boolean")}; return JSON.parse(JSON.stringify(args)) })((json_of_many)["c"]))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "json_static", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

## tree.json
```json
{
  "version": "tree-0.1",
  "tree": {
    "id": "App",
    "path": "",
    "children": {
      "root": {
        "id": "root",
        "path": "root",
        "children": {
          "Default": {
            "id": "Default",
            "path": "root/Default",
            "children": {
              "aws": {
                "id": "aws",
                "path": "root/Default/aws",
                "constructInfo": {
                  "fqn": "@cdktf/provider-aws.provider.AwsProvider",
                  "version": "12.0.2"
                }
              },
              "cloud.TestRunner": {
                "id": "cloud.TestRunner",
                "path": "root/Default/cloud.TestRunner",
                "children": {
                  "TestFunctionArns": {
                    "id": "TestFunctionArns",
                    "path": "root/Default/cloud.TestRunner/TestFunctionArns",
                    "constructInfo": {
                      "fqn": "cdktf.TerraformOutput",
                      "version": "0.15.2"
                    }
                  }
                },
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.cloud.TestRunner",
                  "version": "0.0.0"
                },
                "display": {
                  "title": "TestRunner",
                  "description": "A suite of APIs for running tests and collecting results.",
                  "hidden": true
                }
              },
              "Default": {
                "id": "Default",
                "path": "root/Default/Default",
                "attributes": {
                  "wing:resource:stateful": false,
                  "wing:resource:connections": []
                },
                "constructInfo": {
                  "fqn": "@winglang/sdk.std.Resource",
                  "version": "0.0.0"
                }
              }
            },
            "constructInfo": {
              "fqn": "@winglang/sdk.core.CdktfApp",
              "version": "0.0.0"
            }
          },
          "backend": {
            "id": "backend",
            "path": "root/backend",
            "constructInfo": {
              "fqn": "cdktf.LocalBackend",
              "version": "0.15.2"
            }
          }
        },
        "constructInfo": {
          "fqn": "cdktf.TerraformStack",
          "version": "0.15.2"
        }
      }
    },
    "constructInfo": {
      "fqn": "cdktf.App",
      "version": "0.15.2"
    }
  }
}
```


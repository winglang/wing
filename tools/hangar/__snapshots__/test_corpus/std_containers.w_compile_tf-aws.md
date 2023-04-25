# [std_containers.w](../../../../examples/tests/valid/std_containers.w) | compile | tf-aws

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
    const s_array = Object.freeze(["one", "two"]);
    const mut_array = [...(s_array)];
    (mut_array.push("three"));
    const immut_array = Object.freeze([...(mut_array)]);
    const s = (s_array.at(1));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s === "two")'`)})((s === "two"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s_array.at(1)) === "two")'`)})(((s_array.at(1)) === "two"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s_array.length === 2)'`)})((s_array.length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(immut_array.length === 3)'`)})((immut_array.length === 3))};
    const s_array2 = Object.freeze(["if", "you", "build", "it"]);
    const s_array3 = Object.freeze(["he", "will", "come", "for", "you"]);
    const merged_array = (s_array2.concat(s_array3));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(merged_array.length === 9)'`)})((merged_array.length === 9))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((merged_array.at(5)) === "will")'`)})(((merged_array.at(5)) === "will"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: 'merged_array.includes("build")'`)})(merged_array.includes("build"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(!merged_array.includes("bring"))'`)})((!merged_array.includes("bring")))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(merged_array.indexOf("you") === 1)'`)})((merged_array.indexOf("you") === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((merged_array.join(" ")) === "if you build it he will come for you")'`)})(((merged_array.join(" ")) === "if you build it he will come for you"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((merged_array.join()) === "if,you,build,it,he,will,come,for,you")'`)})(((merged_array.join()) === "if,you,build,it,he,will,come,for,you"))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(merged_array.lastIndexOf("you") === 8)'`)})((merged_array.lastIndexOf("you") === 8))};
    const mut_array2 = ["how", "does", "that", "look"];
    const merged_mut_array = (mut_array.concat(mut_array2));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(merged_mut_array.length === 7)'`)})((merged_mut_array.length === 7))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((merged_mut_array.at(5)) === "that")'`)})(((merged_mut_array.at(5)) === "that"))};
    const s_set = Object.freeze(new Set(["one", "two"]));
    const mut_set = new Set(s_set);
    (mut_set.add("three"));
    const immut_set = Object.freeze(new Set(mut_set));
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s_set.has("one"))'`)})((s_set.has("one")))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(s_set.size === 2)'`)})((s_set.size === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(immut_set.size === 3)'`)})((immut_set.size === 3))};
    const s_map = Object.freeze({"one":1,"two":2});
    const nested_map = Object.freeze({"a":Object.freeze({"b":Object.freeze({"c":"hello"})})});
    const mut_map = {...(s_map)};
    ((obj, args) => { obj[args[0]] = args[1]; })(mut_map, ["five",5]);
    const immut_map = Object.freeze({...(mut_map)});
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((s_map)["one"] === 1)'`)})(((s_map)["one"] === 1))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(s_map).length === 2)'`)})((Object.keys(s_map).length === 2))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '(Object.keys(immut_map).length === 3)'`)})((Object.keys(immut_map).length === 3))};
    {((cond) => {if (!cond) throw new Error(`assertion failed: '((((nested_map)["a"])["b"])["c"] === "hello")'`)})(((((nested_map)["a"])["b"])["c"] === "hello"))};
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "std_containers", plugins: $plugins, isTestEnvironment: $wing_is_test });
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


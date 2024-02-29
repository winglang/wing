import * as vm from "vm";
import { test, assert } from "vitest";
import * as std from "../../src/std";
import * as util from "../../src/util";

const skip = [
  "std.Direction",
  "std.T1",
  "std.JsonSchema",
  "std.TEST_FQN",
  "std.Display",
  "std.Test",
  "std.TestRunner",
  "std.TestRunnerInflightMethods",
  "std.TraceType",
  "std.TEST_RUNNER_FQN",
  "std.Resource",
  "std.AutoIdResource",
  "std.APP_SYMBOL",
  "std.CONNECTIONS_FILE_PATH",
  "std.SDK_SOURCE_MODULE",
  "std.Node",
  "util.RequestCache", // an enum
  "util.RequestRedirect", // an enum
  "util.HttpMethod", // an enum
  "util.Stdio", // an enum
];

// checks that the class `className` in module `module` has a `_toInflightType()` method and that it
// returns the same class when the returned code is evaluated.
function makeTest(module: any, moduleName: string, className: string) {
  const p = `${moduleName}.${className}`;
  if (skip.includes(p)) {
    return;
  }

  test(`${p}._toInflightType()`, () => {
    assert.isFunction(
      module[className]._toInflightType,
      `${p} is missing _toInflightType()`,
    );

    const code = module[className]._toInflightType();
    let v = vm.runInNewContext(code, {
      require: (name: string) => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        return require(name);
      },
    });

    assert.equal(
      v,
      module[className],
      "toInflightType() should return the same class",
    );
  });
}

Object.keys(std).forEach((className) => makeTest(std, "std", className));
Object.keys(util).forEach((className) => makeTest(util, "util", className));

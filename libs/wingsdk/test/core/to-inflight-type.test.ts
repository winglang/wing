import * as vm from "vm";
import { test, assert } from "vitest";
import * as std from "../../src/std";
import * as util from "../../src/util";

const skip = [
  "std.Direction",
  "std.T1",
  "std.TEST_FQN",
  "std.Display",
  "std.Test",
  "std.Resource",
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
      `${p} is missing _toInflightType()`
    );

    const code = module[className]._toInflightType().text;
    let v = vm.runInNewContext(code, {
      require: (name: string) => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        return require(name);
      },
    });

    assert.equal(
      v,
      module[className],
      "toInflightType() should return the same class"
    );
  });
}

Object.keys(std).forEach((className) => makeTest(std, "std", className));
Object.keys(util).forEach((className) => makeTest(util, "util", className));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vm = require("vm");
var vitest_1 = require("vitest");
var std = require("../../src/std");
var util = require("../../src/util");
var skip = [
    "std.Direction",
    "std.T1",
    "std.JsonSchema",
    "std.TEST_FQN",
    "std.Display",
    "std.Test",
    "std.TestRunner",
    "std.TestRunnerInflightMethods",
    "std.TraceType",
    "std.LogLevel",
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
function makeTest(module, moduleName, className) {
    var p = "".concat(moduleName, ".").concat(className);
    if (skip.includes(p)) {
        return;
    }
    (0, vitest_1.test)("".concat(p, "._toInflightType()"), function () {
        vitest_1.assert.isFunction(module[className]._toInflightType, "".concat(p, " is missing _toInflightType()"));
        var code = module[className]._toInflightType();
        var v = vm.runInNewContext(code, {
            require: function (name) {
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                return require(name);
            },
        });
        vitest_1.assert.equal(v, module[className], "toInflightType() should return the same class");
    });
}
Object.keys(std).forEach(function (className) { return makeTest(std, "std", className); });
Object.keys(util).forEach(function (className) { return makeTest(util, "util", className); });

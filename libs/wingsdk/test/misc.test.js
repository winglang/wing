"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var misc_1 = require("../src/shared/misc");
(0, vitest_1.test)("isPath", function () {
    (0, vitest_1.expect)((0, misc_1.isPath)("foo")).toBeFalsy();
    (0, vitest_1.expect)((0, misc_1.isPath)("./hello")).toBeTruthy();
    (0, vitest_1.expect)((0, misc_1.isPath)("../hello")).toBeTruthy();
    (0, vitest_1.expect)((0, misc_1.isPath)(".././../hello")).toBeTruthy();
    (0, vitest_1.expect)((0, misc_1.isPath)("/hello/world")).toBeTruthy();
});

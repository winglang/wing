"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var util_1 = require("../src/util");
(0, vitest_1.describe)("env", function () {
    (0, vitest_1.test)("env", function () {
        (0, vitest_1.expect)(util_1.Util.env("NODE_ENV")).toBe("test");
    });
});
(0, vitest_1.describe)("ulid", function () {
    (0, vitest_1.test)("ulid", function () {
        (0, vitest_1.expect)(util_1.Util.ulid()).toMatch(/^[0-9A-Z]{26}$/);
    });
    (0, vitest_1.test)("seed", function () {
        (0, vitest_1.expect)(util_1.Util.ulid({ seed: 1200 })).toMatch(/^000000015G[0-9A-Z]{16}$/);
    });
});

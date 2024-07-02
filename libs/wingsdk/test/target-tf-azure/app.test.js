"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var tfazure = require("../../src/target-tf-azure");
var util_1 = require("../util");
(0, vitest_1.test)("throw error when no location provided", function () {
    delete process.env.AZURE_LOCATION;
    // GIVEN
    var props = {
        outdir: (0, util_1.mkdtemp)(),
        location: undefined,
        entrypointDir: __dirname,
    };
    // THEN
    (0, vitest_1.expect)(function () { return new tfazure.App(props); }).toThrow(/Location must be specified in the AZURE_LOCATION environment variable/);
});
(0, vitest_1.test)("can read location from environment variable", function () {
    // GIVEN
    var props = {
        outdir: (0, util_1.mkdtemp)(),
        location: undefined,
        entrypointDir: __dirname,
    };
    var expectedLocation = "East US";
    process.env.AZURE_LOCATION = expectedLocation;
    var app;
    // THEN
    (0, vitest_1.expect)(function () { return (app = new tfazure.App(props)); }).not.toThrow();
    (0, vitest_1.expect)(app.location).toEqual(expectedLocation);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var tfgcp = require("../../src/target-tf-gcp");
var util_1 = require("../util");
(0, vitest_1.beforeAll)(function () {
    delete process.env.GOOGLE_PROJECT_ID;
    delete process.env.GOOGLE_REGION;
});
(0, vitest_1.test)("throw error when no projectId provided", function () {
    // GIVEN
    var props = {
        outdir: (0, util_1.mkdtemp)(),
        projectId: undefined,
        storageLocation: "US",
        region: "us-central1",
        entrypointDir: __dirname,
    };
    // THEN
    (0, vitest_1.expect)(function () { return new tfgcp.App(props); }).toThrow(/A Google Cloud project ID must be specified/);
});
(0, vitest_1.test)("can read projectId from environment variable", function () {
    // GIVEN
    var props = {
        outdir: (0, util_1.mkdtemp)(),
        projectId: undefined,
        storageLocation: "US",
        region: "us-central1",
        entrypointDir: __dirname,
    };
    var projectId = "my-project";
    process.env.GOOGLE_PROJECT_ID = projectId;
    var app;
    // THEN
    (0, vitest_1.expect)(function () { return (app = new tfgcp.App(props)); }).not.toThrow();
    (0, vitest_1.expect)(app.projectId).toEqual(projectId);
});
(0, vitest_1.test)("throw error when no region provided", function () {
    // GIVEN
    var props = {
        outdir: (0, util_1.mkdtemp)(),
        projectId: "projectId",
        storageLocation: undefined,
        region: undefined,
        entrypointDir: __dirname,
    };
    // THEN
    (0, vitest_1.expect)(function () { return new tfgcp.App(props); }).toThrow(/A Google Cloud region must be specified/);
});
(0, vitest_1.test)("can read region from environment variable", function () {
    // GIVEN
    var props = {
        outdir: (0, util_1.mkdtemp)(),
        projectId: "projectId",
        storageLocation: undefined,
        region: undefined,
        entrypointDir: __dirname,
    };
    var region = "us-central1";
    process.env.GOOGLE_REGION = region;
    var app;
    // THEN
    (0, vitest_1.expect)(function () { return (app = new tfgcp.App(props)); }).not.toThrow();
    (0, vitest_1.expect)(app.region).toEqual(region);
});

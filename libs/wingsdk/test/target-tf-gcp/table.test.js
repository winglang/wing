"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var ex_1 = require("../../src/ex");
var tfgcp = require("../../src/target-tf-gcp");
var util_1 = require("../util");
var GCP_APP_OPTS = {
    projectId: "my-project",
    storageLocation: "US",
    entrypointDir: __dirname,
    region: "us-central1",
};
(0, vitest_1.test)("create a table", function () {
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    new ex_1.Table(app, "my_table", {
        primaryKey: "id",
        columns: { name: ex_1.ColumnType.STRING },
        name: "simple-table",
    });
    var output = app.synth();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_bigtable_instance",
        "google_bigtable_table",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});

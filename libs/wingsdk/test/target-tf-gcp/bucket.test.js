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
var cloud_1 = require("../../src/cloud");
var tfgcp = require("../../src/target-tf-gcp");
var util_1 = require("../util");
var GCP_APP_OPTS = {
    projectId: "my-project",
    region: "us-central1",
    entrypointDir: __dirname,
};
(0, vitest_1.test)("create a bucket", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    new cloud_1.Bucket(app, "my_bucket");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_project_service",
        "google_storage_bucket",
        "random_id",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket is public", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    new cloud_1.Bucket(app, "my_bucket", { public: true });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_project_service",
        "google_storage_bucket",
        "google_storage_bucket_iam_member",
        "random_id",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("two buckets", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    new cloud_1.Bucket(app, "my_bucket1");
    new cloud_1.Bucket(app, "my_bucket2");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_project_service",
        "google_storage_bucket",
        "random_id",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "google_project_service")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "google_storage_bucket")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "random_id")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with two preflight objects", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var bucket = new cloud_1.Bucket(app, "my_bucket");
    bucket.addObject("file1.txt", "hello world");
    bucket.addObject("file2.txt", "boom bam");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_project_service",
        "google_storage_bucket",
        "google_storage_bucket_object",
        "random_id",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "google_storage_bucket_object")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with two preflight files", function () {
    // GIVEN
    var app = new tfgcp.App(__assign({ outdir: (0, util_1.mkdtemp)() }, GCP_APP_OPTS));
    var bucket = new cloud_1.Bucket(app, "my_bucket");
    bucket.addFile("file1.txt", "../test-files/test1.txt");
    bucket.addFile("file2.txt", "../test-files/test2.txt");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "google_project_service",
        "google_storage_bucket",
        "google_storage_bucket_object",
        "random_id",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "google_storage_bucket_object")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});

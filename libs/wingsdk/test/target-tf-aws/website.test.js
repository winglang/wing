"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var vitest_1 = require("vitest");
var cloud = require("../../src/cloud");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
(0, vitest_1.test)("default website behavior", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud.Website(app, "Website", {
        path: path_1.default.resolve(__dirname, "../test-files/website"),
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudfront_distribution",
        "aws_cloudfront_origin_access_control",
        "aws_s3_bucket",
        "aws_s3_bucket_policy",
        "aws_s3_bucket_website_configuration",
        "aws_s3_object",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_object")).toEqual(3);
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", {
        key: "/inner-folder/a.html",
    })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "/b.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "/index.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("website with invalid path should throw error", function () {
    // GIVEN
    (0, vitest_1.expect)(function () {
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        new cloud.Website(app, "Website", {
            path: "/absolute/non-existent",
        });
        app.synth();
    }).toThrowError("ENOENT: no such file or directory, scandir '/absolute/non-existent'");
    // THEN
});
(0, vitest_1.test)("website with addFile", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var website = new cloud.Website(app, "Website", {
        path: path_1.default.resolve(__dirname, "../test-files/website"),
    });
    website.addFile("addition.html", "<html>Hello world!</html>", "text/html");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudfront_distribution",
        "aws_cloudfront_origin_access_control",
        "aws_s3_bucket",
        "aws_s3_bucket_policy",
        "aws_s3_bucket_website_configuration",
        "aws_s3_object",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_object")).toEqual(4);
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", {
        key: "/inner-folder/a.html",
    })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "/b.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "/index.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "addition.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("website with addJson", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var website = new cloud.Website(app, "Website", {
        path: path_1.default.resolve(__dirname, "../test-files/website"),
    });
    website.addJson("config.json", Object({ version: "8.31.0" }));
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudfront_distribution",
        "aws_cloudfront_origin_access_control",
        "aws_s3_bucket",
        "aws_s3_bucket_policy",
        "aws_s3_bucket_website_configuration",
        "aws_s3_object",
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_object")).toEqual(4);
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", {
        key: "/inner-folder/a.html",
    })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "/b.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "/index.html" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_s3_object", { key: "config.json" })).not.toBeUndefined();
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("website with invalid path should throw error", function () {
    // GIVEN
    (0, vitest_1.expect)(function () {
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        var website = new cloud.Website(app, "Website", {
            path: path_1.default.resolve(__dirname, "../test-files/website"),
        });
        website.addJson("not ending with dot json.txt", Object({ version: "8.31.0" }));
        app.synth();
    }).toThrowError('key must have a .json suffix. (current: "txt")');
});
(0, vitest_1.test)("custom error page", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud.Website(app, "Website", {
        path: path_1.default.resolve(__dirname, "../test-files/website"),
        errorDocument: "b.html",
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.getTfResource)(output, "aws_cloudfront_distribution", 0)
        .custom_error_response).toEqual([
        {
            error_code: 404,
            response_code: 200,
            response_page_path: "/b.html",
        },
        {
            error_code: 403,
            response_code: 200,
            response_page_path: "/b.html",
        },
    ]);
});

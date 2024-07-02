"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.containCertificate = void 0;
var path_1 = require("path");
var vitest_1 = require("vitest");
var cloud = require("../../src/cloud");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
var containCertificate = function (config, certificate) {
    var website = config.resource.aws_cloudfront_distribution;
    for (var _i = 0, _a = Object.keys(website); _i < _a.length; _i++) {
        var distribution = _a[_i];
        var viewerCertificate = website[distribution].viewer_certificate;
        if (!viewerCertificate ||
            (viewerCertificate.acm_certificate_arn !== certificate &&
                viewerCertificate.iamCertificate !== certificate)) {
            continue;
        }
        return true;
    }
    return false;
};
exports.containCertificate = containCertificate;
(0, vitest_1.describe)("cloud.Domain for tf-aws", function () {
    (0, vitest_1.beforeEach)(function () {
        delete process.env.WING_VALUES;
        delete process.env.WING_VALUES_FILE;
    });
    (0, vitest_1.test)("website with a domain when passing values on the command line", function () {
        // GIVEN
        process.env.WING_VALUES =
            "root/Default/Domain/hostedZoneId=Z0111111111111111111F,root/Default/Domain/acmCertificateArn=arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        var domain = new cloud.Domain(app, "Domain", {
            domainName: "www.example.com",
        });
        new cloud.Website(app, "Website", {
            path: path_1.default.resolve(__dirname, "../test-files/website"),
            domain: domain,
        });
        var output = app.synth();
        // THEN
        (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
            "aws_cloudfront_distribution",
            "aws_cloudfront_origin_access_control",
            "aws_route53_record",
            "aws_s3_bucket",
            "aws_s3_bucket_policy",
            "aws_s3_bucket_website_configuration",
            "aws_s3_object",
        ]);
        var hasCertificate = (0, exports.containCertificate)(JSON.parse(output), "arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
        (0, vitest_1.expect)(hasCertificate).toEqual(true);
        (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_route53_record", {
            zone_id: "Z0111111111111111111F",
        })).not.toBeUndefined();
        (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
        (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
    });
    (0, vitest_1.test)("website with a domain when passing values from file", function () {
        // GIVEN
        process.env.WING_VALUES_FILE = __dirname + "/domain.values.yaml";
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        var domain = new cloud.Domain(app, "Domain", {
            domainName: "www.example.com",
        });
        new cloud.Website(app, "Website", {
            path: path_1.default.resolve(__dirname, "../test-files/website"),
            domain: domain,
        });
        var output = app.synth();
        // THEN
        (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
            "aws_cloudfront_distribution",
            "aws_cloudfront_origin_access_control",
            "aws_route53_record",
            "aws_s3_bucket",
            "aws_s3_bucket_policy",
            "aws_s3_bucket_website_configuration",
            "aws_s3_object",
        ]);
        var hasCertificate = (0, exports.containCertificate)(JSON.parse(output), "arn:aws:acm:us-east-1:111111111111:certificate/aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee");
        (0, vitest_1.expect)(hasCertificate).toEqual(true);
        (0, vitest_1.expect)((0, util_1.tfResourcesWithProperty)(output, "aws_route53_record", {
            zone_id: "Z0111111111111111111F",
        })).not.toBeUndefined();
        (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
        (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
    });
    (0, vitest_1.test)("default domain behavior without hostedZoneId and certificate information", function () {
        (0, vitest_1.expect)(function () {
            // GIVEN
            var app = new tfaws.App({
                outdir: (0, util_1.mkdtemp)(),
                entrypointDir: __dirname,
            });
            new cloud.Domain(app, "Domain", {
                domainName: "www.example.com",
            });
            app.synth();
        }).toThrowError(new RegExp("Parameter validation errors:\\s*" +
            "- must have required property 'root' \\s*".replace(/\s+/g, "\\s*") // Normalize whitespace for comparison
        ));
    });
});

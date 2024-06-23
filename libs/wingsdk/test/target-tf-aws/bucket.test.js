"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var cdktf = require("cdktf");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
(0, vitest_1.test)("create a bucket", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Bucket(app, "my_bucket");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_s3_bucket", // main bucket
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket has force_destroy if App is a test environment", function () {
    // GIVEN
    var app = new tfaws.App({
        outdir: (0, util_1.mkdtemp)(),
        isTestEnvironment: true,
        entrypointDir: __dirname,
    });
    new cloud_1.Bucket(app, "my_bucket");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(JSON.parse(output).resource.aws_s3_bucket.my_bucket.force_destroy).toBe(true);
});
(0, vitest_1.test)("bucket is public", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Bucket(app, "my_bucket", { public: true });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with two preflight objects", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.addObject("file1.txt", "hello world");
    bucket.addObject("file2.txt", "boom bam");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
        "aws_s3_object", // file1.txt
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_object")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with two preflight files", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.addFile("file1.txt", "../test-files/test1.txt");
    bucket.addFile("file2.txt", "../test-files/test2.txt");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
        "aws_s3_object", // file1.txt
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_object")).toEqual(2);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket prefix valid", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "the-uncanny.bucket");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_s3_bucket", {
        bucketPrefix: "the-uncanny-bucket-".concat(bucket.node.addr.substring(0, 8), "-"),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket prefix must be lowercase", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "The-Uncanny.Bucket");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_s3_bucket", {
        bucketPrefix: "the-uncanny-bucket-".concat(bucket.node.addr.substring(0, 8), "-"),
    })).toEqual(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket prefix must begin with an alphanumeric character", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    // THEN
    (0, vitest_1.expect)(function () { return new cloud_1.Bucket(app, "(%?#$The-Uncanny-Bucket.*!@¨)"); }).toThrow(/AWS S3 bucket names must begin with a letter or number/);
});
(0, vitest_1.test)("bucket prefix can not begining with 'xn--'", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    // THEN
    (0, vitest_1.expect)(function () { return new cloud_1.Bucket(app, "xn--The-Uncanny-Bucket"); }).toThrow(/AWS S3 bucket names cannot begin with 'xn--'/);
});
(0, vitest_1.test)("bucket with onCreate method", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.onCreate((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }));
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for subscriber
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_function", // inflight subscriber
        "aws_lambda_permission", // permission of the topic to invoke lambda
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_notification",
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
        "aws_s3_object",
        "aws_sns_topic", // topic to subscribe to bucket events
        "aws_sns_topic_policy", //permission of the bucket to publish events
        "aws_sns_topic_subscription", // subscription to events
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_sns_topic")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_bucket_notification")).toEqual(1);
    var bucketNotification = (0, util_1.getTfResource)(output, "aws_s3_bucket_notification");
    (0, vitest_1.expect)(bucketNotification.depends_on.length).toEqual(1);
    (0, vitest_1.expect)(bucketNotification.topic.length).toEqual(1);
    (0, vitest_1.expect)(bucketNotification.topic.every(function (item) { return !!item.id; })).toBe(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with onDelete method", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.onDelete((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }));
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for subscriber
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_function", // inflight subscriber
        "aws_lambda_permission", // permission of the topic to invoke lambda
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_notification",
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
        "aws_s3_object",
        "aws_sns_topic", // topic to subscribe to bucket events
        "aws_sns_topic_policy", //permission of the bucket to publish events
        "aws_sns_topic_subscription", // subscription to events
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_sns_topic")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_bucket_notification")).toEqual(1);
    var bucketNotification = (0, util_1.getTfResource)(output, "aws_s3_bucket_notification");
    (0, vitest_1.expect)(bucketNotification.depends_on.length).toEqual(1);
    (0, vitest_1.expect)(bucketNotification.topic.length).toEqual(1);
    (0, vitest_1.expect)(bucketNotification.topic.every(function (item) { return !!item.id; })).toBe(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with onUpdate method", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.onUpdate((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }));
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for subscriber
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_function", // inflight subscriber
        "aws_lambda_permission", // permission of the topic to invoke lambda
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_notification",
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
        "aws_s3_object",
        "aws_sns_topic", // topic to subscribe to bucket events
        "aws_sns_topic_policy", //permission of the bucket to publish events
        "aws_sns_topic_subscription", // subscription to events
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_sns_topic")).toEqual(1);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_bucket_notification")).toEqual(1);
    var bucketNotification = (0, util_1.getTfResource)(output, "aws_s3_bucket_notification");
    (0, vitest_1.expect)(bucketNotification.depends_on.length).toEqual(1);
    (0, vitest_1.expect)(bucketNotification.topic.length).toEqual(1);
    (0, vitest_1.expect)(bucketNotification.topic.every(function (item) { return !!item.id; })).toBe(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("bucket with onEvent method", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var bucket = new cloud_1.Bucket(app, "my_bucket", { public: true });
    bucket.onEvent((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }));
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for subscriber
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_function", // inflight subscriber
        "aws_lambda_permission", // permission of the topic to invoke lambda
        "aws_s3_bucket", // main bucket
        "aws_s3_bucket_notification",
        "aws_s3_bucket_policy", // resource policy to grant read access to anyone
        "aws_s3_bucket_public_access_block", // allow public access to an s3 bucket
        "aws_s3_object",
        "aws_sns_topic", // topic to subscribe to bucket events
        "aws_sns_topic_policy", //permission of the bucket to publish events
        "aws_sns_topic_subscription", // subscription to events
    ]);
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_sns_topic")).toEqual(3); // 3 topics will be created- one per event
    (0, vitest_1.expect)((0, util_1.tfResourcesOfCount)(output, "aws_s3_bucket_notification")).toEqual(1);
    var bucketNotification = (0, util_1.getTfResource)(output, "aws_s3_bucket_notification");
    (0, vitest_1.expect)(bucketNotification.depends_on.length).toEqual(3);
    (0, vitest_1.expect)(bucketNotification.topic.length).toEqual(3);
    (0, vitest_1.expect)(bucketNotification.topic.every(function (item) { return !!item.id; })).toBe(true);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});

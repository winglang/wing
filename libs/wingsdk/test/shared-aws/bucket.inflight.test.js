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
var stream_1 = require("stream");
var client_s3_1 = require("@aws-sdk/client-s3");
var s3RequestPresigner = require("@aws-sdk/s3-request-presigner/dist-cjs/getSignedUrl");
var util_stream_1 = require("@smithy/util-stream");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
var vitest_1 = require("vitest");
var bucket_inflight_1 = require("../../src/shared-aws/bucket.inflight");
var std_1 = require("../../src/std");
var s3Mock = (0, aws_sdk_client_mock_1.mockClient)(client_s3_1.S3Client);
(0, vitest_1.beforeEach)(function () {
    s3Mock.reset();
});
// https://github.com/m-radzikowski/aws-sdk-client-mock/issues/131
function createMockStream(text) {
    var stream = new stream_1.Readable();
    stream._read = function () { };
    stream.push(text);
    stream.push(null); // indicate end of file
    var sdkStream = (0, util_stream_1.sdkStreamMixin)(stream);
    return sdkStream;
}
(0, vitest_1.test)("put an object into the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock
                    .on(client_s3_1.PutObjectCommand, { Bucket: BUCKET_NAME, Key: KEY, Body: VALUE })
                    .resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("put an object into the bucket specifying the content-type", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, CONTENT_TYPE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                CONTENT_TYPE = "image/png";
                s3Mock
                    .on(client_s3_1.PutObjectCommand, {
                    Bucket: BUCKET_NAME,
                    Key: KEY,
                    Body: VALUE,
                    ContentType: CONTENT_TYPE,
                })
                    .resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.put(KEY, VALUE, { contentType: CONTENT_TYPE })];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("putJson an object into the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = { cool: "beans" };
                s3Mock
                    .on(client_s3_1.PutObjectCommand, {
                    Bucket: BUCKET_NAME,
                    Key: KEY,
                    Body: JSON.stringify(VALUE),
                })
                    .resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.putJson(KEY, VALUE)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get an object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock.on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    Body: createMockStream(VALUE),
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.get(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new Error("Object does not exist"));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.get(KEY); }).rejects.toThrowError(/Object does not exist/)];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("getJson an object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = { msg: "Hello, World!" };
                s3Mock.on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    Body: createMockStream(JSON.stringify(VALUE)),
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.getJson(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("list bucket objects", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY1, KEY2, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY1 = "KEY1";
                KEY2 = "KEY2";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                s3Mock
                    .on(client_s3_1.ListObjectsV2Command, { Bucket: BUCKET_NAME })
                    .resolves({ Contents: [{ Key: KEY1 }, { Key: KEY2 }] });
                return [4 /*yield*/, client.list()];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual([KEY1, KEY2]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.delete(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete object from the bucket with mustExist option", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .resolves({});
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.delete(KEY, { mustExist: true })];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete non-existent object from the bucket with mustExist option", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NotFound({ message: "Object not found", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () {
                        return client.delete(KEY, { mustExist: true });
                    }).rejects.toThrowError("Object does not exist (key=KEY).")];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a non public bucket when reaching to a key public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var error, BUCKET_NAME, KEY, client, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock.on(client_s3_1.GetPublicAccessBlockCommand, { Bucket: BUCKET_NAME }).resolves({
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: true,
                        BlockPublicPolicy: true,
                        RestrictPublicBuckets: true,
                        IgnorePublicAcls: true,
                    },
                });
                s3Mock.on(client_s3_1.HeadObjectCommand).rejects({ name: "NotFound" });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.publicUrl(KEY)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                error = err_1;
                return [3 /*break*/, 4];
            case 4:
                // THEN
                (0, vitest_1.expect)(error === null || error === void 0 ? void 0 : error.message).toBe("Cannot provide public url for a non-public bucket");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket when reaching to a non-existent key, public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var error, BUCKET_NAME, KEY, client, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock.on(client_s3_1.GetPublicAccessBlockCommand, { Bucket: BUCKET_NAME }).resolves({
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: false,
                        BlockPublicPolicy: false,
                        RestrictPublicBuckets: false,
                        IgnorePublicAcls: false,
                    },
                });
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NotFound({ message: "Object not found", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.publicUrl(KEY)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                error = err_2;
                return [3 /*break*/, 4];
            case 4:
                // THEN
                (0, vitest_1.expect)(error === null || error === void 0 ? void 0 : error.message).toBe("Cannot provide public url for a non-existent key (key=KEY)");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket, when giving one of its keys, we should get its public url", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, REGION, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                REGION = "us-east-2";
                s3Mock.on(client_s3_1.GetPublicAccessBlockCommand, { Bucket: BUCKET_NAME }).resolves({
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: false,
                        BlockPublicPolicy: false,
                        RestrictPublicBuckets: false,
                        IgnorePublicAcls: false,
                    },
                });
                s3Mock
                    .on(client_s3_1.GetBucketLocationCommand, { Bucket: BUCKET_NAME })
                    .resolves({ LocationConstraint: REGION });
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.publicUrl(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual("https://".concat(BUCKET_NAME, ".s3.").concat(REGION, ".amazonaws.com/").concat(KEY));
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check that an object exists in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, objectExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.exists(KEY)];
            case 1:
                objectExists = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectExists).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check that an object doesn't exist in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, objectExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NotFound({ message: "Object not found", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.exists(KEY)];
            case 1:
                objectExists = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectExists).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, objectTryGet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .resolves({ Body: createMockStream(VALUE) });
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.tryGet(KEY)];
            case 1:
                objectTryGet = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryGet).toEqual(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, objectTryGet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NoSuchKey({ message: "NoSuchKey error", $metadata: {} }));
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects({ name: "NotFound" });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.tryGet(KEY)];
            case 1:
                objectTryGet = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryGet).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet object from the bucket throws an unknown error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new Error("unknown error"));
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.tryGet(KEY); }).rejects.toThrowError(/unknown error/)];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, objectTryGetJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = { msg: "Hello, World!" };
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .resolves({ Body: createMockStream(JSON.stringify(VALUE)) });
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.tryGetJson(KEY)];
            case 1:
                objectTryGetJson = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryGetJson).toEqual(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client, objectTryGetJson;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = { msg: "Hello, World!" };
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NoSuchKey({ message: "NoSuchKey error", $metadata: {} }));
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects({ name: "NotFound" });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.tryGetJson(KEY)];
            case 1:
                objectTryGetJson = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryGetJson).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson object from the bucket throws an unknown error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = { msg: "Hello, World!" };
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new Error("unknown error"));
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.tryGet(KEY); }).rejects.toThrowError(/unknown error/)];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing non-Json object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                s3Mock
                    .on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .resolves({ Body: createMockStream(VALUE) });
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                // it seems to throw a different error per OS/ node version
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.tryGetJson(KEY); }).rejects.toThrowError()];
            case 1:
                // THEN
                // it seems to throw a different error per OS/ node version
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryDelete an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, objectTryDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .resolves({});
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.tryDelete(KEY)];
            case 1:
                objectTryDelete = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryDelete).toEqual(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryDelete a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, objectTryDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NotFound({ message: "Object not found", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.tryDelete(KEY)];
            case 1:
                objectTryDelete = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryDelete).toEqual(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a bucket when reaching to a non-existent key, signed url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var error, BUCKET_NAME, KEY, client, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NotFound({ message: "Object not found", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, client.signedUrl(KEY)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                error = err_3;
                return [3 /*break*/, 4];
            case 4:
                // THEN
                (0, vitest_1.expect)(error === null || error === void 0 ? void 0 : error.message).toBe("Cannot provide signed url for a non-existent key (key=".concat(KEY, ")"));
                return [2 /*return*/];
        }
    });
}); });
// Skipped due to issue with mocking getSignedUrl:
// https://github.com/m-radzikowski/aws-sdk-client-mock/issues/62
vitest_1.test.skip("Given a bucket, when giving one of its keys, we should get its signed url", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, signedUrlFn, client, signedUrl;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "sampletext.Pdf";
                VALUE = "VALUE";
                s3Mock.on(client_s3_1.GetObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    Body: createMockStream(VALUE),
                });
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentType: "application/pdf",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                signedUrlFn = vitest_1.vi
                    .spyOn(s3RequestPresigner, "getSignedUrl")
                    .mockResolvedValue(VALUE);
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.signedUrl(KEY)];
            case 1:
                signedUrl = _a.sent();
                // THEN
                (0, vitest_1.expect)(signedUrlFn).toBeCalledTimes(1);
                (0, vitest_1.expect)(signedUrl).toBe(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get metadata of an object", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 3191,
                    ContentType: "image/jpeg",
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.metadata(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual({
                    size: 3191,
                    lastModified: std_1.Datetime.fromIso("2016-12-15T01:19:41Z"),
                    contentType: "image/jpeg",
                });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("metadata may not contains content-type if it is unknown", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock.on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY }).resolves({
                    AcceptRanges: "bytes",
                    ContentLength: 1234,
                    ETag: "6805f2cfc46c0f04559748bb039d69ae",
                    LastModified: new Date("Thu, 15 Dec 2016 01:19:41 GMT"),
                    Metadata: {},
                    VersionId: "null",
                });
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.metadata(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual({
                    size: 1234,
                    lastModified: std_1.Datetime.fromIso("2016-12-15T01:19:41Z"),
                });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("metadata fail on non-existent object", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                KEY = "KEY";
                s3Mock
                    .on(client_s3_1.HeadObjectCommand, { Bucket: BUCKET_NAME, Key: KEY })
                    .rejects(new client_s3_1.NotFound({ message: "NotFound error", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.metadata(KEY); }).rejects.toThrowError("Object does not exist (key=KEY).")];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy objects within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, DST_KEY, client, response1, response2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                s3Mock
                    .on(client_s3_1.CopyObjectCommand, {
                    Bucket: BUCKET_NAME,
                    CopySource: "".concat(BUCKET_NAME, "/").concat(SRC_KEY),
                    Key: DST_KEY,
                })
                    .resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.copy(SRC_KEY, SRC_KEY)];
            case 1:
                response1 = _a.sent();
                return [4 /*yield*/, client.copy(SRC_KEY, DST_KEY)];
            case 2:
                response2 = _a.sent();
                // THEN
                (0, vitest_1.expect)(response1).toEqual(undefined);
                (0, vitest_1.expect)(response2).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy a non-existent object within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, DST_KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                s3Mock
                    .on(client_s3_1.CopyObjectCommand, {
                    Bucket: BUCKET_NAME,
                    CopySource: "".concat(BUCKET_NAME, "/").concat(SRC_KEY),
                    Key: DST_KEY,
                })
                    .rejects(new client_s3_1.NotFound({ message: "NotFound error", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.copy(SRC_KEY, DST_KEY); }).rejects.toThrowError("Source object does not exist (srcKey=".concat(SRC_KEY, ")."))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename valid object in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, DST_KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                s3Mock
                    .resolves({})
                    .on(client_s3_1.CopyObjectCommand, {
                    Bucket: BUCKET_NAME,
                    CopySource: "".concat(BUCKET_NAME, "/").concat(SRC_KEY),
                    Key: DST_KEY,
                })
                    .resolves({})
                    .on(client_s3_1.DeleteObjectCommand, { Bucket: BUCKET_NAME, Key: SRC_KEY })
                    .resolves({});
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                return [4 /*yield*/, client.rename(SRC_KEY, DST_KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("renaming an object to its current name should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.rename(SRC_KEY, SRC_KEY); }).rejects.toThrowError("Renaming an object to its current name is not a valid operation (srcKey=".concat(SRC_KEY, ", dstKey=").concat(SRC_KEY, ")."))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename non-existent object within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, DST_KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                s3Mock
                    .on(client_s3_1.CopyObjectCommand, {
                    Bucket: BUCKET_NAME,
                    CopySource: "".concat(BUCKET_NAME, "/").concat(SRC_KEY),
                    Key: DST_KEY,
                })
                    .rejects(new client_s3_1.NotFound({ message: "NotFound error", $metadata: {} }));
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.rename(SRC_KEY, DST_KEY); }).rejects.toThrowError("Source object does not exist (srcKey=".concat(SRC_KEY, ")."))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

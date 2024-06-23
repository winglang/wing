"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var storage_blob_1 = require("@azure/storage-blob");
var vitest_1 = require("vitest");
var bucket_inflight_1 = require("../../src/shared-azure/bucket.inflight");
var std_1 = require("../../src/std");
vitest_1.vi.mock("@azure/storage-blob");
var TEST_PATH;
var mockBlobServiceClient = new storage_blob_1.BlobServiceClient("https://some-fake-url.com");
mockBlobServiceClient.getContainerClient = vitest_1.vi.fn(function () {
    return new MockContainerClient("");
});
(0, vitest_1.beforeEach)(function () {
    vitest_1.vi.clearAllMocks;
    TEST_PATH = "happy";
});
(0, vitest_1.test)("put an object into the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, VALUE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
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
    var BUCKET_NAME, STORAGE_NAME, KEY, VALUE, CONTENT_TYPE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                VALUE = "VALUE";
                CONTENT_TYPE = "image/png";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
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
    var BUCKET_NAME, STORAGE_NAME, KEY, VALUE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                VALUE = { cool: "beans" };
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
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
    var BUCKET_NAME, STORAGE_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
                return [4 /*yield*/, client.get(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual("some fake content");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
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
    var BUCKET_NAME, STORAGE_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happyJson";
                return [4 /*yield*/, client.getJson(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual({ cool: "beans" });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("getJson a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.getJson(KEY); }).rejects.toThrowError(/Object does not exist/)];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                return [4 /*yield*/, client.delete(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("List objects from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                return [4 /*yield*/, client.list()];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(["object1", "object2"]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check that an object exists in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, client, objectExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
                return [4 /*yield*/, client.exists("object1")];
            case 1:
                objectExists = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectExists).toEqual(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check that an object doesn't exist in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, client, objectExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                return [4 /*yield*/, client.exists("object1")];
            case 1:
                objectExists = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectExists).toEqual(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, objectTryGet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
                return [4 /*yield*/, client.tryGet(KEY)];
            case 1:
                objectTryGet = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryGet).toEqual("some fake content");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, objectTryGet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                return [4 /*yield*/, client.tryGet(KEY)];
            case 1:
                objectTryGet = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryGet).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happyJson";
                return [4 /*yield*/, client.tryGetJson(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual({ cool: "beans" });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                return [4 /*yield*/, client.tryGetJson(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing non-Json object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sadJson";
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
    var BUCKET_NAME, STORAGE_NAME, KEY, client, objectTryDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
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
    var BUCKET_NAME, STORAGE_NAME, KEY, client, objectTryDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                return [4 /*yield*/, client.tryDelete(KEY)];
            case 1:
                objectTryDelete = _a.sent();
                // THEN
                (0, vitest_1.expect)(objectTryDelete).toEqual(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a non public bucket when reaching to a key public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.publicUrl(KEY); }).rejects.toThrowError("Cannot provide public url for a non-public bucket")];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket when reaching to a non existent key, public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "non-existent-key";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                // @ts-expect-error - accessing private property
                client.containerClient.getAccessPolicy = vitest_1.vi
                    .fn()
                    .mockResolvedValue({ blobPublicAccess: "container" });
                client.exists = vitest_1.vi.fn().mockResolvedValue(false);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.publicUrl(KEY); }).rejects.toThrowError("Cannot provide public url for a non-existent key (key=".concat(KEY, ")"))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket, when giving one of its keys, we should get its public url", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, expectedUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
                // @ts-expect-error - accessing private property
                client.containerClient.getAccessPolicy = vitest_1.vi
                    .fn()
                    .mockResolvedValue({ blobPublicAccess: "container" });
                expectedUrl = "https://".concat(STORAGE_NAME, ".blob.core.windows.net/").concat(BUCKET_NAME, "/").concat(KEY);
                return [4 /*yield*/, client.publicUrl(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(expectedUrl);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("fetch metadata of an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
                return [4 /*yield*/, client.metadata(KEY)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual({
                    contentType: "text/plain",
                    lastModified: std_1.Datetime.fromIso("2023-01-02T12:00:00Z"),
                    size: 19,
                });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("fetch metadata of an unexisting object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                KEY = "KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.metadata(KEY); }).rejects.toThrowError("Object does not exist (key=".concat(KEY, ")."))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy objects within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, STORAGE_NAME, SRC_KEY, DST_KEY, client, response1, response2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "happy";
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
    var BUCKET_NAME, STORAGE_NAME, SRC_KEY, DST_KEY, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                STORAGE_NAME = "STORAGE_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, STORAGE_NAME, mockBlobServiceClient);
                TEST_PATH = "sad";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.copy(SRC_KEY, DST_KEY); }).rejects.toThrowError("Source object does not exist (srcKey=".concat(SRC_KEY, ")."))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// Mock Clients
var MockBlobClient = /** @class */ (function (_super) {
    __extends(MockBlobClient, _super);
    function MockBlobClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockBlobClient.prototype.download = function () {
        switch (TEST_PATH) {
            case "happy":
                return Promise.resolve({
                    _response: null,
                    readableStreamBody: createMockStream("some fake content"),
                });
            case "happyJson":
                return Promise.resolve({
                    _response: null,
                    readableStreamBody: createMockStream(JSON.stringify({ cool: "beans" })),
                });
            case "sadJson":
                return Promise.resolve({
                    _response: null,
                    readableStreamBody: createMockStream("not a Json object"),
                });
            default:
                return Promise.reject("some fake error");
        }
    };
    MockBlobClient.prototype.getProperties = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                options;
                if (TEST_PATH === "happy") {
                    return [2 /*return*/, Promise.resolve({
                            metadata: {
                                releasedby: "Jill",
                                reviewedby: "Bob",
                            },
                            blobType: "BlockBlob",
                            leaseStatus: "unlocked",
                            leaseState: "available",
                            contentLength: 19,
                            creationTime: new Date("2023-01-01T12:00:00Z"),
                            lastModified: new Date("2023-01-02T12:00:00Z"),
                            etag: "0x8DA23D1EBA8E607",
                            contentType: "text/plain",
                            contentEncoding: "utf-8",
                            contentLanguage: "en-us",
                            serverEncrypted: true,
                            accessTier: "Hot",
                            accessTierInferred: true,
                            _response: null,
                        })];
                }
                return [2 /*return*/, Promise.reject("some fake error")];
            });
        });
    };
    MockBlobClient.prototype.exists = function (options) {
        options;
        switch (TEST_PATH) {
            case "happy":
                return Promise.resolve(true);
            case "happyJson":
                return Promise.resolve(true);
            case "sadJson":
                return Promise.resolve(true);
            default:
                return Promise.resolve(false);
        }
    };
    return MockBlobClient;
}(storage_blob_1.BlobClient));
var MockBlockBlobClient = /** @class */ (function (_super) {
    __extends(MockBlockBlobClient, _super);
    function MockBlockBlobClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockBlockBlobClient.prototype.upload = function () {
        return Promise.resolve({});
    };
    MockBlockBlobClient.prototype.delete = function () {
        return Promise.resolve({});
    };
    MockBlockBlobClient.prototype.syncCopyFromURL = function (copySource, options) {
        if (TEST_PATH === "happy") {
            return Promise.resolve({});
        }
        return Promise.reject("some fake error");
    };
    return MockBlockBlobClient;
}(storage_blob_1.BlockBlobClient));
var MockContainerClient = /** @class */ (function (_super) {
    __extends(MockContainerClient, _super);
    function MockContainerClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockContainerClient.prototype.getBlobClient = function (key) {
        return new MockBlobClient(key);
    };
    MockContainerClient.prototype.getBlockBlobClient = function (blobName) {
        return new MockBlockBlobClient(blobName);
    };
    MockContainerClient.prototype.listBlobsFlat = function (options) {
        options;
        return [{ name: "object1" }, { name: "object2" }];
    };
    return MockContainerClient;
}(storage_blob_1.ContainerClient));
function createMockStream(text) {
    var stream = new stream_1.Readable();
    stream._read = function () { };
    stream.push(text);
    stream.push(null);
    return stream;
}

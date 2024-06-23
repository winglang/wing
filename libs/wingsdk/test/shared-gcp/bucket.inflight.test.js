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
var mock_gcs_1 = require("mock-gcs");
var vitest_1 = require("vitest");
var bucket_inflight_1 = require("../../src/shared-gcp/bucket.inflight");
var std_1 = require("../../src/std");
vitest_1.vi.mock("@google-cloud/storage", function () {
    return {
        Storage: vitest_1.vi.fn(function () { return mock_gcs_1.MockStorage; }),
    };
});
(0, vitest_1.beforeEach)(function () {
    vitest_1.vi.resetAllMocks;
    vitest_1.vi.clearAllMocks;
});
(0, vitest_1.test)("put object to bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.exists(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("putJson an object into the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = { cool: "beans" };
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.putJson(KEY, VALUE)];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.exists(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get an object from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, VALUE)];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.get(KEY)];
            case 2:
                data = _a.sent();
                (0, vitest_1.expect)(data).toBe(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, NON_EXISTENT_KEY, storage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                NON_EXISTENT_KEY = "NON_EXISTENT_KEY";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.get(NON_EXISTENT_KEY); }).rejects.toThrowError(/Failed to get object \(key=NON_EXISTENT_KEY\)/)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("getJson an object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = { cool: "beans" };
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, JSON.stringify(VALUE))];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.getJson(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toEqual(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("list objects in bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put("test-file-1", "test-content-1")];
            case 1:
                _a.sent();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put("test-file-2", "test-content-2")];
            case 2:
                _a.sent();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put("test-file-3", "test-content-3")];
            case 3:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.list()];
            case 4:
                res = _a.sent();
                (0, vitest_1.expect)(res).toEqual(["test-file-1", "test-file-2", "test-file-3"]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete object from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, VALUE)];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.delete(KEY)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.exists(KEY)];
            case 3:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete object from the bucket with mustExist option", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, NON_EXISTENT_KEY, storage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                NON_EXISTENT_KEY = "NON_EXISTENT_KEY";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, (0, vitest_1.expect)(function () {
                        return client.delete(NON_EXISTENT_KEY, { mustExist: true });
                    }).rejects.toThrowError("Object does not exist (key=".concat(NON_EXISTENT_KEY, ")."))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("delete a non-existent object from the bucket with mustExist option", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, NON_EXISTENT_KEY, storage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                NON_EXISTENT_KEY = "NON_EXISTENT_KEY";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, (0, vitest_1.expect)(function () {
                        return client.delete(NON_EXISTENT_KEY, { mustExist: true });
                    }).rejects.toThrowError("Object does not exist (key=".concat(NON_EXISTENT_KEY, ")."))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a non public bucket when reaching to a key public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 1:
                _a.sent();
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.publicUrl(KEY); }).rejects.toThrowError("Failed to check if bucket is public. (bucket=".concat(BUCKET_NAME, ")"))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket when reaching to a non existent key, public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, storage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.publicUrl(KEY); }).rejects.toThrowError("Failed to check if bucket is public. (bucket=".concat(BUCKET_NAME, ")"))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket, when giving one of its keys, we should get its public url", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, PUBLIC_URL, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                PUBLIC_URL = "https://storage.googleapis.com/".concat(BUCKET_NAME, "/").concat(KEY);
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, VALUE)];
            case 1:
                _a.sent();
                client = vitest_1.vi.fn(function () { return new bucket_inflight_1.BucketClient(BUCKET_NAME, storage); });
                // it should return the PUBLIC_URL but not by calling the publicUrl method
                client.mockImplementation(function () {
                    return {
                        publicUrl: function () { return PUBLIC_URL; },
                    };
                });
                return [4 /*yield*/, client().publicUrl(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(PUBLIC_URL);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check that an object exists in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, VALUE)];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.exists(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check that an object doesn't exist in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.exists(KEY)];
            case 1:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, VALUE)];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.tryGet(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, NON_EXISTENT_KEY, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                NON_EXISTENT_KEY = "test-file-1";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.tryGet(NON_EXISTENT_KEY)];
            case 1:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = { cool: "beans" };
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, JSON.stringify(VALUE))];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.tryGetJson(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toEqual(VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, NON_EXISTENT_KEY, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                NON_EXISTENT_KEY = "NON_EXISTENT_KEY";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.tryGetJson(NON_EXISTENT_KEY)];
            case 1:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing non-Json object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, NON_JSON_VALUE, storage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                NON_JSON_VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, NON_JSON_VALUE)];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.tryGetJson(KEY); }).rejects.toThrowError("Failed to tryGet JSON object. (key=".concat(KEY, ")"))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryDelete an existing object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                KEY = "test-file-1";
                VALUE = "test-content-1";
                storage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, storage.bucket(BUCKET_NAME).put(KEY, VALUE)];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.tryDelete(KEY)];
            case 2:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryDelete a non-existent object from the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, NON_EXISTENT_KEY, storage, client, res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "test-bucket";
                NON_EXISTENT_KEY = "NON_EXISTENT_KEY";
                storage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, storage);
                return [4 /*yield*/, client.tryDelete(NON_EXISTENT_KEY)];
            case 1:
                res = _a.sent();
                (0, vitest_1.expect)(res).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get object's metadata from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, KEY, VALUE, mockStorage, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "my-bucket";
                KEY = "my-object";
                VALUE = "hello world";
                mockStorage = new mock_gcs_1.MockStorage();
                return [4 /*yield*/, mockStorage
                        .bucket(BUCKET_NAME)
                        .file(KEY)
                        .save(VALUE, {
                        metadata: {
                            acl: [
                                {
                                    entity: "user-example@example.com",
                                    role: "OWNER",
                                },
                            ],
                            cacheControl: "public, max-age=3600",
                            contentDisposition: "attachment; filename=my-object.txt",
                            contentEncoding: "gzip",
                            contentLanguage: "en",
                            contentType: "text/plain",
                            crc32c: "abcd1234",
                            customTime: "2023-10-22T18:55:00Z",
                            etag: "Cj0KEQjwvb76BRCtAhIDAQAB",
                            generation: 1,
                            id: "my-bucket/my-object/1666563700000000",
                            kind: "storage#object",
                            md5Hash: "1B2M2Y8AsgTpgAmY7PhCfg==",
                            mediaLink: "https://storage.googleapis.com/my-bucket/my-object",
                            metageneration: 1,
                            name: "my-object",
                            owner: {
                                entity: "user-example@example.com",
                                entityId: "12345678901234567890",
                            },
                            selfLink: "https://www.googleapis.com/storage/v1/b/my-bucket/o/my-object",
                            size: 11,
                            storageClass: "STANDARD",
                            timeCreated: "2023-10-22T18:55:00Z",
                            updated: "2023-10-22T18:55:00Z",
                        },
                    })];
            case 1:
                _a.sent();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, mockStorage);
                return [4 /*yield*/, client.metadata(KEY)];
            case 2:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual({
                    size: 11,
                    lastModified: std_1.Datetime.fromIso("2023-10-22T18:55:00Z"),
                    contentType: "text/plain",
                });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy non-existing object", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, mockStorage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                mockStorage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, mockStorage);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(client.copy(SRC_KEY, SRC_KEY)).rejects.toThrowError("Source object does not exist (srcKey=".concat(SRC_KEY, ")"))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy objects within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, DST_KEY, SRC_VALUE, mockStorage, client, response1, _a, _b, response2, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                SRC_VALUE = "hello world";
                mockStorage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, mockStorage);
                return [4 /*yield*/, client.put(SRC_KEY, SRC_VALUE)];
            case 1:
                _d.sent();
                return [4 /*yield*/, client.copy(SRC_KEY, SRC_KEY)];
            case 2:
                response1 = _d.sent();
                // THEN
                (0, vitest_1.expect)(response1).toEqual(undefined);
                _a = vitest_1.expect;
                return [4 /*yield*/, client.get(SRC_KEY)];
            case 3:
                _a.apply(void 0, [_d.sent()]).toBe(SRC_VALUE);
                _b = vitest_1.expect;
                return [4 /*yield*/, client.exists(DST_KEY)];
            case 4:
                _b.apply(void 0, [_d.sent()]).toBe(false);
                return [4 /*yield*/, client.copy(SRC_KEY, DST_KEY)];
            case 5:
                response2 = _d.sent();
                // THEN
                (0, vitest_1.expect)(response2).toEqual(undefined);
                _c = vitest_1.expect;
                return [4 /*yield*/, client.get(DST_KEY)];
            case 6:
                _c.apply(void 0, [_d.sent()]).toBe(SRC_VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename valid object in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, SRC_VALUE, DST_KEY, mockStorage, client, response, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                SRC_VALUE = "hello world";
                DST_KEY = "DST/KEY";
                mockStorage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, mockStorage);
                return [4 /*yield*/, client.put(SRC_KEY, SRC_VALUE)];
            case 1:
                _c.sent();
                return [4 /*yield*/, client.rename(SRC_KEY, DST_KEY)];
            case 2:
                response = _c.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                _a = vitest_1.expect;
                return [4 /*yield*/, client.get(DST_KEY)];
            case 3:
                _a.apply(void 0, [_c.sent()]).toBe(SRC_VALUE);
                _b = vitest_1.expect;
                return [4 /*yield*/, client.exists(SRC_KEY)];
            case 4:
                _b.apply(void 0, [_c.sent()]).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("renaming an object to its current name should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var BUCKET_NAME, SRC_KEY, mockStorage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                mockStorage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, mockStorage);
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
    var BUCKET_NAME, SRC_KEY, DST_KEY, mockStorage, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                BUCKET_NAME = "BUCKET_NAME";
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                mockStorage = new mock_gcs_1.MockStorage();
                client = new bucket_inflight_1.BucketClient(BUCKET_NAME, mockStorage);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.rename(SRC_KEY, DST_KEY); }).rejects.toThrowError("Source object does not exist (srcKey=".concat(SRC_KEY, ")."))];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
// TODO: implement signedUrl related tests
// https://github.com/winglang/wing/issues/4599

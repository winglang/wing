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
var fs = require("fs");
var path_1 = require("path");
var vitest_1 = require("vitest");
var util_1 = require("./util");
var cloud = require("../../src/cloud");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var bucket_inflight_1 = require("../../src/target-sim/bucket.inflight");
var sim_app_1 = require("../sim-app");
var util_2 = require("../util");
(0, vitest_1.test)("create a bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_bucket")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_bucket",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        public: false,
                        initialObjects: {},
                        topics: {},
                    },
                    type: cloud.BUCKET_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("update an object in bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, bucket, testInflight, s, client, KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                bucket = new cloud.Bucket(app, "my_bucket");
                testInflight = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, console.log("I am done")];
                }); }); });
                bucket.onCreate(testInflight);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "1.txt";
                // WHEN
                return [4 /*yield*/, client.put(KEY, JSON.stringify({ msg: "Hello world 1!" }))];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.put(KEY, JSON.stringify({ msg: "Hello world 2!" }))];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 1, function (trace) {
                        return trace.data.message.includes("I am done");
                    })];
            case 4:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                // The bucket notification topic should only publish one message, since the
                // second put() call counts as an update, not a create.
                (0, vitest_1.expect)((0, util_1.listMessages)(s).filter(function (m) { return m.includes("Publish"); })).toHaveLength(1);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("bucket on event creates 3 topics, and sends the right event and key in the event handlers", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, bucket, logBucket, testInflight, s, client, logClient, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                app = new sim_app_1.SimApp();
                bucket = new cloud.Bucket(app, "my_bucket");
                logBucket = new cloud.Bucket(app, "log_bucket");
                testInflight = (0, core_1.lift)({ bucket: logBucket })
                    .grant({ bucket: [cloud.BucketInflightMethods.PUT] })
                    .inflight(function (ctx, key, event) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.bucket.put(key, event)];
                            case 1:
                                _a.sent();
                                console.log("I am done");
                                return [2 /*return*/];
                        }
                    });
                }); });
                bucket.onEvent(testInflight);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _d.sent();
                client = s.getResource("/my_bucket");
                logClient = s.getResource("/log_bucket");
                // THEN
                return [4 /*yield*/, client.put("a", "1")];
            case 2:
                // THEN
                _d.sent();
                // wait for the subscriber to finish
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 1, function (trace) {
                        return trace.data.message.includes("I am done");
                    })];
            case 3:
                // wait for the subscriber to finish
                _d.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, logClient.get("a")];
            case 4:
                _a.apply(void 0, [_d.sent()]).toBe(cloud_1.BucketEventType.CREATE);
                return [4 /*yield*/, client.put("a", "2")];
            case 5:
                _d.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 2, function (trace) {
                        return trace.data.message.startsWith("I am done");
                    })];
            case 6:
                _d.sent();
                _b = vitest_1.expect;
                return [4 /*yield*/, logClient.get("a")];
            case 7:
                _b.apply(void 0, [_d.sent()]).toBe(cloud_1.BucketEventType.UPDATE);
                return [4 /*yield*/, client.delete("a")];
            case 8:
                _d.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 3, function (trace) {
                        return trace.data.message.startsWith("I am done");
                    })];
            case 9:
                _d.sent();
                _c = vitest_1.expect;
                return [4 /*yield*/, logClient.get("a")];
            case 10:
                _c.apply(void 0, [_d.sent()]).toBe(cloud_1.BucketEventType.DELETE);
                return [4 /*yield*/, s.stop()];
            case 11:
                _d.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("put multiple json objects and list all from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY1, KEY2, KEY3, VALUE1, VALUE2, VALUE3, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY1 = "greeting1.json";
                KEY2 = "greeting2.json";
                KEY3 = "greeting3.json";
                VALUE1 = { msg: "Hello world!" };
                VALUE2 = { msg: "Hello world again!" };
                VALUE3 = { msg: "Hello world again!" };
                // WHEN
                return [4 /*yield*/, client.putJson(KEY1, VALUE1)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.putJson(KEY2, VALUE2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.putJson(KEY3, VALUE3)];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.list()];
            case 5:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 6:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response).toEqual([KEY1, KEY2, KEY3]);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("put and get object from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "greeting.txt";
                VALUE = JSON.stringify({ msg: "Hello world!" });
                // WHEN
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.get("greeting.txt")];
            case 3:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response).toEqual(VALUE);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("put and get metadata of objects from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY1, KEY2, KEY3, VALUE1, VALUE2, VALUE3, CONTENT_TYPE3, response1, response2, response3, currentYear;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY1 = "file1.main.w";
                KEY2 = "file2.txt";
                KEY3 = "file3.txt";
                VALUE1 = "bring cloud;";
                VALUE2 = "hello world";
                VALUE3 = JSON.stringify({ msg: "hello world" });
                CONTENT_TYPE3 = "application/json";
                // WHEN
                return [4 /*yield*/, client.put(KEY1, VALUE1)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.put(KEY2, VALUE2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.put(KEY3, VALUE3, { contentType: CONTENT_TYPE3 })];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.metadata("file1.main.w")];
            case 5:
                response1 = _a.sent();
                return [4 /*yield*/, client.metadata("file2.txt")];
            case 6:
                response2 = _a.sent();
                return [4 /*yield*/, client.metadata("file3.txt")];
            case 7:
                response3 = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 8:
                // THEN
                _a.sent();
                currentYear = new Date().getFullYear();
                (0, vitest_1.expect)(response1.size).toEqual(12);
                (0, vitest_1.expect)(response1.contentType).toEqual("application/octet-stream");
                (0, vitest_1.expect)(response1.lastModified.year).toEqual(currentYear);
                (0, vitest_1.expect)(response2.size).toEqual(11);
                (0, vitest_1.expect)(response2.contentType).toEqual("text/plain");
                (0, vitest_1.expect)(response2.lastModified.year).toEqual(currentYear);
                (0, vitest_1.expect)(response3.size).toEqual(21);
                (0, vitest_1.expect)(response3.contentType).toEqual("application/json");
                (0, vitest_1.expect)(response3.lastModified.year).toEqual(currentYear);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("putJson and get metadata of object from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE, response, currentYear;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "json-file.txt";
                VALUE = "bring cloud;";
                // WHEN
                return [4 /*yield*/, client.putJson(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.metadata("json-file.txt")];
            case 3:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _a.sent();
                currentYear = new Date().getFullYear();
                (0, vitest_1.expect)(response.size).toEqual(14);
                (0, vitest_1.expect)(response.contentType).toEqual("application/json");
                (0, vitest_1.expect)(response.lastModified.year).toEqual(currentYear);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("put multiple objects and list all from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY1, KEY2, KEY3, VALUE1, VALUE2, VALUE3, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY1 = "greeting1.txt";
                KEY2 = "greeting2.txt";
                KEY3 = "greeting3.txt";
                VALUE1 = JSON.stringify({ msg: "Hello world!" });
                VALUE2 = JSON.stringify({ msg: "Hello world again!" });
                VALUE3 = JSON.stringify({ msg: "Hello world again!" });
                // WHEN
                return [4 /*yield*/, client.put(KEY1, VALUE1)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.put(KEY2, VALUE2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.put(KEY3, VALUE3)];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.list()];
            case 5:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 6:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response).toEqual([KEY1, KEY2, KEY3]);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("list respects prefixes", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, ROOT_DIR, DIR1, DIR2, filename1, filename2, KEY1, KEY2, VALUE1, VALUE2, responseRoot, responsePath, responseDir1, responseDir2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                ROOT_DIR = "path";
                DIR1 = "dir1";
                DIR2 = "dir2";
                filename1 = "file1.txt";
                filename2 = "file2.txt";
                KEY1 = "".concat(ROOT_DIR, "/").concat(DIR1, "/").concat(filename1);
                KEY2 = "".concat(ROOT_DIR, "/").concat(DIR2, "/").concat(filename2);
                VALUE1 = JSON.stringify({ msg: "Hello world!" });
                VALUE2 = JSON.stringify({ msg: "Hello world!" });
                // WHEN
                return [4 /*yield*/, client.put(KEY1, VALUE1)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.put(KEY2, VALUE2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.list()];
            case 4:
                responseRoot = _a.sent();
                return [4 /*yield*/, client.list(ROOT_DIR)];
            case 5:
                responsePath = _a.sent();
                return [4 /*yield*/, client.list("".concat(ROOT_DIR, "/").concat(DIR1))];
            case 6:
                responseDir1 = _a.sent();
                return [4 /*yield*/, client.list("".concat(ROOT_DIR, "/").concat(DIR2))];
            case 7:
                responseDir2 = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 8:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(responseRoot).toEqual([KEY1, KEY2]);
                (0, vitest_1.expect)(responsePath).toEqual([KEY1, KEY2]);
                (0, vitest_1.expect)(responseDir1).toEqual([KEY1]);
                (0, vitest_1.expect)(responseDir2).toEqual([KEY2]);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("objects can have keys that look like directories", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY1, KEY2, KEY3, KEY4, KEY5, response, responseFoo, responseFooSlash, responseFooBar, responseFooBarSlash, responseFooBarBaz;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY1 = "foo";
                KEY2 = "foo/";
                KEY3 = "foo/bar";
                KEY4 = "foo/bar/";
                KEY5 = "foo/bar/baz";
                return [4 /*yield*/, client.put(KEY1, "text")];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.put(KEY2, "text")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.put(KEY3, "text")];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.put(KEY4, "text")];
            case 5:
                _a.sent();
                return [4 /*yield*/, client.put(KEY5, "text")];
            case 6:
                _a.sent();
                return [4 /*yield*/, client.list()];
            case 7:
                response = _a.sent();
                return [4 /*yield*/, client.list(KEY1)];
            case 8:
                responseFoo = _a.sent();
                return [4 /*yield*/, client.list(KEY2)];
            case 9:
                responseFooSlash = _a.sent();
                return [4 /*yield*/, client.list(KEY3)];
            case 10:
                responseFooBar = _a.sent();
                return [4 /*yield*/, client.list(KEY4)];
            case 11:
                responseFooBarSlash = _a.sent();
                return [4 /*yield*/, client.list(KEY5)];
            case 12:
                responseFooBarBaz = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 13:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response).toEqual([KEY1, KEY2, KEY3, KEY4, KEY5]);
                (0, vitest_1.expect)(responseFoo).toEqual([KEY1, KEY2, KEY3, KEY4, KEY5]);
                (0, vitest_1.expect)(responseFooSlash).toEqual([KEY2, KEY3, KEY4, KEY5]);
                (0, vitest_1.expect)(responseFooBar).toEqual([KEY3, KEY4, KEY5]);
                (0, vitest_1.expect)(responseFooBarSlash).toEqual([KEY4, KEY5]);
                (0, vitest_1.expect)(responseFooBarBaz).toEqual([KEY5]);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get invalid object throws an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.get("unknown.txt"); }).rejects.toThrowError(/Object does not exist/)];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(s.listTraces()[2].data.status).toEqual("failure");
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("remove object from a bucket with mustExist as option", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bucketName, fileName, app, s, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucketName = "my_bucket";
                fileName = "unknown.txt";
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, bucketName);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/".concat(bucketName));
                // THEN
                // create file
                return [4 /*yield*/, client.put(fileName, JSON.stringify({ msg: "Hello world!" }))];
            case 2:
                // THEN
                // create file
                _a.sent();
                return [4 /*yield*/, client.delete(fileName, { mustExist: true })];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                (0, vitest_1.expect)(response).toEqual(undefined);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("removing a key will call onDelete method", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bucketName, fileName, app, bucket, testInflight, s, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucketName = "my_bucket";
                fileName = "unknown.txt";
                app = new sim_app_1.SimApp();
                bucket = new cloud.Bucket(app, bucketName);
                testInflight = (0, core_1.inflight)(function (_, key) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("Received " + key);
                        return [2 /*return*/];
                    });
                }); });
                bucket.onDelete(testInflight);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/".concat(bucketName));
                // WHEN
                return [4 /*yield*/, client.put(fileName, JSON.stringify({ msg: "Hello world!" }))];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.delete(fileName)];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 1, function (trace) {
                        return trace.data.message.startsWith("Received unknown.txt");
                    })];
            case 4:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response).toEqual(undefined);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("remove object from a bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bucketName, fileName, app, s, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucketName = "my_bucket";
                fileName = "unknown.txt";
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, bucketName);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/".concat(bucketName));
                // THEN
                // create file
                return [4 /*yield*/, client.put(fileName, JSON.stringify({ msg: "Hello world!" }))];
            case 2:
                // THEN
                // create file
                _a.sent();
                return [4 /*yield*/, client.delete(fileName)];
            case 3:
                response = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                (0, vitest_1.expect)(response).toEqual(undefined);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("remove non-existent object from a bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bucketName, fileName, app, s, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucketName = "my_bucket";
                fileName = "unknown.txt";
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, bucketName);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/".concat(bucketName));
                return [4 /*yield*/, client.delete(fileName, { mustExist: false })];
            case 2:
                response = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("remove non-existent object from a bucket with mustExist option", function () { return __awaiter(void 0, void 0, void 0, function () {
    var bucketName, fileName, app, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bucketName = "my_bucket";
                fileName = "unknown.txt";
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, bucketName);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/".concat(bucketName));
                // THEN
                return [4 /*yield*/, s.stop()];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, client.delete(fileName, { mustExist: true })];
                    }); }); }).rejects.toThrowError()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("bucket has no display hidden property", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, bucket;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Bucket(app, "my_bucket");
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        bucket = app.node.tryFindChild("my_bucket");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(bucket).hidden).toBeUndefined();
        (0, vitest_1.expect)(treeJson.tree.children).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).not.toMatchObject({
            my_bucket: {
                display: {
                    hidden: vitest_1.expect.any(Boolean),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("bucket has display title and description properties", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, bucket;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Bucket(app, "my_bucket");
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        bucket = app.node.tryFindChild("my_bucket");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(bucket).title).toBeDefined();
        (0, vitest_1.expect)(std_1.Node.of(bucket).description).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).toMatchObject({
            my_bucket: {
                display: {
                    title: vitest_1.expect.any(String),
                    description: vitest_1.expect.any(String),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("can add object in preflight", function () { return __awaiter(void 0, void 0, void 0, function () {
    var KEY, VALUE, app, bucket, s, client, getResponse, listResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                KEY = "greeting.txt";
                VALUE = "Hello world!";
                app = new sim_app_1.SimApp();
                bucket = new cloud.Bucket(app, "my_bucket");
                bucket.addObject(KEY, VALUE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                // WHEN
                return [4 /*yield*/, client.get(KEY)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.get("greeting.txt")];
            case 3:
                getResponse = _a.sent();
                return [4 /*yield*/, client.list()];
            case 4:
                listResponse = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(getResponse).toEqual(VALUE);
                (0, vitest_1.expect)(listResponse).toEqual([KEY]);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can add file in preflight", function () { return __awaiter(void 0, void 0, void 0, function () {
    var FILENAME, PATH, app, bucket, s, client, getResponse, listResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FILENAME = "test.txt";
                PATH = (0, path_1.resolve)(__dirname, "../test-files/test1.txt");
                app = new sim_app_1.SimApp();
                bucket = new cloud.Bucket(app, "my_bucket");
                bucket.addFile(FILENAME, PATH);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                // WHEN
                return [4 /*yield*/, client.get(FILENAME)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.get(FILENAME)];
            case 3:
                getResponse = _a.sent();
                return [4 /*yield*/, client.list()];
            case 4:
                listResponse = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(getResponse).toEqual(fs.readFileSync(PATH, "utf8"));
                (0, vitest_1.expect)(listResponse).toEqual([FILENAME]);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a non public bucket when reaching to a key public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.publicUrl(KEY); }).rejects.toThrowError(/Cannot provide public url for a non-public bucket/)];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket when reaching to a non existent key, public url it should throw an error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket", { public: true });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.publicUrl(KEY); }).rejects.toThrowError(/Cannot provide public url for an non-existent key/)];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("Given a public bucket, when giving one of its keys, we should get its public url", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket", { public: true });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                VALUE = "VALUE";
                // WHEN
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.publicUrl(KEY)];
            case 3:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _a.sent();
                // file paths are different on windows and linux
                (0, vitest_1.expect)(response.endsWith("KEY")).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("check if an object exists in the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE, existingObjectExists, nonExistentObjectExists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                VALUE = "VALUE";
                // WHEN
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.exists(KEY)];
            case 3:
                existingObjectExists = _a.sent();
                return [4 /*yield*/, client.exists("NON_EXISTENT_KEY")];
            case 4:
                nonExistentObjectExists = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(existingObjectExists).toBe(true);
                (0, vitest_1.expect)(nonExistentObjectExists).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGet objects from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE, existingObjectTryGet, nonExistentObjectTryGet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                VALUE = "VALUE";
                // WHEN
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.tryGet(KEY)];
            case 3:
                existingObjectTryGet = _a.sent();
                return [4 /*yield*/, client.tryGet("NON_EXISTENT_KEY")];
            case 4:
                nonExistentObjectTryGet = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 5:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(existingObjectTryGet).toEqual(VALUE);
                (0, vitest_1.expect)(nonExistentObjectTryGet).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson objects from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE, existingObjectTryGet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                VALUE = "VALUE";
                // WHEN
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.tryGet(KEY)];
            case 3:
                existingObjectTryGet = _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetJson an existing non-Json object from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY, VALUE;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY = "KEY";
                VALUE = "VALUE";
                // WHEN
                return [4 /*yield*/, client.put(KEY, VALUE)];
            case 2:
                // WHEN
                _a.sent();
                // THEN
                // it seems to throw a different error per OS/ node version
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.tryGetJson(KEY); }).rejects.toThrowError()];
            case 3:
                // THEN
                // it seems to throw a different error per OS/ node version
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryDelete objects from bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY1, VALUE1, KEY2, VALUE2, existingObject1TryDelete, existingObject2TryDelete, nonExistentObjectTryDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY1 = "KEY";
                VALUE1 = "VALUE";
                KEY2 = "file.json";
                VALUE2 = { msg: "Hello world!" };
                // WHEN
                return [4 /*yield*/, client.put(KEY1, VALUE1)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.putJson(KEY2, VALUE2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.tryDelete(KEY1)];
            case 4:
                existingObject1TryDelete = _a.sent();
                return [4 /*yield*/, client.tryDelete(KEY2)];
            case 5:
                existingObject2TryDelete = _a.sent();
                return [4 /*yield*/, client.tryDelete("NON_EXISTENT_KEY")];
            case 6:
                nonExistentObjectTryDelete = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 7:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(existingObject1TryDelete).toEqual(true);
                (0, vitest_1.expect)(existingObject2TryDelete).toEqual(true);
                (0, vitest_1.expect)(nonExistentObjectTryDelete).toEqual(false);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy objects within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, KEY1, VALUE1, KEY2, VALUE2, file1SrcMetadata, file2SrcMetadata, file1DstMetadata, file2DstMetadata;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                KEY1 = "file1.main.w";
                VALUE1 = "bring cloud;";
                KEY2 = "file2.txt";
                VALUE2 = { msg: "Hello world!" };
                // WHEN
                return [4 /*yield*/, client.put(KEY1, VALUE1)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.putJson(KEY2, VALUE2)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.metadata(KEY1)];
            case 4:
                file1SrcMetadata = _a.sent();
                return [4 /*yield*/, client.metadata(KEY2)];
            case 5:
                file2SrcMetadata = _a.sent();
                // Sleep 100ms to ensure 'metadata.lastModified' changes upon copy.
                return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 100); })];
            case 6:
                // Sleep 100ms to ensure 'metadata.lastModified' changes upon copy.
                _a.sent();
                return [4 /*yield*/, client.copy(KEY1, KEY1)];
            case 7:
                _a.sent();
                return [4 /*yield*/, client.copy(KEY2, "dir/".concat(KEY2))];
            case 8:
                _a.sent();
                return [4 /*yield*/, client.metadata(KEY1)];
            case 9:
                file1DstMetadata = _a.sent();
                return [4 /*yield*/, client.metadata("dir/".concat(KEY2))];
            case 10:
                file2DstMetadata = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 11:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(file1SrcMetadata.contentType).toEqual(file1DstMetadata.contentType);
                (0, vitest_1.expect)(file1SrcMetadata.size).toEqual(file1DstMetadata.size);
                (0, vitest_1.expect)(file1SrcMetadata.lastModified).not.toEqual(file1DstMetadata.lastModified);
                (0, vitest_1.expect)(file2SrcMetadata.contentType).toEqual(file2DstMetadata.contentType);
                (0, vitest_1.expect)(file2SrcMetadata.size).toEqual(file2DstMetadata.size);
                (0, vitest_1.expect)(file2SrcMetadata.lastModified).not.toEqual(file2DstMetadata.lastModified);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("copy non-existent object within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, SRC_KEY, DST_KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                SRC_KEY = "SRC/KEY";
                DST_KEY = "DST/KEY";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.copy(SRC_KEY, DST_KEY); }).rejects.toThrowError(/Source object does not exist/)];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename valid object within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, SRC_KEY, SRC_VALUE, DST_KEY, srcFileExists, dstFileExists, dstFileValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                SRC_KEY = "original.txt";
                SRC_VALUE = "Hello, Wing!";
                DST_KEY = "renamed.txt";
                // WHEN
                return [4 /*yield*/, client.put(SRC_KEY, SRC_VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.rename(SRC_KEY, DST_KEY)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.exists(SRC_KEY)];
            case 4:
                srcFileExists = _a.sent();
                return [4 /*yield*/, client.exists(DST_KEY)];
            case 5:
                dstFileExists = _a.sent();
                return [4 /*yield*/, client.get(DST_KEY)];
            case 6:
                dstFileValue = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 7:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(srcFileExists).toBe(false);
                (0, vitest_1.expect)(dstFileExists).toBe(true);
                (0, vitest_1.expect)(dstFileValue).toEqual(SRC_VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename valid object with overwrite within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, SRC_KEY, SRC_VALUE, DST_KEY, DST_VALUE, srcFileExists, dstFileExists, dstFileValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                SRC_KEY = "original.txt";
                SRC_VALUE = "Hello, Wing!";
                DST_KEY = "to-overwrite.txt";
                DST_VALUE = "Hello, World!";
                // WHEN
                return [4 /*yield*/, client.put(SRC_KEY, SRC_VALUE)];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, client.put(DST_KEY, DST_VALUE)];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.rename(SRC_KEY, DST_KEY)];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.exists(SRC_KEY)];
            case 5:
                srcFileExists = _a.sent();
                return [4 /*yield*/, client.exists(DST_KEY)];
            case 6:
                dstFileExists = _a.sent();
                return [4 /*yield*/, client.get(DST_KEY)];
            case 7:
                dstFileValue = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 8:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(srcFileExists).toBe(false);
                (0, vitest_1.expect)(dstFileExists).toBe(true);
                (0, vitest_1.expect)(dstFileValue).toEqual(SRC_VALUE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename invalid object within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, SRC_KEY, SRC_VALUE;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                SRC_KEY = "original.txt";
                SRC_VALUE = "Hello, Wing!";
                // WHEN
                return [4 /*yield*/, client.put(SRC_KEY, SRC_VALUE)];
            case 2:
                // WHEN
                _a.sent();
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.rename(SRC_KEY, SRC_KEY); }).rejects.toThrowError("Renaming an object to its current name is not a valid operation (srcKey=".concat(SRC_KEY, ", dstKey=").concat(SRC_KEY, ")."))];
            case 3:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("rename non-existent object within the bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, SRC_KEY, SRC_VALUE, DST_KEY;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                SRC_KEY = "original.txt";
                SRC_VALUE = "Hello, Wing!";
                DST_KEY = "renamed.txt";
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.rename(SRC_KEY, DST_KEY); }).rejects.toThrowError(/Source object does not exist/)];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("bucket is stateful across simulations", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, bucket, stateDir, s, client, metadata1, metadata2, client2, dataA, dataB, metadata3, metadata4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                bucket = new cloud.Bucket(app, "my_bucket");
                // addObject means that each deployment, object ("a", "1") will be set on the bucket
                // even if a different object with the same key is added in-flight
                bucket.addObject("a", "1");
                stateDir = (0, util_2.mkdtemp)();
                return [4 /*yield*/, app.startSimulator(stateDir)];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                return [4 /*yield*/, client.put("a", "2")];
            case 2:
                _a.sent(); // override contents of file "a" inflight
                return [4 /*yield*/, client.put("b", "2")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.metadata("a")];
            case 4:
                metadata1 = _a.sent();
                return [4 /*yield*/, client.metadata("b")];
            case 5:
                metadata2 = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                // restart the simulator, re-initializing all resources
                // this will reset "a" to its original value
                return [4 /*yield*/, s.start()];
            case 7:
                // restart the simulator, re-initializing all resources
                // this will reset "a" to its original value
                _a.sent();
                client2 = s.getResource("/my_bucket");
                return [4 /*yield*/, client2.get("a")];
            case 8:
                dataA = _a.sent();
                return [4 /*yield*/, client2.get("b")];
            case 9:
                dataB = _a.sent();
                return [4 /*yield*/, client2.metadata("a")];
            case 10:
                metadata3 = _a.sent();
                return [4 /*yield*/, client2.metadata("b")];
            case 11:
                metadata4 = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 12:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(dataA).toEqual("1");
                (0, vitest_1.expect)(dataB).toEqual("2"); // "b" will be remembered
                (0, vitest_1.expect)(metadata1).not.toEqual(metadata3);
                (0, vitest_1.expect)(metadata2).toEqual(metadata4);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("bucket ignores corrupted state file", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, stateDir, s, client, metadata, client2, files;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Bucket(app, "my_bucket");
                stateDir = (0, util_2.mkdtemp)();
                return [4 /*yield*/, app.startSimulator(stateDir)];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_bucket");
                return [4 /*yield*/, client.put("a", "1")];
            case 2:
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                metadata = (0, path_1.join)(s.getResourceStateDir("/my_bucket"), bucket_inflight_1.METADATA_FILENAME);
                fs.writeFileSync(metadata, "corrupted");
                // restart the simulator
                return [4 /*yield*/, s.start()];
            case 4:
                // restart the simulator
                _a.sent();
                client2 = s.getResource("/my_bucket");
                return [4 /*yield*/, client2.put("b", "2")];
            case 5:
                _a.sent();
                return [4 /*yield*/, client2.list()];
            case 6:
                files = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 7:
                _a.sent();
                // THEN
                // we lost all metadata, but the bucket is still functional
                (0, vitest_1.expect)(files).toEqual(["b"]);
                return [2 /*return*/];
        }
    });
}); });
// Deceided to seperate this feature in a different release,(see https://github.com/winglang/wing/issues/4143)
// test("Given a bucket when reaching to a non existent key, signed url it should throw an error", async () => {
//   //GIVEN
//   let error;
//   const app = new SimApp();
//   new cloud.Bucket(app, "my_bucket", { public: true });
//   const s = await app.startSimulator();
//   const client = s.getResource("/my_bucket") as cloud.IBucketClient;
//   const KEY = "KEY";
//   // WHEN
//   try {
//     await client.signedUrl(KEY);
//   } catch (err) {
//     error = err;
//   }
//   expect(error?.message).toBe(
//     "Cannot provide signed url for an non-existent key (key=${KEY})"
//   );
//   // THEN
//   await s.stop();
// });
// test("Given a bucket, when giving one of its keys, we should get it's signed url", async () => {
//   // GIVEN
//   const app = new SimApp();
//   new cloud.Bucket(app, "my_bucket", { public: true });
//   const s = await app.startSimulator();
//   const client = s.getResource("/my_bucket") as cloud.IBucketClient;
//   const KEY = "KEY";
//   const VALUE = "VALUE";
//   // WHEN
//   await client.put(KEY, VALUE);
//   const response = await client.signedUrl(KEY);
//   // THEN
//   await s.stop();
//   const filePath = `${client.fileDir}/${KEY}`;
//   expect(response).toEqual(url.pathToFileURL(filePath).searchParams.append("Expires","86400"));
// });

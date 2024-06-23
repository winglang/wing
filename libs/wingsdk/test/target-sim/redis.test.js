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
var vitest_1 = require("vitest");
var ex_1 = require("../../src/ex");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("create a Redis resource", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, redisResource;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                redisResource = s.getResourceConfig("/my_redis");
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(redisResource).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_redis",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        port: vitest_1.expect.any(String),
                    },
                    type: ex_1.REDIS_FQN,
                });
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can set and get a value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, key, expectedValue, s, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                key = "wing";
                expectedValue = "does redis";
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_redis");
                return [4 /*yield*/, client.set(key, expectedValue)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.get(key)];
            case 3:
                value = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(value).toEqual(expectedValue);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can hset and hget values", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, key, field, expectedValue, s, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                key = "wing";
                field = "secret_message";
                expectedValue = "does redis";
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_redis");
                return [4 /*yield*/, client.hset(key, field, expectedValue)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.hget(key, field)];
            case 3:
                value = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(value).toEqual(expectedValue);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can sadd and smembers values", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, key, expectedValues, s, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                key = "wing";
                expectedValues = ["a", "b", "c"];
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_redis");
                return [4 /*yield*/, client.sadd(key, "a")];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.sadd(key, "b")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.sadd(key, "c")];
            case 4:
                _a.sent();
                return [4 /*yield*/, client.smembers(key)];
            case 5:
                value = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(value.sort()).toEqual(expectedValues);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can del a value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, key, expectedValue, s, client, recordsDeleted, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                key = "wing";
                expectedValue = "does redis";
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_redis");
                return [4 /*yield*/, client.set(key, expectedValue)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.del(key)];
            case 3:
                recordsDeleted = _a.sent();
                return [4 /*yield*/, client.get(key)];
            case 4:
                value = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 5:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(recordsDeleted).toEqual(1);
                (0, vitest_1.expect)(value).toBeUndefined();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("return empty array when smembers on a non-existent key", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, key, s, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                key = "wing";
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_redis");
                return [4 /*yield*/, client.smembers(key)];
            case 2:
                value = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)(value).toEqual([]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("get a value that does not exist", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, key, s, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new ex_1.Redis(app, "my_redis");
                key = "wing";
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_redis");
                return [4 /*yield*/, client.get(key)];
            case 2:
                value = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(value).toBeUndefined();
                return [2 /*return*/];
        }
    });
}); });

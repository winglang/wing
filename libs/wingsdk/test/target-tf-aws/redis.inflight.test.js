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
var client_elasticache_1 = require("@aws-sdk/client-elasticache");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
var vitest_1 = require("vitest");
var redis_inflight_1 = require("../../src/target-tf-aws/redis.inflight");
var getMockClient = function () { return new redis_inflight_1.RedisClient("fake-cluster", new MockRedis()); };
(0, aws_sdk_client_mock_1.mockClient)(client_elasticache_1.ElastiCacheClient)
    .on(client_elasticache_1.DescribeCacheClustersCommand)
    .resolves({
    CacheClusters: [
        {
            CacheNodes: [
                {
                    Endpoint: {
                        Address: "fake-cluster.1234567890.us-east-1.cache.amazonaws.com",
                    },
                },
            ],
        },
    ],
});
(0, vitest_1.test)("can set and get a value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, expectedValue, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "wing";
                expectedValue = "does redis";
                client = getMockClient();
                return [4 /*yield*/, client.set(key, expectedValue)];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.get(key)];
            case 2:
                value = _a.sent();
                // THEN
                (0, vitest_1.expect)(value).toEqual(expectedValue);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can hset and hget values", function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, field1, field2, expectedValue1, expectedValue2, client, value1, value2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "wing";
                field1 = "foo";
                field2 = "hello";
                expectedValue1 = "bar";
                expectedValue2 = "world";
                client = getMockClient();
                return [4 /*yield*/, client.hset(key, field1, expectedValue1)];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.hset(key, field2, expectedValue2)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.hget(key, field1)];
            case 3:
                value1 = _a.sent();
                return [4 /*yield*/, client.hget(key, field2)];
            case 4:
                value2 = _a.sent();
                // THEN
                (0, vitest_1.expect)(value1).toEqual(expectedValue1);
                (0, vitest_1.expect)(value2).toEqual(expectedValue2);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can sadd and smembers values", function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, expectedValues, client, values;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "wing";
                expectedValues = ["a", "b", "c"];
                client = getMockClient();
                return [4 /*yield*/, client.sadd(key, "a")];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.sadd(key, "b")];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.sadd(key, "c")];
            case 3:
                _a.sent();
                return [4 /*yield*/, client.smembers(key)];
            case 4:
                values = (_a.sent()).sort();
                // THEN
                (0, vitest_1.expect)(values).toEqual(expectedValues);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("can delete a key", function () { return __awaiter(void 0, void 0, void 0, function () {
    var key, client, value;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                key = "wing";
                client = getMockClient();
                return [4 /*yield*/, client.set(key, "does redis")];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.del(key)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.get(key)];
            case 3:
                value = _a.sent();
                // THEN
                (0, vitest_1.expect)(value).toBeUndefined();
                return [2 /*return*/];
        }
    });
}); });
var MockRedis = /** @class */ (function () {
    function MockRedis() {
        this.items = new Map();
    }
    MockRedis.prototype.set = function (key, value) {
        this.items.set(key, value);
    };
    MockRedis.prototype.get = function (key) {
        return this.items.get(key);
    };
    MockRedis.prototype.hset = function (key, field, value) {
        this.items.set("".concat(key, ":").concat(field), value);
    };
    MockRedis.prototype.hget = function (key, field) {
        return this.items.get("".concat(key, ":").concat(field));
    };
    MockRedis.prototype.sadd = function (key, value) {
        if (!this.items.has(key)) {
            var set_1 = new Set();
            this.items.set(key, set_1);
        }
        var set = this.items.get(key);
        if (set === undefined || typeof set === "string") {
            throw new Error("Not a set");
        }
        set.add(value);
    };
    MockRedis.prototype.smembers = function (key) {
        var set = this.items.get(key);
        if (!set) {
            return [];
        }
        else if (typeof set === "string") {
            throw new Error("Not a set");
        }
        else {
            return Array.from(set);
        }
    };
    MockRedis.prototype.del = function (key) {
        this.items.delete(key);
    };
    return MockRedis;
}());

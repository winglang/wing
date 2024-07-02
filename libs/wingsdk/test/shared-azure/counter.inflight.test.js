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
var azureDataTables = require("@azure/data-tables");
var vitest_1 = require("vitest");
var counter_inflight_1 = require("../../src/shared-azure/counter.inflight");
// @ts-expect-error - un-matching spy argument types
vitest_1.vi.spyOn(azureDataTables, "TableClient").mockImplementation(function () {
    var counter = {};
    return {
        getEntity: vitest_1.vi.fn(function (partitionKey, rowKey) {
            return Promise.resolve({
                partitionKey: partitionKey,
                rowKey: rowKey,
                counterValue: counter[rowKey],
            });
        }),
        upsertEntity: vitest_1.vi.fn(function (entity) {
            counter[entity.rowKey] = entity.counterValue;
            return Promise.resolve();
        }),
    };
});
vitest_1.vi.stubEnv("dummyKey", "value");
(0, vitest_1.describe)("no initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, vitest_1.test)("increment- no key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey");
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.inc()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(0);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.inc(2)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(1);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.inc(-1)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(3);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.inc(0)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("increment- with a key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey");
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.inc(2, "testKey")];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).toBe(0);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.inc(-1, "testKey")];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).toBe(2);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.inc(0, "testKey")];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).toBe(1);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("decrement - no key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey");
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.dec()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(0);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.dec(2)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(-1);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.dec(-1)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(-3);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.dec(0)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(-2);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("decrement - with a key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey");
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.dec(2, "testKey")];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).toBe(0);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.dec(-1, "testKey")];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).toBe(-2);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.dec(0, "testKey")];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).toBe(-1);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("peeking", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey");
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(0);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(0);
                        return [4 /*yield*/, client.dec(2, "testKey")];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, client.inc(2)];
                    case 4:
                        _e.sent();
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 5:
                        _c.apply(void 0, [_e.sent()]).toBe(2);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 6:
                        _d.apply(void 0, [_e.sent()]).toBe(-2);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("setting", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey");
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.set(150)];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(undefined);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(150);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.set(-15, "testKey")];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(undefined);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(-15);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.describe)("positive initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, vitest_1.test)("increment- no key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", 10);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.inc()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(10);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.inc(2)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(11);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.inc(-10)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(13);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.inc(0)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(3);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("increment- with a key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", 10);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.inc(2, "testKey")];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).toBe(10);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.inc(-1, "testKey")];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).toBe(12);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.inc(0, "testKey")];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).toBe(11);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("decrement - no key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", 10);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.dec()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(10);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.dec(2)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(9);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.dec(-1)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(7);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.dec(0)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(8);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("decrement - with a key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", 10);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.dec(2, "testKey")];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).toBe(10);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.dec(-1, "testKey")];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).toBe(8);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.dec(0, "testKey")];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).toBe(9);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("peeking", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", 10);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(10);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(10);
                        return [4 /*yield*/, client.dec(20, "testKey")];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, client.inc(20)];
                    case 4:
                        _e.sent();
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 5:
                        _c.apply(void 0, [_e.sent()]).toBe(30);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 6:
                        _d.apply(void 0, [_e.sent()]).toBe(-10);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("setting", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", 10);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.set(150)];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(undefined);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(150);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.set(-15, "testKey")];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(undefined);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(-15);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.describe)("negative initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        (0, vitest_1.test)("increment- no key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", -5);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.inc()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(-5);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.inc(2)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(-4);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.inc(-1)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(-2);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.inc(0)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(-3);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("increment- with a key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", -5);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.inc(2, "testKey")];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).toBe(-5);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.inc(-1, "testKey")];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).toBe(-3);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.inc(0, "testKey")];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).toBe(-4);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("decrement - no key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", -5);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.dec()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(-5);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.dec(2)];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(-6);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.dec(-1)];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(-8);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.dec(0)];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(-7);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("decrement - with a key", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", -5);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.dec(2, "testKey")];
                    case 1:
                        _a.apply(void 0, [_d.sent()]).toBe(-5);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.dec(-1, "testKey")];
                    case 2:
                        _b.apply(void 0, [_d.sent()]).toBe(-7);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.dec(0, "testKey")];
                    case 3:
                        _c.apply(void 0, [_d.sent()]).toBe(-6);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("peeking", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", -5);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(-5);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(-5);
                        return [4 /*yield*/, client.dec(2, "testKey")];
                    case 3:
                        _e.sent();
                        return [4 /*yield*/, client.inc(20)];
                    case 4:
                        _e.sent();
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 5:
                        _c.apply(void 0, [_e.sent()]).toBe(15);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 6:
                        _d.apply(void 0, [_e.sent()]).toBe(-7);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.test)("setting", function () { return __awaiter(void 0, void 0, void 0, function () {
            var client, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        client = new counter_inflight_1.CounterClient("dummyAccount", "dummyTable", "dummyKey", -5);
                        _a = vitest_1.expect;
                        return [4 /*yield*/, client.set(150)];
                    case 1:
                        _a.apply(void 0, [_e.sent()]).toBe(undefined);
                        _b = vitest_1.expect;
                        return [4 /*yield*/, client.peek()];
                    case 2:
                        _b.apply(void 0, [_e.sent()]).toBe(150);
                        _c = vitest_1.expect;
                        return [4 /*yield*/, client.set(-15, "testKey")];
                    case 3:
                        _c.apply(void 0, [_e.sent()]).toBe(undefined);
                        _d = vitest_1.expect;
                        return [4 /*yield*/, client.peek("testKey")];
                    case 4:
                        _d.apply(void 0, [_e.sent()]).toBe(-15);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });

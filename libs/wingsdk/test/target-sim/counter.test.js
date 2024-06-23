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
var util_1 = require("./util");
var cloud = require("../../src/cloud");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
var util_2 = require("../util");
(0, vitest_1.test)("create a counter", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                c = new cloud.Counter(app, "my_counter", {
                    initial: 123,
                });
                (0, vitest_1.expect)(c.initial).toBe(123);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("inc", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, value0, value1, value2, value3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter", {
                    initial: 123,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.inc()];
            case 2:
                value0 = _a.sent();
                (0, vitest_1.expect)(value0).toEqual(123); // always returns the value before inc (like "i++");
                return [4 /*yield*/, client.inc()];
            case 3:
                value1 = _a.sent();
                (0, vitest_1.expect)(value1).toEqual(123 + 1);
                return [4 /*yield*/, client.inc(10)];
            case 4:
                value2 = _a.sent();
                (0, vitest_1.expect)(value2).toEqual(123 + 1 + 1);
                return [4 /*yield*/, client.inc(10)];
            case 5:
                value3 = _a.sent();
                (0, vitest_1.expect)(value3).toEqual(123 + 1 + 1 + 10);
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key inc", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, value0, value1, value2, value3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.inc(1, "my-key")];
            case 2:
                value0 = _a.sent();
                (0, vitest_1.expect)(value0).toEqual(0); // always returns the value before inc (like "i++");
                return [4 /*yield*/, client.inc(undefined, "my-key")];
            case 3:
                value1 = _a.sent();
                (0, vitest_1.expect)(value1).toEqual(1);
                return [4 /*yield*/, client.inc(10, "my-key")];
            case 4:
                value2 = _a.sent();
                (0, vitest_1.expect)(value2).toEqual(1 + 1);
                return [4 /*yield*/, client.inc(10, "my-key")];
            case 5:
                value3 = _a.sent();
                (0, vitest_1.expect)(value3).toEqual(1 + 1 + 10);
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("dec", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, value0, value1, value2, value3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter", {
                    initial: 123,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.dec()];
            case 2:
                value0 = _a.sent();
                (0, vitest_1.expect)(value0).toEqual(123); // always returns the value before inc (like "i--");
                return [4 /*yield*/, client.dec()];
            case 3:
                value1 = _a.sent();
                (0, vitest_1.expect)(value1).toEqual(123 - 1);
                return [4 /*yield*/, client.dec(10)];
            case 4:
                value2 = _a.sent();
                (0, vitest_1.expect)(value2).toEqual(123 - 1 - 1);
                return [4 /*yield*/, client.dec(10)];
            case 5:
                value3 = _a.sent();
                (0, vitest_1.expect)(value3).toEqual(123 - 1 - 1 - 10);
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key dec", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, value0, value1, value2, value3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.dec(1, "my-key")];
            case 2:
                value0 = _a.sent();
                (0, vitest_1.expect)(value0).toEqual(0); // always returns the value before inc (like "i--");
                return [4 /*yield*/, client.dec(undefined, "my-key")];
            case 3:
                value1 = _a.sent();
                (0, vitest_1.expect)(value1).toEqual(-1);
                return [4 /*yield*/, client.dec(10, "my-key")];
            case 4:
                value2 = _a.sent();
                (0, vitest_1.expect)(value2).toEqual(-1 - 1);
                return [4 /*yield*/, client.dec(10, "my-key")];
            case 5:
                value3 = _a.sent();
                (0, vitest_1.expect)(value3).toEqual(-1 - 1 - 10);
                return [4 /*yield*/, s.stop()];
            case 6:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("peek without initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, peek;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.peek()];
            case 2:
                peek = _a.sent();
                (0, vitest_1.expect)(peek).toEqual(0);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("peek with initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, peek;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter", {
                    initial: 123,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.peek()];
            case 2:
                peek = _a.sent();
                (0, vitest_1.expect)(peek).toEqual(123);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key peek without value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, peek;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.peek("my-key")];
            case 2:
                peek = _a.sent();
                (0, vitest_1.expect)(peek).toEqual(0);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key peek with value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, peek;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.inc(10, "my-key")];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.peek("my-key")];
            case 3:
                peek = _a.sent();
                (0, vitest_1.expect)(peek).toEqual(10);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("set to new value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, peek;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter", {
                    initial: 123,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.set(5)];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.peek()];
            case 3:
                peek = _a.sent();
                (0, vitest_1.expect)(peek).toEqual(5);
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key set to new value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, peek;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Counter(app, "my_counter");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.set(5, "my-key")];
            case 2:
                _a.sent();
                return [4 /*yield*/, client.peek("my-key")];
            case 3:
                peek = _a.sent();
                (0, vitest_1.expect)(peek).toEqual(5);
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("counter has no display hidden property", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, counter;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Counter(app, "my_counter");
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        counter = app.node.tryFindChild("my_counter");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(counter).hidden).toBeUndefined();
        (0, vitest_1.expect)(treeJson.tree.children).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).not.toMatchObject({
            my_counter: {
                display: {
                    hidden: vitest_1.expect.any(Boolean),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("counter has display title and description properties", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, counter;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Counter(app, "my_counter");
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        counter = app.node.tryFindChild("my_counter");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(counter).title).toBeDefined();
        (0, vitest_1.expect)(std_1.Node.of(counter).description).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).toMatchObject({
            my_counter: {
                display: {
                    title: vitest_1.expect.any(String),
                    description: vitest_1.expect.any(String),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("counter is stateful across simulations", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, counter, stateDir, s, client, value1, value2, client2, value3, value4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                counter = new cloud.Counter(app, "my_counter", { initial: 5 });
                stateDir = (0, util_2.mkdtemp)();
                return [4 /*yield*/, app.startSimulator(stateDir)];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_counter");
                return [4 /*yield*/, client.peek()];
            case 2:
                value1 = _a.sent();
                return [4 /*yield*/, client.inc(1, "key")];
            case 3:
                value2 = _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                // restart the simulator
                return [4 /*yield*/, s.start()];
            case 5:
                // restart the simulator
                _a.sent();
                client2 = s.getResource("/my_counter");
                return [4 /*yield*/, client2.peek()];
            case 6:
                value3 = _a.sent();
                return [4 /*yield*/, client2.peek("key")];
            case 7:
                value4 = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 8:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(value1).toEqual(5);
                (0, vitest_1.expect)(value2).toEqual(5);
                (0, vitest_1.expect)(value3).toEqual(5);
                (0, vitest_1.expect)(value4).toEqual(6); // value from previous simulation
                return [2 /*return*/];
        }
    });
}); });

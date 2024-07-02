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
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
var INFLIGHT_CODE = (0, core_1.inflight)(function (_, message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Hello from schedule!");
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("create a schedule", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, cron, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                cron = "*/1 * * * *";
                new cloud.Schedule(app, "my_schedule", { cron: cron });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(s.getResourceConfig("/my_schedule")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_schedule",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        cronExpression: cron,
                    },
                    type: cloud.SCHEDULE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("schedule with one task with cron", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, schedule, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                schedule = new cloud.Schedule(app, "my_schedule", {
                    cron: "* * * * *",
                });
                schedule.onTick(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // WHEN
                return [4 /*yield*/, s.stop()];
            case 2:
                // WHEN
                _a.sent();
                // THEN
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("schedule with one task using rate of 10m", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, schedule, expectedCron, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                schedule = new cloud.Schedule(app, "my_schedule", {
                    rate: std_1.Duration.fromMinutes(10),
                });
                expectedCron = "*/10 * * * *";
                schedule.onTick(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                (0, vitest_1.expect)(s.getResourceConfig("/my_schedule")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_schedule",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        cronExpression: expectedCron,
                    },
                    type: cloud.SCHEDULE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("schedule with one task using rate of 3h", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, schedule, expectedCron, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                schedule = new cloud.Schedule(app, "my_schedule", {
                    rate: std_1.Duration.fromHours(3),
                });
                expectedCron = "* */3 * * *";
                schedule.onTick(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                (0, vitest_1.expect)(s.getResourceConfig("/my_schedule")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_schedule",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        cronExpression: expectedCron,
                    },
                    type: cloud.SCHEDULE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

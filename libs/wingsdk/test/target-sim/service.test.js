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
var sim_app_1 = require("../sim-app");
var HANDLER_WITH_START = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("start!");
        return [2 /*return*/];
    });
}); });
var HANDLER_WITH_START_AND_STOP = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("start!");
        return [2 /*return*/, function () { return console.log("stop!"); }];
    });
}); });
(0, vitest_1.test)("create a service with on start method", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Service(app, "my_service", HANDLER_WITH_START);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(s.getResourceConfig("/my_service")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_service",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        autoStart: true,
                        sourceCodeFile: vitest_1.expect.any(String),
                        environmentVariables: {},
                    },
                    type: cloud.SERVICE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("create a service with a on stop method", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(s.getResourceConfig("/my_service")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_service",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        autoStart: true,
                        sourceCodeFile: vitest_1.expect.any(String),
                        environmentVariables: {},
                    },
                    type: cloud.SERVICE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(s
                    .listTraces()
                    .filter(function (v) { return v.sourceType == cloud.SERVICE_FQN; })
                    .map(function (trace) { return trace.data.message; })).toEqual([
                    "start!",
                    "root/my_service started",
                    "stop!",
                    "root/my_service stopped",
                ]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("create a service without autostart", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP, {
                    autoStart: false,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(s.getResourceConfig("/my_service")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_service",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        autoStart: false,
                        sourceCodeFile: vitest_1.expect.any(String),
                        environmentVariables: {},
                    },
                    type: cloud.SERVICE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(s
                    .listTraces()
                    .filter(function (v) { return v.sourceType == cloud.SERVICE_FQN; })
                    .map(function (trace) { return trace.data.message; })).toEqual(["root/my_service started", "root/my_service stopped"]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("start and stop service", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP, {
                    autoStart: false,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                service = s.getResource("/my_service");
                // WHEN
                return [4 /*yield*/, service.start()];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, service.stop()];
            case 3:
                _a.sent();
                return [4 /*yield*/, service.start()];
            case 4:
                _a.sent();
                return [4 /*yield*/, service.stop()];
            case 5:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(s
                    .listTraces()
                    .filter(function (v) { return v.sourceType == cloud.SERVICE_FQN; })
                    .map(function (trace) { return trace.data.message; })).toEqual(["root/my_service started", "start!", "stop!", "start!", "stop!"]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("consecutive start and stop service", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, service;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Service(app, "my_service", HANDLER_WITH_START_AND_STOP, {
                    autoStart: false,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                service = s.getResource("/my_service");
                // WHEN
                return [4 /*yield*/, service.start()];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, service.start()];
            case 3:
                _a.sent();
                return [4 /*yield*/, service.start()];
            case 4:
                _a.sent();
                return [4 /*yield*/, service.stop()];
            case 5:
                _a.sent();
                return [4 /*yield*/, service.stop()];
            case 6:
                _a.sent();
                return [4 /*yield*/, service.stop()];
            case 7:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(s
                    .listTraces()
                    .filter(function (v) { return v.sourceType == cloud.SERVICE_FQN; })
                    .map(function (trace) { return trace.data.message; })).toEqual(["root/my_service started", "start!", "stop!"]);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("throws during service start", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, msg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Service(app, "my_service", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        throw new Error("ThisIsAnError");
                    });
                }); }));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                msg = s
                    .listTraces()
                    .find(function (t) { return t.data.message.startsWith("Failed to start service"); });
                (0, vitest_1.expect)(msg).toBeTruthy();
                (0, vitest_1.expect)(msg === null || msg === void 0 ? void 0 : msg.data.message).toEqual("Failed to start service: ThisIsAnError");
                return [2 /*return*/];
        }
    });
}); });

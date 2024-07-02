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
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
var INFLIGHT_CODE = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
    var msg;
    return __generator(this, function (_a) {
        event = JSON.parse(event);
        if (event.name[0] !== event.name[0].toUpperCase()) {
            throw new Error("Name must start with uppercase letter");
        }
        if (process.env.PIG_LATIN) {
            msg = "Ellohay, " + event.name + "!";
        }
        else {
            msg = "Hello, " + event.name + "!";
        }
        return [2 /*return*/, JSON.stringify({ msg: msg })];
    });
}); });
var INFLIGHT_PANIC = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        process.exit(1);
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("create a function", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Function(app, "my_function", INFLIGHT_CODE, {
                    env: {
                        ENV_VAR1: "true",
                    },
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_function")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_function",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        sourceCodeFile: vitest_1.expect.any(String),
                        sourceCodeLanguage: "javascript",
                        environmentVariables: {
                            ENV_VAR1: "true",
                        },
                        concurrency: 100,
                        timeout: 60000,
                    },
                    type: cloud.FUNCTION_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("invoke function succeeds", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, PAYLOAD, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Function(app, "my_function", INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_function");
                PAYLOAD = { name: "Alice" };
                return [4 /*yield*/, client.invoke(JSON.stringify(PAYLOAD))];
            case 2:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(JSON.stringify({ msg: "Hello, ".concat(PAYLOAD.name, "!") }));
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("async invoke function cleanup while running", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Function(app, "my_function", (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: 
                            // sleep forever
                            return [4 /*yield*/, new Promise(function () { })];
                            case 1:
                                // sleep forever
                                _a.sent();
                                return [2 /*return*/, undefined];
                        }
                    });
                }); }));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_function");
                // WHEN
                return [4 /*yield*/, client.invokeAsync()];
            case 2:
                // WHEN
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                // wait for a small time to let the child process fail to exit
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 150); })];
            case 4:
                // wait for a small time to let the child process fail to exit
                _a.sent();
                (0, vitest_1.expect)(s.listTraces().every(function (t) { return t.data.error === undefined; })).toBe(true);
                return [2 /*return*/];
        }
    });
}); }, 10000);
(0, vitest_1.test)("invoke function with environment variables", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, PAYLOAD, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Function(app, "my_function", INFLIGHT_CODE, {
                    env: {
                        PIG_LATIN: "true",
                    },
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_function");
                PAYLOAD = { name: "Alice" };
                return [4 /*yield*/, client.invoke(JSON.stringify(PAYLOAD))];
            case 2:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(JSON.stringify({
                    msg: "Ellohay, ".concat(PAYLOAD.name, "!"),
                }));
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("invoke function fails", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, PAYLOAD;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Function(app, "my_function", INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_function");
                PAYLOAD = { name: "alice" };
                return [4 /*yield*/, (0, vitest_1.expect)(client.invoke(JSON.stringify(PAYLOAD))).rejects.toThrow("Name must start with uppercase letter")];
            case 2:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(s.listTraces()[1].data.error).toMatchObject({
                    message: "Name must start with uppercase letter",
                });
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("function has no display hidden property", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, func;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Function(app, "my_function", INFLIGHT_CODE);
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        func = app.node.tryFindChild("my_function");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(func).hidden).toBeUndefined();
        (0, vitest_1.expect)(treeJson.tree.children).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).not.toMatchObject({
            my_function: {
                display: {
                    hidden: vitest_1.expect.any(Boolean),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("function has display title and description properties", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, func;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Function(app, "my_function", INFLIGHT_CODE);
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        func = app.node.tryFindChild("my_function");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(func).title).toBeDefined();
        (0, vitest_1.expect)(std_1.Node.of(func).description).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).toMatchObject({
            my_function: {
                display: {
                    title: vitest_1.expect.any(String),
                    description: vitest_1.expect.any(String),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("invoke function with process.exit(1)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, client, PAYLOAD;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Function(app, "my_function", INFLIGHT_PANIC);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                client = s.getResource("/my_function");
                PAYLOAD = {};
                return [4 /*yield*/, (0, vitest_1.expect)(client.invoke(JSON.stringify(PAYLOAD))).rejects.toThrow("Process exited with code 1, signal null")];
            case 2:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(s.listTraces()[1].data.error).toMatchObject({
                    message: "Process exited with code 1, signal null",
                });
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("runtime environment tests", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, urlSearchParamsFn, fetchFn, cryptoFn, esmModulesFn, s, _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                app = new sim_app_1.SimApp();
                urlSearchParamsFn = app.newCloudFunction((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var query, p, value;
                    return __generator(this, function (_a) {
                        query = "q=URLUtils.searchParams&topic=api";
                        p = new URLSearchParams(query);
                        value = p.get("topic");
                        if (!value) {
                            throw new Error("URLSearchParams failed");
                        }
                        return [2 /*return*/, value];
                    });
                }); }));
                fetchFn = app.newCloudFunction((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, typeof fetch];
                }); }); }));
                cryptoFn = app.newCloudFunction((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var c;
                    return __generator(this, function (_a) {
                        c = require("crypto");
                        return [2 /*return*/, typeof c.createHash];
                    });
                }); }));
                esmModulesFn = app.newCloudFunction((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    var nanoid;
                    return __generator(this, function (_a) {
                        nanoid = require("nanoid").nanoid;
                        return [2 /*return*/, nanoid()];
                    });
                }); }));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _e.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, cryptoFn(s)];
            case 2:
                _a.apply(void 0, [_e.sent()]).toEqual("function");
                _b = vitest_1.expect;
                return [4 /*yield*/, urlSearchParamsFn(s)];
            case 3:
                _b.apply(void 0, [_e.sent()]).toBe("api");
                _c = vitest_1.expect;
                return [4 /*yield*/, fetchFn(s)];
            case 4:
                _c.apply(void 0, [_e.sent()]).toEqual("function");
                _d = vitest_1.expect;
                return [4 /*yield*/, esmModulesFn(s)];
            case 5:
                _d.apply(void 0, [_e.sent()]).toHaveLength(21);
                return [4 /*yield*/, s.stop()];
            case 6:
                _e.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("__dirname and __filename cannot be used within inflight code", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, dirnameInvoker, filenameInvoker, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                dirnameInvoker = app.newCloudFunction((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, __dirname];
                }); }); }));
                filenameInvoker = app.newCloudFunction((0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, __filename];
                }); }); }));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                return [4 /*yield*/, dirnameInvoker(s)];
            case 2:
                _a.sent();
                return [4 /*yield*/, filenameInvoker(s)];
            case 3:
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 4:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s).filter(function (m) {
                    return m.includes("Warning: __dirname and __filename cannot be used within bundled cloud functions.");
                })).toHaveLength(2);
                return [2 /*return*/];
        }
    });
}); });

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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var inspector = require("inspector");
var constructs_1 = require("constructs");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var target_sim_1 = require("../../src/target-sim");
var sim_app_1 = require("../sim-app");
var util_1 = require("../util");
var NOOP = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); });
var NOOP2 = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("noop2");
        return [2 /*return*/];
    });
}); });
var OK_200 = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ({ status: 200 })];
}); }); });
(0, vitest_1.describe)("run single test", function () {
    (0, vitest_1.test)("test not found", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, testRunner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp({ isTestEnvironment: true });
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, (0, vitest_1.expect)(testRunner.runTest("test_not_found")).rejects.toThrowError('No test found at path "test_not_found"')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, testRunner, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp({ isTestEnvironment: true });
                    makeTest(app, "test", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, console.log("hi")];
                    }); }); }));
                    app.synth();
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, testRunner.runTest("root/test")];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(sanitizeResult(result)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("test failure", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, testRunner, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp({ isTestEnvironment: true });
                    makeTest(app, "test", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log("I am about to fail");
                            throw new Error("test failed");
                        });
                    }); }));
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, testRunner.runTest("root/test")];
                case 2:
                    result = _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(sanitizeResult(result)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("not a function", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, testRunner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp({ isTestEnvironment: true });
                    new cloud_1.Bucket(app, "test");
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, (0, vitest_1.expect)(testRunner.runTest("root/test")).rejects.toThrowError('No test found at path "root/test"')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, vitest_1.describe)("run all tests", function () {
    (0, vitest_1.test)("no tests", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, testRunner, tests;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp({ isTestEnvironment: true });
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, testRunner.listTests()];
                case 2:
                    tests = _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(tests).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("single test", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, testRunner, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp({ isTestEnvironment: true });
                    makeTest(app, "test", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, console.log("hi")];
                    }); }); }));
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, runAllTests(testRunner)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(results.map(sanitizeResult)).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("multiple tests", function () { return __awaiter(void 0, void 0, void 0, function () {
        var Root, app, sim, testRunner, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Root = /** @class */ (function (_super) {
                        __extends(Root, _super);
                        function Root(scope, id) {
                            var _this = _super.call(this, scope, id) || this;
                            makeTest(_this, "test", (0, core_1.inflight)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, console.log("hi")];
                            }); }); }));
                            makeTest(_this, "test:bla", (0, core_1.inflight)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, console.log("hi")];
                            }); }); }));
                            makeTest(_this, "test:blue", (0, core_1.inflight)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, console.log("hi")];
                            }); }); }));
                            return _this;
                        }
                        return Root;
                    }(constructs_1.Construct));
                    app = new sim_app_1.SimApp({ isTestEnvironment: true, rootConstruct: Root });
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, runAllTests(testRunner)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(results.length).toEqual(3);
                    (0, vitest_1.expect)(results.map(function (r) { return r.path; }).sort()).toStrictEqual([
                        "root/env0/test",
                        "root/env1/test:bla",
                        "root/env2/test:blue",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("tests with same name in different scopes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var ConstructWithTest, Root, app, sim, testRunner, results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ConstructWithTest = /** @class */ (function (_super) {
                        __extends(ConstructWithTest, _super);
                        function ConstructWithTest(scope, id) {
                            var _this = _super.call(this, scope, id) || this;
                            makeTest(_this, "test", (0, core_1.inflight)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, console.log("hi")];
                            }); }); }));
                            return _this;
                        }
                        return ConstructWithTest;
                    }(constructs_1.Construct));
                    Root = /** @class */ (function (_super) {
                        __extends(Root, _super);
                        function Root(scope, id) {
                            var _this = _super.call(this, scope, id) || this;
                            makeTest(_this, "test", (0, core_1.inflight)(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                return [2 /*return*/, console.log("hi")];
                            }); }); }));
                            new ConstructWithTest(_this, "scope1");
                            new ConstructWithTest(_this, "scope2");
                            return _this;
                        }
                        return Root;
                    }(constructs_1.Construct));
                    app = new sim_app_1.SimApp({ isTestEnvironment: true, rootConstruct: Root });
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    testRunner = sim.getResource("/cloud.TestRunner");
                    return [4 /*yield*/, runAllTests(testRunner)];
                case 2:
                    results = _a.sent();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(results.length).toEqual(3);
                    (0, vitest_1.expect)(results.map(function (r) { return r.path; }).sort()).toStrictEqual([
                        "root/env0/test",
                        "root/env1/scope1/test",
                        "root/env2/scope2/test",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, vitest_1.test)("await client is a no-op", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, sim, bucketClient, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud_1.Bucket(app, "test");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _b.sent();
                bucketClient = sim.getResource("/test");
                _a = vitest_1.expect;
                return [4 /*yield*/, bucketClient];
            case 2:
                _a.apply(void 0, [_b.sent()]).toBe(bucketClient);
                return [4 /*yield*/, sim.stop()];
            case 3:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("calling an invalid method returns an error to the client", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, sim, bucketClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud_1.Bucket(app, "test");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                bucketClient = sim.getResource("/test");
                return [4 /*yield*/, (0, vitest_1.expect)(bucketClient.invalidMethod()).rejects.toThrowError(/Method "invalidMethod" not found on resource/)];
            case 2:
                _a.sent();
                return [4 /*yield*/, sim.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("provides raw tree data", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, sim, treeData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                makeTest(app, "test", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, console.log("hi")];
                }); }); }));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                treeData = sim.tree().rawData();
                return [4 /*yield*/, sim.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(treeData).toBeDefined();
                (0, vitest_1.expect)(treeData).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("unable to resolve token during initialization", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, state, bucket, error, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                state = new target_sim_1.State(app, "State");
                bucket = new cloud_1.Bucket(app, "Bucket");
                bucket.addObject("url.txt", state.token("my_token"));
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, app.startSimulator()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                error = e_1;
                return [3 /*break*/, 4];
            case 4:
                (0, vitest_1.expect)(error).toBeDefined();
                (0, vitest_1.expect)(error.message).toMatch(/Failed to start resources: \"root\/Bucket\", "root\/Bucket\/Policy\"/);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.describe)("in-place updates", function () {
    (0, vitest_1.test)("no change", function () { return __awaiter(void 0, void 0, void 0, function () {
        var stateDir, app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateDir = (0, util_1.mkdtemp)();
                    app = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app, "Bucket1");
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app2, "Bucket1");
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: [],
                        deleted: [],
                        updated: [],
                    });
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "Update: 0 added, 0 updated, 0 deleted",
                    ]);
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("add", function () { return __awaiter(void 0, void 0, void 0, function () {
        var stateDir, app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateDir = (0, util_1.mkdtemp)();
                    app = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app, "Bucket1");
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app2, "Bucket1");
                    new cloud_1.Bucket(app2, "Bucket2");
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: ["root/Bucket2", "root/Bucket2/Policy"],
                        deleted: [],
                        updated: [],
                    });
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                        "root/Bucket2",
                        "root/Bucket2/Policy",
                    ]);
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "Update: 2 added, 0 updated, 0 deleted",
                        "root/Bucket2 started",
                        "root/Bucket2/Policy started",
                    ]);
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("delete", function () { return __awaiter(void 0, void 0, void 0, function () {
        var stateDir, app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateDir = (0, util_1.mkdtemp)();
                    app = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app, "Bucket1");
                    new cloud_1.Bucket(app, "Bucket2");
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                        "root/Bucket2",
                        "root/Bucket2/Policy",
                    ]);
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "root/Bucket2 started",
                        "root/Bucket2/Policy started",
                    ]);
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app2, "Bucket1");
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: [],
                        deleted: ["root/Bucket2", "root/Bucket2/Policy"],
                        updated: [],
                    });
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "root/Bucket2 started",
                        "root/Bucket2/Policy started",
                        "Update: 0 added, 0 updated, 2 deleted",
                        "root/Bucket2/Policy stopped",
                        "root/Bucket2 stopped",
                    ]);
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("update", function () { return __awaiter(void 0, void 0, void 0, function () {
        var stateDir, app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateDir = (0, util_1.mkdtemp)();
                    app = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app, "Bucket1");
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    (0, vitest_1.expect)(sim.getResourceConfig("root/Bucket1").props.public).toBeFalsy();
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app2, "Bucket1", { public: true });
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: [],
                        deleted: [],
                        updated: ["root/Bucket1"],
                    });
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "Update: 0 added, 1 updated, 0 deleted",
                        "root/Bucket1/Policy stopped",
                        "root/Bucket1 stopped",
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    (0, vitest_1.expect)(sim.getResourceConfig("root/Bucket1").props.public).toBeTruthy();
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("add resource that depends on an existing resource", function () { return __awaiter(void 0, void 0, void 0, function () {
        var stateDir, app, sim, app2, bucket1, api, handler, app2Dir, bucketClient, urlFromBucket, functionClient, ret;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stateDir = (0, util_1.mkdtemp)();
                    app = new sim_app_1.SimApp();
                    new cloud_1.Bucket(app, "Bucket1");
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                    ]);
                    (0, vitest_1.expect)(sim.getResourceConfig("root/Bucket1").props.public).toBeFalsy();
                    app2 = new sim_app_1.SimApp();
                    bucket1 = new cloud_1.Bucket(app2, "Bucket1");
                    api = new cloud_1.Api(app2, "Api");
                    bucket1.addObject("url.txt", api.url);
                    handler = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, process.env.API_URL];
                    }); }); });
                    new cloud_1.Function(app2, "Function", handler, {
                        env: { API_URL: api.url },
                    });
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: [
                            "root/Api",
                            "root/Api/Endpoint",
                            "root/Api/Policy",
                            "root/Function",
                        ],
                        deleted: [],
                        updated: ["root/Bucket1"],
                    });
                    (0, vitest_1.expect)(simTraces(sim)).toStrictEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "Update: 4 added, 1 updated, 0 deleted",
                        "root/Bucket1/Policy stopped",
                        "root/Bucket1 stopped",
                        "root/Api started",
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "root/Api/Endpoint started",
                        "root/Api/Policy started",
                        "root/Function started",
                    ]);
                    (0, vitest_1.expect)(sim.listResources()).toEqual([
                        "root/Api",
                        "root/Api/Endpoint",
                        "root/Api/Policy",
                        "root/Bucket1",
                        "root/Bucket1/Policy",
                        "root/Function",
                    ]);
                    bucketClient = sim.getResource("root/Bucket1");
                    return [4 /*yield*/, bucketClient.get("url.txt")];
                case 3:
                    urlFromBucket = _a.sent();
                    (0, vitest_1.expect)(urlFromBucket.startsWith("http://127.0.0")).toBeTruthy();
                    functionClient = sim.getResource("root/Function");
                    return [4 /*yield*/, functionClient.invoke()];
                case 4:
                    ret = _a.sent();
                    (0, vitest_1.expect)(ret).toEqual(urlFromBucket);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("retained resource is not removed", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, api1, bucket1, stateDir, sim, urlBeforeUpdate, app2, api2, bucket2, app2Dir, urlAfterUpdate;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    api1 = new cloud_1.Api(app, "Api");
                    bucket1 = new cloud_1.Bucket(app, "Bucket");
                    bucket1.addObject("url.txt", api1.url);
                    stateDir = (0, util_1.mkdtemp)();
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    return [4 /*yield*/, sim.getResource("root/Bucket").get("url.txt")];
                case 2:
                    urlBeforeUpdate = _a.sent();
                    // remove the state directory otherwise Api reuses the port
                    fs.rmdirSync(sim.getResourceStateDir("/Api"), { recursive: true });
                    app2 = new sim_app_1.SimApp();
                    api2 = new cloud_1.Api(app2, "Api");
                    bucket2 = new cloud_1.Bucket(app2, "Bucket", { public: true });
                    bucket2.addObject("url.txt", api2.url);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: [],
                        deleted: [],
                        updated: ["root/Bucket"],
                    });
                    return [4 /*yield*/, sim.getResource("root/Bucket").get("url.txt")];
                case 4:
                    urlAfterUpdate = _a.sent();
                    (0, vitest_1.expect)(urlBeforeUpdate).toStrictEqual(urlAfterUpdate);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("dependent resource is replaced when a dependency is replaced", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, myApi, myBucket, stateDir, sim, app2, myApi2, myBucket2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    myApi = new cloud_1.Api(app, "Api1");
                    myBucket = new cloud_1.Bucket(app, "Bucket1");
                    // BUCKET depends on API
                    myBucket.addObject("url.txt", myApi.url);
                    stateDir = (0, util_1.mkdtemp)();
                    return [4 /*yield*/, app.startSimulator(stateDir)];
                case 1:
                    sim = _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Api1 started",
                        "root/Api1/Endpoint started",
                        "root/Api1/Policy started",
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    app2 = new sim_app_1.SimApp();
                    myApi2 = new cloud_1.Api(app2, "Api1", { cors: true });
                    myBucket2 = new cloud_1.Bucket(app2, "Bucket1");
                    myBucket2.addObject("url.txt", myApi2.url);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(updateTrace(sim)).toStrictEqual({
                        added: [],
                        deleted: [],
                        updated: ["root/Api1"], // TODO: shouldn't Bucket also be listed here?
                    });
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Api1 started",
                        "root/Api1/Endpoint started",
                        "root/Api1/Policy started",
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "Update: 0 added, 1 updated, 0 deleted",
                        "root/Api1/Endpoint stopped",
                        "root/Api1/Policy stopped",
                        "root/Bucket1/Policy stopped",
                        "root/Bucket1 stopped",
                        "root/Api1 stopped",
                        "root/Api1 started",
                        "root/Api1/Endpoint started",
                        "root/Api1/Policy started",
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                    ]);
                    return [4 /*yield*/, sim.stop()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("token value is changed across an update", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, stateKey, myState, sim, fn, result, app2, myState2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    stateKey = "my_value";
                    myState = new target_sim_1.State(app, "State");
                    new cloud_1.Service(app, "Service", (0, core_1.lift)({ myState: myState, stateKey: stateKey })
                        .grant({ myState: ["set"] })
                        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.myState.set("".concat(ctx.stateKey), "bang")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }), { env: { VER: "1" } });
                    new cloud_1.Function(app, "Function", (0, core_1.inflight)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, process.env.MY_VALUE];
                    }); }); }), {
                        env: { MY_VALUE: myState.token(stateKey) },
                    });
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    fn = sim.getResource("root/Function");
                    return [4 /*yield*/, fn.invoke()];
                case 2:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toEqual("bang");
                    app2 = new sim_app_1.SimApp();
                    myState2 = new target_sim_1.State(app2, "State");
                    new cloud_1.Service(app2, "Service", (0, core_1.lift)({ myState: myState2, stateKey: stateKey })
                        .grant({ myState: ["set"] })
                        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, ctx.myState.set("".concat(ctx.stateKey), "bing")];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }), { env: { VER: "2" } });
                    new cloud_1.Function(app2, "Function", (0, core_1.inflight)(function (ctx) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, process.env.MY_VALUE];
                    }); }); }), {
                        env: { MY_VALUE: myState.token(stateKey) },
                    });
                    return [4 /*yield*/, sim.update(app2.synth())];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/State started",
                        "root/State.my_value = bang",
                        "root/Service started",
                        "root/Function started",
                        "Update: 0 added, 1 updated, 0 deleted",
                        "root/Service stopped",
                        "root/State.my_value = bing",
                        "root/Service started",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("Construct dependencies are taken into account", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, bucket, sim, app2, bucket2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    bucket = new cloud_1.Bucket(app, "Bucket1");
                    new cloud_1.OnDeploy(app, "OnDeploy", NOOP, {
                        executeAfter: [bucket],
                    });
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    app2 = new sim_app_1.SimApp();
                    bucket2 = new cloud_1.Bucket(app2, "Bucket1", { public: true });
                    new cloud_1.OnDeploy(app2, "OnDeploy", NOOP, {
                        executeAfter: [bucket2],
                    });
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "root/OnDeploy/Function started",
                        "root/OnDeploy started",
                        "Update: 0 added, 2 updated, 0 deleted",
                        "root/Bucket1/Policy stopped",
                        "root/OnDeploy stopped",
                        "root/Bucket1 stopped",
                        "root/Bucket1 started",
                        "root/Bucket1/Policy started",
                        "root/OnDeploy started",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("cloud.Function is not replaced if its inflight code does not change", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    new cloud_1.Function(app, "Function", NOOP);
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.Function(app2, "Function", NOOP);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Function started",
                        "Update: 0 added, 0 updated, 0 deleted",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("cloud.Function is replaced if its inflight code changes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var outdir, app, sim, fn, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outdir = (0, util_1.mkdtemp)();
                    console.log("outdir", outdir);
                    app = new sim_app_1.SimApp({ outdir: outdir });
                    new cloud_1.Function(app, "Function", NOOP);
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    fn = sim.getResource("/Function");
                    return [4 /*yield*/, fn.invoke()];
                case 2:
                    _a.sent();
                    app2 = new sim_app_1.SimApp({ outdir: outdir });
                    new cloud_1.Function(app2, "Function", NOOP2);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 3:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Function started",
                        "Update: 0 added, 1 updated, 0 deleted",
                        "root/Function stopped",
                        "root/Function started",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("cloud.Service is not replaced if its inflight code does not change", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    new cloud_1.Service(app, "Service", NOOP);
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.Service(app2, "Service", NOOP);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Service started",
                        "Update: 0 added, 0 updated, 0 deleted",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("cloud.Service is replaced if its inflight code changes", function () { return __awaiter(void 0, void 0, void 0, function () {
        var outdir, app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    outdir = (0, util_1.mkdtemp)();
                    app = new sim_app_1.SimApp({ outdir: outdir });
                    new cloud_1.Service(app, "Service", NOOP);
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    app2 = new sim_app_1.SimApp({ outdir: outdir });
                    new cloud_1.Service(app2, "Service", NOOP2);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Service started",
                        "Update: 0 added, 1 updated, 0 deleted",
                        "root/Service stopped",
                        "root/Service started",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("cloud.OnDeploy is always replaced", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, sim, app2, app2Dir;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    new cloud_1.OnDeploy(app, "OnDeploy", NOOP);
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    app2 = new sim_app_1.SimApp();
                    new cloud_1.OnDeploy(app2, "OnDeploy", NOOP);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/OnDeploy/Function started",
                        "root/OnDeploy started",
                        "Update: 0 added, 1 updated, 0 deleted",
                        "root/OnDeploy stopped",
                        "root/OnDeploy started",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("cloud.Api routes are updated", function () { return __awaiter(void 0, void 0, void 0, function () {
        var app, api, sim, apiUrl, response1, app2, api2, app2Dir, response2, response3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    api = new cloud_1.Api(app, "Api");
                    api.get("/hello", OK_200);
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    apiUrl = sim.getResourceConfig("/Api").attrs.url;
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/hello"), { method: "GET" })];
                case 2:
                    response1 = _a.sent();
                    (0, vitest_1.expect)(response1.status).toEqual(200);
                    app2 = new sim_app_1.SimApp();
                    api2 = new cloud_1.Api(app2, "Api");
                    api2.get("/world", OK_200);
                    app2Dir = app2.synth();
                    return [4 /*yield*/, sim.update(app2Dir)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/hello"), { method: "GET" })];
                case 4:
                    response2 = _a.sent();
                    (0, vitest_1.expect)(response2.status).toEqual(404);
                    return [4 /*yield*/, fetch("".concat(apiUrl, "/world"), { method: "GET" })];
                case 5:
                    response3 = _a.sent();
                    (0, vitest_1.expect)(response3.status).toEqual(200);
                    (0, vitest_1.expect)(simTraces(sim)).toEqual([
                        "root/Api started",
                        "root/Api/Endpoint started",
                        "root/Api/OnRequestHandler0 started",
                        "root/Api/Policy started",
                        "root/Api/ApiEventMapping0 started",
                        "Update: 0 added, 2 updated, 0 deleted",
                        "root/Api/Endpoint stopped",
                        "root/Api/Policy stopped",
                        "root/Api/ApiEventMapping0 stopped",
                        "root/Api stopped",
                        "root/Api started",
                        "root/Api/Endpoint started",
                        "root/Api/Policy started",
                        "root/Api/ApiEventMapping0 started",
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, vitest_1.test)("debugging inspector inherited by sandbox", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, handler, sim;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                handler = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        if (require("inspector").url() === undefined) {
                            throw new Error("inspector not available");
                        }
                        return [2 /*return*/];
                    });
                }); });
                new cloud_1.OnDeploy(app, "OnDeploy", handler);
                inspector.open(0);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                return [4 /*yield*/, sim.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(sim
                    .listTraces()
                    .some(function (t) { return t.data.message.startsWith("Debugger listening on "); }));
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("tryGetResource returns undefined if the resource not found", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, sim;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                (0, vitest_1.expect)(sim.tryGetResource("bang")).toBeUndefined();
                (0, vitest_1.expect)(sim.tryGetResourceConfig("bing")).toBeUndefined();
                return [2 /*return*/];
        }
    });
}); });
function makeTest(scope, id, handler) {
    return new std_1.Test(scope, id, handler);
}
function sanitizeResult(result) {
    var error;
    if (result.error) {
        error = result.error.split("\n")[0];
    }
    return {
        path: result.path,
        pass: result.pass,
        error: error,
        traces: result.traces.map(function (trace) { return (__assign(__assign({}, trace), { timestamp: "<TIMESTAMP>" })); }),
    };
}
function runAllTests(runner) {
    return __awaiter(this, void 0, void 0, function () {
        var results, _i, _a, testName, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    results = [];
                    _i = 0;
                    return [4 /*yield*/, runner.listTests()];
                case 1:
                    _a = _d.sent();
                    _d.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    testName = _a[_i];
                    _c = (_b = results).push;
                    return [4 /*yield*/, runner.runTest(testName)];
                case 3:
                    _c.apply(_b, [_d.sent()]);
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, results];
            }
        });
    });
}
function simTraces(s) {
    return s
        .listTraces()
        .filter(function (t) { return t.type === std_1.TraceType.SIMULATOR; })
        .map(function (t) { return t.data.message; });
}
function updateTrace(s) {
    var _a;
    return (_a = s
        .listTraces()
        .find(function (t) { return t.type === std_1.TraceType.SIMULATOR && t.data.update; })) === null || _a === void 0 ? void 0 : _a.data.update;
}

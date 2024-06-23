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
var fs_1 = require("fs");
var path_1 = require("path");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var container_1 = require("../../src/target-sim/container");
var sim_app_1 = require("../sim-app");
var util_1 = require("../util");
(0, vitest_1.test)("simple container from registry", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c, sim, fn, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                c = new container_1.Container(app, "Container", {
                    name: "http-echo",
                    image: "hashicorp/http-echo",
                    containerPort: 5678,
                    args: ["-text=bang"],
                });
                new cloud_1.Function(app, "Function", httpGet(c));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                sim.onTrace({ callback: function (trace) { return console.log(">", trace.data.message); } });
                fn = sim.getResource("root/Function");
                return [4 /*yield*/, fn.invoke()];
            case 2:
                response = _a.sent();
                (0, vitest_1.expect)(response).toStrictEqual("bang\n");
                return [4 /*yield*/, sim.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("simple container from a dockerfile", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c, sim, fn, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                c = new container_1.Container(app, "Container", {
                    name: "my-app",
                    image: (0, path_1.join)(__dirname, "my-docker-image"),
                    containerPort: 3000,
                });
                new cloud_1.Function(app, "Function", httpGet(c));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                sim.onTrace({ callback: function (trace) { return console.log(">", trace.data.message); } });
                fn = sim.getResource("root/Function");
                return [4 /*yield*/, fn.invoke()];
            case 2:
                response = _a.sent();
                (0, vitest_1.expect)(response).toStrictEqual("Hello, Wingnuts!");
                return [4 /*yield*/, sim.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("no port, no urls", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        c = new container_1.Container(app, "Container", {
            name: "my-app",
            image: "bla",
        });
        (0, vitest_1.expect)(c.hostPort).toBeUndefined();
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("no public url", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        c = new container_1.Container(app, "Container", {
            name: "my-app",
            image: "bla",
        });
        (0, vitest_1.expect)(c.hostPort).toBeUndefined();
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("rebuild only if content had changes", function () { return __awaiter(void 0, void 0, void 0, function () {
    var workdir, MyApp, app1, r1, app2, r2, app3, r3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                workdir = (0, util_1.mkdtemp)();
                (0, fs_1.cpSync)((0, path_1.join)(__dirname, "my-docker-image"), workdir, { recursive: true });
                MyApp = /** @class */ (function (_super) {
                    __extends(MyApp, _super);
                    function MyApp() {
                        var _this = _super.call(this) || this;
                        var c = new container_1.Container(_this, "Container", {
                            name: "my-app",
                            image: workdir,
                            containerPort: 3000,
                        });
                        return _this;
                    }
                    MyApp.prototype.cycle = function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var sim;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.startSimulator()];
                                    case 1:
                                        sim = _a.sent();
                                        return [4 /*yield*/, sim.stop()];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/, sim.listTraces().map(function (t) { return t.data.message; })];
                                }
                            });
                        });
                    };
                    return MyApp;
                }(sim_app_1.SimApp));
                app1 = new MyApp();
                return [4 /*yield*/, app1.cycle()];
            case 1:
                r1 = _a.sent();
                app2 = new MyApp();
                return [4 /*yield*/, app2.cycle()];
            case 2:
                r2 = _a.sent();
                (0, vitest_1.expect)(r2[1]).toBe("Image my-app:a9ae83b54b1ec21faa1a3255f05c095c found, No need to build or pull.");
                // add a file to the workdir and see that we are rebuilding
                (0, fs_1.writeFileSync)((0, path_1.join)(workdir, "new-file"), "".concat(new Date().toISOString(), "-").concat(Math.random() * 9999));
                app3 = new MyApp();
                return [4 /*yield*/, app3.cycle()];
            case 3:
                r3 = _a.sent();
                (0, vitest_1.expect)(r3[1]).toContain("Building ");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("simple container with a volume", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c, sim, fn, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                c = new container_1.Container(app, "Container", {
                    name: "my-app",
                    image: (0, path_1.join)(__dirname, "my-docker-image.volume"),
                    containerPort: 3000,
                    volumes: ["".concat(__dirname, ":/tmp")],
                });
                new cloud_1.Function(app, "Function", httpGet(c));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                sim.onTrace({ callback: function (trace) { return console.log(">", trace.data.message); } });
                fn = sim.getResource("root/Function");
                return [4 /*yield*/, fn.invoke()];
            case 2:
                response = _a.sent();
                (0, vitest_1.expect)(response).contains((0, path_1.basename)(__filename));
                return [4 /*yield*/, sim.stop()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("anonymous volume can be reused across restarts", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, c, sim, fn, response, fn2, response2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                c = new container_1.Container(app, "Container", {
                    name: "my-app",
                    image: (0, path_1.join)(__dirname, "my-docker-image.mounted-volume"),
                    containerPort: 3000,
                    volumes: ["/tmp"],
                });
                new cloud_1.Function(app, "Function", httpGet(c));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                sim.onTrace({
                    callback: function (trace) { var _a, _b, _c; return console.log(">", (_c = (_b = (_a = trace.data) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.stack) !== null && _c !== void 0 ? _c : trace.data.message); },
                });
                fn = sim.getResource("root/Function");
                return [4 /*yield*/, fn.invoke()];
            case 2:
                response = _a.sent();
                (0, vitest_1.expect)(response === null || response === void 0 ? void 0 : response.split("\n").filter(function (s) { return s.endsWith(".txt"); })).toEqual([
                    "hello.txt",
                ]);
                return [4 /*yield*/, sim.stop()];
            case 3:
                _a.sent();
                return [4 /*yield*/, sim.start()];
            case 4:
                _a.sent();
                fn2 = sim.getResource("root/Function");
                return [4 /*yield*/, fn2.invoke()];
            case 5:
                response2 = _a.sent();
                (0, vitest_1.expect)(response2 === null || response2 === void 0 ? void 0 : response2.split("\n").filter(function (s) { return s.endsWith(".txt"); })).toEqual([
                    "hello.txt",
                    "world.txt",
                ]);
                return [2 /*return*/];
        }
    });
}); });
function httpGet(c) {
    var _this = this;
    return (0, core_1.lift)({ hostPort: c.hostPort }).inflight(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
        var url, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "http://localhost:" + ctx.hostPort;
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [2 /*return*/, res.text()];
            }
        });
    }); });
}

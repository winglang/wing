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
var cp = require("child_process");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var sim_app_1 = require("../sim-app");
var script = function (simdir) { return "\nconst { simulator } = require(\"./src\");\n\nasync function main() {\n  const sim = new simulator.Simulator({ simfile: \"".concat(simdir, "\" });\n  sim.onTrace({\n    callback: (trace) => {\n      console.log(trace.data.message);\n    },\n  });\n  console.log(\"Starting simulator\");\n  await sim.start();\n  console.log(\"Simulator started\");\n\n  process.on(\"SIGTERM\", async () => {\n    console.log(\"SIGTERM received, stopping simulator...\");\n    await sim.stop();\n    process.exit(1);\n  });\n}\n\nmain();\n"); };
var code = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () {
    var sleep;
    return __generator(this, function (_a) {
        console.log("start!");
        sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
        return [2 /*return*/, function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            console.log("stopping...");
                            return [4 /*yield*/, sleep(1000)];
                        case 1:
                            _a.sent();
                            console.log("stopped!");
                            return [2 /*return*/];
                    }
                });
            }); }];
    });
}); });
// This test validates that if a process running the simulator is killed
// and that process has code set up for gracefully shutting down the simulator,
// then the simulator will be stopped correctly (including child processes
// like services).
(0, vitest_1.test)("simulator cleanup", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, simdir, child, stopped, stoppedPromise;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                app = new sim_app_1.SimApp({ isTestEnvironment: true });
                new cloud_1.Service(app, "Service", code);
                simdir = app.synth();
                child = cp.spawn(process.argv0, ["-e", script(simdir)], {
                    stdio: ["pipe", "pipe", "pipe"],
                });
                (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                    console.error(data.toString());
                });
                (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                    console.error(data.toString());
                });
                stopped = false;
                stoppedPromise = new Promise(function (resolve) {
                    var _a, _b;
                    (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                        if (data.toString().includes("stopped!")) {
                            stopped = true;
                            resolve(undefined);
                        }
                    });
                    (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                        if (data.toString().includes("stopped!")) {
                            stopped = true;
                            resolve(undefined);
                        }
                    });
                });
                // Wait for the "Simulator started" message, then kill the child process
                return [4 /*yield*/, new Promise(function (resolve) {
                        var _a, _b;
                        (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on("data", function (data) {
                            if (data.toString().includes("Simulator started")) {
                                child.kill("SIGTERM");
                                resolve(undefined);
                            }
                        });
                        (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on("data", function (data) {
                            if (data.toString().includes("Simulator started")) {
                                child.kill("SIGTERM");
                                resolve(undefined);
                            }
                        });
                    })];
            case 1:
                // Wait for the "Simulator started" message, then kill the child process
                _c.sent();
                // Wait for the "stopped!" message from cloud.Service (running in a grandchild process)
                return [4 /*yield*/, stoppedPromise];
            case 2:
                // Wait for the "stopped!" message from cloud.Service (running in a grandchild process)
                _c.sent();
                (0, vitest_1.expect)(stopped).toBe(true);
                return [2 /*return*/];
        }
    });
}); });

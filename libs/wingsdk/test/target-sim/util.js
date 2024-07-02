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
exports.waitUntilTraceCount = exports.waitUntilTrace = exports.sleep = exports.listMessages = exports.treeJsonOf = exports.simulatorJsonOf = exports.readJsonSync = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function readJsonSync(file) {
    return JSON.parse((0, fs_1.readFileSync)(file, "utf-8"));
}
exports.readJsonSync = readJsonSync;
function simulatorJsonOf(simdir) {
    var simJson = (0, path_1.join)(simdir, "simulator.json");
    if (!(0, fs_1.existsSync)(simJson)) {
        throw new Error("Invalid Wing app (".concat(simdir, ") - simulator.json not found."));
    }
    return readJsonSync(simJson);
}
exports.simulatorJsonOf = simulatorJsonOf;
function treeJsonOf(simdir) {
    var treeJson = (0, path_1.join)(simdir, "tree.json");
    if (!(0, fs_1.existsSync)(treeJson)) {
        throw new Error("Invalid Wing app (".concat(simdir, ") - tree.json not found."));
    }
    return readJsonSync(treeJson);
}
exports.treeJsonOf = treeJsonOf;
function listMessages(s) {
    var message = s.listTraces().map(function (trace) { return trace.data.message; });
    // Redact any messages containing port numbers
    return message.map(function (m) {
        return m
            .replace(/wing-container-\w+/g, "wing-container-<container>")
            .replace(/:\d+/, ":<port>");
    });
}
exports.listMessages = listMessages;
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (r) { return setTimeout(r, ms); })];
        });
    });
}
exports.sleep = sleep;
var DEFAULT_WAIT_TIMEOUT = 10000;
var DEFAULT_WAIT_INTERVAL = 150;
/**
 * Wait until the given trace is found in the simulator or throw an error if the timeout is reached.
 */
function waitUntilTrace(sim, fn, timeout) {
    if (timeout === void 0) { timeout = DEFAULT_WAIT_TIMEOUT; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, waitUntilTraceCount(sim, 1, fn, timeout)];
        });
    });
}
exports.waitUntilTrace = waitUntilTrace;
/**
 * Wait until the given trace is found `count` times in the simulator or throw an error if the timeout is reached.
 */
function waitUntilTraceCount(sim, count, fn, timeout) {
    if (timeout === void 0) { timeout = DEFAULT_WAIT_TIMEOUT; }
    return __awaiter(this, void 0, void 0, function () {
        var start;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // wait for a tiny amount of time because you likely want at least 1 event loop tick to pass
                return [4 /*yield*/, sleep(1)];
                case 1:
                    // wait for a tiny amount of time because you likely want at least 1 event loop tick to pass
                    _a.sent();
                    start = Date.now();
                    _a.label = 2;
                case 2:
                    if (!(Date.now() - start < timeout)) return [3 /*break*/, 4];
                    if (sim.listTraces().filter(fn).length >= count) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, sleep(DEFAULT_WAIT_INTERVAL)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 2];
                case 4: throw new Error("Timeout after ".concat(timeout, "ms waiting for ").concat(count, " traces that match `").concat(fn.toString(), "`\nSim Traces: ").concat(JSON.stringify(sim.listTraces())));
            }
        });
    });
}
exports.waitUntilTraceCount = waitUntilTraceCount;

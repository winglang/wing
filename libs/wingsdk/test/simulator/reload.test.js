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
var cloud_1 = require("../../src/cloud");
var testing = require("../../src/simulator");
var std_1 = require("../../src/std");
var app_1 = require("../../src/target-sim/app");
var util_1 = require("../util");
(0, vitest_1.test)("reloading the simulator updates the state of the tree", function () { return __awaiter(void 0, void 0, void 0, function () {
    var workdir, app, bucket1, simfile, s, app2, bucket2;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                workdir = (0, util_1.mkdtemp)();
                app = new app_1.App({ outdir: workdir, entrypointDir: __dirname });
                bucket1 = new cloud_1.Bucket(app, "my_bucket", { public: false });
                std_1.Node.of(bucket1).hidden = false;
                simfile = app.synth();
                s = new testing.Simulator({ simfile: simfile });
                return [4 /*yield*/, s.start()];
            case 1:
                _e.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_bucket").props.public).toEqual(false);
                (0, vitest_1.expect)((_b = (_a = s.tree().rawData().tree.children) === null || _a === void 0 ? void 0 : _a.my_bucket.display) === null || _b === void 0 ? void 0 : _b.hidden).toEqual(false);
                app2 = new app_1.App({ outdir: workdir, entrypointDir: __dirname });
                bucket2 = new cloud_1.Bucket(app2, "my_bucket", { public: true });
                std_1.Node.of(bucket2).hidden = true;
                app2.synth();
                // Reload the simulator
                return [4 /*yield*/, s.reload(false)];
            case 2:
                // Reload the simulator
                _e.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_bucket").props.public).toEqual(true);
                (0, vitest_1.expect)((_d = (_c = s.tree().rawData().tree.children) === null || _c === void 0 ? void 0 : _c.my_bucket.display) === null || _d === void 0 ? void 0 : _d.hidden).toEqual(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("traces are cleared when reloading the simulator with reset state set to true", function () { return __awaiter(void 0, void 0, void 0, function () {
    var workdir, app, simfile, s, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                workdir = (0, util_1.mkdtemp)();
                app = new app_1.App({ outdir: workdir, entrypointDir: __dirname });
                new cloud_1.Bucket(app, "my_bucket", { public: false });
                simfile = app.synth();
                s = new testing.Simulator({ simfile: simfile });
                return [4 /*yield*/, s.start()];
            case 1:
                _a.sent();
                client = s.getResource("/my_bucket");
                return [4 /*yield*/, client.put("traces.txt", "Hello world!")];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(s.listTraces().filter(function (t) { return t.type === "resource"; }).length).toEqual(1);
                // Reload the simulator and reset state
                return [4 /*yield*/, s.reload(true)];
            case 3:
                // Reload the simulator and reset state
                _a.sent();
                (0, vitest_1.expect)(s.listTraces().filter(function (t) { return t.type === "resource"; }).length).toEqual(0);
                return [2 /*return*/];
        }
    });
}); });

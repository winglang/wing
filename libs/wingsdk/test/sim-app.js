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
exports.SimApp = void 0;
var fs = require("fs");
var path_1 = require("path");
var vitest_1 = require("vitest");
var util_1 = require("./util");
var cloud_1 = require("../src/cloud");
var simulator_1 = require("../src/simulator");
var app_1 = require("../src/target-sim/app");
/**
 * A simulated app.
 *
 * A great way to write unit tests for the cloud. Just use this as your base app
 * and then call `app.startSimulator()` to start an instance of this app inside
 * a cloud simulator.
 */
var SimApp = /** @class */ (function (_super) {
    __extends(SimApp, _super);
    function SimApp(props) {
        if (props === void 0) { props = {}; }
        var _this = this;
        var isTestEnvironment = props.isTestEnvironment, rootConstruct = props.rootConstruct, outdir = props.outdir;
        _this = _super.call(this, {
            outdir: outdir !== null && outdir !== void 0 ? outdir : (0, util_1.mkdtemp)(),
            entrypointDir: __dirname,
            isTestEnvironment: isTestEnvironment,
            rootConstruct: rootConstruct,
        }) || this;
        _this._synthesized = false;
        _this.functionIndex = 0;
        // symlink the node_modules so we can test imports and stuffs
        try {
            fs.symlinkSync((0, path_1.join)(__dirname, "..", "node_modules"), (0, path_1.join)(_this.outdir, "node_modules"));
        }
        catch (e) {
            if (e.code !== "EEXIST") {
                throw e;
            }
        }
        return _this;
    }
    /**
     * A helper to define a new cloud.Function within this app.
     * @param code The function body.
     * @returns An "invoker" function which can be used to invoke the function after the simulator had
     * started.
     */
    SimApp.prototype.newCloudFunction = function (handler) {
        var _this = this;
        var id = "Function.".concat(this.functionIndex++);
        new cloud_1.Function(this, id, handler);
        // returns an "invoker" for this function
        return function (s) { return __awaiter(_this, void 0, void 0, function () {
            var fn;
            return __generator(this, function (_a) {
                fn = s.getResource("/" + id);
                return [2 /*return*/, fn.invoke()];
            });
        }); };
    };
    /**
     * Creates a simulator and starts it.
     *
     * @returns A started `Simulator` instance. No need to call `start()` again.
     */
    SimApp.prototype.startSimulator = function (stateDir) {
        return __awaiter(this, void 0, void 0, function () {
            var simfile, s;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.synthIfNeeded();
                        simfile = this.synth();
                        s = new simulator_1.Simulator({ simfile: simfile, stateDir: stateDir });
                        return [4 /*yield*/, s.start()];
                    case 1:
                        _a.sent();
                        // When tests fail, we still want to make sure the simulator is stopped
                        (0, vitest_1.onTestFailed)(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(s._running === "running")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, s.stop()];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/, s];
                }
            });
        });
    };
    /**
     * Takes a snapshot of the output directory, returning a map of filenames to
     * their contents.
     */
    SimApp.prototype.snapshot = function () {
        this.synthIfNeeded();
        return (0, util_1.directorySnapshot)(this.outdir);
    };
    SimApp.prototype.synthIfNeeded = function () {
        if (!this._synthesized) {
            this.synth();
            this._synthesized = true;
        }
    };
    return SimApp;
}(app_1.App));
exports.SimApp = SimApp;

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
var constructs_1 = require("constructs");
var vitest_1 = require("vitest");
var util_1 = require("./util");
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("can create sequential files in a bucket", { timeout: 20000 }, function () { return __awaiter(void 0, void 0, void 0, function () {
    var HelloWorld, app, helloWorld, s, pusher, traceCheck, bucket;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                HelloWorld = /** @class */ (function (_super) {
                    __extends(HelloWorld, _super);
                    function HelloWorld(scope, id) {
                        var _this = _super.call(this, scope, id) || this;
                        var counter = new cloud.Counter(_this, "Counter", {
                            initial: 1000,
                        });
                        var bucket = new cloud.Bucket(_this, "Bucket");
                        var queue = new cloud.Queue(_this, "Queue");
                        _this.processor = queue.setConsumer((0, core_1.lift)({ counter: counter, bucket: bucket })
                            .grant({
                            counter: [cloud.CounterInflightMethods.INC],
                            bucket: [cloud.BucketInflightMethods.PUT],
                        })
                            .inflight(function (ctx, event) { return __awaiter(_this, void 0, void 0, function () {
                            var next, key;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ctx.counter.inc()];
                                    case 1:
                                        next = _a.sent();
                                        key = "file-" + next + ".txt";
                                        return [4 /*yield*/, ctx.bucket.put(key, event)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }));
                        return _this;
                    }
                    return HelloWorld;
                }(constructs_1.Construct));
                app = new sim_app_1.SimApp();
                helloWorld = new HelloWorld(app, "HelloWorld");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                pusher = s.getResource("/HelloWorld/Queue");
                traceCheck = function (trace) {
                    return trace.sourcePath === helloWorld.processor.node.path &&
                        trace.data.status === "success";
                };
                return [4 /*yield*/, pusher.push("kachow!")];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 1, traceCheck)];
            case 3:
                _a.sent();
                return [4 /*yield*/, pusher.push("zoom!")];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 2, traceCheck)];
            case 5:
                _a.sent();
                bucket = s.getResource("/HelloWorld/Bucket");
                return [4 /*yield*/, (0, vitest_1.expect)(bucket.get("file-1000.txt")).resolves.toEqual("kachow!")];
            case 6:
                _a.sent();
                return [4 /*yield*/, (0, vitest_1.expect)(bucket.get("file-1001.txt")).resolves.toEqual("zoom!")];
            case 7:
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 8:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });

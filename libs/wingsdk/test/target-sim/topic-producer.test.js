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
(0, vitest_1.test)("publishing messages to topic", function () { return __awaiter(void 0, void 0, void 0, function () {
    var TopicTest, app, s, publisher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                TopicTest = /** @class */ (function (_super) {
                    __extends(TopicTest, _super);
                    function TopicTest(scope, id) {
                        var _this = _super.call(this, scope, id) || this;
                        var topic = new cloud.Topic(_this, "MyTopic");
                        var publisher = (0, core_1.lift)({ topic: topic })
                            .grant({ topic: [cloud.TopicInflightMethods.PUBLISH] })
                            .inflight(function (ctx, event) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, ctx.topic.publish(event)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        new cloud.Function(_this, "Function", publisher);
                        var processor = (0, core_1.inflight)(function (_, event) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (event.message === "")
                                    throw new Error("No message recieved");
                                console.log("Message received");
                                return [2 /*return*/];
                            });
                        }); });
                        topic.onMessage(processor);
                        return _this;
                    }
                    return TopicTest;
                }(constructs_1.Construct));
                app = new sim_app_1.SimApp();
                new TopicTest(app, "TopicTester");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                publisher = s.getResource("/TopicTester/Function");
                // WHEN
                return [4 /*yield*/, publisher.invoke("ABC")];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 1, function (trace) {
                        return trace.data.message.includes("Message received");
                    })];
            case 3:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("publishing multiple messages to topic", function () { return __awaiter(void 0, void 0, void 0, function () {
    var TopicTest, app, s, publisher;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                TopicTest = /** @class */ (function (_super) {
                    __extends(TopicTest, _super);
                    function TopicTest(scope, id) {
                        var _this = _super.call(this, scope, id) || this;
                        var topic = new cloud.Topic(_this, "MyTopic");
                        var publisher = (0, core_1.lift)({ topic: topic })
                            .grant({ topic: [cloud.TopicInflightMethods.PUBLISH] })
                            .inflight(function (ctx, event) { return __awaiter(_this, void 0, void 0, function () {
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, (_a = ctx.topic).publish.apply(_a, event.split(""))];
                                    case 1:
                                        _b.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        new cloud.Function(_this, "Function", publisher);
                        var processor = (0, core_1.inflight)(function (_, event) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (event.message === "")
                                    throw new Error("No message recieved");
                                return [2 /*return*/];
                            });
                        }); });
                        topic.onMessage(processor);
                        return _this;
                    }
                    return TopicTest;
                }(constructs_1.Construct));
                app = new sim_app_1.SimApp();
                new TopicTest(app, "TopicTester");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                publisher = s.getResource("/TopicTester/Function");
                // WHEN
                return [4 /*yield*/, publisher.invoke("ABC")];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 1, function (trace) {
                        return trace.data.message.includes("A", "B", "C");
                    })];
            case 3:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });

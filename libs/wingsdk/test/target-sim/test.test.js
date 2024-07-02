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
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
var INFLIGHT_CODE = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, console.log("this test should pass!")];
}); }); });
(0, vitest_1.test)("create a test", function () { return __awaiter(void 0, void 0, void 0, function () {
    var Root, app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                Root = /** @class */ (function (_super) {
                    __extends(Root, _super);
                    function Root(scope, id) {
                        var _this = _super.call(this, scope, id) || this;
                        new std_1.Test(_this, "test:my_test", INFLIGHT_CODE);
                        return _this;
                    }
                    return Root;
                }(constructs_1.Construct));
                app = new sim_app_1.SimApp({ isTestEnvironment: true, rootConstruct: Root });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // for now, it just creates a cloud.Function
                (0, vitest_1.expect)(s.getResourceConfig("/env0/test:my_test/Handler")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/env0/test:my_test/Handler",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        environmentVariables: {},
                        sourceCodeFile: vitest_1.expect.any(String),
                        sourceCodeLanguage: "javascript",
                        timeout: 60000,
                        concurrency: 100,
                    },
                    type: "@winglang/sdk.cloud.Function",
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });

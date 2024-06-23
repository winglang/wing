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
var src_1 = require("../../src");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var target_sim_1 = require("../../src/target-sim");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("state can be resolved at any time", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, state, tokenKey, token, fn, s, fnClient, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                state = new target_sim_1.State(app, "MyState");
                tokenKey = "myKey";
                token = state.token(tokenKey);
                fn = new src_1.cloud.Function(app, "MyFunction", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, process.env.MY_KEY];
                }); }); }), {
                    env: {
                        MY_KEY: token,
                    },
                });
                new cloud_1.OnDeploy(app, "MyOnDeploy", (0, core_1.lift)({ my_state: state, tokenKey: tokenKey })
                    .grant({ my_state: ["set"] })
                    .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("setting ".concat(ctx.tokenKey));
                                return [4 /*yield*/, ctx.my_state.set("".concat(ctx.tokenKey), "bang bang")];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); }));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                fnClient = s.getResource(fn.node.path);
                return [4 /*yield*/, fnClient.invoke("")];
            case 2:
                result = _a.sent();
                (0, vitest_1.expect)(result).toBe("bang bang");
                return [2 /*return*/];
        }
    });
}); });

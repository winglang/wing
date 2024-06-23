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
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("create a bucket", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, bucket, handler, fn, i;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        bucket = new cloud.Bucket(app, "my_bucket");
        handler = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, "hello"];
        }); }); });
        fn = new cloud.Function(app, "my_function", handler);
        // WHEN
        for (i = 0; i < 5; i++) {
            core_1.Connections.of(app).add({
                source: bucket,
                target: fn,
                name: "relationship",
            });
        }
        // THEN
        (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("implict connections based on tokens", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, api;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        api = new cloud.Api(app, "Api");
        new cloud.Function(app, "Function", (0, core_1.lift)({ url: api.url }).inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(ctx.url);
                return [2 /*return*/, undefined];
            });
        }); }));
        (0, vitest_1.expect)(app.snapshot()[core_1.CONNECTIONS_FILE_PATH].connections).containSubset([
            {
                name: "<ref>",
                source: "root/Function",
                target: "root/Api",
                targetOp: "url",
            },
        ]);
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("source can be omitted from `nodeof(x).addConnection()`", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, b1, b2;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        b1 = new cloud.Bucket(app, "B1");
        b2 = new cloud.Bucket(app, "B2");
        std_1.Node.of(b1).addConnection({ target: b2, name: "my_connection" });
        (0, vitest_1.expect)(app.snapshot()[core_1.CONNECTIONS_FILE_PATH]).toMatchSnapshot();
        return [2 /*return*/];
    });
}); });

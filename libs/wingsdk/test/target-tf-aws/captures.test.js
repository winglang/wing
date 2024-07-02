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
var tfaws = require("../../src/target-tf-aws");
var util_1 = require("../util");
(0, vitest_1.describe)("function with bucket binding", function () {
    // Dirty little helper to check if a config contains a set of actions
    var statementsContain = function (config, actions, effect) {
        var policies = config.resource.aws_iam_role_policy;
        // This is dangerous because it checks for any policy in the entire config to contain the actions
        // its safe for the tests here because we are really only checking 1 policy.
        for (var _i = 0, _a = Object.keys(policies); _i < _a.length; _i++) {
            var policy = _a[_i];
            var _loop_1 = function (statement) {
                if (statement.Effect !== effect) {
                    return "continue";
                }
                if (actions.every(function (action) { return statement.Action.includes(action); })) {
                    return { value: true };
                }
            };
            for (var _b = 0, _c = JSON.parse(policies[policy].policy).Statement; _b < _c.length; _b++) {
                var statement = _c[_b];
                var state_1 = _loop_1(statement);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        }
        return false;
    };
    (0, vitest_1.test)("put operation", function () {
        // GIVEN
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        var bucket = new cloud.Bucket(app, "Bucket");
        new cloud.Function(app, "Function", (0, core_1.lift)({ bucket: bucket })
            .grant({ bucket: ["put"] })
            .inflight(function (ctx, event) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.bucket.put("hello.txt", event !== null && event !== void 0 ? event : "none")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        }); }));
        var output = app.synth();
        // THEN
        (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
            "aws_cloudwatch_log_group",
            "aws_iam_role",
            "aws_iam_role_policy",
            "aws_iam_role_policy_attachment",
            "aws_lambda_function",
            "aws_s3_bucket",
            "aws_s3_object",
        ]);
        (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    });
    (0, vitest_1.test)("put json operation has correct permissions", function () {
        // GIVEN
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        var bucket = new cloud.Bucket(app, "Bucket");
        new cloud.Function(app, "Function", (0, core_1.lift)({ bucket: bucket })
            .grant({ bucket: ["putJson"] })
            .inflight(function (ctx, event) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.bucket.putJson("hello.json", event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        }); }));
        var output = JSON.parse(app.synth());
        var hasActions = statementsContain(output, ["s3:PutObject*"], "Allow");
        // THEN
        (0, vitest_1.expect)(hasActions).toEqual(true);
    });
    (0, vitest_1.test)("get json operation has correct permissions", function () {
        // GIVEN
        var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
        var bucket = new cloud.Bucket(app, "Bucket");
        new cloud.Function(app, "Function", (0, core_1.lift)({ bucket: bucket })
            .grant({ bucket: ["getJson"] })
            .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.bucket.getJson("hello.txt")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, undefined];
                }
            });
        }); }));
        var output = JSON.parse(app.synth());
        var hasActions = statementsContain(output, ["s3:GetObject*", "s3:GetBucket*"], "Allow");
        // THEN
        (0, vitest_1.expect)(hasActions).toEqual(true);
    });
});
(0, vitest_1.test)("function with a function binding", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var inflight1 = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(event);
            return [2 /*return*/];
        });
    }); });
    var fn1 = new cloud.Function(app, "Function1", inflight1);
    var inflight2 = (0, core_1.lift)({ fn1: fn1 })
        .grant({ fn1: ["invoke"] })
        .inflight(function (ctx, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Event: " + event);
                    return [4 /*yield*/, ctx.fn1.invoke(JSON.stringify({ hello: "world" }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud.Function(app, "Function2", inflight2);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(inflight1._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(inflight2._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group",
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_function",
        "aws_s3_bucket",
        "aws_s3_object",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});
(0, vitest_1.test)("two functions reusing the same IFunctionHandler", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var handler = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log(event);
            return [2 /*return*/];
        });
    }); });
    new cloud.Function(app, "Function1", handler);
    new cloud.Function(app, "Function2", handler);
    // THEN
    var output = app.synth();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group",
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_function",
        "aws_s3_bucket",
        "aws_s3_object",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});
(0, vitest_1.test)("function with a queue binding", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var queue = new cloud.Queue(app, "Queue");
    var pusher = (0, core_1.lift)({ queue: queue })
        .grant({ queue: ["push"] })
        .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.queue.push("info")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    new cloud.Function(app, "Function", pusher);
    var processor = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Received" + event);
            return [2 /*return*/];
        });
    }); });
    queue.setConsumer(processor);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(pusher._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(processor._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group",
        "aws_iam_role",
        "aws_iam_role_policy",
        "aws_iam_role_policy_attachment",
        "aws_lambda_event_source_mapping",
        "aws_lambda_function",
        "aws_s3_bucket",
        "aws_s3_object",
        "aws_sqs_queue",
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
});

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
var cdktf = require("cdktf");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var core_1 = require("../../src/core");
var shared_aws_1 = require("../../src/shared-aws");
var std = require("../../src/std");
var tfaws = require("../../src/target-tf-aws");
var sim_app_1 = require("../sim-app");
var util_1 = require("../util");
(0, vitest_1.test)("default queue behavior", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Queue(app, "Queue");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual(["aws_sqs_queue"]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("queue with custom timeout", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Queue(app, "Queue", {
        timeout: std.Duration.fromSeconds(30),
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual(["aws_sqs_queue"]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("queue with custom retention", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    new cloud_1.Queue(app, "Queue", {
        retentionPeriod: std.Duration.fromMinutes(30),
    });
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual(["aws_sqs_queue"]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("queue with a consumer function", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var queue = new cloud_1.Queue(app, "Queue", {
        timeout: std.Duration.fromSeconds(30),
    });
    var processor = (0, core_1.inflight)(function (_, event) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Received " + event.name);
            return [2 /*return*/];
        });
    }); });
    var processorFn = queue.setConsumer(processor);
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)((0, util_1.sanitizeCode)(processorFn._toInflight())).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.tfResourcesOf)(output)).toEqual([
        "aws_cloudwatch_log_group", // log group for function
        "aws_iam_role", // role for function
        "aws_iam_role_policy", // policy for role
        "aws_iam_role_policy_attachment", // execution policy for role
        "aws_lambda_event_source_mapping", // connection between queue and function
        "aws_lambda_function", // processor function
        "aws_s3_bucket", // S3 bucket for code
        "aws_s3_object", // S3 object for code
        "aws_sqs_queue", // main queue
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("queue name valid", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var queue = new cloud_1.Queue(app, "The-Incredible_Queue-01");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_sqs_queue", {
        name: "The-Incredible_Queue-01-".concat(queue.node.addr.substring(0, 8)),
    })).toBeTruthy();
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("replace invalid character from queue name", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var queue = new cloud_1.Queue(app, "The*Incredible$Queue");
    var output = app.synth();
    // THEN
    (0, vitest_1.expect)(cdktf.Testing.toHaveResourceWithProperties(output, "aws_sqs_queue", {
        name: "The-Incredible-Queue-".concat(queue.node.addr.substring(0, 8)),
    })).toBeTruthy();
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});
(0, vitest_1.test)("QueueRef fails with an invalid ARN", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        (0, vitest_1.expect)(function () {
            new shared_aws_1.QueueRef(app, "QueueRef", "not-an_arn");
        }).toThrow(/"not-an_arn" is not a valid Amazon SQS ARN/);
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("QueueRef in a SimApp can be used to reference an existing queue within a simulated app", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, queueRef, sim, fn, reply;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                queueRef = new shared_aws_1.QueueRef(app, "QueueRef", "arn:aws:sqs:us-west-2:123456789012:MyQueue1234");
                // we can't really make a remote call here, so we'll just check that
                // we have the right inflight client with the right queue name.
                new cloud_1.Function(app, "Function", (0, core_1.lift)({ queue: queueRef })
                    .grant({ queue: ["push"] })
                    .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                    var q;
                    return __generator(this, function (_a) {
                        q = ctx.queue;
                        if (!q.client) {
                            throw new Error("Queue AWS SDK client not found");
                        }
                        if (q.client.constructor.name !== "SQSClient") {
                            throw new Error("Queue AWS SDK client is not an SQSClient");
                        }
                        return [2 /*return*/, q._queueUrlOrArn]; // yes, internal stuff
                    });
                }); }));
                (0, vitest_1.expect)(queueRef.queueArn).toStrictEqual("arn:aws:sqs:us-west-2:123456789012:MyQueue1234");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                sim = _a.sent();
                fn = sim.getResource("root/Function");
                return [4 /*yield*/, fn.invoke()];
            case 2:
                reply = _a.sent();
                (0, vitest_1.expect)(reply).toStrictEqual("arn:aws:sqs:us-west-2:123456789012:MyQueue1234");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("QueueRef in an TFAWS app can be used to reference an existing queue", function () {
    // GIVEN
    var app = new tfaws.App({ outdir: (0, util_1.mkdtemp)(), entrypointDir: __dirname });
    var queue = new shared_aws_1.QueueRef(app, "QueueRef", "arn:aws:sqs:us-west-2:123456789012:MyQueue1234");
    var handler = (0, core_1.lift)({ queue: queue })
        .grant({ queue: ["push", "approxSize"] })
        .inflight(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); });
    new cloud_1.Function(app, "Function", handler);
    var output = app.synth();
    // THEN
    var statements = JSON.parse(JSON.parse(output).resource.aws_iam_role_policy
        .Function_IamRolePolicy_E3B26607.policy).Statement;
    (0, vitest_1.expect)(statements).toStrictEqual([
        {
            Action: ["sqs:GetQueueUrl"],
            Effect: "Allow",
            Resource: ["arn:aws:sqs:us-west-2:123456789012:MyQueue1234"],
        },
        {
            Action: ["sqs:SendMessage"],
            Effect: "Allow",
            Resource: ["arn:aws:sqs:us-west-2:123456789012:MyQueue1234"],
        },
        {
            Action: ["sqs:GetQueueAttributes"],
            Effect: "Allow",
            Resource: ["arn:aws:sqs:us-west-2:123456789012:MyQueue1234"],
        },
    ]);
    (0, vitest_1.expect)((0, util_1.tfSanitize)(output)).toMatchSnapshot();
    (0, vitest_1.expect)((0, util_1.treeJsonOf)(app.outdir)).toMatchSnapshot();
});

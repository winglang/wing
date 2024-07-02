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
var util_1 = require("./util");
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
var INFLIGHT_CODE = (0, core_1.inflight)(function (_, message) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (message === "BAD MESSAGE") {
            throw new Error("ERROR");
        }
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("create a queue", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Queue(app, "my_queue");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // THEN
                (0, vitest_1.expect)(s.getResourceConfig("/my_queue")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                    },
                    path: "root/my_queue",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        retentionPeriod: 3600,
                        timeout: 30,
                    },
                    type: cloud.QUEUE_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("try to create a queue with invalid retention period", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, retentionPeriod;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        retentionPeriod = std_1.Duration.fromSeconds(5);
        // THEN
        (0, vitest_1.expect)(function () {
            new cloud.Queue(app, "my_queue", {
                retentionPeriod: retentionPeriod,
            });
        }).toThrowError("Retention period must be greater than or equal to timeout");
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("queue with one subscriber, default batch size of 1", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, queue, s, queueClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                queue = new cloud.Queue(app, "my_queue");
                queue.setConsumer(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                queueClient = s.getResource("/my_queue");
                // WHEN
                return [4 /*yield*/, queueClient.push("A", "B")];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 2, function (trace) {
                        return trace.data.message.startsWith("Sending messages");
                    })];
            case 3:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).not.toContain("Subscriber error");
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("queue batch size of 2, purge the queue", function () { return __awaiter(void 0, void 0, void 0, function () {
    var QUEUE_SIZE, QUEUE_EMPTY_SIZE, app, s, queueClient, approxSize;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                QUEUE_SIZE = 2;
                QUEUE_EMPTY_SIZE = 0;
                app = new sim_app_1.SimApp();
                new cloud.Queue(app, "my_queue");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                queueClient = s.getResource("/my_queue");
                // WHEN
                return [4 /*yield*/, queueClient.push("A")];
            case 2:
                // WHEN
                _a.sent();
                return [4 /*yield*/, queueClient.push("B")];
            case 3:
                _a.sent();
                return [4 /*yield*/, queueClient.approxSize()];
            case 4:
                approxSize = _a.sent();
                (0, vitest_1.expect)(approxSize).toEqual(QUEUE_SIZE);
                return [4 /*yield*/, queueClient.purge()];
            case 5:
                _a.sent();
                return [4 /*yield*/, queueClient.approxSize()];
            case 6:
                approxSize = _a.sent();
                (0, vitest_1.expect)(approxSize).toEqual(QUEUE_EMPTY_SIZE);
                // THEN
                return [4 /*yield*/, s.stop()];
            case 7:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("queue with one subscriber, batch size of 5", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, queue, consumer, onDeployHandler, s, invokeMessages;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                queue = new cloud.Queue(app, "my_queue");
                consumer = queue.setConsumer(INFLIGHT_CODE, { batchSize: 5 });
                onDeployHandler = (0, core_1.lift)({ queue: queue })
                    .grant({ queue: ["push"] })
                    .inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, ctx.queue.push("A")];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, ctx.queue.push("B")];
                            case 2:
                                _a.sent();
                                return [4 /*yield*/, ctx.queue.push("C")];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, ctx.queue.push("D")];
                            case 4:
                                _a.sent();
                                return [4 /*yield*/, ctx.queue.push("E")];
                            case 5:
                                _a.sent();
                                return [4 /*yield*/, ctx.queue.push("F")];
                            case 6:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                new cloud.OnDeploy(app, "my_queue_messages", onDeployHandler);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                // WHEN
                return [4 /*yield*/, (0, util_1.waitUntilTraceCount)(s, 2, function (trace) {
                        return trace.sourcePath === consumer.node.path && trace.data.status === "success";
                    })];
            case 2:
                // WHEN
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                invokeMessages = s
                    .listTraces()
                    .filter(function (trace) {
                    return trace.sourcePath === consumer.node.path &&
                        trace.data.message.startsWith("Invoke");
                });
                (0, vitest_1.expect)(invokeMessages.length).toBeGreaterThanOrEqual(2); // queue messages are processed in multiple batches based on batch size
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
// waiting for this: https://github.com/winglang/wing/issues/1980 to be resolved
vitest_1.test.skip("messages are requeued if the function fails after timeout", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, queue, s, REQUEUE_MSG, queueClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                queue = new cloud.Queue(app, "my_queue", {
                    timeout: std_1.Duration.fromSeconds(1),
                });
                queue.setConsumer(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                REQUEUE_MSG = "1 messages pushed back to queue after visibility timeout.";
                queueClient = s.getResource("/my_queue");
                void queueClient.push("BAD MESSAGE");
                return [4 /*yield*/, (0, util_1.waitUntilTrace)(s, function (trace) { return trace.data.message.startsWith("Invoke"); })];
            case 2:
                _a.sent();
                // stopping early to avoid the next queue message from being processed
                return [4 /*yield*/, s.stop()];
            case 3:
                // stopping early to avoid the next queue message from being processed
                _a.sent();
                // THEN
                return [4 /*yield*/, (0, util_1.waitUntilTrace)(s, function (trace) {
                        return trace.data.message.startsWith(REQUEUE_MSG);
                    })];
            case 4:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                (0, vitest_1.expect)(s
                    .listTraces()
                    .filter(function (v) { return v.sourceType == cloud.QUEUE_FQN; })
                    .map(function (trace) { return trace.data.message; })).toContain(REQUEUE_MSG);
                return [2 /*return*/];
        }
    });
}); });
vitest_1.test.skip("messages are not requeued if the function fails before timeout", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, queue, s, queueClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                queue = new cloud.Queue(app, "my_queue", {
                    timeout: std_1.Duration.fromSeconds(30),
                });
                queue.setConsumer(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                queueClient = s.getResource("/my_queue");
                void queueClient.push("BAD MESSAGE");
                return [4 /*yield*/, (0, util_1.waitUntilTrace)(s, function (trace) {
                        return trace.data.message ==
                            "Subscriber error - returning 1 messages to queue: ERROR";
                    })];
            case 2:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                (0, vitest_1.expect)(s
                    .listTraces()
                    .filter(function (v) { return v.sourceType == cloud.QUEUE_FQN; })
                    .map(function (trace) { return trace.data.message; })).toMatchInlineSnapshot("\n    [\n      \"@winglang/sdk.cloud.Queue created.\",\n      \"Push (messages=BAD MESSAGE).\",\n      \"Sending messages (messages=[\\\"BAD MESSAGE\\\"], subscriber=sim-0).\",\n      \"Subscriber error - returning 1 messages to queue: ERROR\",\n      \"@winglang/sdk.cloud.Queue deleted.\",\n    ]\n  ");
                return [2 /*return*/];
        }
    });
}); });
// TODO: this test is skipped because it is flaky
vitest_1.test.skip("messages are not requeued if the function fails after retention timeout", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, queue, s, queueClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                queue = new cloud.Queue(app, "my_queue", {
                    retentionPeriod: std_1.Duration.fromSeconds(1),
                    timeout: std_1.Duration.fromMilliseconds(100),
                });
                queue.setConsumer(INFLIGHT_CODE);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                queueClient = s.getResource("/my_queue");
                void queueClient.push("BAD MESSAGE");
                return [4 /*yield*/, (0, util_1.waitUntilTrace)(s, function (trace) {
                        return trace.data.message ==
                            "1 messages pushed back to queue after visibility timeout.";
                    })];
            case 2:
                _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toContain("1 messages pushed back to queue after visibility timeout.");
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("queue has no display hidden property", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, queue;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Queue(app, "my_queue");
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        queue = app.node.tryFindChild("my_queue");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(queue).hidden).toBeUndefined();
        (0, vitest_1.expect)(treeJson.tree.children).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).not.toMatchObject({
            my_queue: {
                display: {
                    hidden: vitest_1.expect.any(Boolean),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("queue has display title and description properties", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, treeJson, queue;
    return __generator(this, function (_a) {
        app = new sim_app_1.SimApp();
        new cloud.Queue(app, "my_queue");
        treeJson = (0, util_1.treeJsonOf)(app.synth());
        queue = app.node.tryFindChild("my_queue");
        // THEN
        (0, vitest_1.expect)(std_1.Node.of(queue).title).toBeDefined();
        (0, vitest_1.expect)(std_1.Node.of(queue).description).toBeDefined();
        (0, vitest_1.expect)(treeJson.tree.children).toMatchObject({
            my_queue: {
                display: {
                    title: vitest_1.expect.any(String),
                    description: vitest_1.expect.any(String),
                },
            },
        });
        return [2 /*return*/];
    });
}); });
(0, vitest_1.test)("can pop messages from queue", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, messages, s, queueClient, _i, messages_1, message, poppedMessages, i, _a, _b, poppedOnEmptyQueue;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                app = new sim_app_1.SimApp();
                messages = ["A", "B", "C", "D", "E", "F"];
                new cloud.Queue(app, "my_queue");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _c.sent();
                queueClient = s.getResource("/my_queue");
                _i = 0, messages_1 = messages;
                _c.label = 2;
            case 2:
                if (!(_i < messages_1.length)) return [3 /*break*/, 5];
                message = messages_1[_i];
                return [4 /*yield*/, queueClient.push(message)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                poppedMessages = [];
                i = 0;
                _c.label = 6;
            case 6:
                if (!(i < messages.length)) return [3 /*break*/, 9];
                _b = (_a = poppedMessages).push;
                return [4 /*yield*/, queueClient.pop()];
            case 7:
                _b.apply(_a, [_c.sent()]);
                _c.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 6];
            case 9:
                poppedMessages.sort();
                return [4 /*yield*/, queueClient.pop()];
            case 10:
                poppedOnEmptyQueue = _c.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 11:
                // THEN
                _c.sent();
                (0, vitest_1.expect)(poppedMessages).toEqual(messages);
                (0, vitest_1.expect)(poppedOnEmptyQueue).toBeUndefined();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("pop from empty queue returns nothing", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, queueClient, popped;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Queue(app, "my_queue");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                queueClient = s.getResource("/my_queue");
                return [4 /*yield*/, queueClient.pop()];
            case 2:
                popped = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(popped).toBeUndefined();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("push rejects empty message", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, queueClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Queue(app, "my_queue");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                queueClient = s.getResource("/my_queue");
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return queueClient.push(""); }).rejects.toThrowError(/Empty messages are not allowed/)];
            case 2:
                // THEN
                _a.sent();
                return [4 /*yield*/, s.stop()];
            case 3:
                _a.sent();
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(s.listTraces()[2].data.status).toEqual("failure");
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });

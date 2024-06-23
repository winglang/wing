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
var client_sqs_1 = require("@aws-sdk/client-sqs");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
var vitest_1 = require("vitest");
var queue_inflight_1 = require("../../src/shared-aws/queue.inflight");
require("aws-sdk-client-mock-jest");
var QUEUE_URL = "https://my-queue-url";
var sqsMock = (0, aws_sdk_client_mock_1.mockClient)(client_sqs_1.SQSClient);
(0, vitest_1.beforeEach)(function () {
    sqsMock.reset();
});
(0, vitest_1.test)("push - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGE, RESPONSE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGE = "MESSAGE";
                RESPONSE = {
                    MessageId: "MESSAGE_ID",
                };
                sqsMock
                    .on(client_sqs_1.SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
                    .resolves(RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.push(MESSAGE)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.SendMessageCommand, 1);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("push batch - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGES, RESPONSE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGES = ["MESSAGE1", "MESSAGE2", "MESSAGE3"];
                RESPONSE = {
                    MessageId: "MESSAGE_ID",
                };
                sqsMock.on(client_sqs_1.SendMessageCommand).resolves(RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.push.apply(client, MESSAGES)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.SendMessageCommand, 3);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedNthCommandWith(1, client_sqs_1.SendMessageCommand, {
                    QueueUrl: QUEUE_URL,
                    MessageBody: MESSAGES[0],
                });
                (0, vitest_1.expect)(sqsMock).toHaveReceivedNthCommandWith(2, client_sqs_1.SendMessageCommand, {
                    QueueUrl: QUEUE_URL,
                    MessageBody: MESSAGES[1],
                });
                (0, vitest_1.expect)(sqsMock).toHaveReceivedNthCommandWith(3, client_sqs_1.SendMessageCommand, {
                    QueueUrl: QUEUE_URL,
                    MessageBody: MESSAGES[2],
                });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("push - sad path invalid message", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGE = "INVALID_MESSAGE";
                sqsMock
                    .on(client_sqs_1.SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
                    .rejects(new client_sqs_1.InvalidMessageContents({
                    message: "InvalidMessageContents error",
                    $metadata: {},
                }));
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.push(MESSAGE); }).rejects.toThrowError(/The message contains characters outside the allowed set/)];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("push - sad path empty message", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGE = "";
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.push(MESSAGE); }).rejects.toThrowError(/Empty messages are not allowed/)];
            case 1:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(sqsMock, "never invoked").toHaveReceivedCommandTimes(client_sqs_1.SendMessageCommand, 0);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("push - sad path unknown error", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGE = "MESSAGE";
                sqsMock
                    .on(client_sqs_1.SendMessageCommand, { QueueUrl: QUEUE_URL, MessageBody: MESSAGE })
                    .rejects(new Error("unknown error"));
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                // THEN
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.push(MESSAGE); }).rejects.toThrowError(/unknown error/)];
            case 1:
                // THEN
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("purge - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var RESPONSE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                RESPONSE = {};
                sqsMock.on(client_sqs_1.PurgeQueueCommand, { QueueUrl: QUEUE_URL }).resolves(RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.purge()];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(undefined);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("approxSize - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var QUEUE_SIZE, GET_QUEUE_ATTRIBUTES_RESPONSE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                QUEUE_SIZE = 3;
                GET_QUEUE_ATTRIBUTES_RESPONSE = {
                    Attributes: { ApproximateNumberOfMessages: QUEUE_SIZE.toString() },
                };
                sqsMock
                    .on(client_sqs_1.GetQueueAttributesCommand, { QueueUrl: QUEUE_URL })
                    .resolves(GET_QUEUE_ATTRIBUTES_RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.approxSize()];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(QUEUE_SIZE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("pop - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGE, ONE_MSG_RESPONSE, NO_MSG_RESPONSE, client, firstPopResponse, secondPopResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGE = "MESSAGE";
                ONE_MSG_RESPONSE = {
                    Messages: [
                        {
                            Body: MESSAGE,
                            ReceiptHandle: "RECEIPT_HANDLE",
                        },
                    ],
                    $metadata: {},
                };
                NO_MSG_RESPONSE = {};
                sqsMock
                    .on(client_sqs_1.ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
                    .resolvesOnce(ONE_MSG_RESPONSE)
                    .resolves(NO_MSG_RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.pop()];
            case 1:
                firstPopResponse = _a.sent();
                return [4 /*yield*/, client.pop()];
            case 2:
                secondPopResponse = _a.sent();
                // THEN
                (0, vitest_1.expect)(firstPopResponse).toEqual(MESSAGE);
                (0, vitest_1.expect)(secondPopResponse).toBeUndefined();
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.ReceiveMessageCommand, 2);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.DeleteMessageCommand, 1);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("pop - happy path w/o message receipt", function () { return __awaiter(void 0, void 0, void 0, function () {
    var MESSAGE, ONE_MSG_RESPONSE, NO_MSG_RESPONSE, client, firstPopResponse, secondPopResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                MESSAGE = "MESSAGE";
                ONE_MSG_RESPONSE = {
                    Messages: [
                        {
                            Body: MESSAGE,
                            ReceiptHandle: undefined, // <- no receipt handle, unusual but it's fine
                        },
                    ],
                    $metadata: {},
                };
                NO_MSG_RESPONSE = {};
                sqsMock
                    .on(client_sqs_1.ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
                    .resolvesOnce(ONE_MSG_RESPONSE)
                    .resolves(NO_MSG_RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.pop()];
            case 1:
                firstPopResponse = _a.sent();
                return [4 /*yield*/, client.pop()];
            case 2:
                secondPopResponse = _a.sent();
                // THEN
                (0, vitest_1.expect)(firstPopResponse).toEqual(MESSAGE);
                (0, vitest_1.expect)(secondPopResponse).toBeUndefined();
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.ReceiveMessageCommand, 2);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.DeleteMessageCommand, 0); // <- delete message command skipped
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("pop - happy path w/ no message in the queue", function () { return __awaiter(void 0, void 0, void 0, function () {
    var NO_MSG_RESPONSE, client, firstPopResponse, secondPopResponse;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                NO_MSG_RESPONSE = {};
                sqsMock
                    .on(client_sqs_1.ReceiveMessageCommand, { QueueUrl: QUEUE_URL })
                    .resolves(NO_MSG_RESPONSE);
                client = new queue_inflight_1.QueueClient(QUEUE_URL);
                return [4 /*yield*/, client.pop()];
            case 1:
                firstPopResponse = _a.sent();
                return [4 /*yield*/, client.pop()];
            case 2:
                secondPopResponse = _a.sent();
                // THEN
                (0, vitest_1.expect)(firstPopResponse).toBeUndefined();
                (0, vitest_1.expect)(secondPopResponse).toBeUndefined();
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.ReceiveMessageCommand, 2);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.DeleteMessageCommand, 0);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("if a queue name is provided, the url is resolved", function () { return __awaiter(void 0, void 0, void 0, function () {
    var queueName, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                queueName = "MyQueueName";
                // GIVEN
                sqsMock.on(client_sqs_1.GetQueueUrlCommand, { QueueName: queueName }).resolves({
                    QueueUrl: "https://my-queue-url",
                });
                sqsMock
                    .on(client_sqs_1.SendMessageCommand, {
                    QueueUrl: "https://my-queue-url",
                    MessageBody: "test",
                })
                    .resolves({});
                client = new queue_inflight_1.QueueClient(queueName);
                return [4 /*yield*/, client.push("test")];
            case 1:
                _a.sent();
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.GetQueueUrlCommand, 1);
                (0, vitest_1.expect)(sqsMock).toHaveReceivedCommandTimes(client_sqs_1.SendMessageCommand, 1);
                return [2 /*return*/];
        }
    });
}); });

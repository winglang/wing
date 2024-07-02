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
var client_sns_1 = require("@aws-sdk/client-sns");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
require("aws-sdk-client-mock-jest");
var vitest_1 = require("vitest");
var topic_inflight_1 = require("../../src/shared-aws/topic.inflight");
var util_1 = require("../../src/util");
var snsMock = (0, aws_sdk_client_mock_1.mockClient)(client_sns_1.SNSClient);
(0, vitest_1.beforeEach)(function () {
    snsMock.reset();
});
(0, vitest_1.test)("publish - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var TOPIC_ARN, MESSAGE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                TOPIC_ARN = "SOME:TOPIC_ARN:that-is/fake";
                MESSAGE = "SOME MESSAGE";
                snsMock
                    .on(client_sns_1.PublishBatchCommand)
                    .resolves({ $metadata: { httpStatusCode: 200 } });
                client = new topic_inflight_1.TopicClient(TOPIC_ARN);
                return [4 /*yield*/, client.publish(MESSAGE)];
            case 1:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(snsMock).toHaveReceivedCommandTimes(client_sns_1.PublishBatchCommand, 1);
                (0, vitest_1.expect)(snsMock).toHaveReceivedCommandWith(client_sns_1.PublishBatchCommand, {
                    TopicArn: TOPIC_ARN,
                    PublishBatchRequestEntries: [
                        {
                            Id: util_1.Util.sha256("".concat(MESSAGE, "-1")),
                            Message: MESSAGE,
                        },
                    ],
                });
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("publish multiple messages", function () { return __awaiter(void 0, void 0, void 0, function () {
    var TOPIC_ARN, FIRST_MESSAGE, SECOND_MESSAGE, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                TOPIC_ARN = "SOME:TOPIC_ARN:that-is/fake";
                FIRST_MESSAGE = "FIRST MESSAGE";
                SECOND_MESSAGE = "SECOND MESSAGE";
                snsMock
                    .on(client_sns_1.PublishBatchCommand)
                    .resolves({ $metadata: { httpStatusCode: 200 } });
                client = new topic_inflight_1.TopicClient(TOPIC_ARN);
                return [4 /*yield*/, client.publish(FIRST_MESSAGE, SECOND_MESSAGE)];
            case 1:
                _a.sent();
                // THEN
                (0, vitest_1.expect)(snsMock).toHaveReceivedCommandTimes(client_sns_1.PublishBatchCommand, 1);
                (0, vitest_1.expect)(snsMock).toHaveReceivedCommandWith(client_sns_1.PublishBatchCommand, {
                    TopicArn: TOPIC_ARN,
                    PublishBatchRequestEntries: [
                        {
                            Id: util_1.Util.sha256("".concat(FIRST_MESSAGE, "-1")),
                            Message: FIRST_MESSAGE,
                        },
                        {
                            Id: util_1.Util.sha256("".concat(SECOND_MESSAGE, "-2")),
                            Message: SECOND_MESSAGE,
                        },
                    ],
                });
                return [2 /*return*/];
        }
    });
}); });

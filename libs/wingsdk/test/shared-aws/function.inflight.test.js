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
var client_lambda_1 = require("@aws-sdk/client-lambda");
var util_utf8_1 = require("@smithy/util-utf8");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
var vitest_1 = require("vitest");
var function_inflight_1 = require("../../src/shared-aws/function.inflight");
var lambdaMock = (0, aws_sdk_client_mock_1.mockClient)(client_lambda_1.LambdaClient);
(0, vitest_1.beforeEach)(function () {
    lambdaMock.reset();
});
(0, vitest_1.test)("invoke - happy path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var FUNCTION_NAME, PAYLOAD, RESPONSE, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FUNCTION_NAME = "FUNCTION_NAME";
                PAYLOAD = "PAYLOAD";
                RESPONSE = "RESPONSE";
                lambdaMock
                    .on(client_lambda_1.InvokeCommand, {
                    FunctionName: FUNCTION_NAME,
                    Payload: (0, util_utf8_1.fromUtf8)(JSON.stringify(PAYLOAD)),
                })
                    .resolves({
                    StatusCode: 200,
                    Payload: (0, util_utf8_1.fromUtf8)(JSON.stringify(RESPONSE)),
                });
                client = new function_inflight_1.FunctionClient(FUNCTION_NAME, "root/Function");
                return [4 /*yield*/, client.invoke(PAYLOAD)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(RESPONSE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("invoke - sad path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var FUNCTION_NAME, PAYLOAD, RESPONSE_PAYLOAD, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FUNCTION_NAME = "FUNCTION_NAME";
                PAYLOAD = "PAYLOAD";
                RESPONSE_PAYLOAD = {
                    errorType: "Error",
                    errorMessage: "I don't like your input!",
                    trace: [
                        "Error: I don't like your input!",
                        "    at Runtime.exports.handler (/var/task/index.js:3:11)",
                        "    at Runtime.handleOnceNonStreaming (file:///var/runtime/index.mjs:1028:29)",
                    ],
                };
                lambdaMock
                    .on(client_lambda_1.InvokeCommand, {
                    FunctionName: FUNCTION_NAME,
                    Payload: (0, util_utf8_1.fromUtf8)(JSON.stringify(PAYLOAD)),
                })
                    .resolves({
                    StatusCode: 200,
                    FunctionError: "Unhandled",
                    Payload: (0, util_utf8_1.fromUtf8)(JSON.stringify(RESPONSE_PAYLOAD)),
                });
                client = new function_inflight_1.FunctionClient("FUNCTION_NAME", "root/Function");
                return [4 /*yield*/, (0, vitest_1.expect)(client.invoke(PAYLOAD)).rejects.toThrow(/Invoke failed with message: "I don't like your input!"/)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("parse logs", function () {
    var traces = (0, function_inflight_1.parseLogs)("START RequestId: 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f Version: $LATEST\n2023-08-04T16:40:47.309Z\t6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\tINFO\thello world\n2023-08-04T16:40:50.691Z\t6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\tINFO\thello world\nEND RequestId: 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\nREPORT RequestId: 6beb7628-d0c3-4fe9-bf5a-d64c559aa25f\tDuration: 4958.93 ms\tBilled Duration: 4959 ms\tMemory Size: 128 MB\tMax Memory Used: 82 MB\tInit Duration: 249.40 ms\t\n", "fake-source");
    (0, vitest_1.expect)(traces).toEqual([
        {
            data: { message: "hello world" },
            timestamp: "2023-08-04T16:40:47.309Z",
            sourceType: "@winglang/sdk.cloud.Function",
            sourcePath: "fake-source",
            level: "info",
            type: "log",
        },
        {
            data: { message: "hello world" },
            timestamp: "2023-08-04T16:40:50.691Z",
            sourceType: "@winglang/sdk.cloud.Function",
            sourcePath: "fake-source",
            level: "info",
            type: "log",
        },
    ]);
});

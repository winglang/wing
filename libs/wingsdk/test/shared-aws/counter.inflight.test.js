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
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var aws_sdk_client_mock_1 = require("aws-sdk-client-mock");
var vitest_1 = require("vitest");
var counter_inflight_1 = require("../../src/shared-aws/counter.inflight");
var MOCK_TABLE_NAME = "MyBeautifulCounter";
var dynamoMock = (0, aws_sdk_client_mock_1.mockClient)(client_dynamodb_1.DynamoDBClient);
(0, vitest_1.beforeEach)(function () {
    dynamoMock.reset();
});
(0, vitest_1.test)("inc(1)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var prevValue, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prevValue = 887;
                setupIncMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    expectedAmount: 1,
                    initial: 0,
                    responseValue: prevValue + 1,
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.inc()];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(prevValue); // returns previous value
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("inc(5)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var prevValue, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prevValue = 887;
                setupIncMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    expectedAmount: 5,
                    initial: 0,
                    responseValue: 887 + 5,
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.inc(5)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(prevValue); // returns previous value
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key inc(1)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var prevValue, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prevValue = 887;
                setupIncMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    expectedAmount: 1,
                    initial: 0,
                    responseValue: prevValue + 1,
                    key: "my-key",
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.inc(undefined, "my-key")];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(prevValue); // returns previous value
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key inc(5)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var prevValue, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prevValue = 887;
                setupIncMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    expectedAmount: 5,
                    initial: 0,
                    responseValue: 887 + 5,
                    key: "my-key",
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.inc(5, "my-key")];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(prevValue); // returns previous value
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("set(0)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // GIVEN
                setupSetMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    setValue: 0,
                });
                setupPeekMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    responseValue: 0,
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.set(0)];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.peek()];
            case 2:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(0);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("set(10, 'my-key')", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // GIVEN
                setupSetMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    setValue: 0,
                    key: "my-key",
                });
                setupPeekMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    responseValue: 10,
                    key: "my-key",
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.set(10, "my-key")];
            case 1:
                _a.sent();
                return [4 /*yield*/, client.peek("my-key")];
            case 2:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(response).toEqual(10);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("peek with initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setupPeekMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    responseValue: 123,
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.peek()];
            case 1:
                response = _a.sent();
                (0, vitest_1.expect)(response).toEqual(123);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("peek without initial value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setupPeekMock({
                    expectedTableName: MOCK_TABLE_NAME,
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.peek()];
            case 1:
                response = _a.sent();
                (0, vitest_1.expect)(response).toEqual(0);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("peek with value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setupPeekMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    responseValue: 123,
                    key: "my-key",
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.peek("my-key")];
            case 1:
                response = _a.sent();
                (0, vitest_1.expect)(response).toEqual(123);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("key peek without value", function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setupPeekMock({
                    expectedTableName: MOCK_TABLE_NAME,
                    key: "my-key",
                });
                client = new counter_inflight_1.CounterClient(MOCK_TABLE_NAME);
                return [4 /*yield*/, client.peek("my-key")];
            case 1:
                response = _a.sent();
                (0, vitest_1.expect)(response).toEqual(0);
                return [2 /*return*/];
        }
    });
}); });
function setupIncMock(opts) {
    var _a;
    var expectedRequest = {
        TableName: opts.expectedTableName,
        Key: { id: { S: (_a = opts.key) !== null && _a !== void 0 ? _a : "counter" } },
        UpdateExpression: "SET counter_value = if_not_exists(counter_value, :initial) + :amount",
        ExpressionAttributeValues: {
            ":amount": { N: "".concat(opts.expectedAmount) },
            ":initial": { N: "".concat(opts.initial) },
        },
        ReturnValues: "UPDATED_NEW",
    };
    var mockResponse = {
        $metadata: {},
        Attributes: !opts.responseValue
            ? undefined
            : {
                counter_value: { N: "".concat(opts.responseValue) },
            },
    };
    dynamoMock.on(client_dynamodb_1.UpdateItemCommand, expectedRequest).resolves(mockResponse);
}
function setupPeekMock(opts) {
    var _a;
    var expectedRequest = {
        TableName: opts.expectedTableName,
        Key: { id: { S: (_a = opts.key) !== null && _a !== void 0 ? _a : "counter" } },
    };
    var mockResponse = {
        $metadata: {},
        Item: !opts.responseValue
            ? {
                counter_value: { N: "0" },
            }
            : {
                counter_value: { N: "".concat(opts.responseValue) },
            },
    };
    dynamoMock.on(client_dynamodb_1.GetItemCommand, expectedRequest).resolves(mockResponse);
}
function setupSetMock(opts) {
    var _a;
    var expectedRequest = {
        TableName: opts.expectedTableName,
        Key: { id: { S: (_a = opts.key) !== null && _a !== void 0 ? _a : "counter" } },
        UpdateExpression: "SET counter_value = :set_value",
        ExpressionAttributeValues: {
            ":set_value": { N: "".concat(opts.setValue) },
        },
        ReturnValues: "UPDATED_NEW",
    };
    var mockResponse = {
        $metadata: {},
        Attributes: opts.setValue === undefined
            ? undefined
            : {
                counter_value: { N: "".concat(opts.setValue) },
            },
    };
    dynamoMock.on(client_dynamodb_1.UpdateItemCommand, expectedRequest).resolves(mockResponse);
}

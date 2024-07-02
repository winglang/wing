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
var ex_1 = require("../../src/ex");
var table_inflight_1 = require("../../src/shared-aws/table.inflight");
var MOCK_TABLE_NAME = "MyBeautifulTable";
var PRIMARY_KEY = "id";
var dynamoMock = (0, aws_sdk_client_mock_1.mockClient)(client_dynamodb_1.DynamoDBClient);
(0, vitest_1.describe)("inflight table tests", function () {
    var client, row, key;
    (0, vitest_1.beforeEach)(function () {
        key = "test";
        row = { somenumber: 1 };
        var columns = {
            somenumber: ex_1.ColumnType.NUMBER,
        };
        client = new table_inflight_1.TableClient(MOCK_TABLE_NAME, PRIMARY_KEY, JSON.stringify(columns));
    });
    (0, vitest_1.test)("insert", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Item: {
                            id: { S: key },
                            somenumber: { N: String(row.somenumber) },
                        },
                    };
                    mockResponse = {
                        $metadata: {},
                    };
                    dynamoMock.on(client_dynamodb_1.PutItemCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.insert(key, row)];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("update", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Key: { id: { S: key } },
                        UpdateExpression: "SET somenumber = :somenumber",
                        ExpressionAttributeValues: {
                            ":somenumber": { N: "".concat(row.somenumber) },
                        },
                    };
                    mockResponse = {
                        $metadata: {},
                    };
                    dynamoMock.on(client_dynamodb_1.UpdateItemCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.update(key, row)];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("delete", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Key: { id: { S: row.id } },
                    };
                    mockResponse = {
                        $metadata: {},
                    };
                    dynamoMock.on(client_dynamodb_1.DeleteItemCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.delete(row.id)];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("get to an empty table", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, get;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Key: { id: { S: key } },
                    };
                    mockResponse = {
                        $metadata: {},
                    };
                    dynamoMock.on(client_dynamodb_1.GetItemCommand, expectedRequest).resolves(mockResponse);
                    get = client.get(key);
                    // THEN
                    return [4 /*yield*/, (0, vitest_1.expect)(function () { return get; }).rejects.toThrowError(/Row does not exist/)];
                case 1:
                    // THEN
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("get", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Key: {
                            id: { S: key },
                        },
                    };
                    mockResponse = {
                        $metadata: {},
                        Item: {
                            id: { S: "".concat(key) },
                            somenumber: { N: "".concat(row.somenumber) },
                        },
                    };
                    dynamoMock.on(client_dynamodb_1.GetItemCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.get(key)];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({ id: key, somenumber: row.somenumber });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("tryGet to an empty table", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Key: { id: { S: key } },
                    };
                    mockResponse = {
                        $metadata: {},
                    };
                    dynamoMock.on(client_dynamodb_1.GetItemCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.tryGet(key)];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual(undefined);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("tryGet", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                        Key: {
                            id: { S: key },
                        },
                    };
                    mockResponse = {
                        $metadata: {},
                        Item: {
                            id: { S: "".concat(key) },
                            somenumber: { N: "".concat(row.somenumber) },
                        },
                    };
                    dynamoMock.on(client_dynamodb_1.GetItemCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.tryGet(key)];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({ id: key, somenumber: row.somenumber });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("list", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                    };
                    mockResponse = {
                        $metadata: {},
                        Count: 0,
                        Items: [
                            { id: { S: "test1" }, somenumber: { N: "1" } },
                            { id: { S: "test2" }, somenumber: { N: "2" } },
                        ],
                    };
                    dynamoMock.on(client_dynamodb_1.ScanCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.list()];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual([
                        { id: "test1", somenumber: 1 },
                        { id: "test2", somenumber: 2 },
                    ]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("empty list", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectedRequest, mockResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expectedRequest = {
                        TableName: MOCK_TABLE_NAME,
                    };
                    mockResponse = {
                        $metadata: {},
                        Count: 0,
                        Items: [],
                    };
                    dynamoMock.on(client_dynamodb_1.ScanCommand, expectedRequest).resolves(mockResponse);
                    return [4 /*yield*/, client.list()];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
});

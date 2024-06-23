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
var api_util_1 = require("../../src/shared-aws/api-util");
(0, vitest_1.beforeEach)(function () {
    vitest_1.vi.restoreAllMocks();
});
var makeRequest = function (event) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
(0, vitest_1.describe)("ApiResponseMapper", function () {
    (0, vitest_1.test)("map'cloud.ApiResponse' response to 'APIGatewayProxyResult", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: JSON.stringify({}),
                        headers: {},
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerResponse = {
                        status: 200,
                        body: JSON.stringify({ key: "value" }),
                        headers: { "header-1": "value-1" },
                    };
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, handlerResponse];
                        }); }); }, {})];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({
                        statusCode: 200,
                        body: JSON.stringify({ key: "value" }),
                        headers: {
                            "Content-Type": "application/json",
                            "header-1": "value-1",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("handle missing headers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: JSON.stringify({}),
                        headers: {},
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerResponse = {
                        status: 200,
                        body: JSON.stringify({ key: "value" }),
                    };
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, handlerResponse];
                        }); }); })];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({
                        statusCode: 200,
                        body: JSON.stringify({ key: "value" }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("handle missing body", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: JSON.stringify({}),
                        headers: {},
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerResponse = {
                        status: 200,
                    };
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, handlerResponse];
                        }); }); })];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({
                        statusCode: 200,
                        body: "",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("api response returns Content-Type header from inflight`", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: JSON.stringify({}),
                        headers: {},
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerResponse = {
                        status: 200,
                        body: JSON.stringify({ key: "value" }),
                        headers: {
                            "Content-Type": "application/octet-stream",
                        },
                    };
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, handlerResponse];
                        }); }); })];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({
                        statusCode: 200,
                        body: JSON.stringify({ key: "value" }),
                        headers: {
                            "Content-Type": "application/octet-stream",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("inject cors response headers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerResponse, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: JSON.stringify({}),
                        headers: {},
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerResponse = {
                        status: 200,
                        body: JSON.stringify({ key: "value" }),
                    };
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                            return [2 /*return*/, handlerResponse];
                        }); }); }, {
                            "Access-Control-Allow-Origin": "*",
                        })];
                case 1:
                    response = _a.sent();
                    // THEN
                    (0, vitest_1.expect)(response).toEqual({
                        statusCode: 200,
                        body: JSON.stringify({ key: "value" }),
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, vitest_1.describe)("ApiRequest", function () {
    (0, vitest_1.test)("map 'APIGatewayProxyEvent' to 'cloud.ApiRequest'", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: JSON.stringify({ foo: "bar" }),
                        headers: {
                            "header-1": "value-1",
                        },
                        path: "/",
                        httpMethod: "GET",
                        pathParameters: {
                            "path-param-1": "value-1",
                        },
                        queryStringParameters: {
                            key: "value",
                        },
                        multiValueQueryStringParameters: {
                            multi: ["value1", "value2"],
                        },
                    };
                    handlerMock = vitest_1.vi.fn().mockResolvedValue({
                        status: 200,
                    });
                    // WHEN
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, handlerMock)];
                case 1:
                    // WHEN
                    _a.sent();
                    // THEN
                    (0, vitest_1.expect)(handlerMock).toHaveBeenCalledWith({
                        body: JSON.stringify({ foo: "bar" }),
                        headers: { "header-1": "value-1" },
                        method: "GET",
                        path: "/",
                        vars: { "path-param-1": "value-1" },
                        query: { key: "value", multi: "value1,value2" },
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("handle missing body", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        body: undefined,
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerMock = vitest_1.vi.fn().mockResolvedValue({
                        status: 200,
                    });
                    // WHEN
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, handlerMock)];
                case 1:
                    // WHEN
                    _a.sent();
                    // THEN
                    (0, vitest_1.expect)(handlerMock).toHaveBeenCalledWith({
                        body: "",
                        headers: undefined,
                        method: "GET",
                        path: "/",
                        query: {},
                        vars: {},
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("handle missing headers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        path: "/",
                        httpMethod: "GET",
                    };
                    handlerMock = vitest_1.vi.fn().mockResolvedValue({
                        status: 200,
                    });
                    // WHEN
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, handlerMock)];
                case 1:
                    // WHEN
                    _a.sent();
                    // THEN
                    (0, vitest_1.expect)(handlerMock).toHaveBeenCalledWith({
                        body: "",
                        headers: undefined,
                        method: "GET",
                        path: "/",
                        query: {},
                        vars: {},
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("handle body as urlencoded form", function () { return __awaiter(void 0, void 0, void 0, function () {
        var apiRequestEvent, handlerMock;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    apiRequestEvent = {
                        path: "/",
                        httpMethod: "POST",
                        body: "foo=bar&bar=baz",
                        headers: {
                            "content-type": "application/x-www-form-urlencoded",
                        },
                    };
                    handlerMock = vitest_1.vi.fn().mockResolvedValue({
                        status: 200,
                    });
                    // WHEN
                    return [4 /*yield*/, (0, api_util_1.apigwFunctionHandler)(apiRequestEvent, handlerMock)];
                case 1:
                    // WHEN
                    _a.sent();
                    // THEN
                    (0, vitest_1.expect)(handlerMock).toHaveBeenCalledWith({
                        body: JSON.stringify({ foo: "bar", bar: "baz" }),
                        headers: {
                            "content-type": "application/x-www-form-urlencoded",
                        },
                        method: "POST",
                        path: "/",
                        query: {},
                        vars: {},
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});

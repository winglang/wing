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
var net_1 = require("net");
var vitest_1 = require("vitest");
var util_1 = require("./util");
var cloud = require("../../src/cloud");
var core_1 = require("../../src/core");
var simulator_1 = require("../../src/simulator");
var sim_app_1 = require("../sim-app");
// Handler that responds to a request with a fixed string
var INFLIGHT_CODE = function (body) {
    return (0, core_1.lift)({ body: body }).inflight(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, ({
                    body: ctx.body,
                })];
        });
    }); });
};
// Handler that responds to a request with the request body
var INFLIGHT_CODE_ECHO_BODY = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                body: req.body,
                headers: req.headers,
            })];
    });
}); });
// Handler that responds to a request with the request method
var INFLIGHT_CODE_ECHO_METHOD = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                body: req.method,
            })];
    });
}); });
// Handler that responds to a request with the request path
var INFLIGHT_CODE_ECHO_PATH = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                body: req.path,
            })];
    });
}); });
// Handler that responds to a request with the request query params
var INFLIGHT_CODE_ECHO_QUERY = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                body: JSON.stringify(req.query),
                headers: { "Content-Type": "application/json" },
            })];
    });
}); });
// Handler that responds to a request with the request params
var INFLIGHT_CODE_ECHO_PARAMS = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        return [2 /*return*/, ({
                body: (_a = req.vars) !== null && _a !== void 0 ? _a : {},
            })];
    });
}); });
// Handler that responds to a request with extra response headers
var INFLIGHT_CODE_WITH_RESPONSE_HEADER = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                body: req.headers,
                headers: { "x-wingnuts": "cloudy" },
            })];
    });
}); });
// Handler that reseponds to a request with Content-Type different from default `application/json`
var INFLIGHT_CODE_WITH_CONTENTTYPE_RESPONSE_HEADER = (0, core_1.inflight)(function (_, req) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ({
                body: req.headers,
                headers: { "Content-Type": "application/octet-stream; charset=utf-8" },
            })];
    });
}); });
// Handler that responds to a request without a response body
var INFLIGHT_CODE_NO_BODY = (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, ({ status: 200 })];
}); }); });
(0, vitest_1.test)("create an api", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Api(app, "my_api");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                (0, vitest_1.expect)(s.getResourceConfig("/my_api")).toEqual({
                    attrs: {
                        handle: vitest_1.expect.any(String),
                        url: vitest_1.expect.any(String),
                    },
                    path: "root/my_api",
                    addr: vitest_1.expect.any(String),
                    policy: [],
                    props: {
                        openApiSpec: {
                            openapi: vitest_1.expect.any(String),
                            paths: {},
                        },
                    },
                    type: cloud.API_FQN,
                });
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with one GET route", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, RESPONSE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                RESPONSE = "boom";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE(RESPONSE));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(RESPONSE);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with one GET route with request params", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/users/:name";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_ECHO_PARAMS);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch("".concat(apiUrl, "/users/tsuf"), { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.json()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual({ name: "tsuf" });
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with 'name' parameter", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/:name";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_ECHO_PARAMS);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch("".concat(apiUrl, "/akhil"), { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.json()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual({ name: "akhil" });
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with 'name' & 'age' parameter", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/:name/:age";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_ECHO_PARAMS);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch("".concat(apiUrl, "/akhil/23"), { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.json()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual({ name: "akhil", age: "23" });
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api doesn't allow duplicated routes", function () {
    // GIVEN
    var app = new sim_app_1.SimApp();
    var api = new cloud.Api(app, "my_api");
    api.get("/hello", INFLIGHT_CODE_ECHO_BODY);
    // THEN
    (0, vitest_1.expect)(function () { return api.get("/hello", INFLIGHT_CODE_ECHO_BODY); }).toThrowError("Endpoint for path '/hello' and method 'GET' already exists");
});
(0, vitest_1.test)("api allows duplicates routes with different methods", function () {
    // GIVEN
    var app = new sim_app_1.SimApp();
    var api = new cloud.Api(app, "my_api");
    api.get("/hello", INFLIGHT_CODE_ECHO_BODY);
    // WHEN
    api.post("/hello", INFLIGHT_CODE_ECHO_BODY);
    // THEN
    (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
});
(0, vitest_1.test)("api doesn't allow ambiguous routes", function () {
    // GIVEN
    var app = new sim_app_1.SimApp();
    var api = new cloud.Api(app, "my_api");
    var path = "/api/hello/:name";
    api.get(path, INFLIGHT_CODE_ECHO_BODY);
    // WHEN
    var ambiguousPath = "/api/:name/hello";
    // THEN
    (0, vitest_1.expect)(function () { return api.get(ambiguousPath, INFLIGHT_CODE_ECHO_BODY); }).toThrowError("Endpoint for path '".concat(ambiguousPath, "' and method 'GET' is ambiguous - it conflicts with existing endpoint for path '").concat(path, "'"));
});
(0, vitest_1.test)("api doesn't allow ambiguous routes containing only variables", function () {
    // GIVEN
    var app = new sim_app_1.SimApp();
    var api = new cloud.Api(app, "my_api");
    var path = "/:age";
    api.get(path, INFLIGHT_CODE_ECHO_BODY);
    // WHEN
    var ambiguousPath = "/:name";
    // THEN
    (0, vitest_1.expect)(function () { return api.get(ambiguousPath, INFLIGHT_CODE_ECHO_BODY); }).toThrowError("Endpoint for path '".concat(ambiguousPath, "' and method 'GET' is ambiguous - it conflicts with existing endpoint for path '").concat(path, "'"));
});
(0, vitest_1.test)("api doesn't allow ambiguous routes containing different number of varaibles", function () {
    // GIVEN
    var app = new sim_app_1.SimApp();
    var api = new cloud.Api(app, "my_api");
    var path = "/:param/:something";
    api.get(path, INFLIGHT_CODE_ECHO_BODY);
    // WHEN
    var ambiguousPath = "/path/:something";
    // THEN
    (0, vitest_1.expect)(function () { return api.get(ambiguousPath, INFLIGHT_CODE_ECHO_BODY); }).toThrowError("Endpoint for path '".concat(ambiguousPath, "' and method 'GET' is ambiguous - it conflicts with existing endpoint for path '").concat(path, "'"));
});
(0, vitest_1.test)("api with multiple GET routes and one lambda", function () {
    // GIVEN
    var app = new sim_app_1.SimApp();
    var api = new cloud.Api(app, "my_api");
    api.get("/hello/foo", INFLIGHT_CODE_ECHO_BODY);
    api.get("/hello/bat", INFLIGHT_CODE_ECHO_BODY);
    (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
});
(0, vitest_1.test)("api supports every method type", function () { return __awaiter(void 0, void 0, void 0, function () {
    var METHODS, ROUTE, app, api, s, apiUrl, responses, _i, METHODS_1, method, r, _a, _b, _c, method, response, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                METHODS = [
                    "GET",
                    "POST",
                    "PUT",
                    "DELETE",
                    "HEAD",
                    "OPTIONS",
                    "PATCH",
                    // "CONNECT",
                    // CONNECT cannot be tested since JavaScript doesn't allow it:
                    // https://stackoverflow.com/questions/58656378/is-it-possible-to-make-an-http-connect-request-with-javascript-in-a-browser
                ];
                ROUTE = "/hello";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                METHODS.forEach(function (method) {
                    api[method.toLowerCase()](ROUTE, INFLIGHT_CODE_ECHO_METHOD);
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _e.sent();
                apiUrl = getApiUrl(s, "/my_api");
                responses = new Array();
                _i = 0, METHODS_1 = METHODS;
                _e.label = 2;
            case 2:
                if (!(_i < METHODS_1.length)) return [3 /*break*/, 5];
                method = METHODS_1[_i];
                return [4 /*yield*/, fetch(apiUrl + ROUTE, { method: method })];
            case 3:
                r = _e.sent();
                responses.push(r);
                _e.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: 
            // THEN
            return [4 /*yield*/, s.stop()];
            case 6:
                // THEN
                _e.sent();
                _a = 0, _b = zip(METHODS, responses);
                _e.label = 7;
            case 7:
                if (!(_a < _b.length)) return [3 /*break*/, 10];
                _c = _b[_a], method = _c[0], response = _c[1];
                (0, vitest_1.expect)(response.status).toEqual(200);
                if (!(method !== "HEAD")) return [3 /*break*/, 9];
                _d = vitest_1.expect;
                return [4 /*yield*/, response.text()];
            case 8:
                _d.apply(void 0, [_e.sent()]).toEqual(method);
                _e.label = 9;
            case 9:
                _a++;
                return [3 /*break*/, 7];
            case 10:
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with multiple methods on same route", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, GET_RESPONSE, POST_RESPONSE, app, api, s, apiUrl, getResponse, postResponse, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                ROUTE = "/hello";
                GET_RESPONSE = "boom";
                POST_RESPONSE = "bang";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE(GET_RESPONSE));
                api.post(ROUTE, INFLIGHT_CODE(POST_RESPONSE));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _c.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch("".concat(apiUrl).concat(ROUTE), { method: "GET" })];
            case 2:
                getResponse = _c.sent();
                return [4 /*yield*/, fetch("".concat(apiUrl).concat(ROUTE), { method: "POST" })];
            case 3:
                postResponse = _c.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _c.sent();
                (0, vitest_1.expect)(getResponse.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, getResponse.text()];
            case 5:
                _a.apply(void 0, [_c.sent()]).toEqual(GET_RESPONSE);
                (0, vitest_1.expect)(postResponse.status).toEqual(200);
                _b = vitest_1.expect;
                return [4 /*yield*/, postResponse.text()];
            case 6:
                _b.apply(void 0, [_c.sent()]).toEqual(POST_RESPONSE);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with multiple routes", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE1, ROUTE2, RESPONSE1, RESPONSE2, app, api, s, apiUrl, response1, response2, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                ROUTE1 = "/hello/world";
                ROUTE2 = "/hello/wingnuts";
                RESPONSE1 = "boom";
                RESPONSE2 = "bang";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE1, INFLIGHT_CODE(RESPONSE1));
                api.get(ROUTE2, INFLIGHT_CODE(RESPONSE2));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _c.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch("".concat(apiUrl).concat(ROUTE1), { method: "GET" })];
            case 2:
                response1 = _c.sent();
                return [4 /*yield*/, fetch("".concat(apiUrl).concat(ROUTE2), { method: "GET" })];
            case 3:
                response2 = _c.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 4:
                // THEN
                _c.sent();
                (0, vitest_1.expect)(response1.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response1.text()];
            case 5:
                _a.apply(void 0, [_c.sent()]).toEqual(RESPONSE1);
                (0, vitest_1.expect)(response2.status).toEqual(200);
                _b = vitest_1.expect;
                return [4 /*yield*/, response2.text()];
            case 6:
                _b.apply(void 0, [_c.sent()]).toEqual(RESPONSE2);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with one POST route, with body", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, REQUEST_BODY, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                REQUEST_BODY = { message: "hello world" };
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.post(ROUTE, INFLIGHT_CODE_ECHO_BODY);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, {
                        method: "POST",
                        body: JSON.stringify(REQUEST_BODY),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                _a = vitest_1.expect;
                return [4 /*yield*/, response.json()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(REQUEST_BODY);
                (0, vitest_1.expect)(response.status).toEqual(200);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api handler can read the request path", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_ECHO_PATH);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(ROUTE);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api handler can read the request params", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_ECHO_QUERY);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE + "?foo=bar&bar=baz", {
                        method: "GET",
                    })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.json()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual({ foo: "bar", bar: "baz" });
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api handler can set response headers", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, REQUEST_HEADER_KEY, REQUEST_HEADER_VALUE, app, api, s, apiUrl, response, json;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                REQUEST_HEADER_KEY = "foo";
                REQUEST_HEADER_VALUE = "bar";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_WITH_RESPONSE_HEADER);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, {
                        method: "GET",
                        headers: (_a = {},
                            _a[REQUEST_HEADER_KEY] = REQUEST_HEADER_VALUE,
                            _a),
                    })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                return [4 /*yield*/, response.json()];
            case 4:
                json = _b.sent();
                (0, vitest_1.expect)(json[REQUEST_HEADER_KEY]).toEqual(REQUEST_HEADER_VALUE);
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api url can be used as environment variable", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, api, simfile, s, fnEnvironmentValue, fnEnvironmentValueAfterStart, fnClient, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                new cloud.Function(app, "my_function", (0, core_1.inflight)(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, process.env.API_URL];
                }); }); }), {
                    env: {
                        API_URL: api.url,
                    },
                });
                simfile = app.synth();
                s = new simulator_1.Simulator({ simfile: simfile });
                fnEnvironmentValue = s.getResourceConfig("/my_function").props.environmentVariables.API_URL;
                return [4 /*yield*/, s.start()];
            case 1:
                _a.sent();
                fnEnvironmentValueAfterStart = s.getResourceConfig("/my_function").props.environmentVariables.API_URL;
                fnClient = s.getResource("/my_function");
                return [4 /*yield*/, fnClient.invoke()];
            case 2:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(fnEnvironmentValue).toEqual("${wsim#root/my_api#attrs.url}");
                (0, vitest_1.expect)(fnEnvironmentValueAfterStart).toEqual(vitest_1.expect.stringMatching(/^http/));
                (0, vitest_1.expect)(response === null || response === void 0 ? void 0 : response.startsWith("http://")).toEqual(true);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api response returns Content-Type header from inflight", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ROUTE = "/hello";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_WITH_CONTENTTYPE_RESPONSE_HEADER);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, {
                        method: "GET",
                    })];
            case 2:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                (0, vitest_1.expect)(response.headers.get("Content-Type")).toEqual("application/octet-stream; charset=utf-8");
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api response returns default Content-Type header", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ROUTE = "/hello";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api");
                api.get(ROUTE, INFLIGHT_CODE_ECHO_BODY);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, {
                        method: "GET",
                    })];
            case 2:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                // the default for no body requests
                (0, vitest_1.expect)(response.headers.get("Content-Type")).toEqual("text/html; charset=utf-8");
                (0, vitest_1.expect)((0, util_1.listMessages)(s)).toMatchSnapshot();
                (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                return [2 /*return*/];
        }
    });
}); });
function getApiUrl(s, path) {
    var apiAttrs = s.getResourceConfig(path).attrs;
    return apiAttrs.url;
}
function zip(a, b) {
    return a.map(function (x, i) { return [x, b[i]]; });
}
(0, vitest_1.test)("request & response body are strings", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "Api");
                api.post("/test", INFLIGHT_CODE_ECHO_BODY);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/Api");
                return [4 /*yield*/, fetch(apiUrl + "/test", {
                        method: "POST",
                        body: "hello world, this is a string",
                    })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual("hello world, this is a string");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("no response body", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, api, s, apiUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "Api");
                api.post("/test", INFLIGHT_CODE_NO_BODY);
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl = getApiUrl(s, "/Api");
                return [4 /*yield*/, fetch(apiUrl + "/test", {
                        method: "POST",
                        body: "hello world, this is a string",
                    })];
            case 2:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                (0, vitest_1.expect)(response.bodyUsed).toBeFalsy();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("404 handler", function () { return __awaiter(void 0, void 0, void 0, function () {
    var RESPONSE, app, api, s, apiUrl, response, body;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                RESPONSE = "boom";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "Api");
                api.post("/test", INFLIGHT_CODE(RESPONSE));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl = getApiUrl(s, "/Api");
                return [4 /*yield*/, fetch(apiUrl + "/does-not-exist", {
                        method: "POST",
                        body: "hello world, this is a string",
                    })];
            case 2:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                return [4 /*yield*/, response.text()];
            case 4:
                body = _a.sent();
                (0, vitest_1.expect)(response.status).toEqual(404);
                (0, vitest_1.expect)(body).toContain("Error");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with CORS defaults", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, RESPONSE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                RESPONSE = "boom";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api", { cors: true });
                api.get(ROUTE, INFLIGHT_CODE(RESPONSE));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(RESPONSE);
                (0, vitest_1.expect)(response.headers.get("access-control-allow-origin")).toEqual("*");
                (0, vitest_1.expect)(response.headers.get("access-control-allow-credentials")).toEqual("false");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with custom CORS settings", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, RESPONSE, app, api, s, apiUrl, response, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                ROUTE = "/hello";
                RESPONSE = "boom";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api", {
                    cors: true,
                    corsOptions: {
                        allowOrigin: "https://example.com",
                        allowCredentials: true,
                        exposeHeaders: ["x-wingnuts"],
                    },
                });
                api.get(ROUTE, INFLIGHT_CODE(RESPONSE));
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _b.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, { method: "GET" })];
            case 2:
                response = _b.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _b.sent();
                (0, vitest_1.expect)(response.status).toEqual(200);
                _a = vitest_1.expect;
                return [4 /*yield*/, response.text()];
            case 4:
                _a.apply(void 0, [_b.sent()]).toEqual(RESPONSE);
                (0, vitest_1.expect)(response.headers.get("access-control-allow-origin")).toEqual("https://example.com");
                (0, vitest_1.expect)(response.headers.get("access-control-allow-credentials")).toEqual("true");
                (0, vitest_1.expect)(response.headers.get("access-control-expose-headers")).toEqual("x-wingnuts");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api with CORS settings responds to OPTIONS request", function () { return __awaiter(void 0, void 0, void 0, function () {
    var ROUTE, app, api, s, apiUrl, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ROUTE = "/hello";
                app = new sim_app_1.SimApp();
                api = new cloud.Api(app, "my_api", {
                    cors: true,
                });
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl = getApiUrl(s, "/my_api");
                return [4 /*yield*/, fetch(apiUrl + ROUTE, { method: "OPTIONS" })];
            case 2:
                response = _a.sent();
                // THEN
                return [4 /*yield*/, s.stop()];
            case 3:
                // THEN
                _a.sent();
                (0, vitest_1.expect)(response.status).toEqual(204);
                (0, vitest_1.expect)(response.headers.get("access-control-allow-headers")).toEqual("Content-Type,Authorization,X-Requested-With");
                (0, vitest_1.expect)(response.headers.get("access-control-allow-methods")).toEqual("GET,POST,PUT,DELETE,HEAD,OPTIONS");
                (0, vitest_1.expect)(response.headers.get("access-control-max-age")).toEqual("300");
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api reuses ports between simulator runs", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, apiUrl1, apiUrl2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Api(app, "my_api");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl1 = getApiUrl(s, "/my_api");
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                return [4 /*yield*/, s.start()];
            case 3:
                _a.sent();
                apiUrl2 = getApiUrl(s, "/my_api");
                // THEN
                (0, vitest_1.expect)(apiUrl1).toEqual(apiUrl2);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("api does not use a port that is already taken", function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, s, apiUrl1, port, server, apiUrl2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = new sim_app_1.SimApp();
                new cloud.Api(app, "my_api");
                return [4 /*yield*/, app.startSimulator()];
            case 1:
                s = _a.sent();
                apiUrl1 = getApiUrl(s, "/my_api");
                return [4 /*yield*/, s.stop()];
            case 2:
                _a.sent();
                port = new URL(apiUrl1).port;
                server = (0, net_1.createServer)();
                server.listen(port);
                // wait for the server to start
                return [4 /*yield*/, new Promise(function (resolve) { return server.on("listening", resolve); })];
            case 3:
                // wait for the server to start
                _a.sent();
                // start the simulator again, expecting a different port
                return [4 /*yield*/, s.start()];
            case 4:
                // start the simulator again, expecting a different port
                _a.sent();
                apiUrl2 = getApiUrl(s, "/my_api");
                (0, vitest_1.expect)(apiUrl1).not.toEqual(apiUrl2);
                // clean up the server
                server.close();
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.describe)("sibling paths are found", function () {
    (0, vitest_1.test)("none parametrized paths are not siblings", function () {
        var app = new sim_app_1.SimApp();
        var api = new cloud.Api(app, "my_api");
        try {
            api.get("/abc", INFLIGHT_CODE_NO_BODY);
            api.get("/def", INFLIGHT_CODE_NO_BODY);
            (0, vitest_1.expect)(true).toBeTruthy();
        }
        catch (e) {
            (0, vitest_1.expect)(false).toBeTruthy();
        }
    });
    (0, vitest_1.test)("root parameterized paths are siblings", function () {
        var app = new sim_app_1.SimApp();
        var api = new cloud.Api(app, "my_api");
        try {
            api.get("/:username/a", INFLIGHT_CODE_NO_BODY);
            api.get("/:id/b", INFLIGHT_CODE_NO_BODY);
            (0, vitest_1.expect)(false).toBeTruthy();
        }
        catch (e) {
            (0, vitest_1.expect)(e.message).toBe("Endpoint for path '/:id/b' and method 'GET' conflicts with existing sibling endpoint for path '/:username/a'- try to match the parameter names to avoid this error.");
        }
    });
    (0, vitest_1.test)("paths with different param name at the same index are siblings", function () {
        var app = new sim_app_1.SimApp();
        var api = new cloud.Api(app, "my_api");
        try {
            api.get("/something/:username", INFLIGHT_CODE_NO_BODY);
            api.get("/something_else/:id", INFLIGHT_CODE_NO_BODY);
            (0, vitest_1.expect)(false).toBeTruthy();
        }
        catch (e) {
            (0, vitest_1.expect)(e.message).toBe("Endpoint for path '/something_else/:id' and method 'GET' conflicts with existing sibling endpoint for path '/something/:username'- try to match the parameter names to avoid this error.");
        }
    });
    (0, vitest_1.test)("paths with the same param name at the same index are siblings", function () {
        var app = new sim_app_1.SimApp();
        var api = new cloud.Api(app, "my_api");
        try {
            api.get("/something/:username", INFLIGHT_CODE_NO_BODY);
            api.get("/something_else/:username", INFLIGHT_CODE_NO_BODY);
            (0, vitest_1.expect)(true).toBeTruthy();
        }
        catch (e) {
            (0, vitest_1.expect)(false).toBeTruthy();
        }
    });
});

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var http_1 = require("../../src/http/http");
var defaultOptions = {
    method: http_1.HttpMethod.GET,
    headers: {},
    cache: http_1.RequestCache.DEFAULT,
    redirect: http_1.RequestRedirect.FOLLOW,
};
(0, vitest_1.describe)("fetch", function () {
    global.fetch = vitest_1.vi.fn();
    (0, vitest_1.beforeEach)(function () {
        global.fetch.mockClear();
    });
    (0, vitest_1.test)("get, post, put, patch and delete return response when supplying a url", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectResponse, _a, _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    global.fetch.mockImplementation(function (url) { return ({
                        url: url,
                        headers: new Headers([["content-type", "application/json"]]),
                        status: 200,
                        text: function () { return Promise.resolve("ok!"); },
                    }); });
                    expectResponse = function (response) {
                        (0, vitest_1.expect)(response.body).toBe("ok!");
                        (0, vitest_1.expect)(response.url).toBe("url");
                        (0, vitest_1.expect)(response.status).toBe(200);
                        (0, vitest_1.expect)(response.headers).toEqual({ "content-type": "application/json" });
                    };
                    _a = expectResponse;
                    return [4 /*yield*/, http_1.Util.get("url")];
                case 1:
                    _a.apply(void 0, [_f.sent()]);
                    _b = expectResponse;
                    return [4 /*yield*/, http_1.Util.put("url")];
                case 2:
                    _b.apply(void 0, [_f.sent()]);
                    _c = expectResponse;
                    return [4 /*yield*/, http_1.Util.post("url")];
                case 3:
                    _c.apply(void 0, [_f.sent()]);
                    _d = expectResponse;
                    return [4 /*yield*/, http_1.Util.patch("url")];
                case 4:
                    _d.apply(void 0, [_f.sent()]);
                    _e = expectResponse;
                    return [4 /*yield*/, http_1.Util.delete("url")];
                case 5:
                    _e.apply(void 0, [_f.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("http.fetch is working with all methods", function () { return __awaiter(void 0, void 0, void 0, function () {
        var expectResponse, _a, _b, _c, _i, method, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    global.fetch.mockImplementation(function (url) { return ({
                        url: url,
                        headers: new Headers([["content-type", "application/json"]]),
                        status: 200,
                        text: function () { return Promise.resolve("ok!"); },
                    }); });
                    expectResponse = function (response) {
                        (0, vitest_1.expect)(response.body).toBe("ok!");
                        (0, vitest_1.expect)(response.url).toBe("url");
                        (0, vitest_1.expect)(response.status).toBe(200);
                        (0, vitest_1.expect)(response.headers).toEqual({ "content-type": "application/json" });
                    };
                    _a = http_1.HttpMethod;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _e.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    method = _c;
                    _d = expectResponse;
                    //@ts-expect-error- ts thinks method is a string
                    return [4 /*yield*/, http_1.Util.fetch("url", { method: method })];
                case 2:
                    _d.apply(void 0, [
                        //@ts-expect-error- ts thinks method is a string
                        _e.sent()]);
                    _e.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("getting back json body parses well", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jsonBody, expectResponse, _a, _b, _c, _i, method, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    jsonBody = { a: "hello", b: 2.2, c: false };
                    global.fetch.mockImplementation(function (url) { return ({
                        url: url,
                        headers: new Headers([["content-type", "application/json"]]),
                        status: 200,
                        text: function () { return Promise.resolve(JSON.stringify(jsonBody)); },
                    }); });
                    expectResponse = function (response) {
                        (0, vitest_1.expect)(JSON.parse(response.body)).toEqual(jsonBody);
                        (0, vitest_1.expect)(response.url).toBe("url");
                        (0, vitest_1.expect)(response.status).toBe(200);
                        (0, vitest_1.expect)(response.headers).toEqual({ "content-type": "application/json" });
                    };
                    _a = http_1.HttpMethod;
                    _b = [];
                    for (_c in _a)
                        _b.push(_c);
                    _i = 0;
                    _k.label = 1;
                case 1:
                    if (!(_i < _b.length)) return [3 /*break*/, 4];
                    _c = _b[_i];
                    if (!(_c in _a)) return [3 /*break*/, 3];
                    method = _c;
                    _d = expectResponse;
                    //@ts-expect-error- ts thinks method is a string
                    return [4 /*yield*/, http_1.Util.fetch("url", { method: method })];
                case 2:
                    _d.apply(void 0, [
                        //@ts-expect-error- ts thinks method is a string
                        _k.sent()]);
                    _k.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    _e = expectResponse;
                    return [4 /*yield*/, http_1.Util.get("url")];
                case 5:
                    _e.apply(void 0, [_k.sent()]);
                    _f = expectResponse;
                    return [4 /*yield*/, http_1.Util.put("url")];
                case 6:
                    _f.apply(void 0, [_k.sent()]);
                    _g = expectResponse;
                    return [4 /*yield*/, http_1.Util.post("url")];
                case 7:
                    _g.apply(void 0, [_k.sent()]);
                    _h = expectResponse;
                    return [4 /*yield*/, http_1.Util.patch("url")];
                case 8:
                    _h.apply(void 0, [_k.sent()]);
                    _j = expectResponse;
                    return [4 /*yield*/, http_1.Util.delete("url")];
                case 9:
                    _j.apply(void 0, [_k.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("http.get with no options implements all default options", function () { return __awaiter(void 0, void 0, void 0, function () {
        var f;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    global.fetch.mockImplementation(function (url) { return ({
                        url: url,
                        headers: new Headers([["content-type", "application/json"]]),
                        status: 200,
                        text: function () { return Promise.resolve("ok!"); },
                    }); });
                    f = vitest_1.vi.spyOn(global, "fetch");
                    return [4 /*yield*/, http_1.Util.get("url")];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(f).toBeCalledWith("url", __assign({}, defaultOptions));
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("http.fetch with no options implements all default options", function () { return __awaiter(void 0, void 0, void 0, function () {
        var f;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    global.fetch.mockImplementation(function (url) { return ({
                        url: url,
                        headers: new Headers([["content-type", "application/json"]]),
                        status: 200,
                        text: function () { return Promise.resolve("ok!"); },
                    }); });
                    f = vitest_1.vi.spyOn(global, "fetch");
                    return [4 /*yield*/, http_1.Util.fetch("url")];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(f).toBeCalledWith("url", defaultOptions);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("http.put method cannot be overridden", function () { return __awaiter(void 0, void 0, void 0, function () {
        var f;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    global.fetch.mockImplementation(function (url) { return ({
                        url: url,
                        headers: new Headers([["content-type", "application/json"]]),
                        status: 200,
                        text: function () { return Promise.resolve("ok!"); },
                    }); });
                    f = vitest_1.vi.spyOn(global, "fetch");
                    return [4 /*yield*/, http_1.Util.put("url", { method: http_1.HttpMethod.GET })];
                case 1:
                    _a.sent();
                    (0, vitest_1.expect)(f).toBeCalledWith("url", __assign(__assign({}, defaultOptions), { method: http_1.HttpMethod.PUT }));
                    return [2 /*return*/];
            }
        });
    }); });
});

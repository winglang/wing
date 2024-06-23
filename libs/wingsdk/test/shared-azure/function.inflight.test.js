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
var http_1 = require("../../src/http");
var function_inflight_1 = require("../../src/shared-azure/function.inflight");
(0, vitest_1.afterEach)(function () {
    vitest_1.vi.clearAllMocks();
});
(0, vitest_1.test)("invoke with successful response", function () { return __awaiter(void 0, void 0, void 0, function () {
    var FUNCTION_NAME, PAYLOAD, RESPONSE, post, client, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FUNCTION_NAME = "FUNCTION_NAME";
                PAYLOAD = "PAYLOAD";
                RESPONSE = "RESPONSE";
                post = vitest_1.vi.spyOn(http_1.Util, "post").mockResolvedValue({
                    body: RESPONSE,
                    status: 200,
                    ok: true,
                    headers: {},
                    url: "",
                });
                client = new function_inflight_1.FunctionClient(FUNCTION_NAME);
                return [4 /*yield*/, client.invoke(PAYLOAD)];
            case 1:
                response = _a.sent();
                // THEN
                (0, vitest_1.expect)(post).toBeCalledTimes(1);
                (0, vitest_1.expect)(response).toEqual(RESPONSE);
                return [2 /*return*/];
        }
    });
}); });
(0, vitest_1.test)("invoke with unsuccessful response", function () { return __awaiter(void 0, void 0, void 0, function () {
    var FUNCTION_NAME, PAYLOAD, ERROR, client;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FUNCTION_NAME = "FUNCTION_NAME";
                PAYLOAD = "PAYLOAD";
                ERROR = "Error while invoking the function ".concat(FUNCTION_NAME, ":\nexpected test error");
                vitest_1.vi.spyOn(http_1.Util, "post").mockResolvedValue({
                    body: "expected test error",
                    status: 500,
                    ok: false,
                    headers: {},
                    url: "",
                });
                client = new function_inflight_1.FunctionClient(FUNCTION_NAME);
                return [4 /*yield*/, (0, vitest_1.expect)(function () { return client.invoke(PAYLOAD); }).rejects.toThrowError(ERROR)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

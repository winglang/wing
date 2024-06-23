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
var enhanced_error_1 = require("../../src/util/enhanced-error");
(0, vitest_1.describe)("prettyPrintError", function () {
    (0, vitest_1.test)("message", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, enhanced_error_1.prettyPrintError)("message")];
                case 1:
                    result = _a.sent();
                    // no stack trace available
                    (0, vitest_1.expect)(result).toMatchInlineSnapshot('"Error: message"');
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("empty message", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, enhanced_error_1.prettyPrintError)("")];
                case 1:
                    result = _a.sent();
                    (0, vitest_1.expect)(result).toBe("");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("error object", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, resultLines, interestingPart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, enhanced_error_1.prettyPrintError)(new Error("message"))];
                case 1:
                    result = _a.sent();
                    resultLines = result.split("\n");
                    interestingPart = resultLines.slice(0, 7).join("\n");
                    (0, vitest_1.expect)(resultLines[8]).toMatch(/^at /);
                    (0, vitest_1.expect)(interestingPart).toMatchInlineSnapshot("\n      \"Error: message\n         --> test/util/enhanced-error.test.ts:17:43\n         |   expect(result).toBe(\"\");\n         | });\n         | test(\"error object\", async () => {\n      17 |   const result = await prettyPrintError(new Error(\"message\"));\n         |                                         ^\"\n    ");
                    return [2 /*return*/];
            }
        });
    }); });
    (0, vitest_1.test)("stack", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result, interestingPart;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, enhanced_error_1.prettyPrintError)(new Error("message\nwith extra line").stack)];
                case 1:
                    result = _a.sent();
                    interestingPart = result.split("\n").slice(0, 8).join("\n");
                    (0, vitest_1.expect)(interestingPart).toMatchInlineSnapshot("\n      \"Error: message\n      with extra line\n         --> test/util/enhanced-error.test.ts:34:7\n         | });\n         | test(\"stack\", async () => {\n         |   const result = await prettyPrintError(\n      34 |     new Error(\"message\\nwith extra line\").stack!\n         |     ^\"\n    ");
                    return [2 /*return*/];
            }
        });
    }); });
});
(0, vitest_1.describe)("dedent", function () {
    (0, vitest_1.test)("simple string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            result = (0, enhanced_error_1.dedent)(["hello"]).join("\n");
            (0, vitest_1.expect)(result).toBe("hello");
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.test)("multiline string", function () { return __awaiter(void 0, void 0, void 0, function () {
        var s, result;
        return __generator(this, function (_a) {
            s = "hello\n  world";
            result = (0, enhanced_error_1.dedent)(s.split("\n")).join("\n");
            (0, vitest_1.expect)(result).toBe("hello\n  world");
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.test)("multiline string with empty line", function () { return __awaiter(void 0, void 0, void 0, function () {
        var s, result;
        return __generator(this, function (_a) {
            s = "    hello\n   \n  world";
            result = (0, enhanced_error_1.dedent)(s.split("\n")).join("\n");
            (0, vitest_1.expect)(result).toBe("  hello\n \nworld");
            return [2 /*return*/];
        });
    }); });
    (0, vitest_1.test)("multiline string with empty line and trailing newline", function () { return __awaiter(void 0, void 0, void 0, function () {
        var s, result;
        return __generator(this, function (_a) {
            s = "hello\n \n  world\n ";
            result = (0, enhanced_error_1.dedent)(s.split("\n")).join("\n");
            (0, vitest_1.expect)(result).toBe(s);
            return [2 /*return*/];
        });
    }); });
});

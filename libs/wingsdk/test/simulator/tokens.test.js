"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var tokens_1 = require("../../src/simulator/tokens");
(0, vitest_1.describe)("parseToken", function () {
    (0, vitest_1.test)("parses path", function () {
        var _a, _b;
        (0, vitest_1.expect)((_a = (0, tokens_1.parseToken)("${wsim#foo#attrs.bar}")) === null || _a === void 0 ? void 0 : _a.path).toBe("foo");
        (0, vitest_1.expect)((_b = (0, tokens_1.parseToken)("${wsim#foo/jang/bang#props.bar}")) === null || _b === void 0 ? void 0 : _b.path).toBe("foo/jang/bang");
    });
    (0, vitest_1.test)("parses attribute", function () {
        var result = (0, tokens_1.parseToken)("${wsim#foo/lang#attrs.bar}");
        (0, vitest_1.expect)(result === null || result === void 0 ? void 0 : result.path).toBe("foo/lang");
        (0, vitest_1.expect)(result === null || result === void 0 ? void 0 : result.attr).toBe("bar");
        (0, vitest_1.expect)(result === null || result === void 0 ? void 0 : result.prop).toBeUndefined();
    });
    (0, vitest_1.test)("parses property", function () {
        var result = (0, tokens_1.parseToken)("${wsim#foo#props.bar}");
        (0, vitest_1.expect)(result === null || result === void 0 ? void 0 : result.path).toBe("foo");
        (0, vitest_1.expect)(result === null || result === void 0 ? void 0 : result.prop).toBe("bar");
        (0, vitest_1.expect)(result === null || result === void 0 ? void 0 : result.attr).toBeUndefined();
    });
    (0, vitest_1.test)("invalid tokens", function () {
        (0, vitest_1.expect)(function () { return (0, tokens_1.parseToken)("${foo#baz}"); }).toThrow(/Invalid token reference/);
        (0, vitest_1.expect)(function () { return (0, tokens_1.parseToken)("${wsim#foo#baz}"); }).toThrow(/Invalid token reference/);
    });
});
(0, vitest_1.describe)("tryResolveTokens", function () {
    (0, vitest_1.test)("undefined", function () {
        (0, vitest_1.expect)((0, tokens_1.resolveTokens)(undefined, function () { return "foo"; })).toBeUndefined();
    });
    (0, vitest_1.test)("terminal token", function () {
        (0, vitest_1.expect)((0, tokens_1.resolveTokens)("${wsim#foo/bar#attrs.bar}", function (token) {
            (0, vitest_1.expect)(token.path).toBe("foo/bar");
            (0, vitest_1.expect)(token.attr).toBe("bar");
            (0, vitest_1.expect)(token.prop).toBeUndefined();
            return "resolved_token";
        })).toBe("resolved_token");
        (0, vitest_1.expect)((0, tokens_1.resolveTokens)("${wsim#foo/bar#props.bar}", function (token) {
            (0, vitest_1.expect)(token.path).toBe("foo/bar");
            (0, vitest_1.expect)(token.prop).toBe("bar");
            (0, vitest_1.expect)(token.attr).toBeUndefined();
            return "resolved_token_2";
        })).toBe("resolved_token_2");
    });
    (0, vitest_1.test)("nested token inside a string", function () {
        (0, vitest_1.expect)((0, tokens_1.resolveTokens)("hello, I am a ${wsim#foo/bar#attrs.tttt} inside a ${wsim#bing/bang#props.vvv}", function (token) {
            if (token.path === "foo/bar" && token.attr === "tttt") {
                return "cool nested token";
            }
            if (token.path === "bing/bang" && token.prop === "vvv") {
                return "cool string";
            }
            vitest_1.expect.fail("unexpected token: ".concat(JSON.stringify(token)));
        })).toBe("hello, I am a cool nested token inside a cool string");
    });
    (0, vitest_1.test)("tokens within an array", function () {
        var result = (0, tokens_1.resolveTokens)([
            "bla",
            "${wsim#foo/bar#attrs.tttt}",
            "blabla",
            "nested nested ${wsim#bing/bang#props.vvv} nested",
        ], function (token) {
            if (token.path === "foo/bar" && token.attr === "tttt") {
                return "T1";
            }
            if (token.path === "bing/bang" && token.prop === "vvv") {
                return "T2";
            }
            vitest_1.expect.fail("unexpected token: ".concat(JSON.stringify(token)));
        });
        (0, vitest_1.expect)(result).toEqual(["bla", "T1", "blabla", "nested nested T2 nested"]);
    });
    (0, vitest_1.test)("tokens within an object", function () {
        var result = (0, tokens_1.resolveTokens)({
            key1: "bla",
            key2: "${wsim#foo/bar#attrs.tttt}",
            key3: {
                bang: ["nested nested ${wsim#bing/bang#props.vvv} nested"],
                bing: {
                    jone: "${wsim#foo/bar#attrs.tttt}",
                },
            },
        }, function (token) {
            if (token.path === "foo/bar" && token.attr === "tttt") {
                return "T1";
            }
            if (token.path === "bing/bang" && token.prop === "vvv") {
                return "T2";
            }
            vitest_1.expect.fail("unexpected token: ".concat(JSON.stringify(token)));
        });
        (0, vitest_1.expect)(result).toEqual({
            key1: "bla",
            key2: "T1",
            key3: {
                bang: ["nested nested T2 nested"],
                bing: {
                    jone: "T1",
                },
            },
        });
    });
});

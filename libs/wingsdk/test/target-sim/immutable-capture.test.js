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
var function_1 = require("../../src/cloud/function");
var inflight_1 = require("../../src/core/inflight");
var types_1 = require("../../src/core/types");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
captureTest("array", function () {
    return (0, inflight_1.lift)({ my_capture: ["hello", "dude"] }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture.length === 2);
            assert(ctx.my_capture[0] === "hello");
            assert(ctx.my_capture[1] === "dude");
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("string", function () {
    return (0, inflight_1.lift)({ my_capture: "bam bam bam" }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture.length === 11);
            assert(ctx.my_capture === "bam bam bam");
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("number", function () {
    return (0, inflight_1.lift)({ my_capture: 123 }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture + 20 === 143);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("boolean", function () {
    return (0, inflight_1.lift)({ my_capture: false }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture === false);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("struct", function () {
    return (0, inflight_1.lift)({
        my_capture: { hello: "dude", world: "cup", foo: "bar" },
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture.hello === "dude");
            assert(ctx.my_capture.world === "cup");
            assert(ctx.my_capture.foo === "bar");
            assert(Object.keys(ctx.my_capture).length === 3);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("set", function () {
    return (0, inflight_1.lift)({ my_capture: new Set(["boom", "bam", "bang"]) }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture.has("boom"));
            assert(ctx.my_capture.has("bam"));
            assert(ctx.my_capture.has("bang"));
            assert(ctx.my_capture.size === 3);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("duration", function () {
    return (0, inflight_1.lift)({ my_capture: std_1.Duration.fromHours(2) }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture.minutes === 120);
            assert(ctx.my_capture.seconds === 7200);
            assert(ctx.my_capture.hours === 2);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("map", function () {
    return (0, inflight_1.lift)({
        my_capture: new Map([
            ["foo", 123],
            ["bar", 456],
        ]),
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_capture.has("foo"));
            assert(ctx.my_capture.has("bar"));
            assert(ctx.my_capture.size === 2);
            assert(ctx.my_capture.get("foo") === 123);
            assert(ctx.my_capture.get("bar") === 456);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("array of durations", function () {
    return (0, inflight_1.lift)({
        my_array: [std_1.Duration.fromMinutes(10), std_1.Duration.fromMinutes(20)],
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_array.length === 2);
            assert(ctx.my_array[0].minutes === 10);
            assert(ctx.my_array[1].minutes === 20);
            return [2 /*return*/, undefined];
        });
    }); });
});
captureTest("map of arrays", function () {
    return (0, inflight_1.lift)({
        my_map: new Map([
            ["foo", [1, 2]],
            ["bar", [3, 4]],
        ]),
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            assert(ctx.my_map.has("foo"));
            assert(ctx.my_map.has("bar"));
            assert(ctx.my_map.size === 2);
            assert(((_a = ctx.my_map.get("foo")) === null || _a === void 0 ? void 0 : _a[0]) === 1);
            assert(((_b = ctx.my_map.get("foo")) === null || _b === void 0 ? void 0 : _b[1]) === 2);
            assert(((_c = ctx.my_map.get("bar")) === null || _c === void 0 ? void 0 : _c[0]) === 3);
            assert(((_d = ctx.my_map.get("bar")) === null || _d === void 0 ? void 0 : _d[1]) === 4);
            return [2 /*return*/, undefined];
        });
    }); });
});
// array of maps
captureTest("array of maps", function () {
    return (0, inflight_1.lift)({
        my_array: [
            new Map([
                ["foo", 1],
                ["bar", 2],
            ]),
            new Map([
                ["foo", 3],
                ["bar", 4],
            ]),
        ],
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_array[0].get("foo") === 1);
            assert(ctx.my_array[1].get("bar") === 4);
            return [2 /*return*/, undefined];
        });
    }); });
});
// set of durations
captureTest("set of durations", function () {
    return (0, inflight_1.lift)({
        my_set: new Set([std_1.Duration.fromMinutes(10), std_1.Duration.fromMinutes(20)]),
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(Array.from(ctx.my_set)[0].minutes === 10);
            assert(Array.from(ctx.my_set)[0].hours === 0.16666666666666666);
            assert(Array.from(ctx.my_set)[1].seconds === 1200);
            return [2 /*return*/, undefined];
        });
    }); });
});
// map of arrays of durations
captureTest("map of arrays of durations", function () {
    return (0, inflight_1.lift)({
        my_map: new Map([
            ["foo", [std_1.Duration.fromMinutes(10), std_1.Duration.fromMinutes(20)]],
            ["bar", [std_1.Duration.fromMinutes(30), std_1.Duration.fromMinutes(40)]],
        ]),
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            assert(((_a = ctx.my_map.get("foo")) === null || _a === void 0 ? void 0 : _a[0].minutes) === 10);
            assert(((_b = ctx.my_map.get("foo")) === null || _b === void 0 ? void 0 : _b[1].seconds) === 20 * 60);
            assert(((_c = ctx.my_map.get("bar")) === null || _c === void 0 ? void 0 : _c[0].minutes) === 30);
            assert(((_d = ctx.my_map.get("bar")) === null || _d === void 0 ? void 0 : _d[1].seconds) === 40 * 60);
            return [2 /*return*/, undefined];
        });
    }); });
});
// struct of maps
captureTest("struct of maps", function () {
    return (0, inflight_1.lift)({
        my_struct: {
            foo: new Map([
                ["foo", 1],
                ["bar", 2],
            ]),
            bar: new Map([
                ["foo", 3],
                ["bar", 4],
            ]),
        },
    }).inflight(function (ctx, assert) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            assert(ctx.my_struct.foo.get("foo") === 1);
            assert(ctx.my_struct.foo.get("bar") === 2);
            assert(ctx.my_struct.bar.get("foo") === 3);
            assert(ctx.my_struct.bar.get("bar") === 4);
            return [2 /*return*/, undefined];
        });
    }); });
});
// capturing collections of buckets isn't supported yet
// // array of buckets
// captureTest("array of buckets", (scope) => ({
//   bindings: {
//     my_buckets: {
//       obj: [new Bucket(scope, "B1"), new Bucket(scope, "B2")],
//     },
//   },
//   inflightCode: [
//     `await this.my_buckets[0].put("hello.txt", "world");`,
//     `const objects = await this.my_buckets[0].list();`,
//     `assert(objects.length === 1)`,
//     `assert(objects[0] === "hello.txt")`,
//     `await this.my_buckets[1].put("foo", "bar");`,
//     `assert(await this.my_buckets[1].get("foo") === "bar")`,
//   ],
// }));
// // map of buckets
// captureTest("map of buckets", (scope) => ({
//   bindings: {
//     my_map: {
//       obj: Object.freeze(
//         new Map([
//           ["foo", new Bucket(scope, "B1")],
//           ["bar", new Bucket(scope, "B2")],
//         ])
//       ),
//     },
//   },
//   inflightCode: [
//     `const foo = this.my_map.get("foo");`,
//     `await foo.put("hello.txt", "world");`,
//     `assert(await foo.get("hello.txt") === "world")`,
//   ],
// }));
// // struct with resources
// captureTest("struct with resources", (scope) => ({
//   bindings: {
//     my_struct: {
//       obj: {
//         bucky: new Bucket(scope, "B1"),
//         mapy: Object.freeze(
//           new Map([
//             ["foo", new Bucket(scope, "B2")],
//             ["bar", new Bucket(scope, "B3")],
//           ])
//         ),
//         arry: {
//           boom: [new Bucket(scope, "B4"), new Bucket(scope, "B5")],
//         },
//       },
//     },
//   },
//   inflightCode: [
//     `const b = this.my_struct.bucky;`,
//     `await b.put("hello.txt", "world");`,
//     `assert(await b.get("hello.txt") === "world")`,
//     `const boom = this.my_struct.arry.boom[1];`,
//     `assert((await boom.list()).length === 0)`,
//     `const bar = this.my_struct.mapy.get("bar");`,
//     `await bar.put("foo", "bar");`,
//     `assert(await bar.get("foo") === "bar")`,
//   ],
// }));
// -----------------------------
function captureTest(name, t) {
    var _this = this;
    (0, vitest_1.test)(name, function () { return __awaiter(_this, void 0, void 0, function () {
        var app, handler, sim, fn;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    app = new sim_app_1.SimApp();
                    handler = t(app);
                    new function_1.Function(app, "Function", (0, inflight_1.lift)({ handler: handler }).inflight(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var baseAssert;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    baseAssert = require("assert");
                                    return [4 /*yield*/, ctx.handler(baseAssert)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/, undefined];
                            }
                        });
                    }); }));
                    return [4 /*yield*/, app.startSimulator()];
                case 1:
                    sim = _a.sent();
                    fn = sim.getResource("root/Function");
                    return [4 /*yield*/, fn.invoke()];
                case 2:
                    _a.sent();
                    (0, vitest_1.expect)(app.snapshot()).toMatchSnapshot();
                    return [2 /*return*/];
            }
        });
    }); });
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var graph_1 = require("../../src/simulator/graph");
(0, vitest_1.test)("empty", function () {
    var graph = new graph_1.Graph([]);
    (0, vitest_1.expect)(graph.nodes.length).toBe(0);
});
(0, vitest_1.test)("two disconnected nodes", function () {
    var graph = new graph_1.Graph([{ path: "a" }, { path: "b" }]);
    (0, vitest_1.expect)(graph.nodes.length).toBe(2);
    var a = graph.tryFind("a");
    (0, vitest_1.expect)(a.def).toStrictEqual({ path: "a" });
    (0, vitest_1.expect)(Array.from(a.dependencies)).toStrictEqual([]);
    (0, vitest_1.expect)(Array.from(a.dependents)).toStrictEqual([]);
    var b = graph.tryFind("b");
    (0, vitest_1.expect)(b.def).toStrictEqual({ path: "b" });
    (0, vitest_1.expect)(Array.from(b.dependencies)).toStrictEqual([]);
    (0, vitest_1.expect)(Array.from(b.dependents)).toStrictEqual([]);
});
(0, vitest_1.test)("explicit deps", function () {
    var graph = new graph_1.Graph([{ path: "a", deps: ["b"] }, { path: "b" }]);
    var a = graph.tryFind("a");
    (0, vitest_1.expect)(a.dependencies.size).toBe(1);
    (0, vitest_1.expect)(Array.from(a.dependencies)).toStrictEqual(["b"]);
    var b = graph.tryFind("b");
    (0, vitest_1.expect)(b.dependents.size).toBe(1);
    (0, vitest_1.expect)(Array.from(b.dependents)).toStrictEqual(["a"]);
});
(0, vitest_1.test)("implicit deps", function () {
    var graph = new graph_1.Graph([
        {
            path: "a",
            props: {
                foo: "${wsim#b#attrs.bar}",
                another: "i depend on: ${wsim#c/d/e#attrs.xxx}",
            },
        },
        { path: "b", props: { hello: ["bang", "${wsim#c/d/e#attrs.aaa}"] } },
        { path: "c/d/e" },
        { path: "d", props: { a: "${wsim#a#attrs.aaa}" }, deps: ["b"] },
    ]);
    var a = graph.tryFind("a");
    (0, vitest_1.expect)(Array.from(a.dependencies)).toStrictEqual(["b", "c/d/e"]);
    (0, vitest_1.expect)(Array.from(a.dependents)).toStrictEqual(["d"]);
    var b = graph.tryFind("b");
    (0, vitest_1.expect)(Array.from(b.dependencies)).toStrictEqual(["c/d/e"]);
    (0, vitest_1.expect)(Array.from(b.dependents)).toStrictEqual(["a", "d"]);
    var c = graph.tryFind("c/d/e");
    (0, vitest_1.expect)(Array.from(c.dependencies)).toStrictEqual([]);
    (0, vitest_1.expect)(Array.from(c.dependents)).toStrictEqual(["a", "b"]);
    var d = graph.tryFind("d");
    (0, vitest_1.expect)(Array.from(d.dependencies)).toStrictEqual(["b", "a"]);
    (0, vitest_1.expect)(Array.from(d.dependents)).toStrictEqual([]);
});
(0, vitest_1.test)("tryFind returns undefined if node does not exist", function () {
    var graph = new graph_1.Graph([]);
    (0, vitest_1.expect)(graph.tryFind("a")).toBe(undefined);
});
(0, vitest_1.test)("fails on a direct cyclic dependency", function () {
    (0, vitest_1.expect)(function () {
        new graph_1.Graph([
            { path: "a", deps: ["b"] },
            { path: "b", deps: ["a"] },
        ]);
    }).toThrowError(/cyclic dependency detected: b -> a/);
});
(0, vitest_1.test)("fails on an indirect cyclic dependency", function () {
    (0, vitest_1.expect)(function () {
        new graph_1.Graph([
            { path: "a", deps: ["b"] },
            { path: "b", deps: ["c"] },
            { path: "c", deps: ["a"] },
        ]);
    }).toThrowError(/cyclic dependency detected: c -> a/);
});
(0, vitest_1.test)("cyclic deps introduced by token", function () {
    (0, vitest_1.expect)(function () {
        new graph_1.Graph([
            { path: "a", props: { foo: "${wsim#b#attrs.bar}" } },
            { path: "b", props: { bar: "${wsim#c#attrs.baz}" } },
            { path: "c", props: { baz: "${wsim#a#attrs.foo}" } },
        ]);
    }).toThrowError(/cyclic dependency detected: c -> a -> b -> c/);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constructs_1 = require("constructs");
var vitest_1 = require("vitest");
var dependency_1 = require("../../src/core/dependency");
(0, vitest_1.test)("topology returns correct order", function () {
    var root = new constructs_1.Construct(undefined, "App");
    var group = new constructs_1.Construct(root, "chart1");
    var obj1 = new constructs_1.Construct(group, "obj1");
    var obj2 = new constructs_1.Construct(group, "obj2");
    var obj3 = new constructs_1.Construct(group, "obj3");
    constructs_1.Node.of(obj1).addDependency(obj2);
    constructs_1.Node.of(obj2).addDependency(obj3);
    var graph = new dependency_1.DependencyGraph(constructs_1.Node.of(group));
    (0, vitest_1.expect)(graph.topology()).toEqual([group, obj3, obj2, obj1]);
});
(0, vitest_1.test)("cycle detection", function () {
    var root = new constructs_1.Construct(undefined, "App");
    var group = new constructs_1.Construct(root, "chart1");
    var obj1 = new constructs_1.Construct(group, "obj1");
    var obj2 = new constructs_1.Construct(group, "obj2");
    var obj3 = new constructs_1.Construct(group, "obj3");
    constructs_1.Node.of(obj1).addDependency(obj2);
    constructs_1.Node.of(obj2).addDependency(obj3);
    constructs_1.Node.of(obj3).addDependency(obj1);
    (0, vitest_1.expect)(function () {
        new dependency_1.DependencyGraph(constructs_1.Node.of(group));
    }).toThrowError("Dependency cycle detected: ".concat(constructs_1.Node.of(obj1).path, " => ").concat(constructs_1.Node.of(obj2).path, " => ").concat(constructs_1.Node.of(obj3).path, " => ").concat(constructs_1.Node.of(obj1).path));
});
(0, vitest_1.test)("value of root is null", function () {
    var root = new constructs_1.Construct(undefined, "App");
    var group = new constructs_1.Construct(root, "chart1");
    var obj1 = new constructs_1.Construct(group, "obj1");
    var obj2 = new constructs_1.Construct(group, "obj2");
    var obj3 = new constructs_1.Construct(group, "obj3");
    constructs_1.Node.of(obj1).addDependency(obj2);
    constructs_1.Node.of(obj2).addDependency(obj3);
    (0, vitest_1.expect)(new dependency_1.DependencyGraph(constructs_1.Node.of(group)).root.value).toBeUndefined();
});
(0, vitest_1.test)("children of root contains all orphans", function () {
    var root = new constructs_1.Construct(undefined, "App");
    var group = new constructs_1.Construct(root, "chart1");
    var obj1 = new constructs_1.Construct(group, "obj1");
    var obj2 = new constructs_1.Construct(group, "obj2");
    constructs_1.Node.of(obj1).addDependency(obj2);
    var expected = new Set();
    new dependency_1.DependencyGraph(constructs_1.Node.of(group)).root.outbound.forEach(function (c) {
        return expected.add(c.value);
    });
    // chart1 and obj1 are orphans because no one depends on them (no parents)
    // they should be dependency roots, i.e chidren of the dummy root.
    (0, vitest_1.expect)(expected).toEqual(new Set([group, obj1]));
});
(0, vitest_1.test)("ignores cross-scope nodes", function () {
    var root = new constructs_1.Construct(undefined, "App");
    var group1 = new constructs_1.Construct(root, "group1");
    var group2 = new constructs_1.Construct(root, "group2");
    var obj1 = new constructs_1.Construct(group1, "obj1");
    var obj2 = new constructs_1.Construct(group1, "obj2");
    var obj3 = new constructs_1.Construct(group2, "obj3");
    constructs_1.Node.of(obj1).addDependency(obj2);
    // this is a cross-scope dependency since 'obj2' is
    // not inside the scope of 'chart1'
    constructs_1.Node.of(obj2).addDependency(obj3);
    // we expect obj3 to not be part of the graph
    var graph = new dependency_1.DependencyGraph(constructs_1.Node.of(group1));
    (0, vitest_1.expect)(graph.topology()).toEqual([group1, obj2, obj1]);
});

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var constructs_1 = require("constructs");
var vitest_1 = require("vitest");
var cloud_1 = require("../../src/cloud");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
(0, vitest_1.test)("Node.of(scope).app returns the root app", function () {
    var app = new sim_app_1.SimApp();
    var myBucket = new cloud_1.Bucket(app, "MyBucket");
    var a1 = std_1.Node.of(myBucket).app;
    (0, vitest_1.expect)(a1.node).toBe(app.node);
    (0, vitest_1.expect)(a1.workdir).toBe(app.workdir);
    (0, vitest_1.expect)(a1.isTestEnvironment).toBe(app.isTestEnvironment);
    (0, vitest_1.expect)(a1.entrypointDir).toBe(app.entrypointDir);
    // equivalence
    (0, vitest_1.expect)(std_1.Node.of(myBucket).root).toBe(a1);
    (0, vitest_1.expect)(std_1.Node.of(myBucket).app).toBe(a1);
});
(0, vitest_1.test)("Node.of(scope).root returns the first root found in the tree", function () {
    var app = new sim_app_1.SimApp();
    // this is the setup we have in synthRoots
    var Root = /** @class */ (function (_super) {
        __extends(Root, _super);
        function Root() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Root;
    }(constructs_1.Construct));
    std_1.Node._markRoot(Root);
    var root = new Root(app, "MyRoot");
    var myBucket = new cloud_1.Bucket(root, "MyBucket");
    var theRoot = std_1.Node.of(myBucket).root;
    (0, vitest_1.expect)(theRoot).toBe(root);
});

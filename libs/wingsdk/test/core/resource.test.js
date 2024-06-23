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
var core_1 = require("../../src/core");
var std_1 = require("../../src/std");
var sim_app_1 = require("../sim-app");
(0, vitest_1.describe)("resource onLift", function () {
    var Example = /** @class */ (function (_super) {
        __extends(Example, _super);
        function Example() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Example.prototype, "_liftMap", {
            get: function () {
                return {
                    op1: [],
                    op2: [],
                };
            },
            enumerable: false,
            configurable: true
        });
        Example.prototype._toInflight = function () {
            return "inflight";
        };
        Example.prototype.addEnvironment = function () {
            // noop
        };
        return Example;
    }(std_1.Resource));
    var ExampleAbstract = /** @class */ (function (_super) {
        __extends(ExampleAbstract, _super);
        function ExampleAbstract(scope, id) {
            var _newTarget = this.constructor;
            if (_newTarget === ExampleAbstract) {
                std_1.Resource._newFromFactory("fqn", scope, id);
            }
            return _super.call(this, scope, id) || this;
        }
        Object.defineProperty(ExampleAbstract.prototype, "_liftMap", {
            get: function () {
                return {};
            },
            enumerable: false,
            configurable: true
        });
        return ExampleAbstract;
    }(std_1.Resource));
    (0, vitest_1.test)("adding supported ops to host should succeed", function () {
        var app = new sim_app_1.SimApp();
        var example = new Example(app, "example");
        (0, vitest_1.expect)(example.onLift(new Example(app, "host"), ["op1"])).toBeUndefined();
    });
    (0, vitest_1.test)("adding non supported op to host should cause an error", function () {
        var app = new sim_app_1.SimApp();
        var example = new Example(app, "example");
        (0, vitest_1.expect)(function () {
            return core_1.Lifting.lift(example, new Example(app, "host"), ["nonExistentOp"]);
        }).toThrow("Resource root/example does not support inflight operation nonExistentOp.\nIt might not be implemented yet.");
    });
    (0, vitest_1.test)("creating a resource outside an app should cause an error", function () {
        var notApp = new constructs_1.Construct(undefined, "notApp");
        (0, vitest_1.expect)(function () { return new ExampleAbstract(notApp, "example"); }).toThrow("Cannot find root app");
    });
});

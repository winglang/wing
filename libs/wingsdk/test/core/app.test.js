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
var app_1 = require("../../src/core/app");
var FOO_FQN = "@winglang/sdk.foo.Foo";
var BAR_FQN = "@winglang/sdk.foo.Bar";
var ANOTHER_FQN = "@winglang/sdk.another.Another";
(0, vitest_1.test)("new() allows derived classes to inject a different implementation", function () {
    var app = new MyApp();
    var foo = app.new(FOO_FQN, Foo, app, "foo", 99);
    (0, vitest_1.expect)(foo).toBeInstanceOf(MyFoo);
    (0, vitest_1.expect)(foo.hi()).toEqual("hi 99");
});
(0, vitest_1.test)("newAbstract() allows derived classes to inject a different implementation", function () {
    var app = new MyApp();
    var foo = app.platform.newAbstract(BAR_FQN, app, "my-bar");
    (0, vitest_1.expect)(foo).toBeInstanceOf(Bar);
});
(0, vitest_1.test)("new() defaults to just creating an instance", function () {
    var app = new MyApp();
    var bar = app.new(ANOTHER_FQN, Bar, app, "bar");
    (0, vitest_1.expect)(bar).toBeInstanceOf(Bar);
});
(0, vitest_1.test)("newAbstract() throws if there is no implementation", function () {
    var app = new MyApp();
    (0, vitest_1.expect)(function () { return app.platform.newAbstract(ANOTHER_FQN, app, "bar"); }).toThrow(/Resource \"@winglang\/sdk\.another.Another\" is not yet implemented for "awscdk" target\. Please refer to the roadmap https:\/\/github\.com\/orgs\/winglang\/projects\/3\/views\/1\?filterQuery=another\.Another/);
});
var MyApp = /** @class */ (function (_super) {
    __extends(MyApp, _super);
    function MyApp() {
        var _this = _super.call(this, undefined, "MyApp", { entrypointDir: __dirname }) || this;
        _this.outdir = "outdir";
        _this.isTestEnvironment = true;
        _this._target = "awscdk";
        return _this;
    }
    MyApp.prototype.synth = function () {
        throw new Error("Method not implemented.");
    };
    MyApp.prototype.typeForFqn = function (fqn) {
        switch (fqn) {
            case FOO_FQN:
                return MyFoo;
            case BAR_FQN:
                return Bar;
        }
        return undefined;
    };
    return MyApp;
}(app_1.App));
var Foo = /** @class */ (function (_super) {
    __extends(Foo, _super);
    function Foo(scope, id, arg) {
        var _this = _super.call(this, scope, id) || this;
        _this.arg = arg;
        return _this;
    }
    return Foo;
}(constructs_1.Construct));
var MyFoo = /** @class */ (function (_super) {
    __extends(MyFoo, _super);
    function MyFoo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyFoo.prototype.hi = function () {
        return "hi ".concat(this.arg);
    };
    return MyFoo;
}(Foo));
var BarBase = /** @class */ (function (_super) {
    __extends(BarBase, _super);
    function BarBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BarBase;
}(constructs_1.Construct));
var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Bar;
}(BarBase));

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constructs_1 = require("constructs");
var vitest_1 = require("vitest");
var lifting_1 = require("../../src/core/lifting");
(0, vitest_1.test)("mergeLiftDeps", function () {
    // first argument empty
    expectMergeDeps({}, {
        op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    }, {
        op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    });
    // second argument empty
    expectMergeDeps({
        op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    }, {}, {
        op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    });
    // both arguments empty
    expectMergeDeps({}, {}, {});
    // merging transitive operations of an object
    expectMergeDeps({
        op1: new Map([["obj1", new Set(["m1"])]]),
    }, {
        op1: new Map([["obj1", new Set(["m2"])]]),
    }, {
        op1: new Map([["obj1", new Set(["m1", "m2"])]]),
    });
    // merging with multiple objects
    expectMergeDeps({
        op1: new Map([["obj1", new Set(["m1"])]]),
    }, {
        op1: new Map([["obj2", new Set(["m1"])]]),
    }, {
        op1: new Map([
            ["obj1", new Set(["m1"])],
            ["obj2", new Set(["m1"])],
        ]),
    });
    // merging with multiple primary ops
    expectMergeDeps({
        op1: new Map([["obj1", new Set(["m1"])]]),
    }, {
        op2: new Map([["obj1", new Set(["m1"])]]),
    }, {
        op1: new Map([["obj1", new Set(["m1"])]]),
        op2: new Map([["obj1", new Set(["m1"])]]),
    });
    // merging with variables referring to the same object
    var obj1 = "obj";
    var obj2 = "obj";
    expectMergeDeps({
        op1: new Map([[obj1, new Set(["m1"])]]),
    }, {
        op1: new Map([[obj2, new Set(["m1"])]]),
    }, {
        op1: new Map([["obj", new Set(["m1"])]]),
    });
    // merging with variables referring to the same object
    var c1 = new constructs_1.Construct(undefined, "c1");
    var c2 = c1;
    expectMergeDeps({
        op1: new Map([[c1, new Set(["m1"])]]),
    }, {
        op1: new Map([[c2, new Set(["m1"])]]),
    }, {
        op1: new Map([[c1, new Set(["m1"])]]),
    });
});
(0, vitest_1.describe)("collectLifts", function () {
    (0, vitest_1.test)("object without _liftMap", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            return Foo;
        }());
        var lifts = (0, lifting_1.collectLifts)(new Foo(), []);
        (0, vitest_1.expect)(lifts).toEqual(new Map([[vitest_1.expect.any(Foo), new Set([])]]));
    });
    (0, vitest_1.test)("object with single op, but no onLift method", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            Object.defineProperty(Foo.prototype, "_liftMap", {
                get: function () {
                    return {
                        op1: [],
                    };
                },
                enumerable: false,
                configurable: true
            });
            return Foo;
        }());
        var lifts = (0, lifting_1.collectLifts)(new Foo(), ["op1"]);
        (0, vitest_1.expect)(lifts).toEqual(new Map([[vitest_1.expect.any(Foo), new Set(["op1"])]]));
    });
    (0, vitest_1.test)("object with single op and onLift method", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            Object.defineProperty(Foo.prototype, "_liftMap", {
                get: function () {
                    return {
                        op1: [],
                    };
                },
                enumerable: false,
                configurable: true
            });
            Foo.prototype.onLift = function () { };
            return Foo;
        }());
        var lifts = (0, lifting_1.collectLifts)(new Foo(), ["op1"]);
        (0, vitest_1.expect)(lifts).toEqual(new Map([[vitest_1.expect.any(Foo), new Set(["op1"])]]));
    });
    (0, vitest_1.test)("object lifting simple primitives", function () {
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            Object.defineProperty(Foo.prototype, "_liftMap", {
                get: function () {
                    return {
                        op1: [
                            ["hello", []],
                            [123, []],
                            [true, []],
                        ],
                    };
                },
                enumerable: false,
                configurable: true
            });
            return Foo;
        }());
        var lifts = (0, lifting_1.collectLifts)(new Foo(), ["op1"]);
        (0, vitest_1.expect)(lifts).toEqual(new Map([
            [vitest_1.expect.any(Foo), new Set(["op1"])],
            ["hello", new Set()],
            [123, new Set()],
            [true, new Set()],
        ]));
    });
    (0, vitest_1.test)("object lifting transitive object", function () {
        var Bucket = /** @class */ (function () {
            function Bucket() {
            }
            Object.defineProperty(Bucket.prototype, "_liftMap", {
                get: function () {
                    return {
                        list: [],
                    };
                },
                enumerable: false,
                configurable: true
            });
            Bucket.prototype.onLift = function () { };
            return Bucket;
        }());
        var Foo = /** @class */ (function () {
            function Foo() {
            }
            Object.defineProperty(Foo.prototype, "_liftMap", {
                get: function () {
                    return {
                        op1: [[new Bucket(), ["list"]]],
                    };
                },
                enumerable: false,
                configurable: true
            });
            Foo.prototype.onLift = function () { };
            return Foo;
        }());
        var lifts = (0, lifting_1.collectLifts)(new Foo(), ["op1"]);
        (0, vitest_1.expect)(lifts).toEqual(new Map([
            [vitest_1.expect.any(Foo), new Set(["op1"])],
            [vitest_1.expect.any(Bucket), new Set(["list"])],
        ]));
    });
    (0, vitest_1.test)("object lifting shared object through two transitive objects", function () {
        var Bucket = /** @class */ (function () {
            function Bucket() {
            }
            Object.defineProperty(Bucket.prototype, "_liftMap", {
                get: function () {
                    return {
                        list: [],
                    };
                },
                enumerable: false,
                configurable: true
            });
            Bucket.prototype.onLift = function () { };
            return Bucket;
        }());
        var MyBucket = /** @class */ (function () {
            function MyBucket(bucket) {
                this.bucket = bucket;
            }
            Object.defineProperty(MyBucket.prototype, "_liftMap", {
                get: function () {
                    return {
                        list: [[this.bucket, ["list"]]],
                    };
                },
                enumerable: false,
                configurable: true
            });
            return MyBucket;
        }());
        var Foo = /** @class */ (function () {
            function Foo() {
                var bucket = new Bucket();
                this.m1 = new MyBucket(bucket);
                this.m2 = new MyBucket(bucket);
            }
            Object.defineProperty(Foo.prototype, "_liftMap", {
                get: function () {
                    return {
                        handle: [
                            [this.m1, ["list"]],
                            [this.m2, ["list"]],
                        ],
                    };
                },
                enumerable: false,
                configurable: true
            });
            return Foo;
        }());
        var lifts = (0, lifting_1.collectLifts)(new Foo(), ["handle"]);
        (0, vitest_1.expect)(lifts).toEqual(new Map([
            [vitest_1.expect.any(Bucket), new Set(["list"])],
            [vitest_1.expect.any(MyBucket), new Set(["list"])],
            [vitest_1.expect.any(MyBucket), new Set(["list"])],
            [vitest_1.expect.any(Foo), new Set(["handle"])],
        ]));
    });
});
function expectMergeDeps(deps1, deps2, expected) {
    var result = (0, lifting_1.mergeLiftDeps)(deps1, deps2);
    (0, vitest_1.expect)(result).toEqual(expected);
}

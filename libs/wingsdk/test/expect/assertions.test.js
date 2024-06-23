"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// `Assert` needs to be imported from the index file due
// to a bug in `v8-to-istanbul` that causes it to
// exit with a non-zero code when trying to generate
// coverage reports. See https://github.com/istanbuljs/v8-to-istanbul/issues/198
var strict_1 = require("node:assert/strict");
var vitest_1 = require("vitest");
var expect_1 = require("../../src/expect");
(0, vitest_1.describe)("equal string", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal("a", "a");
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal("a", "b");
        }).toThrowError(new RegExp("'a' !== 'b'"));
    });
});
(0, vitest_1.describe)("equal number", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal(1, 1);
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal(1, 2);
        }).toThrowError(new RegExp("1 !== 2"));
    });
});
(0, vitest_1.describe)("equal boolean", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal(true, true);
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal(true, false);
        }).toThrowError(new RegExp("true !== false"));
    });
});
(0, vitest_1.describe)("equal list", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal([1, 2, 3], [1, 2, 3]);
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal([1, 2, 3], [1, 2, 3, 4]);
        }).toThrowError(new RegExp("[\n    1,\n    2,\n    3,\n-   4\n  ]"));
    });
});
(0, vitest_1.describe)("not equal list", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notEqual([1, 2, 3], [1, 2, 3]);
        }).toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notEqual([1, 2, 3], [1, 2, 3, 4]);
        }).not.toThrowError();
    });
});
(0, vitest_1.describe)("equal set", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal(new Set([1, 2, 3]), new Set([1, 2, 3]));
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal(new Set([1, 2, 3]), new Set([1, 2, 3, 4]));
        }).toThrowError(/Expected values to be strictly deep-equal/);
    });
});
(0, vitest_1.describe)("not equal set", function () {
    (0, vitest_1.test)("is equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notEqual(new Set([1, 2, 3]), new Set([1, 2, 3]));
        }).toThrow();
    });
    (0, vitest_1.test)("is not equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notEqual(new Set([1, 2, 3]), new Set([1, 2, 3, 4]));
        }).not.toThrowError();
    });
});
(0, vitest_1.describe)("equal object", function () {
    (0, vitest_1.test)("is deep equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal({ a: 1, b: 2 }, { a: 1, b: 2 });
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not deep equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.equal({ a: 1, b: 2 }, { a: 2, b: 1 });
        }).toThrow();
    });
});
(0, vitest_1.describe)("not equal object", function () {
    (0, vitest_1.test)("is deep equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notEqual({ a: 1, b: 2 }, { a: 1, b: 2 });
        }).toThrow();
    });
    (0, vitest_1.test)("is not deep equal", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notEqual({ a: 1, b: 2 }, { a: 2, b: 1 });
        }).not.toThrow();
    });
});
(0, vitest_1.describe)("is nil", function () {
    (0, vitest_1.test)("is null", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.nil(null);
        }).not.toThrow();
    });
    (0, vitest_1.test)("is undefined", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.nil(undefined);
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not null", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.nil("not null");
        }).toThrow();
    });
    (0, vitest_1.test)("is not null number", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.nil(5);
        }).toThrow();
    });
});
(0, vitest_1.describe)("is not nil", function () {
    (0, vitest_1.test)("is not undefined", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notNil(undefined);
        }).toThrow();
    });
    (0, vitest_1.test)("is not null", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notNil(null);
        }).toThrow();
    });
    (0, vitest_1.test)("is not null string", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notNil("not null");
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not null number", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.notNil(5);
        }).not.toThrow();
    });
});
(0, vitest_1.describe)("match", function () {
    (0, vitest_1.test)("is match", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.match("abc", "abc");
        }).not.toThrow();
    });
    (0, vitest_1.test)("is not match", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.match("abc", "def");
        }).toThrow(new strict_1.AssertionError({
            message: "The input did not match the regular expression def",
        }));
    });
});
(0, vitest_1.describe)("does not match", function () {
    (0, vitest_1.test)("is match", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.doesNotMatch("abc", "abc");
        }).toThrow(new strict_1.AssertionError({
            message: "The input should not match the regular expression abc",
        }));
    });
    (0, vitest_1.test)("is not match", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.doesNotMatch("abc", "def");
        }).not.toThrow();
    });
});
(0, vitest_1.describe)("fail", function () {
    (0, vitest_1.test)("fail", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.fail("fail");
        }).toThrow();
    });
});
(0, vitest_1.describe)("ok", function () {
    (0, vitest_1.test)("is true", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.ok(true);
        }).not.toThrow();
    });
    (0, vitest_1.test)("is false", function () {
        (0, vitest_1.expect)(function () {
            expect_1.Util.ok(false);
        }).toThrow();
    });
});

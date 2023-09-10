bring util;
bring testing;

// Num tests

let a: num? = nil;
let b: num? = 1;

testing.Assert.equal(1, 1);
testing.Assert.equal(b, 1);
testing.Assert.isNil(a);
testing.Assert.notEqual(b, 2);
testing.Assert.notEqual(b, "hello");
testing.Assert.notEqual(b, true);

test "equal num" {
    testing.Assert.equal(1, 1);
    testing.Assert.equal(b, 1);
    testing.Assert.isNil(a);
    testing.Assert.notEqual(b, 2);
    testing.Assert.notEqual(b, "hello");
    testing.Assert.notEqual(b, true);
}

// String tests

let c: str? = nil;
let d: str? = "hello";

testing.Assert.equal("hello", "hello");
testing.Assert.equal(d, "hello");
testing.Assert.isNil(c);
testing.Assert.notEqual(d, "world");
testing.Assert.notEqual(d, 1);
testing.Assert.notEqual(d, true);

test "equal str" {
    testing.Assert.equal("hello", "hello");
    testing.Assert.equal(d, "hello");
    testing.Assert.isNil(c);
    testing.Assert.notEqual(d, "world");
    testing.Assert.notEqual(d, 1);
    testing.Assert.notEqual(d, true);
}

// Bool tests

let e: bool? = nil;
let f: bool? = true;

testing.Assert.equal(true, true);
testing.Assert.equal(f, true);
testing.Assert.isNil(e);
testing.Assert.notEqual(f, false);

test "equal bool" {
    testing.Assert.equal(true, true);
    testing.Assert.equal(f, true);
    testing.Assert.isNil(e);
    testing.Assert.notEqual(f, false);
}


bring util;
bring expect;

// Num tests

let a: num? = nil;
let b: num? = 1;

expect.equal(1, 1);
expect.equal(b, 1);
expect.isNil(a);
expect.notEqual(b, 2);
expect.notEqual(b, "hello");
expect.notEqual(b, true);

test "equal num" {
    expect.equal(1, 1);
    expect.equal(b, 1);
    expect.isNil(a);
    expect.notEqual(b, 2);
    expect.notEqual(b, "hello");
    expect.notEqual(b, true);
}

// String tests

let c: str? = nil;
let d: str? = "hello";

expect.equal("hello", "hello");
expect.equal(d, "hello");
expect.isNil(c);
expect.notEqual(d, "world");
expect.notEqual(d, 1);
expect.notEqual(d, true);

test "equal str" {
    expect.equal("hello", "hello");
    expect.equal(d, "hello");
    expect.isNil(c);
    expect.notEqual(d, "world");
    expect.notEqual(d, 1);
    expect.notEqual(d, true);
}

// Bool tests

let e: bool? = nil;
let f: bool? = true;

expect.equal(true, true);
expect.equal(f, true);
expect.isNil(e);
expect.notEqual(f, false);

test "equal bool" {
    expect.equal(true, true);
    expect.equal(f, true);
    expect.isNil(e);
    expect.notEqual(f, false);
}


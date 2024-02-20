bring util;
bring expect;

// Num tests

let a: num? = nil;
let b: num? = 1;

expect.equal(1, 1);
expect.equal([], []);
expect.notEqual(0, -0);
expect.equal(b, 1);
expect.nil(a);
expect.notNil(b);
expect.notEqual(b, 2);
expect.notEqual(b, "hello");
expect.notEqual(b, true);

test "equal num" {
    expect.equal(1, 1);
    expect.equal(b, 1);
    expect.nil(a);
    expect.notNil(b);
    expect.notEqual(b, 2);
    expect.notEqual(b, "hello");
    expect.notEqual(b, true);
}

// String tests

let c: str? = nil;
let d: str? = "hello";

expect.equal("hello", "hello");
expect.equal(d, "hello");
expect.nil(c);
expect.notNil(d);
expect.notEqual(d, "world");
expect.notEqual(d, 1);
expect.notEqual(d, true);

test "equal str" {
    expect.equal("hello", "hello");
    expect.equal(d, "hello");
    expect.nil(c);
    expect.notNil(d);
    expect.notEqual(d, "world");
    expect.notEqual(d, 1);
    expect.notEqual(d, true);
}

// Bool tests

let e: bool? = nil;
let f: bool? = true;

expect.equal(true, true);
expect.equal(f, true);
expect.nil(e);
expect.notNil(f);
expect.notEqual(f, false);

test "equal bool" {
    expect.equal(true, true);
    expect.equal(f, true);
    expect.nil(e);
    expect.notNil(f);
    expect.notEqual(f, false);
}

// List of str tests
let g = ["hello"];

expect.equal(g, ["hello"]);
expect.notEqual(g, ["world"]);

test "equal array of strings" {
    expect.equal(g, ["hello"]);
    expect.notEqual(g, ["world"]);
}

// List of numbers tests
let h = [1];

expect.equal(h, [1]);
expect.notEqual(h, ["world"]);

test "equal array of numbers" {
    expect.equal(h, [1]);
    expect.notEqual(h, ["world"]);
}

// Json object tests
let obj = Json { key1: 1, key2: 2};

expect.equal(obj, Json { key1: 1, key2: 2});
expect.notEqual(obj, Json { key1: 1, key3: 3});

test "equal objects" {
    expect.equal(obj, Json { key1: 1, key2: 2});
    expect.notEqual(obj, Json { key1: 1, key3: 3});
}

// Map tests

let maps = { "hello" => 123, "world" => 99 };
expect.equal(maps, { "hello" => 123, "world" => 99 });
expect.notEqual(maps, { "hello" => 123, "world" => 100 });

test "equal maps" {
    expect.equal(maps, { "hello" => 123, "world" => 99 });
    expect.notEqual(maps, { "hello" => 123, "world" => 100 });
}


// Set tests

let mySet = Set<num>[1, 2, 3];

expect.equal(mySet, Set<num>[1, 2, 3]);
expect.notEqual(mySet, Set<num>[1, 2, 3, 4]);

test "equal sets" {
    expect.equal(mySet, Set<num>[1, 2, 3]);
    expect.notEqual(mySet, Set<num>[1, 2, 3, 4]);
}

// DateTime tests
// FIXME: Doesn't work
// ERROR: unable to serialize immutable data object of type Datetime

// examples/tests/sdk_tests/expect/target/test/assert.main.wsim.256800.tmp/.wing/preflight.js:319

// let dt = datetime.fromIso("2023-07-18T20:18:25.177+03:00");

// expect.equal(dt, datetime.fromIso("2023-07-18T20:18:25.177+03:00"));
// expect.notEqual(dt, datetime.fromIso("2024-07-18T20:18:25.177+03:00"));

// test "equal time" {
//     expect.equal(dt, datetime.fromIso("2023-07-18T20:18:25.177+03:00"));
//     expect.notEqual(dt, datetime.fromIso("2024-07-18T20:18:25.177+03:00"));
// }

// Duration tests

expect.equal(60s, 1m);
expect.notEqual(61s, 1m);

test "equal durations" {
    expect.equal(60s, 1m);
    expect.notEqual(61s, 1m);
}


// custom preflight Class test
class MyClass {
    a: num;
    b: str;

    new(a: num, b: str) {
        this.a = a;
        this.b = b;
    }
}


let myClass = new MyClass(1, "hello");

expect.equal(myClass, myClass);
expect.notEqual(myClass, new MyClass(1, "hello world") as "yet another my class");

// custom inflight Class test
// ERROR: Values have same structure but are not reference-equal:

// inflight class MyInflightClass {
//     a: num;
//     b: str;

//     new(a: num, b: str) {
//         this.a = a;
//         this.b = b;
//     }
// }

// test "equal custom classes" {
//     let myInflightClass = new MyInflightClass(1, "hello");
//     expect.equal(myInflightClass, new MyInflightClass(1, "hello"));
//     expect.notEqual(myInflightClass, new MyInflightClass(1, "hello world"));
// }

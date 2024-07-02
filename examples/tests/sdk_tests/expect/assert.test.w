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
expect.match("this contains hello world string", "hello");
expect.doesNotMatch("this contains some random string", "world");

// Bool tests

let e: bool? = nil;
let f: bool? = true;

expect.equal(true, true);
expect.equal(f, true);
expect.nil(e);
expect.notNil(f);
expect.notEqual(f, false);

// List of str tests
let g = ["hello"];

expect.equal(g, ["hello"]);
expect.notEqual(g, ["world"]);

// List of numbers tests
let h = [1];

expect.equal(h, [1]);
expect.notEqual(h, ["world"]);

// Json object tests
let obj = Json { key1: 1, key2: 2};

expect.equal(obj, Json { key1: 1, key2: 2});
expect.notEqual(obj, Json { key1: 1, key3: 3});

// Map tests

let maps = { "hello" => 123, "world" => 99 };
expect.equal(maps, { "hello" => 123, "world" => 99 });
expect.notEqual(maps, { "hello" => 123, "world" => 100 });

// Set tests

let mySet = Set<num>[1, 2, 3];

expect.equal(mySet, Set<num>[1, 2, 3]);
expect.notEqual(mySet, Set<num>[1, 2, 3, 4]);


// DateTime tests
// FIXME: Doesn't work
// ERROR: unable to serialize immutable data object of type Datetime

// examples/tests/sdk_tests/expect/target/test/assert.main.wsim.256800.tmp/.wing/preflight.cjs:319

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

test "expect" {
  // "equal num"
    expect.equal(1, 1);
    expect.equal(b, 1);
    expect.nil(a);
    expect.notNil(b);
    expect.notEqual(b, 2);
    expect.notEqual(b, "hello");
    expect.notEqual(b, true);

// "equal str" 
    expect.equal("hello", "hello");
    expect.equal(d, "hello");
    expect.nil(c);
    expect.notNil(d);
    expect.notEqual(d, "world");
    expect.notEqual(d, 1);
    expect.notEqual(d, true);
    expect.match("this contains hello world string", "hello");
    expect.doesNotMatch("this contains some random string", "world");

// "equal bool" 
    expect.equal(true, true);
    expect.equal(f, true);
    expect.nil(e);
    expect.notNil(f);
    expect.notEqual(f, false);
    expect.ok(true,"succeeds");
    expect.ok(2<3);

// "equal array of strings" 
    expect.equal(g, ["hello"]);
    expect.notEqual(g, ["world"]);

// "equal array of numbers" {
    expect.equal(h, [1]);
    expect.notEqual(h, ["world"]);


// "equal objects" {
    expect.equal(obj, Json { key1: 1, key2: 2});
    expect.notEqual(obj, Json { key1: 1, key3: 3});

// "equal maps" {
    expect.equal(maps, { "hello" => 123, "world" => 99 });
    expect.notEqual(maps, { "hello" => 123, "world" => 100 });


// "equal sets" 
    expect.equal(mySet, Set<num>[1, 2, 3]);
    expect.notEqual(mySet, Set<num>[1, 2, 3, 4]);

// "equal durations" 
    expect.equal(60s, 1m);
    expect.notEqual(61s, 1m);


// "positive fail test" 
   try {
    expect.fail("This is a failure");
   }catch err{
    expect.equal(err, "This is a failure");
   }

 // "negative ok test"
    try {
        expect.ok(false,"This Fails with this message");
       }catch err{
        expect.equal(err, "This Fails with this message");
       }

// "negative match test"
    try{
        expect.match("this contains hello world string", "new string");
    }catch err{
        expect.equal(err, "The input did not match the regular expression new string");
    }

// "negative doesNotMatch test"
    try{
        expect.doesNotMatch("this contains some random string", "random");
    }catch err{
        expect.equal(err, "The input should not match the regular expression random");
    }
}


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

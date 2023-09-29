// Note that this test has to be alone because it needs to compile successfully and fail at preflight.
// If it is run with other tests, subsequent failures will be ignored in snapshot.

struct Person {
  name: str;
  age: num;
}

let j = {name: "cool", age: "not a number"};

Person.fromJson(j);
//              ^ ERROR: unable to parse Person:
// - instance.age is not of a type(s) number

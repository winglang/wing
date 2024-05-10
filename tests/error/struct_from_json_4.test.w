// Note that this test has to be alone because it needs to compile successfully and fail at preflight.
// If it is run with other tests, subsequent failures will be ignored in snapshot.

struct Person {
  name: str;
  age: num;
}

struct Advisor extends Person {
  id: str;
}

struct Student extends Person {
  advisors: Set<Advisor>; // <== Using Set instead of Array
}

// Try adding two of the same adivsor
let invalidAdvisorInArray = {
  name: "cool",
  age: 22,
  advisors: [
    {id: "advisor1", name: "Bob", age: 34},
    {id: "advisor1", name: "Bob", age: 34},
  ]
};

Student.fromJson(invalidAdvisorInArray);
//              ^ ERROR: unable to parse Student:
// - instance.advisors contains duplicate item

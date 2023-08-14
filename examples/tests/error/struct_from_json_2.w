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
  advisor: Advisor;
}

let missingAdvisor = {
  name: "cool",
  age: "not a number"
};

Student.fromJson(missingAdvisor);
//              ^ ERROR: unable to parse Student:
// - instance.age is not of a type(s) number
// - instance requires property "advisor"
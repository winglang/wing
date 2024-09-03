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
  advisors: Array<Advisor>;
}

let invalidAdvisorInArray = {
  name: "cool",
  age: "not a number",
  advisors: [
    {id: "advisor1", name: "Bob", age: 34},
    {id: 10, name: "Jacob", age: 45}
  ]
};

Student.fromJson(invalidAdvisorInArray);
//              ^ ERROR: unable to parse Student:
// - instance.age is not of a type(s) number
// - instance.advisors[1].id is not of a type(s) string

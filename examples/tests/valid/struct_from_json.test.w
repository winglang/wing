bring cloud;

// JSII structs
let j = { public: false };
let x = cloud.BucketProps.fromJson(j);
assert(x.public == false);

test "inflight jsii struct conversion" {
  let x = cloud.BucketProps.fromJson(j);
  assert(x.public == false);
}

// simple case
struct Foo {
  f: str;
}

let jFoo = { f: "bar"};
assert(Foo.fromJson(jFoo).f == "bar");

// optionality
struct Foosible {
  f: str?;
}

let jFoosible = {}; // Not there
let jFoosible2 = {f: "bar"};

if let f =  Foosible.fromJson(jFoosible).f {
  assert(false); // Should not happen
}

if let f = Foosible.fromJson(jFoosible2).f {
  assert(f == "bar");
} else {
  assert(false); // Should not happen
}

// Getting fancy now
struct Bar extends Foo {
  b: num;
}

let jBar = { f: "bar", b: 10};

let b = Bar.fromJson(jBar);
assert(b.f == "bar");
assert(b.b == 10);

// Lets go full out
struct Date {
  month: num;
  day: num;
  year: num;
}

struct Person {
  firstName: str;
  lastName: str;
  dob: Date;
}

struct Advisor extends Person {
  employeeID: str;
}

struct Course {
  name: str;
  credits: num;
}

struct CourseResults {
  course: Course;
  grade: str;
  dateTaken: Date;
}

struct Student extends Person {
  enrolled: bool;
  schoolId: str;
  advisor: Advisor?;
  enrolledCourses: Set<Course>?;
  coursesTaken: Array<CourseResults>?;
  additionalData: Json?;
}

// Student with no advisor and no empty course list
let jStudent1 = {
  firstName: "John",
  lastName: "Smith",
  enrolled: true,
  schoolId: "s1-xyz",
  dob: { month: 10, day: 10, year: 2005 },
  enrolledCourses: []
};

let student1 = Student.fromJson(jStudent1);
assert(student1.firstName == "John");
assert(student1.lastName == "Smith");
assert(student1.enrolled);
assert(student1.schoolId == "s1-xyz");
assert(student1.dob.month == 10);
assert(student1.dob.day == 10);
assert(student1.dob.year == 2005);

// Student with an advisor and several courses
let jStudent2 = {
  advisor: {
    firstName: "Tom",
    lastName: "Baker",
    dob: { month: 1, day: 1, year: 1983 },
    employeeID: "emp123"
  },
  firstName: "Sally",
  lastName: "Reynolds",
  enrolled: false,
  schoolId: "s2-xyz",
  dob: { month: 5, day: 31, year: 1987},
  enrolledCourses: [
    { name: "COMP 101", credits: 2 },
    { name: "COMP 121", credits: 4 },
  ],
  coursesTaken: [
    {grade: "F", dateTaken: { month: 5, day: 10, year: 2021 }, course: { name: "COMP 101", credits: 2 }},
    {grade: "D", dateTaken: { month: 5, day: 10, year: 2021 }, course: { name: "COMP 121", credits: 4 }},
  ]
};

let student2 = Student.fromJson(jStudent2);
assert(student2.firstName == "Sally");
assert(student2.lastName == "Reynolds");
assert(!student2.enrolled);
assert(student2.schoolId == "s2-xyz");
assert(student2.dob.month == 5);
assert(student2.dob.day == 31);
assert(student2.dob.year == 1987);

if let enrolledCourses = student2.enrolledCourses {
  let courses = enrolledCourses.toArray();
  let s2Course1 = courses.at(0);
  let s2Course2 = courses.at(1);

  assert(s2Course1.name == "COMP 101");
  assert(s2Course1.credits == 2);
  assert(s2Course2.name == "COMP 121");
  assert(s2Course2.credits == 4);
} else {
  assert(false); // It should never hit this
}

// Create a student that has additional data (Json)
let jStudent3 = {
  enrolled: false,
  schoolId: "w/e",
  firstName: student2.firstName,
  lastName: student2.lastName,
  dob: {
    month: 1, day: 1, year: 1959
  },
  additionalData: {
    notes: "wow such notes",
    legacy: false,
    emergencyContactsNumbers: [
      "123-345-9928",
    ]
  }
};

let student3 = Student.fromJson(jStudent3);

if let additionalData = student3.additionalData {
  let notes = additionalData.get("notes");
  assert(notes == "wow such notes");
} else {
  assert(false); // shouldnt happen
}


// Create student missing required field
let invalidStudent = {
  firstName: "I dont have",
  lastName: "Any other info"
};

if let student = Student.tryFromJson(invalidStudent) {
  assert(false); // should not have been able to create student
} else {
  assert(true);
}

// Use tryFromJson on a valid student

if let student = Student.tryFromJson(jStudent2) {
  assert(student.firstName == "Sally");
  assert(student.lastName == "Reynolds");
  assert(!student.enrolled);
  assert(student.schoolId == "s2-xyz");
  assert(student.dob.month == 5);
  assert(student.dob.day == 31);
  assert(student.dob.year == 1987);
} else {
  assert(false); // Should not happen
}

test "flight school student :)" {
  let jStudent3 = {
    firstName: "struct",
    lastName: "greatest",
    enrolled: true,
    schoolId: "s3-inflight",
    dob: { month: 4, day: 1, year: 1999},
    coursesTaken: [
      {grade: "B", dateTaken: { month: 5, day: 10, year: 2021 }, course: { name: "COMP 101", credits: 2 }},
      {grade: "A", dateTaken: { month: 5, day: 10, year: 2021 }, course: { name: "COMP 121", credits: 4 }},
    ]
  };
  let studentInflight1 = Student.fromJson(jStudent3);
  assert(studentInflight1.firstName == "struct");
  assert(studentInflight1.lastName == "greatest");
  assert(studentInflight1.enrolled);
  assert(studentInflight1.schoolId == "s3-inflight");
  assert(studentInflight1.dob.month == 4);
  assert(studentInflight1.dob.day == 1);
  assert(studentInflight1.dob.year == 1999);

  if let coursesTaken = studentInflight1.coursesTaken {
    let course1 = coursesTaken.at(0);
    let course2 = coursesTaken.at(1);

    assert(course1.grade == "B");
    assert(course2.grade == "A");
  } else {
    assert(false); // should not happen
  }
}

test "lifting a student" {
  let studentInflight1 = Student.fromJson(jStudent1);
  assert(studentInflight1.firstName == "John");
  assert(studentInflight1.lastName == "Smith");
  assert(studentInflight1.enrolled);
  assert(studentInflight1.schoolId == "s1-xyz");
  assert(studentInflight1.dob.month == 10);
  assert(studentInflight1.dob.day == 10);
  assert(studentInflight1.dob.year == 2005);
}

// bring structs from other files
bring "./subdir/structs.w" as externalStructs;

let jj1 = {
  data: {
    val: 10
  }
};

let externalBar = externalStructs.MyOtherStruct.fromJson(jj1);
assert(externalBar.data.val == 10);

// test namespaced struct collisions dont occur
bring "./subdir/structs_2.w" as otherExternalStructs;

struct MyStruct {
  m1: externalStructs.MyStruct;
  m2: otherExternalStructs.MyStruct;
}

let jMyStruct = {
  m1: {
    val: 10
  },
  m2: {
    val: "10"
  }
};

let myStruct = MyStruct.fromJson(jMyStruct);
assert(myStruct.m1.val == 10);
assert(myStruct.m2.val == "10");

// Test using schema object
let schema = MyStruct.schema();
schema.validate(jMyStruct); // Should not throw exception

let expectedSchema = {"$id":"/MyStruct","type":"object","description":"","properties":{"m1":{"type":"object","properties":{"val":{"type":"number","description":"```wing\nval: num\n```"}},"required":["val"],"description":"```wing\nm1: struct MyStruct \{\n  val: num;\n}\n```"},"m2":{"type":"object","properties":{"val":{"type":"string","description":"```wing\nval: str\n```"}},"required":["val"],"description":"```wing\nm2: struct MyStruct \{\n  val: str;\n}\n```"}},"required":["m1","m2"]};

assert(schema.asStr() == Json.stringify(expectedSchema));

test "inflight schema usage" {
  let s = MyStruct.schema();
  s.validate(jMyStruct);
  assert(schema.asStr() == Json.stringify(expectedSchema));
}

// Testing usafe parsing mode
str.fromJson(10, unsafe: true);
bool.fromJson(10, unsafe: true);
num.fromJson("cool", unsafe: true);

Student.fromJson({obviously: "not a student"}, unsafe: true);

test "unsafe flight" {
  str.fromJson(10, unsafe: true);
  bool.fromJson(10, unsafe: true);
  num.fromJson("cool", unsafe: true);
  
  Student.fromJson({obviously: "not a student"}, unsafe: true);
}

// Check that imported files can use .fromJson on structs defined within them
new otherExternalStructs.UsesStructInImportedFile();
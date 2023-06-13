bring cloud;

// class without init
class C1 {}
new C1();

// class with init and no arguments
class C2 {
  x: num;
  init() {
    this.x = 1;
  }
}
let c2 = new C2();
assert(c2.x == 1);

// class with init and arguments
class C3 {
  x: num;
  y: num;
  init(a: num, b: num) {
    this.x = a;
    if true {
      this.y = b;
    }
  }
}
let c3 = new C3(1, 2);
assert(c3.x == 1);
assert(c3.y == 2);

// class with static method and no init
class C4 {
  static m():num {return 1;}
}
assert(C4.m() == 1);

// class with inflight field
class C5 {
  inflight x: num;
  inflight var y: num;
  inflight init() {
    this.x = 123;
    this.y = 321;
  }
  inflight set(b: num) {
    this.y = b;
  }
}
let c5 = new C5();

test "access inflight field" {
  assert(c5.x == 123);
  assert(c5.y == 321);
  c5.set(111);
  assert(c5.y == 111);
}

class Person {
  name: str;
  init(name: str) {
    this.name = name;
  }
}

class Student extends Person {
  major: str;

  init(name: str, major: str) {
    super(name);
    this.major = major;
  }
}

class PaidStudent extends Student {
  hrlyWage: num;
  init(name: str, major: str, hrlyWage: num) {
    super(name, major);
    this.hrlyWage = hrlyWage;
  }
}

let student = new PaidStudent("Tom", "MySpace", 38);
assert(student.name == "Tom");
assert(student.major == "MySpace");
assert(student.hrlyWage == 38);

// TODO: cant access derived classes inflight yet, super class is not defined
// test "check derived class instance variables" {
//   assert(student.name == "Tom");
//   assert(student.major == "MySpace");
//   assert(student.hrlyWage == 38);  
// }
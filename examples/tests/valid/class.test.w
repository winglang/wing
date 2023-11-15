bring cloud;

// class without init
class C1 {}
new C1();

// class with init and no arguments
class C2 {
  pub x: num;
  new() {
    this.x = 1;
  }
}
let c2 = new C2();
assert(c2.x == 1);

// class with init and arguments
class C3 {
  pub x: num;
  pub y: num;
  new(a: num, b: num) {
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
  pub static m():num {return 1;}
}
assert(C4.m() == 1);

// class with inflight field
class C5 {
  pub inflight x: num;
  pub inflight var y: num;
  inflight new() {
    this.x = 123;
    this.y = 321;
  }
  pub inflight set(b: num) {
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
  pub name: str;
  new(name: str) {
    this.name = name;
  }
}

class Student extends Person {
  pub major: str;

  new(name: str, major: str) {
    super(name);
    this.major = major;
  }
}

class PaidStudent extends Student {
  pub hrlyWage: num;
  new(name: str, major: str, hrlyWage: num) {
    super(name, major);
    this.hrlyWage = hrlyWage;
  }
}

let student = new PaidStudent("Tom", "MySpace", 38);

test "check derived class instance variables" {
  assert(student.name == "Tom");
  assert(student.major == "MySpace");
  assert(student.hrlyWage == 38);  
}

class TeacherAid extends PaidStudent {
  new(name: str, major: str, hrlyWage: num) {
    super(name, major, hrlyWage);
    this.hrlyWage = 10; // should overwrite the super set value
  }
}

let ta = new TeacherAid("John", "Rock'n Roll", 50);

test "devived class init body happens after super" {
  assert(ta.hrlyWage == 10);
}

// Inflight inheritence
inflight class A {
  pub sound: str;

  inflight new(sound: str) {
    this.sound = sound;
  }
}

inflight class B extends A {
  inflight new(sound: str) {
    super(sound);
  }
}

test "inflight super constructor" {
  let b = new B("ba");
  assert(b.sound == "ba");
}

// derived preflight class with inflight methods
class Bar {}
class Foo extends Bar  {
  new() {
    super();
  }

  inflight doStuff(h: num) {}
}

new Foo();

// derived classes without defined constructors
class Baz extends Bar {}
new Baz();

class Boom {
  new() { }
}
class Bam extends Boom {}
bring cloud;

// class without new
class C1 {}
new C1();

// extend class without new
class C1Ext1 extends C1 {}
class C1Ext2 extends C1Ext1 {
  new() {
    super(); // Can call super
  }
}
class C1Ext3 extends C1Ext2 {
  new() {} // No need to call super
}

// class with new and no arguments
class C2 {
  pub x: num;
  new() {
    this.x = 1;
  }
}
let c2 = new C2();
assert(c2.x == 1);

// extend class with new and no args
class C2Ext1 extends C2 {} // Implicit call to super
let c2Ext1 = new C2Ext1();
assert(c2Ext1.x == 1);
class C2Ext2 extends C2 {
  new() {} // Implicit call to super
}
let c2Ext2 = new C2Ext2();
assert(c2Ext2.x == 1);
class C2Ext3 extends C2 {
  new() {
    super(); // Explicit call to super
  }
}
let c2Ext3 = new C2Ext3();
assert(c2Ext3.x == 1);

test "inflight classes with no ctor or ctor args" {
  // class without new
  class C1 {}
  new C1();

  // extend class without new
  class C1Ext1 extends C1 {}
  class C1Ext2 extends C1Ext1 {
    new() {
      super(); // Can call super
    }
  }
  class C1Ext3 extends C1Ext2 {
    new() {} // No need to call super
  }

  // class with new and no arguments
  class C2 {
    pub x: num;
    new() {
      this.x = 1;
    }
  }
  let c2 = new C2();
  assert(c2.x == 1);

  // extend class with new and no args
  class C2Ext1 extends C2 {} // Implicit call to super
  let c2Ext1 = new C2Ext1();
  assert(c2Ext1.x == 1);
  class C2Ext2 extends C2 {
    new() {} // Implicit call to super
  }
  let c2Ext2 = new C2Ext2();
  assert(c2Ext2.x == 1);
  class C2Ext3 extends C2 {
    new() {
      super(); // Explicit call to super
    }
  }
  let c2Ext3 = new C2Ext3();
  assert(c2Ext3.x == 1);
}

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

// A documented class (should be parssed without errors)
/// Class documentation
/// blah blah blah
class DocClass {
  /// Method documentation
  /// blah blah blah
  docMethod() {}
  /// Field documentation
  /// blah blah blah
  docField: num;
  /// Ctor documentation
  /// blah blah blah
  new() { this.docField = 0; }
}
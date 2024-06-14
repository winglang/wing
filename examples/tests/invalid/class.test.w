bring cloud;

class C1 {
   x:num;
// ^ Preflight field "x" is not initialized
}

class C1_1 {
  x:num;
  new() {
    () => {
      // This doesn't count as an initialization because it's in a closure that might not be called
      // and should produce an error.
      this.x = 1;
    };
  }
}

class C2 {}
new C2(1);
//^^^^^^^ Expected 0 argument(s) but got 1

class C9 {}
new C9(token: "1");
//^^^^^^^ Expected 0 named argument(s)"

class C10 {
  new(foo: str)
}
new C10(); 
//^^^^^^^ Expected 1 required positional arguments but got 0 when instantiating "C5"

new C10(foo: "bar"); 
//^^^^^^^ Expected 1 positional argument(s) but got 0

new C10("hello", foo: "bar"); 
//^^^^^^^ class C10 does not expect any named argument

class C3 {
  x: num;
  new() {
    this.x = "Hi";
           //^^^^ Expected type to be "num", but got "str" instead
  }
}

class C4 {
  inflight var x: num;
             //^ Inflight field "x" is not initialized
  inflight y: str;
         //^ Inflight field "y" is not initialized
}

class C5 {
  inflight x: num;
         //^ Inflight field "x" is not initialized
  inflight new() {}
}

class C6 {
  inflight x: num;
         //^ Inflight field "x" is not initialized
  y: num;
//^ Preflight field "y" is not initialized  
  
  new() {
    this.x = 1;
       //^ "x" cannot be initialized in the Preflight initializer
  }

  inflight new() {
    this.y = 1;
       //^ "y" cannot be initialized in the Inflight initializer
  }
}

let x = 5;

class C7 extends x {
               //^ Expected 'x' to be a type but it's a variable
}

struct S1 {}

class C8 extends S1 {
               //^^ Expected "S1" to be a class
}

class C11 extends C11 {
                //^^^ Unknown symbol "C11"
}

class Student {
  name: str;
  major: str;
  new(name: str, major: str) {
    super();
//  ^^^^^^^^ Calls to super constructor can only be made from derived classes
    this.name = name;
    this.major = major;
  }
}

class PaidStudent extends Student {
  hrlyWage: num;
  
  new(name: str, major: str, hrlyWage: num) {
    this.hrlyWage = hrlyWage;
//  ^^^^^^^^^^^^^^^^^^^^^^^^^ super() call should be made before an instance member is used
    super(name, major);
  }

  something() {
    super("cool", "blue");
//  ^^^^^^^^^^^^^^^^^^^^^^ Calls to super constructor can only be done from within class constructor
  }
}

   super();
// ^^^^^^^^ Calls to super constructor can only be done from within a class constructor
let s = new PaidStudent("x", "y", 3);

// Typechecking super calls
class One {
  someNum: num;
  new(someNum: num) {
    this.someNum = someNum;
  }
}

class Two extends One {
  someStr: str;
  new(someNum: num, someStr: str) {
    super(someStr);
//        ^^^^^^^ Expected type to be "num", but got "str" instead
    this.someStr = someStr;
  }
}

class Three extends One {
  someStr: str;
  new(someNum: num, someStr: str) {
    super();
//  ^^^^^^^^ Expected 1 positional argument(s) but got 0
    this.someStr = someStr;
  }
}

class Four extends One {
  someStr: str;
  new(someNum: num, someStr: str) {
    super(someNum, someStr);
//  ^^^^^^^^^^^^^^^^^^^^^^^^ Expected 1 arguments but got 2
    this.someStr = someStr;
  }
}

// Super inflight
inflight class Plane {
  year: num;
  new(year: num) {
    this.year = year;
  }
}

inflight class Jet extends Plane{
  new(year: num) {
    super();
//  ^^^^^^^^ Expected 1 positional argument(s) but got 0
  }
  constructor() {
//^^^^^^^^^^^ To declare a constructor, use "new"
  }
}

new std.Resource();
//^^^^^^^^^^^^^^^^ Cannot instantiate abstract class "Resource"

// Class with field and method of the same name (field comes first)
class C12 {
  z: num;
  z(): num {
  //^ Symbol "z" is already defined
    // The method body should still be type checked
    2 + "2";
    //^ Expected type to be "num", but got "str" instead
    this.z == 5; // OK
    return "hello";
    //^ Expected type to be "num", but got "str" instead
  }
  new() {
    this.z = 5;
  }
  z: str;
  //^ Symbol "z" is already defined
  z(): str {
  //^ Symbol "z" is already defined
    2 + "2";
    //^ Expected type to be "num", but got "str" instead
    return 5;
    //^ Expected type to be "str", but got "num" instead
  }
}

// Class with method and field of the same name (method comes first)
class C13 {
  z(): num {
  //^ Symbol "z" is already defined
    // The method body should still be type checked
    2 + "2";
    //^ Expected type to be "num", but got "str" instead
    return "hello";
    //^ Expected type to be "num", but got "str" instead
  }
  z: num;
  new() {
    this.z = 5;
  }
  z(): str {
  //^ Symbol "z" is already defined
    2 + "2";
    //^ Expected type to be "num", but got "str" instead
    return 5;
    //^ Expected type to be "str", but got "num" instead
  }
  z: str;
  //^ Symbol "z" is already defined
}

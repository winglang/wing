bring cloud;

struct A {
  x: str;
}

struct B extends A {
  y: num;
}

struct C extends B {
//     ^ struct C extends "B" but has conflicting member "x" (str != num)
  x: num;
}

let someStruct = B { y: 5 };
//               ^^^^^^^^^^ "x" is not initialized

struct D {
  f: MutArray<str>;
//^ struct fields must be immutable got: MutArray<str>
}

struct E {
  f: Map<Array<MutArray<str>>>;
//^ struct fields must be immutable got: Map<Array<MutArray<str>>>
}

let a = A {
  x: "Sup"
};
log(a.badField);
//    ^^^^^^^^ Property "badField" doesn't exist on "A"

// two inherits with same field name but different type
struct Razzle {
  a: str;
}

struct Dazzle {
  a: num;
}

struct Showtime extends Razzle, Dazzle {}
//     ^^^^^^^^ struct "Showtime" extends "Dazzle" which introduces a conflicting member "a"

let x = new cloud.BucketProps(1);
          //^ Cannot instantiate type "BucketProps" because it is not a class

let inlinePreflightStruct = () => {
  struct PreflightStruct {
      // ^ Structs must be declared at the top-level of a program: Struct PreflightStruct is not defined at the top-level
    name: str;
  }
};
          
let inlineInflightStruct = inflight () => {
  struct InflightStruct {
      // ^ Structs must be declared at the top-level of a program: Struct InflightStruct is not defined at the top-level
    name: str;
  }
};


struct SomeStruct1 {
  numField: num;
}
let numField = "hello";
let noSuchField = 1;
SomeStruct1 { numField }; // Wrong type when using punning
SomeStruct1 { noSuchField }; // Wrong field when using punning

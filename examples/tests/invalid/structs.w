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
//    ^^^^^^^^ Unknown symbol "badField"

// two inherits with same field name but different type
struct Razzle {
  a: str;
}

struct Dazzle {
  a: num;
}

struct Showtime extends Razzle, Dazzle {}
//     ^^^^^^^^ struct "Showtime" extends "Dazzle" which introduces a conflicting member "a"
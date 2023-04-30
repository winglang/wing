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

let some_struct = B { y: 5 };
//                ^^^^^^^^^^ "x" is not initialized

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
log(a.bad_field);
//      ^^^^^^ Unknown symbol "bad_field"

// two inherits with same field name but different type
struct Razzle {
  a: str;
}

struct Dazzle {
  a: num;
}

struct Showtime extends Razzle, Dazzle {}
//     ^^^^^^^^ struct "Showtime" extends "Dazzle" which introduces a conflicting member "a"
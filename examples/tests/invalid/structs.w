struct A {
  x: str;
}

struct B extends A {
  y: num;
}

struct C extends B {
//     ^ Strict C extends "B" but has conflicting member "x" (str != num)
  x: num;
}

let some_struct = B { y: 5 };
//                ^^^^^^^^^^ "x" is not initialized
bring cloud;

struct A {
  a: str;
  b: cloud.Bucket;
}

A.fromJson({});
//^^^^^^^^ Struct "A" contains field "b" which cannot be represented in Json

struct B {
  a: A;
}

B.fromJson({});
//^^^^^^^^ Struct "B" contains field "a" which cannot be represented in Json

struct C extends A {
  c: num;
}

C.fromJson({});
//^^^^^^^^ Struct "C" contains field "b" which cannot be represented in Json
struct A {
  field0: str;
}

struct B extends A {
  field1: num;
  field2: str;
}

let x = A {
  field0: "Sup"
};

let y = B {
  field0: "hello",
  field1: 1,
  field2: "world",
};

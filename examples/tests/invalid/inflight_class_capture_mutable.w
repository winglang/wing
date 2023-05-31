bring cloud;

let x = MutArray<str>["hello", "world"];

inflight class Foo {
  foo() {
    log(x.at(0));
//      ^ Cannot capture field 'x' with non-capturable type 'MutArray<str>'
  }
}

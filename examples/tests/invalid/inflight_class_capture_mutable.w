let x = MutArray<str>["hello", "world"];

inflight class Foo {
  foo() {
    log(x.at(0));
//      ^ Cannot capture field 'x' with non-capturable type 'MutArray<str>'
  }
}

let var foo = 12;

inflight class Goo {
  goo(): num {
    return foo;
//         ^^^ Cannot capture reassignable field 'foo'  
  }
}

// TODO: https://github.com/winglang/wing/issues/2757 (this should fail)
// test "t" {
//   let var x = "foo";

//   class C1 {
//     f() {
//       x = "bar";
//     }
//   }

//   new C1().f();
//   log(x);
// }

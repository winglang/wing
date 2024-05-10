class Foo {
  new() {
    let foo = () => {
      inflight () => {};
    };
  }
}

new Foo();

// https://github.com/winglang/wing/issues/5034
// let foo = () => {
//   inflight () => {};
// };

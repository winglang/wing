let y = "hello";

inflight () => {
  log(y);
//    ^ Cannot capture symbol "y" because it is shadowed by another symbol with the same name
  let y = "world";
};

// TODO: https://github.com/winglang/wing/issues/2753
// let x = "hi";
// if true {
//   log(x);
//   let x = "world";
// }
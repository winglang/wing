let y = "hello";

inflight () => {
  log(y);
//    ^ Cannot capture symbol "y" because it is shadowed by another symbol with the same name
  let y = "world";
};
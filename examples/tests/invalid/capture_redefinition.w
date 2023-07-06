let y = "h";

() => {
  log("hello");
  log(y);
//    ^ Cannot capture symbol "y" because it is shadowed by another symbol with the same name
  let y = "y";
};

inflight () => {
  let y = "hi";

  inflight () => {
    log(y);
//      ^ Cannot capture symbol "y" because it is shadowed by another symbol with the same name
    let y = "world";
  };
};

let x = "hi";
if true {
  log(x);
//    ^ Cannot capture symbol "x" because it is shadowed by another symbol with the same name
  let x = "world";
}
let x = MutArray<str> ["hello"];

inflight () => {
  let y = 0;
  x.copy().at(y);
//            ^ Cannot reference an inflight object from a preflight expression
};
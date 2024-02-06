let simpleThrow: (): num = () => {
  throw "not implemented";
};

let throwWithConditional: (): num = () => {
  // this should not be executed
  if false {
    return 1;
  }

  throw "not implemented";
};

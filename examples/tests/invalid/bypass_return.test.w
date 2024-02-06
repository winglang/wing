let y: (): num = () => {
    return "a";
//         ^^^ Expected type to be "num", but got "str" instead
};

let wrongReturnInScope = (): num => {
  if false {
    return "a";
         //^^^ Expected type to be "num", but got "str" instead
  }

  throw "error";
}

let missingReturn = (): num => {
  if true {
    throw "error";
  }
}
//^ Expected to return "num"

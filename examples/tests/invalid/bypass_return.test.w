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
};

let emptyBody = (): num => {};
//^ A function whose return type is "num" must return a value

let dfaSatisfied: (): num = () => {
  if true {
    return "a";
  }

  throw "not implemented";
};
//^ Expected type to be "num", but got "str" instead

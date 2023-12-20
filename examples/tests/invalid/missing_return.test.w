let returnString = inflight (): str => {
  log("i am not going to return anything!");
};
//^ A function whose return type is "str" must return a value.

let returnStringInferred = inflight () => {
  return "i am a returned value!";
};

let callInflight = inflight () => {
  let name: str = returnStringInferred();
};

let returnOption = inflight (): str? => {
  log("i am not going to return anything!");
};
// no error - there is implicit "return nil" at the end of the function

// TODO: analyzing all control flow paths - this should be an error
// https://github.com/winglang/wing/issues/457
let returnString2 = inflight (): str => {
  if false {
    return "hi";
  }
};

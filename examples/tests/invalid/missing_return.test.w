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

// Ignore return statements in inner closures when searching for return statements
let returnString3 = (): str => {
  let x = (): str => {
    return "what?"; // This should be ignored and we should produce a missing return error
  };
};
//^ A function whose return type is "str" must return a value.

// Ignore return statements in inner methods when searching for return statements
let returnString4 = (): str => {
  class Foo {
    pub static blah(): num {
      return 5;
    }
  }
};
//^ A function whose return type is "str" must return a value.

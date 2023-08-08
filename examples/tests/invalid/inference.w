bring cloud;
let api = new cloud.Api();

let preflightClosureArgs = (nice) => { return true; };
//  ^^^^^^^^^^^^^^^^^^^^    ^^^^ Unable to infer type

let recursiveClosure = (nice) => {
  if false {
    return recursiveClosure(nice);
  }
};
recursiveClosure(2);
recursiveClosure("");
//               ^^ Expected num, got str

let emptyArray = [];
//  ^^^^^^^^^^^ Unable to infer type
let numArray = emptyArray;
//  ^^^^^^^^^ Unable to infer type

let clonedArray = emptyArray.copyMut();
//  ^^^^^^^^^^^^ Unable to infer type


let stringInterpolationCannotBeInferred = (nice) => {
//  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    ^^^^ Unable to infer type
  return "Hello, ${nice}";
};

let stringArray2 = [].copyMut();
stringArray2.push("1");
stringArray2.push(2);
//                ^ Expected str, got num
stringArray2.push(stringArray2.at(0));

let numArray2 = [].copyMut();
numArray2.push(1);
numArray2.push("2");
//             ^^^ Expected num, got str
numArray2.push(numArray2.at(1));

let dependentArray = [numArray2.at(0), stringArray2.at(1)];
//                                     ^^^^^^^^^^^^^^^^^^ Expected num, got str

let dependentMap = { "cool" => numArray2.at(0), "cool2" => stringArray2.at(1) };
//                                                         ^^^^^^^^^^^^^^^^^^ Expected num, got str

let func = inflight (request) => {
  return cloud.ApiResponse {
    body: request.body,
    status: 200,
  };
};

api.get("/hello/world", func);

(new cloud.Bucket()).onCreate(func);
//                            ^^^^ Expected onCreate handler

let func2 = inflight (request) => {
//  ^^^^^             ^^^^^^^ Unable to infer type
  return cloud.ApiResponse {
    body: request.body,
//                ^^^^ Property not found
    status: 200,
  };
};

let anotherEmptyArray = [];
//  ^^^^^^^^^^^^^^^^^^^ Unable to infer type
Json { cool: anotherEmptyArray };
//           ^^^^^^^^^^^^^^^^^^^ Not a valid JSON element

class NeedAnnotations {
  returns() {
    return true;
//  ^^^^^^^^^^^^ Unexpected return value from void function. Return type annotations are required for methods.
  }
  args(nice) {
//     ^^^^ Missing required type annotation for method signature
    log(nice);
  }
}

let badFunc: inflight (str): void = inflight (arg1: num) => {};
//                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected type to be "inflight (str): void", but got "inflight (arg1: num): unknown" instead

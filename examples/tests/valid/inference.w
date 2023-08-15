bring cloud;

let preflightClosure = (nice) => { log(nice); return true; };

let recursiveClosure = (nice) => {
  if false {
    return recursiveClosure(nice);
  }
};
recursiveClosure(2);

let emptyArray = [];
let num_array: Array<num> = emptyArray;

let emptyArray2 = [];
let clonedArray2 = emptyArray2.copyMut();
clonedArray2.push(1);
clonedArray2.push(2);
clonedArray2.push(clonedArray2.at(0) + clonedArray2.at(1));
assert(clonedArray2.at(2) == 3);

let emptySet = {clonedArray2.at(2)};
let clonedSet = emptySet.copyMut();
clonedSet.add(4);

let api = new cloud.Api();
let func = inflight (request) => {
  return cloud.ApiResponse {
    body: request.body,
    status: 200,
  };
};

if true {
  api.get("/hello/world", func);
}

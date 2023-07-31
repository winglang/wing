bring cloud;

let preflightClosure = (nice) => { log(nice); return true; };
  
let emptyArray = [];
let num_array: Array<num> = emptyArray;

let emptyArray2 = [];
let clonedArray = emptyArray2.copyMut();
clonedArray.push(1);
clonedArray.push(2);
clonedArray.push(clonedArray.at(0) + clonedArray.at(1));

assert(clonedArray.at(2) == 3);

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

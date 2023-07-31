bring cloud;
let api = new cloud.Api();

let preflightClosureArgs = (nice) => { return true; };
                            //^^^^ Unable to infer type
  
let emptyArray = [];
//  ^^^^^^^^^^^ Unable to infer type
let numArray = emptyArray;
//  ^^^^^^^^^ Unable to infer type

let clonedArray = emptyArray.copyMut();
//  ^^^^^^^^^^^^ Unable to infer type

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

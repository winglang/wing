// This file was auto generated from an example found in: 14-functions.md_example_1
// Example metadata: {"valid":true}
bring cloud;

// preflight function - can be called at compile time
let plus = (num1: num, num2: num) => {
  return num1 + num2;
};

// Inflight code here is run at runtime
let func = new cloud.Function(inflight (payload:Json?) => {
  // When when the function it excuted on the cloud
  log(Json.stringify(payload));
});

let value = plus(1, 2);

log(value);

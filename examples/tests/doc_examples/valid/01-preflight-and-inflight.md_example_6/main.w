// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_6
// Example metadata: {"valid":true}
bring cloud;

let func = new cloud.Function(inflight () => {
  log("Hello from the cloud!");
});

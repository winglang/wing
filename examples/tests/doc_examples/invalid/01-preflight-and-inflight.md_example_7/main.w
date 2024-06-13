// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_7
// Example metadata: {"valid":false}
bring cloud;

let bucket = new cloud.Bucket();

let saveCalculation = inflight () => {
  bucket.addObject("file1", "{2 ** 10}"); // error: Cannot call into preflight phase while inflight
};

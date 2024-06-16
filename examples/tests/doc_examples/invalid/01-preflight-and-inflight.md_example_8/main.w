// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_8
// Example metadata: {"valid":false}
bring cloud;

inflight () => {
  new cloud.Bucket(); // error: Cannot create preflight class "Bucket" in inflight phase
};

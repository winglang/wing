// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_5
// Example metadata: {"valid":true}
bring cloud;

let bucket = new cloud.Bucket();

let firstObject = inflight (): str => {
  let items = bucket.list();
  return items.at(0);
};

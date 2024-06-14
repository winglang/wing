// This file was auto generated from an example found in: 10-using-javascript.md_example_1
// Example metadata: {"valid":true}
// main.w
bring cloud;
let bucket = new cloud.Bucket();

bucket.onCreate(inflight (file) => {
  log(file);
});

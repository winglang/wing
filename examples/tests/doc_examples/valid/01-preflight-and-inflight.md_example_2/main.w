// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let bucket = new cloud.Bucket(public: true);
bucket.addObject("file1.txt", "Hello world!");

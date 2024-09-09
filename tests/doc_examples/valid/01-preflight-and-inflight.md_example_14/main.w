// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_14
// Example metadata: {"valid":true}
bring cloud;
let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
  bucket.put("key", "value"); // `bucket` is lifted and `put` is being used on it
});

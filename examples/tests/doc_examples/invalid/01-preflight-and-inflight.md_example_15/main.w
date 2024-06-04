// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_15
// Example metadata: {"valid":false}
bring cloud;
let main_bucket = new cloud.Bucket() as "main";
let secondary_bucket = new cloud.Bucket() as "backup";
let use_main = true;
new cloud.Function(inflight () => {
  let var b = main_bucket;
  if !use_main {
    b = secondary_bucket;
  }
  b.put("key", "value"); // Error: the compiler doesn't know the possible values for `b` and therefore can't qualify the lift.
});

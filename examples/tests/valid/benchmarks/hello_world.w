/*\
cases:
  - target: sim
    meanThreshold: 1000
  - target: tf-aws
    meanThreshold: 3000
\*/

bring cloud;

let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
  bucket.put("Hello", "world");
});

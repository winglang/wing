/*\
cases:
  - target: sim
    maxMeanTime: 1000
  - target: tf-aws
    maxMeanTime: 3000
\*/

bring cloud;

let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
  bucket.put("Hello", "world");
});

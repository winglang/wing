/*\
cases:
  - target: sim
    maxMeanTime: 3000
  - target: tf-aws
    maxMeanTime: 8000
\*/

bring cloud;

let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
  bucket.put("Hello", "world");
});

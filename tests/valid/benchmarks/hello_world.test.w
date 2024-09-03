bring cloud;

let bucket = new cloud.Bucket();
new cloud.Function(inflight () => {
  bucket.put("Hello", "world");
});

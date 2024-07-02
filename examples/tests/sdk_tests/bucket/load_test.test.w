bring cloud;

let b = new cloud.Bucket();

new std.Test(inflight () => {
  for i in 0..500 {
    b.put("test{i}", "{i}");
  }
}, timeout: 3m) as "uploading many objects";

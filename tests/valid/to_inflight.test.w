bring cloud;

let b = new cloud.Bucket();

let x = inflight () => {
  b.list();
};

let js = std.Resource.toInflight(x);

assert(js.contains("client"));
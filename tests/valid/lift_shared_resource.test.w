bring cloud;
bring http;

let bucket = new cloud.Bucket();

pub class MyBucket {
  bucket: cloud.Bucket;

  new(bucket: cloud.Bucket) {
    this.bucket = bucket;
  }

  pub inflight list() {
    this.bucket.list();
  }
}

let b1 = new MyBucket(bucket) as "b1";
let b2 = new MyBucket(bucket) as "b2";

let api = new cloud.Api();
api.get("/", inflight () => {
  b1.list();
  b2.list();
  return {
    status: 200
  };
});

test "call endpoint" {
  let res = http.get(api.url);
  assert(res.status == 200);
}

bring cloud;

let bucket2 = new cloud.Bucket();

let fn = inflight () => {
  bucket2.put("hello", "world");
};

class MyClosure {
  pub bucket: cloud.Bucket;
  
  new() {
    this.bucket = new cloud.Bucket();
  }

  inflight handle() {
    log("handle called");
    this.putFile();
  }

  inflight putFile() {
    log("putFile called");
    this.bucket.put("hello", "world");
  }

  pub inflight listFiles(): Array<str> {
    bucket2.put("b2", "world");
    return this.bucket.list();
  }
}

let fn2 = new MyClosure();

test "call synthetic closure class as a function" {
  fn();
}

test "call non-synthetic closure as a function" {
  fn2();
  assert(fn2.bucket.get("hello") == "world");
  assert(fn2.listFiles().length == 1);
  assert(bucket2.get("b2") == "world");
}

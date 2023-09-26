
bring cloud;
bring util;

class Resource {
  b: cloud.Bucket;

  init() {
    this.b = new cloud.Bucket();
    
    new cloud.Service(
      onStart: inflight () => {
        util.sleep(5s);
        this.b.put("ready", "true");
      },
    );
  }

  pub inflight access() {
    this.b.get("ready");
  }
}

let foo = new Resource();

// see https://github.com/winglang/wing/issues/4251
test "service is ready only after onStart finishes" {
  foo.access();
}

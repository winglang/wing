
bring cloud;
bring util;

let CONTEXT_VALUE = "hello, context!";

class Resource {
  b: cloud.Bucket;

  init() {
    this.b = new cloud.Bucket();
    
    new cloud.Service(
      onStart: inflight (): str => {
        util.sleep(5s);
        this.b.put("ready", "true");
        return CONTEXT_VALUE;
      },

      onStop: inflight (ctx: str) => {
        assert(ctx == CONTEXT_VALUE);
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
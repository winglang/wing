bring cloud;
bring util;
bring http;

// hack: only supported in the "sim" target for now
if util.env("WING_TARGET") == "sim" {
  class MyService {
    b: cloud.Bucket;
    body: str;

    pub s: cloud.Service;

    new(body: str) {
      this.b = new cloud.Bucket();
      this.body = body;

      this.s = new cloud.Service(inflight () => {
        log("starting service");
        util.sleep(1s);
        this.b.put("ready", "true");
        let state = 456;
  
        return () => {
          log("stopping service");
          log("state is: {state}");
    
          // make sure inflight state is presistent across onStart/onStop
          assert(state == 456);
        };
      });
    }

    pub inflight access() {
      // when access() is called we expect the service to have completed initialization
      this.b.get("ready");
    }

    pub inflight port(): num {
      return num.fromStr(this.b.get("port"));
    }
  }

  let foo = new MyService("bang bang!");

  // see https://github.com/winglang/wing/issues/4251
  test "service is ready only after onStart finishes" {
    foo.access();
  }
}
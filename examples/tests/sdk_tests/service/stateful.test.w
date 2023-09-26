bring cloud;
bring util;
bring http;

// hack: only supported in the "sim" target for now
if util.env("WING_TARGET") == "sim" {
  class MyService impl cloud.IServiceHandler {
    b: cloud.Bucket;
    body: str;

    pub s: cloud.Service;

    init(body: str) {
      this.b = new cloud.Bucket();
      this.body = body;

      // it's idiomatic to just pass `this` here and implement the callbacks on the current object.
      this.s = new cloud.Service(this);
    }

    inflight var state: num;

    inflight init() {
      this.state = 123;
    }

    pub inflight onStart() {
      log("starting service");
      util.sleep(1s);
      this.b.put("ready", "true");
      let port = MyService.startServer(this.body);
      log("listening on port ${port}");
      this.state = 456;
      this.b.put("port", "${port}");
    }

    pub inflight onStop() {
      log("stopping service");
      log("state is: ${this.state}");

      // make sure inflight state is presistent across onStart/onStop
      assert(this.state == 456);
      MyService.stopServer();
    }

    pub inflight access() {
      // when access() is called we expect the service to have completed initialization
      this.b.get("ready");

      // this state belongs to the inflight client created for the test cloud function
      // and not to the service, so we expect it to stay 123.
      assert(this.state == 123);
    }

    pub inflight port(): num {
      return num.fromStr(this.b.get("port"));
    }

    extern "./http-server.js" static inflight startServer(body: str): num;
    extern "./http-server.js" static inflight stopServer();
  }

  let foo = new MyService("bang bang!");

  // see https://github.com/winglang/wing/issues/4251
  test "service is ready only after onStart finishes" {
    foo.access();

    let response = http.get("http://localhost:${foo.port()}");
    log(response.body ?? "");
    assert(response.body ?? "" == "bang bang!");
  }

  test "service.stop() can be used to stop the service before shutdown" {
    let before = http.get("http://localhost:${foo.port()}");
    assert(before.ok);
    
    foo.s.stop();

    // now the http server is expected to be closed
    let var error = false;
    try {
      http.get("http://localhost:${foo.port()}");
    } catch {
      error = true;
    }
    assert(error);
  }
}
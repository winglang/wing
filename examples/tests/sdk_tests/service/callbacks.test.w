bring cloud;
bring util;
bring http;

// hack: only supported in the "sim" target for now
if util.env("WING_TARGET") == "sim" {
  let b = new cloud.Bucket();
  let startCounter = new cloud.Counter();
  let status = "status";
  let started = "started";
  let stopped = "stopped";

  let s = new cloud.Service(inflight () => {
    b.put(status, started);
    startCounter.inc();

    return () => {
      b.put(status, stopped);
      startCounter.dec();
    };
  }, autoStart: false);

  test "does not start automatically if autoStart is false" {
    assert(!b.tryGet(status)?);
  }

  test "start() calls onStart() idempotently" {
    s.start();
    assert(b.tryGet(status) == started);
    assert(startCounter.peek() == 1);

    s.start(); // idempotent, so start should not be called again
    assert(startCounter.peek() == 1);
  }

  test "stop() calls onStop()" {
    assert(startCounter.peek() == 0);
    
    // we haven't started the service yet, so onStop() should not be called
    s.stop();
    assert(!b.tryGet(status)?);
    assert(startCounter.peek() == 0);

    // now we are starting..
    s.start();
    assert(startCounter.peek() == 1);

    // and onStop will be called
    s.stop();
    assert(startCounter.peek() == 0);
    assert(b.get(status) == stopped);
  }
}

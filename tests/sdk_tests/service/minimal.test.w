bring cloud;

// hack: only supported in the "sim" target for now
if @target == "sim" {
  let s = new cloud.Service(inflight () => {
    log("hello, service!");

    return () => {
      log("stopping!");
    };
  });

  test "start and stop" {
    assert(s.started());
    s.stop();
    assert(!s.started());
  }
}

bring "./my-service.w" as my;
bring util;

if util.env("WING_TARGET") == "sim" {

  let svc = new my.MyService();

  test "state.get() returns the runtime value" {
    assert(svc.startTime == svc.getStartTime());
    assert(svc.getStartTime() == "2023-10-16T20:47:39.511Z");
  }

  test "state.tryGet() return nil if there is no value" {
    let v = svc.state.tryGet("foo_bar");
    assert(v == nil);
  }

}

bring "./my-service.w" as my;

let svc = new my.MyService();

test "state.get() returns the runtime value" {
  assert(svc.startTime == svc.getStartTime());
  assert(svc.getStartTime() == "2023-10-16T20:47:39.511Z");
}

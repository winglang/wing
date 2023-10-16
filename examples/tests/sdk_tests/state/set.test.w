bring "./my-service.w" as my;

let svc = new my.MyService();

test "token resolved at runtime" {
  log(svc.startTime);
  assert(svc.startTime == "2023-10-16T20:47:39.511Z");
}

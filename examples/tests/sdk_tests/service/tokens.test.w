bring cloud;
bring util;
bring http;

// hack: only supported in the "sim" target for now
if util.env("WING_TARGET") == "sim" {
  let b = new cloud.Bucket();
  let api = new cloud.Api();
  api.get("/", inflight () => {
    return {
      body: "api test",
      status: 200
    };
  });

  let s = new cloud.Service(inflight () => {
    let result = http.get(api.url);
    b.put("service.txt", result.body ?? "");
  });

  test "will bind and use tokens" {
    util.waitUntil(inflight () => {
      return b.exists("service.txt");
    });

    assert(b.get("service.txt") == "api test");
  }
}

bring cloud;
bring expect;
bring http;
bring util;

let api = new cloud.Api();

api.get("/path", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let foo = util.env("FOO");

  return cloud.ApiResponse {
    status: 200,
    body: foo
  };
}, env: { FOO: "bar" });

test "can access env vars in handler" {
    let url = api.url + "/path";
    let res = http.get(url);
    expect.equal(res.body, "bar");
}

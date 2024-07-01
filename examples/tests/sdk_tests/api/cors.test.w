bring cloud;
bring http;
bring util;

let api = new cloud.Api(cors: true);
let body = "ok!";

api.get("/path", inflight (req) => {
  return {
    status: 200,
    body: body
  };
});

test "http.get and http.fetch can preform a call to an api" {
  let url = api.url + "/path";
  let response = http.get(url);

  assert(response.headers.get("access-control-allow-origin") == "*");
}

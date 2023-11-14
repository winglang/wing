bring cloud;
bring http;

let api = new cloud.Api();

api.get("/foo", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let issues = Json.parse("[\{\"foo\": \"bar\"}, \{\"foo\": \"baz\"}, \{\"foo\": \"qux\"}]");

  return cloud.ApiResponse {
    status: 200,
    headers: {
      "Content-Type" => "application/json" // also tried "content-type": "application/json"
    },
    body: Json.stringify(issues),
  };
});

test "api should return a valid stringified json" {
  let res = http.get(api.url + "/foo");
  let body = Json.parse(res.body);
  let a1 = body.getAt(0);
  assert(a1.get("foo") == "bar");
}

bring cloud;
bring http;
bring util;

let api = new cloud.Api();
let body = Json {"cat": "Tion"};

api.post("/path", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == cloud.HttpMethod.POST);
  assert(req.path == "/path");
  assert(req.body == Json.stringify(body));
  assert(req.headers?.get("content-type") == "application/json");

  return cloud.ApiResponse {
    status: 200,
    body: req.body
  };
});


test "http.post and http.fetch can preform a call to an api" {
  let url = api.url + "/path";
  let response: http.Response = http.post(url, headers: { "content-type" => "application/json" }, body: Json.stringify(body));
  let fetchResponse: http.Response = http.post(url, method: http.HttpMethod.POST, headers: { "content-type" => "application/json" }, body: Json.stringify(body));

  assert(response.body == Json.stringify(body));
  assert(response.status == 200);
  assert(response.url == url);

  assert(fetchResponse.body == Json.stringify(body));
  assert(fetchResponse.status == 200);
  assert(fetchResponse.url == url);
}

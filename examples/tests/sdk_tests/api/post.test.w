bring cloud;
bring http;
bring util;
bring expect;

let api = new cloud.Api();
let body = Json {"cat": "Tion"};

api.post("/", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  expect.equal(req.method, cloud.HttpMethod.POST);
  expect.equal(req.path, "/");
  expect.equal(req.body, Json.stringify(body));
  expect.equal(req.headers?.get("content-type"), "application/json");

  return cloud.ApiResponse {
    status: 200,
    body: req.body
  };
});


test "http.post and http.fetch can preform a call to an api" {
  let response: http.Response = http.post(api.url, headers: { "content-type" => "application/json" }, body: Json.stringify(body));
  let fetchResponse: http.Response = http.post(api.url, method: http.HttpMethod.POST, headers: { "content-type" => "application/json" }, body: Json.stringify(body));

  expect.equal(response.body , Json.stringify(body));
  expect.equal(response.status , 200);
  expect.match(response.url , api.url);

  expect.equal(fetchResponse.body , Json.stringify(body));
  expect.equal(fetchResponse.status , 200);
  expect.match(fetchResponse.url , api.url);
}

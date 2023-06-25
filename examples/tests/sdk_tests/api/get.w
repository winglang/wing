bring cloud;
bring http;

let http_GET = http.HttpMethod.GET;
let api_GET = cloud.HttpMethod.GET;

let api = new cloud.Api();
let body = "ok!";

api.get("/path", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == api_GET);
  assert(req.path == "/path");
  // req.body is not a string in sim- https://github.com/winglang/wing/issues/3024
  // assert(req.body?.length == 0);
  assert(req.headers?.get("content-type") == "application/json");

  return cloud.ApiResponse {
    status: 200,
    body: body
  };
});


test "http.get and http.fetch can preform a call to an api" {
  let url = api.url + "/path";
  let getResponse: http.Response = http.get(url, { headers: { "content-type": "application/json" }});
  let fetchResponse: http.Response = http.fetch(url, http.RequestOptions { method: http_GET, headers: { "content-type": "application/json" }});
  let fetchResponseNoMethod: http.Response = http.fetch(url, http.RequestOptions { headers: { "content-type": "application/json" }});


  assert(getResponse.body == body);
  assert(getResponse.status == 200);
  assert(getResponse.url == url);

  assert(fetchResponse.body == body);
  assert(fetchResponse.status == 200);
  assert(fetchResponse.url == url);

  assert(fetchResponseNoMethod.body == body);
  assert(fetchResponseNoMethod.status == 200);
  assert(fetchResponseNoMethod.url == url);
}
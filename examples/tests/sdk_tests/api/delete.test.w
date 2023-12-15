bring cloud;
bring http;
bring util;

let api = new cloud.Api();

api.delete("/path", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == cloud.HttpMethod.DELETE);
  assert(req.query?.get("all") == "true");
  assert(req.query?.get("page") == "6");
  assert(req.path == "/path");

  return cloud.ApiResponse {
    status: 200,
    body: req.query?.get("page")
  };
});


test "http.delete and http.fetch can preform a call to an api" {
    let url = "{api.url}/path?all=true&page=6";
    let response: http.Response = http.delete(url);
    let fetchResponse: http.Response = http.fetch(url, method: http.HttpMethod.DELETE);

    assert(response.body == "6");
    assert(response.status == 200);
    assert(response.url == url);

    assert(fetchResponse.body == "6");
    assert(fetchResponse.status == 200);
    assert(fetchResponse.url == url);
}

bring cloud;
bring http;
bring util;


let api = new cloud.Api();
let body = "ok!";

api.get("/path", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == cloud.HttpMethod.GET);
  assert(req.path == "/path");
  assert(req.body?.length == 0);
  assert(req.headers?.get("content-type") == "application/json");

  return cloud.ApiResponse {
    status: 200,
    body: body
  };
});


test "http.get and http.fetch can preform a call to an api" {
    let url = api.url + "/path";
    let getResponse: http.Response = http.get(url, headers: { "content-type" => "application/json" });
    let fetchResponse: http.Response = http.fetch(url, method: http.HttpMethod.GET, headers: { "content-type" => "application/json" });
    let fetchResponseNoMethod: http.Response = http.fetch(url,  headers: { "content-type" => "application/json" });


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

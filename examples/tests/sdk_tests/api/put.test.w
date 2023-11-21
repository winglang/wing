bring cloud;
bring http;
bring util;

let api = new cloud.Api();

let body = Json {"cat": "Tion"};
let user = "guy";
let _id = "12345";

api.put("/path/:id/nn/:user", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let path = "/path/{_id}/nn/{user}";
  assert(req.method == cloud.HttpMethod.PUT);
  assert(req.vars?.get("id") == _id);
  assert(req.vars?.get("user") == user);
  assert(req.path == path);
  assert(req.body == Json.stringify(body));
  assert(req.headers?.get("content-type") == "application/json");

  return cloud.ApiResponse {
    status: 200,
    headers: {"content-type" => "application/json; charset=utf-8"},
    body: req.vars?.get("id")
  };
});


test "http.put and http.fetch can preform a call to an api" {
    let url = "{api.url}/path/{_id}/nn/{user}";
    let response: http.Response = http.put(url, headers: { "content-type" => "application/json" }, body: Json.stringify(body));
    let fetchResponse: http.Response = http.put(url, method: http.HttpMethod.PUT, headers: { "content-type" => "application/json" }, body: Json.stringify(body));

    
    assert(response.headers.get("content-type") == "application/json; charset=utf-8");
    assert(response.body == _id);
    assert(response.status == 200);
    assert(response.url == url);

    assert(fetchResponse.headers.get("content-type") == "application/json; charset=utf-8");
    assert(fetchResponse.body == _id);
    assert(fetchResponse.status == 200);
    assert(fetchResponse.url == url);
}


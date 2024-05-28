bring cloud;
bring http;
bring util;


let api = new cloud.Api();
let path = "/path";

api.options(path, inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == cloud.HttpMethod.OPTIONS);
  assert(req.path == path);
  assert(req.body == nil);

  return cloud.ApiResponse {
    status: 204
  };
});

api.head(path, inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == cloud.HttpMethod.HEAD);
  assert(req.path == path);
  assert(req.body == nil);

  return cloud.ApiResponse {
    status: 204
  };
});

// CONNECT is a forbidden method in the fetch API and therefore could not be tested
// https://fetch.spec.whatwg.org/#methods
api.connect(path, inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 204
  };
});




test "http.fetch can preform a call to an api to CONNECT, HEAD and OPTIONS" {
    let url = api.url + path;
    let options: http.Response = http.fetch(url, method: http.HttpMethod.OPTIONS);
    let head: http.Response = http.fetch(url, method: http.HttpMethod.HEAD);

    assert(options.status == 204);
    assert(options.url == url);
}

 
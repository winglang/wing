bring cloud;
bring http;

// https://github.com/winglang/wing/issues/3049
let api_OPTIONS = cloud.HttpMethod.OPTIONS;
let http_OPTIONS = http.HttpMethod.OPTIONS;

let api_HEAD = cloud.HttpMethod.HEAD;
let http_HEAD = http.HttpMethod.HEAD;

let api_CONNECT = cloud.HttpMethod.CONNECT;


let api = new cloud.Api();
let path = "/path";


api.options(path, inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == api_OPTIONS);
  assert(req.path == path);
  // req.body is not a string in sim- https://github.com/winglang/wing/issues/3024
  // assert(req.body?.length == 0);

  return cloud.ApiResponse {
    status: 204
  };
});

api.head(path, inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == api_HEAD);
  assert(req.path == path);
  // req.body is not a string in sim- https://github.com/winglang/wing/issues/3024
  // assert(req.body?.length == 0);

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
  let options: http.Response = http.fetch(url, method: http_OPTIONS);
  let head: http.Response = http.fetch(url, method: http_HEAD);

  assert(options.status == 204);
  assert(options.url == url);

  assert(head.status == 204);
  assert(head.url == url);
}

 
/*\
skip: true
\*/
// TODO: failing due to https://github.com/winglang/wing/issues/2522
bring cloud;

let api = new cloud.Api();

let counter = new cloud.Counter();

let handler = inflight (request: cloud.ApiRequest): cloud.ApiResponse => {

  let count = counter.inc();

  let bodyResponse = Json {
    count: count,
  };
  
  let resp = cloud.ApiResponse {
    body: bodyResponse,
    status: 200,
  };
  return resp;
};

api.get("/hello/world", handler);

test "api url" {
  let url = api.url;
  assert(url.startsWith("http://"));
}

// Initialize the API in resource
class A {
  api: cloud.Api;
  init() {
    this.api = new cloud.Api();
    this.api.get("/endpoint1", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let text = "${this.api.url}/endpoint2";
      return cloud.ApiResponse {
        status: 200,
        body: Json text,
      };
    });
  }
}

new A();


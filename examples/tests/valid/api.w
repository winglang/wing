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

class Foo impl cloud.IFunctionHandler {
  api: cloud.Api;
  init(api: cloud.Api) {
    this.api = api;
  }
  inflight handle(message: str) {
    let url = this.api.url;
    assert(url.starts_with("http://"));
  }
}

new cloud.Function(new Foo(api)) as "test";

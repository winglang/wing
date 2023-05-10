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
    assert(url.startsWith("http://"));
  }
}

new cloud.Function(new Foo(api)) as "test";

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


bring cloud;

let api = new cloud.Api();

let counter = new cloud.Counter();

let handler = inflight (request: cloud.ApiRequest): cloud.ApiResponse => {

  let count = counter.inc();

  let bodyResponse = Json {
    count: count,
  };
  
  let resp = cloud.ApiResponse {
    body: Json.stringify(bodyResponse),
    headers: {
      "content-type" => "application/json"
    },
    status: 200,
  };
  return resp;
};

api.get("/hello/world", handler);

test "api url" {
  let url = api.url;
  assert(url.startsWith("http"));
}

// Initialize the API in resource
class A {
  api: cloud.Api;
  new() {
    this.api = new cloud.Api();
    this.api.get("/endpoint1", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
      let text = "{this.api.url}/endpoint2";
      return cloud.ApiResponse {
        status: 200,
        body: text,
      };
    });
  }
}

new A();


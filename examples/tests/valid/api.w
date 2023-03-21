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

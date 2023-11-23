bring cloud;

let api = new cloud.Api();
let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: "ok",
    status: 200
  };
};

api.get("/test/path", handler);
api.get("/test/{variable}", handler);
// ^ Endpoint for path '/test/{variable}' and method 'GET' is ambiguous - it conflicts with existing endpoint for path '/test/path'
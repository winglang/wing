// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_11
// Example metadata: {"valid":true}
bring cloud;
bring http;

let api = new cloud.Api();
api.get("/test", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    status: 200,
    body: "success!"
  };
});

let checkEndpoint = inflight () => {
  let url = api.url; // this is OK
  let path = "{url}/test";
  let response = http.get(path);
  assert(response.status == 200);
};
new cloud.Function(checkEndpoint);

// This file was auto generated from an example found in: 34-http-server.md_example_4
// Example metadata: {"valid":true}
bring cloud;

let api = new cloud.Api();

api.put("/items/:id", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let itemId = req.vars.get("id");
  if let itemBody = Json.tryParse(req.body ?? "") {    
    return cloud.ApiResponse {
        status: 200,
        body: "Received id {itemId} with body {itemBody}"
    };
  }
  return cloud.ApiResponse {
      status: 400,
      body: "Missing body"
  };
});

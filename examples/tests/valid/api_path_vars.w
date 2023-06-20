bring cloud;
bring http;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: Json.stringify({ user: req.vars.get("name") }),
    headers: { "content-type": "text/plain" },
    status: 200
  };
};

api.get("/users/{name}", handler);


test "test" {
  let username = "tsuf";
  let res: http.Response = http.get("${api.url}/users/${username}");



  assert(res.status == 200);
  assert(Json.parse(res.body).get("user") == username);
}

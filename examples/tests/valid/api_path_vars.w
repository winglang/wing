bring cloud;
bring util;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: Json.stringify({ user: req.vars.get("name") }),
    headers: { "content-type": "application/json" },
    status: 200
  };
};

api.get("/users/{name}", handler);


test "test" {
  let username = "tsuf";
  let res: util.Response = util.Http.get("${api.url}/users/${username}");



  assert(res.status == 200);
  assert(Json.parse(res.body).get("user") == username);
}

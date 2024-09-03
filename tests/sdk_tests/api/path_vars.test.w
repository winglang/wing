bring cloud;
bring http;

let api = new cloud.Api();


let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: Json.stringify({ user: req.vars.get("name") }),
    headers: { "content-type" => "application/json" },
    status: 200
  };
};

let handler_two = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: Json.stringify({ user: req.vars.get("name"), age: req.vars.get("age") }),
    headers: { "content-type" => "application/json" },
    status: 200
  };
};

api.get("/users/:name", handler);
api.get("/path/:name", handler);
api.get("/users/permission/:name", handler);
api.get("/path/:name/:age", handler_two);

test "path vars are valid" {
  let username = "akhil";
  let age = "23";

  let res1: http.Response = http.get("{api.url}/users/{username}");
  assert(res1.status == 200);
  assert(Json.parse(res1.body).get("user") == username);

  let res2: http.Response = http.get("{api.url}/path/{username}");
  assert(res2.status == 200);
  assert(Json.parse(res2.body).get("user") == username);

  let res3: http.Response = http.get("{api.url}/users/permission/{username}");
  assert(res3.status == 200);
  assert(Json.parse(res3.body).get("user") == username);

  let res4: http.Response = http.get("{api.url}/path/{username}/{age}");
  assert(res4.status == 200);
  assert(Json.parse(res4.body).get("user") == username);
  assert(Json.parse(res4.body).get("age") == age);
}

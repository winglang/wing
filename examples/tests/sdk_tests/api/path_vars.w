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

api.get("/users/{name}", handler);
api.get("/{name}", handler);
api.get("/users/permission/{name}", handler);
api.get("/{name}/{age}", handler_two);

test "test" {
  let username = "tsuf";
  let res: http.Response = http.get("${api.url}/users/${username}");


  assert(res.status == 200);
  assert(Json.parse(res.body ?? "").get("user") == username);
}

test "test2" {
  let username = "akhil";
  let res: http.Response = http.get("${api.url}/${username}");


  assert(res.status == 200);
  assert(Json.parse(res.body ?? "").get("user") == username);
}

test "test3" {
  let username = "akhil";
  let res: http.Response = http.get("${api.url}/users/permission/${username}");


  assert(res.status == 200);
  assert(Json.parse(res.body ?? "").get("user") == username);
}

test "test4" {
  let username = "akhil";
  let age = "23";
  let res: http.Response = http.get("${api.url}/${username}/${age}");


  assert(res.status == 200);
  assert(Json.parse(res.body ?? "").get("user") == username);
  assert(Json.parse(res.body ?? "").get("age") == age);
}

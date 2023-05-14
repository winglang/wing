/*\
skip: true
\*/
// failing due to https://github.com/winglang/wing/issues/2522

bring cloud;

let api = new cloud.Api();

class Fetch {
  extern "./api_path_vars.js" inflight get(url: str): Json;
}

let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: {user:  req.vars.get("name")},
    status: 200
  };
};

api.get("/users/{name}", handler);

let f = new Fetch();

test "test" {
  let username = "tsuf";
  // TODO: change f.get to static when possible
  let res = f.get("${api.url}/users/${username}");

  assert(res.get("status") == 200);
  assert(res.get("body").get("user") == username);
}

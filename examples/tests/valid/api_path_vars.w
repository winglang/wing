bring cloud;

let api = new cloud.Api();

class Fetch {
  extern "./api_path_vars.js" inflight get(url: str): Json;
  init() { }
}

let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let vars = req.vars ?? {name: ""};
  return cloud.ApiResponse {
    body: {user: vars.get("name")},
    status: 200
  };
};

api.get("/users/{name}", handler);

let f = new Fetch();

new cloud.Function(inflight () => {
  let username = "tsuf";
  // TODO: change f.get to static when possible
  let res = f.get("${api.url}/users/${username}");

  assert(res.get("status") == 200);
  assert(res.get("body").get("user") == username);
}) as "test";



bring cloud;

class TestUtils {
  extern "./website_with_api.js" static inflight fetch(url: str, method: str, headers: Json?, body: str?): Json;
}

//needs to be written before the website (so the website will be able to use it's url on sim env)
let api = new cloud.Api(
  cors: cloud.ApiCorsProps {
    origins: ["*"],
    methods: [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS],
    headers: ["Content-Type"],
    allowCredentials: false,
    exposedHeaders: ["Content-Type"]
  }
);

let website = new cloud.Website(path: "./website_with_api");

let usersTable = new cloud.Table(
  name: "users-table",
  primaryKey: "id",
  columns: {
    id: cloud.ColumnType.STRING,
    name: cloud.ColumnType.STRING,
    age: cloud.ColumnType.NUMBER,
  }
);


let getHandler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: Json.stringify({ users: usersTable.list() }),
    status: 200
  };
};

let postHandler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let body: Json = Json.parse(req.body ?? Json.stringify({name: "", age: "", id: ""}));
  if (body.get("name") == "" || body.get("age")  == "" || body.get("id")  == "") {
    return cloud.ApiResponse {
      body: Json.stringify({ error: "incomplete details" }),
      status: 400
    };
  }
  usersTable.insert(Json.stringify(body.get("id")), body);
  return cloud.ApiResponse {
    body: Json.stringify({ user: body.get("id") }),
    status: 201
  };
};

api.get("/users", getHandler);
api.post("/users", postHandler);

website.addJson("config.json", { apiUrl: api.url });

test "GET /users" {
  let res = TestUtils.fetch(api.url + "/users", "GET");
  assert(num.fromJson(res.get("status")) == 200);

  assert(res.get("headers").get("access-control-allow-origin") == "*");
  assert(res.get("headers").get("access-control-expose-headers") == "Content-Type");
  assert(res.get("headers").get("access-control-allow-credentials") == "false");

  assert(res.get("headers").get("access-control-allow-headers") == nil);
  assert(res.get("headers").get("access-control-allow-methods") == nil);
}

test "OPTIONS /users" {
  let res = TestUtils.fetch(api.url + "/users", "OPTIONS");
  assert(num.fromJson(res.get("status")) == 204);
  assert(res.get("headers").get("access-control-allow-origin") == "*");
  assert(res.get("headers").get("access-control-allow-methods") == "GET,POST,OPTIONS");
  assert(res.get("headers").get("access-control-allow-headers") == "Content-Type");
  assert(res.get("headers").get("access-control-expose-headers") == "Content-Type");
  assert(res.get("headers").get("access-control-allow-credentials") == "false");
}
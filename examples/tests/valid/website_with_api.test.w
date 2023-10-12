bring cloud;
bring ex;
bring http;
bring "./assertions.w" as t;

//needs to be written before the website (so the website will be able to use it's url on sim env)
let api = new cloud.Api(
  cors: true,
  corsOptions: cloud.ApiCorsOptions {
    allowOrigin: ["*"],
    allowMethods: [cloud.HttpMethod.GET, cloud.HttpMethod.POST, cloud.HttpMethod.OPTIONS],
    allowHeaders: ["Content-Type"],
    allowCredentials: false,
    exposeHeaders: ["Content-Type"],
    maxAge: 600s
  }
);

let website = new cloud.Website(path: "./website_with_api");

let usersTable = new ex.Table(
  name: "users-table",
  primaryKey: "id",
  columns: {
    "id" => ex.ColumnType.STRING,
    "name" => ex.ColumnType.STRING,
    "age" => ex.ColumnType.NUMBER,
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
  let response = http.fetch(api.url + "/users", {
    method: http.HttpMethod.GET,
    headers: {
      "Content-Type": "text/json"
    }
  });

let headers = response.headers;
  t.Assert.equalNum(response.status, 200);
  t.Assert.equalStr(headers.get("access-control-allow-origin"), "*");
  
  t.Assert.equalStr(headers.get("access-control-expose-headers"), "Content-Type");
  t.Assert.equalStr(headers.get("access-control-allow-credentials"), "false");

  t.Assert.isNil(headers.tryGet("access-control-allow-headers"));
  t.Assert.isNil(headers.tryGet("access-control-allow-methods"));
}

test "OPTIONS /users" {
  let response = http.fetch(api.url + "/users", {
    method: http.HttpMethod.OPTIONS,
    headers: {
      "Content-Type": "text/json"
    }
  });

  let headers = response.headers;
  t.Assert.equalNum(response.status, 204);
  t.Assert.equalStr(headers.get("access-control-allow-methods"), "GET,POST,OPTIONS");
  t.Assert.equalStr(headers.get("access-control-allow-headers"), "Content-Type");
}
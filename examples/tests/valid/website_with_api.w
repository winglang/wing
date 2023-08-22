bring cloud;
bring ex;
bring http;

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

inflight class Assert {
  static equalStr(a: str, b: str): bool {
    try {
      assert(a == b);
    } catch e {
      throw("expected: ${b} got: ${a}");
    }
  }

  static isNil(a: str?): bool {
    try {
      assert(a == nil);
    } catch e {
      throw("expected ${a} to be nil");
    }
  }

  static equalNum(a: num, b: num): bool{
    try {
      assert(a == b);
    } catch e {
      log(e);
      throw("expected: ${b} got: ${a}");
    }
  }
}

test "GET /users" {
  let response = http.fetch(api.url + "/users", {
    method: http.HttpMethod.GET,
    headers: {
      "Content-Type": "text/json"
    }
  });

let headers = response.headers;
  Assert.equalNum(response.status, 200);

  log(Json.stringify(headers));

  Assert.equalStr(headers.get("access-control-allow-origin"), "*");
  Assert.equalStr(headers.get("access-control-expose-headers"), "Content-Type");
  Assert.equalStr(headers.get("access-control-allow-credentials"), "false");

  Assert.isNil(headers.get("access-control-allow-headers"));
  Assert.isNil(headers.get("access-control-allow-methods"));
}

test "OPTIONS /users" {
  let response = http.fetch(api.url + "/users", {
    method: http.HttpMethod.OPTIONS,
    headers: {
      "Content-Type": "text/json"
    }
  });

  let headers = response.headers;
  Assert.equalNum(response.status, 204);
  Assert.equalStr(headers.get("access-control-allow-origin"), "*");
  Assert.equalStr(headers.get("access-control-allow-methods"), "GET,POST,OPTIONS");
  Assert.equalStr(headers.get("access-control-allow-headers"), "Content-Type");
  Assert.equalStr(headers.get("access-control-expose-headers"), "Content-Type");
  Assert.equalStr(headers.get("access-control-allow-credentials"), "false");
}
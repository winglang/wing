bring cloud;

//needs to be written before the website (so the website will be able to use it's url on sim env)
let api = new cloud.Api();

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

  // responsible for the CORS - https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
let optionsHandler = inflight(req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    status: 204
  };
};

api.get("/users", getHandler);
api.post("/users", postHandler);
api.options("/users", optionsHandler);

website.addJson("config.json", { apiUrl: api.url });

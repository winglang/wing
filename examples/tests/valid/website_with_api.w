bring cloud;

//needs to be written before the website (so the website will be able to use it's url on sim env)
let api = new cloud.Api();

let website = new cloud.Website(path: "./website_with_api");

let users_table = new cloud.Table(
  name: "users-table",
  primary_key: "id",
  columns: {
    id: cloud.ColumnType.STRING,
    name: cloud.ColumnType.STRING,
    age: cloud.ColumnType.NUMBER,
  }
);


let get_handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: {users: users_table.list()},
    status: 200
  };
};

let post_handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  let body: Json = req.body ?? {name: "", age: "", id: ""};
  if (body.get("name") == "" || body.get("age")  == "" || body.get("id")  == "") {
    return cloud.ApiResponse {
      body: {error: "incomplete details"},       
      status: 400
    };
  }
  users_table.insert(body);
  return cloud.ApiResponse {
    body: {user: body.get("id")},
    status: 201
  };
};

  // responsible for the CORS - https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
let options_handler = inflight(req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
    },
    status: 204
  };
};

api.get("/users", get_handler);
api.post("/users", post_handler);
api.options("/users", options_handler);

website.add_json("config.json", { apiUrl: api.url });






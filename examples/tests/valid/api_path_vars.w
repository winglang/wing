bring cloud;

let api = new cloud.Api();

let handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
    // log(Json.stringify(req.vars));
  let user_name = "A";// req.vars.get("name");
  return cloud.ApiResponse {
    body: "Hello, ${user_name}!",
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  };
};

api.get("/users/:name", handler);

api.get("/",  inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return cloud.ApiResponse {
    body: "Hello world",
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}
);


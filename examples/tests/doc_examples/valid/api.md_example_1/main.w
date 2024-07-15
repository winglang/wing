// This file was auto generated from an example found in: api.md_example_1
// Example metadata: {"valid":true}
bring cloud;
bring ex;

let api = new cloud.Api();
// Used for generating unique id
let counter = new cloud.Counter();
// our employee database
let db = new ex.Table(
  name: "employees",
  primaryKey: "id",
  columns: {
    "name" => ex.ColumnType.STRING
  }
);

api.get("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let result = MutJson [];
  let var i = 0;
  for employee in db.list() {
    result.setAt(i, employee);
    i = i + 1;
  }
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(result)
  };
});


api.get("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let employee = db.get(request.vars.get("id"));
  return cloud.ApiResponse {
    status: 200,
    body: Json.stringify(employee)
  };
});

api.post("/employees", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
   if let body = request.body {
    let employeeData = Json.parse(body);
    let id = "{counter.inc()}";
    db.insert(id, employeeData);
    return cloud.ApiResponse {
      status: 201,
      body: id
    };
   }
});

api.put("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  if let body = request.body {
    let employeeData = Json.parse(body);
    let id = request.vars.get("id");
    db.update(id, employeeData);
    return cloud.ApiResponse {
      status: 200,
      body: Json.stringify(employeeData)
    };
  }
});

api.delete("/employees/:id", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
  let id = request.vars.get("id");
  db.delete(id);
  return cloud.ApiResponse {
    status: 204
  };
});

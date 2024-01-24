bring cloud;
bring http;

let api = new cloud.Api();
api.post("/greet/:name", inflight (req) => {
  let name = req.vars.get("name");
  let var message = "Hello, {name}!";
  if let _ = req.query.tryGet("all-caps") {
    message = message.uppercase();
  }
  return {
    status: 200,
    body: message,
  };
});

test "POST /greet/:name" {
  let res = http.post("{api.url}/greet/world", body: "Hello, world!");
  assert(res.status == 200);
  assert(res.body == "Hello, world!");
}

test "POST /greet/:name?all-caps" {
  let res = http.post("{api.url}/greet/world?all-caps", body: "Hello, world!");
  assert(res.status == 200);
  assert(res.body == "HELLO, WORLD!");
}

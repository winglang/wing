async handle(req) {
  const { users_table } = this;
  const body = (req.body ?? Object.freeze({"name":"","age":"","id":""}));
  if (((((body)["name"] === "") || ((body)["age"] === "")) || ((body)["id"] === ""))) {
    return {
    "body": Object.freeze({"error":"incomplete details"}),
    "status": 500,}
    ;
  }
  (await users_table.insert(body));
  return {
  "body": Object.freeze({"user":(body)["id"]}),
  "status": 200,}
  ;
}

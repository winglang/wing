async handle(req) {
  const { users_table } = this;
  return {
  "body": Object.freeze({"users":(await users_table.list())}),
  "status": 200,}
  ;
}

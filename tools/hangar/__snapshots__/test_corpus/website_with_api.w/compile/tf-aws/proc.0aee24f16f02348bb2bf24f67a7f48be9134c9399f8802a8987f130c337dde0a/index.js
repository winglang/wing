async handle(req) {
  const { table } = this;
  return {
  "body": Object.freeze({"users":(await table.list())}),
  "status": 200,}
  ;
}

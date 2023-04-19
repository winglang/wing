async handle(req) {
  const {  } = this;
  const vars = (req.vars ?? Object.freeze({"name":""}));
  return {
  "body": Object.freeze({"user":(vars)["name"]}),
  "status": 200,}
  ;
}

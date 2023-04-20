async handle(request) {
  const { counter } = this;
  const count = (await counter.inc());
  const bodyResponse = Object.freeze({"count":count});
  const resp = {
  "body": bodyResponse,
  "status": 200,}
  ;
  return resp;
}

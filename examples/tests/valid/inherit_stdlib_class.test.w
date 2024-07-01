bring cloud;

class AnApi extends cloud.Api {}

let api = new AnApi();
api.get("/", inflight () => {
  return  {
    status: 200
  };
});

bring http;
test "can inherit std lib preflight class" {
  let response = http.get("{api.url}/");
  assert(response.status == 200);
}
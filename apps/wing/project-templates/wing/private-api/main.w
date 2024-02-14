bring cloud;
bring http;

let api = new cloud.Api();
api.get("/", inflight () => {
  return {
    status: 200,
    body: "hello, from within the VPC!"
  };
});


let url = api.url;

new cloud.Function(inflight () => {
  let res = http.get("{url}/");
  log("status = {res.status}");
  log("body = {res.body}");
  return res.body;
}) as "consumer";
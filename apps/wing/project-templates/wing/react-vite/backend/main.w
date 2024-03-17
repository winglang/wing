bring cloud;
bring expect;
bring vite;
bring http;
bring "./broadcaster.w" as b;

let my_broadcaster = new b.Broadcaster() as "Broadcaster";
let api = new cloud.Api(cors: true);
let counter = new cloud.Counter();

let my_vite = new vite.Vite(
  root: "../frontend",
  publicEnv: {
    TITLE: "Wing + Vite + React",
    API_URL: api.url,
    WS_URL: my_broadcaster.url
  }
) as "Vite"; 

api.get("/counter", inflight () => {
  return {
    body: "{counter.peek()}"
  };
});

api.post("/counter", inflight () => {
  let prev = counter.inc();
  my_broadcaster.broadcast("refresh");
  return {
    body: "{prev + 1}"
  };
});

test "api counter increment and get" {
  log("counter initial value: {counter.peek()}");
  assert(counter.peek() == 0);
  http.post(api.url + "/counter");
  let res = http.get(api.url + "/counter");
  log("counter value after increment: {res.body}");
  assert(res.body == "1");
}

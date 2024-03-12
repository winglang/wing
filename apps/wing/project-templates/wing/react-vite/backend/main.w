bring cloud;
bring expect;
bring vite;
bring "./broadcaster.w" as broadcaster;

let my_broadcaster = new broadcaster.Broadcaster() as "Broadcaster";
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

test "broadcast counter increment" {
  counter.inc();
  my_broadcaster.broadcast("refresh");
}

/*\
skip:
  - win32
  - darwin
\*/

bring cloud;
bring redis;

let r = new redis.Redis();
let r2 = new redis.Redis() as "r2";

new cloud.Function(inflight (s:str):str => {
  // Using raw client
  let connection = r.raw_client();
  connection.set("wing", "does redis");
  let value = connection.get("wing");
  assert(value == "does redis");
  
  // Using API
  r2.set("wing", "does redis again");
  let value2 = r2.get("wing");
  assert(value2 == "does redis again");
}) as "test";
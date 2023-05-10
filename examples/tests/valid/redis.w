/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring cloud;
bring redis;

let r = new redis.Redis();
let r2 = new redis.Redis() as "r2";

test "test" {
  // Using raw client
  let connection = r.rawClient();
  connection.set("wing", "does redis");
  let value = connection.get("wing");
  assert(value == "does redis");
  
  // Using API
  r2.set("wing", "does redis again");
  let value2 = r2.get("wing");
  assert(value2 == "does redis again");
}

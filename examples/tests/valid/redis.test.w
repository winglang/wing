/*\
skipPlatforms:
  - win32
  - darwin
\*/

bring cloud;
bring util;
bring ex;

let r = new ex.Redis();
let r2 = new ex.Redis() as "r2";

let queue = new cloud.Queue();

queue.setConsumer(inflight (message: str) => {
  r.set("hello", message);
}, timeout: 3s);

test "testing Redis" {
  // Using API
  r2.set("wing", "does redis again");
  let value2 = r2.get("wing");
  assert(value2 == "does redis again");

  //With waitUntil
  queue.push("world!");

  util.waitUntil((): bool => {
    return r.get("hello") != nil;
  });

  assert("world!" == "${r.get("hello")}");
}

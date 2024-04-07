bring cloud;

let logs = new cloud.Bucket();
let fileName = "test.log";

new cloud.OnDeploy(inflight () => {
  logs.put(fileName, "");
});

test "get file" {
  assert(logs.tryGet(fileName) == "");
}
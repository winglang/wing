bring util;
bring expect;

let rootId = nodeof(this).app.node.id;

// this env var does not exist within the console and within inflight scopes
let envRootId = util.tryEnv("WING_ROOT_ID") ?? "root";

expect.equal(rootId, envRootId);


test "root id" {
  // an inflight test is added since it's looked for by path and we need to verify its working
  expect.equal(rootId, envRootId);
}
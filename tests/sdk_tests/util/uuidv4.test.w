bring util;

let preflightData = util.uuidv4();

class JSHelperInflight {
  extern "./uuidv4-helper.js" pub static inflight validateUUIDv4(uuidv4: str): bool;
}

test "inflight uuidv4" {
  let data = util.uuidv4();
  assert(JSHelperInflight.validateUUIDv4(data) == true);
  assert(JSHelperInflight.validateUUIDv4(preflightData) == true);
}
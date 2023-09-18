bring util;

class JSHelper { 
  extern "./uuidv4-helper.js" pub static validateUUIDv4(uuidv4: str): bool;
}

let data = util.uuidv4();
assert(JSHelper.validateUUIDv4(data) == true);

class JSHelperInflight {
  extern "./uuidv4-helper.js" pub static inflight validateUUIDv4(uuidv4: str): bool;
}

test "inflight uuidv4" {
  let data = util.uuidv4();
  assert(JSHelperInflight.validateUUIDv4(data) == true);
}
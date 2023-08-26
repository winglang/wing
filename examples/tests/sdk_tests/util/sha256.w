bring util;

let data = util.sha256("winglang");
assert(data == "9796cc32487d74729dad64ec6090f6fb9b9f577dc61a40f9f58efa437acbd8ed");

test "inflight sha256" {
  let data = util.sha256("winglang");
  assert(data == "9796cc32487d74729dad64ec6090f6fb9b9f577dc61a40f9f58efa437acbd8ed");
}
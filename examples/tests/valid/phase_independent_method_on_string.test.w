bring cloud;

let api = new cloud.Api();
log(api.url);
assert(!api.url.contains("http"));

test "pahse independent method on string evaled inflight" {
  // Make sure api.url isn't a the token but evaled inflight
  let splits = api.url.split(":");
  assert(splits.length == 3);
  assert(splits.at(0) == "http");
}
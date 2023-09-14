/*\
env:
  MY_VAR: my value
\*/
bring util;

let RANDOM = "RANDOM123412121212kjhkjskdjkj";
let NIL = "<<NIL>>";

// --env--
assert(util.env("PATH").length > 0);

// won't work, since the meta comments aren't native to the cli command, but to hangar only
if (util.tryEnv("MY_VAR") != nil) {
  assert(util.env("MY_VAR") == "my value");
}
let var failed = false;
try { util.env(RANDOM); }
catch { failed = true; }
assert(failed);

// --tryEnv--
let no_value = util.tryEnv(RANDOM) ?? NIL;
assert(no_value == NIL);

//-----------------------------------------------------

test "use util from inflight" {
  // --inflight env--
  assert(util.env("WING_TARGET").length > 0);
  
  // --inflight tryEnv--
  let noValue = util.Util.tryEnv(RANDOM) ?? NIL;
  assert(noValue == NIL);
}
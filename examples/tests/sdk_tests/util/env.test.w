bring util;

let RANDOM = "RANDOM123412121212kjhkjskdjkj";
let NIL = "<<NIL>>";

/**
 * env()
 */
assert(util.env("PATH").length > 0);
assert(util.env("APP_NAME") == "foo");
assert(util.env("BASE_URL") == "https://www.winglang.io");
assert(util.env("API_BASE_URL") == "https://www.winglang.io/api");
assert(util.env("DB_NAME") == "foo_db");
assert(util.env("MAIL_DOMAIN") == "mail.foo.com");

// Won't work, since the meta comments aren't native to the cli command, but to hangar only
if (util.tryEnv("MY_VAR") != nil) {
  assert(util.env("MY_VAR") == "my value");
}
let var failed = false;
try { util.env(RANDOM); }
catch { failed = true; }
assert(failed);

/**
 * tryEnv()
 */
let no_value = util.tryEnv(RANDOM) ?? NIL;
assert(no_value == NIL);
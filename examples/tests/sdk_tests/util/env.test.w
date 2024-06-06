bring util;

let NOT_ACTUAL_ENV = "__NOT_ACTUAL_ENV_SHOULD_FAIL__";

/**
 * env()
 */
assert(util.env("PATH").length > 0);
assert(util.env("APP_NAME") == "foo");
assert(util.env("BASE_URL") == "https://www.winglang.io");
assert(util.env("API_BASE_URL") == "https://www.winglang.io/api");
assert(util.env("DB_NAME") == "foo_db");
assert(util.env("MAIL_DOMAIN") == "mail.foo.com");

try { util.env(NOT_ACTUAL_ENV); assert(false); }
catch { }

/**
 * tryEnv()
 */
let no_value = util.tryEnv(NOT_ACTUAL_ENV);
assert(no_value == nil);

/**
 * setEnv()
 */
 util.setEnv("FOO", "bar");
 assert(util.env("FOO") == "bar");

test "use util from inflight" {
  // --inflight env--
  assert(util.env("WING_TARGET").length > 0);

  // --inflight tryEnv--
  let noValue = util.Util.tryEnv(NOT_ACTUAL_ENV);
  assert(noValue == nil);
 
// "set env from inflight" 
  util.setEnv("FOO", "baz");
  assert(util.env("FOO") != "baz");
}

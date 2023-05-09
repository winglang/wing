bring util;

let random_name = "RANDOM123412121212kjhkjskdjkj";

assert(util.env("PATH").length > 0);

let var failed = false;
try {
  util.env(random_name);
} catch {
  failed = true;
}

assert(failed);

// TODO: this is not supported yet (P1)
/*
new cloud.Function(inflight () => {

  let no_value = util.Util.try_env(random_name) ?? "NO_VALUE";

  assert(util.Util.env("PATH").length > 0);
  assert(no_value == "NO_VALUE");

}) as "test";
*/

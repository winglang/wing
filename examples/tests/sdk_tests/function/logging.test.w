bring cloud;

class Util {
  extern "./logging.js" pub static inflight logging(): void;
}

let f1 = new cloud.Function(inflight () => {
  log("log inside f1");
}) as "f1";

let f2 = new cloud.Function(inflight () => {
  f1.invoke("");
  log("log inside f2");
  f1.invoke("");
}) as "f2";

/**
should log: 

hello world
log inside f1
log inside f2
log inside f1
hello world
log inside f1
log inside f2
log inside f1
*/

test "logging" {
  Util.logging();
  f2.invoke("");
  Util.logging();
  f2.invoke("");
}

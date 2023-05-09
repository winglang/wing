bring cloud;

let handler = inflight () => {
  class R {
    init() {}
  }
//^ Cannot define a preflight class in inflight scope
  log("hello world!");
};
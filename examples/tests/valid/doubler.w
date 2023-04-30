bring cloud;

class Doubler {
  func: cloud.IFunctionHandler;
  init(func: cloud.IFunctionHandler) {
    this.func = func;
  }
  inflight invoke(message: str): str {
    this.func.handle(message);
    this.func.handle(message);
  }
}

let fn = new Doubler(inflight (m: str): str => {
  return "Hello ${m}!";
});

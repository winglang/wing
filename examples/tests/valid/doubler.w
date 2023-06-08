bring cloud;

// check that we can capture an interface and call its methods inflight

class Doubler {
  func: cloud.IFunctionHandler;
  init(func: cloud.IFunctionHandler) {
    this.func = func;
  }
  inflight invoke(message: str) -> str {
    this.func.handle(message);
    this.func.handle(message);
  }
}

let fn = new Doubler(inflight (m: str) -> str {
  return "Hello ${m}!";
});

// ----------

// check that we can capture an inflight function and call it inflight

class Doubler2 {
  // TODO: make into a static method - see https://github.com/winglang/wing/issues/2583
  makeFunc(handler: inflight (num) -> num) -> cloud.Function {
    return new cloud.Function(inflight (x: str) -> str {
      let xStr = num.fromStr(x);
      let y = handler(xStr);
      let z = handler(y);
      return Json.stringify(Json z);
    });
  }
}

let doubler2 = new Doubler2();
let f = doubler2.makeFunc(inflight (x: num) -> num {
  return x * 2;
});

test "f(2) == 8" {
  let result = f.invoke("2");
  assert(result == "8");
}

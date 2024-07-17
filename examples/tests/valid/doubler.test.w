bring cloud;

// check that we can capture an interface and call its methods inflight

class Doubler {
  func: cloud.IFunctionHandler;
  new(func: cloud.IFunctionHandler) {
    this.func = func;
  }
  inflight invoke(message: Json): Json {
    let res1 = this.func.handle(message) ?? "";
    let res2 = this.func.handle(res1) ?? "";
    return res2;
  }
}

let fn = new Doubler(inflight (m: Json?): Json => {
  return "Hello {m ?? "nil"}!";
});

// ----------

// check that we can capture an inflight function and call it inflight

class Doubler2 {
  pub static makeFunc(handler: inflight (num): num): cloud.Function {
    return new cloud.Function(inflight (x: Json?): Json => {
      let xStr = num.fromJson(x ?? "NaN");
      let y = handler(xStr);
      let z = handler(y);
      return z;
    });
  }
}

let f = Doubler2.makeFunc(inflight (x: num): num => {
  return x * 2;
});

test "f(2) == 8" {
  let result = f.invoke(2);
  assert(result == 8);
}

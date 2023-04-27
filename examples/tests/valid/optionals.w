let x: num? = 4;
assert(x? == true);
assert(!x? == false);
// TODO: add a `x? == false` case when we implement some way to null initialize an optional (https://github.com/winglang/wing/pull/1495)

assert(x ?? 5 == 4);
// TODO: add test for optional is nothing case (see https://github.com/winglang/wing/pull/1495)

let y: num = x ?? 5;
assert(y == 4);

inflight class Super {
  name: str;
  init() { this.name = "Super"; }
}
inflight class Sub extends Super {
  init() { this.name = "Sub"; }
}
inflight class Sub1 extends Super {
  init() { this.name = "Sub"; }
}

let optional_sup: Super? = new Super();
let s = optional_sup ?? new Sub();
assert(s.name == "Super");

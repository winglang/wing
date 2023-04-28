let f = (x: num) => {
  // do something
};

let x: num? = 1;

f(x);
//^ error: x is num? but f expects num

let y = true;
if y? {
 // ^ y isn't optional
}

let z = y ?? 1;
//      ^ y isn't optional

let w: str = x ?? 3;
//  ^ trying to assign an unwrapped number to a string

x ?? "hello";
//  default type (str) must be same as wrapped type (num)

inflight class Super {
  init() {}
}
inflight class Sub1 extends Super {
  init() {}
}
inflight class Sub2 extends Super {
  init() {}
}

let optional_sub1: Sub1? = new Sub1();
optional_sub1 ?? new Sub2();
//               ^ error: Sub2 is not a subtype of Sub1
optional_sub1 ?? new Super();
//               ^ error: Super? is not a subtype of Sub1

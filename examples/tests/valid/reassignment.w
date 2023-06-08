let var x = 5;
assert(x == 5);

x = x + 1;
assert(x == 6);

class R {
  var f: num;
  f1: num;
  init() {
    // Initialize fields in `init` but in an inner scope to make sure 
    // we treat the special case of `this` access from init correctly at all scope levels
    if true {
      this.f = 1;
      this.f1 = 0; // Access non-reassignable field from constructor is valid
    }
  }
  
  inc() {
    this.f = this.f + 1;
  }
}

let r = new R();
r.inc();
assert(r.f == 2);

let f = (var arg: num) -> num {
  arg = 0;
  return arg;
};

let y = 1;
assert(f(y) == 0);
assert(y == 1); // y is not modified, since Wing functions are pass-by-value

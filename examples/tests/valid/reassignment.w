let var x = 5;
assert(x == 5);

x = x + 1;
assert(x == 6);

resource R {
  var f: num;
  init() {
    this.f = 1;
  }
  
  inc() {
    this.f = this.f + 1;
  }
}

let r = new R();
r.inc();
assert(r.f == 2);

let f = (var arg: num):num => {
  arg = 0;
  return arg;
}

assert(f(1) == 0);
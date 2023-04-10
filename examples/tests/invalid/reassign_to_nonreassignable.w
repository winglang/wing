// Assign to non-reassignable var
let x = 5;
x = x + 1;

// Assign to non-reassignable field
resource R {
  f: num;
  inflight_f: num;
  
  init() {
    this.f = 1;
  }

  inflight init() {
    this.inflight_f = 1;
  }
  
  inc() {
    this.f = this.f + 1;
  }

  inflight inflight_inc() {
    this.inflight_f = this.inflight_f + 1;
  }
}

// Assign to non-reassignable arg
let f = (arg: num):num => {
  arg = 0;
  return arg;
}

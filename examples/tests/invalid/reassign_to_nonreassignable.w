// Assign to non-reassignable var
let x = 5;
x = x + 1;

class InnerR {
  inflight inner: num;
  init() {}
  inflight init() {
    this.inner = 1;
  }
}

// Assign to non-reassignable field
class R {
  f: num;
  inner_r: InnerR;
  inflight inflight_f: num;
  
  init() {
    this.f = 1;
    this.inner_r = new InnerR();
  }

  inflight init() {
    this.inflight_f = 1;
  }
  
  inc() {
    this.f = this.f + 1;
  //^^^^^^^^^^^^^^^^^^^^ Variable this.f is not reassignable
    this.inner_r.inner = 2;
  //^^^^^^^^^^^^^^^^^^^^^^^ Variable this.inner_r.inner is not reassignable
}

  inflight inflight_inc() {
    this.inflight_f = this.inflight_f + 1;
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Variable this.inflight_f is not reassignable
  }
}

// Assign to non-reassignable arg
let f = (arg: num):num => {
  arg = 0;
//^^^^^^^^ Variable arg is not reassignable
  return arg;
};

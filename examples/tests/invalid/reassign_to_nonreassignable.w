// Assign to non-reassignable var
let x = 5;
x = x + 1;

class InnerR {
  inflight inner: num;
  inflight init() {
    this.inner = 1;
  }
}

// Assign to non-reassignable field
class R {
  f: num;
  innerR: InnerR;
  inflight inflightF: num;
  
  init() {
    this.f = 1;
    this.innerR = new InnerR();
  }

  inflight init() {
    this.inflightF = 1;
  }
  
  inc() {
    this.f = this.f + 1;
  //^^^^^^^^^^^^^^^^^^^^ Variable this.f is not reassignable
    this.innerR.inner = 2;
  //^^^^^^^^^^^^^^^^^^^^^^^ Variable this.innerR.inner is not reassignable
}

  inflight inflightInc() {
    this.inflightF = this.inflightF + 1;
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Variable this.inflightF is not reassignable
  }
}

// Assign to non-reassignable arg
let f = (arg: num):num => {
  arg = 0;
//^^^^^^^^ Variable arg is not reassignable
  return arg;
};

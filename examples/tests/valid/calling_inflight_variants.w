bring cloud;

class Foo {
  inflight1: inflight (): num;
  init() {
    // here is an inflight function created during preflight
    this.inflight1 = inflight (): num => {
      return 1;
    };
  }

  inflight inflight2: inflight (): num;
  inflight init() {
    // here is an inflight function created during inflight
    this.inflight2 = inflight (): num => {
      return 2;
    };
  }

  inflight makeFn(x: bool): inflight (): num {
    if x == true {
      return this.inflight1;
    } else {
      return this.inflight2;
    }
  }

  inflight callFn(x: bool): num {
    // partialFn could be an inflight function created during preflight or inflight,
    // so we have to code-generate this to work for both cases
    let partialFn = this.makeFn(x);
    return partialFn();
  }
}

let foo = new Foo();

test "calling different types of inflights" {
  assert(foo.callFn(true) == 1);
  assert(foo.callFn(false) == 2);
}

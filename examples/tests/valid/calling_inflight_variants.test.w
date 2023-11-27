class Foo {
  inflight1: inflight (): num;
  new() {
    // here is an inflight function created during preflight
    this.inflight1 = inflight (): num => {
      return 1;
    };
  }

  inflight inflight2: inflight (): num;
  inflight new() {
    // here is an inflight function created during inflight
    this.inflight2 = (): num => {
      return 2;
    };

    // just call me
    let ret = this.inflight2();
    assert(ret == 2);
  }

  inflight makeFn(x: bool): inflight (): num {
    if x == true {
      return this.inflight1;
    } else {
      return this.inflight2;
    }
  }

  pub inflight callFn(x: bool): num {
    // partialFn could be an inflight function created during preflight or inflight,
    // so we have to code-generate this to work for both cases
    let partialFn = this.makeFn(x);
    return partialFn();
  }

  pub inflight callFn2(): void {
    // now we call inflight1 and inflight2 directly which know they are handler classes
    let one = this.inflight1();
    let two = this.inflight2();
    assert(one == 1);
    assert(two == 2);
  }
}

let foo = new Foo();

test "calling different types of inflights" {
  assert(foo.callFn(true) == 1);
  assert(foo.callFn(false) == 2);
  foo.callFn2();
}

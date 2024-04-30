bring sim;

inflight class CounterBackend impl sim.IResource {
  var counter: num;

  new() {
    this.counter = 0;
  }

  pub onStart() {
    // startup code
  }

  pub onStop() {
    // shutdown code
  }

  pub inc(n: num?): num {
    let p = this.counter;
    this.counter += (n ?? 1);
    return p;
  }

  pub peek(): num {
    return this.counter;
  }
}

class Counter {
  backend: sim.Resource;

  new() {
    // this is a "backend factory". it returns an inflight class that implements the
    // resource.
    let factory = inflight (): sim.IResource => {
      return new CounterBackend();
    };

    this.backend = new sim.Resource(factory);
  }

  pub inflight inc(n: num?): num {
    let response = this.backend.call("inc", [Json (n ?? 1)]);
    return num.fromJson(response);
  }

  pub inflight peek(): num {
    let response = this.backend.call("peek");
    return num.fromJson(response);
  }
}

let c = new Counter();

test "Counter" {
  assert(c.inc() == 0);
  assert(c.inc() == 1);
  assert(c.inc(5) == 2);
  assert(c.peek() == 7);
}

// check that resources can be extended

class DoubleCounter extends Counter {
  pub inflight inc(n: num?): num {
    return super.inc((n ?? 1) * 2);
  }
}

let dc = new DoubleCounter();

test "DoubleCounter" {
  assert(dc.inc() == 0);
  assert(dc.inc() == 2);
  assert(dc.inc(5) == 4);
  assert(dc.peek() == 14);
}

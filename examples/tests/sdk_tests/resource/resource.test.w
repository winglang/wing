bring cloud;
bring sim;
bring util;

inflight class CounterBackend impl sim.IResource {
  var counter: num;

  new(ctx: sim.IResourceContext) {
    // startup code
    this.counter = 0;
    ctx.resolveToken("startTime", "2023-10-16T20:47:39.511Z");
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
  pub startTime: str;

  new() {
    // this is a "backend factory". it returns an inflight class that implements the
    // resource.
    let factory = inflight (ctx: sim.IResourceContext): sim.IResource => {
      return new CounterBackend(ctx);
    };

    this.backend = new sim.Resource(factory);
    this.startTime = this.backend.createToken("startTime");
  }

  pub inflight inc(n: num?): num {
    let response = this.backend.call("inc", [Json (n ?? 1)]);
    return num.fromJson(response);
  }

  pub inflight peek(): num {
    let response = this.backend.call("peek");
    return num.fromJson(response);
  }

  pub inflight getStartTime(): str {
    return this.startTime;
  }
}

let c = new Counter();

// Only run these tests in the simulator
if util.env("WING_TARGET") == "sim" {
  test "Counter" {
    assert(c.inc() == 0);
    assert(c.inc() == 1);
    assert(c.inc(5) == 2);
    assert(c.peek() == 7);
    assert(c.getStartTime() == "2023-10-16T20:47:39.511Z");
    assert(c.startTime == "2023-10-16T20:47:39.511Z");
  }
}

// check that resources can be extended

class DoubleCounter extends Counter {
  pub inflight inc(n: num?): num {
    return super.inc((n ?? 1) * 2);
  }
}

let dc = new DoubleCounter();

if util.env("WING_TARGET") == "sim" {
  test "DoubleCounter" {
    assert(dc.inc() == 0);
    assert(dc.inc() == 2);
    assert(dc.inc(5) == 4);
    assert(dc.peek() == 14);
  }
}

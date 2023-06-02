bring cloud;

interface IGoo {
  inflight handle(): num;
}

inflight class NotGoo {
  handle(): num {
    return 123;
  }
}

test "structure interface types for 'handle'" {
  inflight class YesGoo impl IGoo {
    handle(): num {
      return 456;
    }

    anotherMethod() {
      log("also fine");
    }
  }

  // this works
  let y: IGoo = new YesGoo();
  assert(y.handle() == 456);

  // this works too because if the interface has a `handle` method we use structural typing
  let x: IGoo = new NotGoo();
  assert(x.handle() == 123);
}


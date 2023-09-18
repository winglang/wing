bring cloud;

class Foo {
  init() {
    new cloud.Function(inflight () => {
      this.bar();
    });
  }

  inflight bar() {

  }
}

new Foo();

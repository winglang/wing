bring cloud;

class Foo {
  new() {
    new cloud.Function(inflight () => {
      this.bar();
    });
  }

  inflight bar() {

  }
}

new Foo();

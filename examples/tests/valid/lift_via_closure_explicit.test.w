bring cloud;

class MyClosure {
  q: cloud.Queue;
  new() {
    this.q = new cloud.Queue();
  }

  inflight handle() {
    this.q.push("hello");
  }
}

let fn = new MyClosure();

test "test" {
  fn();
}

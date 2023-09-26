// used by:
// - bring_local.test.w

bring "./subdir/empty.w" as file3;
bring math;
bring cloud;

class Util {}

class Store {
  b: cloud.Bucket;
  init() {
    this.b = new cloud.Bucket();

    let prefill = new cloud.OnDeploy(inflight () => {
      this.b.put("data.txt", "<empty>");
    });
  }
  pub inflight store(data: str) {
    this.b.put("data.txt", data);
  }
}

enum Color {
  RED,
  GREEN,
  BLUE,
}

struct Point {
  x: num;
  y: num;
}

interface Shape {
  area(): num;
}

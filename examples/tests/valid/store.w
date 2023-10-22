// used by:
// - bring_local.test.w

bring "./subdir/empty.w" as file3;
bring math;
bring cloud;

pub class Util {}

pub class Store {
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

pub enum Color {
  RED,
  GREEN,
  BLUE,
}

pub struct Point {
  x: num;
  y: num;
}

pub interface Shape {
  area(): num;
}

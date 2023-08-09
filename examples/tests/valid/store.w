bring "./subdir/empty.w" as file3;
bring math;

bring cloud;

class Store {
  b: cloud.Bucket;
  init() {
    this.b = new cloud.Bucket();
  }
  inflight store(data: str) {
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

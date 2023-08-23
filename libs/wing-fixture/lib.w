bring cloud;

class Store {
  data: cloud.Bucket;
  init() {
    this.data = new cloud.Bucket();
  }

  inflight set(message: str) {
    this.data.put("data.txt", message);
  }
}

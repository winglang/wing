bring cloud;
bring "./subdir/util.w" as myutil;

class Store {
  data: cloud.Bucket;
  init() {
    this.data = new cloud.Bucket();
  }

  inflight set(message: str) {
    this.data.put("data.txt", myutil.double(message));
  }
}

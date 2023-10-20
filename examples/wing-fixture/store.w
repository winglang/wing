bring cloud;
bring "./subdir/util.w" as myutil;

pub class Store {
  data: cloud.Bucket;
  init() {
    this.data = new cloud.Bucket();
  }

  extern "./util.js" pub static makeKey(name: str): str;
  extern "./util.js" pub static inflight makeKeyInflight(name: str): str;

  inflight set(message: str) {
    this.data.put("data.txt", myutil.double(message));
  }
}

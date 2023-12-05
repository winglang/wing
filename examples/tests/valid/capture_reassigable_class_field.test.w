bring cloud;
bring util;

class KeyValueStore {
  bucket: cloud.Bucket;
  var onUpdateCallback : inflight (str): void;
  new() {
    this.bucket = new cloud.Bucket();
    this.onUpdateCallback = inflight (k: str) => {};
  }

  pub onUpdate(fn: inflight (str):void){
    this.onUpdateCallback = fn;
  }

  pub inflight get(key: str): Json {
    this.onUpdateCallback(key);
    return this.bucket.getJson(key);
  }
  pub inflight set(key: str, value: Json): void {
    this.bucket.putJson(key, value);
  }
}

let kv = new KeyValueStore();
let counter = new cloud.Counter() as "sasa";
kv.onUpdate(inflight (key: str): void => {
  counter.inc(1, key);
});

test "main" {
  kv.set("k", Json {
    value: "v"
  });
  kv.set("k2", Json {
    value: "v"
  });
  kv.get("k");
  kv.get("k");
  kv.get("k2");

  assert(util.waitUntil((): bool => {
    return counter.peek("k") == 2;
  }));

  assert(util.waitUntil((): bool => {
    return counter.peek("k2") == 1;
  }));
}

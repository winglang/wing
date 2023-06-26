bring cloud;
class KeyValueStore {
  bucket: cloud.Bucket;
  var onUpdateCallback : inflight (str): void;
  init(store: cloud.Bucket) {
    this.bucket = store;
    this.onUpdateCallback = inflight (k: str) => {};
  }

  onUpdate(fn: inflight (str):void){
    this.onUpdateCallback = fn;
  }

  inflight get(key: str): Json {
    return this.bucket.getJson(key);
  }
  inflight set(key: str, value: Json): void {
    this.onUpdateCallback(key);
    this.bucket.putJson(key, value);
  }
}

let kv = new KeyValueStore(new cloud.Bucket());
let counter = new cloud.Counter();
kv.onUpdate(inflight (key: str): void => {
  counter.inc(1, key);
});

test "main" {
  kv.set("k", Json { 
    value: "v" 
  });
  kv.get("k");
  kv.get("k");
  kv.get("k2");
  assert(counter.peek("k") == 2);
  assert(counter.peek("k2") == 1);
}

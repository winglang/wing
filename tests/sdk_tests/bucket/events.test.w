bring cloud;
bring util;

enum Source {
  anyEvent,
  onEvent
}

let b = new cloud.Bucket();
let idsCounter = new cloud.Counter();
let logs = new cloud.Bucket() as "LogHistory";

let logHistory = inflight (key: str, operation: str, source: Source) => {
  logs.putJson("{idsCounter.inc()}", Json { key: key, operation: operation, source: "{source}"  });
};



b.onDelete(inflight (key: str) => {
  logHistory(key, "OnDelete()", Source.anyEvent);
});

b.onUpdate(inflight (key: str) => {
  logHistory(key, "OnUpdate()", Source.anyEvent);
});

b.onCreate(inflight (key: str) => {
  logHistory(key, "OnCreate()", Source.anyEvent);
});

b.onEvent(inflight (key: str, event: cloud.BucketEventType) => { 
  logHistory(key, "{event}()", Source.onEvent);
});

struct CheckHitCountOptions {
  key: str;
  type: str;
  source: Source;
  count: num;
}

let checkHitCount = inflight (opts: CheckHitCountOptions): void => {
  util.waitUntil(inflight () => {
    let var count = 0;

    for u in logs.list() {
      let data = logs.getJson(u);
      if (data.get("key") == opts.key && data.get("operation") == opts.type && data.get("source") == "{opts.source}") {
        count = count + 1;
      }
    }
    return count == opts.count;  
  }, timeout: 2m, interval: 10s);
};


new std.Test(inflight () => {  
  b.put("a", "1");
  b.put("b", "1");
  b.put("c", "1");
  b.put("b", "100");
  b.delete("c");

// https://github.com/winglang/wing/issues/2724
  if (util.env("WING_TARGET") != "tf-aws") {
    // assert that onCreate events about the "a", "b", and "c" objects were each produced exactly 1 time
    checkHitCount(key: "a", type: "OnCreate()", source: Source.anyEvent, count: 1);
    checkHitCount(key: "b", type: "OnCreate()", source: Source.anyEvent, count: 1);
    checkHitCount(key: "c", type: "OnCreate()", source: Source.anyEvent, count: 1);

    checkHitCount(key: "a", type: "OnCreate()", source: Source.onEvent, count: 1);
    checkHitCount(key: "b", type: "OnCreate()", source:  Source.onEvent, count: 1);
    checkHitCount(key: "c", type: "OnCreate()", source:  Source.onEvent, count: 1);

    checkHitCount(key: "b", type: "OnUpdate()", source: Source.anyEvent, count: 1);
    checkHitCount(key: "c", type: "OnDelete()", source: Source.anyEvent, count: 1);

    checkHitCount(key: "b", type: "OnUpdate()", source: Source.onEvent, count: 1);
    checkHitCount(key: "c", type: "OnDelete()", source: Source.onEvent, count: 1);
  }

}, timeout: 8m) as "hitCount is incremented according to the bucket event";

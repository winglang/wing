bring cloud;
bring ex;
bring util;

enum Source {
  anyEvent,
  onEvent
}

let b = new cloud.Bucket();
let idsCounter = new cloud.Counter();
let table = new ex.Table(
  name: "key-history",
  primaryKey: "_id",
  columns: {
    "_id" => ex.ColumnType.STRING,
    "key" => ex.ColumnType.STRING,
    "operation" => ex.ColumnType.STRING,
    "source" => ex.ColumnType.STRING,
  }
);



let logHistory = inflight (key: str, operation: str, source: Source) => {
  table.insert("{idsCounter.inc()}", Json { key: key, operation: operation, source: "{source}"  });
};



b.onDelete(inflight (key: str) => {
  logHistory(key, "onDelete()", Source.anyEvent);
});

b.onUpdate(inflight (key: str) => {
  logHistory(key, "onUpdate()", Source.anyEvent);
});

b.onCreate(inflight (key: str) => {
  logHistory(key, "onCreate()", Source.anyEvent);
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
    for u in table.list() {
      if (u.get("key") == opts.key && u.get("operation") == opts.type && u.get("source") == "{opts.source}") {
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
    checkHitCount(key: "a", type: "onCreate()", source: Source.anyEvent, count: 1);
    checkHitCount(key: "b", type: "onCreate()", source: Source.anyEvent, count: 1);
    checkHitCount(key: "c", type: "onCreate()", source: Source.anyEvent, count: 1);

    checkHitCount(key: "a", type: "onCreate()", source: Source.onEvent, count: 1);
    checkHitCount(key: "b", type: "onCreate()", source:  Source.onEvent, count: 1);
    checkHitCount(key: "c", type: "onCreate()", source:  Source.onEvent, count: 1);

    checkHitCount(key: "b", type: "onUpdate()", source: Source.anyEvent, count: 1);
    checkHitCount(key: "c", type: "onDelete()", source: Source.anyEvent, count: 1);

    checkHitCount(key: "b", type: "onUpdate()", source: Source.onEvent, count: 1);
    checkHitCount(key: "c", type: "onDelete()", source: Source.onEvent, count: 1);
  }

}, timeout: 8m) as "hitCount is incremented according to the bucket event";

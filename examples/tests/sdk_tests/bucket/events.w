// !!! isn't working on aws due to https://github.com/winglang/wing/issues/2724
bring cloud;

enum Source {
  anyEvent,
  onEvent
}

let b = new cloud.Bucket();
let idsCounter = new cloud.Counter();
let table = new cloud.Table(
  name: "key-history",
  primaryKey: "_id",
  columns: {
    _id: cloud.ColumnType.STRING,
    key: cloud.ColumnType.STRING,
    operation: cloud.ColumnType.STRING,
    source: cloud.ColumnType.STRING,
  }
);

class Util {
  extern "../external/sleep.js" static inflight sleep(milli: num);
}


let logHistory = inflight (key: str, operation: str, source: Source) => {
  table.insert("${idsCounter.inc()}", Json { key: key, operation: operation, source: "${source}"  });
};



b.onDelete(inflight (key: str) => {
  logHistory(key, "DELETE", Source.anyEvent);
});

b.onUpdate(inflight (key: str) => {
  logHistory(key, "UPDATE", Source.anyEvent);
});

b.onCreate(inflight (key: str) => {
  logHistory(key, "CREATE", Source.anyEvent);
});

b.onEvent(inflight (key: str, event: cloud.BucketEventType) => { 
  logHistory(key, "${event}", Source.onEvent);
});

let wait = inflight (pred: inflight (): bool): bool => {
  let var i = 0;
    // waiting for up to 2 minutess, checking every 10 seconds
  while i < 12 { 
    if pred() {
      return true;
    } 
  
    Util.sleep(10000);

    i = i + 1;
  }

  return false;
};
  
struct CheckHitCountOptions {
  key: str;
  type: str;
  source: Source;
  count: num;
}


let checkHitCount = inflight (opts: CheckHitCountOptions): inflight (): bool => {
  return inflight (): bool => {
    let var count = 0;
    for u in table.list() {
      
      if (u.get("key") == opts.key && u.get("operation") == opts.type && u.get("source") == "${opts.source}") {
        count = count + 1;
      }
    }
    return count == opts.count;  
  };
};


new std.Test(inflight () => {  
  b.put("a", "1");
  b.put("b", "1");
  b.put("c", "1");
  b.put("b", "100");
  b.delete("c");

  // assert that onCreate events about the "a", "b", and "c" objects were each produced exactly 1 time
  assert(wait(checkHitCount(key: "a", type: "CREATE", source: Source.anyEvent, count: 1)));
  assert(wait(checkHitCount(key: "b", type: "CREATE", source: Source.anyEvent, count: 1)));
  assert(wait(checkHitCount(key: "c", type: "CREATE", source: Source.anyEvent, count: 1)));

  assert(wait(checkHitCount(key: "a", type: "CREATE", source: Source.onEvent, count: 1)));
  assert(wait(checkHitCount(key: "b", type: "CREATE", source:  Source.onEvent, count: 1)));
  assert(wait(checkHitCount(key: "c", type: "CREATE", source:  Source.onEvent, count: 1)));

  assert(wait(checkHitCount(key: "b", type: "UPDATE", source: Source.anyEvent, count: 1)));
  assert(wait(checkHitCount(key: "c", type: "DELETE", source: Source.anyEvent, count: 1)));

  assert(wait(checkHitCount(key: "b", type: "UPDATE", source: Source.onEvent, count: 1)));
  assert(wait(checkHitCount(key: "c", type: "DELETE", source: Source.onEvent, count: 1)));

}, std.TestProps { timeout: 8m }) as "hitCount is incremented according to the bucket event";

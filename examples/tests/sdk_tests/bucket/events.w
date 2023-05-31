bring cloud;

let b = new cloud.Bucket();
let idsCounter = new cloud.Counter();
let table = new cloud.Table(cloud.TableProps {
  name: "key-history",
  primaryKey: "_id",
  columns: {
    _id: cloud.ColumnType.STRING,
    key: cloud.ColumnType.STRING,
    operation: cloud.ColumnType.STRING,
    source: cloud.ColumnType.NUMBER,
    }
  });

  class Util {
    extern "../external/sleep.js" static inflight sleep(milli: num);
  }

// the source of onDelete, onUpdate, onCreate are marked as: 1, and for onEvent it's marked as source 2.
let logHistory = inflight (key: str, operation: str, source: num) => {
  table.insert("${idsCounter.inc()}", Json { key: key, operation: operation, source: source  });
};



b.onDelete(inflight (key: str) => {
  logHistory(key, "DELETE", 1);
});

b.onUpdate(inflight (key: str) => {
  logHistory(key, "UPDATE", 1);
});

b.onCreate(inflight (key: str) => {
  logHistory(key, "CREATE", 1);
});

b.onEvent(inflight (key: str, event: cloud.BucketEventType) => { 
  logHistory(key, "${event}", 2);
});


new cloud.Test(inflight () => {  
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

  let checkHitCount = inflight (key: str, operation: str, source: num, expectedVal: num): inflight (): bool => {
    return inflight (): bool => {
      let var count = 0;
      for u in table.list() {
        if (u.get("key") == key && u.get("operation") == operation && num.fromJson(u.get("source")) == source) {
          count = count + 1;
        }
      }
      return count == expectedVal;  
      };
    };
   
  b.put("a", "1");
  b.put("b", "1");
  b.put("c", "1");
  b.put("b", "100");
  b.delete("c");

  assert(wait(checkHitCount("a", "CREATE", 1,  1)));
  assert(wait(checkHitCount("b", "CREATE", 1,  1)));
  assert(wait(checkHitCount("c", "CREATE", 1,  1)));

  assert(wait(checkHitCount("a", "CREATE", 2,  1)));
  assert(wait(checkHitCount("b", "CREATE", 2,  1)));
  assert(wait(checkHitCount("c", "CREATE", 2,  1)));

  assert(wait(checkHitCount("b", "UPDATE", 1,  1)));
  assert(wait(checkHitCount("c", "DELETE", 1,  1)));

  assert(wait(checkHitCount("b", "UPDATE", 2,  1)));
  assert(wait(checkHitCount("c", "DELETE", 2,  1)));

}, cloud.TestProps { timeout: 8m }) as "hitCount is incremented according to the bucket event";

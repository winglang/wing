bring cloud;

let b = new cloud.Bucket();
let table = new cloud.Table(cloud.TableProps {
    name: "key-history",
    primaryKey: "key",
    columns: {
      key: cloud.ColumnType.STRING,
      hitCount: cloud.ColumnType.NUMBER,
    }
  });

  class Util {
    extern "../external/sleep.js" static inflight sleep(milli: num);
  }



let increaseHitCount = inflight (key: str) => {
    let row = table.get(key);
    try {
      let hitCount = num.fromJson(row.get("hitCount")) + 1;
      table.update(key, { hitCount: hitCount});
      log("update");
    } catch error {
      table.insert(key,  { hitCount: 1 });
      log("insert");
    }
    
};



b.onDelete(increaseHitCount);

b.onUpdate(increaseHitCount);

b.onCreate(increaseHitCount);

b.onEvent(inflight (key: str, event: cloud.BucketEventType) => { 
  increaseHitCount(event);
});


new cloud.Test(inflight () => {
    
    b.put("a", "1");
    b.put("b", "1");
    b.put("c", "1");
    b.put("b", "100");
    b.delete("c");

    let wait = inflight (pred: inflight (): bool): bool => {
    let var i = 0;
    // waiting for up to 2 minutess, checking every 10 seconds
    while i < 12 {
      if pred() {
        return true;
      } 
  
      Util.sleep(1000);
      i = i + 1;
    }

    return false;
  };

    let checkHitCount = inflight (key: str, expectedVal: num): inflight (): bool => {
        return inflight (): bool => {
          let row = table.get(key);
         try {
          let h = num.fromJson(row.get("hitCount"))  == expectedVal;
          return h;
        } catch error {
          return false;
        }
        };
    };
   
    assert(wait(checkHitCount("a", 1)));
    assert(wait(checkHitCount("b", 2)));
    assert(wait(checkHitCount("c", 1)));

    // new Predicate(5).testAssertion();
    // new Predicate(3, "creation").testAssertion(); //running 4 creations in aws
    // new Predicate(1, "deletion").testAssertion();
    // new Predicate(1, "updation").testAssertion();



}, cloud.TestProps {timeout: 8m}) as "counter is incremented according to the bucket event";

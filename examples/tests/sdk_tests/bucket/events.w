bring cloud;

let b = new cloud.Bucket() as "b";
let counter = new cloud.Counter();


b.onDelete(inflight (key: str) => {
    counter.inc();
});

b.onUpdate(inflight (key: str) => {
    counter.inc();
});

b.onCreate(inflight (key:str) => {
    counter.inc();
});

b.onEvent(inflight (key: str) => {   
    counter.inc();
});


new cloud.Test(inflight () => {

    inflight class Predicate {
    counterVal: num;
    init(counterVal: num) {
       this.counterVal = counterVal;
    }

    extern "../external/sleep.js" inflight sleep(ms: num);

    inflight assertion (): bool {
        return counter.peek() == this.counterVal;
    }

    inflight testAssertion ()  {
        let var i = 0;
        // waiting for up to 2 minutes
        while i<12 {
        i = i + 1;
        if this.assertion() {
          assert(this.assertion());
          return;
        } 
        this.sleep(1000 * 10);
      }
      assert(this.assertion());
    }
}
    b.put("a", "1");
    b.put("b", "1");
    b.put("c", "1");
    b.put("b", "100");
    b.delete("c");
    new Predicate(10).testAssertion();

}, cloud.TestProps {timeout: 3m}) as "counter is incremented 10 times";

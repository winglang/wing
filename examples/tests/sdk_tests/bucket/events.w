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

// "std" is implicitly imported
new std.Test(inflight () => {

    inflight class Predicate {
        counterVal: num;
        init(counterVal: num) {
            this.counterVal = counterVal;
        }

        extern "../external/sleep.js" static inflight sleep(ms: num);

        inflight assertion (): bool {
            return counter.peek() == this.counterVal;
        }

        inflight testAssertion ()  {
            let var i = 0;
            // waiting for up to 2 minutess, checking every 10 seconds
            while i < 12 {
            i = i + 1;
            if this.assertion() {
                assert(this.assertion());
                return;
            } 
            Predicate.sleep(1000 * 10);
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

}, std.TestProps {timeout: 3m}) as "counter is incremented 10 times";

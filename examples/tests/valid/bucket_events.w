bring cloud;

let other = new cloud.Bucket() as "other";
let b = new cloud.Bucket() as "b";

b.onDelete(inflight (key: str) => {
    log("deleted ${key}");
});

b.onUpdate(inflight (key: str) => {
    log("updated ${key}");
});

b.onCreate(inflight (key:str) => {
    log("created ${key}");
});

b.onEvent(inflight (key: str, event: cloud.BucketEventType) => {   
    other.put("last_${event}_key", key); 
});

other.onEvent(inflight (key: str) => {
    log("other bucket event called!");
});

test "test" {   
    b.put("a", "1");
    b.put("b", "1");
    b.put("b", "100");
    b.put("c", "1");
    b.delete("c");
}

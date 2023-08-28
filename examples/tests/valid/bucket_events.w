bring cloud;

let other = new cloud.Bucket() as "other";
let b = new cloud.Bucket() as "b";

b.onDelete(inflight fn(key: str) {
    log("deleted ${key}");
});

b.onUpdate(inflight fn(key: str) {
    log("updated ${key}");
});

b.onCreate(inflight fn(key:str) {
    log("created ${key}");
});

b.onEvent(inflight fn(key: str, event: cloud.BucketEventType) {
    other.put("last_${event}_key", key); 
});

other.onEvent(inflight fn(key: str) {
    log("other bucket event called!");
});

test "putting and deleting from a bucket to trigger bucket events" {   
    b.put("a", "1");
    b.put("b", "1");
    b.put("b", "100");
    b.put("c", "1");
    b.delete("c");
}

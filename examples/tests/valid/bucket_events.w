bring cloud;

let other = new cloud.Bucket() as "other";
let b = new cloud.Bucket() as "b";

b.on_delete(inflight (key: str) => {
    log("deleted ${key}");
});

b.on_update(inflight (key: str) => {
    log("updated ${key}");
});

b.on_create(inflight (key:str) => {
    log("created ${key}");
});

b.on_event(inflight (key: str) => {   
    log("last key ${key}");
    other.put("last_operation_key", Json.stringify(key)); //TODO: until we'll fix the function args conversion/mapping
});

other.on_event(inflight (key: str) => {
    log("other bucket event called!");
});

test "test" {
    b.put("a", "1");
    b.put("b", "1");
    b.put("b", "100");
    b.put("c", "1");
    b.delete("c");
}

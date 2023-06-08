bring cloud;

let other = new cloud.Bucket() as "other";
let b = new cloud.Bucket() as "b";

b.onDelete(inflight (key: str) -> void {
    log("deleted ${key}");
});

b.onUpdate(inflight (key: str) -> void {
    log("updated ${key}");
});

b.onCreate(inflight (key:str) -> void {
    log("created ${key}");
});

b.onEvent(inflight (key: str) -> void {
    log("last key ${key}");
    other.put("last_operation_key", Json.stringify(key)); //TODO: until we'll fix the function args conversion/mapping
});

other.onEvent(inflight (key: str) -> void {
    log("other bucket event called!");
});

test "test" {
    b.put("a", "1");
    b.put("b", "1");
    b.put("b", "100");
    b.put("c", "1");
    b.delete("c");
}

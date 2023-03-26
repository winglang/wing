bring cloud;

let other = new cloud.Bucket() as "other";
let b = new cloud.Bucket() as "b";

b.on_delete(inflight (key: str) => {
    print("deleted ${key}");
});

b.on_update(inflight (key: str) => {
    print("updated ${key}");
});

b.on_upload(inflight (key:str) => {
    print("uploaded ${key}");
});

b.on_event(inflight (key: str) => {   
    print("last key ${key}");
    other.put("last_operation_key", Json.stringify(key)); //TODO: until we'll fix the function args conversion/mapping
});

other.on_event(inflight (key: str) => {
    print("other bucket event called!");
});
new cloud.Function(inflight () => {
    b.put("a", "1");
    // assert(other.get("last_operation_key") == "a");
    b.put("b", "1");
    // assert(other.get("last_operation_key") == "b");
    b.put("b", "100");
    // assert(other.get("last_operation_key") == "b");
    b.put("c", "1");
    // assert(other.get("last_operation_key") == "c");
    b.delete("c");
    // assert(other.get("last_operation_key") == "c");
    // assert(b.get("is_tracked") == "True");
}) as "test"; 


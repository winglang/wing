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

b.onEvent(inflight (key: str) => {   
    log("last key ${key}");
    other.put("last_operation_key", Json.stringify(key)); //TODO: until we'll fix the function args conversion/mapping
});

other.onEvent(inflight (key: str) => {
    log("other bucket event called!");
});
new cloud.Function(inflight () => {
    b.put("a", "1");
    b.put("b", "1");
    b.put("b", "100");
    b.put("c", "1");
    b.delete("c");
}) as "test"; 


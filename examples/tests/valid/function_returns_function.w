
bring cloud;

let f = fn(s: str) -> fn() -> bool {
    return fn() -> bool { return s == "wing"; };
};

let wingFn = f("wing");
let dingFn = f("ding");


assert(wingFn());
assert(!dingFn());

test "inflight functions can return other inflight functions" {
    let iFn = inflight fn(s: str) -> inflight fn() -> bool {
        return inflight fn() -> bool { return s == "wing"; };
    };
    
    let wingInflightFn = iFn("wing");
    let dingInflightFn = iFn("ding");
    
    
    assert(wingInflightFn());
    assert(!dingInflightFn());
}

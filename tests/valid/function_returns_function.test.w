
bring cloud;

let fn = (s: str): (): bool => {
    return (): bool => { return s == "wing"; };
};

let wingFn = fn("wing");
let dingFn = fn("ding");


assert(wingFn());
assert(!dingFn());

test "inflight functions can return other inflight functions" {
    let iFn = inflight (s: str): inflight (): bool => {
        return inflight (): bool => { return s == "wing"; };
    };
    
    let wingInflightFn = iFn("wing");
    let dingInflightFn = iFn("ding");
    
    
    assert(wingInflightFn());
    assert(!dingInflightFn());
}
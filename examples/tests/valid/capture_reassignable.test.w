bring cloud;

let var x = 5;

let handler = inflight (): void => {
    assert(x == 5);
    
};

test "main" {
    handler();
}

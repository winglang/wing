bring cloud;

let var x = 5;

let handler = inflight fn() -> void {
    assert(x == 5);
    
};

test "main" {
    handler();
}

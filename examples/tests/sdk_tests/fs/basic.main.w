bring fs;

let filename = "hello.txt";
let data = "Hello, Wing!";

fs.writeFile(filename, data);
assert(fs.exists(filename) == true);

let content = fs.readFile(filename);
assert(content == data);

fs.remove(filename);
assert(fs.exists(filename) == false);

let nilContent = fs.tryReadFile(filename);
assert(nilContent == nil);

test "inflight file basic operations" {
    fs.writeFile(filename, data);
    assert(fs.exists(filename) == true);

    let content = fs.readFile(filename);
    assert(content == data);

    fs.remove(filename);
    assert(fs.exists(filename) == false);

    let nilContent = fs.tryReadFile(filename);
    assert(nilContent == nil);
}
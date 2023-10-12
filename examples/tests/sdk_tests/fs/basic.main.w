bring fs;

let filepath = "/tmp/hello-preflight.txt";
let data = "Hello, Wing!";

fs.writeFile(filepath, data);
assert(fs.exists(filepath) == true);

let content = fs.readFile(filepath);
assert(content == data);

fs.remove(filepath);
assert(fs.exists(filepath) == false);

let nilContent = fs.tryReadFile(filepath);
assert(nilContent == nil);

test "inflight file basic operations" {
    let filepath = "/tmp/hello-inflight.txt";

    fs.writeFile(filepath, data);
    assert(fs.exists(filepath) == true);

    let content = fs.readFile(filepath);
    assert(content == data);

    fs.remove(filepath);
    assert(fs.exists(filepath) == false);

    let nilContent = fs.tryReadFile(filepath);
    assert(nilContent == nil);
}
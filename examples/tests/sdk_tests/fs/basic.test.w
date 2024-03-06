bring fs;

let tmpdir = fs.mkdtemp();
let filepath = "{tmpdir}/hello-preflight.txt";
let data = "Hello, Wing!";
let appendData = " Time to take flight!";

fs.writeFile(filepath, data);
assert(fs.exists(filepath) == true);

let content = fs.readFile(filepath);
assert(content == data);

fs.appendFile(filepath, appendData);
assert(fs.exists(filepath) == true);

let newContent = fs.readFile(filepath);
assert(newContent == data + appendData);

fs.remove(filepath);
assert(fs.exists(filepath) == false);

let nilContent = fs.tryReadFile(filepath);
assert(nilContent == nil);

fs.remove(tmpdir);
assert(fs.exists(tmpdir) == false);

test "inflight file basic operations" {
    let tmpdir = fs.mkdtemp();
    let filepath = "{tmpdir}/hello-inflight.txt";

    fs.writeFile(filepath, data);
    assert(fs.exists(filepath) == true);

    let content = fs.readFile(filepath);
    assert(content == data);

    fs.appendFile(filepath, appendData);
    assert(fs.exists(filepath) == true);

    let newContent = fs.readFile(filepath);
    assert(newContent == data + appendData);

    fs.remove(filepath);
    assert(fs.exists(filepath) == false);

    let nilContent = fs.tryReadFile(filepath);
    assert(nilContent == nil);

    fs.remove(tmpdir);
    assert(fs.exists(tmpdir) == false);
}

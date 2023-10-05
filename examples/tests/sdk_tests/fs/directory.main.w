bring fs;
bring regex;

let dirname = "wingdir";
let filename = "temp.txt";

fs.mkdir(dirname);
assert(fs.exists(dirname) == true);

try {
    fs.mkdir(dirname);
} catch e {
    assert(regex.match("^EEXIST: file already exists", e) == true);
}

fs.writeFile(fs.join(dirname, filename), "");
let files = fs.readdir(dirname);
assert(files.length == 1);

fs.remove(dirname, { recursive: true });
assert(fs.exists(dirname) == false);

let nilFiles = fs.tryReaddir(dirname);
assert(nilFiles == nil);

test "inflight create normal directory" {
    fs.mkdir(dirname);
    assert(fs.exists(dirname) == true);

    try {
        fs.mkdir(dirname);
    } catch e {
        assert(regex.match("^EEXIST: file already exists", e) == true);
    }
    
    fs.writeFile(fs.join(dirname, filename), "");
    let files = fs.readdir(dirname);
    assert(files.length == 1);

    fs.remove(dirname, { recursive: true });
    assert(fs.exists(dirname) == false);

    let nilFiles = fs.tryReaddir(dirname);
    assert(nilFiles == nil);
}
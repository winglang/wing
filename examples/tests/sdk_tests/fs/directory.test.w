bring fs;
bring regex;

let tmpdir = fs.mkdtemp();
let dirpath = "${tmpdir}/wingdir-preflight";
let filename = "temp.txt";

fs.mkdir(dirpath);
assert(fs.exists(dirpath) == true);

try {
    fs.mkdir(dirpath);
} catch e {
    assert(regex.match("^EEXIST: file already exists", e) == true);
}

fs.writeFile(fs.join(dirpath, filename), "");
let files = fs.readdir(dirpath);
assert(files.length == 1);

fs.remove(dirpath);
assert(fs.exists(dirpath) == false);

let nilFiles = fs.tryReaddir(dirpath);
assert(nilFiles == nil);

test "inflight create normal directory" {
    let tmpdir = fs.mkdtemp();
    let dirpath = "${tmpdir}/wingdir-inflight";

    fs.mkdir(dirpath);
    assert(fs.exists(dirpath) == true);

    try {
        fs.mkdir(dirpath);
    } catch e {
        assert(regex.match("^EEXIST: file already exists", e) == true);
    }
    
    fs.writeFile(fs.join(dirpath, filename), "");
    let files = fs.readdir(dirpath);
    assert(files.length == 1);

    fs.remove(dirpath);
    assert(fs.exists(dirpath) == false);

    let nilFiles = fs.tryReaddir(dirpath);
    assert(nilFiles == nil);
}

test "cannot overwrite directory with a file" {
    let tmpdir = fs.mkdtemp();
    let dirpath = "${tmpdir}/test-overwrite-dir";
    let var errorCaught = false;

    fs.mkdir(dirpath);
    assert(fs.exists(dirpath) == true);

    try {
        fs.writeFile(dirpath, "This should fail.");
    } catch e {
        errorCaught = regex.match("^EISDIR: illegal operation on a directory", e);
    }
    assert(errorCaught == true);

    fs.remove(dirpath, { recursive: true });
    assert(fs.exists(dirpath) == false);
}

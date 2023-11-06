bring fs;
bring regex;

test "removing non-existent file with `force: false` raises error" {
    let tmpdir = fs.mkdtemp();
    let nonExistentFilePath = "${tmpdir}/non-existent.txt";
    let var errorCaught = false;

    try {
        fs.remove(nonExistentFilePath, { force: false });
    } catch e {
        errorCaught = regex.match("^ENOENT: no such file or directory", e);
    }
    assert(errorCaught == true);

    fs.remove(tmpdir);
    assert(fs.exists(tmpdir) == false);
}

test "removing directory with `recursive: false` raises error" {
    let tmpdir = fs.mkdtemp();
    let dirpath = "${tmpdir}/testdir";
    let filename = "sample.txt";
    let var errorCaught = false;

    fs.mkdir(dirpath);
    fs.writeFile(fs.join(dirpath, filename), "sample content");

    try {
        fs.remove(dirpath, { recursive: false });
    } catch e {
        errorCaught = regex.match("^Path is a directory: rm returned EISDIR", e);
    }
    assert(errorCaught == true);

    fs.remove(dirpath);
    fs.remove(tmpdir);
    assert(fs.exists(dirpath) == false);
    assert(fs.exists(tmpdir) == false);
}

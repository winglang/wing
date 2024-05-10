bring fs;
bring expect;

test "write and read file with `encoding` option" {
    let tmpdir = fs.mkdtemp();
    let filepath = fs.join(tmpdir, "utf8test.txt");
    let data = "こんにちは、ウィング!";

    fs.writeFile(filepath, data, { encoding: "utf8" });

    let contentUtf8 = fs.readFile(filepath, { encoding: "utf8" });
    let contentAscii = fs.readFile(filepath, { encoding: "ascii" });

    expect.equal(contentUtf8, data);
    expect.notEqual(contentAscii, data);

    fs.remove(tmpdir, { recursive: true });
    expect.equal(fs.exists(tmpdir), false);
}

test "write file with `flag` option" {
    let tmpdir = fs.mkdtemp();
    let filepath = fs.join(tmpdir, "test.txt");
    let data = "Hello, Wing!";
    let appendData = " More text.";

    fs.writeFile(filepath, data);
    fs.writeFile(filepath, appendData, { flag: "a" });

    let content = fs.readFile(filepath);

    expect.equal(content, "{data}{appendData}");

    fs.remove(tmpdir, { recursive: true });
    expect.equal(fs.exists(tmpdir), false);
}

test "removing non-existent file with `force: false` raises error" {
    let tmpdir = fs.mkdtemp();
    let nonExistentFilePath = "{tmpdir}/non-existent.txt";
    let var errorCaught = false;

    try {
        fs.remove(nonExistentFilePath, { force: false });
    } catch e {
        let re = regex.compile("^ENOENT: no such file or directory");
        errorCaught = re.test(e);
    }

    expect.equal(errorCaught, true);

    fs.remove(tmpdir);
    expect.equal(fs.exists(tmpdir), false);
}

test "removing directory with `recursive: false` raises error" {
    let tmpdir = fs.mkdtemp();
    let dirpath = "{tmpdir}/testdir";
    let filename = "sample.txt";
    let var errorCaught = false;

    fs.mkdir(dirpath);
    fs.writeFile(fs.join(dirpath, filename), "sample content");

    try {
        fs.remove(dirpath, { recursive: false });
    } catch e {
        let re = regex.compile("^Path is a directory: rm returned EISDIR");
        errorCaught = re.test(e);
    }

    expect.equal(errorCaught, true);

    fs.remove(dirpath);
    fs.remove(tmpdir);
    expect.equal(fs.exists(dirpath), false);
    expect.equal(fs.exists(tmpdir), false);
}

bring fs;
bring regex;
bring expect;

test "write and read with explicit encoding" {
    let tmpdir = fs.mkdtemp();
    let filepath = fs.join(tmpdir, "utf8test.txt");
    let data = "こんにちは、翼!";

    fs.writeFile(filepath, data, { encoding: "utf8" });
    assert(fs.exists(filepath) == true);

    let contentUtf8 = fs.readFile(filepath, { encoding: "utf8" });
    let contentAscii = fs.readFile(filepath, { encoding: "ascii" });

    expect.equal(contentUtf8, data);
    expect.notEqual(contentAscii, data);

    fs.remove(tmpdir, { recursive: true });
    assert(fs.exists(tmpdir) == false);
}

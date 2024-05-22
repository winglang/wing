bring fs;
bring expect;

let from = "/a/b/c/d";
let to = "/a/b/e/f";
let r = regex.compile("/a/b/e/f");

let var result = fs.join(from, to);
expect.equal(result, "/a/b/c/d/a/b/e/f");

result = fs.relative(from ,to);
expect.equal(result, "../../e/f");

result = fs.absolute(from, to);
expect.equal(r.test(result), true);

result = fs.dirname(from);
expect.equal(result, "/a/b/c");

result = fs.basename(from);
expect.equal(result, "d");

test "inflight path conversion" {
    let var result = fs.join(from, to);
    expect.equal(result, "/a/b/c/d/a/b/e/f");
    
    result = fs.relative(from ,to);
    expect.equal(result, "../../e/f");

    result = fs.absolute(from, to);
    expect.equal(r.test(result), true);

    result = fs.dirname(from);
    expect.equal(result, "/a/b/c");

    result = fs.basename(from);
    expect.equal(result, "d");
}

test "extension()" {
    let var filePath = "/a/b/c/d.txt";
    let var result = fs.extension(filePath);
    expect.equal(result, "txt");

    filePath = "/a/b/c/d.tar.gz";
    result = fs.extension(filePath);
    expect.equal(result, "gz");

    filePath = "/a/b/c/.hiddenfile";
    result = fs.extension(filePath);
    expect.equal(result, nil);

    filePath = "/a/b/c/d";
    result = fs.extension(filePath);
    expect.equal(result, nil);

    filePath = "";
    result = fs.extension(filePath);
    expect.equal(result, nil);
}
bring fs;
bring regex;
bring expect;

let from = "/a/b/c/d";
let to = "/a/b/e/f";

let var result = fs.join(from, to);
assert(result == "/a/b/c/d/a/b/e/f");

result = fs.relative(from ,to);
assert(result == "../../e/f");

result = fs.absolute(from, to);
assert(regex.match("/a/b/e/f", result));

result = fs.dirname(from);
assert(result == "/a/b/c");

result = fs.basename(from);
assert(result == "d");

test "inflight path conversion" {
    let var result = fs.join(from, to);
    assert(result == "/a/b/c/d/a/b/e/f");
    
    result = fs.relative(from ,to);
    assert(result == "../../e/f");

    result = fs.absolute(from, to);
    assert(regex.match("/a/b/e/f", result));

    result = fs.dirname(from);
    assert(result == "/a/b/c");

    result = fs.basename(from);
    assert(result == "d");
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
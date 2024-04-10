bring fs;
bring expect;

let tmpdir = fs.mkdtemp();
let filepath = "{tmpdir}/test-preflight.json";
let data = Json {
    "foo": "bar", 
    "arr": [1, 2, 3, "test", { "foo": "bar" }]
};

try {
    fs.writeFile(filepath, "invalid content");
    fs.readJson(filepath);
} catch e {
    let re = regex.compile("^Unexpected token");
    expect.equal(re.test(e), true);
}

fs.writeJson(filepath, data);
expect.equal(fs.exists(filepath), true);

let obj = fs.readJson(filepath);
expect.equal(Json.stringify(obj), Json.stringify(data));

fs.remove(filepath);
expect.equal(fs.exists(filepath), false);

expect.equal(fs.tryReadJson(filepath), nil);

fs.remove(tmpdir, { recursive: true });
expect.equal(fs.exists(tmpdir), false);

test "inflight json operations" {
    let tmpdir = fs.mkdtemp();
    let filepath = "{tmpdir}/test-inflight.json";

    try {
        fs.writeFile(filepath, "invalid content");
        fs.readJson(filepath);
    } catch e {
        let re = regex.compile("^Unexpected token");
        expect.equal(re.test(e), true);
    }

    fs.writeJson(filepath, data);
    expect.equal(fs.exists(filepath), true);

    let obj = fs.readJson(filepath);
    expect.equal(Json.stringify(obj), Json.stringify(data));

    fs.remove(filepath);
    expect.equal(fs.exists(filepath), false);

    expect.equal(fs.tryReadJson(filepath), nil);

    fs.remove(tmpdir, { recursive: true });
    expect.equal(fs.exists(tmpdir), false);
}
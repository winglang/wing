bring fs;
bring regex;

let tmpdir = fs.mkdtemp();
let filepath = "${tmpdir}/test-preflight.json";
let data = Json {
    "foo": "bar", 
    "arr": [1, 2, 3, "test", { "foo": "bar" }]
};

try {
    fs.writeFile(filepath, "invalid content");
    fs.readJson(filepath);
} catch e {
    assert(regex.match("^Unexpected token", e) == true);
}

fs.writeJson(filepath, data);
assert(fs.exists(filepath) == true);

let obj = fs.readJson(filepath);
assert(Json.stringify(obj) == Json.stringify(data));

fs.remove(filepath);
assert(fs.exists(filepath) == false);

assert(fs.tryReadJson(filepath) == nil);

fs.remove(tmpdir, { recursive: true });
assert(fs.exists(tmpdir) == false);

test "inflight json operations" {
    let tmpdir = fs.mkdtemp();
    let filepath = "${tmpdir}/test-inflight.json";

    try {
        fs.writeFile(filepath, "invalid content");
        fs.readJson(filepath);
    } catch e {
        assert(regex.match("^Unexpected token", e) == true);
    }

    fs.writeJson(filepath, data);
    assert(fs.exists(filepath) == true);

    let obj = fs.readJson(filepath);
    assert(Json.stringify(obj) == Json.stringify(data));

    fs.remove(filepath);
    assert(fs.exists(filepath) == false);

    assert(fs.tryReadJson(filepath) == nil);

    fs.remove(tmpdir, { recursive: true });
    assert(fs.exists(tmpdir) == false);
}
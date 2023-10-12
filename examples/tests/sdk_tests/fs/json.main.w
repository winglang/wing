bring fs;
bring regex;

let filepath = "/tmp/test-preflight.json";
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

test "inflight json operations" {
    let filepath = "/tmp/test-inflight.json";

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
}
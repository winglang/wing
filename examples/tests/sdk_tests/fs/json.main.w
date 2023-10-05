bring fs;
bring regex;

let filename = "test-json.json";
let data = Json {
    "foo": "bar", 
    "arr": [1, 2, 3, "test", { "foo": "bar" }]
};

try {
    fs.writeFile(filename, "invalid content");
    fs.readJson(filename);
} catch e {
    assert(regex.match("^Unexpected token", e) == true);
}

fs.writeJson(filename, data);
assert(fs.exists(filename) == true);

let obj = fs.readJson(filename);
assert(Json.stringify(obj) == Json.stringify(data));

fs.remove(filename);
assert(fs.exists(filename) == false);

assert(fs.tryReadJson(filename) == nil);

test "inflight json operations" {
    try {
        fs.writeFile(filename, "invalid content");
        fs.readJson(filename);
    } catch e {
        assert(regex.match("^Unexpected token", e) == true);
    }

    fs.writeJson(filename, data);
    assert(fs.exists(filename) == true);

    let obj = fs.readJson(filename);
    assert(Json.stringify(obj) == Json.stringify(data));

    fs.remove(filename);
    assert(fs.exists(filename) == false);

    assert(fs.tryReadJson(filename) == nil);
}
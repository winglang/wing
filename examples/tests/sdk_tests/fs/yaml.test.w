bring fs;

let tmpdir = fs.mkdtemp();
let filepath = "{tmpdir}/test-preflight.yaml";
let data = Json {
    "foo": "bar", 
    "arr": [1, 2, 3, "test", { "foo": "bar" }]
};

fs.writeFile(filepath, "invalid: \{\{ content }}, invalid");
try {
    fs.readYaml(filepath);
} catch e {
    assert(regex.match("^bad indentation", e));
}

fs.writeYaml(filepath, data, data);
assert(fs.exists(filepath) == true);

let objs = fs.readYaml(filepath);
assert(objs.length == 2);
assert(Json.stringify(objs.at(0)) == Json.stringify(data));
assert(Json.stringify(objs.at(1)) == Json.stringify(data));

fs.remove(filepath);
assert(fs.exists(filepath) == false);

fs.remove(tmpdir, { recursive: true });
assert(fs.exists(tmpdir) == false);

test "inflight yaml operations" {
    let tmpdir = fs.mkdtemp();
    let filepath = "{tmpdir}/test-inflight.yaml";

    fs.writeYaml(filepath, data, data);
    assert(fs.exists(filepath) == true);

    let objs = fs.readYaml(filepath);
    assert(objs.length == 2);
    assert(Json.stringify(objs.at(0)) == Json.stringify(data));
    assert(Json.stringify(objs.at(1)) == Json.stringify(data));

    fs.remove(filepath);
    assert(fs.exists(filepath) == false);

    fs.remove(tmpdir, { recursive: true });
    assert(fs.exists(tmpdir) == false);
}
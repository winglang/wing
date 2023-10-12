bring fs;
bring regex;

let filepath = "/tmp/test-preflight.yaml";
let data = Json {
    "foo": "bar", 
    "arr": [1, 2, 3, "test", { "foo": "bar" }]
};

try {
    fs.writeFile(filepath, "invalid: {{ content }}, invalid");
    fs.readYaml(filepath);
} catch e {
    assert(regex.match("^bad indentation", e) == true);
}

fs.writeYaml(filepath, data, data);
assert(fs.exists(filepath) == true);

let objs = fs.readYaml(filepath);
assert(objs.length == 2);
assert(Json.stringify(objs.at(0)) == Json.stringify(data));
assert(Json.stringify(objs.at(1)) == Json.stringify(data));

fs.remove(filepath);
assert(fs.exists(filepath) == false);

test "inflight yaml operations" {
    let filepath = "/tmp/test-inflight.yaml";

    fs.writeYaml(filepath, data, data);
    assert(fs.exists(filepath) == true);

    let objs = fs.readYaml(filepath);
    assert(objs.length == 2);
    assert(Json.stringify(objs.at(0)) == Json.stringify(data));
    assert(Json.stringify(objs.at(1)) == Json.stringify(data));

    fs.remove(filepath);
    assert(fs.exists(filepath) == false);
}
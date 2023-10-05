bring fs;

let filename = "test-yaml.yaml";
let data = Json {
    "foo": "bar", 
    "arr": [1, 2, 3, "test", { "foo": "bar" }]
};

fs.writeYaml(filename, data, data);
assert(fs.exists(filename) == true);

let objs = fs.readYaml(filename);
assert(objs.length == 2);
assert(Json.stringify(objs.at(0)) == Json.stringify(data));
assert(Json.stringify(objs.at(1)) == Json.stringify(data));

fs.remove(filename);
assert(fs.exists(filename) == false);

test "inflight yaml operations" {
    fs.writeYaml(filename, data, data);
    assert(fs.exists(filename) == true);

    let objs = fs.readYaml(filename);
    assert(objs.length == 2);
    assert(Json.stringify(objs.at(0)) == Json.stringify(data));
    assert(Json.stringify(objs.at(1)) == Json.stringify(data));

    fs.remove(filename);
    assert(fs.exists(filename) == false);
}
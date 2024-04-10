bring fs;
bring expect;

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
    let re = regex.compile("^bad indentation");
    expect.equal(re.test(e));
}

fs.writeYaml(filepath, data, data);
expect.equal(fs.exists(filepath), true);

let objs = fs.readYaml(filepath);
expect.equal(objs.length, 2);
expect.equal(Json.stringify(objs.at(0)), Json.stringify(data));
expect.equal(Json.stringify(objs.at(1)), Json.stringify(data));

fs.remove(filepath);
expect.equal(fs.exists(filepath), false);

fs.remove(tmpdir, { recursive: true });
expect.equal(fs.exists(tmpdir), false);

test "inflight yaml operations" {
    let tmpdir = fs.mkdtemp();
    let filepath = "{tmpdir}/test-inflight.yaml";

    fs.writeYaml(filepath, data, data);
    expect.equal(fs.exists(filepath), true);

    let objs = fs.readYaml(filepath);
    expect.equal(objs.length, 2);
    expect.equal(Json.stringify(objs.at(0)), Json.stringify(data));
    expect.equal(Json.stringify(objs.at(1)), Json.stringify(data));

    fs.remove(filepath);
    expect.equal(fs.exists(filepath), false);

    fs.remove(tmpdir, { recursive: true });
    expect.equal(fs.exists(tmpdir), false);
}
bring fs;

let tmpdir = fs.mkdtemp();
assert(fs.exists(tmpdir) == true);

fs.remove(tmpdir, { recursive: true });
assert(fs.exists(tmpdir) == false);

test "inflight create temporary directory" {
    let tmpdir = fs.mkdtemp();
    assert(fs.exists(tmpdir) == true);

    fs.remove(tmpdir, { recursive: true });
    assert(fs.exists(tmpdir) == false);
}
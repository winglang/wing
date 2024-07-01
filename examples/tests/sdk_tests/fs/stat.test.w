bring fs;
bring expect;

test "metadata()" {
    let tempDir = fs.mkdtemp();
    let tempFile = fs.join(tempDir, "tempfile.txt");
    let tempSymlink = fs.join(tempDir, "symlink");
    let unixMode = regex.compile("[0-7]\{3\}");

    fs.writeFile(tempFile, "Hello, Wing!");
    fs.symlink(tempFile, tempSymlink);

    // Test a File
    let fileStats = fs.metadata(tempFile);
    expect.equal(fileStats.size, 12);
    expect.equal(fileStats.fileType, fs.FileType.FILE);
    expect.equal(unixMode.test(fileStats.permissions), true);
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Test a Symlink
    let symlinkStats = fs.metadata(tempSymlink);
    expect.equal(symlinkStats.size, 12);
    expect.equal(symlinkStats.fileType, fs.FileType.FILE);
    expect.equal(unixMode.test(symlinkStats.permissions), true);
    assert(symlinkStats.accessed.year >= 2023);
    assert(symlinkStats.modified.year >= 2023);
    assert(symlinkStats.created.year >= 2023);

    // Test a Directory
    let dirStats = fs.metadata(tempDir);
    expect.equal(dirStats.fileType, fs.FileType.DIRECTORY);
    expect.equal(unixMode.test(dirStats.permissions), true);
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Cleanup
    fs.remove(tempDir);
    expect.equal(fs.exists(tempDir), false);
}

test "symlinkMetadata()" {
    let tempDir = fs.mkdtemp();
    let tempFile = fs.join(tempDir, "tempfile.txt");
    let tempSymlink = fs.join(tempDir, "symlink");
    let unixMode = regex.compile("[0-7]\{3\}");

    fs.writeFile(tempFile, "Hello, Wing!");
    fs.symlink(tempFile, tempSymlink);

    // Test a File
    let fileStats = fs.symlinkMetadata(tempFile);
    expect.equal(fileStats.size, 12);
    expect.equal(fileStats.fileType, fs.FileType.FILE);
    expect.equal(unixMode.test(fileStats.permissions), true);
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Test a Symlink
    let symlinkStats = fs.symlinkMetadata(tempSymlink);
    expect.notEqual(symlinkStats.size, 12);
    expect.equal(symlinkStats.fileType, fs.FileType.SYMLINK);
    expect.equal(unixMode.test(symlinkStats.permissions), true);
    assert(symlinkStats.accessed.year >= 2023);
    assert(symlinkStats.modified.year >= 2023);
    assert(symlinkStats.created.year >= 2023);

    // Test a Directory
    let dirStats = fs.symlinkMetadata(tempDir);
    expect.equal(dirStats.fileType, fs.FileType.DIRECTORY);
    expect.equal(unixMode.test(dirStats.permissions), true);
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Cleanup
    fs.remove(tempDir);
    expect.equal(fs.exists(tempDir), false);
}

test "setPermissions()" {
    let tempDir = fs.mkdtemp();
    let tempFile = fs.join(tempDir, "tempfile.txt");

    fs.writeFile(tempFile, "Hello, Wing!");
    fs.setPermissions(tempFile, "666");

    let fileStats = fs.metadata(tempFile);
    expect.equal(fileStats.permissions, "666");

    // Cleanup
    fs.remove(tempDir);
    expect.equal(fs.exists(tempDir), false);
}
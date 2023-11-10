bring fs;
bring regex;
bring expect;

test "stat()" {
    let tempDir = fs.mkdtemp();
    let tempFile = fs.join(tempDir, "tempfile.txt");
    let tempSymlink = fs.join(tempDir, "symlink");

    fs.writeFile(tempFile, "Hello, Wing!");
    fs.symlink(tempFile, tempSymlink);

    // Test a File
    let fileStats = fs.stat(tempFile);
    expect.equal(fileStats.size, 12);
    expect.equal(fileStats.fileType, "File");
    assert(regex.match("[0-7]{3}", fileStats.permissions));
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Test a Symlink
    let symlinkStats = fs.stat(tempSymlink);
    expect.equal(symlinkStats.size, 12);
    expect.equal(symlinkStats.fileType, "File");
    assert(regex.match("[0-7]{3}", symlinkStats.permissions));
    assert(symlinkStats.accessed.year >= 2023);
    assert(symlinkStats.modified.year >= 2023);
    assert(symlinkStats.created.year >= 2023);

    // Test a Directory
    let dirStats = fs.stat(tempDir);
    expect.equal(dirStats.fileType, "Directory");
    assert(regex.match("[0-7]{3}", dirStats.permissions));
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Cleanup
    fs.remove(tempDir);
    expect.equal(fs.exists(tempDir), false);
}

test "lstat()" {
    let tempDir = fs.mkdtemp();
    let tempFile = fs.join(tempDir, "tempfile.txt");
    let tempSymlink = fs.join(tempDir, "symlink");

    fs.writeFile(tempFile, "Hello, Wing!");
    fs.symlink(tempFile, tempSymlink);

    // Test a File
    let fileStats = fs.lstat(tempFile);
    expect.equal(fileStats.size, 12);
    expect.equal(fileStats.fileType, "File");
    assert(regex.match("[0-7]{3}", fileStats.permissions));
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Test a Symlink
    let symlinkStats = fs.lstat(tempSymlink);
    expect.notEqual(symlinkStats.size, 12);
    expect.equal(symlinkStats.fileType, "Symlink");
    assert(regex.match("[0-7]{3}", symlinkStats.permissions));
    assert(symlinkStats.accessed.year >= 2023);
    assert(symlinkStats.modified.year >= 2023);
    assert(symlinkStats.created.year >= 2023);

    // Test a Directory
    let dirStats = fs.lstat(tempDir);
    expect.equal(dirStats.fileType, "Directory");
    assert(regex.match("[0-7]{3}", dirStats.permissions));
    assert(fileStats.accessed.year >= 2023);
    assert(fileStats.modified.year >= 2023);
    assert(fileStats.created.year >= 2023);

    // Cleanup
    fs.remove(tempDir);
    expect.equal(fs.exists(tempDir), false);
}

test "chmod()" {
    let tempDir = fs.mkdtemp();
    let tempFile = fs.join(tempDir, "tempfile.txt");

    fs.writeFile(tempFile, "Hello, Wing!");
    fs.chmod(tempFile, "777");

    let fileStats = fs.stat(tempFile);
    expect.equal(fileStats.permissions, "777");

    // Cleanup
    fs.remove(tempDir);
    expect.equal(fs.exists(tempDir), false);
}
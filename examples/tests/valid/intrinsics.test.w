bring fs;
bring expect;
bring "./subdir/bar.w" as bar;

let path = "SHOULD_IGNORE";
let filename = "intrinsics.test.w";
let currentFile = @path(filename);
expect.equal(fs.basename(currentFile), filename);

let currentDir = @path(".");
expect.equal(fs.dirname(currentFile), currentDir);

let currentDirAlt = @path("./");
expect.equal(currentDir, currentDirAlt);

let upDir = @path("..");
expect.equal(fs.dirname(currentDir), upDir);

let packageJson = @path("package.json");
fs.join(currentDir, "package.json");

let subdirPath = @path("subdir");
expect.equal(subdirPath, bar.Bar.getSubdir());

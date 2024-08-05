bring fs;
bring expect;
bring cloud;
bring util;
bring "./subdir/bar.w" as bar;

// @dirname

let path = "SHOULD_IGNORE";
let filename = "intrinsics.test.w";

let currentFile = fs.join(@dirname, filename);
expect.equal(filename, fs.basename(currentFile));
expect.equal(@dirname, fs.dirname(currentFile));
expect.equal(bar.Bar.getSubdir(), fs.join(@dirname, "subdir"));

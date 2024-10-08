// This file was auto generated from an example found in: 30-reading-writing-files.md_example_1
// Example metadata: {"valid":true}
bring fs;

let filename: str = "/tmp/test.txt";

log(fs.exists(filename));

fs.writeFile(filename, "hello world!");
fs.exists(filename);

let file: str = fs.readFile(filename);

log(file);
log(fs.extension(filename) ?? "");
log(fs.isDir(filename));

fs.appendFile(filename, "testing");

let extendedValue = fs.readFile(filename);

log(extendedValue);

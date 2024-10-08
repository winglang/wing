// This file was auto generated from an example found in: 31-directories.md_example_1
// Example metadata: {"valid":true}
bring fs;

// Make directory
fs.mkdir("subdir");

// Check if path is directory
fs.isDir("subdir");

// Set permissions on directory
fs.setPermissions("subdir", "0755");

// Try and parse
if let dirTryFrom = fs.tryReaddir("random-folder") {
  log("Directory is there");
} else {
  log("No directory found");
}

// Remove a directory
fs.remove("subdir");

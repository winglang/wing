bring expect;
bring fs;
bring util;

// constructing bytes
let rawData = bytes.fromRaw([104, 101, 108, 108, 111]);
let rawString = bytes.fromString("hello");
let base64 = bytes.fromBase64("aGVsbG8=");
let hex = bytes.fromHex("68656c6c6f");
let zeros = bytes.zeros(5);

expect.equal(rawData, rawString);
expect.equal(rawData, base64);
expect.equal(rawData, hex);
expect.equal(rawData.length, zeros.length);

// converting bytes
let asString: str = rawData.toString();
let asRaw: Array<num> = rawData.toRaw();
let asBase64: str = rawData.toBase64();
let asHex: str = rawData.toHex();

expect.equal(asString, "hello");
expect.equal(asRaw, [104, 101, 108, 108, 111]);
expect.equal(asBase64, "aGVsbG8=");
expect.equal(asHex, "68656c6c6f");

// string decoding
let someBytes = bytes.fromRaw([195, 169]);
let someString = someBytes.toString(); // default is "utf-8"
let someString2 = someBytes.toString(encoding: "windows-1252");

expect.equal(someString, "é");
expect.equal(someString2, "Ã©");

// indexing bytes
expect.equal(rawData[0], 104);
expect.equal(rawData[1], 101);
expect.equal(rawData[2], 108);
expect.equal(rawData[3], 108);
expect.equal(rawData[4], 111);

try {
  rawData[5];
  expect.fail("Expected error");
} catch err {
  expect.ok(err.contains("out of bounds"));
}

// concatenating bytes
let concated = bytes.concat(rawData, rawData, rawData);
expect.equal(concated.length, rawData.length * 3);
expect.equal(concated.toString(), "hellohellohello");

// slicing bytes
let sliced = rawData.slice(1, 3);
expect.equal(sliced.length, 2);
expect.equal(sliced.toString(), "el");

// writing and reading bytes to disk
let tmpdir = fs.mkdtemp("bytes-test-");
let path = fs.join(tmpdir, "hello.txt");
fs.writeBytes(path, rawData);
let readData = fs.readBytes(path);
expect.equal(readData.toString(), "hello");
fs.remove(tmpdir);

// test that we can work with larger files
if util.os() != "win32" {
  // Creating and reading a 10MB file
  let tenMB = 10 * 1024 * 1024; // 10MB in bytes
  let largeTmpdir = fs.mkdtemp("large-bytes-test-");
  let largePath = fs.join(largeTmpdir, "large-file.bin");
  
  // Create a 10MB file using dd
  util.exec("sh", ["-c", "dd if=/dev/urandom of={largePath} bs=1M count=10 2>/dev/null"]);
  
  // Read the file into memory as bytes
  let largeBytes = fs.readBytes(largePath);
  
  // Verify the size
  expect.equal(largeBytes.length, tenMB);
  
  // Clean up
  fs.remove(largeTmpdir);
}

// === inflight tests ===
// all of the code above is repeated here to ensure that the code
// behaves the same on inflight hosts (like AWS Lambda, or the simulator)

test "bytes inflight" {
  // constructing bytes
  let rawData = bytes.fromRaw([104, 101, 108, 108, 111]);
  let rawString = bytes.fromString("hello");
  let base64 = bytes.fromBase64("aGVsbG8=");
  let hex = bytes.fromHex("68656c6c6f");
  let zeros = bytes.zeros(5);

  expect.equal(rawData, rawString);
  expect.equal(rawData, base64);
  expect.equal(rawData, hex);
  expect.equal(rawData.length, zeros.length);

  // converting bytes
  let asString: str = rawData.toString();
  let asRaw: Array<num> = rawData.toRaw();
  let asBase64: str = rawData.toBase64();
  let asHex: str = rawData.toHex();

  expect.equal(asString, "hello");
  expect.equal(asRaw, [104, 101, 108, 108, 111]);
  expect.equal(asBase64, "aGVsbG8=");
  expect.equal(asHex, "68656c6c6f");

  // string decoding
  let someBytes = bytes.fromRaw([195, 169]);
  let someString = someBytes.toString(); // default is "utf-8"
  let someString2 = someBytes.toString(encoding: "windows-1252");

  expect.equal(someString, "é");
  expect.equal(someString2, "Ã©");

  // indexing bytes
  expect.equal(rawData[0], 104);
  expect.equal(rawData[1], 101);
  expect.equal(rawData[2], 108);
  expect.equal(rawData[3], 108);
  expect.equal(rawData[4], 111);

  try {
    rawData[5];
    expect.fail("Expected error");
  } catch err {
    expect.ok(err.contains("out of bounds"));
  }

  // concatenating bytes
  let concated = bytes.concat(rawData, rawData, rawData);
  expect.equal(concated.length, rawData.length * 3);
  expect.equal(concated.toString(), "hellohellohello");

  // slicing bytes
  let sliced = rawData.slice(1, 3);
  expect.equal(sliced.length, 2);
  expect.equal(sliced.toString(), "el");

  // writing and reading bytes to disk
  let tmpdir = fs.mkdtemp("bytes-test-");
  let path = fs.join(tmpdir, "hello.txt");
  fs.writeBytes(path, rawData);
  let readData = fs.readBytes(path);
  expect.equal(readData.toString(), "hello");
  fs.remove(tmpdir);

  // test that we can work with larger files
  if util.os() != "win32" {
    // Creating and reading a 10MB file
    let tenMB = 10 * 1024 * 1024; // 10MB in bytes
    let largeTmpdir = fs.mkdtemp("large-bytes-test-");
    let largePath = fs.join(largeTmpdir, "large-file.bin");
    
    // Create a 10MB file using dd
    util.exec("sh", ["-c", "dd if=/dev/urandom of={largePath} bs=1M count=10 2>/dev/null"]);
    
    // Read the file into memory as bytes
    let largeBytes = fs.readBytes(largePath);
    
    // Verify the size
    expect.equal(largeBytes.length, tenMB);
    
    // Clean up
    fs.remove(largeTmpdir);
  }
}

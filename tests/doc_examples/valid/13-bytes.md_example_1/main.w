// This file was auto generated from an example found in: 13-bytes.md_example_1
// Example metadata: {"valid":true}
// get bytes from raw value
let rawData: bytes = bytes.fromRaw([104, 101, 108, 108, 111]);

// get the bytes from a string
let rawString: bytes = bytes.fromString("hello");

// get bytes from base64 encoded value
let base64: bytes = bytes.fromBase64("aGVsbG8=");

// get bytes from hex value
let hex: bytes = bytes.fromHex("68656c6c6f");

log(Json.stringify(rawData));
log(Json.stringify(rawString));
log(Json.stringify(base64));
log(Json.stringify(hex));

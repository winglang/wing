// This file was auto generated from an example found in: 29-base64-encoding.md_example_1
// Example metadata: {"valid":true}
bring util;

let data = "abc123!?$*&()'-=@~";

let encoded = util.base64Encode(data);
log(encoded);


let decoded = util.base64Decode(encoded);
log(decoded);

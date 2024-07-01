bring util;

let string = "https://www.winglang.io/docs";
let base64Encode = util.base64Encode(string); 
let base64urlEncode = util.base64Encode(string, true);
let base64Decode = util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==");
let base64urlDecode = util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw", true);

assert(base64Encode == "aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==");
assert(base64urlEncode == "aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw");
assert(base64Decode == string);
assert(base64urlDecode == string);

test "inflight base64" {
    let string = "https://www.winglang.io/docs";
    let base64Encode = util.base64Encode(string); 
    let base64urlEncode = util.base64Encode(string, true);
    let base64Decode = util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==");
    let base64urlDecode = util.base64Decode("aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw", true);

    assert(base64Encode == "aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw==");
    assert(base64urlEncode == "aHR0cHM6Ly93d3cud2luZ2xhbmcuaW8vZG9jcw");
    assert(base64Decode == string);
    assert(base64urlDecode == string);
}
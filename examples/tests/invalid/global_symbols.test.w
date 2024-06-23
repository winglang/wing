let log = "hi";
// ^Error: Symbol "log" already defined in this scope
let assert = "there";
// ^Error: Symbol "assert" already defined in this scope
let unsafeCast = "wingnuts";
// ^Error: Symbol "unsafeCast" already defined in this scope
let nodeof = "!";
// ^Error: Symbol "nodeof" already defined in this scope

log = "hi";
// ^Error: Variable is not reassignable
assert = "there";
// ^Error: Variable is not reassignable
unsafeCast = "wingnuts";
// ^Error: Variable is not reassignable
nodeof = "!";
// ^Error: Variable is not reassignable

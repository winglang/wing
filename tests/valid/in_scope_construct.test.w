/*\
skip: true
\*/
// Skipped: fails at runtime with "scope.node._scopes is not iterable" — same
// `new X() in scope` / constructs-version bug as new_in_static.test.w.
// Tracked in https://github.com/winglang/wing/issues/7266.
bring "constructs" as c;

class MyClass {}

new MyClass() in new c.Construct();

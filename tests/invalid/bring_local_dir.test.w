bring "./subdir" as subdir;
// Error: "Foo" is defined multiple times in "./subdir"

bring "/subdir" as baz;
// ^ error: Cannot bring "/subdir" as it is not a relative path

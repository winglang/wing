bring "./bring_local_self.main.w" as foo;
// ^ error: Cannot bring a module into itself

bring "./non-existent.w" as bar;
// ^ error: Could not find Wing module "./non-existent.w"

bring "/hello.w" as baz;
// ^ error: Cannot bring "/hello.w" as it is not a relative path

bring "./bring_local_dir.test.w" as qux;
// ^ error: Cannot bring "./main.w": entrypoint files cannot be imported

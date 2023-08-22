bring "./bring_local_self.w" as foo;
// ^ error: Cannot bring a module into itself

bring "./non-existent.w" as bar;
// ^ error: Could not find Wing module "./non-existent.w"
